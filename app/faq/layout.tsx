import { Metadata } from 'next';

import SideNavConsultas from '@/app/ui/consultas/sidenav-consultas';
import FooterConsultas from '@/app/ui/footerConsultas';
import Header from '@/app/ui/header';
import { Providers } from '@/app/dashboard/providers'


export const metadata: Metadata = {
  title: 'Consultas',
};

export default async function Layout({        
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col justify-between ">
      <Providers>
        <Header />
      </Providers>
      <main className=" mx-auto w-full max-w-[64rem] flex-auto px-2 pb-4 md:px-6 md:pb-6 lg:px-2">
        <div className="mx-auto flex flex-col pb-12 md:px-6 ">
          <div className="mt-[90px] flex flex-col-reverse gap-8 sm:mt-[104px] min-[1024px]:flex-row md:gap-4 md:overflow-hidden ">
            <SideNavConsultas />
            <div className="w-full ml-auto flex-col justify-between first-line:flex md:overflow-y-auto lg:w-[calc(100%_-_19rem)]">
              {children}
            </div>
          </div>
        </div>
      </main>
      <FooterConsultas />
    </div>
  );
}