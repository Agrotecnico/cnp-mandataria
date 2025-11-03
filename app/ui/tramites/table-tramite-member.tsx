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
import IconFlecha from '@/app/ui/logosIconos/icon-flecha';


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
          <div className="flex items-center flex-nowrap gap-2">
            <img 
              src= "/dnrpa.png" 
              alt="icono trámites" 
              width={26} 
              height={"auto"}
              className="opacity-50 w-3 sm:w-4 md:mt-0" 
            />
            <h1 className=" text-start text-[#39507fcc] font-semibold text-base sm:text-lg sm:text-[22px] ">
              {tramite.tramite}
            </h1>
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

      <div className='flex items-center mt-4 gap-2'>
        <div className={`mb-auto text-[#39507f] text-[13px]`}>
          ESTADO
        </div>

        <div className={`flex flex-row flex-wrap gap-1.5 items-center ${state && "hidden"}`}>
          <div className={`flex gap-[1px] my-[2px] w-28 h-4 bg-[#ffffff] rounded-lg`}>
            <div className="flex items-center justify-center text-[10px] text-white text-center w-7 bg-[#39507fdd] rounded-l-lg ">
              1
            </div>

            <div className={`flex items-center justify-center text-[10px] text-center w-7  ${tramite.estado === "presupuestar" ? "text-[#ffffff] bg-[#548effdd]" : "text-[#ffffff] bg-[#39507fdd]"} `}>
              2
            </div>

            <div className={`flex items-center justify-center text-[10px] text-center w-7 ${tramite.estado === "presupuestado" ? "text-[#ffffff] bg-[#548effdd]" : tramite.estado === "presupuestar" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507fdd]"} `}>
              3
            </div>

            <div className={`flex items-center justify-center text-[10px] text-center w-7 ${tramite.estado === "iniciado" ? "text-[#ffffff] bg-[#548effdd]" : tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507fdd]" } rounded-r-lg `}>
              4
            </div>
          </div>

          <div className={`items-center ${tramite.estado === "presupuestar"  ? "flex flex-nowrap" : "hidden"} `}>
            <p className='flex flex-nowrap items-center '>Calculando el presupuesto</p>
              <IconFlecha className="ml-1 w-[12px] fill-[#39507fcc] opacity-40" />
          </div>

          <div className={`items-center ${ tramite.estado === "presupuestado" ? "flex" : "hidden"} `}>
            <div>Chequeando el pago</div>
              <IconFlecha className="ml-1 w-[12px] fill-[#39507fcc] opacity-40" />
          </div>

          <div className={`items-center ${tramite.estado === "iniciado"   ? "flex" : "hidden"} `}>
            <div>Realizando el trámite</div>
              <IconFlecha className="ml-1 w-[12px] fill-[#39507fcc] opacity-40" />
          </div>

          <div className={`items-center ${tramite.estado === "cancelado" || tramite.estado === "terminado"   ? "flex" : "hidden"} `}>
            <div>Terminado</div>
            <IconFlecha className="ml-1 w-[12px] fill-[#39507fcc] opacity-40" />
          </div>
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
          <div className="flex flex-col w-full text-[#020b1dcc] pt-2 pb-3 gap-[1px] ">
            <div className={`flex items items-stretch gap-1.5 min-h-6`}>
              <div className="flex items-center justify-center text-[11px] w-[18px] min-w-[18px] text-[#ffffff] bg-[#39507f] rounded-t-lg ">1</div>
              <div className={`flex items-center flex-wrap`}>
                Presupuesto pedido
                <div className={`text-[13px] py-0.5 px-1 ${tramite.estado === "presupuestar" && "hidden"} `} >
                  el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(tramite.created_at!)}</span>
                </div>
                <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg text-[#39507faa] bg-[#ffffff] ${tramite.estado !== "presupuestar"  && "hidden"}`}>
                  {distanceToNow(new Date(tramite.created_at!))} 
                </div> 
              </div>
            </div>

            <div className={`flex items-stretch gap-1.5 min-h-6`}>
              <div className={`flex items-center justify-center text-[11px] w-[18px] min-w-[18px] ${tramite.estado === "presupuestar" ? "text-[#ffffff] bg-[#548effcc]" : "text-[#ffffff] bg-[#39507f]"}`}>
                2
              </div>

              <div className="flex items-center flex-wrap my-[3px] ">
                { tramite.estado === "presupuestado" || tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                  <div className={`flex items-center flex-wrap`}>
                    Presupuestado
                    <div className={`text-[13px] py-0.5 px-1 ${tramite.estado === "presupuestado" && "hidden"} `} >
                        el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(tramite.budgeted_at!)}</span>
                    </div>
                    <div className={`text-[13px] py-0.5 px-1.5 ml-1 mr-2 rounded-lg text-[#39507faa] bg-[#ffffff] ${tramite.estado !== "presupuestado"  && "hidden"}`}>
                      {distanceToNow(new Date(tramite.budgeted_at!))} 
                    </div> 
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div>Calculando el presupuesto</div>
                    <div className="flex">
                      <span> &nbsp;...</span>
                      <PencilIcon className=" w-[14px]" />
                    </div>
                  </div>
                ) }
                {tramite.presupuesto ? <div className="text-[#39507fcc] ">Precio: {formatCurrency(Number(tramite.presupuesto))} </div> : "" }
                
              </div>
            </div>

            <div className={`flex items-stretch gap-1.5 min-h-6`}>
              <div className={`flex items-center justify-center text-[11px] w-[18px] min-w-[18px] ${tramite.estado === "presupuestado" ? "text-[#ffffff] bg-[#548effcc]" : tramite.estado === "presupuestar" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507f]"}`}>
                3
              </div>
              {tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                <div className={`flex items-center flex-wrap`}>
                  Cobrado 
                  <div className={`text-[13px] py-0.5 px-1 ${tramite.estado === "iniciado" && "hidden"} `} >
                    el<span className="ml-1.5 px-1 rounded-lg">{formatDateToLocal(tramite.budgeted_at!)}</span>
                  </div>
                  <div className={`text-[13px] py-0.5 px-1.5 mx-1 rounded-lg text-[#39507faa] bg-[#ffffff] ${tramite.estado !== "iniciado"  && "hidden"}`}>
                    {distanceToNow(new Date(tramite.budgeted_at!))} 
                  </div> 
                </div>
                ) : (
                  <div className="flex items-center">
                    <div className={` ${tramite.estado === "presupuestar" ? "opacity-45" : "opacity-100"} `}>Chequeando el pago</div>
                    <div className={`flex ${tramite.estado === "presupuestar" && "hidden"}`}>
                      <span> &nbsp;...</span>
                      <PencilIcon className={`w-[14px] `} />
                    </div>
                  </div>
                )}
            </div>

            <div className={`flex items-stretch gap-1.5 min-h-6`}>
              <div className={`flex items-center justify-center text-[11px] w-[18px] min-w-[18px] rounded-b-lg ${tramite.estado === "iniciado" ? "text-[#ffffff] bg-[#548effcc]" : tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "text-[#020b1d88] bg-[#ffffff]" : "text-[#ffffff] bg-[#39507f]" }`}>4</div>
              {tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
                <div className={``}>
                  {tramite.estado === "cancelado" ? "Cancelado" : tramite.estado === "terminado" && "Terminado" } el
                  <span  className="text-[13px] py-0.5 px-1.5 mx-1 rounded-lg" >
                    {tramite.estado === "cancelado" ? formatDateToLocal(tramite.canceled_at!) : formatDateToLocal(tramite.finished_at!)}
                  </span>  
                  <span className="text-[13px] py-0.5 px-1.5 rounded-lg text-[#39507faa] bg-[#ffffff]">
                    {tramite.estado === "cancelado" ? distanceToNow(new Date(tramite.canceled_at!)) : distanceToNow(new Date(tramite.finished_at!))}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className={`${tramite.estado === "presupuestar" ||  tramite.estado === "presupuestado" ? "opacity-45" : "opacity-100"} `}>Realizando el trámite</div>
                  <div className={`flex ${tramite.estado === "presupuestar" || tramite.estado === "presupuestado" ? "hidden" : "block"}`}>
                    <span> &nbsp;...</span>
                    <PencilIcon className={` w-[14px] `} />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`pt-3 flex flex-col transition-[visibility] duration-300 ease-in-out ${!state && "invisible"} `}>
            <div className="mb-1.5 text-[#39507f] text-[13px] sm:text-sm ">
              ADJUNTOS
            </div>
            
            <div className="w-full bg-[#020b1d] p-2 pl-3 rounded-md flex gap-6 ">
              {archivos?.map((archivo, index) => (
                <div key={index } className=" text-[13px] leading-[18px] ">
                  {archivo !== "https://res.cloudinary.com/dchmrl6fc/image/upload/v1740640515/sin-adjuntos_ut7col.png" ? 
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
                    className="rounded w-16 opacity-80 border border-[#777] hover:opacity-100 " />
                  </Link>
                    : 
                    <div className="ml-3 text-[15px] font-semibold text-[#ffffffcc]">Sin archivos adjuntos</div>
                    }
                </div> 
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </Frente>
  );
}

