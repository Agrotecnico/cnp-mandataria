
import { Metadata } from 'next';
import { useSession } from "next-auth/react"
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

import Pagination from '@/app/ui/invoices/pagination';
import { fetchTramitesPages } from '@/app/lib/data';
import TableTramiteAdmin from '@/app/ui/tramites/table-tramite-admin';
import TableTramiteMember from '@/app/ui/tramites/table-tramite-member';
import { fetchTramitesPagesM } from '@/app/lib/data';
import { fetchFilteredTramitesM } from '@/app/lib/data';
import { fetchFilteredTramites } from '@/app/lib/data';
import Search from '@/app/ui/search';


export const metadata: Metadata = {
  title: 'Trámites',
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
  const email= session?.user?.email

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTramitesPages(query);
  const AllTramites = await fetchFilteredTramites(query, currentPage);
  const {totalPagesMember, countcon} = await fetchTramitesPagesM(email);
  const tramitesMember = await fetchFilteredTramitesM( email, currentPage );


  if (session?.user.role === "admin")
    return (
      <main>
        <h1 className={` mb-4 mt-2 text-xl lg:text-2xl`}>
          Trámites
        </h1>

        <div className="mb-6 flex items-center justify-between gap-2">
          <Search placeholder="Buscar trámites..." />
        </div>

        {AllTramites?.map((AllTramite, idx) => (
          <div key={idx } className=" text-[13px] leading-[18px] ">
            <TableTramiteAdmin AllTramite={AllTramite} />
          </div>
        ))}

        <div className="my-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );

    return (
      <main>
        <h1 className={`mb-[22px] mt-1.5 text-xl lg:text-2xl`}>
          Mis Trámites
        </h1>
       
        {tramitesMember.length ? (
          <div className="text-[#020b1ddd] flex flex-col gap-2 ">
            {tramitesMember?.map((tramite, idx) => (
              <div key={idx } className=" text-[13px] leading-[18px] ">
                <TableTramiteMember tramite={tramite} />
              </div>
            ))}

            <div className="z-[5] my-5 flex w-full justify-center">
              <Pagination totalPages={totalPagesMember} />
            </div>
          </div>
        ) : (
          <div>
            <p>Todavía no iniciaste un trámite</p>
          </div>
        )}
      </main>
    );

  // return notFound();
}
