'use client';

import {
  AtSymbolIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useActionState,  FormEvent, useEffect, HTMLAttributes } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast, Zoom, Flip, ToastContentProps } from 'react-toastify';

import { createUser, StateUser, authenticate4 } from '@/app/lib/actions';
import { Fondo, Frente } from '@/app/ui/marcos';
import { ButtonA } from '@/app/ui/button';
import { signIn } from 'next-auth/react';
import IconGoogle from '@/app/ui/logosIconos/icon-google';
import IconFlecha from '@/app/ui//logosIconos/icon-flecha';
// import LoginNotifyError from '@/app/ui/login-notify-error';
import IconError from '@/app/ui/logosIconos/icon-error';


const wait = () => new Promise((resolve) => setTimeout(resolve, 6000));

export default function LoginForm() {

  const [email, setEmail] = useState("");

  const router = useRouter()

  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-20% before:via-white/30 before:via-50%  before:to-transparent before:to-80%';

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate4, undefined, );

  const notify = () => {
    toast(LoginNotifyError, {
      autoClose: 6000,
      customProgressBar: true,
      closeButton: false,
      transition: Flip,
      // progress: 0.7,
      data: {
        message: `${errorMessage}`,
      },
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    });

    // const id = toast(LoginNotifyError, {
    //   progress: 0,
    //   customProgressBar: true,
    //   closeButton: false,
    //   data: {
    //     message: 'Controlled Progress Bar',
    //   },
    // });

    // // update the controlled progress bar
    // setTimeout(() => {
    //   toast.update(id, {
    //     progress: 0.5,
    //   });

    //   // one more time to close the toast
    //   setTimeout(() => {
    //     toast.done(id);
    //   }, 5000);
    // }, 1000);
  };

  useEffect(() => {
    // if (errorMessage ) {
    //    toast(LoginNotifyError /* errorMessage={errorMessage} */ , {
    //     customProgressBar: true,
    //     // hideProgressBar: true,
    //     autoClose: 8000,
    //     // progress: 0.5,
    //     closeButton: false,
    //     // position: "bottom-center",
    //     // transition: Flip,
    //     // pauseOnHover: true,
    //     // className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] ',
    //     // progressClassName: "fancy-progress",
    //     data: {
    //       message: `${errorMessage}` ,
    //     },
    //   });
    // }

    if (errorMessage) {
      notify()
    }
}, [errorMessage]);


  return (
    <>
      <h1 className={`mt-4 mb-3 text-center text-4xl`}>Acceso</h1>
      <form action={ formActionAuth }  className="" >
        <Fondo className=" px-4 py-6">
          <div className="flex flex-col ">
            <Frente className="flex h-10 !rounded-[3px] hover:bg-[#ffffffcc] hover:[box-shadow:_0_0_0_1px_#3767c847] ">
              <div
                // onClick={async () => {
                //   await signIn('google', {
                //     callbackUrl: '/dashboard',
                //   });
                // }}
                className="relative flex cursor-pointer place-items-center items-center justify-start px-10 duration-200  "
              >
                <IconGoogle className="absolute top-2.5 left-3 w-[18px]" />
                <div className="flex items-center text-[#020b1d88] text-[14px] ml-1.5">con google</div>
              </div>
            </Frente>

            <div className="flex w-full items-center gap-2 py-2 text-sm">
              <div className="h-px w-full bg-slate-300"></div>O
              <div className="h-px w-full bg-slate-300"></div>
            </div>

            <Frente className="!rounded-[4px]">
              <div className="relative">
                <input
                  className="!hover:bg-transparent rounded-[3px] peer block w-full border border-transparent bg-transparent py-0 duration-150 pl-[46px] text-sm h-10 outline-2 placeholder:text-[#020b1d88] !hover:bg-[#ffffff3d] hover:[box-shadow:_0_0_0_1px_#3767c847] focus:[box-shadow:_0_0_0_1px_#548eff] focus:bg-[#ffffffbb] focus:border-transparent focus:outline-1 focus:outline-[#548eff66] "
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="con email"
                  // autoComplete='off'
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }} 
                />
                <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[21px] w-[21px] stroke-2 -translate-y-1/2 text-[#548effcc]" />
              </div>
            </Frente>
          </div>
        </Fondo>
      
        <ButtonA
          className={`${( isPendingAuth)  && `${shimmer2} animate-pulse` } relative overflow-hidden  !h-9 w-[calc(100%_+_12px)] !mt-3 -ml-1.5 justify-center bg-[#071f50cc] text-base  text-[#ffffffcc] duration-150 hover:bg-[#071f50ee] hover:text-[#fff] active:!bg-[#071f50dd] disabled:hover:bg-[#071f50cc] disabled:hover:text-[#ffffffcc] disabled:!opacity-100 disabled:active:!bg-[#071f50cc]      `}
          type="submit"
          onClick={() => {
            setTimeout(() => setEmail(""), 1000) 
            wait().then(() => {
              // location.reload()
            })
          }}
          aria-disabled={isPendingAuth}
        >
          Continuar <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </ButtonA>
      </form>

      <div className='flex justify-end gap-2 mr-2 mt-2 text-[13px]'>
        <p className="text-[#020b1d88] ">No tenés acceso?</p>

        <Link
          href={'/register'}
          className="group flex items-center justify-center rounded-x "
        >
          <p className="text-[#3171edcc] font-medium duration-200 group-hover:text-[#3171ed]">
          Verificá tu email
          </p>
          <IconFlecha className="fill-[#3171ed99] ml-1 w-4 duration-200 group-hover:fill-[#3171ed]" />
        </Link> 
      </div>

      <ToastContainer autoClose={false} className="!static !w-full" />{/*  !transform-none */}
      {/* <Button onClick={notify}>Notify !</Button>
      <ToastContainer autoClose={false} /> */}
    </>
  );
}



