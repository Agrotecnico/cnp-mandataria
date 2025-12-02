"use client";

import 'react-toastify/dist/ReactToastify.css';
import { HTMLAttributes } from 'react';
import { ToastContainer, ToastContentProps, toast } from 'react-toastify';

import { Frente, Fondo } from '@/app/ui/marcos';
import IconError from '@/app/ui/logosIconos/icon-error';


export default function LoginNotifyError(
  {
  closeToast,
  isPaused,
  toastProps,
  data,
  }: ToastContentProps<{ message: string }>)/* ({ 
    errorMessage,
  }: { 
    errorMessage: string | undefined
  }) */ {

  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {data.message && (
        <Frente className="w-full pl-3 pr-3 py-1.5 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effdd]">{/* !bg-[#ebcccc88] */}
          <div className='min-h-6 w-full flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 '>
              <IconError className={`h-[17px] w-[17px] fill-[#ffffffcc]`} />{/* fill-[#43070799] */}

              <p className="text-sm text-[#fff] sm:text-[15px]">{data.message}</p>{/* text-[#430707ee] */}
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
                stroke="#d5dff3"
                stroke-width="16px"
                stroke-linecap="round"
                fill="transparent"
                stroke-dasharray={`${strokeDash}px`}
                {...attributes}
              />
            </svg>
          </div> 
        </Frente>
      )}
    </div>
  );
}


