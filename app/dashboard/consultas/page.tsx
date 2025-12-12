
import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

import { Providers } from '@/app/dashboard/providers'
import Pagination from '@/app/ui/invoices/pagination';
import { fetchConsultasPages } from '@/app/lib/data';
import TableConsultaAdmin from '@/app/ui/consultas/table-consulta-admin';
import TableConsultaMember from '@/app/ui/consultas/table-consulta-member';
import { fetchConsultasPagesM } from '@/app/lib/data';
import { fetchFilteredConsultasM } from '@/app/lib/data';
import { fetchUserByEmail } from "@/app/lib/data";


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
  const id= session?.user?.email

  const user = await fetchUserByEmail(session?.user.email);

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchConsultasPages(query);
  const {totalPagesMember, countcon} = await fetchConsultasPagesM(id);
  const consultas = await fetchFilteredConsultasM( id, currentPage );


  if ( user?.role === "admin" ) {
    if (user?.account === "abierto")
      return (
      <main>
        <h1 className={` mb-4 mt-2 text-xl lg:text-2xl`}>
          Consultas admin abierto
        </h1>

        <TableConsultaAdmin query={query} currentPage={currentPage} />

        <div className="mt-2 my-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );
    return (
      <main>
        <h1 className={` mb-4 mt-2 text-xl lg:text-2xl`}>
          Mis Consultas admin cerrado
        </h1>

        <TableConsultaAdmin query={query} currentPage={currentPage} />

        <div className="mt-2 my-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );
  }

  if ( user?.role === "memberAccount" ) {
      if (user?.account === "abierto") {
        <main>
          <h1 className={`mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
            Mis Consultas memberAccount abierto
          </h1>
          
          {consultas.length ? (
            <div className=" flex flex-col gap-3 ">
              {consultas?.map((consulta, idx) => (
                <div key={idx } className=" text-[13px] leading-[18px] ">
                  <Providers >
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
      }
      return (
        <main>
          <h1 className={`mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
            Mis Consultas memberAccount cerrado
          </h1>
          
          {consultas.length ? (
            <div className=" flex flex-col gap-3 ">
              {consultas?.map((consulta, idx) => (
                <div key={idx } className=" text-[13px] leading-[18px] ">
                  <Providers >
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
      )
    }

  if ( user?.role === "memberVerified" ) {
    return (
      <main>
        <h1 className={`mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
          Mis Consultas memberVerified
        </h1>
        
        {consultas.length ? (
          <div className=" flex flex-col gap-3 ">
            {consultas?.map((consulta, idx) => (
              <div key={idx } className=" text-[13px] leading-[18px] ">
                <Providers >
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
    )
  }

  return notFound();
}
