'use client';

import {  ChevronRightIcon, } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import * as  DropdownMenu  from "@radix-ui/react-dropdown-menu";
import type { TramiteMd } from "@/app/lib/definitions"


export default  function TramiteButtonMenu({allTramites }:{allTramites:TramiteMd[]}) {

  const pathname = usePathname();


  return (

    <div className="block min-[900px]:hidden ">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild >
          <button
            className="inline-flex h-[22px] text-sm opacity-80 px-2 items-center justify-center rounded-md bg-[#39507f] text-[#ffffff] duration-150 outline-none hover:opacity-100 sm:h-[26px] sm:text-[15px] sm:px-3"
          >
            Seleccioná un trámite
            <ChevronRightIcon className="w-4 ml-2 rotate-90 stroke-2" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] ml-2 rounded-lg bg-[#ffffff] p-[1px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2),_inset_0_0_4px_1px_#ffffff] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade md:ml-12"
            sideOffset={5}
          >
            {allTramites.map((tramite:TramiteMd) => (
              <Link
                  as={`/iniciar-tramite/${tramite.slug}`}
                  href="/iniciar-tramite/[slug]"
                  className={clsx(`group py-[3px] px-2 mb-[1px] bg-[#020b1d0c] first:rounded-t-md first:mt-0 last:rounded-b-md last:mb-0 flex justify-between text-[#020b1dbb] items-center duration-200 hover:bg-[#020b1d1c] hover:text-[#020b1d] `,
                      {
                        'text-[#020b1e] bg-[#020b1d1b] ': pathname === `/iniciar-tramite/${tramite.slug}`
                      }
                    )}
                  key={tramite.slug} 
              >
                  <DropdownMenu.Item className="group relative flex h-5 select-none items-center pr-[5px] leading-none outline-none ">
                  <div className="h-5 w-4 flex items-center justify-center">
                    <img 
                      src= "/dnrpa.png" 
                      alt="icono trámites" 
                      width={12} 
                      height={"auto"}
                      className={clsx(`opacity-90 h-[7px] w-[7px] group-hover:w-[9px] group-hover:h-[9px]`,
                        {
                          '[width:_9px] [height:_9px]': pathname === `/iniciar-tramite/${tramite.slug}`
                        }
                      )} 
                    />
                  </div>
                  <p className="text-[14px] ml-2 text-start md:text-[14.5px] ">{tramite.tramite} {tramite.estado === "Derogado" && <span className="text-xs text-[#e42f2fc9] ">
                      {`(${tramite.estado})`}</span>}
                  </p>
                  </DropdownMenu.Item>
              </Link>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root> 
    </div>
  );

}
