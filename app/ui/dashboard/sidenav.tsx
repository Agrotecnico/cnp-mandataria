
import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut, auth } from '@/auth';
import  NavLinksAdmin  from '@/app/ui/dashboard/nav-links-admin'
import  NavLinksMember  from '@/app/ui/dashboard/nav-links-member'
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';

import { Fondo } from '@/app/ui/marcos'

export default async function SideNav() {
  const session = await auth()
  return (
    <Fondo className="flex h-full flex-col p-2 md:pt-3">
      <div className="text-sm flex flex-col justify-center items-center text-center pb-2 px-2 md:mb-2 lg:pb-3">
        {session?.user.role === "memberAccount" || session?.user.role === "memberVerified" || session?.user.role === "member" ? <p>Panel INFO </p> : <p>Panel ADMIN </p>} 
        <p>
          <span className='text-[13px] text-[#39507fcc]'>{session?.user?.email && `${session.user.email}`}</span>
        </p>
      </div>

      <div className="flex grow flex-row justify-between gap-2 md:gap-0 md:flex-col">
        {/* <NavLinks /> */}
        <div className="flex flex-col w-full md:gap-0">
          {session?.user.role === "admin" ? (
            <NavLinksAdmin />
          ) : (
            <NavLinksMember />
          )}
        </div>

        {session?.user.role !== "admin" && (
          <div className={` hidden flex-col mt-8 mb-2 text-[13px] rounded-md shadow-[box-shadow:_inset_0 1px_#ffffff,_inset_0_-1px_#0000002e] sm:text-sm md:flex`}>
            <Link 
              href={session?.user.role === "admin" ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'} 
              className= 'w-full h-9 flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>
                
              <IconPresupuesto 
                color='#fff0' 
                color2='#548eff' 
                className="mr-2 ml-3 w-[16px] h-[16px] duration-150 rounded-[3px] border border-[#548eff88] group-hover:opacity-100 sm:w-[18px] sm:h-[18px]"/>
              
              <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver trámites' : 'Pedí presupuesto'}</p>
            </Link>
            <Link 
              href={session?.user.role === "admin" ? '/dashboard/consultas' : '/realizar-consulta'} 
              className= 'w-full h-9 flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>
              <IconConsulta 
                color='#fff0' 
                color2='#548eff' 
                className="mr-2 ml-3 w-[16px] h-[16px] duration-150 rounded-full border border-[#548eff88] group-hover:opacity-100 sm:w-[18px] sm:h-[18px]"/>
              <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver consultas' : 'Realizá tu consulta'}</p>
            </Link>
          </div>
        )}

        <div className="hidden h-auto mt-2 mb-2 w-full grow rounded-md bg-gray-50 md:block"></div>
        
        <form
          className=''
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-full w-full grow cursor-pointer items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] p-3 text-sm font-medium hover:bg-[#ffffffe3] hover:text-[#020b1d] md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-5 text-red-500" />
            <div className=" hidden md:block">Salir</div>
          </button>
        </form>
      </div>

      {session?.user.role !== "admin" && (
        <div className={` flex mt-2 h-8 mb-0 gap-[1px] text-[13px] rounded-md shadow-[box-shadow:_inset_0 1px_#ffffff,_inset_0_-1px_#0000002e] sm:h-9 sm:text-sm md:hidden`}>
          <Link 
            href={session?.user.role === "admin" ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'} 
            className= 'w-full flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>
              
            <IconPresupuesto 
              color='#fff0' 
              color2='#548eff' 
              className="mr-2 ml-3 w-[16px] h-[16px] duration-150 rounded-[3px] border border-[#548effaa]  group-hover:opacity-100 sm:w-[18px] sm:h-[18px]"/>
            <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver trámites' : 'Pedí presupuesto'}</p>
          </Link>
          <Link 
            href={session?.user.role === "admin" ? '/dashboard/consultas' : '/realizar-consulta'} 
            className= 'w-full flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>
            <IconConsulta 
              color='#fff0' 
              color2='#548eff' 
              className="mr-2 ml-3 w-[16px] h-[16px] duration-150 rounded-full border border-[#548effaa]  group-hover:opacity-100 sm:w-[18px] sm:h-[18px]"/>
            <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver consultas' : 'Realizá tu consulta'}</p>
          </Link>
        </div>
      )}
    </Fondo>
  );
}