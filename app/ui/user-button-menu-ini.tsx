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
        className={`text-sm opacity-80 duration-150 sm:text-base ${ini || pathname.startsWith('/realizar-consulta') ? "block" : "hidden" } hover:opacity-90 `}>
        {ini ? (
          <div className="flex flex-col items-center justify-center">
            <IconConsulta size="20" />
            <p className=" text-[#ffffff] leading-[1.1]">Consulta</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <IconPresupuesto size="20" />
            <p className=" text-[#ffffff] leading-[1.1]">Presupuesto</p>
          </div>
        )}
      </Link>
    </div>
  );
}
