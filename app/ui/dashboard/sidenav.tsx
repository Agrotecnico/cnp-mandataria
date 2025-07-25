import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import  NavLinksAdmin  from '@/app/ui/dashboard/nav-links-admin'
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';

import { Fondo } from '@/app/ui/marcos'

export default function SideNav() {
  return (
    <Fondo className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex justify-center items-center text-center pb-2 px-2 lg:pt-1 lg:pb-3"
        href="/"
      >
        <div className="w-32 md:w-40">
          Panel ADMIN
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* <NavLinks /> */}
        <div className="flex md:flex-col gap-[1px] w-full md:gap-0">
          <NavLinksAdmin />
        </div>
        {/* <div className="flex flex-col gap-0.5 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12 sm:flex-row">
          <Link 
            href={"/iniciar-tramite/baja-de-vehiculo"} 
            className="group h-7 flex items-center rounded-t-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-tr-none sm:rounded-l-lg sm:h-8 hover:bg-white active:opacity-80">
            <IconPresupuesto 
              className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
              color="#ffffffdd" color2="#020b1d"
              />
            <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Pedí presupuesto</p>
          </Link>
          <Link 
            href={"/realizar-consulta"} 
            className="group h-7 flex items-center rounded-b-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-bl-none sm:rounded-r-lg sm:h-8 hover:bg-white active:opacity-80">
            <IconConsulta 
              className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
              color="#ffffffdd" color2="#020b1d"
              />
            <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Realizá tu consulta</p>
          </Link>
        </div> */}
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-full w-full grow items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] p-3 text-sm font-medium hover:bg-[#ffffffe3] hover:text-[#020b1d] md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-5 text-red-500" />
            <div className=" hidden md:block">Salir</div>
          </button>
        </form>
      </div>
    </Fondo>
  );
}