"use client";

import { useSearchParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useActionState } from 'react';
import { nanoid } from "nanoid";

import { Frente, Fondo } from '@/app/ui/marcos';
import { authenticate3 } from '@/app/lib/actions';
import IconCheck from '../logosIconos/icon-check';


// export default function NotifyVerified() {

//   const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-20% before:via-white/40 before:via-50%  before:to-transparent before:to-80%';

//   const searchParams = useSearchParams();
//   const callbackUrl: string = '/dashboard/consultas' ;

//   const token= nanoid()

//   const [errorMessage, formActionAuth, isPendingAuth] = useActionState(
//     authenticate2,
//     undefined,
//   );

//   return (
//     <>
//     <div className={` mx-auto items-center justify-center shadow-[0_10px_20px_#020b1d33] `}>
//       <Frente className={`${ isPendingAuth  && `${shimmer2} animate-pulse2` } relative overflow-hidden transition-colors duration-150 text-[#011201d8] !bg-[#c2d6c6] hover:text-[#011201ee] hover:!bg-[#d8e7da]`}>
//         <form action={ formActionAuth } className=" w-max">
//           <input
//               id="email"
//               type="hidden"
//               name="email"
//               value={`${searchParams.get("email")}`}
//               readOnly
//           />
//           <input
//               id="password"
//               type="hidden"
//               name="password"
//               value= {token}
//               readOnly
//           />
//           <input type="hidden" name="redirectTo" value={callbackUrl} />

//           <button
//               type= "submit" 
//               className=" duration-150 px-8 py-6 rounded"
//               >
//               <div className='flex justify-center mb-2'><IconCheck color="#021d02bb" size="18" /></div>
//               <p className="text-[14px] sm:text-[16px] text-[#021d02cc] font-medium [font-variant-caps:_small-caps]"> Correo Electrónico Verificado</p>
//               <p className="text-[13px] sm:text-[15px]">Continuar <span className="text-sm ml-2">{">"}</span></p>
//           </button>
//         </form>
//       </Frente> 
//     </div>
//     </>
//   );
// }


export default function NotifyVerified() {

  const shimmer2 ='before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_cubic-bezier(0.42,_0,_0.58,_1)_infinite] before:bg-gradient-to-r before:from-transparent before:from-30% before:via-white/20 before:via-50%  before:to-transparent before:to-70%';
  
  const searchParams = useSearchParams();
  const callbackUrl: string = '/dashboard/tramites' ;

  const token= nanoid()

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(
      authenticate3,
      undefined,
    );

  return (
    <div
      className=" flex items-center w-[380px] mx-auto !shadow-[0_10px_20px_#39507f77]"
      aria-live="polite"
      aria-atomic="true"
    >
        <Frente 
          className={`${ isPendingAuth  && `${shimmer2} animate-pulse2` } relative overflow-hidden w-full mx-3 !rounded-md  ![box-shadow:_inset_0_1px_#ffffffaa,inset_0_-1px_#00000036] flex flex-col items-start gap-1 !bg-[#548eff] duration-200 hover:!bg-[#4881f3] active:!bg-[#548eff] min-[480px]:mx-0`}
          >
            
          <form action={ formActionAuth } className="w-full">
            <input
                id="email"
                type="hidden"
                name="email"
                value={`${searchParams.get("email")}`}
                readOnly
            />
            <input
                id="password"
                type="hidden"
                name="password"
                value= {token}
                readOnly
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />

            <button
                type= "submit" 
                className="w-full duration-150 p-5 rounded sm:p-3"
                >

                <IconCheck color="#ffffffcc" size="18" className='inline-flex  justify-center mr-2 mb-2 ml-3'/>
                <p className="text-[14px] sm:text-[16px] text-[#ffffffdd] mb-3 font-medium [font-variant-caps:_small-caps]  [text-shadow:_1px_1px_#3d61ad]"> Correo Electrónico Verificado</p>

                <div className='flex items-center justify-center'>
                  <p className="text-[#ffffffdd] text-[13px] sm:text-[15px]  [text-shadow:_1px_1px_#3d61ad]">Continuar</p>
                  <p className="text-[#ffffffdd] text-base font-semibold ml-2 mt-0.5 ">{">"}</p>
                </div>
            </button>
          </form>
        </Frente>
    </div>



    
  );
}
