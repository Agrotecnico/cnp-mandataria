'use client';

import { useState, useEffect, useActionState, FormEvent, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { User } from '@/app/lib/definitions';
import { createUser, StateUser, authenticate2 } from '@/app/lib/actions';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { ButtonA } from "@/app/ui/button";
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"

const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

export default function EditPerfilEmail( { user, setIsModalOpen3}: { user: User | undefined; setIsModalOpen3: React.Dispatch<React.SetStateAction<boolean>>
 } ) {
  
  const [email, setEmail] = useState("");
  const [spin, setSpin] = useState(false);

  const pathname = usePathname();

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }
   const esEmailValido= isEmailValid(email)

  // const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const buttonRefx = useRef<HTMLButtonElement>(null); // create user
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  };

  const enviarConsultaxxxx= () => {
    setSpin(true)
    setTimeout( () => handleClickButtonx(), 200) // create user 
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
      <div className="flex flex-col items-center justify-between gap-9 text-small-regular p-2 pb-3 ">
        <div className={`mt-2 w-full text-[#020b1dcc] text-base text-center px-4 rounded-md `}>
          { email ? email : user?.email ? user?.email : <span className='text-[#020b1d77]'>e-mail</span> }
        </div>

        <div className={`relative mb-2 w-full`}>
          <InputCnp 
            className={`h-7 ${email && "bg-[#ffffffdd]"} hover:[box-shadow:_0px_0px_0px_1px_#548eff44] `}
            id="email"
            type="email"
            name="email"
            value={email}
            placeholder= "Actualizar e-mail"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }} >
            <div className={`absolute rounded-l-[4px] h-7 w-[32px] left-0 bg-[#548effcc] `}></div>
          </InputCnp>
          <IconEmail2 className="absolute w-[16px] left-[8px] top-[6px] " color="#ffffff"  />
        </div>

        {/* Guardar cambios email */}
        <form onSubmit={ uploadToServer3 } className='w-full'>
          <div className="w-full flex items-center justify-end gap-4 text-sm">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen3(false)
                wait().then(() => {
                  setEmail("")
                })
              }}
              className="h-[30px] w-[74px] opacity-70 bg-[#ff0000] text-[#ffffff] bottom-3 text-[13px]  duration-150 px-2 rounded-md hover:opacity-100 active:opacity-70 "
            >
              Cancelar
            </button>

            <ButtonA
              type="submit"
              className={`${ spin  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#0c5cfe]  "}  relative overflow-hidden  h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:hover:opacity-60 `}
              disabled={ !esEmailValido}
              onClick={async () => {
                setTimeout(handleClickButtonAuth, 1000) 
                wait().then(() => {
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
          defaultValue={email}
          readOnly
        />
        <input
          type="hidden"
          name="password"
          defaultValue= "72cf0550-3f64-474d-b150-aa813c6b4b67"
          readOnly
        />
        <input type="hidden" name="redirectTo" defaultValue={pathname} readOnly />
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
          defaultValue={email}
          readOnly
          />
        <input
          type="hidden"
          name="name"
          defaultValue={ user?.name }
          readOnly
          />
        <input
          type="hidden"
          name="image"
          defaultValue={ user?.image ? user.image : "" }
          readOnly
        />
        <input type="hidden" name="pathname" defaultValue={pathname} readOnly />
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

