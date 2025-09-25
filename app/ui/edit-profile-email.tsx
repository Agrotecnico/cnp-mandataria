'use client';

import { useFormState } from 'react-dom';
import { useState, useEffect, useActionState, FormEvent, useRef } from 'react';
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { usePathname, useSearchParams } from 'next/navigation';

import { User } from '@/app/lib/definitions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { updateUserEmail, StateUserEmail, updateCommentEmail, StateUpdateCommentEmail, authenticate2 } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { ButtonB, ButtonA } from "@/app/ui/button";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';


export default function EditPerfilEmail( { user }: { user: User | undefined } ) {
  
  const [email, setEmail] = useState("");
  const [spin, setSpin] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('/realizar-consulta') || '/realizar-consulta';

  const pathname = usePathname();

  const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"

  const id= user?.email!

  const buttonRefxxxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxxxx= () => {
    if (buttonRefxxxx.current) buttonRefxxxx.current.click()
  }; // update comment email
  
  const buttonRefxxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxxx= () => {
    if (buttonRefxxx.current) buttonRefxxx.current.click()
  }; // update user email

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const enviarConsultaxxxx= () => {
    setTimeout( () => handleClickButtonxxxx(), 200) // update comment email
    setTimeout( () => handleClickButtonxxx(), 200) // update user email
    console.log("Consulta creada")
  }

  const uploadToServer3 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSpin(true)
      enviarConsultaxxxx();
    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };

  useEffect(() => {
     email && setEmail("")
  }, [])

  // const initialState: StateUserEmail = { message: null, errors: {} };
  // const updateUserEmailWithId = updateUserEmail.bind(null, `${user?.email}`);
  // const [estado, formAction, isPending] = useActionState(updateUserEmailWithId, initialState);

  const initialStatexxxx: StateUpdateCommentEmail = { message: null, errors: {} };
  const updateCommentEmailWithId = updateCommentEmail.bind(null, id);
  const [estadoxxxx, formActionxxxx, isPendingxxxx] = useActionState(updateCommentEmailWithId, initialStatexxxx);

  const initialStatexxx: StateUserEmail = { message: null, errors: {} };
  const updateUserEmailWithId = updateUserEmail.bind(null, id);
  const [estadoxxx, formActionxxx, isPendingxxx] = useActionState(updateUserEmailWithId, initialStatexxx);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  console.log("user: ", user)
  console.log("isEmailVisitor: ", isEmailVisitor)


  return (
    <>
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
          className={`"flex items-end relative space-x-8 ${!estadoxxx?.message && "hidden"}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {estadoxxx?.message && (
            <>
              <ExclamationCircleIcon className="absolute top-[7px] h-5 w-5 text-red-500" />
              <p className="pt-4 text-sm text-red-500">{estadoxxx?.message}</p>
            </>
          )}
        </div>

        {/* Guardar cambios nombre */}
        <form onSubmit={ uploadToServer3 } className='w-full'>
          <div className="w-full flex items-center justify-end gap-4 text-sm">
            <ButtonA
              type="submit"
              className={`h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:opacity-50 `}
              // disabled={ email === ''}
              onClick={async () => {
                // await signOut({ callbackUrl: '/login' });
                setTimeout(handleClickButtonAuth, 2000) 
              }}
            >
              {!user?.email_verified ? "VERIFICAR" : "Actualizar"}
            </ButtonA>
          </div>
        </form>
      </div>

      {/*update comment email */}
      <form action={formActionxxxx}>
        <input
          type="hidden"
          name="email_id"
          value={ email }
          readOnly
        />

        <input
          type="hidden"
          name="pathname"
          value= {pathname}
          readOnly
        />

        <button
          type="submit"
          ref={buttonRefxxxx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>

      {/*update user email */}
      <form action={formActionxxx}>
        <input
          type="hidden"
          name="email"
          value={ email }
          readOnly
        />

        <input
          type="hidden"
          name="pathname"
          value= {pathname}
          readOnly
        />

        <button
          type="submit"
          ref={buttonRefxxx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>

      {/* authentication */}
      <form action={formActionAuth} className="">
        <input
          type="hidden"
          name="email"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          name="password"
          value= "72cf0550-3f64-474d-b150-aa813c6b4b67"
          readOnly
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          type="submit" 
          ref={buttonRefAuth}
          className="hidden"
        >
          Continuar
        </button>
      </form>
    </>
  );
}

