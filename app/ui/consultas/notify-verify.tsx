"use client";

import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'next/navigation';

import { Frente, Fondo } from '@/app/ui/marcos';
import { User } from '@/app/lib/definitions';
import IconEnvioEmail from '@/app/ui/logosIconos/icon-envio-email';
import IconCheck from '@/app/ui/logosIconos/icon-check';


export default function NotifyVerify({ 
  user,
  isEmailVisitor,
  email,
  consulta
}: { 
  user: User | undefined 
  isEmailVisitor?: boolean
  email: string
  consulta:  string 
}) {

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified') === "true"

  return (
    <>
     { consulta  ? (
        <Frente className=" w-full !bg-[#548effe2] ">
          <div className=" flex items-start gap-3 pl-4 pb-1.5 pt-2 pr-7 text-sm text-[#ffffff] sm-gap-4 sm:text-[15px] sm:pr-2 sm:gap-1.5">
            <div>
              <IconCheck color="#ffffffcc" className=" w-[14px] mt-0.5 mb-auto sm:w-4" />
            </div>
            
            <div className="flex flex-col ">
              <p className={` w-full text-start gap-1.5 [text-shadow:_1px_1px_#3d61ad] `}>
                Recibí la consulta. Te enviaré la respuesta lo más pronto posible.
              </p>

              <p className={` ${ user?.email_verified && "hidden"} w-full text-start gap-1.5 [text-shadow:_1px_1px_#3d61ad] `}>
                Por favor, revisá tu correo electrónico <span className= "underline decoration-[#ffffffdd] underline-offset-[2px] mx-1 ">{user?.email! && user.email}</span> y enviá la verificación.
              </p>
            </div>
          </div>
        </Frente> 
      ) : (
        <Frente className={` !bg-[#548effe2] w-full ${ isVerified && "hidden"}`}>
          <div className=" flex items-start gap-4 pl-4 pb-[5px] pt-[7px] pr-7  sm:pr-7 sm:gap-5">
            <IconEnvioEmail fill="#ffffff88" filla="#ffffffdd" className=" w-7 mt-1 mb-auto sm:w-8" />
            <p className={` w-full text-start gap-1.5 text-sm text-[#ffffff] sm:text-[15px] [text-shadow:_1px_1px_#3d61ad] `}>
              Enviaré la respuesta a tu correo electrónico <span className= "underline decoration-[#ffffffdd] underline-offset-[3] mx-1 ">{isEmailVisitor ? email : user?.email ? user.email : email}</span>
            </p>
          </div>
        </Frente>
      )}
    </>
  );
}


