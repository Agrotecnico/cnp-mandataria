'use client';

import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  KeyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState,  FormEvent, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { nanoid } from "nanoid";
import Link from 'next/link';

import { Button } from '@/app/ui/button';
// import { authenticate2,   createUser, StateUser, } from '@/app/lib/actions';
import { authenticate3 } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { User } from "@/app/lib/definitions";
import { ButtonA } from '@/app/ui/button';
import { set } from 'zod';
import EmailVerified from '@/app/ui/email-verified';
import { fetchUserById } from '@/app/lib/data';
import { Session } from 'inspector';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));


export default function LoginForm({ user }: { user: User | undefined}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spin, setSpin] = useState(false);

  const pathname = usePathname()

  const token= nanoid()

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }

  
  const callbackUrl = '/dashboard';

  const buttonRefAuth = useRef<HTMLButtonElement>(null); // authentication
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  // const crearUsuario= () => {
  //   setTimeout(() => handleClickButtonx(), 200) //create user

  //   /* user?.role === "member" &&   setTimeout(() => handleClickButtonVerification(), 200)*/
  //   // user?.role === "member" &&  setTimeout(() => handleClickButtonPedido(), 200)


  //   // user?.role === "member" &&  handleClickButtonVerification()
  //   // user?.role === "member" &&  handleClickButtonPedido()

  //   // setTimeout(() => handleClickButtonAuth(), 200)
  //   // setTimeout(() => setSpin(true), 200)
  //   // setTimeout(() => setSpin(false), 1000)
  //   console.log("User created")
  // }

  // const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
    
  //   try {
  //     crearUsuario();

  //   } catch (error) {
  //     console.error(error);
  //   }

  //   setSpin(false)
  // };

  // useEffect(() => {
  //     setEmail( "");
  //     setName("");
  //   }, [ ])

  // const [errorMessage, formAction, isPending] = useActionState( authenticate2, undefined,);

  // const initialState: StateUser = { message: null, errors: {} };
  // const [estado, formActionx, isPending] = useActionState(createUser, initialState);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate3, undefined, );

  // console.log("token: ", token)

  return (
    <>
      

      {/* crear user */}
      <form action={formActionAuth} className='mt-4'>
        <h1 className={` mb-3 text-center text-4xl`}>Acceso</h1>
        <Fondo className="!bg-[#d9e1f0]  p-4">
          <div className="flex flex-col gap-2 ">
            {/* <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className=" rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] !hover:bg-transparent hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Nombre"
                  // autoComplete="off"
                  required
                  minLength={3}
                  maxLength={100}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 peer-focus:text-[#2b68e2]" />
              </div>
            </Frente> */}

            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="email"
                  type="email"
                  name="email"
                  // value={email}
                  placeholder="Email"
                  autoComplete="on"
                  required
                  minLength={6}
                  maxLength={100}
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600  peer-focus:text-[#2b68e2]" />
              </div>
            </Frente>

            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600  peer-focus:text-[#2b68e2]" />
              </div>
            </Frente>

            {/* <input type="hidden" name="image" value={ "" } readOnly /> */}

            {/* <input type="hidden" name="pathname" value={pathname} readOnly /> */}
          </div>
        </Fondo>

        <ButtonA
          className={`${isPendingAuth && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent !opacity-100"} relative overflow-hidden !h-10 w-[calc(100%_-_32px)] !mt-3 mx-4 text-[13px] ml-auto disabled:!opacity-85 sm:text-[15px]`}
          type="submit"
          // aria-disabled={isPendingAuth}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </ButtonA>
      </form>

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </>
        )}
      </div>

      <Link
        href={'/register'}
        className="mx-auto !mt-0 flex items-center justify-center rounded-xl px-4 py-2 text-sm opacity-80 duration-200 hover:opacity-100 "
      >
        <p className="mr-[10px] hover:no-underline">No tienes una cuenta?</p>
        <p className="text-[#3171ed] font-medium hover:underline hover:underline-offset-2">
        Créala
        </p>
      </Link>

      {/* authentication */}
      {/* <form action={formActionAuth} className="">
        <input
          type="hidden"
          name="email"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          name="name"
          value={name}
          readOnly
        />
        <input
          type="hidden"
          name="password"
          // value= {password ? password : token}
          value= ""
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
      </form> */}
    </>
  );
}
