'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import clsx from 'clsx';
import { useState, useRef } from 'react';

import { Consulta } from '@/app/lib/definitions';
import { Button, ButtonA } from '@/app/ui/button';
import { handleFormRespuesta, updateConsulta, StateUpdateConsulta } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { Frente } from '@/app/ui/marcos';
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconEnvioEmail from '../logosIconos/icon-envio-email';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import IconRespuesta from '@/app/ui/logosIconos/icon-respuesta';
import {InputCnp} from "@/app/ui/uiRadix/input-cnp"
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconEmail2 from "@/app/ui/logosIconos/icon-email2";
import IconAdjunto from "@/app/ui/logosIconos/icon-adjunto";


export default function EditConsultaForm({
  consulta,
  userMember,
}: { 
  consulta: Consulta;
  userMember: User | undefined
}) {

  const [estado, setEstado] = useState(false)
  const [estadoRegistrar, setEstadoRegistrar] = useState(false)
  const [estadoAdjunto, setEstadoAdjunto] = useState(false)

  const [consultaAsunto, setConsultaAsunto] = useState("")
  const [respuesta, setRespuesta] = useState("")


  const archivosAdjuntos= consulta.archivos_url
  const archivos: string[] = JSON.parse(`${archivosAdjuntos}`)

  const consultaA:string[] | undefined= consulta.consulta.split(": ")

  const consultaEmail= `${consultaAsunto}:: ${consulta.consulta}`
  const extrConsulta= consultaEmail.slice(0, 150)

  const id= consulta.id

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const initialState: StateUpdateConsulta = { message: null, errors: {} };
  const updateConsultaWithId = updateConsulta.bind(null, id);
  const [state, formAction, isPending] = useActionState(updateConsultaWithId, initialState);


  return (
    <>
      <div className="flex flex-col justify-between rounded-xl ">
        <div className="flex items-center mb-6 ml-4 ">
          <div className=" relative mr-4" data-testid="image-container">
            {userMember?.image ? (
                <img
                  decoding="async" 
                  src= {userMember?.image}
                  className="rounded-full bg-cover h-10 object-cover w-full " alt="header-image-profile">
                  
                </img>
              ) : (
                <div className="flex w-10 h-10 text-2xl items-center justify-center rounded-full bg-[#ffffffba] text-[#666] ">
                  {userMember?.email?.substring(0, 1).toUpperCase()}
                </div>
              )}
          </div>
          <div className=" text-sm">
            <div className="font-medium">{userMember?.name} </div>
            <div className="flex text-[13px]">
              <p className="text-[#020b1daa] ">{userMember?.email}</p>
              {!userMember?.email_verified && 
              <span className='ml-2 text-red-600'>no verificado</span>
              }
            </div>
          </div>
        </div>

        {/* adjuntos*/}
        <Frente className="p-3 mb-2 text-sm sm:p-4" >
          <div className="w-full items-start flex gap-3 justify-end sm:items-center sm:mb-0">
            <div className={`flex items-center gap-4 w-full text-sm text-[#39507fdd]`}>
              <IconAdjunto className="w-6 h-6" />
              <p>ADJUNTOS</p>
            </div>

            <Button
              className="relative h-[30px] rounded-md border border-[#548eff33)] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#548eff66] active:!bg-[#eee]"
              onClick={() => { setEstadoAdjunto(!estadoAdjunto)}}
              data-testid="edit-button"
              data-active={estadoAdjunto}
              type='button'
            >
              {estadoAdjunto ? "Cerrar" :  <div><span className="text-[12px] uppercase">Ver</span></div> }
            </Button>
          </div>

          <div
            className={clsx(
              "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible bg-[#020b1d] rounded-lg ",
              {
                "max-h-[1000px] opacity-100 mt-4 p-3 ": estadoAdjunto,
                "max-h-0 opacity-0 mt-0 p-0 ": !estadoAdjunto,
                "invisible": !estadoAdjunto,
              }
            )}
          >
            <div className={`flex flex-wrap gap-2`}>
              <div className="text-[#020b1ddd] bg-[#020b1d] rounded flex gap-5 items-baseline ">
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
                        className="rounded w-20 border border-[#777]" />
                    </Link>
                  </div> 
                ))}
              </div>
            </div>
          </div>
        </Frente>

        {/* consulta */}
        <Frente className="p-3 mb-2 text-sm sm:p-4" >
          <div className="w-full items-center flex gap-3 justify-end sm:mb-0">
            <div className="flex gap-4 w-full">
              <IconConsulta  className="w-5 h-5 fill-[#39507fcc]" />
              <p className={`font-medium text-[14px] text-[#39507fdd]`}>
                CONSULTA 
                <span className="text-[13px]" > - {formatDateToLocal(consulta.created_at)}</span>
              </p>
            </div>

            <Button
              className="relative h-[30px] rounded-md border border-[#548eff33] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#5483ff66] active:!bg-[#eee]"
              onClick={() => { setEstado(!estado)}}
              data-testid="edit-button"
              data-active={estado}
              type='button'
            >
              {estado ? "Cerrar" : <div><span className="text-[12px] uppercase">Ver</span></div> }
            </Button>
          </div>

          <div
            className={clsx(
              "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
              {
                "max-h-[1000px] opacity-100 ": estado,
                "max-h-0 opacity-0 ": !estado,
                "invisible": !estado,
              }
            )}
          >
            <div className={`text-[#020b1dbb] mb-3 ${estado && "mt-4"} `}>
              {!consulta.respuesta ? (
                consulta.consulta
              ) : (
                consultaA[1]
              )}
              
            </div>
          </div>
        </Frente>

        {/* Editar respuesta */}
        <Frente className={`p-3 mb-4 text-sm sm:p-4 ${ !userMember?.email_verified && "hidden"}`} >
          <div className="w-full items-center flex gap-3 justify-end sm:mb-0">
            <div className={`flex gap-4 w-full text-[15px] sm:text-base`}>
               {!consulta.updated_at ? (
                  <p className={`flex items-center font-medium text-[#39507fdd] text-[14px]`}>
                    <IconRespuesta color="#ffffff" color2="#80a2e5" size="20"  className="mr-4 scale-x-[-1]"/>
                    ENVIAR RESPUESTA
                  </p>
                ): (
                  <div className="flex items-start">
                    <IconRespuesta color="#ffffff" color2="#39507fcc" size="20"  className=" mr-4"/>
                    <div className="flex-wrap items-center sm:gap-4">
                      <p className={`font-medium text-sm`}>
                        RESPUESTA 
                        <span className="text-[13px]" > - {formatDateToLocal(consulta.created_at)}</span>
                      </p>
                      <p className="text-sm font-semibold">Asunto: <span className="font-normal">{consultaA[0]}</span></p>
                    </div>
                  </div>
               )}
            </div>
          </div>

          {consulta.respuesta ? (
            <p className='mt-4 mb-6'>{consulta.respuesta}</p>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              <div className="">
                <TextareaCnp
                  id="consulta"
                  name="consulta"
                  rows={1}
                  value={consultaAsunto}
                  className="!text-sm placeholder:text-[#616161] !px-3 sm:!px-4"
                  aria-describedby="consulta-error"
                  placeholder='Asunto...'
                  onChange={(e) => setConsultaAsunto(e.target.value)}
                  required
                />
              </div>
              <div className="relative ">
                <TextareaCnp
                  id="respuesta"
                  name="respuesta"
                  rows={4}
                  defaultValue={respuesta}
                  placeholder="Respuesta..."
                  className={`!text-sm placeholder:text-[#616161] mb-3 !px-3 sm:mb-4 sm:!px-4 `}
                  aria-describedby="respuesta-error"
                  onChange={(e) => setRespuesta(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <form action={formAction}>
            {/* Campos datos*/}
            <div className="hidden flex-col ">
              <textarea
                id="consulta"
                name="consulta"
                value={consultaEmail}
                aria-describedby="consulta-error"
                required
                readOnly
              />

              <textarea
                id="respuesta"
                name="respuesta"
                value={respuesta}
                aria-describedby="respuesta-error"
                required
                readOnly
              />

              <input 
                name="updated_at" 
                id="updated_at" 
                type="text"
                defaultValue= { new Date().toISOString() }
                readOnly
              />
            </div>

            {/* msj error*/}
            <div aria-live="polite" aria-atomic="true">
              {state.message ? (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              ) : null}
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href="/dashboard/consultas"
                className={`flex h-10 items-center rounded-lg bg-[#ffffffcc] px-4 text-sm font-medium text-gray-500 transition-colors hover:bg-[#ffffff] hover:text-gray-800 ${consulta.respuesta && "hidden"}`}
              >
                Cancelar
              </Link>
              {!consulta.respuesta && (
                <ButtonA 
                  type="submit"
                  onClick={() => {
                  handleClickButton()
                  }}
                  disabled= {!respuesta || !consultaAsunto ? true : false}
                  className={`${isPending && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"} disabled:!opacity-55 relative overflow-hidden `}
                  >
                  Enviar respuesta</ButtonA>
              )}
            </div>
          </form>
        </Frente>

        {/* Email Consulta */}
        {!consulta.respuesta && (
          <Frente className={`block py-4 mb-4 px-4 text-sm sm:px-4 `} >
            <div className="w-full items-start flex gap-3 justify-end sm:items-center sm:mb-0">
              <div className={`flex items-center gap-4 w-full text-[15px] sm:text-base`}>
                <IconEnvioEmail  className="w-9 h-4 fill-[#50073aaa]" size={32} />
                <p>Email - Respuesta</p>
              </div>

              <Button
                className="relative h-[30px] rounded-md border border-[#e9dae9] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#1d0215aa] hover:bg-[#ffffff] hover:text-[#1d0215dd] hover:border-[#d8c0d7] active:!bg-[#eee]"
                onClick={() => { setEstadoRegistrar(!estadoRegistrar)}}
                data-testid="edit-button"
                data-active={state}
                type='button'
              >
                {estadoRegistrar ? "Cerrar" :  <div><span className="text-[12px] uppercase">Ver</span></div> }
              </Button>
            </div>
            
            <div
              className={clsx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
                {
                  "max-h-[1000px] opacity-100 pt-4": estadoRegistrar,
                  "max-h-0 opacity-0": !estadoRegistrar,
                  "invisible": !estadoRegistrar,
                }
              )}
            >
              <form action={handleFormRespuesta}  className="rounded-lg w-full p-4 ">
                <div className="flex items-start w-full mb-4 gap-3">
                  <p className="mt-2 leading-none text-[13px]">
                    Para
                  </p>
                  <div className="flex flex-col gap-1 w-full">
                    <InputCnp 
                      type="text" 
                      name="to_name" 
                      placeholder="Nombre" 
                      className="h-8 !text-sm "
                      value={userMember?.name}
                      autoFocus
                      required
                      readOnly
                      >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[28px] left-0 top-0 bg-[#00000007]" >
                        <span className={`absolute w-3 font-semibold left-[9px] top-1.5 opacity-40 text-[#1d021599]  `}>
                        </span>
                        <IconCuenta 
                          color="#50073a50"
                          className="w-5 absolute top-[7px] left-[5px]"
                        />
                      </div>
                    </InputCnp>
                    <InputCnp 
                      type="email" 
                      name="to_email" 
                      placeholder="Email" 
                      className="h-8 !text-sm " 
                      value=/* {userMember?.email} */"agrotecnicog@gmail.com"
                      required
                      readOnly
                      >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[28px] left-0 top-0 bg-[#00000007]" >
                        <span className={`absolute w-3 font-semibold left-[9px] top-1.5 opacity-40 text-[#1d021599] `}>
                        </span>
                        <IconEmail2 
                          color="#50073a50"
                          className="w-4 absolute top-[9px] left-1.5"
                          />
                      </div>
                    </InputCnp>
                  </div>
                </div>

                <div className="flex flex-col gap-1 mb-4">
                  <fieldset className="flex flex-col">
                    <label
                      className="text-start text-[13px] "
                      htmlFor="title"
                    >
                      Asunto
                    </label>
                    <TextareaCnp 
                      name="title" 
                      className="!pl-4 !text-sm"
                      rows={1}
                      value={`Consulta: "${consultaAsunto}"`}
                      required
                      readOnly
                      >
                      <div className="w-0" >
                      </div>
                    </TextareaCnp>
                  </fieldset>

                  <fieldset>
                    <label
                      className="text-start text-[13px] "
                      htmlFor="content"
                    >
                      Respuesta
                    </label>
                    <TextareaCnp
                      name="content" 
                      placeholder="Respuesta..." 
                      className=" !pl-4 !text-sm"
                      value={respuesta}
                      rows={3}
                      required
                      readOnly
                    />
                  </fieldset>

                  <fieldset className="flex flex-col">
                    <label
                      className="text-start text-[13px] "
                      htmlFor="consulta"
                    >
                      Consulta
                    </label>
                    <TextareaCnp 
                      name="consulta" 
                      placeholder="Consulta..." 
                      className="!pl-4 !text-sm"
                      rows={3}
                      value={extrConsulta}
                      required
                      readOnly
                      >
                      <div className="w-0" >
                      </div>
                    </TextareaCnp>
                  </fieldset>
                </div>

                <button 
                  type="submit" 
                  ref={buttonRef}
                  className="hidden py-1">
                  Enviar
                </button>
              </form>
            </div>
          </Frente>
        )}
      </div>
    </>
  );
}
