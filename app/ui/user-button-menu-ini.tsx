'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import IconPresupuesto from './logosIconos/icon-presupuesto';
import IconConsulta from './logosIconos/icon-consulta';


export default  function UserButtonMenuIni() {

  const pathname = usePathname();
  const ini= pathname.startsWith('/iniciar-tramite')


  return (
    <div>
      <Link 
        href={ini ? "/realizar-consulta" : "/iniciar-tramite/cambio-de-radicacion" } 
        className={`text-[14px] opacity-80 duration-150 sm:text-[15px] ${ini || pathname.startsWith('/realizar-consulta') ? "block" : "hidden" } hover:opacity-90 `}>
        {ini ? (
          <div className="flex flex-col items-center justify-center gap-1">
            <IconConsulta color="#ffffff" color2="#39507f" size="22" className="w-[18px] sm:w-[20px] " />
            <p className=" text-[#ffffff] leading-[1.1]">Consulta</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-1">
            <IconPresupuesto color="#ffffff" color2="#39507f" className="w-[18px] sm:w-[20px] "/>
            <p className=" text-[#ffffff] leading-[1.1]">Presupuesto</p>
          </div>
        )}
      </Link>
    </div>
  );
}
