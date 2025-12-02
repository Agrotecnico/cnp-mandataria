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
import Link from 'next/link';
import { ToastContainer, toast, Zoom, Flip } from 'react-toastify';

import { createUser, StateUser, authenticate2 } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { ButtonA } from '@/app/ui/button';
import LogoGoogle from './logosIconos/logo-google';
import { signIn } from 'next-auth/react';
import IconGoogle from '@/app/ui/logosIconos/icon-google';
import IconFlecha from '@/app/ui//logosIconos/icon-flecha';
import LoginNotifyError from '@/app/ui/login-notify-error';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

type MyToastProps = {
  actionState: /* string; */"Credencial no válida." | "Algo salió mal." | undefined
};

const MyToast: React.FC<MyToastProps> = ({ actionState }) => {
  return (
    <div>
      <strong>Estado actual:</strong> {actionState}
    </div>
  );
};

function showToast(actionState: "Credencial no válida." | "Algo salió mal." | undefined) {
  toast(<MyToast actionState={actionState} />, {
    autoClose: false,
  });
}



type State = { status: string };
function reducer(prevState: State, action: string): State {
  return { status: action };
}













export default function LoginForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [actionState, setActionState] = useState("Inicial");



  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-20% before:via-white/30 before:via-50%  before:to-transparent before:to-80%';

  const errorMessagex= "polo"
  
  
  useEffect(() => {
    toast(<LoginNotifyError errorMessage={errorMessage} />, {
      customProgressBar: true,
      // autoClose: 5000,
      position: "bottom-center",
      transition: Flip,
      pauseOnHover: false,
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#0b59191a] ',
    });
  
  }, [])

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  const [state, dispatch] = useActionState(reducer, { status: "Inicial" });



  const limpiarNotificaciones = () => {
    toast.dismiss();
  };

  const loginNotifyError = () =>
    /* errorMessage && */ toast(<LoginNotifyError errorMessage={errorMessagex} />, {
      customProgressBar: true,
      // autoClose: 5000,
      position: "bottom-center",
      transition: Flip,
      pauseOnHover: false,
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#0b59191a] ',
  });
  



 const handleClick = () => {
    dispatch("Procesando...");
    showToast(errorMessage);
  };



  const handleClick2 = () => {
    
    formActionAuth
    // showToast2(state.status);
    const id = toast(<MyToast actionState={errorMessage} />, { autoClose: false });
    toast.update(id, {
      render: <MyToast actionState={errorMessage} />,
      type: "success",
      autoClose: 3000,
    });
  };



  






  // console.log("token: ", token)

  return (
    <>
      <h1 className={`mt-4 mb-3 text-center text-4xl`}>Acceso</h1>
      <form action={/* email && */ formActionAuth }  className="" >
        <Fondo className=" px-4 py-6">
          <div className="flex flex-col ">
            <Frente className="flex h-10  hover:bg-[#ffffffcc] hover:[box-shadow:_0_0_0_1px_#3767c847] ">{/* hover:bg-[#ffffff00] */}
              <div
                // onClick={async () => {
                //   await signIn('google', {
                //     callbackUrl: '/dashboard',
                //   });
                // }}
                className="relative flex cursor-pointer place-items-center items-center justify-start px-10 duration-200  "
              >
                <IconGoogle className="absolute top-2.5 left-3 w-[18px]" />
                <div className="flex items-center text-[#020b1d88] text-[14px] ml-1.5">con google</div>{/* Continuar  */}
                
              </div>
            </Frente>

            <div className="flex w-full items-center gap-2 py-2 text-sm">
              <div className="h-px w-full bg-slate-300"></div>O
              <div className="h-px w-full bg-slate-300"></div>
            </div>

            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-[46px] text-sm h-10 outline-2 placeholder:text-[#020b1d88] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="con email"
                  // required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }} 
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[21px] w-[21px] stroke-2 -translate-y-1/2 text-[#548effcc]" />
              </div>
            </Frente>
          </div>
        </Fondo>
      
        <ButtonA
          className={`${( isPendingAuth)  && `${shimmer2} animate-pulse` } relative overflow-hidden  !h-9 w-[calc(100%_+_20px)] !mt-3 -ml-2.5 justify-center bg-[#071f50cc] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50ee] hover:text-[#fff] active:!bg-[#071f50dd] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc]      `}
          type="submit"
          // onClick={displayMsg}
          onClick={() => {
            // limpiarNotificaciones()
            // setErrorMessagex(`${errorMessage}`)
            
            // showToast()
            
            wait().then(() => {
              // setErrorMessagex(`${errorMessage}`)
              // loginNotifyError()
              // setName(`${new Date()}`)
              // 
              
            })
          }}
          aria-disabled={isPendingAuth}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </ButtonA>

        
      </form>

      <div className='flex justify-end gap-2 mr-2 mt-2 text-[13px]'>
        <p className="text-[#020b1d88] ">No tenés acceso?</p>

        <Link
          href={'/register'}
          className="group flex items-center justify-center rounded-x "
        >
          <p className="text-[#3171edcc] font-medium duration-200 group-hover:text-[#3171ed]">
          Verifica tu email
          </p>
          <IconFlecha className="fill-[#3171ed99] ml-1 w-4 duration-200 group-hover:fill-[#3171ed]" />
        </Link> 
      </div>

      <div>
        {/* <button onClick={handleClick2}>Ejecutar acción</button> */}
      </div>


      <ToastContainer  className="!static !w-full !transform-none" />

      {/* <div
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
      </div> */}

      <div>
       { 
        errorMessage !== undefined && 
        
        toast(<LoginNotifyError errorMessage={errorMessage} />, {
          customProgressBar: true,
          // autoClose: 5000,
          position: "bottom-center",
          transition: Flip,
          pauseOnHover: false,
          className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#0b59191a] ',
        })
        
        }
        </div>
      
      {/* <LoginNotifyError errorMessage={errorMessage} /> */}

    </>
  );
}
