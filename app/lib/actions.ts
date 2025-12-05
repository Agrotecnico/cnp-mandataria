'use server';

import { unknown, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import { emailPresupuesto } from "@/app/lib/brevo/email-presupuesto";
import { emailRespuesta } from "@/app/lib/brevo/email-respuesta";
import { emailConfirmRegistro } from "@/app/lib/brevo/email-confirm-registro";
import { emailVerification } from "@/app/lib/brevo/email-verification";


const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Por favor seleccione un cliente.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Por favor ingrese una cantidad mayor a $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Seleccione un estado de factura.',
  }),
  date: z.string(),
});

const FormSchemaCustomer = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  image_url: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

const FormSchemaUser = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "El nombre debe tener 2 o más caracteres" }),
  email: z.string().email({ message: "Correo electrónico no válido." }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
  // confirmPassword: z.string().min(5, { message: "Must be 5 or more characters long" }),
  role: z.enum(['admin', 'memberAccount', 'memberVerified', 'member', 'visitor'], {
    invalid_type_error: 'Seleccione un rol de usuario.',
  }),
  image: z.string(),
  email_verified: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

const FormSchemaConsulta = z.object({
  id: z.string(),
  archivos_url: z.string().min(5, { message: "Must be 5 or more characters long" }),
  email_id: z.string(),
  consulta: z.string().max(1024, { message: "Must be 2048 or fewer characters long" }),
  respuesta: z.string().max(1024, { message: "Must be 2048 or fewer characters long" }),
  created_at: z.string(),
  updated_at: z.string(),
});

const FormSchemaTramite = z.object({
  id: z.string(),
  documentos_url: z.string().min(5, { message: "Must be 5 or more characters long" }),
  email_id: z.string(),
  informacion: z.string().max(1024, { message: "Must be 2048 or fewer characters long" }),
  presupuesto: z.coerce
    .number()
    .gt(0, { message: 'Por favor ingrese una cantidad mayor a $0.' }),
  tramite: z.string().max(1024, { message: "Must be 2048 or fewer characters long" }),
  created_at: z.string(),
  budgeted_at: z.string(),
  started_at: z.string(),
  canceled_at: z.string(),
  finished_at: z.string(),
  estado: z.enum(['presupuestar', 'presupuestado', 'iniciado', 'cancelado', 'terminado' ], {
    invalid_type_error: 'Seleccione un estado del tramite.',
  }),
});

const FormSchemaComment = z.object({
  id: z.string(),
  email_id: z.string(),
  post_slug: z.string().max(1024, { message: "Must be 1024 or fewer characters long" }),
  comment: z.string().max(1024, { message: "Must be 1024 or fewer characters long" }),
  created_at: z.string(),
  deleted_at: z.string(),
  nombre: z.string().min(2, { message: "Must be 2 or more characters long" }),
  avatar: z.string(),
});

const FormSchemaVerificationToken = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.string(),
});


const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateCustomer = FormSchemaCustomer.omit({ id: true });

const CreateUser = FormSchemaUser.omit({ id: true, role: true, password: true, email_verified: true, created_at: true, updated_at: true });

const CreateUserAccount = FormSchemaUser.omit({ id: true, role: true, email_verified: true, created_at: true, updated_at: true });

const CreateConsulta = FormSchemaConsulta.omit({ created_at: true, respuesta: true,  id: true,  updated_at: true });
const CreateTramite = FormSchemaTramite.omit({ id: true, presupuesto: true, created_at: true, budgeted_at: true, started_at: true, canceled_at: true, finished_at: true, estado: true });
const CreateComment = FormSchemaComment.omit({ id: true, created_at: true, deleted_at: true });
const CreateVerificationToken = FormSchemaVerificationToken;


const UpdateInvoice = FormSchema.omit({ date: true, id: true });
const UpdateCustomer = FormSchemaCustomer.omit({ id: true });
const UpdateUser = FormSchemaUser.omit({ role: true, id: true, password: true, image: true, name: true, email_verified: true, created_at: true, updated_at: true });
const UpdateUserImage = FormSchemaUser.omit({ role: true, id: true, password: true, name: true, email: true, email_verified: true, created_at: true, updated_at: true });
const UpdateUserName = FormSchemaUser.omit({ role: true, id: true, password: true, image: true, email: true, email_verified: true, created_at: true, updated_at: true });

