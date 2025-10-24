'use client';

import { useActionState } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

import { Button } from './button';
import { createUserAccount, StateUserAccount } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import LogoGoogle from './logosIconos/logo-google';


export default function RegisterForm() {
  
  // const initialState = { message: null, errors: {} };
  // const [state, dispatch] = useActionState(createUser, initialState);

  const initialState: StateUserAccount = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(createUserAccount, initialState);

  return (
    
    <form action={formAction} className="mt-4">
      <h1 className={` mb-3 text-center text-4xl`}>Registro</h1>

      {/* <Fondo>
        <div className="flex flex-col gap-2 p-4 ">
          <Frente className=" hover:bg-[#ffffffbb] ">
            <div
              onClick={async () => {
                await signIn('google', {
                  callbackUrl: '/dashboard',
                });
              }}
              className=" flex cursor-pointer place-items-center items-center justify-start px-10 py-1 duration-200  "
            >
              <div className="text-[14.3px] ">Continuar con</div>
              <LogoGoogle
                filter="filterGoogle1"
                sombraX="2"
                sombraY="2"
                size="94"
                className="ml-4"
              />
            </div>
          </Frente>
        </div>
      </Fondo>

      <div className="flex w-full items-center gap-2 py-6 text-sm">
        <div className="h-px w-full bg-slate-300"></div>O
        <div className="h-px w-full bg-slate-300"></div>
      </div> */}

      <Fondo>
        <div className="flex flex-col gap-2 p-4 ">
          <Frente className="!rounded-[4px]">
            <div className="relative">
              <input
                className=" rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] !hover:bg-transparent hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                id="name"
                type="text"
                name="name"
                placeholder="Nombre"
                required
                minLength={3}
                maxLength={100}
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
                placeholder="Email"
                required
                minLength={5}
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
                maxLength={100}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600  peer-focus:text-[#2b68e2]" />
            </div>
          </Frente>

          <input type="hidden" name="image" value={ "" } readOnly />
        </div>
      </Fondo>

      <Button 
        className={`${isPending && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden mt-4 !h-9 w-full justify-center bg-[#39507f] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50dd] hover:text-[#fff] active:!bg-[#39507fcc] `}
        aria-disabled={isPending}
        // onClick={() => {
        //   sessionStorage.removeItem("nombre")
        // }}
      >
        Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>

      <div
        className="h-8 flex items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.message === "usuario" ? redirect('/dashboard') : state.message && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state.message}</p>
          </>
        )}
      </div>
    
      <Link
        href={'/login'}
        className="mx-auto !mt-0 flex items-center justify-center rounded-xl px-4 py-2 text-sm opacity-80 duration-200 hover:opacity-100 "
      >
        <p className="mr-[10px] hover:no-underline">Ya tienes una cuenta?</p>
        <p className="text-[#3171ed] font-medium hover:underline hover:underline-offset-2">
        Ingresá
        </p>
      </Link>
    </form>
  );
}

