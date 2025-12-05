'use client';

import { useActionState, useEffect, HTMLAttributes, useRef, useState } from 'react';
import {
  AtSymbolIcon,
  UserIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { usePathname, useSearchParams, redirect } from 'next/navigation';
import { ToastContainer, toast, Zoom, Flip, ToastContentProps } from 'react-toastify';
import { nanoid } from "nanoid";

import { Button } from './button';
import { createUser2, StateUser, authenticate2, authenticate4  } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import IconFlecha from '@/app/ui//logosIconos/icon-flecha';
import IconError from '@/app/ui/logosIconos/icon-error';
import IconAviso from '@/app/ui/logosIconos/icon-aviso';
import { User } from "@/app/lib/definitions";


export default function RegisterAccount({/*user,  open, */ setOpen}: {/*user: User | undefined;  open: boolean; */ setOpen: React.Dispatch<React.SetStateAction<boolean>>
 }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }
  const emailValid= isEmailValid(email)

  // const pathname = usePathname();
  const pathname = "/login";
  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-20% before:via-white/30 before:via-50%  before:to-transparent before:to-80%';

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified') === "true"

  const buttonRefAuth = useRef<HTMLButtonElement>(null); // authentication
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const initialState: StateUser = { message: null, errors: {} };
  const [state, formCreateUser, isPending] = useActionState(createUser2, initialState);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  useEffect(() => {

    // errorMessage === undefined ? "" : errorMessage === "Por favor, revisá tu correo electrónico y enviá la verificación." ? notifyEmailVerify() : notifyError()

    state.message === "usuario"  ? notifyEmailVerify() : state.errors === undefined || state.message === null ? "" : notifyError()

    // isVerified && toast(<NotifyEmailVerified />, {
    //   autoClose: undefined,
    //   closeButton:  false ,
    //   transition: Flip,
    //   className: `!w-full !min-h-min !mt-0 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ${ state.message === "usuario" && "bg-transparent items-start mb-0" }` ,
    // });

  }, [state ]);

  const notifyError = () => {
    toast(<NotifyError state={state} />, {
      // customProgressBar: true,
      autoClose: 7000,
      position: "bottom-center",
      transition: Flip,
      pauseOnHover: false,
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#e9a2a247] ',
      progressClassName: "fancy-progress",
      closeButton: false ,
      hideProgressBar: true,
    });
  };
  const notifyValidateEmail = () => {
    toast(NotifyValidateEmail, {
      autoClose: 4000,
      customProgressBar: true,
      hideProgressBar: false,
      closeButton:  false ,
      transition: Flip,
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });
  };

  const notifyEmailVerify = () => {
    toast(<NotifyEmailVerify email= {email} />, {
      autoClose: undefined,
      closeButton:  false ,
      transition: Flip,
      className: `!w-full !min-h-min !mb-8 !mt-0 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ${ state.message === "usuario" && "bg-transparent items-start " }` ,
    });
  };
  

  return (
    <>
      <h1 className={`mt-2 mb-4 text-center text-2xl`}>Registro <span className='text-sm'>contraseña</span></h1>
      <form action= { emailValid ? formCreateUser : notifyValidateEmail } className="">
        <Fondo className=" px-3 py-4 mx-0 sm:py-6 sm:px-4 sm:mx-1.5 ">
          <div className="flex flex-col gap-4">
            {/* <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className=" rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] !hover:bg-transparent hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  required
                  minLength={2}
                  maxLength={126}
                  value={name}
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
                  placeholder="Email"
                  required
                  // minLength={6}
                  // maxLength={126}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }} 
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600  peer-focus:text-[#2b68e2]" />
              </div>
            </Frente> */}

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

            {/* <Frente className=" hover:bg-[#ffffffbb] ">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-md peer block w-full border border-transparent bg-transparent py-[9px] duration-150 pl-10 text-sm outline-2 placeholder:text-[#1d021599] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#c737c739] focus:[box-shadow:_0_0_0_1px_#c737c7ee] focus:bg-[#ffffffbb] focus:border-[#2f6feb00] focus:outline-1 focus:outline-[#c37bc336] "
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmá la contraseña"
                  autoComplete="new password"
                  required
                  minLength={6}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-900 peer-focus:text-gray-900" />
              </div>
            </Frente> */}

            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-10 text-sm h-10 outline-2 placeholder:text-[#020b1d88] hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmá la contraseña"
                  autoComplete="off"
                  required
                  minLength={6}
                  maxLength={100}
                />
                <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-600  peer-focus:text-[#2b68e2]" />
              </div>
            </Frente>

            <input type="hidden" name="image" value={ "" } readOnly />

            <input type="hidden" name="password" value= {"72cf0550-3f64-474d-b150-aa813c6b4b67" } readOnly />
          </div>
        </Fondo>

        <Button 
          className={`${( isPending)  && `${shimmer2} animate-pulse` } relative overflow-hidden !h-9 w-full !mt-3 justify-center bg-[#548effdd] text-base  text-[#ffffffcc] duration-150 hover:bg-[#548eff] hover:text-[#fff] active:!bg-[#548effcc] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc] `}/* bg-[#071f50cc] */
          type="submit"
          aria-disabled={isPending}
          onClick={() => { 
            setTimeout(handleClickButtonAuth, 200) 
          }}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
      </form>

      <div className='flex justify-end gap-2 mr-4 mt-1.5 text-[13px]'>
        <p className=" text-[#020b1d88]">Ya tenés una cuenta?</p>

        <button
          // href={'/login'}
          className="group flex items-center justify-center rounded-x "
          onClick={() => setOpen(true)}
        >
          <p className="text-[#39507fcc] font-semibold duration-200 group-hover:text-[#39507f]">
          Ingresá
          </p>
          <IconFlecha className="fill-[#39507faa] ml-1 w-4 duration-200 group-hover:fill-[#39507f]" />
        </button>
      </div>

      <ToastContainer  className={ state.message === "usuario" ? "foo3" : "foo" } autoClose={false} />

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
          value= "72cf0550-3f64-474d-b150-aa813c6b4b67"
          readOnly
        />
        <input type="hidden" name="redirectTo" value={pathname} readOnly/>
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



function NotifyError({ 
  state,
}: { 
  state: StateUser
}) {
  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  attributes.className = 'animate';
  attributes.style = {
    animationDuration: `7000ms`,
    // animationPlayState: isPaused ? 'paused' : 'running',
  };

  // attributes.onAnimationEnd = () => {
  //   closeToast();
  // };

  return (
    <Frente 
        className=" w-full px-3 py-1.5 justify-center !rounded-md ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1.5 !bg-[#548effdd]"
        aria-live="polite"
        aria-atomic="true"
      >
        {state.errors?.name && 
          <div className='min-h-[22px] flex items-center justify-between gap-3 w-full '>
            <div className='flex items-center gap-3  '>
              <IconError className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />
              <p className="text-sm text-[#fff] sm:text-[15px]">{state.errors.name}</p>
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
        }
        {state.errors?.email && 
          <div className=' min-h-[22px] flex items-center justify-between gap-3 w-full '>
            <div className='flex items-center gap-3  '>
              <IconError className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />
              <p className="text-sm text-[#fff] sm:text-[15px]">{state.errors.email}</p>
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
        }
         {state.message && 
          <div className=' min-h-[22px] flex items-center justify-between gap-3 w-full '>
            <div className='flex items-center gap-3  '>
              <IconError className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />
              <p className="text-sm text-[#fff] sm:text-[15px]">{state.message}</p>
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
        }
      </Frente>
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

function NotifyEmailVerify( { email }: { email: string | undefined } ) {

  return (
    <div
      className=" flex items-center w-[440px] mt-[358px] mx-auto shadow-[0_10px_20px_#dee9ff]  sm:mt-[364px]"
      aria-live="polite"
      aria-atomic="true"
    >
        <Frente className="w-full pl-3 py-1.5 mx-3 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effee] min-[480px]:mx-0">
          <div className='min-h-5 w-full flex items-stretch justify-between'
            >
            <div className='flex items-center gap-5'>
              <IconAviso className={`mb-auto h-[18px] w-[18px] fill-[#ffffffcc]`} />

              <p className="text-[15px] text-[#fff] sm:text-base [text-shadow:_1px_1px_#3d61ad]">Por favor, revisá tu correo electrónico <span className= "underline decoration-[#ffffffdd] underline-offset-[2px] mx-1 ">{email}</span> y enviá la verificación</p>
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