const UpdateUserEmail = FormSchemaUser.omit({ role: true, id: true, password: true, image: true, name: true, email_verified: true, created_at: true, updated_at: true });

const UpdateUserPassword = FormSchemaUser.omit({ role: true, id: true, email: true, image: true, name: true, email_verified: true, created_at: true, updated_at: true });


const UpdateConsulta = FormSchemaConsulta.omit({  created_at: true, id: true, email_id: true, archivos_url: true });
const UpdateTramite = FormSchemaTramite.omit({ created_at: true, id: true, email_id: true, documentos_url: true, tramite: true, informacion: true });
const UpdateComment = FormSchemaComment.omit({ created_at: true, id: true, comment: true, nombre: true });
const UpdateCommentAvatar = FormSchemaComment.omit({ created_at: true, id: true, comment: true, nombre: true, email_id: true, deleted_at: true });
const UpdateCommentEmail = FormSchemaComment.omit({ created_at: true, id: true, comment: true, nombre: true, avatar: true, deleted_at: true, post_slug: true });


// This is temporary
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type StateCustomer = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export type StateUser = {
  errors?: {
    name?: string[];
    email?: string[];
    image?: string[] | undefined;
    // password?: string[];
  };
  message?: string | null;
};
export type StateUserAccount = {
  errors?: {
    name?: string[];
    email?: string[];
    image?: string[] | undefined;
    password?: string[];
  };
  message?: string | null;
};

export type StateUserImage = {
  errors?: {
    image?: string[] | undefined;
  };
  message?: string | null;
};

export type StateUserName = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export type StateUserEmail = {
  errors?: {
    email?: string[];
  };
  message?: string | null;
};

export type StateUserPassword = {
  errors?: {
    password?: string[];
  };
  message?: string | null;
};

export type StateConsulta = {
  errors?: {
    email_id?: string[];
    archivos_url?: string[] | undefined;
    consulta?: string[];
  };
  message?: string | null;
};

export type StateUpdateConsulta = {
  errors?: {
    consulta?: string[];
    respuesta?: string[];
    updated_at?: string[];
  };
  message?: string | null;
};

export type StateUpdateTramite = {
  errors?: {
    estado?: string[];
    presupuesto?: string[];
    budgeted_at?: string[] | undefined;
    started_at?: string[] | undefined;
    canceled_at?: string[] | undefined;
    finished_at?: string[] | undefined;
  };
  message?: string | null;
};

export type StateCreateTramite = {
  errors?: {
    documentos_url?: string[] | undefined;
    email_id?: string[];
    informacion?: string[] | undefined;
    tramite?: string[];
  };
  message?: string | null;
};

export type StateComment = {
  errors?: {
    email_id?: string[];
    post_slug?: string[];
    comment?: string[];
    nombre?: string[] | undefined;
    avatar?: string[] | undefined;
  };
  message?: string | null;
};

export type StateUpdateComment = {
  errors?: {
    email_id?: string[] | undefined;
    post_slug?: string[];
    avatar?: string[] | undefined;
  };
  message?: string | null;
};

export type StateUpdateCommentEmail = {
  errors?: {
    email_id?: string[] | undefined;
  };
  message?: string | null;
};

export type StateUpdateCommentAvatar = {
  errors?: {
    avatar?: string[] | undefined;
    post_slug?: string[];
  };
  message?: string | null;
};
export type StateUpdateCommentAvatarMenu = {
  errors?: {
    avatar?: string[] | undefined;
    post_slug?: string[];
  };
  message?: string | null;
};

export type StateVerificationToken = {
  errors?: {
    identifier?: string[];
    token?: string[];
    expires?: string[];
  };
  message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear la factura.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
    
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
      
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}



