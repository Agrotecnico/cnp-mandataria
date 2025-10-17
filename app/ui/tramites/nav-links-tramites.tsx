"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Frente, Fondo } from '@/app/ui/marcos';
import type { TramiteMd } from "@/app/lib/definitions"


export default function NavLinksTramites({allTramites }:{allTramites:TramiteMd[]}) {

  const pathname = usePathname();
  
  return (
    <div className="hidden h-full flex-col min-[900px]:flex">
      <div className="flex items-center text-[#39507f] text-base font-medium text-center pb-2.5 pr-2">
        Seleccioná un trámite
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex md:flex-col bg-[#e8edf6ff] w-full">
          {allTramites.map((tramite:TramiteMd) => (
            <Link
              as={`/iniciar-tramite/${tramite.slug}`}
              href="/iniciar-tramite/[slug]"
              className={clsx('group w-full h-[33px] border-x border-[#39507f19] text-sm flex items-center justify-start first:rounded-t-md last:rounded-b-md [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] duration-150 text-[#020b1daa]  hover:bg-[#548eff17] hover:text-[#020b1ddd] active:opacity-80',
                {
                  'text-[#020b1ddc] bg-[#548eff16] ':  pathname === `/iniciar-tramite/${tramite.slug}`,
                }
              )}
              key={tramite.slug} 
            >
              <div className="h-5 w-5 mx-1 flex items-center justify-center">
                <img 
                  src= "/dnrpa.png" 
                  alt="icono trámites" 
                  width={12} 
                  height={"auto"}
                  className={clsx(`opacity-90 h-[6px] w-[6px] group-hover:w-[7px] group-hover:h-[7px]`,
                    {
                      '[width:_7px] [height:_7px] ': pathname === `/iniciar-tramite/${tramite.slug}`
                    }
                  )} 
                />
              </div>
              <p className="text-[14px] text-start md:text-[15px] ">
                {tramite.tramite}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
