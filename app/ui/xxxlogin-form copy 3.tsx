'use client';

import {
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState, useEffect, HTMLAttributes } from 'react';
// import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Zoom, Flip, ToastContentProps } from 'react-toastify';

import { authenticate4 } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { ButtonA } from '@/app/ui/button';
import { signIn } from 'next-auth/react';
import IconGoogle from '@/app/ui/logosIconos/icon-google';
import IconFlecha from '@/app/ui//logosIconos/icon-flecha';
import IconError from '@/app/ui/logosIconos/icon-error';
import NotifyVerified from '@/app/ui/consultas/notify-verified';
import IconAviso from './logosIconos/icon-aviso';
import { assertOrUndefined } from 'pdf-lib';


const wait = () => new Promise((resolve) => setTimeout(resolve, 8000));

function LoginNotifyError2({
  message,
}: {message: string}) {
  // const strokeDash = 565.48;
  // const attributes: HTMLAttributes<SVGCircleElement> = {};

  // Manejar la barra de progreso controlada
  // La barra de progreso controlada usa una transición
  // if (typeof toastProps.progress === 'number') {
  //   attributes.style = {
  //     transition: 'all .1s linear',
  //     strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
  //   };

  //   if (toastProps.progress >= 1) {
  //     attributes.onTransitionEnd = () => {
  //       closeToast();
  //     };
  //   }
  // } else {
  //   // normal autoclose uses an animation
  //   // animation inside index.css
  //   attributes.className = 'animate';
  //   attributes.style = {
  //     animationDuration: `${toastProps.autoClose}ms`,
  //     animationPlayState: isPaused ? 'paused' : 'running',
  //   };

  //   attributes.onAnimationEnd = () => {
  //     closeToast();
  //   };
  // }

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {message && (
        <Frente className="w-full pl-3 pr-8 py-2 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee]">
          <div className='min-h-5 w-full flex items-center gap-5'>
            <IconAviso className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />

            <p className="text-sm text-[#fff] sm:text-[15px]">{message}</p>
          </div> 
        </Frente>
      )}
    </div>
  );
}



