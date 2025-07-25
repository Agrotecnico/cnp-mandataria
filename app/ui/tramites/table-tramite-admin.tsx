"use client"

import { useState, useEffect } from 'react';
import clsx from 'clsx';

import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { UpdateTramite } from '@/app/ui/tramites/buttons';
import DeleteTramite from '@/app/ui/tramites/delete-tramite';
import Image from 'next/image'
import distanceToNow from '@/app/lib/dateRelative';
import { Button } from '@/app/ui/button';
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { TramitesTable } from "@/app/lib/definitions";
import { Disclosure, DisclosurePanel } from '@headlessui/react'



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
                  className="flex flex-col gap-3 mb-2 w-full text-sm rounded-lg p-4 bg-[#ffffff94] [box-shadow:inset_0_1px_#ffffff,inset_0_-1px_#0000002e] "
                  >
                  <div className="w-full items-center flex gap-3 justify-between sm:items-center sm:mb-0">
                    <div className="flex flex-col items-start gap-3 w-full ">
                      <div className="flex flex-wrap items-center gap-2">
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
                          <p className="text-[#020b1daa] ">{AllTramite?.email_id}</p>
                        </div>
                      </div>
          
                      <div className="flex items-center flex-nowrap gap-2 leading-tight">
                        <img 
                            src= "/dnrpa.png" 
                            alt="icono trámites" 
                            width={26} 
                            height={"auto"}
                            className="opacity-50 mt-1 mb-auto w-3 sm:w-4 md:mt-0" 
                          />
          
                        <div className="flex flex-wrap gap-2 items-center">
                          <h1 className=" text-start text-[#39507fcc] font-semibold leading-tight tracking-tighter text-base sm:text-lg sm:text-[22px] md:leading-none ">
                            {AllTramite.tramite}
                          </h1>
          
                          <div className="flex gap-[1px] w-28 h-[14px] bg-[#ffffff] rounded-lg">
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
                      className="relative mb-auto h-[30px] rounded-md border border-[#d9dee8] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#c0c8d8] active:!bg-[#eee]"
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
                      <div className={`text-[#39507f] my-0 text-[13px] border-b border-[#020b1d14] ${state && "mt-4 mb-1"}`}>
                        ESTADO
                      </div>
                      <div className="flex flex-col w-full text-[#020b1dcc] mb-4 py-2 gap-1 ">
                        <div className={`flex items-center gap-1.5 `}>
                          <div className="mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] bg-[#dd00dd00] rounded-[4px]">1</div>
                          <div className={`flex items-center flex-wrap`}>
                            Presupuesto pedido el
                            <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014] ${AllTramite.estado === "presupuestar" && "hidden"} `} >
                              {formatDateToLocal(AllTramite.created_at!)}
                            </div>
                            <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#ff000014] ${AllTramite.estado !== "presupuestar"  && "hidden"}`}>
                              {distanceToNow(new Date(AllTramite.created_at!))} 
                            </div> 
                          </div>
                        </div>
            
                        <div className={`flex items-center gap-1.5 `}>
                          <div className={`mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] rounded-[4px]  ${AllTramite.estado === "presupuestar" && "text-[#ffffff] bg-[#39507f]"}`}>2</div>
                          { AllTramite.estado === "presupuestado" || AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? (
                          <div className={`flex items-center flex-wrap`}>
                            Presupuestado
                            <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014] ${AllTramite.estado === "presupuestado" && "hidden"} `} >
                                {formatDateToLocal(AllTramite.budgeted_at!)}
                            </div>
                            <div className={`text-[13px] py-0.5 px-1.5 ml-1 mr-2 rounded-lg bg-[#ff000014] ${AllTramite.estado !== "presupuestado"  && "hidden"}`}>
                              {distanceToNow(new Date(AllTramite.budgeted_at!))} 
                            </div> 
                            
                            <div className="text-[14px]">
                              precio: <span className="font-medium">{formatCurrency(Number(AllTramite.presupuesto))}</span>
                            </div>
                          </div>
                          ) : (
                            <div>Calcular y enviar el presupuesto</div>
                          ) }
                        </div>
            
                        <div className={`flex items-center gap-1.5 `}>
                          <div className={`mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] rounded-[4px] ${AllTramite.estado === "presupuestado" ? "text-[#ffffff] bg-[#39507f]" : AllTramite.estado === "presupuestar" ? "opacity-40" : "opacity-100"}`}>3</div>
                          {AllTramite.estado === "iniciado" || AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? (
                            <div className={`flex items-center flex-wrap`}>
                              Pagado 
                              <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014] ${AllTramite.estado === "iniciado" && "hidden"} `} >
                                  {formatDateToLocal(AllTramite.budgeted_at!)}
                              </div>
                              <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#ff000014] ${AllTramite.estado !== "iniciado"  && "hidden"}`}>
                                {distanceToNow(new Date(AllTramite.budgeted_at!))} 
                              </div> 
                            </div>
                            ) : (
                              <div className={`${AllTramite.estado === "presupuestar" ? "opacity-40" : "opacity-100"} `}>Chequear el pago</div>
                            )}
                        </div>
            
                        <div className={`flex items-center gap-1.5 `}>
                          <div className={`mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] rounded-[4px] ${AllTramite.estado === "iniciado" ? "text-[#ffffff] bg-[#39507f]" : AllTramite.estado === "presupuestar" ||  AllTramite.estado === "presupuestado" ? "opacity-40" : "opacity-100" }`}>4</div>
                          {AllTramite.estado === "cancelado" || AllTramite.estado === "terminado" ? (
                            <div className={``}>
                              {AllTramite.estado === "cancelado" ? "Cancelado" : AllTramite.estado === "terminado" && "Terminado" } el
                              <span  className="text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014]" >
                                {AllTramite.estado === "cancelado" ? formatDateToLocal(AllTramite.canceled_at!) : formatDateToLocal(AllTramite.finished_at!)}
                              </span>  
                              <span className="text-[13px] py-0.5 rounded-lg bg-[#22ff0014]">
                                {AllTramite.estado === "cancelado" ? distanceToNow(new Date(AllTramite.canceled_at!)) : distanceToNow(new Date(AllTramite.finished_at!))}
                              </span>
                            </div>
                            ) : (
                              <div className={`${AllTramite.estado === "presupuestar" ||  AllTramite.estado === "presupuestado" ? "opacity-40" : "opacity-100"} `}>Trámite en ejecución</div>
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
