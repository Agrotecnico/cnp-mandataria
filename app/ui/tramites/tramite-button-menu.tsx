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
            className="inline-flex items-center justify-center gap-2 h-[26px] text-[13px] opacity-80 px-2 rounded-md bg-[#39507f] text-[#ffffff] duration-150 outline-none hover:opacity-100 sm:text-[15px] sm:px-3"
          >
            <p>Seleccioná un trámite</p>
            <ChevronRightIcon className="w-4 rotate-90 stroke-2" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] flex flex-col gap-[1px] ml-2 rounded-lg bg-[#ffffff] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2),_inset_0_0_4px_1px_#ffffff] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade md:ml-12"
            sideOffset={5}
          >
            {allTramites.map((tramite:TramiteMd) => (
              <Link
                  as={`/iniciar-tramite/${tramite.slug}`}
                  href="/iniciar-tramite/[slug]"
                  className={clsx('group w-full h-[28px] text-sm flex items-center justify-start first:rounded-t-md first:pt-1.5 first:h-[34px] last:rounded-b-md last:pb-1.5 last:h-[34px] duration-150 text-[#020b1daa]  hover:bg-[#548eff17] hover:text-[#020b1ddd] active:opacity-80',
                    {
                      'text-[#020b1ddc] bg-[#548eff16] ':  pathname === `/iniciar-tramite/${tramite.slug}`,
                    }
                  )}
                  key={tramite.slug} 
              >
                  <DropdownMenu.Item className="group relative flex h-5 select-none items-center pr-[5px] leading-none outline-none ">
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
                  </DropdownMenu.Item>
              </Link>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root> 
    </div>
  );

}
