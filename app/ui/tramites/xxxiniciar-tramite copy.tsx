'use client';

import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import * as Tabs  from '@radix-ui/react-tabs';
import Link from 'next/link';
import Image from 'next/image'

import { User } from '@/app/lib/definitions';
import { createTramite, StateCreateTramite } from '@/app/lib/actions';

import { Frente } from '@/app/ui/marcos';
import IconCambio from '@/app/ui/logosIconos/icon-cambio';
import { ImageListType} from '@/app/ui/consultas/typings';
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import { ButtonB, ButtonA, Button } from '@/app/ui/button';
import markdownStyles from './markdown-styles.module.css';
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconRegistro from "@/app/ui/logosIconos/icon-registro"
import { createUser, StateUser } from '@/app/lib/actions';
import { TramiteMd } from "@/app/lib/definitions"
import IconEnvioEmail from '../logosIconos/icon-envio-email';
import { handleFormRegistro } from '@/app/lib/actions';
import IconInfo from '../logosIconos/icon-info';
import { handleFormPedido } from '@/app/lib/actions';


export default function IniciarTramite( {
  tramiteMd,
  content,
  user
}: {
  tramiteMd: TramiteMd;
  content: string;
  user: User | undefined;
} ) {
  
  const [tramite, setTramite] = useState('');
  const [imageUrl, setImageUrl] = useState<string>("");
  const [spin, setSpin] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [emailSession, setEmailSession] = useState(false);
  const [info, setInfo] = useState<string | undefined>("")

   const [estadoRegistrar, setEstadoRegistrar] = useState(false)


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const emailValid= emailRegex.test(email)

   const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const documentacions: string[] | undefined = tramiteMd.documentacion?.split(", ")

  const documentos:string[] | undefined= tramiteMd.documentos?.split(", ")
  const informations:string[] | undefined= tramiteMd.informacion?.split(", ")

  const lengthDocumentos= documentos?.length
  const lengthInformations= informations.length 

  // const maxNumber = 5;
  const maxNumber = documentos?.length;

  const buttonRefRegistro = useRef<HTMLButtonElement>(null);
  const handleClickButtonRegistro= () => {
    if (buttonRefRegistro.current) buttonRefRegistro.current.click()
  };

  const buttonRefPedido = useRef<HTMLButtonElement>(null);
  const handleClickButtonPedido= () => {
    if (buttonRefPedido.current) buttonRefPedido.current.click()
  };

  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
  const d = new Date();
  const date= `${months[d.getMonth()]}-${d.getFullYear()}`

  const files: File[]= []
  images?.map((image) => {
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
  
  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setImageUrl(`["https://res.cloudinary.com/dchmrl6fc/image/upload/v1740640515/sin-adjuntos_ut7col.png"]`);

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
  };

  const renderFilePreview = (file: File ) => { 
    const fileType = file?.type; 
    if (fileType.startsWith('image/')) { 
      return ( 
        <Image 
          src={URL.createObjectURL(file)} 
          alt={file.name} 
          width={80}
          height={80}
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
    !tramite && tramiteMd.slug !== "x-Otros" && setTramite(`${tramiteMd.tramite}`);
    sessionStorage.getItem('name') && setName(`${sessionStorage.getItem('name')}`)
    sessionStorage.getItem('nombre') && setName(`${sessionStorage.getItem('nombre')}`)

    sessionStorage.getItem('email') && setEmail(`${sessionStorage.getItem('email')}`)
    if (sessionStorage.getItem('email')) {
      setEmailSession(true);
    }
  }, [tramiteMd, name, email, open, imageUrl ])

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx] = useActionState(createUser, initialStatex);

  const initialState: StateCreateTramite = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createTramite, initialState);

  
  return (
    <>
      <div className="flex items-center pb-3">
        <Image 
          src= "/dnrpa.png" 
          alt="icono trámites" 
          width={26} 
          height={26}
          className="opacity-80 h-[14px] w-[14px] mr-2.5 sm:h-[16px] sm:w-[16px]"
        />
        <h1 className=" text-start text-lg text-[#39507fcc] font-semibold leading-tight tracking-tighter sm:text-[22px] md:leading-none ">
          {tramiteMd.tramite}
        </h1>
      </div>

      <Frente className="!bg-[#020b1d14]  min-h-[200px]">
        <Tabs.Root
          className="flex  flex-col"
          defaultValue="tab1"
        >
          <Tabs.List
            className="flex shrink-0 text-[13px] md:text-[15px]"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="flex bg-[#ffffff63] flex-1 duration-150 cursor-pointer select-none items-center justify-center py-3 px-2.5 leading-none  text-[#020b1d77] outline-none hover:text-[#020b1daa] data-[state=active]:bg-[#f1eef000] data-[state=active]:cursor-default data-[state=active]:text-[#020b1dcc]"
            value="tab1"
            >
              Descripción
            </Tabs.Trigger>

            <Tabs.Trigger
              className="border-x border-[#e6e0e3] flex bg-[#ffffff63] flex-1 duration-150 cursor-pointer select-none items-center justify-center py-3 px-2.5 leading-none  text-[#020b1d77] outline-none hover:text-[#020b1daa] data-[state=active]:bg-[#f1eef000] data-[state=active]:cursor-default data-[state=active]:text-[#020b1dcc]"
              value="tab2"
            >
              Adjuntar Comprobantes
            </Tabs.Trigger>

            <Tabs.Trigger
              className="flex bg-[#ffffff63] flex-1 duration-150 cursor-pointer select-none items-center justify-center py-3 px-2.5 leading-none  text-[#020b1d77] outline-none hover:text-[#020b1daa] data-[state=active]:bg-[#f1eef000] data-[state=active]:cursor-default data-[state=active]:text-[#020b1dcc]"
              value="tab3"
            >
              Adjuntar Informacíon
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            className="grow rounded-b-md p-2 outline-none leading-[1.15] text-[13px] text-[#020b1dcc] sm:p-4 sm:leading-normal sm:text-[15px]"
            value="tab1"
          >
            <p className="mb-3 mt-1 sm:mt-0 leading-normal">
               {tramiteMd.slug === "x-Otros" ? "Describí el trámite" : "Descripción general del trámite" }  
               <span className={`font-semibold text-[#ff0000] ${tramiteMd.slug !== "x-Otros" && "hidden"}`}> *</span>
            </p>

            <div className=" duration-300 rounded-[4px] ">
              {tramiteMd.slug === "x-Otros" ? (
                <div className="flex flex-col gap-y-1">
                  <TextareaCnp
                    className=""
                    id="tramite"
                    name="tramite"
                    placeholder= "Descripción..."
                    required
                    value={tramite}
                    rows={8}
                    maxLength={1024}
                    wrap="hard"
                    onChange={(e) => {
                      setTramite(e.target.value);
                    }}
                  />
                </div>
              ) : (
                <div className="bg-[#ffffff65]">
                  <div
                  className={`rounded-sm py-2 px-3  ${markdownStyles['markdown']}`}
                  dangerouslySetInnerHTML={{ __html: content }}
                  />
                  <p className="px-3 underline underline-offset-2 decoration-[#020b1d55]">
                    Comprobantes
                  </p>
                  <div className="py-2 px-3 rounded-sm">
                    <ul>
                        {documentacions?.map((documento, index) => (
                            <li key={index} className="flex ">
                                <span className="mr-1">-</span><span>{documento}</span>
                            </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            
            <div className="hidden w-full  mt-3 sm:flex">
              <div className="flex items-center text-[13px] opacity-90 md:text-[13.5px]">
                  <ArrowPathIcon className="h-4 w-4 mr-2.5 text-[#39507f9d] stroke-2 " />
                  <p className="text-[#39507f7d] font-medium ">{tramiteMd.date !== "actual" ? tramiteMd.date : date }</p>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content
            className="grow rounded-b-md p-2 outline-none text-[13px] text-[#020b1dcc] sm:p-4 sm:text-[15px]"
            value="tab2"
          >
            <p className="mb-3 mt-1 sm:mt-0">
               {tramiteMd.slug === "x-Otros" ? "Podés cargar dos comprobantes:" : "Cargá los siguientes comprobantes:" }  
            </p>

            <div className="py-2 px-3 mb-4 rounded-sm bg-[#ffffff65]">
              <ul className="list-none" >
                  {documentos?.map((documento, index) => (
                    <li key={index} className=" ">
                      {documento} <span className={`font-semibold text-xs text-[#ff0000] ${tramiteMd.slug === "x-Otros" && "hidden"}`}>*</span>
                    </li>
                  ))}
              </ul>
            </div>

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
                <div className={`flex flex-col bg-[#26344f] rounded-lg ${!images.length ? 'gap-0' : 'gap-0.5'} $ `} >
                  <button
                    type="button"
                    onClick={onImageUpload}
                    {...dragProps}
                    className={`group rounded-lg w-full disabled:!cursor-default `}
                  >
                    <div className={`relative label-dnd  ${!images.length ? 'rounded-lg' : 'rounded-t-lg'} bg-[#020b1d] text-[#ffffffdd] w-full p-2 duration-150 text-sm flex flex-col justify-center items-center active:opacity-80 sm:p-4 `}>
                      <div className="flex flex-col items-center duration-150 opacity-80 group-hover:opacity-100 min-[512px]:flex-row ">
                        <IconDragDrop className= "w-9 opacity-80  min-[512px]:mr-7" />
                        <div>
                          Click y elegí un archivo o arrastralo y sueltá aquí <br />
                          <p className="text-xs mt-1.5 text-[#ffffffbb]">Máximo: <b>{maxNumber}</b> arch. <b>jpg</b>, <b>png</b> o <b>(pdf</b> <span className="">de una sola página)</span>  <br />Tamaño Max de cada archivo: <b>4 MB</b>
                            </p>
                        </div>
                      </div>
                      
                      {errors && (
                        <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] py-0.5 px-2 bg-[#365491] rounded-xl `}>
                          {errors.maxNumber && (
                            <span>Cantidad máxima: {maxNumber} arch.</span>
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
                  <div className= "flex flex-col rounded-b-lg bg-[#020b1d] ">
                    <div className= {`flex items-baseline justify-start px-3 gap-x-2 flex-wrap text-sm w-full cursor-default max-[512px]:justify-center sm:px-9 sm:gap-x-4`}>
                      { images.map((image, index) => (
                        <div key={index} className="flex flex-col pb-4 pt-5">
                          <div className="image-item flex justify-start">

                            {renderFilePreview( image.file! )} 

                            <div className="flex flex-col text-[13px] justify-end gap-0.5 ">
                              <div onClick={() => {
                                onImageUpdate(index)
                                }} className="border border-[#d9dee8] border-l-0 bg-[#d7d7d7] px-1.5 py-0.5 cursor-pointer rounded-e-md duration-200 text-[#020b1daa] hover:border-[#c0c8d8] hover:text-[#020b1ddd]  hover:bg-[#ffffff] active:bg-[#ffffffaa]  "
                              >
                                Cambiar
                              </div>
                              <div onClick={() => {
                                onImageRemove(index)
                                }} className="border border-[#d9dee8] border-l-0 bg-[#d7d7d7] px-1.5 py-0.5 cursor-pointer rounded-e-md duration-200 text-[#020b1daa] hover:text-[#020b1ddd] hover:border-[#c0c8d8] hover:bg-[#ffffff] active:bg-[#ffffffaa] "
                                >
                                Eliminar
                              </div>
                            </div>
                          </div>
                          <div className="text-xs break-words w-36 text-[#ffffffee] mt-[3px] opacity-80 text-start sm:text-sm sm:w-44">
                            {documentos?.length && documentos[index].toLocaleUpperCase() }
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </ImageUploading>
          </Tabs.Content>

          <Tabs.Content
            className="grow rounded-b-md p-2 outline-none text-sm text-[#020b1dcc] sm:p-4 sm:text-[15px]"
            value="tab3"
          >
            <fieldset className="w-full mt-1 sm:mt-0">
              <label
                className=""
                htmlFor="Información"
              >
                Información adicional
              </label>
              <TextareaCnp
                className="text-sm mt-3 placeholder:opacity-50"
                id="Información"
                name="Información"
                rows={3}
                maxLength={1024}
                wrap="hard"
                value= {info }
                placeholder= "información..."
                required
                onChange={(e) => {
                  setInfo(e.target.value)
                }}
              >
                <div className="absolute rounded-l-[4px] h-7 w-8 left-0 top-0 bg-[#00000010] sm:h-8 sm:w-9" >
                  <IconInfo className="w-4 h-4 absolute top-1.5 left-2 sm:w-5 sm:h-5" />
                </div>
              </TextareaCnp>
            </fieldset>
          </Tabs.Content>
        </Tabs.Root>
      </Frente>

      {/* registrar email */}
      {!user && (
        emailSession === false  ? (
          <Frente className="p-2 mt-2 text-small-regular !bg-[#020b1d13] sm:p-4 sm:mt-4 ">
            <div className="flex items-center justify-between gap-3 sm:gap-5">
              <div className="mt-1.5 ">
                <IconRegistro className="opacity-80 w-[24px] ml-1.5 sm:ml-3 " />
              </div>
  
              <div className={`w-full text-start text-[14px] leading-[1.1] text-[#39507f] transition-[opacity, display] duration-300 sm:leading-normal `}>
                Registrá un e-mail para enviarte el presupuesto <span className=" text-[#ff0000]">*</span> 
              </div>
                
              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setEmail(""); 
                  setName("")
                  sessionStorage.removeItem("email")
                  sessionStorage.removeItem("name")
                }}
                data-testid="edit-button"
                data-active={open}
              >
                {open ? "Cancelar" :  <div className="text-[13px] overflow-auto whitespace-nowrap">Registrar</div>  }
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
              {/* create user*/}
              <div className="pt-2 sm:pt-4">
                <form action={formActionx}>
                  <fieldset className="flex flex-col items-center gap-2 md:flex-row md:gap-4">
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
                      disabled={ !open }
                      onChange={(e) => {
                        setName(e.target.value);
                      }} 
                      >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#020b1d0b]" >
                      </div>
                      <IconCuenta  className="absolute w-[14px] left-[9px] top-[9px] " color="#39507f66" />
                    </InputCnp>

                    <InputCnp
                      className="text-sm h-8"
                      id="email"
                      type="email"
                      name="email"
                      minLength={3}
                      maxLength={100}
                      value={email}
                      placeholder= "Email"
                      required
                      disabled={ !open }
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#020b1d0b]" >
                      </div>
                      <IconEmail2  className="absolute w-[14px] left-[9px] top-[9px] " color="#39507f66" />
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
                      className={`h-8 text-[13px] w-max ml-auto`}
                      onClick={ () => {
                        emailValid && name && setTimeout(() => setOpen(!open), 200) 
                        emailValid && name && sessionStorage.setItem('name', `${name}`);
                        emailValid && name && sessionStorage.setItem('email', `${email}`);
                        // sessionStorage.removeItem("nombre")
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
          <Frente className="p-2 mt-2 text-small-regular sm:p-4 !bg-[#e0e6e1] ">
            <div className={`w-full text-start text-[13px] text-[#020b1ddd] transition-[opacity] duration-300  sm:text-sm `}>
              <span className="mr-3 font-semibold text-sm sm:text-[15px] ">{ name }</span>  
              {/* Para enviarte el presupuesto se registró el e-mail   */}
              Por favor, revisá el correo electrónico 
              <span className=" underline decoration-[#020b1d81] underline-offset-2 mx-1 text-sm sm:text-[15px]">{email}</span>
              y enviá la verificación.
              
            </div>
          </Frente> 
        ) 
      )}

      {estado?.message === "tramiteIniciado" && (
        <Frente className="!p-2 mt-2 !bg-[#d7e5d9] sm:!p-4 ">
          <div className={`w-full text-start text-sm text-[#020b1ddd] transition-[opacity] duration-300 sm:text-[15px] `}>
            Recibimos el pedido. Te enviaremos el presupuesto a la brevedad.
          </div>
        </Frente> 
      )}

      {/* Massages error tramite */}
      <div
        className="my-1.5 flex items-end space-x-1 sm:my-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {estado?.message && estado?.message !== "tramiteIniciado" && (
          <>
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{estado?.message}</p>
          </>
        )}
      </div>
      
      {/* crear tramite */}
      <form action={formAction} className="flex flex-col ">
        {/* archivos Adjuntos */}
        <input
          type="hidden"
          id="documentos_url"
          name="documentos_url"
          value={imageUrl}
          readOnly
        />
        {/* tramite */}
        <input
          type="hidden"
          id="tramite"
          name="tramite"
          value= {tramite}
          readOnly
        />
        {/* email */}
        <input
          type="hidden"
          id="email_id"
          name="email_id"
          value= {!email ? user?.email : email }
          readOnly
        />
        {/* informacion */}
        <input
          type="hidden"
          id="informacion"
          name="informacion"
          value={ info }
          readOnly
        />

        <button
          type="submit"
          ref={buttonyRef}
          className= "hidden "
        >
          Enviar Trámite
        </button>
      </form>


      {/* Enviar tramite */}
      <div className=" w-full flex justify-between items-center gap-4">
        <p className={`text-xs ml-2 text-[#020b1dcc] ${tramite && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") && /* infos.length === lengthInformations && */ (emailSession || user )  && "opacity-0" } sm:text-[13px]`}><span className=" text-[#d400aa]">*</span> Requeridos</p>

        <div className="flex">
          <div className={`mr-2 text-[#020b1dbb] rounded-md ${!emailSession && "hidden"} bg-[#020b1d0d] duration-150 hover:bg-[#020b1d17] hover:text-[#020b1d] sm:mr-4`} >
            <button
              type="button"
              className={` py-1 px-3 sm:px-5`}
              // onClick={() => logout({ returnTo: window.location.origin })}
              onClick={() => {
                sessionStorage.removeItem("email")
                sessionStorage.removeItem("name")
                location.reload()
              }}
            >
              Salir
            </button> 
          </div>

          {estado?.message !== "tramiteIniciado" ? (
            <form 
              // onSubmit={ uploadToServer2 } 
              onSubmit={ images.length === 0 ? uploadToServer1 : uploadToServer2 } 
              className="w-full" >
              <div className="group relative w-full flex justify-between">
                <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute bottom-[150%] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-xl duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${images.length === documentos?.length  && /* infos.length === lengthInformations && */ sessionStorage.getItem('email') ? "" : "group-hover:opacity-100"} sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span>
                <ButtonA
                  className={`h-7 !px-2 text-sm !justify-start sm:h-8 sm:!px-4 disabled:!opacity-60`}
                  type="submit"
                  disabled={ tramite && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") && /* infos.length === lengthInformations && */ (emailSession || user ) ? false : true }
                  onClick={() => {
                    setSpin(true);
                    handleClickButtonPedido()
                  }}
                >
                  <IconCambio
                    className={`${spin && "animate-spin"} mr-2 w-[20px] h-[20px] sm:w-[22px] sm:h-[22px] `}
                  />
                  <p className="w-full" >Pedir presupuesto</p>
                </ButtonA>
              </div>
            </form>
            ) : (
            <div className="flex justify-end items-center gap-4">
              <Link href={"/dashboard/tramites"}>
                <ButtonA
                  className={`h-8 text-sm !justify-start ${!user && "hidden"}`}
                >
                  Ver Trámites
                </ButtonA>
              </Link>

              <ButtonA
                className="h-8 text-sm !justify-start"
                type="button"
                onClick={() => {
                  location.reload()
                }}
              >
                Nuevo pedido
              </ButtonA>
            </div>
            )
          }
        </div>
      </div>

      {/* Envio e-mail confirmar registro */}
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
            // data-active={state}
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
          <form action={handleFormRegistro} /* method="POST" */  className="rounded-lg w-full p-4 ">
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
                  defaultValue= /*{email}*/ "agrotecnicog@gmail.com"
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
                  value="Registro e-mail"
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
                  value={`Para mandarte el Presupuesto por tu Trámite se registró el e-mail: ${email}`}
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
          </form>
        </div>
      </Frente>

      {/* Envio e-mail confirmar pedido */}
      <form action={handleFormPedido}  className="hidden rounded-lg bg-[#50073a66] w-full border border-gray-700 m-4 p-4 ">
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
              value= /*{email}*/ "agrotecnicog@gmail.com"
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
              value="Recepción Pedido Presupuesto"
              required
              readOnly
              />
          </fieldset> 

          <fieldset className="flex flex-col">
            <label htmlFor="content">Mensaje</label>
            <textarea
              name="content" 
              placeholder="Mensaje de confirmación" 
              value={`Recibimos tu Pedido de Presupuesto por el trámite: "${tramite}"`}
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
      </form>
    </>
  );
}

