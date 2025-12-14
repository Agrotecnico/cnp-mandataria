'use client';

import { useState, useEffect } from 'react';
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import clsx from 'clsx';

import { Comment } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { Frente } from '@/app/ui/marcos';
import IconConsultaRight from "@/app/ui/logosIconos/icon-consulta-right"
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import distanceToNow from '@/app/lib/dateRelative';


export default function TableCommentMember( { 
  comment,
}: { 
  comment: Comment;
} ) {
  
  const [successState, setSuccessState] = useState(false)

  const { state, close, toggle } = useToggleState()

  const clearState = () => {
    setSuccessState(false)
  }

  const handleToggle = () => {
    clearState()
    setTimeout(() => toggle(), 100)
  }

  useEffect(() => {
    if (successState) {
      close()
    }
  }, [successState, close])


  return (
    <Frente  className="p-2 text-sm sm:p-4" >
      <div className="flex flex-col items-start " >
        <div className="w-full items-start flex gap-4 justify-between">
          <div className="relative">
            <IconConsultaRight className="opacity-80 w-8 "/>
            <span className="text-white absolute -top-0.5 left-[20px] text-[11px]  ">
              ?
            </span>
          </div>

          <div className="w-full mt-12 -ml-7 -mr-20 sm:px-1 sm:m-0 ">
            <div className="text-[#39507f] w-full mb-2 font-medium text-[13.5px] sm:text-[14.5px] ">
              COMMENTARIO
              <span className={`ml-1 text-[#020b1d77] `}>
                realizado
                <span className={` text-[13px] bg-[#ffffff] ml-1 px-1.5 py-0.5 rounded-lg `}>
                  {distanceToNow(new Date(comment.created_at))}
                </span> 
              </span>
            </div>
          </div>

          <Button
            className="relative text-[#020b1daa] h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#548eff66] active:!bg-[#eee]"
            onClick={() => { handleToggle()}}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "Cerrar" :  <div><span className="text-[12px] uppercase">Ver</span></div> }
          </Button>
        </div>
      </div>
      <Disclosure>
        <DisclosurePanel
          static
          className={clsx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100": state,
              "max-h-0 opacity-0": !state,
            }
          )}
        >
          <div className={`flex flex-col gap-4 mb-4 text-sm cursor-default transition-[visibility] duration-300 ease-in-out ${!state && "invisible"}`}>
            <div className="mt-4 text-[14.5px]">

              <p className="p-1 border border-[#39507f22] bg-[#ffffffe0] rounded-[2px] sm:p-4">{ comment.comment } </p>

            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </Frente>
  );
}
