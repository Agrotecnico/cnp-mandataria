'use client';

import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import * as Tabs  from '@radix-ui/react-tabs';
import Link from 'next/link';
import Image from 'next/image'
import { useSearchParams, redirect, usePathname  } from 'next/navigation';
import { nanoid } from "nanoid";

import { User } from '@/app/lib/definitions';
import { createTramite, StateCreateTramite, createVerificationToken, StateVerificationToken } from '@/app/lib/actions';

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
import { handleFormPedido } from '@/app/lib/actions';
import { authenticate } from '@/app/lib/actions';
import { TramiteMd } from "@/app/lib/definitions"
import IconEnvioEmail from '../logosIconos/icon-envio-email';
import { handleFormRegistro } from '@/app/lib/actions';
import IconInfo from '../logosIconos/icon-info';




export default function IniciarTramite( {
  tramiteMd,
  content,
  user
}: {
  tramiteMd: TramiteMd;
  content: string;
  user: User | undefined;
} ) {
  
  const [tramite, setTramite] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [spin, setSpin] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);

  const [name, setName] = useState("");
  const [nombre, setNombre] = useState<string | null>(null)
  const [nameVisitor, setNameVisitor] = useState("");

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [emailSession, setEmailSession] = useState(false);
  const [info, setInfo] = useState<string | undefined>("")

  const [imgUserSession, setImgUserSession ] = useState<string | null>(null)

  const [estadoRegistrar, setEstadoRegistrar] = useState(false)

  const searchParams = useSearchParams();
  const pathname = usePathname()
  const callbackUrl = pathname || '/iniciar-tramite/cambio-de-radicacion';

  const token= nanoid()
  const imagen= user?.image

  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // const emailValid= emailRegex.test(email)
  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }

   const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const documentacions: string[] | undefined = tramiteMd.documentacion?.split(", ")

  const documentos:string[] | undefined= tramiteMd.documentos?.split(", ")
  const informations:string[] | undefined= tramiteMd.informacion?.split(", ")

  const lengthDocumentos= documentos?.length
  const lengthInformations= informations.length 

  // const maxNumber = 5;
  const maxNumber = documentos?.length;

  // const buttonRefRegistro = useRef<HTMLButtonElement>(null);
  // const handleClickButtonRegistro= () => {
  //   if (buttonRefRegistro.current) buttonRefRegistro.current.click()
  // };

  const buttonRefPedido = useRef<HTMLButtonElement>(null);
  const handleClickButtonPedido= () => {
    if (buttonRefPedido.current) buttonRefPedido.current.click()
  };

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const buttonRefVerification = useRef<HTMLButtonElement>(null);
  const handleClickButtonVerification= () => {
    if (buttonRefVerification.current) buttonRefVerification.current.click()
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

  const enviartramite= () => {
    setTimeout(handleClickButton, 200) 
    // setTimeout(() => setSpin(false), 200) 
  }
  
  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setImageUrl(`["https://res.cloudinary.com/dchmrl6fc/image/upload/v1740640515/sin-adjuntos_ut7col.png"]`);

      enviartramite();
    } catch (error) {
      console.error(error);
    }
  };
  ///////////////////////////////////////////////////////////////
  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const resizedBlobs: Blob[] = [];
    for (const file of files) {
      const resizedBlob = await resizeImage(file, 1024, 1024);
      resizedBlobs.push(resizedBlob);
    }

    try {
      setSpin(true)
      const data = new FormData();
      {resizedBlobs.map((resizedBlob, index) => {
        data.append(`file${index}`, resizedBlob );
      })}
      // {files.map((file, index) => {
      //   data.append(`file${index}`, file );
      // })}
      const response = await fetch('/api/upload-query', {
        method: 'POST',
        body: data,
      });
      console.log("response: ", response)

      const responseData = await response.json();
      console.log("body: ", responseData)

      const polo: string[]= responseData.urls
      console.log("polo: ", polo)

      const respon= JSON.stringify(polo )

      setImageUrl(respon);

      if (response.ok) {
        console.log('File uploaded successfully');
      }

      enviartramite();

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };

  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const reader = new FileReader();
      const img= document.createElement('img')

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height);
        const width = img.width * scale;
        const height = img.height * scale;

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, file.type);
      };

      reader.readAsDataURL(file);
    });
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
    // sessionStorage.getItem('name') && setName(`${sessionStorage.getItem('name')}`)
    // sessionStorage.getItem('nombre') && setName(`${sessionStorage.getItem('nombre')}`)
    const data= sessionStorage.getItem('imgUrlSession')
    setImgUserSession(data)
    // sessionStorage.getItem('name') && setName(`${sessionStorage.getItem('name')}`)

    user?.email && setEmail(`${user.email}`)  

    user?.name ? setName(`${user.name}`) : setName(`${sessionStorage.getItem('nameVisitor')}`)
    // user?.name ? setNombre(`${user.name}`) : setNombre(`${sessionStorage.getItem('nameVisitor')}`)
    sessionStorage.getItem('nameVisitor') && setNameVisitor(`${sessionStorage.getItem('nameVisitor')}`)

    user?.image ? setImageUrl(`${user.image}`) : sessionStorage.getItem('imgUrlSession') && setImageUrl(`${sessionStorage.getItem('imgUrlSession')}`) /* : "" */
    
    // sessionStorage.getItem('email') && setEmail(`${sessionStorage.getItem('email')}`)
    // user?.email && setEmail(`${user.email}`)
    // user?.name && setName(`${user.name}`)
    if (sessionStorage.getItem('email')) {
      setEmailSession(true);
    }
  }, [/* tramiteMd, name, email, open, imageUrl name */ ])

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);

  const initialState: StateCreateTramite = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createTramite, initialState);

  const initialStatexx: StateVerificationToken  = { message: null, errors: {} };
    const [estadoxx, formActionxx, isPendingxx] = useActionState(createVerificationToken, initialStatexx);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState( authenticate, undefined, );


  console.log("name: ", name ? name : nameVisitor ? nameVisitor : ""  ) 
  console.log("email: ", email ) 
  console.log("avatar: ", imagen ? imagen : imageUrl ? imageUrl : ""  ) 


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

      <Frente className="!bg-[#020b1d14] ">
        <Tabs.Root
          className="flex  flex-col min-h-64"
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
            className="grow rounded-b-md p-2 outline-none leading-[1.15] text-[13px] text-[#020b1dcc] sm:p-4 sm:leading-[1.2] sm:text-sm"
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
                    rows={3}
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
                  className={`rounded-sm pt-2 px-3  ${markdownStyles['markdown']}`}
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


      {/* registrar email tramite */}
      { !user ? (
          <Frente className="!p-2 mt-2 text-small-regular sm:!p-4 !bg-[#020b1d16] ">
            <div className="flex items-center justify-between gap-2 sm:gap-5 ">
              <div className="mt-1.5 ">
                <IconRegistro className=" w-[20px] sm:w-6 sm:ml-3 md:ml-1.5" />
              </div>
              
              <div className={`w-full text-start text-[#39507f] `}>
                <div className={` text-[13px] sm:text-[15px] `}>
                  { nameVisitor ? (
                    <p><b>{nameVisitor} </b>, enviame un e-mail para mandarte el presupuesto<span className=" text-[#ff0000] ml-0.5">*</span></p>
                  ) : (
                    <p>Enviame un e-mail para mandarte el presupuesto<span className=" text-[#ff0000] ml-0.5">*</span></p>
                  )} 
                </div>
              </div>
                
              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setEmail(""); 
                  setName("");
                }}

                data-testid="edit-button"
                data-active={open}
              >
                {open ? "Cancelar" :  <div className="text-[13px] overflow-auto whitespace-nowrap">Email</div>  }
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
              <div className={`pt-2 sm:pt-4 ${!open && "invisible"} `}> 
                <form action={formActionx}>
                  <fieldset className={`mb-2 grid grid-cols-1 items-center gap-2 md:grid-cols-2 md:mb-4 md:flex-row md:gap-4`}>
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
                      disabled={ !open }
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }} 
                      >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#020b1d0b]" >
                      </div>
                      <IconEmail2  className="absolute w-[14px] left-[9px] top-[9px] " color="#39507faa" />
                    </InputCnp>
                    
                    <div className={` ${nameVisitor   && "hidden"}`}>
                      <InputCnp
                        className={`text-sm h-8`}
                        id="name"
                        type="text"
                        name="name"
                        minLength={3}
                        maxLength={100}
                        value={ name ? name : nameVisitor ? nameVisitor : "" }
                        placeholder= "Nombre"
                        required
                        disabled={ !open }
                        onChange={(e) => {
                          setName(e.target.value);
                        }} >
                        <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#020b1d0b]" >
                        </div>
                        <IconCuenta  className="absolute w-[14px] left-[9px] top-[9px] " color="#39507faa" />
                      </InputCnp>
                    </div>

                    <input
                      type="hidden"
                      id="image"
                      name="image"
                      // value={commentLast.avatar?.slice(1, -1) }
                      value={ imagen ? imagen : imageUrl ? imageUrl : "" }
                      readOnly
                    />
                  </fieldset>

                  {/* Massages erros */}
                  <div
                    className="flex items-end relative space-x-8"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {estadox?.message && (
                      <>
                        <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                        <p className="pt-4 text-sm text-red-500">{estadox?.message}</p>
                      </>
                    )}
                  </div>

                  {/* button submit */}
                  <ButtonA
                    className={`${(isPendingx || isPendingAuth) && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden  h-8 text-[13px] w-max ml-auto ${!open && "hidden"} disabled:!opacity-60`}
                    onClick={() => { 
                      setTimeout(handleClickButtonAuth, 200) 
                      // sessionStorage.clear()
                    }}
                    disabled= {(nameVisitor || name) && email && isEmailValid(`${email}`) ? false : true}
                  >
                    Enviar
                  </ButtonA>
                </form>
              </div>
            </div>
          </Frente>
        ) : (
          <Frente className={`flex items-center gap-2.5 py-3 px-2 mt-2 !bg-[#020b1d16] text-small-regular ${user && "!bg-[#d7e5d9]"} ${estado?.message === "tramiteIniciado" && "hidden"} sm:py-2 sm:px4 sm:gap-5`}>
            <IconRegistro className=" w-[24px] mt-1.5 sm:mt-2 sm:ml-3" />
            <div className={`w-full font-medium text-start text-[13px] text-[#39507f] transition-[opacity] duration-300 sm:text-sm `}>
              <p>Te enviaré el <b>presupuesto</b> por email a<span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 "> {user.email}. </span></p>
            </div>
          </Frente>
        )
      }

      {estado?.message === "tramiteIniciado" && (
        <Frente className="!p-2 mt-2 !bg-[#d7e5d9] sm:!p-4 ">
          <div className={`w-full text-start font-medium text-sm text-[#39507f] transition-[opacity] duration-300 `}>
            <p className="sm:text-center">Recibí el <b>pedido de presupuesto</b>, te responderé a la mayor brevedad.</p>
            <p className={`mt-2 font-medium ${ user?.email_verified && "hidden"} sm:text-center`}>
              Por favor, revisá el correo electrónico <span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 ">{user?.email}</span> y enviá la verificación.
            </p>
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

      {/* authentication */}
      <form action={formActionAuth} className="">
        <input
          id="email"
          type="hidden"
          name="email"
          value={email}
          readOnly
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} readOnly />

        <button
          type="submit" 
          ref={buttonRefAuth}
          className="hidden"
        >
          Continuar
        </button>
      </form>
      

      {/* Boton Enviar tramite */}
      <div className=" w-full flex justify-between items-center">
        <p className={`text-xs ml-2 ${tramite && user?.email && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") && "opacity-0" } sm:text-[13px]`}><span className=" text-[#ff0000]">*</span> Requeridos</p>

        <div className="flex gap-4">
          {estado?.message !== "tramiteIniciado" ? (
            <form 
              onSubmit={ images.length === 0 ? uploadToServer1 : uploadToServer2 } >
              <div className="group relative w-full flex justify-between items-center">
                <div className="w-[188px] absolute bottom-8 pt-3">
                  <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute w-[188px] bottom-[12px] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${tramite && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") ? "" : "group-hover:opacity-100 " } sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span>
                </div>

                <ButtonA
                  className={`h-8 !px-4 text-sm !justify-start disabled:!opacity-60`}
                  type="submit"
                  disabled={ tramite && user?.email && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") ? false : true }
                  onClick={() => {
                    setSpin(true);
                    user?.role === "member" && handleClickButtonVerification()
                    user?.role === "member" && handleClickButtonPedido()
                  }}
                >
                  <IconCambio
                    className={`${(spin || isPending || isPendingxx) && "animate-spin"} mr-2 w-[22px] h-[22px] `}
                  />
                  <p className="w-full" >Pedir presupuesto</p>
                </ButtonA>
              </div>
            </form>
            ) : (
            <div className="flex justify-end items-center gap-4">
              <ButtonA
                className="h-8 text-sm !justify-start"
                type="button"
                onClick={() => {
                  location.reload()
                }}
              >
                Nuevo pedido Presupuesto 
              </ButtonA>
            </div>
            )
          }
        </div>
      </div>

      {/* crear tramite */}
      <form action={formAction} className="flex flex-col ">
        {/* archivos Adjuntos */}
        <input
          type="hidden"
          id="documentos_url"
          name="documentos_url"
          value={imageUrl ? imageUrl : ""}
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

      {/* crear verificationToken */}
      <form action={formActionxx}>
        <input
          type="hidden"
          id="identifier"
          name="identifier"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          id="token"
          name="token"
          value={token}
          readOnly
        />
        <input
          type="hidden"
          id="expires"
          name="expires"
          value={`${new Date(Date.now() + 1000 * 60 * 60 * 24)}`}
          readOnly
        />
        <button
          type="submit"
          ref={buttonRefVerification }
          className= "hidden " 
        >
          Crear VerificationToken
        </button>
      </form>

      {/* Envio e-mail verificacion email */}
      <form action={handleFormPedido}>
        <input 
          type="hidden"
          name="to_name" 
          value={name}
          readOnly
        />
        <input
          type="hidden"
          name="to_email" 
          value= "agrotecnicog@gmail.com"
          // value= {email}
          readOnly
        />
        <input
          type="hidden"
          name="content" 
          value={pathname}
          readOnly
        />
        <input
          type="hidden"
          id="token"
          name="token"
          value={token}
          readOnly
        />
        <button 
          type="submit" 
          ref={buttonRefPedido}
          className="hidden">
          Enviar
        </button>
      </form>

      
    </>
  );
}

