"use client";

import 'react-toastify/dist/ReactToastify.css';

import { Frente, Fondo } from '@/app/ui/marcos';
import IconError from '@/app/ui/logosIconos/icon-error';
import { createUserAccount, StateUserAccount } from '@/app/lib/actions';


export default function LoginNotifyError({ 
  state,
}: { 
  state: StateUserAccount
}) {

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* {state.errors !== undefined && state.message !== null && ( */}
        <div className="w-full flex items-center shadow-[0px_4px_12px_#edd1d170]">
          <Frente className="min-h-9 w-full text-[13px] px-3 py-2 !rounded-md !bg-[#ebccccb6] flex flex-col items-start gap-1 ">
            {state.errors?.name && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{state.errors?.name}</p>
            </div> }

            {state.errors?.email && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{state.errors?.email}</p>
            </div> }

            {state.errors?.password && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{state.errors?.password}</p>
            </div> }

            {state.message && 
            <div className='flex items-start gap-3'>
              <IconError className={`h-[14px] w-[14px] mt-0.5 fill-[#430707bb]`} />
              <p className=" text-[#430707ee]">{state.message}</p>
            </div> }
          </Frente>
        </div>
      {/* )} */}
    </div>

    // <div
    //   className=" flex items-center w-full"
    //   aria-live="polite"
    //   aria-atomic="true"
    // >
    //   {state && (
    //     <Frente className="min-h-9 w-full px-3 py-2 !rounded-md !bg-[#ebcccc88] flex flex-col items-start gap-1 ">
    //       <div className='flex items-center gap-3'>
    //         <IconError className={`h-[14px] w-[14px] fill-[#43070799]`} />
    //         <p className="text-sm text-[#430707ee]">{state.errors?.image}</p>
    //       </div> 
    //     </Frente>
    //   )}
    // </div>
  );
}


