"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { Frente, Fondo } from '@/app/ui/marcos';
import type { TramiteMd } from "@/app/lib/definitions"


export default function NavLinksTramites({allTramites }:{allTramites:TramiteMd[]}) {

  const pathname = usePathname();
  
  return (
    <Frente className="hidden !bg-[#548eff16] h-full flex-col min-[900px]:flex">
      <div className="mt-0.5 text-sm flex justify-center bg-[#548effdd] rounded-t-md text-[#ffffff]  sm:text-[15px] text-center py-1 [text-shadow:_1px_1px_#3d61ad] ">
        Seleccioná un trámite
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex md:flex-col w-full">
          {allTramites.map((tramite:TramiteMd) => (
            <Link
              as={`/iniciar-tramite/${tramite.slug}`}
              href="/iniciar-tramite/[slug]"
              className={clsx('group mx-[3px] w-[calc(100%_-_6px)] h-[33px] flex items-center justify-start first:rounded-t-none last:rounded-b-md last:mb-[3px]  duration-150 text-[#020b1da2]  hover:bg-[#ffffff88] hover:text-[#020b1dd9] active:opacity-80',
                {
                  'text-[#020b1dd8] bg-[#ffffff89] ':  pathname === `/iniciar-tramite/${tramite.slug}`,
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
              <p className="text-[13px] text-start md:text-[14px] ">
                {tramite.tramite}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </Frente>
  );
}
