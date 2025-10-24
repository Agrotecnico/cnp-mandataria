'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

import { Tramite } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { Frente } from '@/app/ui/marcos';
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import distanceToNow from '@/app/lib/dateRelative';


export default function TableTramiteMember( { 
  tramite,
}: { 
  tramite: Tramite;
} ) {
  
  const [successState, setSuccessState] = useState(false)
  
  const { state, close, toggle } = useToggleState()

  const archivosAdjuntos= tramite?.documentos_url
  const archivos: string[] = JSON.parse(`${archivosAdjuntos}`)

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
    <Frente  className="py-4 px-3 text-sm sm:px-4" >
      <div className="w-full items-center flex gap-3 justify-between sm:items-center sm:mb-0">
        <div className="flex items-center gap-3 w-full ">
          <div className="flex items-center flex-nowrap gap-2 leading-tight">
            <img 
                src= "/dnrpa.png" 
                alt="icono trámites" 
                width={26} 
                height={"auto"}
                className="opacity-50 mt-1 mb-auto w-3 sm:w-4 md:mt-0" 
              />

            <div className="flex flex-wrap gap-4 items-center">
              <h1 className=" text-start text-[#39507fcc] font-semibold leading-tight tracking-tighter text-base sm:text-lg sm:text-[22px] md:leading-none ">
                {tramite.tramite}
              </h1>

              {/* <div className="flex gap-[1px] w-28 h-[14px] bg-[#ffffff] rounded-lg">
                <div className="flex items-center justify-center text-[10px] text-white text-center w-7 bg-[#50073abf] rounded-l-lg ">
                  1
                </div>
                <div className={`flex items-center justify-center text-[10px] text-center w-7  ${tramite.estado === "presupuestado" || tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado"  ? "bg-[#50073abf] text-white" : "bg-white text-[#1d0215cc]" } `}>
                  2
                </div>
                <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? "bg-[#50073abf] text-white" : "bg-white text-[#1d0215cc]" } `}>
                  3
                </div>
                <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ tramite.estado === "cancelado" || tramite.estado === "terminado"  ? "bg-[#50073abf] text-white" : "bg-white text-[#1d0215cc]" } rounded-r-lg `}>
                  4
                </div>
              </div> */}

              <div className={`flex gap-[1px] w-28 h-4 bg-[#ffffff] rounded-lg ${state && "hidden"}`}>
                <div className="flex items-center justify-center text-[10px] text-white text-center w-7 bg-[#39507f] rounded-l-lg ">
                  1
                </div>
                <div className={`flex items-center justify-center text-[10px] text-center w-7  ${tramite.estado === "presupuestado" || tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado"  ? "bg-[#39507f] text-white" : "bg-white text-[#020b1dcc]" } `}>
                  2
                </div>
                <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? "bg-[#39507f] text-white" : "bg-white text-[#020b1dcc]" } `}>
                  3
                </div>
                <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ tramite.estado === "cancelado" || tramite.estado === "terminado"  ? "bg-[#39507f] text-white" : "bg-white text-[#020b1dcc]" } rounded-r-lg `}>
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
          {/* <div className={`text-[#50073aaa] my-0 text-[13px] border-b border-[#1d021514] ${state && "mt-4 mb-1"}`}>
            ESTADO
          </div> */}

          {/* <div className={` border-b border-[#020b1d14] ${state && "mt-4 mb-1"}`}>
            { (tramite.estado === "presupuestado" ||  tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado") && 
            <p className={`text-[#39507f] my-0 text-[15px]`}>
              Presupuesto <span className="ml-2 font-medium">{formatCurrency(Number(tramite.presupuesto))}</span>
            </p>}
          </div> */}

          {/* <div className="flex flex-col w-full text-[#1d0215] mb-4 py-2 gap-1 ">
            <div className={`flex items-center gap-1.5 `}>
              <div className="mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] bg-[#dd00dd00] rounded-[4px]">1</div>
              <div className={`flex items-center flex-wrap`}>
                Presupuesto pedido  
                <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014] ${tramite.estado === "presupuestar" && "hidden"} `} >
                  {formatDateToLocal(tramite.created_at!)}
                </div>
                <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#ff000014] ${tramite.estado !== "presupuestar"  && "hidden"}`}>
                  {distanceToNow(new Date(tramite.created_at!))} 
                </div> 
              </div>
            </div>

            <div className={`flex items-center gap-1.5 `}>
              <div className={`mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] rounded-[4px]  ${tramite.estado === "presupuestar" && "text-[#ffffff] bg-[#50073aaa]"}`}>2</div>
              { tramite.estado === "presupuestado" || tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
              <div className={`flex items-center flex-wrap`}>
                Presupuestado
                <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014] ${tramite.estado === "presupuestado" && "hidden"} `} >
                    {formatDateToLocal(tramite.budgeted_at!)}
                </div>
                <div className={`text-[13px] py-0.5 px-1.5 ml-1 mr-2 rounded-lg bg-[#ff000014] ${tramite.estado !== "presupuestado"  && "hidden"}`}>
                  {distanceToNow(new Date(tramite.budgeted_at!))} 
                </div> 
                
                <div className="text-[14px]">
                  precio: <span className="font-medium">{formatCurrency(Number(tramite.presupuesto))}</span>
                </div>
              </div>
              ) : (
                <div>Te enviaremos el presupuesto en la major brevedad</div>
              ) }
            </div>

            <div className={`flex items-center gap-1.5 `}>
              <div className={`mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] rounded-[4px] ${tramite.estado === "presupuestado" ? "text-[#ffffff] bg-[#50073aaa]" : tramite.estado === "presupuestar" ? "opacity-40" : "opacity-100"}`}>3</div>
              {tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                <div className={`flex items-center flex-wrap`}>
                  Pagado 
                  <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014] ${tramite.estado === "iniciado" && "hidden"} `} >
                     {formatDateToLocal(tramite.budgeted_at!)}
                  </div>
                  <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#ff000014] ${tramite.estado !== "iniciado"  && "hidden"}`}>
                    {distanceToNow(new Date(tramite.budgeted_at!))} 
                  </div> 
                </div>
                ) : (
                  <div className={`${tramite.estado === "presupuestar" ? "opacity-40" : "opacity-100"} `}>Realizar el pago</div>
                )}
            </div>

            <div className={`flex items-center gap-1.5 `}>
              <div className={`mb-auto mt-[3px] text-[11px] leading-[1.6] w-[18px] px-[5px] rounded-[4px] ${tramite.estado === "iniciado" ? "text-[#ffffff] bg-[#50073aaa]" : tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "opacity-40" : "opacity-100" }`}>4</div>
              {tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                <div className={``}>
                  {tramite.estado === "cancelado" ? "Cancelado" : tramite.estado === "terminado" && "Terminado" } el<span  className="text-[13px] py-0.5 px-1.5 mx-1 rounded-lg bg-[#22ff0014]" >
                     {formatDateToLocal(tramite.finished_at!)}
                  </span>  
                  <span className="text-[13px] py-0.5 rounded-lg bg-[#22ff0014]">
                    {distanceToNow(new Date(tramite.finished_at!))}
                  </span>
                </div>
                ) : (
                  <div className={`${tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "opacity-40" : "opacity-100"} `}>Trámite en ejecución</div>
                )}
            </div>
          </div> */}
          <div className="flex flex-col w-full text-[#020b1dcc] border-b border-[#020b1d14] mb-4 pt-2 pb-3 gap-[1px] ">
            <div className={`text-[#39507f] mb-1 text-[13px]`}>{/*  ${state && "mt-4 mb-1"}  border-b border-[#1d021514]*/}
              ESTADO
            </div>

            <div className={`flex items items-stretch gap-1.5 min-h-6`}>
              <div className="flex items-center justify-center text-[11px] w-[18px] px-[5px] text-[#ffffff] bg-[#39507f] rounded-t-lg ">1</div>
              <div className={`flex items-center flex-wrap`}>
                Presupuesto pedido
                <div className={`text-[13px] py-0.5 px-1 ${tramite.estado === "presupuestar" && "hidden"} `} >
                  el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(tramite.created_at!)}</span>
                </div>
                <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg text-[#020b1d] bg-[#ffffff] ${tramite.estado !== "presupuestar"  && "hidden"}`}>
                  {distanceToNow(new Date(tramite.created_at!))} 
                </div> 
              </div>
            </div>

            <div className={`flex items-stretch gap-1.5 min-h-6`}>
              <div className={`flex items-center justify-center text-[11px] w-[18px] px-[5px] ${tramite.estado === "presupuestar" ? "text-[#ffffff] bg-[#548effcc]" : "text-[#ffffff] bg-[#39507f]"}`}>2</div>
              { tramite.estado === "presupuestado" || tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
              <div className={`flex items-center flex-wrap`}>
                Presupuestado
                <div className={`text-[13px] py-0.5 px-1 ${tramite.estado === "presupuestado" && "hidden"} `} >
                    el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(tramite.budgeted_at!)}</span>
                </div>
                <div className={`text-[13px] py-0.5 px-1.5 ml-1 mr-2 rounded-lg text-[#020b1d] bg-[#ffffff] ${tramite.estado !== "presupuestado"  && "hidden"}`}>
                  {distanceToNow(new Date(tramite.budgeted_at!))} 
                </div> 
              </div>
              ) : (
                <div className="flex items-center">
                  {/* <div>Calcular y enviar el presupuesto</div> */}
                  <div>Calculando el presupuesto</div>
                  <PencilIcon className="ml-2 w-[14px]" />
                </div>
              ) }
            </div>

            <div className={`flex items-stretch gap-1.5 min-h-6`}>
              <div className={`flex items-center justify-center text-[11px] w-[18px] px-[5px] ${tramite.estado === "presupuestado" ? "text-[#ffffff] bg-[#548effcc]" : tramite.estado === "presupuestar" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507f]"}`}>
                3
              </div>
              {tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                <div className={`flex items-center flex-wrap`}>
                  Cobrado 
                  <div className={`text-[13px] py-0.5 px-1 ${tramite.estado === "iniciado" && "hidden"} `} >
                    el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(tramite.budgeted_at!)}</span>
                  </div>
                  <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg text-[#020b1d] bg-[#ffffff] ${tramite.estado !== "iniciado"  && "hidden"}`}>
                    {distanceToNow(new Date(tramite.budgeted_at!))} 
                  </div> 
                </div>
                ) : (
                  <div className="flex items-center">
                    <div className={`mr-2 ${tramite.estado === "presupuestar" ? "opacity-45" : "opacity-100"} `}>Chequeando el pago</div>
                    <PencilIcon className={`w-[14px] ${tramite.estado === "presupuestar" && "hidden"}`} />
                  </div>
                )}
            </div>

            <div className={`flex items-stretch gap-1.5 min-h-6`}>
              <div className={`flex items-center justify-center text-[11px] w-[18px] px-[5px] rounded-b-lg ${tramite.estado === "iniciado" ? "text-[#ffffff] bg-[#548effcc]" : tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507f]" }`}>4</div>
              {tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                <div className={``}>
                  {tramite.estado === "cancelado" ? "Cancelado" : tramite.estado === "terminado" && "Terminado" } el
                  <span  className="text-[13px] py-0.5 px-1.5 mx-1 rounded-lg" >
                    {tramite.estado === "cancelado" ? formatDateToLocal(tramite.canceled_at!) : formatDateToLocal(tramite.finished_at!)}
                  </span>  
                  <span className="text-[13px] py-0.5 px-1.5 rounded-lg bg-[#ffffff]">
                    {tramite.estado === "cancelado" ? distanceToNow(new Date(tramite.canceled_at!)) : distanceToNow(new Date(tramite.finished_at!))}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className={`${tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "opacity-45" : "opacity-100"} `}>Realizando el trámite</div>
                  <PencilIcon className={`ml-2 w-[14px] ${tramite.estado === "presupuestar" || tramite.estado === "presupuestado" ? "hidden" : "block"}`} />
                </div>
              )}
            </div>
          </div>

          <div className={`text-[#39507f] mb-1 text-[13px] `}>
            ADJUNTOS
          </div>

          <div className="w-full bg-[#020b1d] pt-6 pb-4 px-3 rounded-lg flex gap-6 flex-wrap justify-center">
            <div className="">
              {archivos ? (
                <div className=" flex gap-5 items-baseline ">
                  {archivos?.map((archivo, index) => (
                    <div key={index } className=" text-[13px] leading-[18px] opacity-80 hover:opacity-100 ">
                      
                      <Link 
                        href={archivo.slice(-4) === ".pdf" ? 
                          archivo.replace(".pdf", ".png") 
                          : 
                          archivo
                        } 
                        target="_blank">
                        <img 
                          src={archivo.slice(-4) === ".pdf" ? 
                            archivo.replace(".pdf", ".png") 
                            : 
                            archivo
                          } 
                          alt="imagen archivo"
                          width={96}
                          height={96}
                          className="rounded border border-[#777] " />
                      </Link>
                    </div> 
                  ))}
                </div>
              ) : (
                <div className="text-[#ffffffaa] ">No tiene archivos adjuntos</div>
              )}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </Frente>
  );
}

