import { sql } from '@vercel/postgres'
import {
  CustomerField,
  CustomersTableType,
  Consulta,
  Tramite,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
  Customer,
  ConsultasTable,
  TramitesTable,
  Comment,
  // CommentLast,
  CommentsPost,
  VerificationToken,
} from './definitions'
import { formatCurrency } from './utils'
import { unstable_noStore as noStore } from 'next/cache'


export async function fetchRevenue() {
  noStore()

  try {
    const data = await sql<Revenue>`SELECT * FROM revenue
    ORDER BY revenue.id ASC`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore()
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore()
  try {
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;
    const consultaCountPromise = sql`SELECT COUNT(*) FROM consultas`;
    const tramiteCountPromise = sql`SELECT COUNT(*) FROM tramites`;
    const respondidaCountPromise = sql`SELECT COUNT(*) FROM consultas WHERE respuesta != 'null'`;
    const terminadoCountPromise = sql`
      SELECT COUNT(*) 
      FROM tramites 
      WHERE 
        estado = 'terminado' OR
        estado = 'cancelado'
    `;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
      consultaCountPromise,
      tramiteCountPromise,
      respondidaCountPromise,
      terminadoCountPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');
    const numberOfConsultas = Number(data[3].rows[0].count ?? '0');
    const numberOfTramites = Number(data[4].rows[0].count ?? '0');
    const numberOfRespondidas = Number(data[5].rows[0].count ?? '0');
    const numberOfTerminados = Number(data[6].rows[0].count ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
      numberOfConsultas,
      numberOfTramites,
      numberOfRespondidas,
      numberOfTerminados,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}
export async function fetchCardDataMember(email: string) {
  noStore()
  try {
    const consultaCountPromise = sql`SELECT COUNT(*) FROM consultas WHERE email_id = ${email}`;
    const tramiteCountPromise = sql`SELECT COUNT(*) FROM tramites WHERE email_id = ${email}`;

    const data = await Promise.all([
      consultaCountPromise,
      tramiteCountPromise,
    ]);

    const numberOfConsultas = Number(data[0].rows[0].count ?? '0');
    const numberOfTramites = Number(data[1].rows[0].count ?? '0');

    return {
      numberOfConsultas,
      numberOfTramites,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number,) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
	  `;
    console.log("data: ", data)
    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchFilteredConsultas(query: string, currentPage: number,) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const consultas = await sql<ConsultasTable>`
    SELECT
    consultas.id,
    consultas.consulta,
    consultas.respuesta,
    consultas.created_at,
    consultas.updated_at,
    consultas.email_id,
    users.name,
    users.email_verified,
    users.image
    FROM consultas
    JOIN users ON consultas.email_id = users.email
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
      ORDER BY consultas.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return consultas.rows;
  } catch (error) {
    console.error('Failed to fetch consultas:', error);
    throw new Error('No se pudieron recuperar las consultas.');
  }
}
export async function fetchFilteredTramites(query: string, currentPage: number,) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tramites = await sql<TramitesTable>`
    SELECT
    tramites.id,
    tramites.tramite,
    tramites.documentos_url,
    tramites.informacion,
    tramites.presupuesto,
    tramites.estado,
    tramites.created_at,
    tramites.budgeted_at,
    tramites.started_at,
    tramites.canceled_at,
    tramites.finished_at,
    tramites.email_id,
    users.name,
    users.email_verified,
    users.image
    FROM tramites
    JOIN users ON tramites.email_id = users.email
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`}
      ORDER BY tramites.created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return tramites.rows;
  } catch (error) {
    console.error('Failed to fetch trámites:', error);
    throw new Error('No se pudieron recuperar las trámites.');
  }
}


export async function fetchFilteredConsultasM(id: string | null | undefined, currentPage: number,) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const consultas = await sql<Consulta>`
      SELECT
      id,
      consulta,
      respuesta,
      created_at,
      updated_at,
      archivos_url
      FROM consultas 
      WHERE
      email_id = ${id}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    return consultas.rows;
  } catch (error) {
    console.error('Failed to fetch consultas:', error);
    throw new Error('No se pudieron recuperar las consultas.');
  }
}
export async function fetchFilteredTramitesM(email: string | null | undefined, currentPage: number,) {
  noStore()
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const tramites = await sql<Tramite>`
      SELECT
      id,
      tramite,
      documentos_url,
      informacion,
      email_id,
      estado,
      presupuesto,
      created_at,
      budgeted_at,
      started_at,
      canceled_at,
      finished_at
      FROM tramites 
      WHERE
      email_id = ${email}
      ORDER BY created_at DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `;
    return tramites.rows;
  } catch (error) {
    console.error('Failed to fetch tramites:', error);
    throw new Error('No se pudieron recuperar los trámites.');
  }
}




export async function fetchInvoicesPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchCustomersPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM customers
    WHERE
    customers.name ILIKE ${`%${query}%`} OR
    customers.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of customers.');
  }
}

export async function fetchConsultasPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM consultas
    JOIN users ON consultas.email_id = users.email
    WHERE
    users.name ILIKE ${`%${query}%`} OR
    users.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('No se pudo recuperar el número total de consultas.');
  }
}
export async function fetchTramitesPages(query: string) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tramites
    JOIN users ON tramites.email_id = users.email
    WHERE
    users.name ILIKE ${`%${query}%`} OR
    users.email ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('No se pudo recuperar el número total de consultas.');
  }
}

export async function fetchConsultasPagesM(id: string | null | undefined) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM consultas
    WHERE email_id = ${id}
  `;

    const totalPagesMember = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    const countcon = Math.ceil(Number(count.rows[0].count) / 1);

    // return totalPages;
    return {totalPagesMember, countcon};
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('No se pudo recuperar el número total de consultas.');
  }
}
export async function fetchTramitesPagesM(email: string | null | undefined) {
  noStore()
  try {
    const count = await sql`SELECT COUNT(*)
    FROM tramites
    WHERE email_id = ${email}
  `;

    const totalPagesMember = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    const countcon = Math.ceil(Number(count.rows[0].count) / 1);

    // return totalPages;
    return {totalPagesMember, countcon};
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('No se pudo recuperar el número total de trámites.');
  }
}