export async function createCustomer(prevStateCustomer: StateCustomer, formData: FormData) {
  // Validate form fields using Zod
  const validatedFieldsCustomer = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFieldsCustomer.success) {
    return {
      errors: validatedFieldsCustomer.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear el cliente.',
    };
  }

  // Prepare data for insertion into the database
  const { name, email, image_url } = validatedFieldsCustomer.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO customers (name, email, image_url)
      VALUES (${name}, ${email}, ${image_url})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: No se pudo crear el cliente.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
export async function updateCustomer(
  id: string,
  prevState: StateCustomer,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }

  const { name, email, image_url } = validatedFields.data;

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${image_url}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
export async function deleteCustomer(id: string) {
  // throw new Error('Failed to Delete Customer');

  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted Customer' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}



export async function createConsulta(prevStateConsulta: StateConsulta, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateConsulta.safeParse({
    email_id: formData.get('email_id'),
    archivos_url: formData.get('archivos_url'),
    consulta: formData.get('consulta'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo enviar la consulta.',
    };
  }

  // Prepare data for insertion into the database
  const { email_id, archivos_url, consulta } = validatedFields.data;

  // Insert data into the database 
  try {
    await sql`
      INSERT INTO consultas ( email_id, archivos_url, consulta )
      VALUES ( ${email_id}, ${archivos_url}, ${consulta})
    `;
    return {
      message: "consultaCreada",
    };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Error al crear consulta.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/');
  // redirect('/');
}
export async function updateConsulta(
  id: string,
  prevStateUpdateConsulta: StateUpdateConsulta,
  formData: FormData,
) {
  const validatedFields = UpdateConsulta.safeParse({
    consulta: formData.get('consulta'),
    respuesta: formData.get('respuesta'),
    updated_at: formData.get('updated_at'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Consulta.',
    };
  }

  const { consulta, respuesta, updated_at } = validatedFields.data;

  try {
    await sql`
      UPDATE consultas
      SET consulta = ${consulta}, respuesta = ${respuesta}, updated_at = ${updated_at}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Consulta.' };
  }

  revalidatePath('/dashboard/consultas');
  redirect('/dashboard/consultas');
}
export async function deleteConsulta(id: string) {
  // throw new Error('Failed to Delete Consulta');
  try {
    await sql`DELETE FROM consultas WHERE id = ${id}`;
    revalidatePath('/dashboard/consulta');
    return { message: 'Deleted Consulta' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Consulta.' };
  }
}


export async function createTramite(prevStateTramite: StateCreateTramite, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateTramite.safeParse({
    documentos_url: formData.get('documentos_url'),
    email_id: formData.get('email_id'),
    informacion: formData.get('informacion'),
    tramite: formData.get('tramite'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo enviar el pedido de presupuesto.',
    };
  }

  // Prepare data for insertion into the database
  const { documentos_url, email_id, informacion, tramite } = validatedFields.data;

  // Insert data into the database 
  try {
    await sql`
      INSERT INTO tramites (  email_id, documentos_url, informacion, tramite )
      VALUES ( ${email_id}, ${documentos_url}, ${informacion}, ${tramite} )
    `;
    return {
      message: `tramiteIniciado`,
    };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Error al pedir presupuesto.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/');
  redirect('/');
}
export async function updateTramite(
  id: string,
  prevStateUpdateTramite: StateUpdateTramite,
  formData: FormData,
) {
  const validatedFields = UpdateTramite.safeParse({
    estado: formData.get('estado'),
    presupuesto: formData.get('presupuesto'),
    budgeted_at: formData.get('budgeted_at'),
    started_at: formData.get('started_at'),
    canceled_at: formData.get('canceled_at'),
    finished_at: formData.get('finished_at'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Tramite.',
    };
  }

  const { estado, presupuesto, budgeted_at, started_at, canceled_at, finished_at } = validatedFields.data;

  const newDate= new Date().toISOString().split('T')[0]
  const presupuestoInCents =  presupuesto * 100 ;
  const budgeted =  budgeted_at ? budgeted_at : estado === "presupuestado" ? newDate : null;
  const started =  started_at ? started_at : estado === "iniciado" ? newDate : null;
  const canceled =  canceled_at ? canceled_at : estado === "cancelado" ? newDate : null;
  const finished =  finished_at ? finished_at : estado === "terminado" ? newDate : null;

  try {
    await sql`
      UPDATE tramites
      SET estado = ${estado}, presupuesto = ${presupuestoInCents}, budgeted_at = ${budgeted}, started_at = ${started}, canceled_at = ${canceled}, finished_at = ${finished}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Tramite.' };
  }

  revalidatePath('/dashboard/tramites');
  redirect('/dashboard/tramites');
}
export async function deleteTramite(id: string) {
  // throw new Error('Failed to Delete Tramite');
  try {
    await sql`DELETE FROM tramites WHERE id = ${id}`;
    revalidatePath('/dashboard/tramites');
    return { message: 'Deleted Tramite' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Tramite.' };
  }
}


export async function createUser(prevStateUser: StateUser, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
    // password: formData.get('password'),
    // confirmPassword: formData.get('confirmPassword'),
  });

  const pathname= formData.get("pathname")
  const token= formData.get("token")

  // const password= formData.get("password")
  // const confirmPassword= formData.get("confirmPassword")
  
  // Validate confirm password
  // const pwd= formData.get("password")
  // const confirmPwd= formData.get("confirmPassword")
  // if (pwd !== confirmPwd) {
  //   return {
  //     errors: {},
  //     message: 'Las contraseñas no coinciden.',
  //   };
  // }

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear el Usuario.',
    };
  }
  
  // Prepare data for insertion into the database
  const { name, email, image  } = validatedFields.data;

  const contraseña = await bcrypt.hash("xxxxxx", 10); 
  const hashedPassword= /* pwd ? `${pwd}` : */ contraseña

  const role= email === "comment@gmail.com" ? "visitor" : /* pwd ? "memberAccount" : */  "member"

  const emailToken= email === "comment@gmail.com" ? `${token}@cnpmandataria.com` : email
  const imageNull= image === "" ? null : image

  // Insert data into the database
  try {
    await sql`
      INSERT INTO users (name, email, image, password, role )
      VALUES (${name}, ${emailToken}, ${imageNull}, ${hashedPassword}, ${role} )
      ON CONFLICT(email)
      DO UPDATE SET
      name = EXCLUDED.name
      -- image = EXCLUDED.image,
      -- password = EXCLUDED.password,
      -- role = EXCLUDED.role
    `;

    // return {
    //   message: `usuario`,
    // };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error`,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);
}
export async function createUser2(prevStateUser: StateUser, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
  });

  // const pathname= formData.get("pathname")
  const token= formData.get("token")
  
  // Validate confirm password
  // const pwd= formData.get("password")
  // const confirmPwd= formData.get("confirmPassword")
  // if (pwd !== confirmPwd) {
  //   return {
  //     errors: {},
  //     message: 'Las contraseñas no coinciden.',
  //   };
  // }
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo verificar.',/* crear el Usuario */
    };
  }
  
  // Prepare data for insertion into the database
  const { name, email, image  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash("xxxxxx", 10); 

  // const role= "member"
  const role= email === "comment@gmail.com" ? "visitor" : "member"


  const emailToken= email === "comment@gmail.com" ? `${token}@cnpmandataria.com` : email
  const imageNull= image === "" ? null : image

  // Insert data into the database
  try {
    await sql`
      INSERT INTO users (name, email, image, password, role )
      VALUES (${name}, ${emailToken}, ${imageNull}, ${hashedPassword}, ${role} )
      ON CONFLICT(email)
      DO UPDATE SET
      name = EXCLUDED.name
      -- image = EXCLUDED.image,
      -- password = EXCLUDED.password,
      -- role = EXCLUDED.role
    `;

    return {
      message: `usuario`,
    };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error`,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath(`${pathname}`);
  // redirect(`${pathname}`);
}
export async function createUserAccount(prevStateUserAccount: StateUserAccount, formData: FormData) {

  // Validate form fields using Zod
  const validatedFields = CreateUserAccount.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image: formData.get('image'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      // message: 'Campos faltantes. No se pudo crear el Usuario.',
    };
  }
  
  // Prepare data for insertion into the database
  const { name, email, image, password  } = validatedFields.data;

  const role= "member"

  const imageNull= image === "" ? null : image

  const hashedPassword = await bcrypt.hash("xxxxxx", 10); 

  // Insert data into the database
  try {
    await sql`
      INSERT INTO users (name, email, image, password, role )
      VALUES (${name}, ${email}, ${imageNull}, ${hashedPassword}, ${role} )
    `;

    return {
      message: `usuario`,
    };
  } catch (error ) {
    // console.log("error:", error )

    // if (error.code === "23505") {
    //   return {
    //     message: 'El email ya existe.',
    //   };
    // }
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error`,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/login');
  redirect('/login');
}

export async function updateUserImage(
  id: string,
  prevStateUserImage: StateUserImage,
  formData: FormData,
) {
  const validatedFields = UpdateUserImage.safeParse({
    image: formData.get('image'),
  });

  const pathname= formData.get("pathname")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar la imagen del Usuario.',
    };
  }

  const { image } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET image = ${image}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar la imagen del Usuario.' };
  }
  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);
}
export async function updateUserName(
  id: string,
  prevStateUserName: StateUserName,
  formData: FormData,
) {
  const validatedFields = UpdateUserName.safeParse({
    name: formData.get('name'),
  });

  const pathname= formData.get("pathname")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar el nombre del Usuario.',
    };
  }

  const { name } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET name = ${name}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar el nombre  del Usuario.' };
  }

  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);
}
export async function updateUserEmail(
  id: string,
  prevStateUserEmail: StateUserEmail,
  formData: FormData,
) {
  const validatedFields = UpdateUserEmail.safeParse({
    email: formData.get('email'),
  });

  const pathname= formData.get("pathname")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar el nombre del Usuario.',
    };
  }

  const { email } = validatedFields.data;
  const role= "member"

  try {
    await sql`
      UPDATE users
      SET email = ${email}, 
          role = ${role}
      WHERE email = ${id}
    `;

    return {
      message: `emailOk`,
    };

  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar el nombre  del Usuario.' };
  }

  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);
}
export async function updateUserPassword(
  id: string,
  prevStateUserPassword: StateUserPassword,
  formData: FormData,
) {
  const validatedFields = UpdateUserPassword.safeParse({
    password: formData.get('password'),
  });

  // const pathname= formData.get("pathname")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar la contraseña del Usuario.',
    };
  }

  const { password } = validatedFields.data;

  const contraseña = await bcrypt.hash(password, 10); 
  // const hashedPassword= /* pwd ? `${pwd}` : */ contraseña
  const role= "memberAccount"

  try {
    await sql`
      UPDATE users
      SET password = ${contraseña}, 
          role = ${role}
      WHERE email = ${id}
    `;

    return {
      message: `contraseñaActualizada`,
    };

  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar la contraseña  del Usuario.' };
  }

  // revalidatePath(`${pathname}`);
  // redirect(`${pathname}`);
}

