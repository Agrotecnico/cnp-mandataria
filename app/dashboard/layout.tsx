
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/header'
import { Providers } from '@/app/dashboard/providers'
import { fetchUserByEmail } from '@/app/lib/data';
import DashboardButtonMenu from '../ui/dashboard/dashboard-button-menu';
import { Fondo, Frente } from '@/app/ui/marcos'
 
export default async function Layout({ children }: { children: React.ReactNode }) {

  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email)

  


  if (session?.user.role === "visitor" || session?.user.role === "member") return notFound();

  return (
    <Providers>
      <div className="mx-auto flex min-h-screen w-full max-w-[1072px] flex-col ">
        <Header />
        <div className="flex flex-col min-h-screen px-3 md:px-6 md:flex-row md:overflow-hidden">
          <div className="w-full flex-none mb-2 mt-[76px] static h-max min-h-auto md:h-[50%] md:min-h-[calc(100vh_-_110px)] md:fixed md:mt-[102px] md:w-64">{/*  md:mt-[104px] */}
            <Frente className={`${user?.account === "abierto" ? "!bg-[#39507f]" : "!bg-[#548effdd]"} text-[#ffffff] ![box-shadow:_inset_0_2px_#ffffff,inset_0_-2px_#00000022]`}>
              <div className="text-sm [text-shadow:_1px_1px_#3d61ad] flex flex-col justify-center items-center text-center px-2.5 py-1.5 md:mb-2 ">

                {user?.role === "admin" ? <p>Panel <span className='text-base font-semibold'>ADMIN </span></p> : user?.role === "memberAccount" && user.account === "abierto" ? <p>Panel <span className='text-base font-semibold'>CUENTA </span></p> : <p>Panel <span className='text-base font-semibold'>INFO </span></p> } 

                <p>
                  <span className='text-[13px] text-[#ffffffdd] '>{user?.email && `${user.email}`}</span>
                </p>
              </div>
            </Frente>

            <div className="hidden h-full md:block ">
              <SideNav user={user} />
            </div>

            <div className="flex items-center mt-2 md:hidden">
              <DashboardButtonMenu user={user} />
            </div>
          </div>
          <Fondo className="flex-grow mb-3 !bg-[#548eff16] ml-0 p-2 sm:p-4 md:ml-[274px] md:mt-[104px] md:min-h-screen">
            {children}
          </Fondo>
        </div>
      </div>
    </Providers>
  );
}
