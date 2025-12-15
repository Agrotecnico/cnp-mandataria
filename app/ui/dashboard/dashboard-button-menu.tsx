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
import IconCuenta from '../logosIconos/icon-cuenta';
import { links }  from '@/app/constant';
import { linksMembers }  from '@/app/constant';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';


export default  function DashboardButtonMenu({user}: {user: User |undefined}) {

  const pathname = usePathname();

  const buttonRef = useRef<HTMLButtonElement>(null); // update estado account
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  return (
    <>
      
      <div className="flex items-center gap-1.5 w-full sm:ml-0">{/* block min-[900px]:hidden */}
        <div className="w-2/3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild >
              <button
                className="inline-flex w-full items-center  [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] justify-center gap-3 h-[34px] text-[14px] opacity-90 px-2 rounded-md bg-[#548eff16] text-[#020b1dbb] duration-150 outline-none hover:opacity-100 sm:text-[15px] sm:px-3  hover:bg-[#548eff26] hover:text-[#020b1d]"
              >
                <IconMenu2 className="w-3.5 fill-[#39507f]" />
                <p className=''>Menú</p>
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className=" p-1.5 flex gap-1.5 w-[66vw] ml-3 mt-0.5 flex-col rounded-lg bg-[#ffffff] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2),_inset_0_0_4px_1px_#ffffff] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade"
                sideOffset={5}
              >{/*  ml-[calc((100vw_-_94vw)_/_2)] */}
                <Link
                  // href={ user?.account === "abierto" && (user?.role === "memberAccount" || user?.role === "admin") ? "#" : "/dashboard/cuenta"}
                  href={ user?.role === "admin" ? "/dashboard/cuenta" : "#"}
                  className={clsx(' flex w-full text-[13px] items-center justify-start rounded-md duration-200 text-[#020b1dbb] bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#548eff26] hover:text-[#020b1d] sm:text-sm ',
                    {
                      'text-[#020b1e] bg-[#548eff29] ':  pathname === "/dashboard/cuenta",
                      // 'hidden ':  user?.account === "abierto" && (user.role === "memberAccount" || user.role === "admin"),
                      'opacity-60 !cursor-default':  user?.role !== "admin"
                    }
                  )}
                  // prefetch={user?.role !== "admin" ? false : true}
                  // aria-disabled={ user?.role === "admin" ? true : false }
                >
                  <DropdownMenu.Item 
                    className="w-full h-8 px-2.5 gap-2 flex items-center justify-start sm:h-9 sm:flex-row sm:justify-start"
                    >
                    <IconCuenta className={`w-5 ${pathname === "/dashboard/cuenta" ? "fill-[#548eff]" : "fill-[#548eff88]"} `} />
                    <p className="text-start ">
                      { 
                        user?.account === "cerrado" && (user.role === "memberAccount" || user.role === "admin") ? "Ingresá a tu CUENTA" :
                        user?.account === "cerrado" && (user.role === "memberVerified" ) && "Creá tu CUENTA"
                      }
                    </p>
                  </DropdownMenu.Item>
                </Link>




                <div className="flex flex-col w-full md:gap-0">
                  <div>
                    {links?.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={clsx('w-full text-sm items-center justify-start first:rounded-t-md last:rounded-b-md duration-200 text-[#020b1dbb] bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] hover:bg-[#548eff26] hover:text-[#020b1d]  ',/*  md:first:rounded-bl-none md:last:rounded-tr-none  md:first:rounded-t-md md:last:rounded-b-md */
                            {
                              'text-[#020b1e] bg-[#548eff30] ':  pathname === link.href,
                              'flex': user?.account === "abierto",
                              'hidden': user?.account === "cerrado",
                            }
                          )}
                        >
                          <DropdownMenu.Item  className="h-[30px] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] w-full px-2.5 gap-3 flex items-center justify-start hover:bg-[#548eff26] sm:flex-row sm:justify-start">
                          {/* <button className="h-[34px] w-full px-2.5 gap-3 flex items-center justify-start sm:flex-row sm:justify-start" > */}
                            <LinkIcon className={`w-[15px] ${pathname === link.href ? "fill-[#39507f]" : "fill-[#39507f88]"} `} />

                            <p className={`text-[13px] text-start `}>
                              {link.name}
                            </p>
                          {/* </button> */}
                          </DropdownMenu.Item>
                        </Link>
                      );
                    })}
                  </div>
                </div>



                <div className={`flex flex-col w-full md:gap-0`}>
                  {linksMembers?.map((link) => {
                    const LinkIcon = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={clsx('w-full text-[13px] flex items-center justify-start first:rounded-t-md last:rounded-b-md duration-200 text-[#020b1dbb] bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] hover:bg-[#548eff26] hover:text-[#020b1d]',/*  md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md */
                          {
                            'text-[#020b1e] bg-[#548eff29] ':  pathname === link.href,
                          }
                        )}
                      >
                        <DropdownMenu.Item className="h-[30px] w-full px-2.5 gap-3 flex items-center justify-start sm:flex-row sm:justify-start" >
                          {user?.account === "abierto" ? (
                            <LinkIcon className={`w-[15px] ${pathname === link.href ? "fill-[#39507f]" : "fill-[#39507f88]"} `} />
                          ) : (
                            <LinkIcon className={`w-[15px] ${pathname === link.href ? "fill-[#548eff]" : "fill-[#548eff88]"} `} />
                          )}

                          <p className={`text-[13px] text-start `}>
                            {link.name}
                          </p>
                        </DropdownMenu.Item>
                      </Link>
                    );
                  })}
                </div>



                {user?.role !== "admin" && (
                  <div className={` flex flex-col text-[13px] rounded-md shadow-[box-shadow:_inset_0 1px_#ffffff,_inset_0_-1px_#0000002e] sm:text-sm md:flex`}>
                    <Link 
                      href={ '/iniciar-tramite/cambio-de-radicacion'} 
                      className= 'group w-full h-[30px] flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] hover:bg-[#548eff26] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>
                        
                      <IconPresupuesto 
                        className={` ${user?.account === "abierto" ? " fill-[#39507f88]" : " fill-[#548eff88] "} w-[15px] mr-3 ml-2.5 `} />

                      <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{ 'Pedí presupuesto'}</p>
                    </Link>

                    <Link 
                      href={'/realizar-consulta'} 
                      className= 'group w-full h-[30px] flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] hover:bg-[#548eff26] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>

                      <IconConsulta 
                        className={` ${user?.account === "abierto" ? " fill-[#39507f88]" : " fill-[#548eff88] "} w-[15px] mr-3 ml-2.5 `}/>
                        
                      <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{ 'Realizá tu consulta'}</p>
                    </Link>
                  </div>
                )}



                <button 
                  className="flex h-[30px] w-full grow cursor-pointer items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000001e] text-sm font-medium hover:bg-[#548eff26] hover:text-[#020b1d] md:flex-none md:justify-start md:px-3"
                  onClick={ () => {
                    //  signOut({ redirectTo: "/" });
                    handleClickButton()
                    setTimeout(() => signOut({ redirectTo: "/" }), 1000) 
                  }}
                  >
                  <PowerIcon className="w-[17px] text-red-500" />
                  <div className=" hidden md:block">Salir</div>
                </button>



                {/* {allTramites.map((tramite:TramiteMd) => ( */}
                  {/* <Link
                      as={`/iniciar-tramite/denuncia-de-venta`}
                      href="/iniciar-tramite/[slug]"
                      className={clsx('group w-full h-[34px] border-x border-[#39507f19] text-sm flex items-center justify-start first:rounded-t-md last:rounded-b-md duration-150 bg-[#edf1ff] text-[#020b1d99]  hover:bg-[#dde7fc] hover:text-[#020b1dcc] active:opacity-80',
                      {
                        // 'text-[#020b1dcd] bg-[#dde7fb] ': pathname === `/iniciar-tramite/${tramite.slug}`,
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
                                // '[width:_7px] [height:_7px] ': pathname === `/iniciar-tramite/${tramite.slug}`
                              }
                            )} 
                          />
                        </div>
                        <p className="text-[14px] text-start md:text-[15px] ">
                          Denuncia de Venta
                        </p>
                      </DropdownMenu.Item>
                  </Link> */}
                {/* ))} */}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div> 

        <button 
          className="flex h-[34px] w-1/3 grow cursor-pointer items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#548eff16] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] text-sm font-medium hover:bg-[#548eff26] hover:text-[#020b1d] md:flex-none md:justify-start md:px-3"
          onClick={ () => {
            //  signOut({ redirectTo: "/" });
            handleClickButton()
            setTimeout(() => signOut({ redirectTo: "/" }), 200) 
          }}
          >
          <PowerIcon className="w-[18px] text-red-500" />
          <div className="">Salir</div>
        </button>
      </div>
    </>
  );

}
