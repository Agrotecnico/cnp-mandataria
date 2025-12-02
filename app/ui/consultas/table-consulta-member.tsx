'use client';

import { useState, useEffect } from 'react';
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import clsx from 'clsx';
import Link from 'next/link';
import type { Session } from "next-auth"
// import { useSession } from "next-auth/react"

import { Consulta } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { Frente } from '@/app/ui/marcos';
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import { formatDateToLocal } from '@/app/lib/utils';
import distanceToNow from '@/app/lib/dateRelative';


export default function TableConsultaMember( { 
  consulta,
  countcon,
  currentPage,
  index,
}: { 
  consulta: Consulta;
  countcon: number;
  currentPage: number;
  index: number;
} ) {
  // const { data: session, update } = useSession()
  
  const [palabrasConsulta, setTextconsulta] = useState(consulta.consulta.split(" "))
  const [successState, setSuccessState] = useState(false)

  const { state, close, toggle } = useToggleState()


  const archivosAdjuntos= consulta?.archivos_url
  const archivos: string[] = JSON.parse(archivosAdjuntos!)

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

  const tituloConsulta= palabrasConsulta.slice(0, 12)

  const indexz = consulta.consulta.search("::");
  const tema= consulta.consulta.slice(0, indexz + 1)
  // const temaConsulta= consulta.consulta.slice(indexz + 3)
  const temaConsulta= indexz === -1 ? consulta.consulta.slice(indexz + 1) : consulta.consulta.slice(indexz + 2)
  const onsultaSplit= temaConsulta.split(" ")
  const tituloConsultax= onsultaSplit.slice(0, 12)

  const numeroFormateado = ( ( countcon - currentPage * 6 ) + 6 - index ).toString().padStart(3, "0")

  


  // console.log("session:", session)


  return (
    <Frente  className="p-2.5 text-[13px] sm:p-4 sm:text-sm" >
      <div className="flex flex-col items-start " >
        <div className="w-full items-end flex gap-2 justify-between sm:gap-4">
          <div className="flex items-center flex-wrap text-[#39507f]">
            <p className="font-medium text-sm mr-2 sm:text-[15px]">
              <span className="text-[13px] sm:text-[14px]">CONSULTA</span>
              <span className={`${consulta.respuesta ? "bg-[#548effdd]" : "bg-[#39507fcc]"}  ml-1 px-1 text-xs text-[#ffffff] rounded-md sm:text-[13px]`}>{numeroFormateado}</span>
            </p>
            <p className="flex flex-nowrap items-center">
              <span className="">realizada el </span>

              <time className="text-[#39507f99] leading-[1.2] ml-1 rounded-lg px-1.5 bg-[#ffffff]">
                {/* {distanceToNow(new Date(`${consulta.created_at}`))} */}
                {formatDateToLocal(`${consulta.created_at}`)}
              </time>
            </p>
          </div>

          <Button
            className="mb-auto relative text-[#020b1daa] h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#548eff66] active:!bg-[#eee]"
            onClick={() => { handleToggle()}}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? "Cerrar" :  <div><span className="text-[12px] uppercase">Ver</span></div> }
          </Button>
        </div>

        <div className="mt-2 text-sm sm:text-[15px]">
          <div className=" [font-variant-caps:_small-caps]  underline decoration-[#39507f81] mb-1 underline-offset-2">{tema} </div>
          <p >
            {tituloConsultax.join(" ") }
            <span>
              { tituloConsulta.length < 12 ? "" :
                !state ? " ... " :
                ` ${palabrasConsulta.slice(12).join(" ")}` 
              }
            </span>
          </p>
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
          <div className={`flex flex-col gap-4 mb-2.5 text-sm cursor-default transition-[visibility] duration-300 ease-in-out ${!state && "invisible"}`}>
            <div className={`mt-7 mx-5 pl-2 border-l-[3px] ${!consulta.respuesta ? "border-[#39507f88]" : "border-[#548effaa]"}  text-[13px] sm:text-sm`}>
              <p className="text-[#39507f] mb-2 font-medium text-sm sm:text-[15px] ">
                <span className='text-[13px] sm:text-[14px]'>RESPUESTA</span>
                {consulta.updated_at ? 
                <span className='text-[#38507f] ml-1 text-[13px] font-normal sm:text-sm'>enviada<span className={`leading-[1.2] text-[13px] sm:text-sm bg-[#ffffff] text-[#39507f99] ml-1 px-1.5 py-0.5 rounded-lg `}>{distanceToNow(new Date(consulta.updated_at))}</span>
                </span> : 
                <span className={`leading-[1.2] text-[13px] sm:text-sm bg-[#ffffff] text-[#39507f99] ml-1 px-1.5 py-0.5 rounded-lg `}>en proceso...</span> } 
              </p>

              { consulta.respuesta ? (
                <p className="text-sm sm:text-[15px] ">{ consulta.respuesta } </p>
              ) : (
                <p className="text-sm text-[#39507fcc] sm:text-[15px] ">
                  <i>Recibimos la consulta. </i>
                  <i>Te enviaremos la respuesta en la mayor brevedad.</i>
                </p>
              )}
            </div>
          </div>

          <div className={`mt-2 pt-5 flex flex-col transition-[visibility] duration-300 ease-in-out ${!state && "invisible"} `}>
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
