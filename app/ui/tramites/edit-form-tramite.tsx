'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosurePanel } from '@headlessui/react'
import clsx from 'clsx';
import { useState, useRef } from 'react';

import { Tramite } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { updateTramite, StateUpdateTramite } from '@/app/lib/actions';
import { User } from '@/app/lib/definitions';
import {InputCnp} from "@/app/ui/uiRadix/input-cnp"
import { Frente } from '@/app/ui/marcos';
import useToggleState from "@/app/lib/hooks/use-toggle-state"
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import { ButtonA } from "@/app/ui/button";
import { handleFormPresupuesto } from "@/app/lib/actions";
import IconEmail2 from "@/app/ui/logosIconos/icon-email2";
import IconEnvioEmail from '@/app/ui/logosIconos/icon-envio-email';
import IconAdjunto from "@/app/ui/logosIconos/icon-adjunto";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";


export default function EditTramiteForm({
   tramite,
   userMember,
  }: { 
    tramite: Tramite;
    userMember: User | undefined
  }) {

    const [successState, setSuccessState] = useState(false)
    const [estadoRegistrar, setEstadoRegistrar] = useState(false)
    const [pago, setPago] = useState("pendiente")
    const [finalizado, setFinalizado] = useState("")

    const [aranceles, setAranceles] = useState("")
    const [viaticos, setViaticos] = useState("")
    const [honorarios, setHonorarios] = useState("")
    const [gastos, setGastos] = useState("")
    const [impuestos, setImpuestos] = useState("")

    const { state, close, toggle } = useToggleState()

    const presupuesto= Number(honorarios) + Number(aranceles) + Number(viaticos) + Number(gastos) + Number(impuestos)

    const clearState = () => {
      setSuccessState(false)
    }

    const handleToggle = () => {
      clearState()
      setTimeout(() => toggle(), 100)
    }

  const id= tramite.id

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const archivosAdjuntos= tramite?.documentos_url
  const archivos: string[] = JSON.parse(`${archivosAdjuntos}`)
  const infoAdjuntos= tramite?.informacion!

  const initialState: StateUpdateTramite = { message: null, errors: {} };
  const updateTramiteWithId = updateTramite.bind(null, id);
  const [statex, formAction, isPending] = useActionState(updateTramiteWithId, initialState);

  
  return (
    <div className="flex flex-col justify-between ">
      <div className="flex flex-col">
        <div className=" flex items-center ">
          <div className=" relative mr-4" data-testid="image-container">
            {userMember?.image ? (
                <img
                  decoding="async" 
                  src= {userMember?.image}
                  className="rounded-full bg-cover h-14 bject-cover w-full " alt="header-image-profile">
                  
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
              <div className="">{userMember?.email}</div>
              {!userMember?.email_verified && 
              <span className='ml-2 text-red-700'>no verificado</span>
              }
            </div>
          </div>
        </div>

        <div className="flex items-center flex-nowrap gap-2 my-5 leading-tight">
          <img 
              src= "/dnrpa.png" 
              alt="icono trámites" 
              width={26} 
              height={"auto"}
              className="opacity-50 mt-1 mb-auto w-3 sm:w-[14px] sm:mt-0.5" 
            />

          <div className="flex flex-wrap gap-3 items-center">
            <h1 className=" text-start text-[#39507fcc] font-semibold leading-tight tracking-tighter text-base sm:text-lg sm:text-[22px] md:leading-none ">
              {tramite.tramite}
            </h1>

            <div className="flex gap-[1px] w-28 h-[14px] bg-[#ffffff] rounded-lg">
              <div className="flex items-center justify-center text-[10px] text-white text-center w-7 bg-[#39507f] rounded-l-lg ">
                1
              </div>
              <div className={`flex items-center justify-center text-[10px] text-center w-7  ${tramite.estado === "presupuestado" || tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado"  ? "bg-[#39507f] text-white" : "bg-white text-[#1d0215cc]" } `}>
                2
              </div>
              <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ tramite.estado === "iniciado" || tramite.estado === "cancelado" || tramite.estado === "terminado" ? "bg-[#39507f] text-white" : "bg-white text-[#1d0215cc]" } `}>
                3
              </div>
              <div className={`flex items-center justify-center text-[10px] text-center w-7 ${ tramite.estado === "cancelado" || tramite.estado === "terminado"  ? "bg-[#39507f] text-white" : "bg-white text-[#1d0215cc]" } rounded-r-lg `}>
                4
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* adjuntos*/}
      <Frente className="py-4 mb-2 px-3 text-sm sm:px-4" >
        <div className="w-full items-start flex gap-3 justify-end sm:items-center sm:mb-0">
          <div className={`flex items-center gap-4 w-full text-sm`}>
            <IconAdjunto className="w-[18px]" />
            <p className=" text-[#39507F]">ADJUNTOS</p>
          </div>

          <Button
            className="relative h-[30px] rounded-md border border-[hsl(220,25%,88%)] min-h-[24px] w-[72px] justify-center bg-[#ffffffaa] !px-2.5 py-1 text-[13px] !font-normal text-[#020b1daa] hover:bg-[#ffffff] hover:text-[#020b1ddd] hover:border-[#c0c8d8] active:!bg-[#eee]"
            onClick={() => { handleToggle()}}
            data-testid="edit-button"
            data-active={state}
            type='button'
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
                "max-h-[1000px] opacity-100 ": state,
                "max-h-0 opacity-0 ": !state,
                "invisible": !state,
              }
            )}
          >
            <div className={`flex flex-col mt-0 mb-3 text-[#ffffffcc] gap-2 ${state && "mt-4"} sm:flex-row`}>
              <div className="bg-[#020b1d] p-2 rounded-lg flex flex-col gap-2 flex-wrap justify-start sm:p-3 sm:w-1/2">
                <div className="text-[15px] sm:text-base">
                  Documentos
                </div>
                <div className="flex gap-5 items-baseline">
                  {archivos?.map((archivo, index) => (
                    <div key={index } className=" text-[13px] leading-[18px] ">
                      
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
                          className="rounded bg-[#020b1d] opacity-80 w-24 border border-[#777] hover:opacity-100   " />
                      </Link>
                    </div> 
                  ))}
                </div>
              </div>

              <div className="bg-[#020b1d] p-2 rounded-lg flex flex-col gap-2 flex-wrap justify-start sm:p-3 sm:w-1/2">
                <div className="text-[15px] sm:text-base">
                  Información
                </div>
                <div className="flex flex-col gap-1 ">
                  <div className=" text-sm  ">
                    {infoAdjuntos}
                  </div> 
                </div>
              </div>
            </div>
          </DisclosurePanel>
        </Disclosure>
      </Frente>

      {/* Tarea estado*/}
      {tramite.estado === "cancelado" || tramite.estado === "terminado" ? (
        <Frente className="py-4 mb-2 px-3 text-[15px] sm:text-base sm:px-4" >
          <p>Trámite {tramite.estado} </p> 
        </Frente>
      ) : (
        <Frente className={`py-4 mb-4 px-3 text-sm sm:px-4 ${!userMember?.email_verified && "hidden"} `} >
          <div className="w-full items-start flex gap-3 justify-end sm:items-center sm:mb-0">
            <div className={`flex w-full text-sm `}>
              {tramite.estado === 'presupuestar' && (
                <div className="flex gap-3 ">
                  <div className={`text-[13px] px-[8px] rounded-[4px] text-[#ffffff] bg-[#39507f]`}>2</div>
                  <p className="text-[#39507f] ">CALCULAR PRESUPUESTO</p>
                </div>
              )}
              {tramite.estado === 'presupuestado' && (
                <div className="flex gap-3 ">
                  <div className={`text-[13px] px-[8px] rounded-[4px] text-[#ffffff] bg-[#39507f]`}>3</div>
                  <p className="text-[#39507f] ">CHEQUEAR PAGO</p>
                </div>
              )}
              {tramite.estado === 'iniciado' && (
                <div className="flex gap-3 ">
                  <div className={`text-[13px] px-[8px] rounded-[4px] text-[#ffffff] bg-[#39507f]`}>4</div>
                  <p className="text-[#39507f] ">TERMINAR TRÁMITE</p>
                </div>
              )}
            </div>
          </div>

          <div className="">
            { tramite.estado === "presupuestar" && (
              <div className="p-3 my-4 w-full bg-[#ffffff] sm:p-4">
                <fieldset className="flex my-2 items-end justify-between text-sm">
                  <label
                    className=""
                    htmlFor="aranceles"
                  >
                    Aranceles
                  </label>
                  <div className="h-7 border-dashed border-b border-b-[#50073a33] mx-4 w-full"></div>
                  <InputCnp
                    className="!px-3 h-7 !pb-0 !w-36 text-end !text-sm sm:text-[13px]"
                    ancho="w-max"
                    id="aranceles"
                    type="text"
                    name="aranceles"
                    value= {aranceles}
                    placeholder= "0.00"
                    required
                    onChange={(e) => {
                      setAranceles(e.target.value)
                    }}
                    onBlur={(e) => setAranceles(Number(e.target.value).toFixed(2))}
                  >
                    <div className={`absolute rounded-l-[4px] h-[28px] w-[32px] left-0 bg-[#1d02150b] $ `}>
                    </div>
                    <p className="text-sm text-[#1d0215aa] absolute left-2.5 top-1">$</p>
                  </InputCnp>
                </fieldset>
                <fieldset className="flex my-2 items-end justify-between text-sm">
                  <label
                    className=""
                    htmlFor="viaticos"
                  >
                    Viaticos
                  </label>
                  <div className="h-7 border-dashed border-b border-b-[#50073a33] mx-4  w-full"></div>
                  <InputCnp
                    className="!px-3 h-7 !pb-0 !w-36 text-end !text-sm sm:text-[13px]"
                    ancho="w-max"
                    id="viaticos"
                    type="text"
                    name="viaticos"
                    value= {viaticos}
                    placeholder= "0.00"
                    required
                    onChange={(e) => {
                      setViaticos(e.target.value)
                    }}
                    onBlur={(e) => setViaticos(Number(e.target.value).toFixed(2))}
                  >
                    <div className={`absolute rounded-l-[4px] h-[28px] w-[32px] left-0 bg-[#1d02150b] $ `}>
                    </div>
                    <p className="text-sm text-[#1d0215aa] absolute left-2.5 top-1">$</p>
                  </InputCnp>
                </fieldset>
                <fieldset className="flex my-2 items-end justify-between text-sm">
                  <label
                    className=""
                    htmlFor="honorarios"
                  >
                    Honorarios
                  </label>
                  <div className="h-7 border-dashed border-b border-b-[#50073a33] mx-4  w-full"></div>
                  <InputCnp
                    className="!px-3 h-7 !pb-0 !w-36 text-end !text-sm sm:text-[13px]"
                    ancho="w-max"
                    id="honorarios"
                    type="text"
                    name="honorarios"
                    value= {honorarios}
                    placeholder= "0.00"
                    required
                    onChange={(e) => {
                      setHonorarios(e.target.value)
                    }}
                    onBlur={(e) => setHonorarios(Number(e.target.value).toFixed(2))}
                  >
                    <div className={`absolute rounded-l-[4px] h-[28px] w-[32px] left-0 bg-[#1d02150b] $ `}>
                    </div>
                    <p className="text-sm text-[#1d0215aa] absolute left-2.5 top-1">$</p>
                  </InputCnp>
                </fieldset>
                <div className="flex my-2 items-end justify-end text-sm">
                    <p className="mr-4">Sub-total</p>
                    <p className="px-3 py-1 !w-36 text-end text-sm">
                      {(Number(honorarios) + Number(aranceles) + Number(viaticos)).toLocaleString("es-AR", {
                        style: 'currency',
                        currency: "ARS",
                      }) }
                    </p>
                </div>

                <fieldset className="flex my-2 items-end justify-between text-sm">
                  <label
                    className=""
                    htmlFor="gastos"
                  >
                    Gastos
                  </label>
                  <div className="h-7 border-dashed border-b border-b-[#50073a33] mx-4  w-full"></div>
                  <InputCnp
                    className="!px-3 h-7 !pb-0 !w-36 text-end !text-sm sm:text-[13px]"
                    ancho="w-max"
                    id="gastos"
                    type="text"
                    name="gastos"
                    value= {gastos}
                    placeholder= "0.00"
                    required
                    onChange={(e) => {
                      setGastos(e.target.value)
                    }}
                    onBlur={(e) => setGastos(Number(e.target.value).toFixed(2))}
                  >
                    <div className={`absolute rounded-l-[4px] h-[28px] w-[32px] left-0 bg-[#1d02150b] $ `}>
                    </div>
                    <p className="text-sm text-[#1d0215aa] absolute left-2.5 top-1">$</p>
                  </InputCnp>
                </fieldset>
                <fieldset className="flex my-2 items-end justify-between text-sm">
                  <label
                    className=""
                    htmlFor="impuestos"
                  >
                    Impuestos
                  </label>
                  <div className="h-7 border-dashed border-b border-b-[#50073a33] mx-4  w-full"></div>
                  <InputCnp
                    className="!px-3 h-7 !pb-0 !w-36 text-end !text-sm sm:text-[13px]"
                    ancho="w-max"
                    id="impuestos"
                    type="text"
                    name="impuestos"
                    value= {impuestos}
                    placeholder= "0.00"
                    required
                    onChange={(e) => {
                      setImpuestos(e.target.value)
                    }}
                    onBlur={(e) => setImpuestos(Number(e.target.value).toFixed(2))}
                  >
                    <div className={`absolute rounded-l-[4px] h-[28px] w-[32px] left-0 bg-[#1d02150b] $ `}>
                    </div>
                    <p className="text-sm text-[#1d0215aa] absolute left-2.5 top-1">$</p>
                  </InputCnp>
                </fieldset>
                <div className="flex my-2 items-end justify-end text-sm">
                    <p className="mr-4">Total</p>
                    <p className="px-3 py-1 !w-36 text-end text-sm">
                      {presupuesto.toLocaleString("es-AR", {
                        style: 'currency',
                        currency: "ARS",
                      })}
                    </p>
                </div>
              </div>
            )}

            { tramite.estado === "presupuestado" && (
              <fieldset>
                <div className="rounded-md border-gray-200 bg-[#f7f7f700] px-[14px] py-3 my-2">
                  <div className="flex gap-8">
                    <div className={`relative border rounded-lg flex items-center ${pago === "pendiente" ? " text-[#ffffffcc] border-[#548eff58] bg-[#548eff]" : "bg-[#eaeaea] text-[#020b1d77] border-[#dbdbdb]" } hover:border-[#548eff58]`}>
                      <input
                        id="pendiente"
                        name="status"
                        type="radio"
                        value="pendiente"
                        defaultChecked= {pago === 'pendiente'}
                        className="absolute hidden h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        onChange={(e) => {
                          setPago(e.target.value)
                        }}
                      />
                      <label
                        htmlFor="pendiente"
                        className={`flex cursor-pointer items-center gap-1.5 px-3 py-1 text-sm font-medium `}
                      >
                        Pendiente <ClockIcon className="h-4 w-4" />
                      </label>
                    </div>
                    <div className={`relative border rounded-lg flex items-center ${pago === "pendiente" ? "bg-[#eaeaea] text-[#020b1d77] border-[#dbdbdb]" : " text-[#ffffffcc] border-[#548eff58] bg-[#548eff]"} hover:border-[#548eff58]`}>
                      <input
                        id="pagado"
                        name="status"
                        type="radio"
                        value="pagado"
                        defaultChecked= {pago === 'pagado'}
                        className="absolute hidden h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                        onChange={(e) => {
                          setPago(e.target.value)
                        }}
                      />
                      <label
                        htmlFor="pagado"
                        className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 text-sm font-medium `}
                      >
                        Pagado <CheckIcon className="h-4 w-4" />
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            )}

            { tramite.estado === "iniciado" && (
              <div className="flex flex-wrap items-center gap-1 my-2 py-4">
                <label htmlFor="select" className="mr-2">Selecciona una opción:</label>
                <select 
                  id="select" 
                  className="text-sm rounded-[4px] px-4 py-0 w-max h-8 border border-[#d9dee8] bg-[#ffffff] text-[#000000] opacity-70 transition-[opacity,shadow] duration-150 ease-in sm:text-base hover:opacity-90 hover:border-[#3767c847] focus:border-transparent focus:opacity-100 focus:[box-shadow:_0px_0px_0px_1px_#548eff] focus:outline-1 focus:outline-[#548eff66] focus:outline-offset-2 focus:placeholder:opacity-40 placeholder:text-sm  placeholder:text-[#858585]  "
                  onChange={(e) => {
                    setFinalizado(e.target.value);
                  }}
                >
                  <option value="">Selecciona</option>
                  <option value="terminado">Terminado</option>
                  <option value="cancelado">Cancelado</option>
                </select>

              </div>
            )}
          </div>

          <form action={formAction} >
            {/* Campos datos hidden*/}
            <div className="hidden flex-col ">
              <input
                name="presupuesto"
                id="presupuesto"
                type= "number"
                value={tramite.presupuesto ? tramite.presupuesto/100 :  presupuesto}
                aria-describedby="respuesta-error"
                required
                readOnly
              /> 
              <input 
                name="estado" 
                id="estado"
                type="text"
                value= {
                  tramite.estado === "presupuestar" ? "presupuestado" : 
                  tramite.estado === "presupuestado" ? "iniciado" : 
                  tramite.estado === "iniciado" ? finalizado  : undefined
                }
                readOnly
              />
              <input 
                name="budgeted_at" 
                id="budgeted_at" 
                type="text"
                value= { tramite.budgeted_at ? new Date(tramite.budgeted_at).toISOString() : tramite.estado === "presupuestar" ? new Date().toISOString()  : ""}
                readOnly
              />
              <input 
                name="started_at" 
                id="started_at" 
                type="text"
                value= { tramite.started_at ? new Date(tramite.started_at).toISOString() : tramite.estado === "presupuestado" ? new Date().toISOString()  : ""}
                readOnly
              />
              <input 
                name="finished_at" 
                id="finished_at" 
                type="text"
                value= { tramite.estado === "iniciado" && finalizado === "terminado" ? new Date().toISOString() : ""}
                readOnly
              />
              <input 
                name="canceled_at" 
                id="canceled_at" 
                type="text"
                value= { tramite.estado === "iniciado" && finalizado === "cancelado" ? new Date().toISOString() : ""}
                readOnly
              />
            </div>
            
            {/* msj error*/}
            <div aria-live="polite" aria-atomic="true">
              {statex.message ? (
                <p className="mt-2 text-sm text-red-500">{statex.message}</p>
              ) : null}
            </div>
              <div className="flex justify-end gap-4">
                <Link
                  href="/dashboard/tramites"
                  className={`flex h-10 items-center rounded-lg bg-[#ffffffcc] px-4 text-sm font-medium text-gray-500 transition-colors hover:bg-[#ffffff] hover:text-gray-800 `}
                >
                  Cancelar
                </Link>
                <ButtonA 
                  type="submit" 
                  className={`${isPending && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"} disabled:!opacity-55 relative overflow-hidden`}
                  onClick={() => {
                    handleClickButton()
                  }}
                  disabled= {pago === "pendiente" && !presupuesto && !finalizado ? true : false}
                >
                  Editar Tramite
                </ButtonA>
              </div>
            {/* )} */}
          </form>
        </Frente>
      )}

      {/* E-mail presupuesto*/}
      {tramite.estado === "presupuestar" && (
        <Frente className={`hidden py-4 mb-4 px-4 text-sm sm:px-4 `} >
          <div className="w-full items-start flex gap-3 justify-end sm:items-center sm:mb-0">
            <div className={`flex items-center gap-4 w-full text-[15px] sm:text-base`}>
              <IconEnvioEmail  className="w-9 h-4 fill-[#50073aaa]" size={32} />
              <p>Email - Presupuesto</p>
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
          <Disclosure>
            <DisclosurePanel
              static
              className={clsx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
                {
                  "max-h-[1000px] opacity-100 pt-4": estadoRegistrar,
                  "max-h-0 opacity-0": !estadoRegistrar,
                  "invisible": !estadoRegistrar,
                }
              )}
            >
              <form action= {handleFormPresupuesto}  className="rounded-lg w-full p-4 ">
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
                      value={`Presupuesto Trámite "${tramite.tramite}"`}
                      required
                      readOnly
                      >
                      <div className="w-0" >
                      </div>
                    </TextareaCnp>
                  </fieldset>

                  <fieldset className="flex flex-col">
                    <label
                      className="text-start text-[13px] "
                      htmlFor="content"
                    >
                      Precio $
                    </label>
                    <InputCnp 
                      type="text" 
                      name="content" 
                      placeholder="Asunto" 
                      className="h-8 !pl-4 !text-sm"
                      value={presupuesto.toLocaleString("es-Ar")}
                      required
                      readOnly
                      >
                      <div className="w-0" >
                      </div>
                    </InputCnp>
                  </fieldset>

                  <fieldset className="flex flex-col">
                    <label
                      className="text-start text-[13px]"
                      htmlFor="validez"
                    >
                      Validez (días)
                    </label>
                    <InputCnp
                      type="text" 
                      name="validez" 
                      placeholder="7" 
                      className="h-8 !pl-4 !text-sm"
                      value={"7"}
                      required
                      readOnly
                      >
                      <div className="w-0" >
                      </div>
                    </InputCnp>
                  </fieldset>

                  <fieldset className="flex flex-col">
                    <label
                      className="text-start text-[13px] "
                      htmlFor="tramite"
                    >
                      Trámite
                    </label>
                    <InputCnp 
                      type="text" 
                      name="tramite" 
                      placeholder="Trámite" 
                      className="h-8 !pl-4 !text-sm"
                      value={tramite.tramite}
                      required
                      readOnly
                      >
                      <div className="w-0" >
                      </div>
                    </InputCnp>
                  </fieldset>
                </div>

                <button 
                  type="submit" 
                  ref={buttonRef}
                  className="hidden py-1">
                  Enviar
                </button>
              </form>
            </DisclosurePanel>
          </Disclosure>
        </Frente>
      )}
    </div>
  );
}
