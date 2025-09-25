
import { Metadata } from 'next';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

import Pagination from '@/app/ui/invoices/pagination';
import { fetchTramitesPages } from '@/app/lib/data';
import TableTramiteAdmin from '@/app/ui/tramites/table-tramite-admin';
import TableTramiteMember from '@/app/ui/tramites/table-tramite-member';
import { fetchUserById } from '@/app/lib/data';
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
  // const user = await fetchUserById(session?.user?.email);
  const email= session?.user?.email

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTramitesPages(query);

  const AllTramites = await fetchFilteredTramites(query, currentPage);

  const {totalPagesMember, countcon} = await fetchTramitesPagesM(email);

  const tramites = await fetchFilteredTramitesM( email, currentPage );


  if (session?.user.role === "admin")
    return (
      <main>
        <h1 className={` mb-4 text-xl lg:text-2xl`}>
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

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </main>
    );

    return notFound();
    
    // return (
    //   <main>
    //     {/* <div className=" mb-8">
    //       <h1 className={` text-xl lg:text-2xl`}>
    //         Tus Trámites
    //       </h1>
    //     </div>
        
    //     {tramites.length ? (
    //       <div className="text-[#1d0215dd] flex flex-col gap-2 ">
    //         {tramites?.map((tramite, idx) => (
    //           <div key={idx } className=" text-[13px] leading-[18px] ">
    //             <TableTramiteMember tramite={tramite} />
    //           </div>
    //         ))}

    //         <div className="mt-5 flex w-full justify-center">
    //           <Pagination totalPages={totalPagesMember} />
    //         </div>
    //       </div>
    //     ) : (
    //       <div>Todavía no iniciaste un trámite</div>
    //     )} */}
    //     <div className="h-[50%] flex items-center justify-center ">
    //       Página no disponble
    //     </div>
    //   </main>
    // );
}
