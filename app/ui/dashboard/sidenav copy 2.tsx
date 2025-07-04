
import { auth } from '@/auth'
import Link from 'next/link';

import { Fondo } from '@/app/ui/marcos'
import  NavLinksAdmin  from '@/app/ui/dashboard/nav-links-admin'
import  NavLinksMember  from '@/app/ui/dashboard/nav-links-member'
import { fetchUserById } from '@/app/lib/data';
import { ButtonA } from '@/app/ui/button';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';


export default async function SideNav() {

  const session = await auth()
  const user = await fetchUserById(session?.user?.email)

  if (session)
    return (
      // <div className="flex h-full fixed w-60">
        <div className="flex flex-col justify-between h-full ">
          <div className="flex flex-col">
            <div className="mb-2.5 flex flex-col-reverse font-medium items-center text-sm min-[824px]:[margin:_18px_0_34px]  ">
              <div className="">
                {user?.name}
              </div>
            </div>

            <div className="flex-col gap-0.5 ">
              {user?.email === process.env.ADMIN ? (
                <NavLinksAdmin />
                ) : (
                <NavLinksMember />
              )}
              {/* <div className=" w-full grow rounded-md md:block"></div> */}

              <div className={`flex flex-col gap-[1px] text-[14px] mt-3  ${user?.email === process.env.ADMIN && "hidden"}`} >
                <Link href="/iniciar-tramite/baja-de-vehiculo" >
                  <ButtonA className="relative pl-9 h-[26px] w-full !rounded-none !rounded-t-[4px] !justify-start">
                    <IconPresupuesto className="absolute w-[16px] h-[16px] bottom-1 left-[9px] "/>
                    <p className="">Pedir presupuesto</p>
                  </ButtonA>
                </Link>

                <Link href="/realizar-consulta" >
                  <ButtonA className="!bg-[#b2439a] relative pl-9 h-[26px] w-full !rounded-none !rounded-b-[4px] !justify-start ">
                    <IconConsulta className="absolute w-[16px] h-[16px] bottom-1 left-[9px] "/>
                    <p className="">Realizar consulta</p>
                  </ButtonA>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <form
            action={async () => {
              'use server';
              await signOut({ redirectTo: '/' });
            }}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-[#ffffff88] p-3 text-sm font-medium hover:bg-[#ffffffe3] hover:text-[#020b1d] md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6 text-[#cc4c4c]" />
              <div className="hidden md:block">Cerrar sesión</div>
            </button>
          </form>
        </div>
      // </div>
    );
  return null;
}