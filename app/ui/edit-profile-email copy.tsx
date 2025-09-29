'use client';

import { useState, useEffect, useActionState, FormEvent, useRef } from 'react';
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import { usePathname, useSearchParams } from 'next/navigation';
import { nanoid } from "nanoid";

import { User } from '@/app/lib/definitions';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { createUser, StateUser, updateUserEmail, StateUserEmail, updateCommentEmail, StateUpdateCommentEmail, authenticate2, handleFormPedido, createVerificationToken, StateVerificationToken } from '@/app/lib/actions';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { ButtonB, ButtonA } from "@/app/ui/button";
import { Frente } from '@/app/ui/marcos';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));


export default function EditPerfilEmail( { user }: { user: User | undefined } ) {
  
  const [email, setEmail] = useState("");
  const [spin, setSpin] = useState(false);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const callbackUrl = searchParams.get('/realizar-consulta') || '/realizar-consulta';
  // const callbackUrl = searchParams.get(pathname) /* || '/realizar-consulta' */;
  // const callbackUrl = pathname;

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }
   const esEmailValido= isEmailValid(email)

  const token= nanoid()

  const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"

  const id= user?.email!

  const buttonRefPedido = useRef<HTMLButtonElement>(null);
  const handleClickButtonPedido= () => {
    if (buttonRefPedido.current) buttonRefPedido.current.click()
  };

  const buttonRefVerification = useRef<HTMLButtonElement>(null);
  const handleClickButtonVerification= () => {
    if (buttonRefVerification.current) buttonRefVerification.current.click()
  };

  const buttonRefxxxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxxxx= () => {
    if (buttonRefxxxx.current) buttonRefxxxx.current.click()
  }; // update comment email
  
  const buttonRefxxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxxx= () => {
    if (buttonRefxxx.current) buttonRefxxx.current.click()
  }; // update user email

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const buttonRefx = useRef<HTMLButtonElement>(null);
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  }; // create user

  const enviarConsultaxxxx= () => {
    setSpin(true)
    // setTimeout( () => handleClickButtonxxxx(), 200) // update comment email
    // setTimeout( () => handleClickButtonxxx(), 200) // update user email

    setTimeout( () => handleClickButtonx(), 200) // crear user 
    setTimeout( () => setSpin(false), 2000)
    
    console.log("Consulta creada")
  }

  const uploadToServer3 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // setSpin(true)
      enviarConsultaxxxx();
    } catch (error) {
      console.error(error);
    }
    // setSpin(false)
  };

  useEffect(() => {
     email && setEmail("")
  }, [])

  const initialStatexxxx: StateUpdateCommentEmail = { message: null, errors: {} };
  const updateCommentEmailWithId = updateCommentEmail.bind(null, id);
  const [estadoxxxx, formActionxxxx, isPendingxxxx] = useActionState(updateCommentEmailWithId, initialStatexxxx);

  const initialStatexxx: StateUserEmail = { message: null, errors: {} };
  const updateUserEmailWithId = updateUserEmail.bind(null, id);
  const [estadoxxx, formActionxxx, isPendingxxx] = useActionState(updateUserEmailWithId, initialStatexxx);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  const initialStatexx: StateVerificationToken  = { message: null, errors: {} };
  const [estadoxx, formActionxx, isPendingxx] = useActionState(createVerificationToken, initialStatexx);

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);



  // console.log("callbackUrl: ", pathname)
  // console.log("isEmailVisitor: ", isEmailVisitor)


  return (
    <>
      <div className="flex flex-col items-center justify-between gap-6 text-small-regular p-2 pb-3 ">
        <div className={`mt-2 w-full text-[#020b1dcc] text-base text-center px-4 rounded-md `}>
          { email ? email : !isEmailVisitor ? user?.email : <span className='text-[#020b1d77]'>e-mail</span> }
        </div>

        {/* email */}
        {/* <div className={`hidden relative mb-2 w-full`}>
          <InputCnp 
            className={`h-[30px] text-sm  ${email && "bg-[#ffffffdd]"} `}
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder= {user?.email_verified ?  "Actualizar e-mail" : isEmailVisitor ? "Cargar e-mail" : "Actualizar e-mail"  }
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }} >
            <div className={`absolute rounded-l-[4px] h-[30px] w-[32px] left-0 bg-[#548effcc] `}></div>
          </InputCnp>
          <IconEmail2 className="absolute w-[16px] left-[8px] top-[7px] " color="#ffffff"  />
        </div> */}

        {/* !isEmailVisitor && */ !user?.email_verified && estadoxxx?.message === "emailOk" ? (
          <div className="w-[284px] p-2 bg-[#d7e5d9] rounded-md ">{/* #d7e5d9 */}
            <div className={`w-full text-start text-[13px] text-[#020b1dcc] transition-[opacity] duration-300 `}>
              {/* <p className="sm:text-center">Recibí la <b>consulta</b>, te responderé a la mayor brevedad.</p> */}
              <p className={`my-2 sm:text-center`}>{/*  ${ user?.email_verified && "hidden"} */}
                Por favor, revisá el correo electrónico <span className= "font-medium underline decoration-[#020b1d81] underline-offset-2 mx-1 ">{user?.email}</span> y enviá la verificación.
              </p>
            </div>
          </div> 
        ) : (
          <div className={`relative mb-2 w-full`}>
            <InputCnp 
              className={`h-[30px] text-sm  ${email && "bg-[#ffffffdd]"} `}
              id="email"
              type="email"
              name="email"
              value={email}
              // placeholder= {!user?.email_verified ? "Cargar e-mail" : "Actualizar" }
              placeholder= {user?.email_verified ?  "Actualizar e-mail" : isEmailVisitor ? "Cargar e-mail" : "Actualizar e-mail"  }
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }} >
              <div className={`absolute rounded-l-[4px] h-[30px] w-[32px] left-0 bg-[#548effcc] `}></div>
            </InputCnp>
            <IconEmail2 className="absolute w-[16px] left-[8px] top-[7px] " color="#ffffff"  />
          </div>
        )}

        {/* Massages nombre */}
        <div
          className={` items-end relative space-x-8 ${!estadoxxx?.message || estadoxxx.message === "emailOk" ?  "hidden" : "flex"}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {estadoxxx?.message && (
            <>
              <ExclamationCircleIcon className="absolute top-[7px] h-5 w-5 text-red-500" />
              <p className="pt-4 text-sm text-red-500">{estadoxxx?.message}</p>
            </>
          )}
        </div>

        {/* Guardar cambios nombre */}
        <form onSubmit={ uploadToServer3 } className='w-full'>
          <div className="w-full flex items-center justify-end gap-4 text-sm">
            <ButtonA
              type="submit"
              className={`${ spin /* || isPendingxxx */  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#0c5cfe]  "}  relative overflow-hidden  h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:opacity-60 `}
              disabled={ !isEmailVisitor && estadoxxx?.message === "emailOk" || !esEmailValido}
              onClick={async () => {
                // setSpin(true);
                setTimeout(handleClickButtonAuth, 1000) 

                // user?.role === "member" && handleClickButtonVerification()
                // user?.role === "member" && handleClickButtonPedido()
                // estadoxxx?.message !== "emailOk" && location.reload()
                wait().then(() => {
                  estadoxxx?.message !== "emailOk" && location.reload()
                })
              }}
            >
              {/* {!user?.email_verified ? "VERIFICAR" : "Actualizar"} */}
              ACTUALIZAR
            </ButtonA>
          </div>
        </form>
      </div>

      {/*update comment email */}
      <form action={formActionxxxx}>
        <input
          type="hidden"
          name="email_id"
          value={ email }
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
          ref={buttonRefxxxx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>

      {/*update user email */}
      <form action={formActionxxx}>
        <input
          type="hidden"
          name="email"
          value={ email }
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
          ref={buttonRefxxx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>

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
        <input type="hidden" name="redirectTo" value={pathname} readOnly />
        <button
          type="submit" 
          ref={buttonRefAuth}
          className="hidden"
        >
          Continuar
        </button>
      </form>

      {/* Envio e-mail verificacion email */}
      <form action={handleFormPedido}>
        <input 
          type="hidden"
          name="to_name" 
          value={user?.name}
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
          value="/realizar-consulta"
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

      {/* crear verificationToken */}
      <form action={formActionxx}>
        <input
          type="hidden"
          id="identifier"
          name="identifier"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          id="token"
          name="token"
          value={token}
          readOnly
        />
        <input
          type="hidden"
          id="expires"
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
          value={ user?.name }
          readOnly
          />
        <input
          type="hidden"
          id="image"
          name="image"
          value={ user?.image ? user.image : "" }
          readOnly
        />
        <input type="hidden" name="pathname" value={pathname} readOnly />
        <button
          type="submit"
          ref={buttonRefx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>
    </>
  );
}

