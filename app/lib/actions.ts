'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect, useRouter } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";
import { emailPresupuesto } from "@/app/lib/brevo/email-presupuesto";
import { emailRespuesta } from "@/app/lib/brevo/email-respuesta";
import { emailConfirmRegistro } from "@/app/lib/brevo/email-confirm-registro";
import { emailConfirmPedido } from "@/app/lib/brevo/email-confirm-pedido";

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
  name: z.string().min(2, { message: "Must be 2 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
  confirmPassword: z.string().min(5, { message: "Must be 5 or more characters long" }),
  role: z.enum(['admin', 'member', 'memberAccount'], {
    invalid_type_error: 'Seleccione un rol de usuario.',
  }),
  image: z.string(),
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
  nombre: z.string().min(2, { message: "Must be 2 or more characters long" }),
});


const CreateInvoice = FormSchema.omit({ id: true, date: true });
const CreateCustomer = FormSchemaCustomer.omit({ id: true });
const CreateUser = FormSchemaUser.omit({ id: true, image: true, role: true, password: true, confirmPassword: true });
const CreateConsulta = FormSchemaConsulta.omit({ created_at: true, respuesta: true,  id: true,  updated_at: true });
const CreateTramite = FormSchemaTramite.omit({ id: true, presupuesto: true, created_at: true, budgeted_at: true, started_at: true, canceled_at: true, finished_at: true, estado: true });
const CreateComment = FormSchemaComment.omit({ id: true, created_at: true });

const UpdateInvoice = FormSchema.omit({ date: true, id: true });
const UpdateCustomer = FormSchemaCustomer.omit({ id: true });
const UpdateUser = FormSchemaUser.omit({ role: true, id: true, password: true, confirmPassword: true, image: true, name: true });
const UpdateUserImage = FormSchemaUser.omit({ role: true, id: true, password: true, confirmPassword: true, name: true, email: true });
const UpdateUserName = FormSchemaUser.omit({ role: true, id: true, password: true, confirmPassword: true, image: true, email: true });
const UpdateUserEmail = FormSchemaUser.omit({ role: true, id: true, password: true, confirmPassword: true, image: true, name: true });
const UpdateConsulta = FormSchemaConsulta.omit({  created_at: true, id: true, email_id: true, archivos_url: true });
const UpdateTramite = FormSchemaTramite.omit({ created_at: true, id: true, email_id: true, documentos_url: true, tramite: true, informacion: true });


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
    // password?: string[];
    // confirmPassword?: string[];
    // role?: string[] | undefined;
    // image?: string[] | undefined;
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
  };
  message?: string | null;
};

