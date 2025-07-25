'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import { Tramite } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { Frente } from '@/app/ui/marcos';
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import distanceToNow from '@/app/lib/dateRelative';
import {InputCnp} from "@/app/ui/uiRadix/input-cnp"
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"


export default function TableTramiteMember( { 
  tramite,
}: { 
  tramite: Tramite;
} ) {
  
  const [successState, setSuccessState] = useState(false)

  const [presupuesto, setPresupuesto] = useState("")
  const [finalizado, setFinalizado] = useState("")
  const [estado, setEstado] = useState(false)
  
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

            <div className="flex flex-wrap gap-2 items-center">
              <h1 className=" text-start text-[#50073a88] font-semibold leading-tight tracking-tighter text-base sm:text-lg sm:text-[22px] md:leading-none ">
                {tramite.tramite}
              </h1>

              <div className="flex gap-[1px] w-28 h-[14px] bg-[#ffffff] rounded-lg">
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
              </div>
            </div>
          </div>
        </div>

        <Button
          className="relative mb-auto h-[30px] rounded-md border border-[#e9dae9] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#1d0215aa] hover:bg-[#ffffff] hover:text-[#1d0215dd] hover:border-[#d8c0d7] active:!bg-[#eee]"
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
          <div className={`text-[#50073aaa] my-0 text-[13px] border-b border-[#1d021514] ${state && "mt-4 mb-1"}`}>
            ESTADO
          </div>

          <div className="flex flex-col w-full text-[#1d0215] mb-4 py-2 gap-1 ">
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
          </div>

          <div className={`text-[#50073aaa] mb-4 text-[13px] border-b border-[#1d021514]`}>
            ADJUNTOS
          </div>

          <div className="w-full bg-[#1d0215] pt-6 pb-4 px-3 rounded-lg flex gap-6 flex-wrap justify-center">
            <div className="">
              {archivos ? (
                <div className="text-[#1d0215dd] flex gap-5 items-baseline ">
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

