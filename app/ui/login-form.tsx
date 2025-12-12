'use client';

import {
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState, useEffect, HTMLAttributes } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Zoom, Flip, ToastContentProps } from 'react-toastify';
import { nanoid } from "nanoid";
import { signIn } from 'next-auth/react';

import { authenticate4, authenticate2 } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { Button } from '@/app/ui/button';
import IconGoogle from '@/app/ui/logosIconos/icon-google';
import IconFlecha from '@/app/ui//logosIconos/icon-flecha';
import IconError from '@/app/ui/logosIconos/icon-error';
import IconAviso from '@/app/ui/logosIconos/icon-aviso';
import IconCheck from '@/app/ui/logosIconos/icon-check';


const wait = () => new Promise((resolve) => setTimeout(resolve, 8000));

export default function LoginForm() {

  const [email, setEmail] = useState("");

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }
  const emailValid= isEmailValid(email)

  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-20% before:via-white/30 before:via-50%  before:to-transparent before:to-80%';

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified')

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate4, undefined, );

  useEffect(() => {
    errorMessage === undefined ? "" : errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." ? notifyEmailVerify() : notifyError()
    
    isVerified && toast(<NotifyEmailVerified />, {
      autoClose: undefined,
      closeButton:  false ,
      transition: Flip,
      className: `!w-full !min-h-min !mt-0 !p-0 !shadow-[0px_4px_12px_#a0b8e996] bg-transparent items-start mb-0` ,
    });
  }, [ errorMessage ]);

  const notifyError = () => {
    errorMessage !== undefined &&
    toast(NotifyError, {
      autoClose: 6000,
      customProgressBar: true ,
      hideProgressBar: false,
      closeButton:  false ,
      pauseOnHover: false,
      transition: Flip,
      data: {
        message: `${errorMessage}`,
      },
      className: '!w-full !min-h-min !mt-4 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });
    setTimeout(() => location.reload(), 6000) 
  };
  const notifyValidateEmail = () => {
    toast(NotifyValidateEmail, {
      autoClose: 4000,
      customProgressBar: true,
      hideProgressBar: false,
      closeButton:  false ,
      transition: Flip,
      className: '!w-full !min-h-min !mt-4 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });
  };

  const notifyEmailVerify = () => {
    toast(NotifyEmailVerify, {
      autoClose: undefined,
      closeButton:  false ,
      transition: Flip,
      className: '!w-full !min-h-min !mt-4 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });
  };



  return (
    <>
      <h1 className={`mt-4 mb-3 text-center text-3xl sm:text-4xl`}>Acceso</h1>

      <Frente className="flex h-10 !rounded-[3px]  hover:bg-[#ffffffcc] hover:[box-shadow:_0_0_0_1px_#3767c847] ">
        <button
          type="button"
          onClick={ () => {
          signIn();
          }}
          className="relative w-full flex cursor-pointer place-items-center items-center justify-start px-10 duration-200  "
        >
          <IconGoogle className="absolute top-2.5 left-3 w-[18px]" />
          <div className="flex items-center text-[#020b1d88] text-[14px] ml-1.5">con google</div>
        </button>
      </Frente>

      <form action={ emailValid ? formActionAuth : notifyValidateEmail }  className="" >
        <Fondo className=" px-3 py-4 mx-0 sm:py-6 sm:px-4 sm:mx-1.5 ">
          <div className="flex flex-col ">
            {/* <Frente className="flex h-10 !rounded-[3px]  hover:bg-[#ffffffcc] hover:[box-shadow:_0_0_0_1px_#3767c847] ">
              <button
                type="button"
                onClick={ () => {
                signIn();
                }}
                className="relative w-full flex cursor-pointer place-items-center items-center justify-start px-10 duration-200  "
              >
                <IconGoogle className="absolute top-2.5 left-3 w-[18px]" />
                <div className="flex items-center text-[#020b1d88] text-[14px] ml-1.5">con google</div>
              </button>
            </Frente> */}

            <div className="flex w-full items-center gap-2 py-2 text-sm">
              <div className="h-px w-full bg-slate-300"></div>O
              <div className="h-px w-full bg-slate-300"></div>
            </div>

            <Frente className={`!rounded-[4px] hover:!bg-[#ffffffcc] ${errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && "hover:!bg-[#ffffff88] " }`}>
              <div className={`relative `}>
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-[46px] text-sm h-10 outline-2 placeholder:text-[#020b1d88]  hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] disabled:opacity-50 disabled:hover:shadow-none "
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="con email"
                  required
                  disabled= {errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && true }
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }} 
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[21px] w-[21px] stroke-2 -translate-y-1/2 text-[#548effcc]" />
              </div>
            </Frente>

            <input 
              type="hidden" 
              name="redirectTo" 
              value={ "/dashboard/resumen" } 
              readOnly />
          </div>
        </Fondo>

        <Button
          className={`${( isPendingAuth)  && `${shimmer2} animate-pulse` } relative overflow-hidden !h-9 w-full !mt-3 justify-center bg-[#071f50cc] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50ee] hover:text-[#fff] active:!bg-[#071f50dd] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc] `}
          type="submit"
          disabled= {errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && true }
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </form>

      <div className={` ${errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." && "opacity-50"} flex justify-end gap-2 mr-4 mt-1.5 text-[13px]`}>
        <p className="text-[#020b1d88] ">No tenés acceso?</p>

        <Link
          href= { errorMessage !== "Por favor, revisá tu correo electrónico y enviá la verificación." ? '/register' : ""}
          className={` flex items-center justify-center rounded-x  ${errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." ? "opacity-50 cursor-default" : "group "}`}
        >
          <p className="text-[#3171edcc] font-medium duration-200 group-hover:text-[#3171ed]">
          Verificá tu email
          </p>
          <IconFlecha className="fill-[#3171ed99] ml-1 w-4 duration-200 group-hover:fill-[#3171ed]" />
        </Link> 
      </div>

      <ToastContainer  className={ !isVerified  ? "foo" : "foo2" } autoClose={false} />
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
      <Frente className=" w-full px-3 py-1.5 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effdd]">
        <div className='min-h-5 w-full flex items-center justify-between gap-5'>
          <div className='flex items-center gap-4 '>
            <IconError className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />
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
              stroke="#ffffffdd"
              stroke-width="26px"
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
        <Frente className="w-full px-3 py-1.5 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee]">
          <div className='min-h-5 w-full flex items-center justify-between gap-5'>
            <div className='flex items-center gap-4 '>
              <IconError className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />
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
                stroke="#ffffffdd"
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

function NotifyEmailVerify() {

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
        <Frente className="w-full pl-3 py-1.5 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee]">
          <div className='min-h-5 w-full flex items-stretch justify-between'>
            <div className='flex items-center gap-5'>
              <IconAviso className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />

              <p className="text-[15px] text-[#fff] sm:text-base [text-shadow:_1px_1px_#3d61ad]">Por favor, revisá tu correo electrónico y enviá la verificación</p>
            </div>

            <button 
              onClick={() => location.reload()}
              className='text-white text-lg flex leading-[0.8] items-start justify-center font-medium pr-3 pl-4 opacity-60 hover:opacity-100'
              >
              x
            </button>
          </div> 
        </Frente>
    </div>
  );
}

function NotifyEmailVerified() {

  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-30% before:via-white/20 before:via-50%  before:to-transparent before:to-70%';
  
    const searchParams = useSearchParams();
    const callbackUrl: string = '/dashboard/consultas' ;
  
    const token= nanoid()

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(
      authenticate2,
      undefined,
    );

  return (
    <div
      className=" flex items-center w-[440px] mt-[464px] mx-auto !shadow-[0_10px_20px_#39507f66]"
      aria-live="polite"
      aria-atomic="true"
    >
        <Frente 
          className={`${ isPendingAuth  && `${shimmer2} animate-pulse2` } relative overflow-hidden w-full mx-3 !rounded-md ![box-shadow:_inset_0_1px_#ffffffaa,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee] duration-200 hover:!bg-[#4881f3] active:!bg-[#548eff] min-[480px]:mx-0`}
          >
            
          <form action={ formActionAuth } className="w-full">
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
                value= {token}
                readOnly
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <button
                type= "submit" 
                className="w-full duration-150 p-2 pt-2.5 rounded sm:p-3"
                >

                <p className="text-[14px] sm:text-[16px] text-[#ffffffee] font-medium [font-variant-caps:_small-caps] [text-shadow:_1px_1px_#3d61ad]"><span className='inline-flex  justify-center mr-2 mb-2 ml-3'>
                  <IconCheck color="#ffffffcc" size="16" />
                </span> Correo Electrónico Verificado</p>

                <div className='flex items-center justify-center'>
                  <p className="text-[#ffffffdd] text-[13px] sm:text-[15px] [text-shadow:_1px_1px_#3d61ad]">Continuar</p>
                  <p className="text-[#ffffffdd] text-base font-semibold ml-2 mt-0.5">{">"}</p>
                </div>
            </button>
          </form>
        </Frente>
    </div>
  );
}
