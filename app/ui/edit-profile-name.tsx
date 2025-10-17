'use client';

import { useState, useActionState } from 'react';
import { usePathname } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { User } from '@/app/lib/definitions';
import { updateUserName, StateUserName } from '@/app/lib/actions';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { ButtonA } from "@/app/ui/button";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';

const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function EditPerfilName( { user, setIsModalOpen2}: { user: User | undefined; setIsModalOpen2: React.Dispatch<React.SetStateAction<boolean>>
 } ) {

  // export default function EditPerfilName( { user, setIsModalOpen2xx}: { user: User | undefined; setIsModalOpen2xx: any } ) {

  const pathname = usePathname();
  
  const [name, setName] = useState("");
  const [spin, setSpin] = useState(false);

  const initialState: StateUserName = { message: null, errors: {} };
  const updateUserWithId = updateUserName.bind(null, `${user?.id}`);
  const [estado, formAction, isPending] = useActionState(updateUserWithId, initialState);


  return (
    <form action={ formAction }>
      <div className="flex flex-col items-center justify-between gap-9 text-small-regular p-2 pb-3 ">
        <div className="mt-2 w-full text-base text-center px-4 rounded-md text-[#020b1d]">
          { name ? name : user?.name }
        </div>

        {/* Name */}
        <div className="relative mb-2 w-full">
          <InputCnp 
            className={`h-7 hover:[box-shadow:_0px_0px_0px_1px_#548eff44] `}
            id="name"
            type="text"
            name="name"
            min={2}
            value={name}
            placeholder= {"Cambiar Nombre"}
            required
            onChange={(e) => {
              setName(e.target.value);
            }} >
            <div className={`absolute rounded-l-[4px] h-7 w-[32px] left-0 bg-[#548effcc] `}></div>
          </InputCnp>
          <IconCuenta className="absolute w-[16px] left-[8px] top-[5px] " color="#ffffff"  />
        </div>

        <input type="hidden" name="pathname" value={pathname} readOnly />

        {/* Massages nombre */}
        <div
          className={`"flex items-end relative space-x-8 ${!estado?.message && "hidden"}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {estado?.message && (
            <>
              <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
              <p className="pt-4 text-sm text-red-500">{estado?.message}</p>
            </>
          )}
        </div>

        {/* Guardar cambios nombre */}
        <div className="w-full flex items-center justify-between gap-4 text-sm">
          <button
            type="button"
            onClick={() => {
              setIsModalOpen2(false)
              wait().then(() => {
                setName("")
              })
            }}
            className="h-[30px] w-[74px] opacity-70 bg-[#ff0000] text-[#ffffff] bottom-3 text-[13px]  duration-150 px-2 rounded-md hover:opacity-100 active:opacity-70 "
          >
            Cancelar
          </button>

          <ButtonA
            type="submit"
            className={`${ spin  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#28395a] "}  relative overflow-hidden  h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:hover:opacity-60`}
            disabled={ !name}
            onClick={ () => {
              setSpin(true)
              wait().then(() => {
                setSpin(false)
                location.reload();
              })
            }}
          >
            Actualizar
          </ButtonA>
        </div>
      </div>
    </form>
  );
}

