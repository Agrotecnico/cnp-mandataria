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
      <Link 
        href={"https://api.whatsapp.com/send?phone=543476606595"}
        target="_blank"  
        className="py-0.5 px-3 w-max  bg-[#fff] mt-8 mb-3 mx-auto duration-150 opacity-80 rounded-lg flex items-center gap-6 text-sm shadow-[0_10px_20px_#020b1d33] hover:opacity-100 active:opacity-80 sm:text-[15px]">
        <div className="flex flex-col">
          <div className="h-6 flex items-center justify-start sm:h-[26px]">
            <IconPresupuesto 
              className="mr-2 w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]"
              color="#ffffffdd" color2="#020b1d"
              />
            <p>Pedí presupuesto</p>
          </div>
          <div className="h-6 flex items-center justify-start sm:h-[26px]">
            <IconConsulta 
              className="mr-2 w-[15px] h-[15px] sm:w-[16px] sm:h-[16px]"
              color="#ffffffdd" color2="#020b1d"
              />
            <p>Realizá tu consulta</p>
          </div>
        </div>
        <IconWhatsApp size="36" color="#57c061" colorFondo="#0000"  className=" " />
      </Link>
    </div>
  );
}