export async function updateUserEmailVerified(
  identifier: string
) {
  const newDate= new Date().toISOString()
  try {
    await sql`
      UPDATE users
      SET email_verified = ${newDate},
          role = 'memberVerified'
      WHERE email = ${identifier}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar a el Usuario.' };
  }
}
// export async function updateUserEmailVerifiedx(
//   identifier: string,
//   email_verified: string,
// ) {
//   // const newDate= new Date().toISOString()
//   let role
//   email_verified === "null" ? role = "member" : role = "memberAccount"
//   try {
//     await sql`
//       UPDATE users
//       SET role = ${role}
//       WHERE email = ${identifier}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: No se pudo actualizar a el Usuario.' };
//   }
// }


export async function createComment(prevStateComment: StateComment, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateComment.safeParse({
    email_id: formData.get('email_id'),
    post_slug: formData.get('post_slug'),
    comment: formData.get('comment'),
    nombre: formData.get('nombre'),
    avatar: formData.get('avatar'),
  });

  const pathname= formData.get("pathname")
  const token= formData.get("token")

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo enviar el comentario.',
    };
  }

  // Prepare data for insertion into the database
  const { email_id, post_slug, comment, nombre, avatar } = validatedFields.data;

  const emailToken= email_id === "" ? `${token}@cnpmandataria.com` : email_id

  const date=  null
  const avatarNull= avatar === "" ? null : avatar 

  // Insert data into the database 
  try {
    await sql`
      INSERT INTO comments ( email_id, post_slug, deleted_at, comment, nombre, avatar )
      VALUES ( ${emailToken}, ${post_slug}, ${date}, ${comment}, ${nombre}, ${avatarNull} )
    `;
    // return {
    //   message: 'ok',
    // };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Error al crear el comentario.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);

}
export async function updateCommentEmail(
  id: string,
  prevStateUpdateCommentEmail: StateUpdateCommentEmail,
  formData: FormData,
) {
  const validatedFields = UpdateCommentEmail.safeParse({
    email_id: formData.get('email_id'),
  });

  const pathname= formData.get("pathname")

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Comment.',
    };
  }

  const { email_id } = validatedFields.data;

  try {
    await sql`

    UPDATE comments
    SET email_id = ${email_id}
    WHERE email_id = ${id} 

    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Comment.' };
  }

  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);
}
export async function updateCommentAvatar(
  id2: string,
  prevStateUpdateCommentImage: StateUpdateCommentAvatar,
  formData: FormData,
) {
  const validatedFields = UpdateCommentAvatar.safeParse({
    avatar: formData.get('avatar'),
    post_slug: formData.get('post_slug'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar la imagen del Usuario.',
    };
  }

  const { avatar, post_slug } = validatedFields.data;

  try {
    await sql`
      UPDATE comments
      SET avatar = ${avatar}
      WHERE email_id = ${id2}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar la imagen del Usuario.' };
  }

  // revalidatePath('/realizar-consulta');
  // redirect('/realizar-consulta');
  revalidatePath(`/faq/${post_slug}`);
  redirect(`/faq/${post_slug}`);
}

