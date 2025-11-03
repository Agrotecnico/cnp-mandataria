
import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/header'
import { Fondo } from '@/app/ui/marcos'
import { Providers } from '@/app/dashboard/providers'
 
export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <Providers>
      <div className="mx-auto flex min-h-screen w-full max-w-[1072px] flex-col ">
        <Header />
        <div className="flex flex-col min-h-screen px-3 md:px-6 md:flex-row md:overflow-hidden">
          <div className="w-full flex-none mb-4 mt-[92px] static h-max min-h-auto md:h-[50%] md:min-h-[calc(100vh_-_116px)] md:fixed md:mt-[104px] md:w-64">
            <SideNav />
          </div>
          <Fondo className="flex-grow mb-3 !bg-[#548eff16] ml-0 p-2 sm:p-4 md:ml-[274px] md:mt-[104px] md:min-h-screen">{/* md:overflow-y-auto */}
            {children}
          </Fondo>
        </div>
      </div>
    </Providers>
  );
}