function LoginNotifyError({
  closeToast,
  isPaused,
  toastProps,
  data,
}: ToastContentProps<{ message: string }>) {
  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  // handle controlled progress bar
  // controlled progress bar uses a transition
  if (typeof toastProps.progress === 'number') {
    attributes.style = {
      transition: 'all .1s linear',
      strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
    };

    if (toastProps.progress >= 1) {
      attributes.onTransitionEnd = () => {
        closeToast();
      };
    }
  } else {
    // normal autoclose uses an animation
    // animation inside index.css
    attributes.className = 'animate';
    attributes.style = {
      animationDuration: `${toastProps.autoClose}ms`,
      animationPlayState: isPaused ? 'paused' : 'running',
    };

    attributes.onAnimationEnd = () => {
      closeToast();
    };
  }

  return (
    <div
      className=" flex items-center w-full"
      aria-live="polite"
      aria-atomic="true"
    >
      {data.message && (
        <Frente className="w-full pl-3 pr-3 py-1.5 !rounded-md  ![box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000046] flex flex-col items-start gap-1 !bg-[#548effdd]">
          <div className='min-h-5 w-full flex items-center justify-between gap-3'>
            <div className='flex items-center gap-3 '>
              <IconError className={`h-[17px] w-[17px] fill-[#ffffffcc]`} />

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
                stroke="#ffffffbe"
                stroke-width="26px"
                stroke-linecap="round"
                fill="transparent"
                stroke-dasharray={`${strokeDash}px`}
                {...attributes}
              />
            </svg>

            {/* <svg
              width="40"
              height="40"
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
                stroke="#76e5b1"
                stroke-width="16px"
                stroke-linecap="round"
                fill="transparent"
                stroke-dasharray={`${strokeDash}px`}
                {...attributes}
              />
            </svg> */}
          </div> 
        </Frente>
      )}
    </div>
  );



  // return (
  //   <div className="flex justify-between items-center w-full">
  //     <p>{data.message}</p>
  //     <svg
  //       width="40"
  //       height="40"
  //       viewBox="-25 -25 250 250"
  //       version="1.1"
  //       xmlns="http://www.w3.org/2000/svg"
  //       className="-rotate-90"
  //     >
  //       <circle
  //         r="90"
  //         cx="100"
  //         cy="100"
  //         fill="transparent"
  //         stroke="#e0e0e0"
  //         stroke-width="6"
  //         stroke-dasharray={`${strokeDash}px`}
  //         stroke-dashoffset="0"
  //       />
  //       <circle
  //         r="90"
  //         cx="100"
  //         cy="100"
  //         stroke="#76e5b1"
  //         stroke-width="16px"
  //         stroke-linecap="round"
  //         fill="transparent"
  //         stroke-dasharray={`${strokeDash}px`}
  //         {...attributes}
  //       />
  //     </svg>
  //   </div>
  // );
}



// function Button(props: HTMLAttributes<HTMLButtonElement>) {
//   return (
//     <button
//       type="button"
//       className="disabled:opacity-50
//   disabled:cursor-not-allowed 
//   inline-flex 
//   text-base 
//   text-gray-100 
//   shadow-md 
//   items-center 
//   justify-center
//   whitespace-nowrap 
//   rounded-md 
//   transition-all 
//   ring-blue-400 
//   ring-offset-blue-400 
//   focus-visible:outline-none
//   focus-visible:ring-2 
//   focus-visible:ring-offset-2 
//   focus:outline-none
//   focus:ring-2 
//   focus:ring-offset-2 
//   active:scale-[.95] 
//   active:shadow-sm bg-zinc-950 hover:bg-zinc-950/55 h-9 px-4 py-2  relative
//   after:absolute
//   after:-inset-0.5
//   after:-z-10 
//   after:animate-pulse 
//   after:rounded-lg
//   after:bg-gradient-to-r 
//   after:from-pink-600
//   after:to-violet-600
//   after:blur-sm"
//       {...props}
//     />
//   );
// }

