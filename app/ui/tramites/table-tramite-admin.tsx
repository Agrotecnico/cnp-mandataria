"use client"

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { PencilIcon } from '@heroicons/react/24/outline';

import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { UpdateTramite } from '@/app/ui/tramites/buttons';
import DeleteTramite from '@/app/ui/tramites/delete-tramite';
import Image from 'next/image'
import distanceToNow from '@/app/lib/dateRelative';
import { Button } from '@/app/ui/button';
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { TramitesTable } from "@/app/lib/definitions";
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import Link from 'next/link';



export default function TableTramiteAdmin({
  AllTramite,
}: {
  AllTramite: TramitesTable
}) {

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
    <div>
      <div className="flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden rounded-md">
            <div className="">
              <div
                className="flex flex-col gap-3 mb-2 w-full text-sm rounded-lg p-3 bg-[#ffffff94] [box-shadow:inset_0_1px_#ffffff,inset_0_-1px_#0000002e] sm:p-4"
                >
                <div className="w-full items-center flex gap-3 justify-between sm:items-center sm:mb-0">
                  <div className="flex flex-col items-start gap-3 w-full ">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <div className="" data-testid="image-container">
                        { AllTramite.image ? (
                            <Image
                              src= {AllTramite.image}
                              width={20}
                              height={20}
                              className="w-11 max-w-2xl rounded-full " alt="avatar user">
                              
                            </Image>
                          ) : (
                            <div className="flex w-12 h-12 text-2xl items-center justify-center rounded-full bg-[#020b1d11] text-[#666] ">
                              {AllTramite?.email_id?.substring(0, 1).toUpperCase()}
                            </div>
                          )} 
                      </div>

                      <div className="flex flex-col justify-center items-start ">
                        <h2 className="text-md font-semibold m-0" data-testid="username-test">
                          {AllTramite?.name}
                        </h2>
                        <div className="flex text-[13px]">
                          <p className="text-[#020b1daa] ">{AllTramite?.email_id}</p>
                          {!AllTramite?.email_verified && 
                          <span className='ml-2 text-red-700'>no verificado</span>
                          }
                        </div>
                      </div>
                    </div>
        
                    <div className="flex items-center flex-nowrap gap-2 leading-tight">
                      <img 
                          src= "/dnrpa.png" 
                          alt="icono trámites" 
                          width={26} 
                          height={"auto"}
                          className="opacity-50 mt-1 mb-auto w-3 sm:w-[14px] md:mt-0.5" 
                        />
        
                      <div className="flex flex-wrap gap-3 items-center">
                        <h1 className=" text-start text-[#39507fcc] font-semibold leading-tight tracking-tighter text-base sm:text-lg sm:text-[22px] md:leading-none ">
                          {AllTramite.tramite}
                        </h1>
        
                        <div className={`flex gap-[1px] w-28 h-4 bg-[#ffffff] rounded-lg ${state && "hidden"}`}>
                          <div className="flex items-center justify-center text-[10px] text-white text-center w-7 bg-[#39507f] rounded-l-lg ">
                            1
                          </div>
                          <div className={`flex items-center justify-center text-[10px] text-center w-7  ${AllTramite.estado === "presupuestado" || AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado"  ? "bg-[#39507f] text-white" : "bg-white text-[#020b1dcc]" } `}>
                            2
                          </div>
                          <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? "bg-[#39507f] text-white" : "bg-white text-[#020b1dcc]" } `}>
                            3
                          </div>
                          <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ AllTramite.estado === "cancelado" || AllTramite.estado === "terminado"  ? "bg-[#39507f] text-white" : "bg-white text-[#020b1dcc]" } rounded-r-lg `}>
                            4
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        
                  <Button
                    className="relative mb-auto h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#548eff66] active:!bg-[#eee]"
                    onClick={() => { handleToggle()}}
                    data-testid="edit-button"
                    data-active={state}
                  >
                    {state ? "Cerrar" :  <div><span className="text-[12px] uppercase">Ver</span></div> }
                  </Button>
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
                    <div className={` border-b border-[#020b1d14] ${state && "mt-4 mb-1"}`}>
                      { (AllTramite.estado === "presupuestado" ||  AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado") && 
                      <p className={`text-[#39507f] my-0 text-[15px]`}>
                        Presupuesto <span className="ml-2 font-medium">{formatCurrency(Number(AllTramite.presupuesto))}</span>
                      </p>}
                    </div>
                    <div className="flex flex-col w-full text-[#020b1dcc] mb-4 py-2 gap-[1px] ">
                      <div className={`flex items items-stretch gap-1.5 min-h-6`}>
                        <div className="flex items-center justify-center text-[11px] w-[18px] px-[5px] text-[#ffffff] bg-[#39507f] rounded-t-lg ">1</div>
                        <div className={`flex items-center flex-wrap`}>
                          Presupuesto pedido
                          <div className={`text-[13px] py-0.5 px-1 ${AllTramite.estado === "presupuestar" && "hidden"} `} >
                            el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(AllTramite.created_at!)}</span>
                          </div>
                          <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg text-[#020b1d] bg-[#ffffff] ${AllTramite.estado !== "presupuestar"  && "hidden"}`}>
                            {distanceToNow(new Date(AllTramite.created_at!))} 
                          </div> 
                        </div>
                      </div>
          
                      <div className={`flex items-stretch gap-1.5 min-h-6`}>
                        <div className={`flex items-center justify-center text-[11px] w-[18px] px-[5px] ${AllTramite.estado === "presupuestar" ? "text-[#ffffff] bg-[#548eff]" : "text-[#ffffff] bg-[#39507f]"}`}>2</div>
                        { AllTramite.estado === "presupuestado" || AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? (
                        <div className={`flex items-center flex-wrap`}>
                          Presupuestado
                          <div className={`text-[13px] py-0.5 px-1 ${AllTramite.estado === "presupuestado" && "hidden"} `} >
                              el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(AllTramite.budgeted_at!)}</span>
                          </div>
                          <div className={`text-[13px] py-0.5 px-1.5 ml-1 mr-2 rounded-lg text-[#020b1d] bg-[#ffffff] ${AllTramite.estado !== "presupuestado"  && "hidden"}`}>
                            {distanceToNow(new Date(AllTramite.budgeted_at!))} 
                          </div> 
                        </div>
                        ) : (
                          <div className="flex items-center">
                            <div>Calcular y enviar el presupuesto</div>
                            <PencilIcon className="ml-2 w-[16px]" />
                          </div>
                        ) }
                      </div>
          
                      <div className={`flex items-stretch gap-1.5 min-h-6`}>
                        <div className={`flex items-center justify-center text-[11px] w-[18px] px-[5px] ${AllTramite.estado === "presupuestado" ? "text-[#ffffff] bg-[#548eff]" : AllTramite.estado === "presupuestar" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507f]"}`}>
                          3
                        </div>
                        {AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? (
                          <div className={`flex items-center flex-wrap`}>
                            Cobrado 
                            <div className={`text-[13px] py-0.5 px-1 ${AllTramite.estado === "iniciado" && "hidden"} `} >
                              el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(AllTramite.budgeted_at!)}</span>
                            </div>
                            <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg text-[#020b1d] bg-[#ffffff] ${AllTramite.estado !== "iniciado"  && "hidden"}`}>
                              {distanceToNow(new Date(AllTramite.budgeted_at!))} 
                            </div> 
                          </div>
                          ) : (
                            <div className="flex items-center">
                              <div className={`mr-2 ${AllTramite.estado === "presupuestar" ? "opacity-45" : "opacity-100"} `}>Chequear el pago</div>
                              <PencilIcon className={`w-[16px] ${AllTramite.estado === "presupuestar" && "hidden"}`} />
                            </div>
                          )}
                      </div>
          
                      <div className={`flex items-stretch gap-1.5 min-h-6`}>
                        <div className={`flex items-center justify-center text-[11px] w-[18px] px-[5px] rounded-b-lg ${AllTramite.estado === "iniciado" ? "text-[#ffffff] bg-[#548eff]" : AllTramite.estado === "presupuestar" ||  AllTramite.estado === "presupuestado" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507f]" }`}>4</div>
                        {AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? (
                          <div className={``}>
                            {AllTramite.estado === "cancelado" ? "Cancelado" : AllTramite.estado === "terminado" && "Terminado" } el
                            <span  className="text-[13px] py-0.5 px-1.5 mx-1 rounded-lg" >
                              {AllTramite.estado === "cancelado" ? formatDateToLocal(AllTramite.canceled_at!) : formatDateToLocal(AllTramite.finished_at!)}
                            </span>  
                            <span className="text-[13px] py-0.5 px-1.5 rounded-lg bg-[#ffffff]">
                              {AllTramite.estado === "cancelado" ? distanceToNow(new Date(AllTramite.canceled_at!)) : distanceToNow(new Date(AllTramite.finished_at!))}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div className={`${AllTramite.estado === "presupuestar" ||  AllTramite.estado === "presupuestado" ? "opacity-45" : "opacity-100"} `}>Realizar el trámite</div>
                            <PencilIcon className={`ml-2 w-[16px] ${AllTramite.estado === "presupuestar" || AllTramite.estado === "presupuestado" ? "hidden" : "block"}`} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end items-end">
                      <UpdateTramite id={AllTramite.id} />
                      <DeleteTramite id={AllTramite.id} />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
