"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Frente } from '@/app/ui/marcos';
import type { TramiteMd } from "@/app/lib/definitions"


export default function NavLinksTramites({allTramites }:{allTramites:TramiteMd[]}) {

  const pathname = usePathname();
  
  return (

    <div className="hidden min-[900px]:block ">
      <h1 className="flex items-center text-start pl-2 pt-1 pb-3 font-semibold text-lg text-[#39507fcc] md:leading-none ">
        Seleccioná un trámite:
      </h1>
      <Frente className='!bg-[#020b1d14] p-[3px] flex flex-col gap-0.5 '>

        {allTramites.map((tramite:TramiteMd) => (
          <Link
            as={`/iniciar-tramite/${tramite.slug}`}
            href="/iniciar-tramite/[slug]"
            className={clsx(`group py-[3px] pl-0.5 pr-2 bg-[#ffffff0e] first:rounded-t-md last:rounded-b-md flex gap-1 items-start duration-200 hover:bg-[#ffffff88] hover:text-[#020b1d] `,
                {
                  'text-[#020b1e] bg-[#ffffff89] ': pathname === `/iniciar-tramite/${tramite.slug}`
                }
              )}
            key={tramite.slug} 
          >
            <div className="h-5 w-5 flex items-center justify-center">
              <img 
                src= "/dnrpa.png" 
                alt="icono trámites" 
                width={12} 
                height={"auto"}
                className={clsx(`opacity-90 h-[7px] w-[7px] group-hover:w-[10px] group-hover:h-[10px]`,
                  {
                    '[width:_10px] [height:_10px] ': pathname === `/iniciar-tramite/${tramite.slug}`
                  }
                )} 
              />
            </div>
            <p className="text-[14px] text-start md:text-[15px] ">{tramite.tramite} {tramite.estado === "Derogado" && <span className="text-xs text-[#e42f2fc9] ">
                {`(${tramite.estado})`}</span>}
            </p>
          </Link>
        ))}
      </Frente>
    </div>
  );
}
