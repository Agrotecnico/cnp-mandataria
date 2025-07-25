import Link from 'next/link';
import NavLinksConsultas from '@/app/ui/consultas/nav-links-consultas';
import { Fondo, Frente } from '@/app/ui/marcos';
import { getAllPosts } from '@/app/lib/getPost';
import { ButtonA } from '@/app/ui/button';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import  IconWhatsApp  from "@/app/ui/logosIconos/icon-whatsApp2";


export default async function SideNavConsultas() {
  const allPosts = getAllPosts();
  return (
    <div className="hidden h-max flex-col lg:flex lg:fixed">
      <Frente className="bg-[#ffffffaa] p-3 lg:w-72">
        <div className="mb-4 mt-2.5 w-full text-base text-center font-medium ">
          CONSULTAS FRECUENTES
        </div>

        <NavLinksConsultas allPosts={allPosts} />
      </Frente> 

      <div className="flex flex-col w-max mx-auto my-12 gap-0.5 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12">
        <Link 
          href={"/iniciar-tramite/cambio-de-radicacion"} 
          className="group h-7 flex items-center rounded-t-lg px-3 bg-[#ffffffaa] duration-150 justify-start  sm:h-8 hover:bg-white active:opacity-80">{/* sm:rounded-tr-none sm:rounded-l-lg */}
          <IconPresupuesto 
            className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
            color="#ffffffdd" color2="#020b1d"
            />
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Pedí presupuesto</p>
        </Link>
        <Link 
          href={"/realizar-consulta"} 
          className="group h-7 flex items-center rounded-b-lg px-3 bg-[#ffffffaa] duration-150 justify-start  sm:h-8 hover:bg-white active:opacity-80">{/* sm:rounded-bl-none sm:rounded-r-lg */}
          <IconConsulta 
            className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
            color="#ffffffdd" color2="#020b1d"
            />
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Realizá tu consulta</p>
        </Link>
      </div>
    </div>
  );
}