export default function LoginForm() {

  const [email, setEmail] = useState("");
  // const [emailValid, setEmailValid] = useState("");
  const [errorMessagexx, setErrorMessagexx] = useState<string | undefined>(undefined);

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    // regex && setEmailValid(email)
    return regex.test(email);
  }
  const emailValid= isEmailValid(email)

  

  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-20% before:via-white/30 before:via-50%  before:to-transparent before:to-80%';

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified') === "true"

  


  

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate4, undefined, );

  useEffect(() => {
    // setErrorMessagexx(undefined)

    // if ( errorMessage ) {
    //   notify()
    // }

    errorMessage === undefined ? "" : errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." ? notifyEmailVerify() : notifyError()
    
    

    isVerified && toast(<NotifyVerified /> , {
      autoClose: false,
      position: "bottom-right",
      closeButton: false,
      className: '!w-screen !h-screen !bg-[#020b1d66] !m-0 !-mb-4 !-mr-4 !p-0 max-[482px]:!-m-0',
    });

    // errorMessage && toast(<LoginNotifyError2 message={`${errorMessage}`} />, {
    //   autoClose: undefined,
    //   // customProgressBar: true,
    //   // hideProgressBar: true,
    //   transition: Flip,
    //   // data: {
    //   //   message: `${errorMessagexx}`,
    //   // },
    //   className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    // });

    // errorMessagexx && setErrorMessagexx(undefined)

    // setEmail("")

  }, [/* errorMessage, */ errorMessage]);

  const notifyError = () => {
    errorMessage !== undefined &&
    toast(NotifyError, {
      autoClose: 6000,
      // position: "bottom-center",
      customProgressBar: true ,
      hideProgressBar: false,
      closeButton:  false ,
      pauseOnHover: false,
      transition: Flip,
      // progress: 0.7,
      data: {
        message: `${errorMessage}`,
      },
      // className: ' !w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });/*  */
    setTimeout(() => location.reload(), 6000) 
    // location.reload()
  };

  const notifyEmailVerify = () => {
    toast(NotifyEmailVerify, {
      autoClose: undefined,
      // customProgressBar: true,
      // hideProgressBar: true,
      closeButton:  false ,
      transition: Flip,
      data: {
        message: `${errorMessagexx}`,
      },
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });
  };

  const notifyValidateEmail = () => {
    toast(NotifyValidateEmail, {
      autoClose: 4000,
      customProgressBar: true,
      hideProgressBar: false,
      closeButton:  false ,
      transition: Flip,
      // data: {
      //   message: `${errorMessagexx}`,
      // },
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
      // className: '!w-screen !h-screen !bg-[#020b1d66] !m-0 !-mb-4 !-mr-4 !p-0 max-[482px]:!-m-0',
      // className: '!w-screen !h-screen  !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });
  };


  

  const cambio= () => {
    setErrorMessagexx(errorMessage)
  }


  console.log("errorMessage:", errorMessage )
  console.log("emailValid :", emailValid )
  console.log("email :", email )


  return (
    <>
      <h1 className={`mt-4 mb-3 text-center text-4xl`}>Acceso</h1>
      <form action={ emailValid ? formActionAuth : notifyValidateEmail }  className="" >
        <Fondo className=" px-4 py-6 mx-1.5">
          <div className="flex flex-col ">
            <Frente className="flex h-10 !rounded-[3px] hover:bg-[#ffffffcc] hover:[box-shadow:_0_0_0_1px_#3767c847] ">
              <div
                // onClick={async () => {
                //   await signIn('google', {
                //     callbackUrl: '/dashboard',
                //   });
                // }}
                className="relative w-full flex cursor-pointer place-items-center items-center justify-start px-10 duration-200  "
              >
                <IconGoogle className="absolute top-2.5 left-3 w-[18px]" />
                <div className="flex items-center text-[#020b1d88] text-[14px] ml-1.5">con google</div>
              </div>
            </Frente>

            <div className="flex w-full items-center gap-2 py-2 text-sm">
              <div className="h-px w-full bg-slate-300"></div>O
              <div className="h-px w-full bg-slate-300"></div>
            </div>

            <Frente className="!rounded-[4px]  hover:bg-[#ffffffcc]">
              <div className={`relative ${errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && "opacity-50" }`}>
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-[46px] text-sm h-10 outline-2 placeholder:text-[#020b1d88] !hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] disabled:opacity-50 "
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="con email"
                  disabled= {errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && true }
                  // autoFocus
                  // autoComplete='off'
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
          className={`${( isPendingAuth)  && `${shimmer2} animate-pulse` } relative overflow-hidden !h-9 w-full !mt-3 justify-center bg-[#071f50cc] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50ee] hover:text-[#fff] active:!bg-[#071f50dd] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc] `}/*  w-[calc(100%_+_12px)] -ml-1.5 */
          type="submit"
          onClick={() => {
            // !emailValid && notify3()
            // setTimeout(() => setEmail(""), 200) 
            // setTimeout(() => setErrorMessagexx("Hola"), 200) 
            // setTimeout(() => cambio(), 300) 
            
            // setTimeout(() => setMessage(""), 1000) 
            
            // errorMessage !== undefined && errorMessage !== "Por favor, revisá tu correo electrónico y enviá la verificación." && setTimeout(() => location.reload(), 8000 ) 

            /* : setTimeout(() => location.reload(), 24000 ) */

            wait().then(() => {
              // errorMessage === "Por favor, revisa el correo electrónico y envía la verificación." ? "" : location.reload()
            })
          }}
          disabled= {errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && true }
          // aria-disabled={isPendingAuth}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </ButtonA>
      </form>

      <div className={` ${errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && "opacity-50"} flex justify-end gap-2 mr-2 mt-1.5 text-[13px]`}>{/*  */}
        <p className="text-[#020b1d88] ">No tenés acceso?</p>

        <Link
          href= /* {"/register"} */ { errorMessage !== "Por favor, revisá tu correo electrónico y enviá la verificación." ? '/register' : ""}
          className={` flex items-center justify-center rounded-x  ${errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." ? "opacity-50 cursor-default" : "group "}`}/* opacity-40" : "group */
        >
          <p className="text-[#3171edcc] font-medium duration-200 group-hover:text-[#3171ed]">
          Verificá tu email
          </p>
          <IconFlecha className="fill-[#3171ed99] ml-1 w-4 duration-200 group-hover:fill-[#3171ed]" />
        </Link> 
      </div>

      {/* <div
        className=" flex items-center w-full"
        aria-live="polite"
        aria-atomic="true"
      >

          <Frente className="w-full pl-3 pr-3 py-1.5 mt-8 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effdd]">
            <div className='min-h-5 w-full flex items-center gap-5'>
              <div className='flex items-center gap-3 '>

                <IconAviso className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />

                <p className={`text-sm text-[#fff] sm:text-[15px] `}>
                  Por favor, revisá tu correo electrónico  y enviá la verificación.
                </p>
              </div>
            </div> 
          </Frente>

      </div> */}

      <ToastContainer  className={!isVerified  ? "foo" : "" } autoClose={false} /* className="!static !w-full" */ />
      {/* <ButtonA
        onClick={cambio} >
        Verify
      </ButtonA> */}
    </>
  );
}



function NotifyError({
  closeToast,
  isPaused,
  toastProps,
  data,
}: ToastContentProps<{ message: string }>) {
  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  // Manejar la barra de progreso controlada
  // La barra de progreso controlada usa una transición
  if (typeof toastProps.progress === 'number') {
    attributes.style = {
      transition: 'all .1s linear',
      strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
    };

    if (toastProps.progress >= 1) {
      attributes.onTransitionEnd = () => {
        closeToast();
      };
    }
  } else {
    // normal autoclose uses an animation
    // animation inside index.css
    attributes.className = 'animate';
    attributes.style = {
      animationDuration: `${toastProps.autoClose}ms`,
      animationPlayState: isPaused ? 'paused' : 'running',
    };

    attributes.onAnimationEnd = () => {
      closeToast();
    };
  }

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* {data.message && ( */}
        <Frente className=" w-full pl-3 pr-3 py-2 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effdd]">
          <div className='min-h-5 w-full flex items-center justify-between gap-5'>{/*  */}

            {/* <div className='flex items-center gap-4 '>
              {data.message === "Correo electrónico no válido"   &&
              <IconError className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />}

              {data.message === "Correo electrónico no verificado"  &&
              <IconError className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />}

              {data.message === "Por favor, revisá tu correo electrónico y enviá la verificación."  && 
              <IconAviso className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />}

              <p className="text-sm text-[#fff] sm:text-[15px]">{data.message}</p>
            </div> */}
            <div className='flex items-center gap-4 '>
              <IconError className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />
              <p className="text-sm text-[#fff] sm:text-[15px]">{data.message}</p>
            </div>
            
            <svg
              width="22"
              height="22"
              viewBox="-25 -25 250 250"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="-rotate-90"
            >
              <circle
                r="90"
                cx="100"
                cy="100"
                fill="transparent"
                stroke="#e0e0e0"
                stroke-width="6"
                stroke-dasharray={`${strokeDash}px`}
                stroke-dashoffset="0"
              />
              <circle
                r="90"
                cx="100"
                cy="100"
                stroke="#ffffffbe"
                stroke-width="26px"
                stroke-linecap="round"
                fill="transparent"
                stroke-dasharray={`${strokeDash}px`}
                {...attributes}
              />
            </svg>
          </div> 
        </Frente>
      {/* )} */}
    </div>
  );
}

function NotifyEmailVerify() {

  // const cambio= () => {
  //   setErrorMessagexx(errorMessage)
  // }

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
        <Frente className="w-full p-3 !pr-0 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee]">
          <div className='min-h-5 w-full flex items-stretch justify-between'>
            <div className='flex items-center gap-5'>
              <IconAviso className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />

              <p className="text-sm text-[#fff] sm:text-[15px]">Por favor, revisá tu correo electrónico y enviá la verificación</p>
            </div>

            <button 
              onClick={() => location.reload()}
              className='text-white text-lg flex leading-[0.8] items-start justify-center font-semibold px-3 opacity-70 hover:opacity-100'
              >
              x
            </button>
          </div> 
        </Frente>
    </div>
  );
}

function NotifyValidateEmail({
  closeToast,
  isPaused,
  toastProps,
  data,
}: ToastContentProps<{ message: string }>) {
  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  attributes.className = 'animate';
  attributes.style = {
    animationDuration: `${toastProps.autoClose}ms`,
    animationPlayState: isPaused ? 'paused' : 'running',
  };

  attributes.onAnimationEnd = () => {
    closeToast();
  };

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
        <Frente className="w-full pl-3 pr-8 py-2 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee]">
          <div className='min-h-5 w-full flex items-center justify-between gap-5'>
            <div className='flex items-center gap-4 '>
              <IconError className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />
              <p className="text-sm text-[#fff] sm:text-[15px]">Correo electrónico no válido</p>
            </div>
            
            <svg
              width="22"
              height="22"
              viewBox="-25 -25 250 250"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              className="-rotate-90"
            >
              <circle
                r="90"
                cx="100"
                cy="100"
                fill="transparent"
                stroke="#e0e0e0"
                stroke-width="6"
                stroke-dasharray={`${strokeDash}px`}
                stroke-dashoffset="0"
              />
              <circle
                r="90"
                cx="100"
                cy="100"
                stroke="#ffffffbe"
                stroke-width="32px"
                stroke-linecap="round"
                fill="transparent"
                stroke-dasharray={`${strokeDash}px`}
                {...attributes}
              />
            </svg>
          </div> 
        </Frente>
    </div>
  );
}








function LoginNotifyErrorxxxxx(/* {
  closeToast,
  isPaused,
  toastProps,
  data,
}: ToastContentProps<{ message: string }> */) {
  // const strokeDash = 565.48;
  // const attributes: HTMLAttributes<SVGCircleElement> = {};

  // Manejar la barra de progreso controlada
  // La barra de progreso controlada usa una transición
  // if (typeof toastProps.progress === 'number') {
  //   attributes.style = {
  //     transition: 'all .1s linear',
  //     strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
  //   };

  //   if (toastProps.progress >= 1) {
  //     attributes.onTransitionEnd = () => {
  //       closeToast();
  //     };
  //   }
  // } else {
  //   // normal autoclose uses an animation
  //   // animation inside index.css
  //   attributes.className = 'animate';
  //   attributes.style = {
  //     animationDuration: `${toastProps.autoClose}ms`,
  //     animationPlayState: isPaused ? 'paused' : 'running',
  //   };

  //   attributes.onAnimationEnd = () => {
  //     closeToast();
  //   };
  // }

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* {data.message && ( */}
        <Frente className="w-full pl-3 pr-8 py-2 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee]">
          <div className='min-h-5 w-full flex items-center gap-5'>
            <IconAviso className={`mb-auto h-[19px] w-[19px] fill-[#ffffffcc]`} />

            <p className="text-sm text-[#fff] sm:text-[15px]">{/* {data.message} */}Por favor, revisá tu correo electrónico y enviá la verificación</p>
          </div> 
        </Frente>
      {/* )} */}
    </div>
  );
}