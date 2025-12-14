'use client';

import {  ChevronRightIcon, } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from "next-auth/react";
import { useRef, useActionState } from 'react';

import { Fondo, Frente } from '@/app/ui/marcos'
import * as  DropdownMenu  from "@radix-ui/react-dropdown-menu";
import type { TramiteMd } from "@/app/lib/definitions"
import { User } from "@/app/lib/definitions";
import  IconMenu2  from "@/app/ui/logosIconos/icon-menu2";



export default  function DashboardButtonMenu({user}: {user: User |undefined}) {

  const pathname = usePathname();

  const buttonRef = useRef<HTMLButtonElement>(null); // update estado account
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  return (
    <>
      
      <Fondo className="flex items-center gap-3 p-2.5 w-full sm:ml-0">{/* block min-[900px]:hidden */}
        <div className="w-2/3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild >
              <button
                className="inline-flex w-full items-center  [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] justify-center gap-3 h-[34px] text-[14px] opacity-90 px-2 rounded-md bg-[#ffffff88] text-[#020b1dbb] duration-150 outline-none hover:opacity-100 sm:h-[28px] sm:text-[15px] sm:px-3  hover:bg-[#ffffff] hover:text-[#020b1d]"
              >
                <IconMenu2 className="w-3.5 fill-[#39507f]" />
                <p className=''>Menú</p>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className=" p-1 flex h-[280px] w-[94vw] ml-[calc((100vw_-_94vw)_/_2)] mt-1 flex-col rounded-xl bg-[#ffffff] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2),_inset_0_0_4px_1px_#ffffff] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"/* */

                // className="  p-1 flex flex-col rounded-lg bg-[#ffffff] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2),_inset_0_0_4px_1px_#ffffff] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                sideOffset={5}
              >

                {/* {allTramites.map((tramite:TramiteMd) => ( */}
                  <Link
                      as={`/iniciar-tramite/denuncia-de-venta`}
                      href="/iniciar-tramite/[slug]"
                      className={clsx('group w-full h-[34px] border-x border-[#39507f19] text-sm flex items-center justify-start first:rounded-t-md last:rounded-b-md duration-150 bg-[#edf1ff] text-[#020b1d99]  hover:bg-[#dde7fc] hover:text-[#020b1dcc] active:opacity-80',
                      {
                        // 'text-[#020b1dcd] bg-[#dde7fb] ': pathname === `/iniciar-tramite/${tramite.slug}`,
                      }
                    )}
                      // key={tramite.slug} 
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
                                // '[width:_7px] [height:_7px] ': pathname === `/iniciar-tramite/${tramite.slug}`
                              }
                            )} 
                          />
                        </div>
                        <p className="text-[14px] text-start md:text-[15px] ">
                          Denuncia de Venta
                        </p>
                      </DropdownMenu.Item>
                  </Link>
                {/* ))} */}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div> 

        <button 
          className="flex h-[34px] w-1/3 grow cursor-pointer items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] text-sm font-medium hover:bg-[#ffffff] hover:text-[#020b1d] md:flex-none md:justify-start md:px-3"
          onClick={ () => {
            //  signOut({ redirectTo: "/" });
            handleClickButton()
            setTimeout(() => signOut({ redirectTo: "/" }), 200) 
          }}
          >
          <PowerIcon className="w-[18px] text-red-500" />
          <div className="">Salir</div>
        </button>
      </Fondo>
    </>
  );

}
