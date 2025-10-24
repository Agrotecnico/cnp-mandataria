"use client";

import Link from 'next/link';
import { auth } from 'auth';
import {  usePathname, useSearchParams, redirect  } from 'next/navigation';
import { Bounce, toast, ToastContainer, ToastContentProps, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Frente, Fondo } from '@/app/ui/marcos';


export default /* async */ function NotifyVerified({ closeToast }: ToastContentProps) {
  // const session = await auth();

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified') === 'true' ? true : false;

  // const isVerified = true
  // const user = "admin"
  return (
    <>
    <div className={`mx-auto items-center justify-center `}>
      <Frente className=" transition-colors duration-150 text-[#011201d8] !bg-[#d8ebdb] hover:text-[#011201ee] hover:!bg-[#c9dfcc]">
        {/* <Link href= {isVerified === true && session?.user.role === "admin" ? "/dashboard" : "#"} ></Link> */}
          <button
            onClick={() => {
              // closeToast("reply")
              isVerified === true /* && session?.user.role  === "admin"*/ ? redirect('/dashboard') : closeToast() 
              // wait().then(() => {
              //   closeToast()
              // })
              
            }}
            className=" duration-150 px-8 py-6 rounded"
          >
            <p className="text-[15px]">Correo electrónico verificado</p>
            <p className="text-sm">Continuar <span className="text-sm ml-2">{">"}</span></p>
          </button>
        
      </Frente> 
    </div>
    </>
  );
}
