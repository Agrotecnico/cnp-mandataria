"use client"
// import { useSearchParams, redirect, useRoute} from 'next/navigation';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { useActionState } from 'react';
import { useSearchParams, redirect } from 'next/navigation';


// import EmailVerified from '@/app/ui/email-verified';
import { authenticate2 } from '@/app/lib/actions';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
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

        {/* <Frente className="text-base py-1.5 px-3 mt-10 text-small-regular sm:p-4 !bg-[#d7e5d9]">
            <p>Correo electrónico verificado</p>
        </Frente>  */}


        {/* <div className="mt-12 flex w-max flex-col gap-0.5 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12 sm:flex-row">
            <Link 
                href={'/iniciar-tramite/cambio-de-radicacion'} 
                className="group h-7 flex items-center rounded-t-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-tr-none sm:rounded-l-lg sm:h-8 hover:bg-white active:opacity-80">
                <IconPresupuesto 
                    className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
                    color="#ffffffdd" color2="#020b1d"
                    />
                <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{'Pedí presupuesto'}</p>
            </Link>
            <Link 
                href={'/realizar-consulta'} 
                className="group h-7 flex items-center rounded-b-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-bl-none sm:rounded-r-lg sm:h-8 hover:bg-white active:opacity-80">
                <IconConsulta 
                    className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
                    color="#ffffffdd" color2="#020b1d"
                    />
                <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{'Realizá nueva consulta'}</p>
            </Link>
        </div> */}

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
                        {/* <p>Continuar <span className="ml-2">{`${">"}`}</span></p> */}
                        <p>Continuar <span className="ml-2">{">"}</span></p>
                    </Frente> 
                {/* Continuar */}
            </button>
        </form>
    </div>
  )
}

export default  EmailVerified