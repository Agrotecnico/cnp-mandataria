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

    <div className="block min-[900px]:hidden sm:ml-0">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild >
          <button
            className="inline-flex items-center justify-center gap-4 w-60 h-[26px] text-[14px] opacity-90 px-2 rounded-md bg-[#548effdd] text-[#ffffff] duration-150 outline-none hover:opacity-100 sm:h-[28px] sm:text-[15px] sm:px-3"
          >
            <p className=' [text-shadow:_1px_1px_#3d61ad]'>Seleccioná un trámite</p>
            <ChevronRightIcon className="w-4 rotate-90 stroke-2" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px]  p-1 flex flex-col rounded-lg bg-[#ffffff] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2),_inset_0_0_4px_1px_#ffffff] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
            sideOffset={5}
          >

            {allTramites.map((tramite:TramiteMd) => (
              <Link
                  as={`/iniciar-tramite/${tramite.slug}`}
                  href="/iniciar-tramite/[slug]"
                  className={clsx('group w-full h-[33px] border-x border-[#39507f19] text-sm flex items-center justify-start first:rounded-t-md last:rounded-b-md duration-150 bg-[#edf1ff] text-[#020b1d99]  hover:bg-[#dde7fc] hover:text-[#020b1dcc] active:opacity-80',
                  {
                    'text-[#020b1dcd] bg-[#dde7fb] ':  pathname === `/iniciar-tramite/${tramite.slug}`,
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
