import Link from 'next/link';
import { auth } from 'auth';

import NavLinksConsultas from '@/app/ui/consultas/nav-links-consultas';
import { Frente, Fondo } from '@/app/ui/marcos';
import { getAllPosts } from '@/app/lib/getPost';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';


export default async function SideNavConsultas() {
  const session = await auth();
  const allPosts = getAllPosts();
  return (
    <div className="hidden h-max flex-col lg:flex lg:fixed">
      <Fondo className=" p-3 lg:w-72">
        <div className="mb-4 mt-2.5 w-full text-sm text-center font-medium ">
          CONSULTAS FRECUENTES
        </div>

        <NavLinksConsultas allPosts={allPosts} />
      </Fondo> 

      <div className="flex flex-col w-max mx-auto my-12 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12">
        <Link 
          href={session?.user.role === "admin" ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'} 
          className="group h-7 flex items-center rounded-t-lg px-3 bg-[#548eff0b] duration-150 justify-start  sm:h-8 hover:bg-white active:opacity-80">
          <IconPresupuesto className="mr-2 w-[15px] h-[15px] fill-[#548effdd] duration-150 opacity-90 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"/>
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver trámites' : 'Pedí presupuesto'}</p>
        </Link>
        <Link 
          href={session?.user.role === "admin" ? '/dashboard/consultas' : '/realizar-consulta'} 
          className="group h-7 flex items-center rounded-b-lg px-3 bg-[#548eff0b] duration-150 justify-start  sm:h-8 hover:bg-white active:opacity-80">
          <IconConsulta 
            className="mr-2 w-[15px] h-[15px] fill-[#548eff] duration-150 opacity-90 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"/>
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver consultas' : 'Realizá tu consulta'}</p>
        </Link>
      </div>
    </div>
  );
}
