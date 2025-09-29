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


const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));


export default function EditPerfilEmail( { user }: { user: User | undefined } ) {
  
  const [email, setEmail] = useState("");
  const [spin, setSpin] = useState(false);

  const pathname = usePathname();

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }
   const esEmailValido= isEmailValid(email)

  // const token= nanoid()

  // const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"

  // const id= user?.email!

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
    setTimeout( () => handleClickButtonx(), 200) // create user 
    // setTimeout( () => setSpin(false), 2000)
  }

  const uploadToServer3 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      enviarConsultaxxxx();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
     email && setEmail("")
  }, [])

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate2, undefined, );

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);


  return (
    <>
      <div className="flex flex-col items-center justify-between gap-6 text-small-regular p-2 pb-3 ">
        <div className={`mt-2 w-full text-[#020b1dcc] text-base text-center px-4 rounded-md `}>
          { email ? email : /* !isEmailVisitor */ user?.email ? user?.email : <span className='text-[#020b1d77]'>e-mail</span> }
        </div>

        <div className={`relative mb-2 w-full`}>
          <InputCnp 
            className={`h-[30px] text-sm  ${email && "bg-[#ffffffdd]"} `}
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder= "Actualizar e-mail"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }} >
            <div className={`absolute rounded-l-[4px] h-[30px] w-[32px] left-0 bg-[#548effcc] `}></div>
          </InputCnp>
          <IconEmail2 className="absolute w-[16px] left-[8px] top-[7px] " color="#ffffff"  />
        </div>

        {/* Guardar cambios nombre */}
        <form onSubmit={ uploadToServer3 } className='w-full'>
          <div className="w-full flex items-center justify-end gap-4 text-sm">
            <ButtonA
              type="submit"
              className={`${ spin  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#0c5cfe]  "}  relative overflow-hidden  h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:opacity-60 `}
              disabled={ /* !isEmailVisitor  && */ !esEmailValido}
              onClick={async () => {
                setTimeout(handleClickButtonAuth, 1000) 
                wait().then(() => {
                  /* estadoxxx?.message !== "emailOk" &&  location.reload()*/
                  location.reload()
                  setSpin(false)
                })
              }}
            >
              ACTUALIZAR
            </ButtonA>
          </div>
        </form>
      </div>

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

