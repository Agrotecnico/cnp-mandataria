'use client';

import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Fondo, Frente } from '@/app/ui/marcos';


export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-center text-4xl`}>Acceso</h1>

        <Fondo>
          <div className="flex flex-col gap-2 p-4 ">
            <Frente>
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-md peer block w-full border border-transparent bg-transparent py-[9px] duration-150 pl-10 text-sm outline-2 placeholder:text-[#1d021599] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-900 peer-focus:text-gray-900" />
              </div>
            </Frente>
            <Frente>
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-md peer block w-full border border-transparent bg-transparent py-[9px] duration-150 pl-10 text-sm outline-2 placeholder:text-[#1d021599] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-900 peer-focus:text-gray-900" />
              </div>
            </Frente>
          </div>
        </Fondo>


        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <Button 
          className={`${isPending && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden mt-4 w-full justify-center bg-[#39507f] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50dd] hover:text-[#fff] active:!bg-[#39507fcc] `}
          aria-disabled={isPending}
          onClick={() => {
            sessionStorage.removeItem("nombre")
          }}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

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
      </div>
    </form>
  );
}