export async function updateComment(
  id2: string,
  prevStateStateComment: StateUpdateComment,
  formData: FormData,
) {
  const validatedFields = UpdateComment.safeParse({
    email_id: formData.get('email_id'),
    post_slug: formData.get('post_slug'),
    // deleted_at: formData.get('deleted_at'),
    // nombre: formData.get('nombre'),
    avatar: formData.get('avatar'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Comment.',
    };
  }

  const { email_id, post_slug,/* deleted_at, nombre, */ avatar } = validatedFields.data;

  // const date = new Date(deleted_at).toISOString();

  try {
    await sql`

    UPDATE comments
    SET avatar = ${avatar},
        email_id = ${email_id},
        
    WHERE comment = ${id2} 

    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Comment.' };
  }

  // revalidatePath('/dashboard/consultas');
  // redirect('/dashboard/consultas');
  revalidatePath(`/faq/${post_slug}`);
  redirect(`/faq/${post_slug}`);
}
export async function updateCommentDelete(
  id: string
) {
  const newDate= new Date().toISOString()
  try {
    await sql`
      UPDATE comments
      SET deleted_at = ${newDate}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar el comentario.' };
  }
}


export async function updateCommentComment(
  id: string
) {
  try {
    await sql`
      UPDATE comments
      SET comment = ${id}
      WHERE comment = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar a el comentario.' };
  }
}
export async function updateCommentxxxx(
  id2: string,
  prevStateStateComment: StateUpdateComment,
  formData: FormData,
) {
  const validatedFields = UpdateComment.safeParse({
    email_id: formData.get('email_id'),
    post_slug: formData.get('post_slug'),
    // comment: formData.get('comment'),
    // nombre: formData.get('nombre'),
    avatar: formData.get('avatar'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Comment.',
    };
  }

  const { email_id,  post_slug, /*comment, nombre, */ avatar } = validatedFields.data;

  try {
    await sql`
      INSERT INTO comments ( id, email_id, /* post_slug, comment, nombre, */ avatar )
      VALUES ( ${id2}, ${email_id},  ${avatar} )
      ON CONFLICT(id2)
      DO UPDATE SET
      -- email_id = EXCLUDED.email_id,
      post_slug = EXCLUDED.post_slug,
      comment = EXCLUDED.comment,
      nombre = EXCLUDED.nombre
      -- avatar = EXCLUDED.avatar
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Comment.' };
  }

  // revalidatePath('/dashboard/consultas');
  // redirect('/dashboard/consultas');
  revalidatePath(`/faq/${post_slug}`);
  redirect(`/faq/${post_slug}`);
}
export async function deleteComment(id: string) {
  // throw new Error('Failed to Delete Comment');
  try {
    await sql`DELETE FROM comments WHERE id = ${id}`;
    revalidatePath('/faq');
    return { message: 'Comentario eliminado' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Comment.' };
  }
}

export async function updateCommentAvatarMenu(
  id: string,
  prevStateUpdateCommentAvatarMenu: StateUpdateCommentAvatarMenu,
  formData: FormData,
) {
  const validatedFields = UpdateCommentAvatar.safeParse({
    avatar: formData.get('avatar'),
    post_slug: formData.get('post_slug'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar la imagen del Usuario.',
    };
  }

  const { avatar, post_slug } = validatedFields.data;

  console.log({id, avatar, post_slug})

  // const idxx= '2024-01-01 00:00:00+00'

  try {
    await sql`
      UPDATE comments
      SET avatar = ${avatar}
      WHERE avatar = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar la imagen del Usuario.' };
  }

  // revalidatePath('/realizar-consulta');
  // redirect('/realizar-consulta');
  revalidatePath(post_slug);
  redirect(post_slug);
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {

  const token= formData.get("token")

  formData.set("email", `${token}@cnpmandataria.com`);
  
  formData.set("password", "xxxxxx");
  formData.set("conConsulta", "consulta")
  
  try {
    await signIn('credentials', formData );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales no válidas.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}
export async function authenticate2(
  prevState: string | undefined,
  formData: FormData,
) {

  formData.set("password", "xxxxxx")
  formData.set("redirectTo", "/dashboard")
  formData.set("conConsulta", "noconsulta")

  // const password= formData.get("passsword")
  // password === "" ? formData.set("password", "xxxxxx") : formData.set("password", `${password}`) ;
  
  try {
    await signIn('credentials', formData );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credencial no válida.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}
export async function authenticate3(
  prevState: string | undefined,
  formData: FormData,
) {

  formData.set("password", "xxxxxx")
  formData.set("conConsulta", "consulta")

  // const password= formData.get("passsword")
  // password === "" ? formData.set("password", "xxxxxx") : formData.set("password", `${password}`) ;
  
  try {
    await signIn('credentials', formData );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales no válidas.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}
export async function authenticate4(
  prevState: string | undefined,
  formData: FormData,
) {

  // formData.set("password", "xxxxxx")

  // const passwordAccount= formData.get("password")
  // password === "" ? formData.set("password", "xxxxxx") : formData.set("password", `${password}`) ;

  formData.set("password", "xxxxxx" )
  formData.set("redirectTo", "/dashboard")
  formData.set("conConsulta", "noconsulta")
  // formData.set("redirectTox", "/dashboard")
  
  try {
    await signIn('credentials', formData );
  } catch (error) {
    if (error instanceof AuthError) {
      // switch (error.type) {
        // case 'CredentialsSignin':
          return error.cause?.err?.message;
        // default:
        //   return 'Algo salió mal.';
      }
      throw error;
    }
    
  
}
// export async function authenticate4(
//   prevState: string | undefined,
//   formData: FormData,
// ) {

//   // formData.set("password", "xxxxxx")

//   // const password= formData.get("passsword")
//   // password === "" ? formData.set("password", "xxxxxx") : formData.set("password", `${password}`) ;

//   formData.set("password", "xxxxxx")
//   formData.set("redirectTo", "/dashboard")
//   formData.set("conConsulta", "noconsulta")
//   // formData.set("redirectTox", "/dashboard")
  
//   try {
//     await signIn('credentials', formData );
//   } catch (error) {
//     if (error instanceof AuthError) {
//       // switch (error.type) {
//         // case 'CredentialsSignin':
//           return error.cause?.err?.message;
//         // default:
//         //   return 'Algo salió mal.';
//       }
//       throw error;
//     }
    
  
// }



export async function handleFormPresupuesto(formData: FormData) {
  const title= formData.get("title")
  const to_name= formData.get("to_name")
  const to_email= formData.get("to_email")
  const content= formData.get("content")
  const validez= formData.get("validez")
  const tramite= formData.get("tramite")

  if (!title || !to_name || !to_email || !content || !validez || !tramite ) {
    return console.log("Por favor llene todos los campos")
  }
  
  await emailPresupuesto({
    subject: title as string,
    to: [{
      name: to_name as string,
      email: to_email as string
      }],
    htmlContent: content as string,
    validez: validez as string,
    tramite: tramite as string
  })
}

export async function handleFormRespuesta(formData: FormData) {
  const title= formData.get("title")
  const to_name= formData.get("to_name")
  const to_email= formData.get("to_email")
  const content= formData.get("content")
  const consulta= formData.get("consulta")

  if (!title || !to_name || !to_email || !content || !consulta ) {
    return console.log("Por favoe llene todos los campos")
  }
  
  await emailRespuesta({
    subject: title as string,
    to: [{
      name: to_name as string,
      email: to_email as string
      }],
    htmlContent: content as string,
    consulta: consulta as string
  })
}

export async function handleFormRegistro(formData: FormData) {
  const title= formData.get("title")
  const to_name= formData.get("to_name")
  const to_email= formData.get("to_email")
  const content= formData.get("content")

  if (!title || !to_name || !to_email || !content ) {
    return console.log("Por favoe llene todos los campos")
  }

  console.log({title, to_name, to_email, content})
  
  await emailConfirmRegistro({
    subject: title as string,
    to: [{
      name: to_name as string,
      email: to_email as string
      }],
    htmlContent: content as string
  })
}

export async function handleFormPedido(formData: FormData) {
  // const title= formData.get("title")
  const to_name= formData.get("to_name")
  const to_email= formData.get("to_email")
  const content= formData.get("content")
  const token= formData.get("token")

  if (/* !title || */ !to_name || !to_email || !content || !token ) {
    return console.log("Por favoe llene todos los campos")
  }
  
  await emailVerification({
    // subject: title as string,
    to: [{
      name: to_name as string,
      email: to_email as string
      }],
    htmlContent: content as string,
    token: token as string
  })
}



export async function createVerificationToken(prevStateVerificationToken: StateVerificationToken, formData: FormData ) {
  // Validate form fields using Zod
  const validatedFields = CreateVerificationToken.safeParse({
    identifier: formData.get('identifier'),
    token: formData.get('token'),
    expires: formData.get('expires'),
  });

  const pathname= formData.get("pathname")
  
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear VerificationToken.',
    };
  }

  // Prepare data for insertion into the database
  const { identifier, token, expires } = validatedFields.data;

  const date = new Date(expires).toISOString();

  try {
    await sql`
      INSERT INTO verification_token (identifier, token, expires)
      VALUES ( ${identifier}, ${token}, ${date}  )
    `;

  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create VerificationToken.',
    };
  }
      
  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath(`${pathname}`);
  redirect(`${pathname}`);
}
export async function deleteVerificationToken(email: string) {
  try {
    await sql`DELETE FROM verification_token WHERE identifier = ${email}`;
    return { message: 'Verificacion token eliminado' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Verificacion token.' };
  }
}
export async function deleteVerification(identifier: string) {
  try {
    await sql`DELETE FROM verification_token WHERE identifier = ${identifier}`;
    // return { message: 'Verificacion token eliminado' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Verificacion token.' };
  }

  // // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/realizar-consulta');
  // redirect('/realizar-consulta');
}



export async function createVerificationToken2(email: string, token:string ) {
  const expires= new Date(Date.now() + 1000 * 60 * 60 * 24)
  const date = new Date(expires).toISOString();

  try {
    await sql`
      INSERT INTO verification_token (identifier, token, expires)
      VALUES ( ${email}, ${token}, ${date}  )
    `;

  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create VerificationToken.',
    };
  }
}