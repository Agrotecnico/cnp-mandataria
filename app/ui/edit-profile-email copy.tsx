'use client';

import { useFormState } from 'react-dom';
import { useState, useEffect, useActionState } from 'react';
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import clsx from 'clsx';
import { signOut } from 'next-auth/react';

import { User } from '@/app/lib/definitions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { updateUserEmail, StateUserEmail } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { ButtonB, ButtonA } from "@/app/ui/button";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';


export default function EditPerfilEmail( { user/* , isModalOpen3 */ }: { user: User | undefined/* ; isModalOpen3: Boolean */ } ) {
  
  const [email, setEmail] = useState("");
  // const [email2, setEmail2] = useState("e-mail");

  const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"
  // const [successState, setSuccessState] = useState(false)
  // const { state, close, toggle } = useToggleState()
  // const clearState = () => {
  //   setSuccessState(false)
  // }
  // const handleToggle = () => {
  //   clearState()
  //   setTimeout(() => toggle(), 100)
  // }

  useEffect(() => {
    // user?.email && setEmail2(user.email)

    // if (successState) {
    //   close()
    // }
    /* !isModalOpen3 && */ email && setEmail("")
  }, [/* successState, close */])

  const initialState: StateUserEmail = { message: null, errors: {} };
  const updateUserEmailWithId = updateUserEmail.bind(null, `${user?.email}`);
  const [estado, formAction, isPending] = useActionState(updateUserEmailWithId, initialState);

  console.log("user: ", user)
  console.log("isEmailVisitor: ", isEmailVisitor)


  return (
    <>
      <form action={formAction}>
        <div className="flex flex-col items-center justify-between gap-6 text-small-regular p-2 pb-3 ">
          <div className={`mt-2 w-full text-[#020b1dcc] text-base text-center px-4 rounded-md `}>
            {/* { email ? email : user?.email ? user.email : <span className='text-[#020b1d77]'>e-mail</span> } */}
            { email ? email : !isEmailVisitor ? user?.email : <span className='text-[#020b1d77]'>e-mail</span> }
            {/* { email ? email : user?.email && user.email } */}
          </div>

          {/* email */}
          <div className={`relative mb-2 w-full`}>
            <InputCnp 
              className={`h-[30px] text-sm  ${email && "bg-[#ffffffdd]"} `}
              id="email"
              type="email"
              name="email"
              value={email}
              // placeholder= {!user?.email_verified ? "Cargar e-mail" : "Actualizar" }
              placeholder= {user?.email_verified ?  "Actualizar e-mail" : isEmailVisitor ? "Cargar e-mail" : "Actualizar e-mail"  }
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }} >
              <div className={`absolute rounded-l-[4px] h-[30px] w-[32px] left-0 bg-[#548effcc] `}></div>
            </InputCnp>
            <IconEmail2 className="absolute w-[16px] left-[8px] top-[7px] " color="#ffffff"  />
          </div>

          {/* Massages nombre */}
          <div
            className={`"flex items-end relative space-x-8 ${!estado?.message && "hidden"}`}
            aria-live="polite"
            aria-atomic="true"
          >
            {estado?.message && (
              <>
                <ExclamationCircleIcon className="absolute top-[7px] h-5 w-5 text-red-500" />
                <p className="pt-4 text-sm text-red-500">{estado?.message}</p>
              </>
            )}
          </div>

          {/* Guardar cambios nombre */}
          <div className="w-full flex items-center justify-end gap-4 text-sm">
            <ButtonA
              type="submit"
              className={`h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:opacity-50 `}
              // disabled={ email === ''}
              // onClick={async () => {
              //   await signOut({ callbackUrl: '/login' });
              // }}
            >
              {!user?.email_verified ? "VERIFICAR" : "Actualizar"}
            </ButtonA>
          </div>
        </div>
      </form>
    </>
  );
}

