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

import { Button } from '@/app/ui/button';
// import { authenticate2,   createUser, StateUser, } from '@/app/lib/actions';
import { createTramite, StateCreateTramite, createVerificationToken, StateVerificationToken, updateUserEmail, StateUserEmail, updateCommentEmail, StateUpdateCommentEmail, createUser, StateUser, authenticate, authenticate2, handleFormPedido  } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { User } from "@/app/lib/definitions";
import { ButtonA } from '@/app/ui/button';
import { set } from 'zod';
import EmailVerified from '@/app/ui/email-verified';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));


export default function LoginForm({ user }: { user: User | undefined}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [spin, setSpin] = useState(false);

  const pathname = usePathname()

  const token= nanoid()

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/login';
  const isVerified = searchParams.get('verified');
  // const isVerified:string = "truexxx";

  const buttonRefVerification = useRef<HTMLButtonElement>(null);
  const handleClickButtonVerification= () => {
    if (buttonRefVerification.current) buttonRefVerification.current.click()
  };

  const buttonRefPedido = useRef<HTMLButtonElement>(null);
  const handleClickButtonPedido= () => {
    if (buttonRefPedido.current) buttonRefPedido.current.click()
  };

  const buttonRefx = useRef<HTMLButtonElement>(null); //create user
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  };

  // const buttonRefAuth = useRef<HTMLButtonElement>(null); // authentication
  // const handleClickButtonAuth= () => {
  //   if (buttonRefAuth.current) buttonRefAuth.current.click()
  // };

  const crearUsuario= () => {
    setTimeout(() => handleClickButtonx(), 200) //create user
    // setTimeout(() => handleClickButtonAuth(), 200)
    // setTimeout(() => setSpin(true), 200)
    // setTimeout(() => setSpin(false), 1000)
    console.log("User created")
  }

  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      crearUsuario();

    } catch (error) {
      console.error(error);
    }

    setSpin(false)
  };

  // useEffect(() => {
  //     setEmail( "");
  //     setName("");
  //   }, [ ])

  // const [errorMessage, formAction, isPending] = useActionState( authenticate2, undefined,);

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);

  // const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  const initialStatexx: StateVerificationToken  = { message: null, errors: {} };
  const [estadoxx, formActionxx, isPendingxx] = useActionState(createVerificationToken, initialStatexx);

  // console.log("token: ", token)

  return (
    <>
      <h1 className={` mb-3 text-center text-4xl`}>Acceso</h1>

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
                // autoComplete="off"
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
        </div>
      </Fondo>
      
      {/* crear user */}
      <form /* action={formActionx} */ onSubmit={ uploadToServer1 } className='!mt-3'>
        <ButtonA
          className={`${spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden !h-10 w-[calc(100%_-_32px)] mx-4 justify-center bg-[#071f50cc] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50ee] hover:text-[#fff] active:!bg-[#071f50bb] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc] `}/*  bg-[#071f50cc] */
          type="submit"
          disabled={ name && email && isEmailValid(`${email}`) ? false : true }
          onClick={() => {
            setSpin(true);
            /* user?.role === "member" && */ handleClickButtonVerification()
            /* user?.role === "member" && */ handleClickButtonPedido()
            // handleClickButtonAuth()
            wait().then(() =>{ 
              setTimeout(() => setEmail( ""), 200)
              setTimeout(() => setName(""), 200)
              // handleClickButtonAuth()
            });
            
            // setTimeout(() => setSpin(false), 3000)
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

      {!estadox && (
        <Frente className="!p-2 !bg-[#d8ebdb] ">
          <div className={`w-full text-sm text-[#011201d8]`}>
            <p className={`text-center`}>
              Por favor, revisá el correo electrónico <span className= "underline decoration-[#071d02] underline-offset-2 mx-1 ">{email}user@gmail.com</span> y enviá la verificación.
            </p>
          </div>
        </Frente> 
      )} 

      { isVerified === "true" && (
        <EmailVerified />
      )}
      

      

      {/* crear user */}
      <form action={formActionx}>
        <input
          type="hidden"
          name="email"
          value={email}
          readOnly
          />
        <input
          type="hidden"
          name="name"
          value={ name }
          readOnly
          />
        <input
          type="hidden"
          name="image"
          value={ "" }
          readOnly
        />
        {/* <input type="hidden" name="pathname" value={callbackUrl} readOnly /> */}
        <input type="hidden" name="pathname" value={pathname} readOnly />
        <button
          type="submit"
          ref={buttonRefx}
          className='hidden'
        >
          Enviar
        </button>
      </form>

      {/* crear verificationToken */}
      <form action={formActionxx}>
        <input
          type="hidden"
          name="identifier"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          name="token"
          value={token}
          readOnly
        />
        <input
          type="hidden"
          name="expires"
          value={`${new Date(Date.now() + 1000 * 60 * 60 * 24)}`}
          readOnly
        />
        <input
          type="hidden"
          name="pathname"
          value= {pathname}
          readOnly
        />
        <button
          type="submit"
          ref={buttonRefVerification }
          className= "hidden " 
        >
          Crear VerificationToken
        </button>
      </form>

      {/* Envio e-mail verificacion email */}
      <form action={handleFormPedido}>
        <input 
          type="hidden"
          name="to_name" 
          value={name}
          readOnly
        />
        <input
          type="hidden"
          name="to_email" 
          value= "agrotecnicog@gmail.com"
          // value= {email}
          readOnly
        />
        <input
          type="hidden"
          name="content" 
          value={pathname}
          readOnly
        />
        <input
          type="hidden"
          id="token"
          name="token"
          value={token}
          readOnly
        />
        <button 
          type="submit" 
          ref={buttonRefPedido}
          className="hidden">
          Enviar
        </button>
      </form>

      




      {/* authentication */}
      {/* <form action={formActionAuth} className="">
        <input
          type="hidden"
          name="email"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          name="name"
          value={name}
          readOnly
        />
        <input
          type="hidden"
          name="password"
          value= "72cf0550-3f64-474d-b150-aa813c6b4b67"
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
      </form> */}
    </>
  );
}
