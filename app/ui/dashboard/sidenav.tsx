"use client"

import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from "next-auth/react";
import { useRef, useActionState } from 'react';

import  NavAccountAdmin  from '@/app/ui/dashboard/nav-account-admin'
import  NavAccountMember  from '@/app/ui/dashboard/nav-account-member'
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import { Fondo, Frente } from '@/app/ui/marcos'
import { User } from "@/app/lib/definitions";
import { createAccountOpen, StateAccountOpen } from '@/app/lib/actions';


export default /* async */ function SideNav({user}: {user: User |undefined}) {

  const buttonRef = useRef<HTMLButtonElement>(null); // update estado account
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const initialState: StateAccountOpen = { message: null, errors: {} };
  const createAccountOpenWithId = createAccountOpen.bind(null, `${user?.email}`);
  const [state, formAccountOpen, isPending] = useActionState(createAccountOpenWithId, initialState);

  return (
    <>
      <Fondo className="flex h-[calc(100%_-_68px)] flex-col p-2 md:pt-3">
        
        <div className="flex grow flex-row justify-between gap-2 md:gap-2 md:flex-col">
          <div className="flex flex-col w-full md:gap-0">
            <NavAccountAdmin user={user} />
          </div>

          <div className={`flex flex-col w-full md:gap-0`}>
            <NavAccountMember  user={user} /> 
          </div>

          {user?.role !== "admin" && (
            <div className={` flex flex-col text-[13px] rounded-md shadow-[box-shadow:_inset_0 1px_#ffffff,_inset_0_-1px_#0000002e] sm:text-sm md:flex`}>
              <Link 
                href={ '/iniciar-tramite/cambio-de-radicacion'} 
                className= 'group w-full h-[34px] flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffff] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>
                  
                <IconPresupuesto 
                  className={` ${user?.account === "abierto" ? " fill-[#39507f88]" : " fill-[#548eff88] "} w-[16px] mr-3 ml-2.5 `} />

                <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{ 'Pedí presupuesto'}</p>
              </Link>

              <Link 
                href={'/realizar-consulta'} 
                className= 'group w-full h-[34px] flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffff] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md'>

                <IconConsulta 
                  className={` ${user?.account === "abierto" ? " fill-[#39507f88]" : " fill-[#548eff88] "} w-[16px] mr-3 ml-2.5 `}/>
                  
                <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{ 'Realizá tu consulta'}</p>
              </Link>
            </div>
          )}

          <button 
            className="flex h-[34px] w-full grow cursor-pointer items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] text-sm font-medium hover:bg-[#ffffff] hover:text-[#020b1d] md:flex-none md:justify-start md:px-3"
            onClick={ () => {
              //  signOut({ redirectTo: "/" });
              handleClickButton()
              setTimeout(() => signOut({ redirectTo: "/" }), 1000) 
            }}
            >
            <PowerIcon className="w-[18px] text-red-500" />
            <div className=" hidden md:block">Salir</div>
          </button>
          
          <div className=" h-auto w-full grow rounded-md bg-gray-50"></div>
        </div>
      </Fondo>

      {/*update accountClouse */}
      <form action={formAccountOpen}>
        <input
          type="hidden"
          name="account"
          value= "cerrado"
          readOnly
        />
        <button
          type="submit"
          ref={buttonRef}
          className= "hidden" 
        >
          Enviar
        </button>
      </form>
    </>
  );
}