export async function fetchInvoiceById(id: string) {
  noStore()
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomerById(id: string) {
  noStore()
  try {
    const data = await sql<Customer>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.image_url
      FROM customers
      WHERE customers.id = ${id};
    `;

    const customer = data.rows.map((customer) => ({
      ...customer,
      // Convert amount from cents to dollars
      //amount: customer.amount / 100,
    }));

    return customer[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

export async function fetchConsultaById(id: string) {
  noStore()
  try {
    const data = await sql<Consulta>`
      SELECT
      id,
      consulta,
      respuesta,
      created_at,
      updated_at,
      archivos_url,
      email_id
      FROM consultas
      WHERE id = ${id};
    `;

    const consulta = data.rows.map((consulta) => ({
      ...consulta,
      // Convert amount from cents to dollars
      //amount: customer.amount / 100,
    }));

    return consulta[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch consulta.');
  }
}

export async function fetchTramiteById(id: string) {
  noStore()
  try {
    const data = await sql<Tramite>`
      SELECT
      id,
      tramite,
      presupuesto,
      informacion,
      estado,
      created_at,
      budgeted_at,
      started_at,
      canceled_at,
      finished_at,
      documentos_url,
      email_id
      FROM tramites
      WHERE id = ${id};
    `;

    const tramite = data.rows.map((tramite) => ({
      ...tramite,
    }));

    return tramite[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch consulta.');
  }
}



export async function fetchCommentById(id: string) {
  noStore()
  try {
    const comments = await sql<Comment>`
      SELECT
      id,
      email_id,
      nombre,
      post_slug,
      comment,
      avatar,
      created_at
      FROM comments
      WHERE post_slug = ${id}
      ORDER BY revenue.id DESC;
    `;

    // const comment = data.rows.map((comment) => ({
    //   ...comment,
    // }));

    // return comment[0];
    return comments.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch comment.');
  }
}
export async function fetchCommentLast() {
  noStore()
  try {
    const ultimoCommentario = await sql<Comment>`
      SELECT
      id,
      created_at,
      nombre,
      deleted_at,
      post_slug,
      email_id,
      avatar,
      comment
      FROM comments
      -- WHERE deleted_at IS NULL
      WHERE deleted_at = '2024-01-01 00:00:00+00' OR deleted_at IS NULL 
      ORDER BY created_at DESC
      LIMIT 1
    `;

    // return commentLast.rows;

    const commentLast = ultimoCommentario.rows[0];
    // console.log("comm: ", commentLast)
    return commentLast;
    

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch last comment.');
  }
}
export async function fetchFilteredComments(slug: string/*, query: string, currentPage: number */) {
  noStore()
  // const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const date= new Date('2024-01-01 00:00:00+00').toString()

  try {
    const comments = await sql<CommentsPost>`
    SELECT
    comments.id,
    comments.email_id,
    comments.post_slug,
    comments.comment,
    comments.created_at,
    comments.deleted_at,
    comments.nombre,
    comments.avatar,
    users.name,
    users.image
    FROM comments
    JOIN users ON comments.email_id = users.email
    WHERE comments.post_slug = ${slug} 
    AND (comments.deleted_at = '2024-01-01 00:00:00+00' OR comments.deleted_at IS NULL )
    ORDER BY comments.created_at DESC
    `;
    return comments.rows;
  } catch (error) {
    console.error('Failed to fetch comments:', error);
    throw new Error('No se pudieron recuperar los comentarios.');
  }
}




export async function fetchUserById(email: string | null | undefined): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function fetchUserByEmail(id: string | null | undefined): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${id}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
export async function fetchUserByIdentifier(identifier: string | null | undefined): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${identifier}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}


export async function fetchCustomers() {
  noStore()
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}


export async function fetchVerificationToken(email: string | null | undefined) {
  noStore()
  try {
    const data = await sql<VerificationToken>`
      SELECT *
      FROM verification_token
      WHERE email=${email}
    `;

    return data.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
export async function fetchToken(token: string | null | undefined) {
  noStore()
  try {
    const data = await sql<VerificationToken>`
      SELECT *
      FROM verification_token
      WHERE token=${token}
    `;

    return data.rows[0];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}