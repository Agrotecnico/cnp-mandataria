import { Metadata } from 'next';
import { auth } from 'auth';

import FooterConsultas from '@/app/ui/footerConsultas';
import Header from '@/app/ui/header';
import { Providers } from '@/app/dashboard/providers'
import { fetchUserById } from '@/app/lib/data';
import RealizarConsulta from '@/app/ui/consultas/realizar-consulta';


export const metadata: Metadata = {
  title: 'Consultas',
};

export default async function Page() {
  const session = await auth();
  const user = await fetchUserById(session?.user?.email)


  return (
    <div className="mx-auto flex min-h-screen w-full flex-col justify-between ">
      <Providers>
        <Header />
      </Providers>
      <main className="min-h-[93vh] mx-auto w-full max-w-[64rem] flex-auto px-2 pt-[68px] sm:pt-20 sm:px-4 md:px-6 lg:px-2">
        <div className="mx-auto flex flex-col pb-16 md:px-6 ">
          <div className=" flex flex-col-reverse h-[840px] min-[1024px]:flex-row md:gap-4 md:overflow-hidden ">
            <div className="w-full max-w-2xl mx-auto flex-grow flex-col justify-between first-line:flex ">
                <h1  className={`my-4 text-[20px] sm:text-2xl lg:my-6`}>
                    Realizá la consulta
                </h1>
                <RealizarConsulta user= {user} />
            </div>
          </div>
        </div>
      </main>
      <FooterConsultas />
    </div>
  );
}
