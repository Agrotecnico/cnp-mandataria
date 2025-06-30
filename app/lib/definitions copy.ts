// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string | undefined;
  role: 'admin' | 'member' | 'memberAccount';
  image: string | undefined;
};

export type Customer = {
  id: string;
  name: string | undefined;
  email: string;
  image_url: string | undefined;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Consulta = {
  id: string;
  email_id: string;
  archivos_url: string | undefined;
  consulta: string;
  respuesta: string | undefined;
  created_at: string;
  updated_at: string;
};

export type Tramite = {
  id: string;
  email_id: string;
  tramite: string;
  documentos_url: string | undefined;
  informacion: string | undefined;
  estado: 'presupuestar' | 'presupuestado' | 'iniciado' | 'cancelado' | 'terminado';
  presupuesto: number;
  created_at: string;
  started_at: string | undefined;
  canceled_at: string | undefined;
  budgeted_at: string | undefined;
  finished_at: string | undefined;
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ConsultasTable = {
  id: string;
  consulta: string;
  respuesta: string | undefined;
  email_id: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string | undefined;
};
export type TramitesTable = {
  id: string;
  email_id: string;
  tramite: string;
  documentos_url: string | undefined;
  informacion: string | undefined;
  estado: 'presupuestar' | 'presupuestado' | 'iniciado' | 'cancelado' | 'terminado';
  presupuesto: number;
  created_at: string;
  budgeted_at: string | undefined;
  started_at: string | undefined;
  canceled_at: string | undefined;
  finished_at: string | undefined;
  name: string;
  image: string | undefined;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Post = {
  slug?: string;
  title?: string;
  author?: string;
  date?: string;
  content?: string;
  excerpt?: string;
  [key: string]: any;
  image?: string;
};

export type TramiteMd = {
  slug?: string;
  tramite?: string;
  date?: string;
  content?: string;
  resumen?: string;
  estado?: string;
  [key: string]: any;
  image?: string;
  documentos?: string;
  documentacion?: string;
  informacion: string;
};

export type Comment = {
  id: string;
  created_at: string;
  post_slug: string;
  comment: string;
  email_id: string;
};

export type CommentsPost = {
  id: string;
  email_id: string;
  post_slug: string;
  comment: string;
  created_at: string;
  name: string;
  image: string | undefined;
};
