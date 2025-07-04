import Form from '@/app/ui/consultas/edit-form-consulta';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchConsultaById } from '@/app/lib/data';
import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
import { fetchUserById } from '@/app/lib/data';
import { fetchUserByEmail } from '@/app/lib/data';


export const metadata: Metadata = {
  title: 'Editar Consulta',
};

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  const user = await fetchUserById(session?.user?.email);
  const id = params.id;
  const consulta = await fetchConsultaById(id);
  const pilo= consulta.email_id
  const userMember = await fetchUserByEmail(pilo);
  

  if (!consulta) {
    notFound();
  }

  if (user?.email === process.env.ADMIN)
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Consultas', href: '/dashboard/consultas' },
            {
              label: 'Editar Consulta',
              href: `/dashboard/consultas/${id}/edit`,
              active: true,
            },
          ]}
        />
        <Form consulta={consulta} userMember={userMember} />
      </main>
    );
  return notFound();
}
