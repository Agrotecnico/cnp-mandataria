import SideNav from '@/app/ui/dashboard/sidenav'
import Header from '@/app/ui/header'
import { Fondo } from '@/app/ui/marcos'
import { Providers } from '@/app/dashboard/providers'


export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Providers>
      <div className="mx-auto flex min-h-screen w-full max-w-[1072px] flex-col ">
        <Header />
        <div className=" flex mx-auto w-full gap-4 sm:px-3 md:overflow-hidden md:px-6 ">
          <Fondo className="hidden w-60 min-h-[calc(100vh_-_134px)] p-3 mt-28 flex-none fixed min-[824px]:w-60 md:overflow-y-auto min-[824px]:block   ">
            <SideNav />
          </Fondo>
          <Fondo className="w-full min-h-[calc(100vh_-_134px)] mt-[100px] pt-3 px-3 sm:mt-28 sm:px-4 sm:pb-6 sm:pt-6 md:overflow-y-hidden md:px-6 min-[824px]:w-[calc(100%_-_240px)] min-[824px]:ml-[264px]">
            {children}
          </Fondo>
        </div>
      </div>
    </Providers>
  );
}
