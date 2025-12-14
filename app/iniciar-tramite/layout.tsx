import { Metadata } from 'next';

import SideNavTramites from '@/app/ui/tramites/sidenav-tramites';
import FooterConsultas from '@/app/ui/footerConsultas';
import Header from '@/app/ui/header';
import { Providers } from '@/app/dashboard/providers'
import { getAllTramites } from '@/app/lib/getTramite';
import TramiteButtonMenu from '@/app/ui/tramites/tramite-button-menu';


// export const metadata: Metadata = {
//   title: 'Consultas',
// };

export default async function Layout({        
  children,
}: {
  children: React.ReactNode;
}) {

  const allTramites = getAllTramites();

  
  return (
    <div className="mx-auto flex min-h-screen w-full flex-col justify-between ">
      <Providers>
        <Header />
      </Providers>
      <main className=" mx-auto w-full flex-auto px-3 pt-[68px] max-w-[64rem] sm:pt-20 sm:px-4 md:px-6">
        <div className="mx-auto flex flex-col pb-[72px] md:px-6 ">
          <div className="relative flex flex-col gap-0 md:overflow-hidden min-[900px]:flex-row min-[900px]:gap-6 ">
            <div className="flex h-max flex-col w-[260px] min-w-[260px] max-[900px]:w-full  min-[900px]:fixed">
              <div className="flex flex-col mb-3 sm:mb-6 min-[900px]:mb-0">
                <h1 className={`my-3 text-[18px] sm:text-xl sm:my-4`} >
                  Pedí Presupuesto
                </h1>
                <TramiteButtonMenu allTramites={allTramites} />
              </div>

              <SideNavTramites />
            </div>
            <div className="flex-grow h-[800px] first-line:flex md:overflow-y-auto max-[900px]:w-full min-[900px]:ml-[292px]  min-[900px]:mt-[30px]">
              {children}
            </div>
          </div>
        </div>
      </main>
      <FooterConsultas />
    </div>
  );
}
