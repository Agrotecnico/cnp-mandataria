
import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';
// import { useSession } from "next-auth/react"

import { Providers } from '@/app/dashboard/providers'
import Pagination from '@/app/ui/invoices/pagination';
import { fetchConsultasPages } from '@/app/lib/data';
import TableConsultaAdmin from '@/app/ui/consultas/table-consulta-admin';
import TableConsultaMember from '@/app/ui/consultas/table-consulta-member';
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
  // const { data: session, update } = useSession()
  const session = await auth();
  const id= session?.user?.email

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchConsultasPages(query);
  const {totalPagesMember, countcon} = await fetchConsultasPagesM(id);
  const consultas = await fetchFilteredConsultasM( id, currentPage );

  // console.log("session:", session)


  if (session?.user.role === "admin")
    return (
      <main>
        <h1 className={` mb-4 mt-2 text-xl lg:text-2xl`}>
          Consultas
        </h1>

        <TableConsultaAdmin query={query} currentPage={currentPage} />

        <div className="mt-2 my-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );

    return (
      <main>
        <h1 className={`mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
          Mis Consultas
        </h1>
        
        {consultas.length ? (
          <div className=" flex flex-col gap-3 ">
            {consultas?.map((consulta, idx) => (
              <div key={idx } className=" text-[13px] leading-[18px] ">
                <Providers /* session={session} */>
                  <TableConsultaMember consulta={consulta} countcon={countcon} currentPage={currentPage} index={idx} />
                </Providers>
              </div>
            ))}
            <div className="z-10 my-5 flex w-full justify-center">
              <Pagination totalPages={totalPagesMember} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col  justify-center">
            <p>Todavía no realizaste una consulta</p>
          </div>
        )}


      </main>
    );
    // return notFound();
}
