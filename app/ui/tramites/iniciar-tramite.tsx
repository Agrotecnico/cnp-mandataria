'use client';

import { FormEvent, useState, useEffect, useRef, useActionState } from 'react';
import { ExclamationCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import * as Tabs  from '@radix-ui/react-tabs';
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation';
import { nanoid } from "nanoid";
import { ToastContainer, toast, Zoom, Flip } from 'react-toastify';


import { User } from '@/app/lib/definitions';
import { createTramite, StateCreateTramite, createVerificationToken, StateVerificationToken, updateUserEmail, StateUserEmail, updateCommentEmail, StateUpdateCommentEmail,createUser2, StateUser, authenticate, authenticate3, handleFormPedido  } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import IconCambio from '@/app/ui/logosIconos/icon-cambio';
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import IconRegistro from "@/app/ui/logosIconos/icon-registro"
import IconInfo from '@/app/ui/logosIconos/icon-info';
import IconEnvioEmail from '@/app/ui/logosIconos/icon-envio-email';
import { ImageListType} from '@/app/ui/consultas/typings';
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import { ButtonB, ButtonA } from '@/app/ui/button';
import markdownStyles from '@/app/ui/tramites/markdown-styles.module.css';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import { TramiteMd } from "@/app/lib/definitions"
import { PDFDocument } from 'pdf-lib';
import 'react-toastify/dist/ReactToastify.css';
// import NotifyVerified from '@/app/ui/consultas/notify-verified-consulta';
import NotifyVerifiedTramite from '@/app/ui/tramites/notify-verified-tramite';
import NotifyVerifyTramite from '@/app/ui/tramites/notify-verify-tramite';
import './styles.css';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


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
  const [nameVisitor, setNameVisitor] = useState("");

  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<string | undefined>("")

  const [token, setToken] = useState("");

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified') === "true"

  const pathname = usePathname()

  const tokenx= nanoid()
  const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"
  const id= user?.email!

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }

  const documentacions: string[] | undefined = tramiteMd.documentacion?.split(", ")

  const documentos:string[] | undefined= tramiteMd.documentos?.split(", ")

  const maxNumber = documentos?.length;

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

  const buttonRefxxxx = useRef<HTMLButtonElement>(null); // update comment email
  const handleClickButtonxxxx= () => {
    if (buttonRefxxxx.current) buttonRefxxxx.current.click()
  };

  const buttonRefxxx = useRef<HTMLButtonElement>(null); // update user email
  const handleClickButtonxxx= () => {
    if (buttonRefxxx.current) buttonRefxxx.current.click()
  };

  const enviartramite= () => {
    setTimeout(handleClickButton, 200) 
  }

  const enviarConsultaxxxx= () => {
    setTimeout( () => handleClickButtonxxxx(), 200) // update comment email
    setTimeout( () => handleClickButtonxxx(), 200) // update user email
  }
  
  ///////////////////////////////////////////////////////////////
  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setImageUrl(`["https://res.cloudinary.com/dchmrl6fc/image/upload/v1740640515/sin-adjuntos_ut7col.png"]`);

      enviartramite();
    } catch (error) {
      console.error(error);
    }
  };
  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const resizedBlobs: Blob[] = [];
    for (const file of files) {
      if ( file.type === "application/pdf" ) {
        resizedBlobs.push(file);
      }  else {
        const resizedBlob = await resizeImage(file, 1024, 1024);
        resizedBlobs.push(resizedBlob);
      }
    }

    try {
      setSpin(true)
      const data = new FormData();

      {resizedBlobs.map((resizedBlob, index) => {
        data.append(`file${index}`, resizedBlob );
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

      enviartramite();

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };
  const uploadToServer3 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSpin(true)
      enviarConsultaxxxx();
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

        const scaleMin = scale > 1 ? 1 : scale

        const width = img.width * scaleMin;
        const height = img.height * scaleMin;

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
          className="h-[64px] object-cover bg-[#ffffffaa] w-16 border border-[#1d021544] [border-radius:_6px_6px_0_6px] " />
      ); 
      } else if ( fileType === 'application/pdf' ) { 
        return ( 
        <embed 
          src={URL.createObjectURL(file)} 
          type="application/pdf" 
          className="h-[64px] object-cover bg-[#ffffffaa] w-[60px] border border-[#1d021544]  [border-radius:_6px_6px_0_6px] " />
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
    user?.email && setEmail(`${user.email}`)  
    user?.name ? setName(`${user.name}`) : setName(`${sessionStorage.getItem('nameVisitor')}`)
    sessionStorage.getItem('nameVisitor') && setNameVisitor(`${sessionStorage.getItem('nameVisitor')}`)
    user?.image ? setImageUrl(`${user.image}`) : sessionStorage.getItem('imgUrlSession') && setImageUrl(`${sessionStorage.getItem('imgUrlSession')}`)

    setToken(tokenx)

    isVerified && toast(<NotifyVerifiedTramite /> , {
      autoClose: undefined,
      closeButton:  false ,
      transition: Flip,
      // className: '!w-screen !h-screen !bg-[#020b1d66] !m-0 !-mb-4 !-mr-4 !p-0 max-[482px]:!-m-0',
      className: `!w-full !min-h-min !mt-0 !p-0 !shadow-[0px_4px_12px_#a0b8e996] !bg-transparent !mb-0`,
    });

    !user || !isEmailVisitor && !isVerified && 
    toast(<NotifyVerifyTramite isEmailVisitor= {isEmailVisitor} tramite={tramite} email={email} user={user} />, {
      customProgressBar: true,
      position: "bottom-center",
      transition: Flip,
      className: '!w-full !min-h-min mt-6 !mb-8 !p-0 !shadow-[0_10px_20px_#c0cde7] ',
    });

  }, [ ])

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser2, initialStatex);

  const initialState: StateCreateTramite = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createTramite, initialState);

  const initialStatexx: StateVerificationToken  = { message: null, errors: {} };
  const [estadoxx, formActionxx, isPendingxx] = useActionState(createVerificationToken, initialStatexx);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate3, undefined, );

  const initialStatexxx: StateUserEmail = { message: null, errors: {} };
  const updateUserEmailWithId = updateUserEmail.bind(null, id);
  const [estadoxxx, formActionxxx, isPendingxxx] = useActionState(updateUserEmailWithId, initialStatexxx);
  
  const initialStatexxxx: StateUpdateCommentEmail = { message: null, errors: {} };
  const updateCommentEmailWithId = updateCommentEmail.bind(null, id);
  const [estadoxxxx, formActionxxxx, isPendingxxxx] = useActionState(updateCommentEmailWithId, initialStatexxxx);

  const limpiarNotificaciones = () => {
    toast.dismiss();
  };
  const notifyVerifyTramite = () =>
    toast(<NotifyVerifyTramite isEmailVisitor= {isEmailVisitor} tramite={tramite} user={user} email={email} />, {
      customProgressBar: true,
      // autoClose: 5000,
      position: "bottom-center",
      transition: Flip,
      pauseOnHover: false,
      className: '!w-full !min-h-min !mb-8 !mt-6 !p-0 !shadow-[0_10px_20px_#c0cde7]',
    });


  return (
    <>
      <div className="flex items-center pb-3">
        <Image 
          src= "/dnrpa.png" 
          alt="icono trámites" 
          width={26} 
          height={26}
          className="opacity-80 mb-[3px] h-3 w-3 mr-2.5 sm:h-3.5 sm:w-3.5"
        />
        <h1 className=" text-start text-[17px] text-[#39507fcc] font-semibold leading-tight tracking-tighter sm:text-[19px] md:leading-none ">
          {tramiteMd.tramite}
        </h1>
      </div>

      <Frente className="!bg-[#548eff16] ">
        <Tabs.Root
          className="flex flex-col min-h-[362px]"
          defaultValue="tab1"
        >
          <Tabs.List
            className="flex shrink-0 text-[13px] md:text-[15px]"
            aria-label="Manage your account"
          >
            <Tabs.Trigger
              className="flex bg-[#ffffff66] mt-[1px] flex-1 duration-150 cursor-pointer select-none items-center justify-center py-3 px-2.5 leading-none  text-[#020b1d77] outline-none hover:text-[#020b1daa] data-[state=active]:bg-[#f1eef000] data-[state=active]:cursor-default data-[state=active]:text-[#020b1dcc]"
              value="tab1"
            >
              Descripción<span className={`ml-1 font-semibold text-xs text-[#ff0000] ${tramiteMd.slug === "x-Otros" && tramite !== "" && "text-transparent"} ${tramiteMd.slug !== "x-Otros" && "text-transparent" } `}>*</span>
            </Tabs.Trigger>

            <Tabs.Trigger
              className="border-x border-[#d7dfef] flex bg-[#ffffff66] mt-[1px] flex-1 duration-150 cursor-pointer select-none items-center justify-center py-3 px-2.5 leading-none  text-[#020b1d77] outline-none hover:text-[#020b1daa] data-[state=active]:bg-[#f1eef000] data-[state=active]:cursor-default data-[state=active]:text-[#020b1dcc]"
              value="tab2"
            >
              <div className='flex flex-wrap justify-center '>
                Adjuntar
                <span className='ml-1'>Comprobantes<span className={`ml-1 font-semibold text-xs text-[#ff0000] ${images.length === maxNumber  && "text-transparent"}  ${tramiteMd.slug === "x-Otros" && "text-transparent" } `}>*</span></span>
              </div>
            </Tabs.Trigger>

            <Tabs.Trigger
              className="flex bg-[#ffffff66] mt-[1px] flex-1 duration-150 cursor-pointer select-none items-center justify-center py-3 px-2.5 leading-none  text-[#020b1d77] outline-none hover:text-[#020b1daa] data-[state=active]:bg-[#f1eef000] data-[state=active]:cursor-default data-[state=active]:text-[#020b1dcc]"
              value="tab3"
            >
              Adjuntar Informacíon
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content
            className="grow rounded-b-md p-2 outline-none text-[13px] text-[#020b1dcc] sm:p-4 sm:text-[15px]"
            value="tab1"
          >
            <div className="flex flex-col justify-between min-h-[288px]">
              <div className="flex flex-col">
                <p className="mb-3 mt-1 sm:mt-0 ">
                  {tramiteMd.slug === "x-Otros" ? "Describí el trámite" : "Descripción general del trámite" }  
                </p>

                <div className=" duration-300 rounded-[4px] leading-[1.2]">
                  {tramiteMd.slug === "x-Otros" ? (
                    <div className="flex flex-col gap-y-1">
                      <TextareaCnp
                        className=""
                        id="tramite"
                        name="tramite"
                        placeholder= "Descripción..."
                        required
                        value={tramite}
                        rows={5}
                        maxLength={1024}
                        wrap="hard"
                        onChange={(e) => {
                          setTramite(e.target.value);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="bg-[#ffffffaa] text-[13px] sm:text-sm">
                      <div
                      className={`rounded-sm pt-2 px-3  ${markdownStyles['markdown']}`}
                      dangerouslySetInnerHTML={{ __html: content }}
                      />
                      <h3 className="px-3 underline underline-offset-2 decoration-[#020b1d55]">
                        Comprobantes
                      </h3>
                      <ul className="py-2 px-3 rounded-sm">
                        {documentacions?.map((documento, index) => (
                          <li key={index} className="flex ">
                              <span className="mr-1">-</span><span>{documento}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mt-3 text-[13px] opacity-90 md:text-[13.5px]">
                <ArrowPathIcon className="h-4 w-4 mr-2.5 text-[#39507f9d] stroke-2 " />
                <p className="text-[#39507f7d] font-medium ">{tramiteMd.date !== "actual" ? tramiteMd.date : date }</p>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content
            className="grow rounded-b-md p-2 outline-none text-[#020b1dcc] sm:p-4"
            value="tab2"
          >
            <p className="mb-3 mt-1 sm:mt-0 text-[13px] sm:text-[15px] ">
               {tramiteMd.slug === "x-Otros" ? "Podés cargar dos comprobantes:" : "Cargá los siguientes comprobantes:" }  
            </p>

            <div className="py-2 px-3 mb-3 text-[12px] sm:text-sm rounded-sm bg-[#ffffffaa]">
              <ul className="list-none" >
                  {documentos?.map((documento, index) => (
                    <li key={index} className=" leading-[1.2] ">
                      {documento} <span className={`font-semibold text-xs text-[#ff0000] ${tramiteMd.slug === "x-Otros"  && "hidden"} ${index + 1 <= images.length && "text-transparent"}`}>*</span>
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
                <div className={`flex flex-col ${!images.length ? 'gap-0' : 'gap-1.5'} `} >
                  <button
                    type="button"
                    onClick={onImageUpload}
                    {...dragProps}
                    className={`group rounded-lg w-full disabled:!cursor-default `}
                  >
                    <div className={`relative label-dnd  ${!images.length ? 'rounded-lg' : 'rounded-t-lg'} bg-[#ffffffd7] text-[#020b1ddd] w-[calc(100%_-_8px)] mx-auto px-2 py-3 duration-150 flex flex-col justify-center items-center `}>
                      <div className="flex items-center gap-3 text-[13px] duration-150 sm:text-sm">
                        <IconDragDrop className= "w-[30px]  min-[512px]:mr-7" />
                        <div className='leading-[1]'>
                          Elegí un archivo o arrastralo y sueltá aquí <br />
                          <p className="text-xs mt-1.5 "> archivos <span className='font-medium'>jpg</span >, <span className='font-medium'>png</span > o <span className='font-medium' >pdf</span >
                          </p>
                        </div>
                      </div>
                      {errors && (
                        <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] px-2 bg-[#4d70b5] rounded-xl `}>
                          {errors.maxNumber && (
                            <span>Cantidad máxima: {maxNumber} archivos</span>
                          )}
                          {errors.maxFileSize && (
                            <span>El tamaño excede el máximo permitido (4 MB)</span>
                          )}
                          {errors.acceptType && (
                            <span>El tipo de archivo no está permitido</span>
                          )}
                        </div>
                      )}
                      <div 
                        className={`absolute mx-auto w-[calc(100%_+_2px)] h-full bg-[#548eff10] outline-1 duration-150 outline-offset-2 outline-dashed outline-[#00000070] ${isDragging ? ' hover:bg-[#4369b566] rounded-lg hover:outline-[#000000ee] ' : !images.length ? " hover:bg-[#ffffff00] hover:outline-[#000000ee] rounded-lg  " : " hover:bg-[#ffffff00] hover:outline-[#000000ee] rounded-t-lg" }`}
                        >
                      </div>
                    </div>
                  </button>

                  <div className= "flex flex-col rounded-b-lg bg-[#020b1d] ">
                    <div className= {`flex items-baseline justify-start px-3 gap-x-4 flex-wrap text-sm w-full cursor-default max-[512px]:justify-center sm:px-9 sm:gap-x-4 `}>
                      { images.map((image, index) => (
                        <div key={index} className="flex flex-col items-start pb-2 pt-2.5">
                          <div className="image-item flex justify-start">

                            {renderFilePreview( image.file! )} 

                            <div className="flex flex-col text-[12px] justify-end gap-[1px] ">
                              <div onClick={() => {
                                onImageUpdate(index)
                                }} className="border border-[#e9dae9] border-l-0 bg-[#d7d7d7] px-1.5 cursor-pointer rounded-e-md duration-200 text-[#1d0215aa] hover:border-[#d8c0d7] hover:text-[#1d0215dd]  hover:bg-[#ffffff] active:bg-[#ffffffaa]  "
                              >
                                Cambiar
                              </div>
                              <div onClick={() => {
                                onImageRemove(index)
                                }} className="border border-[#e9dae9] border-l-0 bg-[#d7d7d7] px-1.5 cursor-pointer rounded-e-md duration-200 text-[#1d0215aa] hover:text-[#1d0215dd] hover:border-[#d8c0d7] hover:bg-[#ffffff] active:bg-[#ffffffaa] "
                                >
                                Eliminar
                              </div>
                            </div>
                          </div>
                          <div className="text-xs break-words text-[#ffffffee] mt-[3px] opacity-60 text-start ">
                            {image.file?.name } 
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
            className="grow rounded-b-md p-2 outline-none text-[13px] text-[#020b1dcc] sm:p-4 sm:text-[15px]"
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
                className="text-sm mt-3 placeholder:opacity-50 !border-0"
                id="Información"
                name="Información"
                rows={5}
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
        <Frente className="!p-2  mt-2 text-small-regular !bg-[#548eff16] sm:!px4 ">
          <div className="flex items-start justify-between gap-3  sm:items-center sm:gap-5 ">
            <div className="mt-[2px] sm:mt-1.5  ">
              <IconRegistro className=" w-5 ml-1.5 sm:w-6 sm:ml-3" />
            </div>
            
            <div className={`w-full text-start text-[#39507f] `}>
              <div className={` text-[13px] sm:text-[15px] `}>
                <p>Envíame un Email para que pueda mandarte el presupuesto<span className=" text-[#ff0000] ml-0.5">*</span></p>
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
                    className={`text-sm h-8 !bg-[#ffffff]`}
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
                      className={`text-sm h-8 !bg-[#ffffff]`}
                      id="name"
                      type="text"
                      name="name"
                      minLength={3}
                      maxLength={100}
                      value={ name /* ? name : nameVisitor ? nameVisitor : "" */ }
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
                    value={ /* imagen ? imagen : imageUrl ? imageUrl : */ "" }
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="password"
                    value= {"72cf0550-3f64-474d-b150-aa813c6b4b67" }
                    readOnly
                  />
                  <input type="hidden" name="pathname" value={pathname} readOnly />
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
                  className={`${(isPendingx || isPendingAuth) && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden w-32  h-8 text-[13px] ml-auto ${!open && "hidden"} disabled:!opacity-60`}
                  onClick={() => { 
                    setTimeout(handleClickButtonAuth, 200) 
                    setTimeout(notifyVerifyTramite, 2000) 
                  }}
                  disabled= {( name) && email && isEmailValid(`${email}`) ? false : true}
                >
                  Enviar
                </ButtonA>
              </form>
            </div>
          </div>
        </Frente>
      ) : isEmailVisitor && (
        <Frente className={`!p-2 mt-2 text-small-regular !bg-[#548eff16] sm:!p-4 `}>
          <div className="flex items-start justify-between gap-3  sm:items-center sm:gap-5 ">
            <div className="mt-[2px] sm:mt-1.5  ">
              <IconRegistro className="w-5 ml-1.5 sm:w-6 sm:ml-3 " />
            </div>

            <div className={`w-full text-start text-[#39507f] `}>
              <div className={` text-[13px] sm:text-[15px] `}>
                <p><b>{ user.name}</b>, enviame un e-mail para mandarte el presupuesto<span className=" text-[#ff0000] ml-0.5">*</span></p>
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
            {/* update email user */}
            <div className={`pt-2 sm:pt-4 ${!open && "invisible"} `}> 
              <fieldset className={`mb-2 grid grid-cols-1 items-center gap-2 md:grid-cols-2 md:mb-4 md:flex-row md:gap-4`}>
                <InputCnp
                  className={`text-sm h-8 !bg-[#ffffff]`}
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

              <form onSubmit={  uploadToServer3  }>
                <ButtonA
                  type="submit"
                  className={`${(isPendingx || isPendingAuth) && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden w-32 h-8 text-[13px] ml-auto ${!open && "hidden"} disabled:!opacity-60`}
                  onClick={() => { 
                    setTimeout(handleClickButtonAuth, 2000) 
                    setTimeout(notifyVerifyTramite, 3000) 
                  }}
                  disabled= {( user?.name || name) && email && isEmailValid(`${email}`) ? false : true}
                >
                  Enviar
                </ButtonA>
              </form>
            </div>
          </div>
        </Frente>
      )}


      {/* Massages error tramite */}
      {estado?.message && estado?.message !== "tramiteIniciado" && (
        <div 
          className="py-3 px-2 flex items-end space-x-1 sm:px-4"
          aria-live="polite"
          aria-atomic="true">
          <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-500">{estado?.message}</p>
        </div>
      )}

      {/* Boton Enviar tramite */}
      <div className="mt-6 w-full flex justify-between items-center">
        <p className={`text-xs ml-2 ${tramite && user?.email && !isEmailVisitor && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") && "opacity-0" } sm:text-[13px]`}><span className=" text-[#ff0000]">*</span> Requeridos</p>

        <div className="flex gap-4">
          {estado?.message !== "tramiteIniciado" ? (
            <form 
              onSubmit={ images.length === 0 ? uploadToServer1 : uploadToServer2 } >
              <div className="group relative w-full flex justify-between items-center">
                <div className="w-[188px] absolute bottom-8 pt-3">
                  <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute w-[188px] bottom-[12px] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${tramite && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") ? "" : "group-hover:opacity-100 " } sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span>
                </div>

                <ButtonA
                  className={`h-8 !px-4 text-sm !justify-start disabled:!opacity-100`}
                  type="submit"
                  disabled={ tramite && user?.email && !isEmailVisitor && (images.length === documentos?.length || tramiteMd.slug === "x-Otros") ? false : true }
                  onClick={() => {
                    setSpin(true);
                    user?.role === "member" && handleClickButtonVerification()
                    user?.role === "member" && handleClickButtonPedido()
                    limpiarNotificaciones()
                    wait().then(() => {
                    notifyVerifyTramite()
                  })
                  }}
                >
                  <IconCambio
                  className={`${(spin || isPending || isPendingxx ) && "animate-spin"} fill-[#fff0] stroke-[#ffffff55] mr-2 w-[22px] h-[22px]`}
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

      {/* <ToastContainer  className={!isVerified  ? "foo" : "" } /> */}
      <ToastContainer  className={ !isVerified  ? "foo" : "foo2" } autoClose={false} />
      {/* <NotifyVerifyTramite  isEmailVisitor= {isEmailVisitor} tramite={tramite} user={user} email={email}  /> */}
      {/* <Frente className={`mt-6 !bg-[#548effee] w-full ${ isVerified && "hidden"}`}>
        <div className=" flex items-start gap-4 pl-4 pb-1 pt-1.5 pr-7  sm:pr-7 sm:gap-5">
          <IconEnvioEmail fill="#ffffff88" filla="#ffffffdd" className=" w-8 mt-1 mb-auto sm:w-9" />
          <p className={` w-full text-start gap-1.5 text-[15px] text-[#ffffff] sm:text-base [text-shadow:_1px_1px_#3d61ad] `}>
            Enviaré el presupuesto a tu correo electrónico <span className= "underline decoration-[#ffffffdd] underline-offset-[3] mx-1 ">{isEmailVisitor ? email : user?.email ? user.email : email}</span>
          </p>
        </div>
      </Frente> */}


      {/* authentication */}
      <form action={formActionAuth} className="">
        <input
          type="hidden"
          name="email"
          value={email}
          readOnly
        />
        <input
          type="hidden"
          name="password"
          value= "72cf0550-3f64-474d-b150-aa813c6b4b67" 
          readOnly
        />
        <input type="hidden" name="redirectTo" value={pathname} readOnly/>
        <button
          type="submit" 
          ref={buttonRefAuth}
          className="hidden"
        >
          Continuar
        </button>
      </form>
      
      {/* crear tramite */}
      <form action={formAction} className="flex flex-col ">
        <input
          type="hidden"
          name="documentos_url"
          value={imageUrl ? imageUrl : ""}
          readOnly
        />
        <input
          type="hidden"
          name="tramite"
          value= {tramite}
          readOnly
        />
        <input
          type="hidden"
          name="email_id"
          value={user?.email ? user.email : email}
          readOnly
        />
        <input
          type="hidden"
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
          name="identifier"
          value={user?.email}
          readOnly
        />
        <input
          type="hidden"
          name="token"
          value={token}
          readOnly
        />
        <input
          type="hidden"
          name="expires"
          value={`${new Date(Date.now() + 1000 * 60 * 60 * 24)}`}
          readOnly
        />
        <input
          type="hidden"
          name="pathname"
          value= {pathname}
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
          value={user?.name}
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

      {/*update comment email */}
      <form action={formActionxxxx}>
        <input
          type="hidden"
          name="email_id"
          value={ email }
          readOnly
        />
        <input
          type="hidden"
          name="pathname"
          value= {pathname}
          readOnly
        />
        <button
          type="submit"
          ref={buttonRefxxxx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>

      {/*update user email */}
      <form action={formActionxxx}>
        <input
          type="hidden"
          name="email"
          value={ email }
          readOnly
        />
        <input
          type="hidden"
          name="pathname"
          value= {pathname}
          readOnly
        />
        <button
          type="submit"
          ref={buttonRefxxx}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>
    </>
  );
}

