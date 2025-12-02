"use client";

import 'react-toastify/dist/ReactToastify.css';
import { redirect } from 'next/navigation';

import { Frente, Fondo } from '@/app/ui/marcos';
import { StateUserAccount } from '@/app/lib/actions';
import IconError from '@/app/ui/logosIconos/icon-error';


export default function NotifyErrorRegister({ 
  statex
}: { 
  statex: StateUserAccount
}) {

  // const statex= {errors: {name: ["Correo electrónico no válido."], email: 
  // ['El nombre debe tener al menos dos caracteres.'], password: ['La contraseña debe tener al menos seis caracteres.']}, message: 'Campos faltantes. No se pudo crear el Usuario.'}

  console.log("statex:", statex);

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* {statex?.message === "usuario" ? redirect('/dashboard') : statex.message && ( */}
        <div className="w-full flex items-center shadow-[0px_4px_12px_#edd1d170]">
          <Frente className="min-h-9 w-full text-[13px] px-3 py-2 !rounded-md !bg-[#ebccccb6] flex flex-col items-start gap-1 ">
            {statex.errors?.name && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{statex.errors?.name}</p>
            </div> }

            {statex.errors?.email && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{statex.errors?.email}</p>
            </div> }

            {statex.errors?.password && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{statex.errors?.password}</p>
            </div> }
          </Frente>
        </div>
      {/* )} */}
    </div>
  );
}


