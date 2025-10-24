"use client"

import { useActionState } from 'react';
import { useSearchParams, redirect, useRouter } from 'next/navigation';
import { nanoid } from "nanoid";

import { authenticate2 } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import LogoCnpColor from '@/app/ui/logosIconos/logo-cnp-color';



const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

function  EmailVerified() {

    const router = useRouter();
    const searchParams = useSearchParams();
    // const callbackUrl = searchParams.get('page') || '/realizar-consulta';
    const callbackUrl:string = '/dashboard' ;

    const token= nanoid()

    const [errorMessage, formActionAuth, isPendingAuth] = useActionState(
          authenticate2,
          undefined,
        );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <LogoCnpColor  />

        {/* authentication */}
        <form action={formActionAuth} className=" w-max !mt-6">
            <input
                id="email"
                type="hidden"
                name="email"
                value={`${searchParams.get("email")}`}
                readOnly
            />
            <input
                id="password"
                type="hidden"
                name="password"
                // 
                value= {token}
                readOnly
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <button
                type="submit" 
                // ref={buttonRefAuth}
                className=" "
                onClick={() => {
                    wait().then(() =>{ 
                        router.replace(`${searchParams.get('page')}`)
                        history.replaceState(`${searchParams.get('page')}`, "")
                        window.history.go();
                    });
                }}
                >
                <Frente className="w-max py-4 px-7 mx-auto transition-colors duration-150 text-[#011201d8] !bg-[#d8ebdb] hover:text-[#011201ee] hover:!bg-[#c9dfcc]">
                    <p className="text-[15px]">Correo electrónico verificado</p>
                    <p className="text-sm">Continuar <span className="text-sm ml-2">{">"}</span></p>
                </Frente> 
            </button>
        </form>
    </div>
  )
}

export default  EmailVerified