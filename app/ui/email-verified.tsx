"use client"

import { useActionState } from 'react';
import { useSearchParams, redirect, useRouter } from 'next/navigation';

// import EmailVerified from '@/app/ui/email-verified';
import { authenticate2 } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import LogoCnpColor from './logosIconos/logo-cnp-color';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

function  EmailVerified() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('page') || '/';

    const [errorMessage, formActionAuth, isPendingAuth] = useActionState(
          authenticate2,
          undefined,
        );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <LogoCnpColor  />

        {/* authentication */}
        <form action={formActionAuth} className="">
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
                value= "xxxxxx"
                readOnly
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <button
                type="submit" 
                // ref={buttonRefAuth}
                className="mt-12 opacity-85 hover:opacity-100"
                // onClick={() => {
                //     wait().then(() =>{ 
                //         // router.replace(`${searchParams.get('page')}`)
                //         // history.replaceState(`${searchParams.get('page')}`)
                //         window.history.go();
                //     });
                // }}
                >
                <Frente className="text-base py-1.5 px-3 text-small-regular sm:p-4 !bg-[#d7e5d9]">
                    <p className="text-lg font-medium">Correo electrónico verificado</p>
                    <p>Continuar <span className="ml-2">{">"}</span></p>
                </Frente> 
            </button>
        </form>
    </div>
  )
}

export default  EmailVerified