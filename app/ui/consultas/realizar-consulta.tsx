'use client';

import { useFormState } from 'react-dom';
import { FormEvent, useState, useEffect, useMemo, useRef } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { User } from '@/app/lib/definitions';
import Link from 'next/link';

import IconConsultaRight from "@/app/ui/logosIconos/icon-consulta-right"
import { createConsulta, StateConsulta } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import useToggleState from "@/app/lib/hooks/use-toggle-state";
import IconCambio from '@/app/ui/logosIconos/icon-cambio';
import IconArchivo from '@/app/ui/logosIconos/icon-archivo';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import { ButtonB, ButtonA, Button } from '@/app/ui/button';
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconRegistro from "@/app/ui/logosIconos/icon-registro"
import { createUser, StateUser } from '@/app/lib/actions';
import IconEnvioEmail from '../logosIconos/icon-envio-email';
// import { handleFormRegistro } from '@/app/lib/actions';
// import { handleFormPedido } from '@/app/lib/actions';


export default function RealizarConsulta( { user }: { user: User | undefined } ) {
  
  const [consulta, setConsulta] = useState('');
  const [successState, setSuccessState] = useState(false)

  const [imageUrl, setImageUrl] = useState<string>("");
  const [spin, setSpin] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);

  const [name, setName] = useState(`${user?.name}`);
  const [email, setEmail] = useState(`${user?.email}`);

  const [open, setOpen] = useState(false);
  const [openConsulta, setOpenConsulta] = useState(true);
  const [emailSession, setEmailSession] = useState(false);

  const [estadoRegistrar, setEstadoRegistrar] = useState(false)


  const { state, close, toggle } = useToggleState()
  const maxNumber = 2;

  const buttonRefRegistro = useRef<HTMLButtonElement>(null);
  const handleClickButtonRegistro= () => {
    if (buttonRefRegistro.current) buttonRefRegistro.current.click()
  };

  const buttonRefPedido = useRef<HTMLButtonElement>(null);
  const handleClickButtonPedido= () => {
    if (buttonRefPedido.current) buttonRefPedido.current.click()
  };

  const files: File[]= []
  images.map((image) => {
    files.push(image.file!)
  })

  const buttonyRef = useRef<HTMLButtonElement>(null);
  const handleClickButton= () => {
    if (buttonyRef.current) buttonyRef.current.click()
  };

  const enviarConsulta= () => {
    setTimeout(handleClickButton, 200) 
    setTimeout(() => setSpin(false), 200) 
  }

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };
  

  const clearState = () => {
    setSuccessState(false)
  }

  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      enviarConsulta();
    } catch (error) {
      console.error(error);
    }
  };

  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    try {
      const data = new FormData();

      {files.map((file, index) => {
        data.append(`file${index}`, file );
      })}
      const response = await fetch('/api/upload-query', {
        method: 'POST',
        body: data,
      });
      const responseData = await response.json();

      const polo: string[]= responseData.urls

      const respon= JSON.stringify(polo )

      setImageUrl(respon);
      if (response.ok) {
        console.log('File uploaded successfully');
      }

      enviarConsulta();

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };

  const renderFilePreview = (file: File ) => { 
    const fileType = file?.type; 
    if (fileType.startsWith('image/')) { 
      return ( 
        <img 
          src={URL.createObjectURL(file)} 
          alt={file.name} 
          className="min-h-[80px] object-contain bg-[#ffffffaa] w-20 border border-[#1d021544] [border-radius:_6px_6px_0_6px] " />
      ); 
      } else if ( fileType === 'application/pdf' ) { 
        return ( 
        <embed 
          src={URL.createObjectURL(file)} 
          type="application/pdf" 
          className="min-h-[80px] object-contain bg-[#ffffffaa] w-[80px] h-[100px]  border border-[#1d021544]  [border-radius:_6px_6px_0_6px] " />
        ); 
      } else { return ( 
      <p className=" text-[#fff] break-words p-2 text-xs text-left">
         Tipo archivo: <i className="text-[#d9d9d9] text-xs">({fileType})</i>
      </p> 
      ); 
    }
  }

  useEffect(() => {
    if (successState) {
      close()
    }
    sessionStorage.getItem('name') && setName(`${sessionStorage.getItem('name')}`)
    sessionStorage.getItem('email') && setEmail(`${sessionStorage.getItem('email')}`)
    if (sessionStorage.getItem('email')) {
      setEmailSession(true);
    }
  }, [successState, close, name, email ])

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, dispatchx] = useFormState(createUser, initialStatex);

  const initialState: StateConsulta = { message: null, errors: {} };
  const [estado, dispatch] = useFormState(createConsulta, initialState);


  return (
    <>
      {/* consult */}
      <Frente className=" p-2 text-small-regular !bg-[#1d021513] sm:p-4 ">
        <div  className="flex items-center justify-between sm:flex-row" >
          <div className="relative flex items-center">
            <IconConsultaRight className="opacity-80 ml-1.5 h-[36px] w-[30px] stroke-1 sm:ml-3 " />
            <div className="absolute top-[1px] left-6 text-[#ffffff] text-xs sm:left-[30px]">?</div>
            <p className="ml-4 text-sm text-[#50073aaa]">Consulta <span className=" text-[#d400aa]">*</span></p>
          </div>
          <ButtonB
            className={`h-8 text-[13px] w-max `}
            onClick={() => { 
              setConsulta('')
              setOpenConsulta(!openConsulta)
            }}
            data-testid="edit-button"
            type='button'
          >
            {openConsulta ? ( 'Cancelar' ) : ( <div> {' '} Realizar <span className="text-xs uppercase">Consulta</span>
              </div> )}
          </ButtonB>
        </div>

        <div 
          className={clsx('mt-0 overflow-visible transition-[max-height,opacity] duration-300 ease-in-out',
            {
              'max-h-[1000px] opacity-100 mt-4': openConsulta,
              'max-h-0 opacity-0 invisible': !openConsulta,
            },
          )}>
          <TextareaCnp
            className={` ${consulta && "opacity-90"}`}
            id="consulta"
            name="consulta"
            placeholder= "..."
            required
            rows={4}
            maxLength={1024}
            wrap="hard"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
            }}
            autoFocus
          />
        </div>
      </Frente>

      {/* adjuntar archivos */}
      <Frente className={`flex flex-col mt-2 text-small-regular !p-2 !bg-[#1d021513] ${!state && 'pb-0'} sm:!p-4 `}>
        <div className={`flex items-center justify-between mb-0`} >
          <IconArchivo className="opacity-80 ml-1.5 w-[26px] stroke-1 sm:ml-3 " />
          <ButtonB
            className={`h-8 text-[13px] w-max`}
            onClick={() => {
              handleToggle();
              setImages([]);
            }}
            type={state ? 'reset' : 'button'}
            data-testid="edit-button"
            data-active={state}
          >
            {state ? ( 'Cancelar' ) : ( <div> {' '} Adjuntar <span className="text-xs uppercase">Archivos</span>
              </div> )}
          </ButtonB>
        </div>

        <Disclosure>
          <DisclosurePanel
            static
            className={clsx(' overflow-visible transition-[max-height,opacity] duration-300 ease-in-out',
              {
                'max-h-[1000px] opacity-100 mt-2 sm:mt-4 ': state,
                'max-h-0 opacity-0 mt-0': !state,
              },
            )}
            >
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              // onError={onError}
              maxNumber={maxNumber}
              dataURLKey="data_url"
              maxFileSize= {4000000}
              acceptType={["jpg", "png", "pdf"]}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                errors,
              }) => (
                <div className={`flex flex-col bg-[#4f2642] rounded-lg ${!images.length ? 'gap-0' : 'gap-0.5'} ${!state && "invisible"} `} >
                  <button
                    type="button"
                    onClick={onImageUpload}
                    {...dragProps}
                    className={`group rounded-lg w-full disabled:!cursor-default `}
                    disabled= {!state}
                  >
                    <div className={`relative label-dnd  ${!images.length ? 'rounded-lg' : 'rounded-t-lg'} bg-[#1d0215] text-[#ffffffdd] w-full p-2 duration-150 text-sm flex flex-col justify-center items-center active:opacity-80 sm:p-4 `}>
                      <div className="flex flex-col items-center duration-150 opacity-80 group-hover:opacity-100 min-[512px]:flex-row ">
                        <IconDragDrop className= "w-9 opacity-80  min-[512px]:mr-7" />
                        <div>
                          Click y elegí un archivo o arrastralo y sueltá aquí <br />
                          <p className="text-xs mt-1.5 text-[#ffffffbb]">Máximo: <b>{maxNumber} </b> archivos <b>jpg</b>, <b>png</b> o <b>pdf</b> <span className="">(de una sola página)</span>  <br />Tamaño Max de cada archivo: <b>4 MB</b>
                            </p>
                        </div>
                      </div>
                      {errors && (
                        <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] ${!state && "hidden"} border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] py-0.5 px-2 bg-[#91359185] rounded-xl `}>
                          {errors.maxNumber && (
                            // <span>La cantidad excede el máximo permitido</span>
                            <span>Cantidad máxima: {maxNumber} archivos</span>
                          )}
                          {errors.acceptType && (
                            <span>El tipo de archivo no está permitido</span>
                          )}
                          {errors.maxFileSize && (
                            <span>El tamaño excede el máximo permitido</span>
                          )}
                          {errors.resolution && (
                            <span>
                              La resolución no coincide con la permitida
                            </span>
                          )}
                        </div>
                      )}
                      <div className={`absolute w-full h-full outline-2 outline-dashed outline-[#00000003]  ${isDragging ? '!outline-[#000000cc] bg-[#ffffff33] ' : undefined}  ${!images.length ? 'rounded-lg' : 'rounded-t-lg'} hover:outline-[#0000006e] hover:border-b-2 hover:border-[#ffffff69] hover:border-dashed `}>
                      </div>
                    </div>
                  </button>
                  <div className= "flex flex-col rounded-b-lg bg-[#1d0215] ">
                    <div className= {`flex items-baseline justify-start px-3 gap-x-2 flex-wrap text-sm w-full cursor-default max-[512px]:justify-center sm:px-9 sm:gap-x-4 `}>
                      { images.map((image, index) => (
                        <div key={index} className="flex flex-col items-start pb-4 pt-5">
                          <div className="image-item flex justify-start">

                            {renderFilePreview( image.file! )} 

                            <div className="flex flex-col text-[13px] justify-end gap-0.5 ">
                              <div onClick={() => {
                                onImageUpdate(index)
                                }} className="border border-[#e9dae9] border-l-0 bg-[#d7d7d7] px-1.5 py-0.5 cursor-pointer rounded-e-md duration-200 text-[#1d0215aa] hover:border-[#d8c0d7] hover:text-[#1d0215dd]  hover:bg-[#ffffff] active:bg-[#ffffffaa]  "
                              >
                                Cambiar
                              </div>
                              <div onClick={() => {
                                onImageRemove(index)
                                }} className="border border-[#e9dae9] border-l-0 bg-[#d7d7d7] px-1.5 py-0.5 cursor-pointer rounded-e-md duration-200 text-[#1d0215aa] hover:text-[#1d0215dd] hover:border-[#d8c0d7] hover:bg-[#ffffff] active:bg-[#ffffffaa] "
                                >
                                Eliminar
                              </div>
                            </div>
                          </div>
                          <div className="text-xs break-words w-36 text-[#ffffffee] mt-[3px] opacity-60 text-start ">
                            {image.file?.name } 
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>
          </DisclosurePanel>
        </Disclosure>
      </Frente>

      {/* registrar email */}
      {!user && (
        emailSession === false ? (
          <Frente className="!p-2 mt-2 text-small-regular sm:!p-4 !bg-[#1d021513] ">
            <div className="flex items-center justify-between gap-5">
              <div className="mt-1.5 ">
                <IconRegistro className="opacity-80 w-[24px] ml-1.5 sm:ml-3" />
              </div>
  
              <div className={`w-full text-start text-[14px] text-[#50073aaa] duration-300  `}>
                Dejá tu e-mail para mandarte la respuesta <span className=" text-[#d400aa]">*</span>
              </div>
                
              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setEmail(""); 
                  setName("");
                  sessionStorage.removeItem("email")
                  sessionStorage.removeItem("name")
                }}

                data-testid="edit-button"
                data-active={open}
              >
                {open ? "Cancelar" :  <div className="text-[13px] overflow-auto whitespace-nowrap">Anotar</div>  }
              </ButtonB>
            </div>
            
            <div
              className={clsx(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
                {
                  "max-h-[1000px] opacity-100": open,
                  "max-h-0 opacity-0": !open,
                }
              )}
            >
              {/* create user */}
              <div className={`pt-2 sm:pt-4`}> 
                <form action={dispatchx}>
                  <fieldset className={`flex flex-col items-center gap-2 md:flex-row md:gap-4`}>
                    <InputCnp
                      className="text-sm h-8"
                      id="name"
                      type="text"
                      name="name"
                      minLength={3}
                      maxLength={100}
                      value={name}
                      placeholder= "Nombre"
                      required
                      disabled={ !open  }
                      onChange={(e) => {
                        setName(e.target.value);
                      }} >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#1d02150b]" >
                      </div>
                      <IconCuenta  className="absolute w-[14px] left-[9px] top-[9px] " color="#50073a66" />
                    </InputCnp>
  
                    <InputCnp
                      className={`text-sm h-8 `}
                      id="email"
                      type="email"
                      name="email"
                      minLength={3}
                      maxLength={100}
                      value={email}
                      placeholder= "Email"
                      required
                      disabled={ !open  }
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }} 
                      >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#1d02150b]" >
                      </div>
                      <IconEmail2  className="absolute w-[14px] left-[9px] top-[9px] " color="#50073a66" />
                    </InputCnp>
                  </fieldset>
  
                  <input
                    id="password"
                    type="hidden"
                    name="password"
                    defaultValue={"xxxxxx"}
                    readOnly
                  />
  
                  <input
                    id="confirmPassword"
                    type="hidden"
                    name="confirmPassword"
                    defaultValue={"xxxxxx"}
                    readOnly
                  />
  
                  {/* Massages erros */}
                  <div
                    className="flex items-end relative space-x-8"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {estadox?.message && estadox?.message !== "usuario" && estadox?.message === "Database Error: Error al crear consulta." && (
                      <>
                        <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                        <p className="pt-4 text-sm text-red-500">{estadox?.message}</p>
                      </>
                    )}
                  </div>
  
                  {/* button submit */}
                  <div className="mt-2 text-sm sm:mt-4">
                    <ButtonA
                      className={`h-8 text-[13px] w-max ml-auto ${!open && "hidden"}`}
                      onClick={() => { 
                        email && name && sessionStorage.setItem('name', `${name}`);
                        email && name && sessionStorage.setItem('email', `${email}`);
                        handleClickButtonRegistro()
                      }}
                    >
                      Registrar
                    </ButtonA>
                  </div>
                </form>
              </div>
            </div>
          </Frente>
          ) : (
            <Frente className="p-2 mt-2 text-small-regular sm:p-4 !bg-[#e0e6e1]">
              <div className={`w-full text-start text-[13px] text-[#1d0215dd] transition-[opacity] duration-300 sm:text-sm `}>
                <span className="font-semibold text-sm sm:text-[15px]">{ !estadox.message ? "" : name }</span> Para mandarte la respuesta se registró el e-mail <span className="font-semibold mx-1 text-sm sm:text-[15px] ">{email}</span>
              </div>
            </Frente> 
          )
        )
      }

      {estado?.message === "consultaCreada" && (
        <Frente className="!p-2 mt-2 !bg-[#d7e5d9] sm:!p-4 ">
          <div className={`w-full text-start text-sm text-[#1d0215dd] transition-[opacity] duration-300 sm:text-[15px] `}>
            Recibimos la consulta. Te responderemos a la brevedad.
          </div>
        </Frente> 
      ) }

      {/* Massages error consult */}
      <div
        className="mb-3 mt-3 flex items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {estado?.message && estado?.message !== "consultaCreada" && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{estado?.message}</p>
          </>
        )}
      </div>
      
      {/* crear consulta */}
      <form action={dispatch}>
        {/* archivos Adjuntos */}
        <input
          type="hidden"
          id="archivos_url"
          name="archivos_url"
          value={imageUrl ? imageUrl :  `["https://res.cloudinary.com/dchmrl6fc/image/upload/v1740640515/sin-adjuntos_ut7col.png"]` }
          readOnly
        />
        {/* consulta */}
        <input
          type="hidden"
          id="consulta"
          name="consulta"
          value={consulta}
          readOnly
        />

        {/* email */}
        <input
          type="hidden"
          id="email_id"
          name="email_id"
          value={email}
          readOnly
        />

        <button
          type="submit"
          ref={buttonyRef}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>

      {/* Enviar consult */}
      <div className="w-full flex justify-between items-center">
        <p className={`text-xs ml-2 text-[#1d0215cc] ${consulta && (emailSession || user)  && "opacity-0" } sm:text-[13px]`}><span className=" text-[#d400aa]">*</span> Requeridos</p>

        <div className="flex gap-4">
          <div className={`text-[#1d0215bb] rounded-md ${!emailSession && "hidden"} bg-[#1d02150d] duration-150 hover:bg-[#1d021517] hover:text-[#1d0215]`} >
            <button
              type="button"
              className={` py-1 px-5`}
              onClick={() => {
                sessionStorage.removeItem("email")
                sessionStorage.removeItem("name")
                location.reload()
              }}
            >
              Salir
            </button> 
          </div>

          {estado?.message !== "consultaCreada" ? (
            <form onSubmit={ files.length === 0 ? uploadToServer1 : uploadToServer2 } >
              <div className="group relative w-full flex justify-end items-center">
                <span className={`opacity-0 invisible text-xs text-[#1d0215] absolute bottom-[150%] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-xl duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${consulta && (emailSession || user) ? "" : "group-hover:opacity-100"} sm:text-[13px] group-hover:visible`}><span className="text-base text-[#d400aa]">* </span>Completar requeridos</span>
                <ButtonA
                  className={`h-8 !px-4 text-sm !justify-start disabled:!opacity-60`}
                  type="submit"
                  disabled={ consulta && (emailSession || user) ? false : true }
                  onClick={() => {
                    email && name && sessionStorage.setItem('name', `${name}`);
                    email && name && sessionStorage.setItem('email', `${email}`);
                    setSpin(true);
                    handleClickButtonPedido()
                  }}
                >
                  <IconCambio
                    className={`${spin && "animate-spin"} mr-2 w-[22px] h-[22px] `}
                    fill2="#fffc"
                    fill="#ff00ff"
                  />
                  <div className="w-full">
                    Enviar consulta
                  </div>
                </ButtonA>
              </div>
            </form>
          ) : (
            <div className="flex justify-end items-center gap-4">
              <Link href={"/dashboard/consultas"}>
                <ButtonA
                  className={`h-8 text-sm !justify-start ${!user && "hidden"}`}
                >
                  Ver Consultas
                </ButtonA>
              </Link>

              <ButtonA
                className="h-8 text-sm !justify-start"
                type="button"
                onClick={() => {
                  location.reload()
                }}
              >
                Nueva consulta
              </ButtonA>
            </div>
            )
          }
        </div>
      </div>

      {/* Envio e-mail confirmar registro e-mail */}
      <Frente className={`hidden !bg-[#1d021513] mt-6 py-4 mb-4 px-4 text-sm sm:px-4 `} >
        <div className="w-full items-start flex gap-3 justify-end sm:items-center sm:mb-0">
          <div className={`flex items-center gap-4 w-full text-[15px] sm:text-base`}>
            <IconEnvioEmail  className="w-9 h-4 fill-[#50073aaa]" size={32} />
            <p>Confirmacion de recepcion e-mail</p>
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
          {/* <form action={handleFormRegistro}  className="rounded-lg w-full p-4 ">
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
                  value={name}
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
                  defaultValue="agrotecnicog@gmail.com"
                  // defaultValue= {email} 
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
                  value="Confirmación registro e-mail"
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
                  Mensaje
                </label>
                <TextareaCnp
                  name="content" 
                  placeholder="Mensaje de confirmación" 
                  className=" !pl-4 !text-sm"
                  value={`Para mandarte una Respuesta por tu Consulta se registró el e-mail: ${email}`}
                  rows={3}
                  required
                  readOnly
                />
              </fieldset>
            </div>

            <button 
              type="submit" 
              ref={buttonRefRegistro}
              className="hidden py-1">
              Enviar
            </button>
          </form> */}
        </div>
      </Frente>

      {/* Envio e-mail confirmar recepción consulta */}
      {/* <form action={handleFormPedido}  className="hidden rounded-lg bg-[#50073a66] w-full border border-gray-700 m-4 p-4 ">
        <div className="flex items-start w-full mb-4 gap-3">
          <p className="mt-2 leading-none text-[13px]">
            Para
          </p>
          <div className="flex flex-col gap-1 w-full">
            <input 
              type="text" 
              name="to_name" 
              placeholder="Nombre" 
              value={name}
              required
              readOnly
              />
            
            <input
              type="email" 
              name="to_email" 
              placeholder="Email" 
              value= "agrotecnicog@gmail.com"
              // value=  {email}
              required
              readOnly
              />
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-4">
          <fieldset className="flex flex-col">
            <label htmlFor="title">Asunto</label>
            <textarea
              name="title" 
              rows={1}
              value="Confirmación recepción Consulta"
              required
              readOnly
              />
          </fieldset> 

          <fieldset className="flex flex-col">
            <label htmlFor="content">Mensaje</label>
            <textarea
              name="content" 
              placeholder="Mensaje de confirmación" 
              value={`Recibimos tu consulta: "${consulta}"`}
              rows={3}
              required
              readOnly
            />
          </fieldset>
        </div>

        <button 
          type="submit" 
          ref={buttonRefPedido}
          className="bg-slate-600 text-white p-2">
          Enviar
        </button>
      </form> */}
    </>
  );
}
