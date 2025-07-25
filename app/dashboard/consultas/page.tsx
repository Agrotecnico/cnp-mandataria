import { Metadata } from 'next';
import { auth } from '@/auth';

import Pagination from '@/app/ui/invoices/pagination';
import { fetchConsultasPages } from '@/app/lib/data';
import TableConsultaAdmin from '@/app/ui/consultas/table-consulta-admin';
import TableConsultaMember from '@/app/ui/consultas/table-consulta-member';
import { fetchUserById } from '@/app/lib/data';
import { fetchConsultasPagesM } from '@/app/lib/data';
import { fetchFilteredConsultasM } from '@/app/lib/data';


export const metadata: Metadata = {
  title: 'Consultas',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const session = await auth();
  // const user = await fetchUserById(session?.user?.email);
  const id= session?.user?.email

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchConsultasPages(query);

  const {totalPagesMember, countcon} = await fetchConsultasPagesM(id);

  const consultas = await fetchFilteredConsultasM( id, currentPage );


  if (session?.user.role === "admin")
    return (
      <main>
        <h1 className={` mb-4 text-xl lg:text-2xl`}>
          Consultas
        </h1>

        <TableConsultaAdmin query={query} currentPage={currentPage} />

        <div className="mt-2 mb-4 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );

    return (
      <main>
        {/* <h1 className={`mb-4 text-xl lg:text-2xl`}>
          Tus Consultas
        </h1>
        
        {consultas.length ? (
          <div className=" flex flex-col gap-2 ">
            {consultas?.map((consulta, idx) => (
              <div key={idx } className=" text-[13px] leading-[18px] ">
                <TableConsultaMember consulta={consulta} />
              </div>
            ))}
            <div className="-z-10 mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPagesMember} />
            </div>
          </div>
        ) : (
          <div>Todavía no realizaste una consulta</div>
        )} */}
        <div className="h-[50%] flex items-center justify-center ">
          Página no disponble
        </div>
      </main>
  );
}