// export type StateUpdateComment = {
//   errors?: {
//     email_id?: string[];
//     respuesta?: string[];
//     updated_at?: string[];
//   };
//   message?: string | null;
// };


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
    // user_id: formData.get('user_id'),
    email_id: formData.get('email_id'),
    archivos_url: formData.get('archivos_url'),
    consulta: formData.get('consulta'),
    // respuesta: formData.get('respuesta'),
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
      message: `consultaCreada`,
    };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Error al crear consulta.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/dashboard/tusConsultas');
  // redirect('/dashboard/tusConsultas');

  revalidatePath('/');
  redirect('/');
}
export async function updateConsulta(
  id: string,
  prevStateUpdateConsulta: StateUpdateConsulta,
  formData: FormData,
) {
  const validatedFields = UpdateConsulta.safeParse({
    // name: formData.get('name'),
    // email: formData.get('email'),
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
      VALUES ( ${email_id}, ${documentos_url}, ${informacion}, ${tramite})
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
  // revalidatePath('/dashboard/tusConsultas');
  // redirect('/dashboard/tusConsultas');

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
  console.log("formData:", formData)
  // Validate form fields using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    // password: formData.get('password'),
    // confirmPassword: formData.get('confirmPassword'),
    // role: formData.get('role'),
    /* image: formData.get('image'), */
  });
  
  // Validate confirm password
  const pwd= formData.get("password")
  const confirmPwd= formData.get("confirmPassword")
  if (pwd !== confirmPwd) {
    return {
      errors: {},
      message: 'Las contraseñas no coinciden.',
    };
  }
  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo crear el Usuario.',
    };
  }
  
  // Prepare data for insertion into the database
  const { name, email, /* password */  } = validatedFields.data;
  let passwordMember= "xxxxxx"
  // password === "" ? passwordMember = "xxxxxx" : passwordMember = password
  const hashedPassword = await bcrypt.hash(passwordMember, 10); 
  
  let role= "member"
  // password === "xxxxxx" ? rol = "member" : rol = "memberAccount"
  // password === "" ? rol = "member" : rol = "memberAccount"

  // Insert data into the database
  try {
    await sql`
      INSERT INTO users (name, email, password, role )
      VALUES (${name}, ${email}, ${hashedPassword}, ${role} )
      ON CONFLICT(email)
      DO UPDATE SET
      name = EXCLUDED.name,
      password = EXCLUDED.password,
      role = EXCLUDED.role
    `;
    return {
      message: `usuario`,
    };
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: El email ya existe.`,
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  // revalidatePath('/login');
  // redirect('/login');
  
  revalidatePath('/realizar-consulta');
  redirect('/realizar-consulta');

}
export async function updateUser(
  id: string,
  prevStateUser: StateUser,
  formData: FormData,
) {
  const validatedFields = UpdateUser.safeParse({
    // name: formData.get('name'),
    email: formData.get('email'),
    /* image: formData.get('image'), */
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar a el Usuario.',
    };
  }

  const { /* name, */ email/* , image */ } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET email = ${email}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar a el Usuario.' };
  }

  revalidatePath('/dashboard/perfil');
  redirect('/dashboard/perfil');
}
export async function updateUserImage(
  id: string,
  prevStateUserImage: StateUserImage,
  formData: FormData,
) {
  const validatedFields = UpdateUserImage.safeParse({
    image: formData.get('image'),
  });

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

  revalidatePath('/dashboard/perfil');
  redirect('/dashboard/perfil');
}
export async function updateUserName(
  id: string,
  prevStateUserName: StateUserName,
  formData: FormData,
) {
  const validatedFields = UpdateUserName.safeParse({
    name: formData.get('name'),
  });

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

  revalidatePath('/dashboard/perfil');
  redirect('/dashboard/perfil');
}
export async function updateUserEmail(
  id: string,
  prevStateUserEmail: StateUserEmail,
  formData: FormData,
) {
  const validatedFields = UpdateUserEmail.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. No se pudo actualizar el nombre del Usuario.',
    };
  }

  const { email } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET email = ${email}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: No se pudo actualizar el nombre  del Usuario.' };
  }

  revalidatePath('/dashboard/perfil');
  redirect('/dashboard/perfil');
}

export async function createComment(prevStateComment: StateComment, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateComment.safeParse({
    email_id: formData.get('email_id'),
    post_slug: formData.get('post_slug'),
    comment: formData.get('comment'),
    nombre: formData.get('nombre'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Campos faltantes. No se pudo enviar el comentario.',
    };
  }

  // Prepare data for insertion into the database
  const { email_id, post_slug, comment, nombre } = validatedFields.data;

  // Insert data into the database 
  try {
    await sql`
      INSERT INTO comments ( email_id, post_slug, comment, nombre )
      VALUES ( ${email_id}, ${post_slug}, ${comment}, ${nombre})
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
  revalidatePath(`/faq/${post_slug}`);
  redirect(`/faq/${post_slug}`);

  // revalidatePath('/dashboard/tusConsultas');
  // redirect('/dashboard/tusConsultas');

}
// export async function updateComment(
//   id: string,
//   prevStateUpdateComment: StateUpdateComment,
//   formData: FormData,
// ) {
//   const validatedFields = UpdateConsulta.safeParse({
//     // name: formData.get('name'),
//     // email: formData.get('email'),
//     consulta: formData.get('consulta'),
//     respuesta: formData.get('respuesta'),
//     updated_at: formData.get('updated_at'),
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Consulta.',
//     };
//   }

//   const { consulta, respuesta, updated_at } = validatedFields.data;

//   try {
//     await sql`
//       UPDATE consultas
//       SET consulta = ${consulta}, respuesta = ${respuesta}, updated_at = ${updated_at}
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Consulta.' };
//   }

//   revalidatePath('/dashboard/consultas');
//   redirect('/dashboard/consultas');
// }
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


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  
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
  const title= formData.get("title")
  const to_name= formData.get("to_name")
  const to_email= formData.get("to_email")
  const content= formData.get("content")

  if (!title || !to_name || !to_email || !content ) {
    return console.log("Por favoe llene todos los campos")
  }
  
  await emailConfirmPedido({
    subject: title as string,
    to: [{
      name: to_name as string,
      email: to_email as string
      }],
    htmlContent: content as string
  })
}
