'use client';

import {
  AtSymbolIcon,
  ExclamationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState,  FormEvent, useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { nanoid } from "nanoid";

import { createUser, StateUser, authenticate2 } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { User } from "@/app/lib/definitions";
import { ButtonA } from '@/app/ui/button';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));


export default function LoginForm(/* { user }: { user: User | undefined} */) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  // console.log("token: ", token)

  return (
    <>
      <h1 className={` mb-3 text-center text-4xl`}>Acceso</h1>
      <form action={formActionx} >
        <Fondo className="!bg-[#d9e1f0]  p-4">
          <div className="flex flex-col gap-2 ">
            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className=" rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] !hover:bg-transparent hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="name"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Nombre"
                  required
                  minLength={3}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600 peer-focus:text-[#2b68e2]" />
              </div>
            </Frente>

            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }} 
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600  peer-focus:text-[#2b68e2]" />
              </div>
            </Frente>

            <input
              type="hidden"
              id="image"
              name="image"
              value={ "" }
              readOnly
            />
            <input type="hidden" name="pathname" value={callbackUrl} readOnly />
          </div>
        </Fondo>
      
        {/* crear user */}
        <ButtonA
          className={`${ (isPendingx || isPendingAuth)  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent "}  relative overflow-hidden !h-10 w-[calc(100%_-_32px)] !mt-3 mx-4 justify-center bg-[#071f50cc] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50ee] hover:text-[#fff] active:!bg-[#071f50bb] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc] `}
          type="submit"
          disabled={ name && email && isEmailValid(`${email}`) ? false : true }
          onClick={() => {
            setTimeout(handleClickButtonAuth, 200) 
          }}
          aria-disabled={isPendingx}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </ButtonA>
      </form>

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {estadox?.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{estadox?.message}</p>
          </>
        )}
      </div>

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
          value= {token}
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
