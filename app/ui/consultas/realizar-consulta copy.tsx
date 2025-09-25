'use client';

import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { useSearchParams, redirect } from 'next/navigation';
import { useSession } from "next-auth/react"

import IconConsulta from "@/app/ui/logosIconos/icon-consulta"
import { createConsulta, createVerificationToken, StateConsulta, StateVerificationToken } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import useToggleState from "@/app/lib/hooks/use-toggle-state";
import IconCambio from '@/app/ui/logosIconos/icon-cambio';
import IconArchivo from '@/app/ui/logosIconos/icon-archivo';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import { ButtonB, ButtonA } from '@/app/ui/button';
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconRegistro from "@/app/ui/logosIconos/icon-registro"
import { createUser, StateUser } from '@/app/lib/actions';
import { handleFormPedido } from '@/app/lib/actions';
import { nanoid } from "nanoid";
import { authenticate } from '@/app/lib/actions';
import { updateUserEmailVerifiedx, deleteVerification } from "@/app/lib/actions"
import { User, CommentLast } from '@/app/lib/definitions';



const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));


export default function RealizarConsulta({ 
  user,
  commentLast
}: { 
  user: User | undefined 
  commentLast: CommentLast
}) {

  const { data: session, update } = useSession()
  
  const [consulta, setConsulta] = useState('');
  const [successState, setSuccessState] = useState(false)

  // Archivos adjuntos a consulta (imageUrl y images)
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<ImageListType>([]);

  const [spin, setSpin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [imageUser, setImageUser] = useState("");

  const [emailx, setEmailx] = useState("");
  const [emailxx, setEmailxx] = useState("");

  const [open, setOpen] = useState(false);
  const [openConsulta, setOpenConsulta] = useState(true);

  const [imgUserSession, setImgUserSession ] = useState<string | null>(null)

  const [emailSession, setEmailSession] = useState(false);

  const [postSlug, setPostSlug] = useState<string | null>(null)


  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('/realizar-consulta') || '/realizar-consulta';

  const token= nanoid()
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }

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

  // const buttonRefVerification = useRef<HTMLButtonElement>(null);
  // const handleClickButtonVerification= () => {
  //   if (buttonRefVerification.current) buttonRefVerification.current.click()
  // };
  const buttonRefVerification = useRef<HTMLButtonElement>(null);
  const handleClickButtonVerification= () => {
    if (buttonRefVerification.current) buttonRefVerification.current.click()
  };

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const enviarConsulta= () => {
    setTimeout(handleClickButton, 200) 
    console.log("Consulta creada")
  }
  // const enviarConsultax= () => {
  //   if (user?.role === "memberAccount") {
  //   handleClickButtonVerification() 
  //   handleClickButtonPedido()
  // }}

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
      setSpin(true)
      enviarConsulta();
      // {session ? enviarConsultax() : enviarConsulta() }
    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };
  ///////////////////////////////////////////////////////////////
  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    try {
      setSpin(true)
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
        // console.log('File uploaded successfully');
        console.log('Ok imagen subida');
      }

      enviarConsulta();

      // setTimeout(handleClickButton, 2000) 
      // console.log("Consulta creada")

      // setTimeout(handleClickButtonRegistro, 2500) 
      // console.log("User creado")

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
          className="min-h-[64px] object-contain bg-[#ffffffaa] w-16 border border-[#1d021544] [border-radius:_6px_6px_0_6px] " />
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
    // searchParams.get('email') && setEmail(`${searchParams.get('email')}`)
    // searchParams.get('verified') ? setIsVerified(`${searchParams.get('verified')}`) : ""
    if (sessionStorage.getItem('email')) {
      setEmailSession(true);
    }
    user?.email && setEmail(`${user.email}`)
    // commentLast.avatar && setImgUserSession(commentLast.avatar.slice(1, -1)   )

    // searchParams.get('name') && sessionStorage.setItem('name', `${searchParams.get('name')}`)
    // searchParams.get('email') && sessionStorage.setItem('email', `${searchParams.get('email')}`)

    if (successState) {
      close()
    }
    sessionStorage.getItem('name') && setName(`${sessionStorage.getItem('name')}`)
    sessionStorage.getItem('nombre') && setName(`${sessionStorage.getItem('nombre')}`)
    sessionStorage.getItem('imgVisitor') && setImageUser(`${sessionStorage.getItem('imgVisitor')}`)

    // sessionStorage.getItem('imgUserSession') && setImgUserSession(`${sessionStorage.getItem('imgUserSession')}`)
    const data= sessionStorage.getItem('imgUrlSession')
    setImgUserSession(data)

    const data2= sessionStorage.getItem('postSlug')
    setPostSlug(data2)

    sessionStorage.getItem('emailx') && setEmailx(`${sessionStorage.getItem('emailx')}`)
    sessionStorage.removeItem("emailxx")
  }, [successState, close, /* name, email */ ])

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);

  const initialState: StateConsulta = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createConsulta, initialState);
  const polo= estado.message === "consultaCreada"

  const initialStatexx: StateVerificationToken  = { message: null, errors: {} };
  const [estadoxx, formActionxx, isPendingxx] = useActionState(createVerificationToken, initialStatexx);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(
      authenticate,
      undefined,
    );

  // console.log("sessionImage: ", sessionStorage.getItem("imgUserSession"))
  console.log("name: ", name)
  console.log("email: ", email)
  // console.log("imageUser: ", imageUser)
  console.log("imgUserSession: ", imgUserSession)
  // const comm= commentLast && commentLast[0].avatar
  console.log("commentLast: ", commentLast ) 


  return (
    <>
      <Frente className=" p-2 text-small-regular sm:p-4 !bg-[#020b1d16] ">
        <div className="flex items-center justify-between sm:flex-row" >
          <div className="relative flex items-center">
            <IconConsulta 
              className=" ml-1.5 w-[22px] sm:ml-3 " 
              color="#fffc" color2="#39507fcc"
            />
            <p className="ml-4 text-sm text-[#39507f]">Consulta <span className=" text-[#ff0000]">*</span></p>
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
              'max-h-[1000px] opacity-100 mt-2 sm:mt-4': openConsulta,
              'max-h-0 opacity-0 invisible': !openConsulta,
            },
          )}>
          <TextareaCnp
            className={` ${consulta && "opacity-90"}`}
            id="consulta"
            name="consulta"
            placeholder= "..."
            required
            rows={2}
            maxLength={1024}
            wrap="hard"
            value={consulta}
            onChange={(e) => {
              setConsulta(e.target.value);
            }}
            autoFocus
            disabled={emailxx || emailx  ? true : false}
          />
        </div>
      </Frente>

      {/* adjuntar archivos */}
      <Frente 
       className=" p-2 mt-2 text-small-regular sm:p-4 !bg-[#020b1d16] "
      >
        <div className="flex items-center justify-between sm:flex-row" >
          <div className="relative flex items-center gap-5">
            <IconArchivo className=" ml-1.5 w-8 sm:ml-3 " />
            <div className={`w-full text-start text-[14px] text-[#39507f] `}>
              Adjuntar archivos <span className="text-xs opacity-80">(Opcional)</span>
            </div>
          </div>
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
            {state ? ( 'Cancelar' ) : ( <div> {' '} Adjuntar {/* <span className="text-xs uppercase">Archivos</span> */}
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
                <div className={`flex flex-col bg-[#020b1db8] rounded-lg ${!images.length ? 'gap-0' : 'gap-0.5'} ${!state && "invisible"}`} >
                  <button
                    type="button"
                    onClick={onImageUpload}
                    {...dragProps}
                    className={`group rounded-lg w-full disabled:!cursor-default `}
                    disabled= {!state}
                  >
                    <div className={`relative label-dnd  ${!images.length ? 'rounded-lg' : 'rounded-t-lg'} bg-[#020b1d] text-[#ffffffdd] w-full p-2 duration-150 text-sm flex flex-col justify-center items-center active:opacity-80 `}>
                      <div className="flex flex-col items-center duration-150 opacity-90 group-hover:opacity-100 min-[512px]:flex-row ">
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

                  <div className= "flex flex-col rounded-b-lg bg-[#020b1d] ">
                    <div className= {`flex items-baseline justify-start px-3 gap-x-2 flex-wrap text-sm w-full cursor-default max-[512px]:justify-center sm:px-9 sm:gap-x-4 `}>
                      { images.map((image, index) => (
                        <div key={index} className="flex flex-col items-start pb-2 pt-2.5">
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
      { !user ? (
          <Frente className="!p-2 mt-2 text-small-regular sm:!p-4 !bg-[#020b1d16] ">
            <div className="flex items-center justify-between gap-5 ">
              <div className="mt-1.5 ">
                <IconRegistro className=" w-[24px] ml-1.5 sm:ml-3" />
              </div>

              <div className={`w-full text-start text-[14px] text-[#39507f] `}>
                Registrá un e-mail para enviarte la respuesta <span className=" text-[#ff0000]">*</span>
              </div>
                
              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setEmail(""); 
                  setName("");
                  // sessionStorage.removeItem("email")
                  // sessionStorage.removeItem("name")
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
              {/* create user */}
              <div className={`pt-2 sm:pt-4 ${!open && "invisible"} `}> 
                <form action={formActionx}>
                  <fieldset className={`mb-2 grid grid-cols-2 items-center gap-2 md:mb-4 md:flex-row md:gap-4`}>
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
                    
                    <div className={` ${sessionStorage.getItem("nombre") && "hidden"}`}>
                      <InputCnp
                        className={`text-sm h-8`}
                        id="name"
                        type="text"
                        name="name"
                        minLength={3}
                        maxLength={100}
                        value={ name }
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
                      // value={imageUser ? imageUser :  "" }
                      value={commentLast.avatar?.slice(1, -1) }
                      // value={ `${sessionStorage.getItem("imgUserSession")}`  }
                      // defaultValue={ commentLast && commentLast[0].avatar }
                      readOnly
                    />
                  </fieldset>

                  {/* Massages erros */}
                  <div
                    className="flex items-end relative space-x-8"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {estadox?.message && /* (estadox?.message !== "usuario" && estadox?.message === "Database Error: Error al crear consulta." || estadox?.message === "Campos faltantes. No se pudo crear el Usuario." || estadox?.message === "Database Error" )  && */ (
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
                      
                      // sessionStorage.getItem('imgUserSession') && setImgUserSession(`${sessionStorage.getItem('imgUserSession')}`)
                      sessionStorage.clear()
                    }}
                    disabled= {name && email && isEmailValid(`${email}`) ? false : true}
                  >
                    Registrar
                  </ButtonA>
                </form>
              </div>
            </div>
          </Frente>
        ) : (
          <Frente className={`flex items-center gap-2.5 p-2 mt-2 !bg-[#020b1d16] text-small-regular ${user && "!bg-[#d7e5d9]"} ${estado?.message === "consultaCreada" && "hidden"} sm:p-4 sm:gap-5`}>
            <IconRegistro className=" w-[24px] mt-1.5 sm:mt-2 sm:ml-3" />
            <div className={`w-full font-medium text-start text-[13px] text-[#39507f] transition-[opacity] duration-300 sm:text-sm `}>
              <p>Te enviaré la <b>respuesta</b> por email a<span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 "> {user.email}. </span></p>
            </div>
          </Frente>
        )
      }

      {estado?.message === "consultaCreada" && (
        <Frente className="!p-2 mt-2 !bg-[#d7e5d9] sm:!p-4 ">
          <div className={`w-full text-start font-medium text-sm text-[#39507f] transition-[opacity] duration-300 sm:text-[15px] `}>
            <p className="sm:text-center">Recibí la <b>consulta</b>, te responderé a la mayor brevedad.</p>
            <p className={`mt-2 font-medium ${ user?.email_verified && "hidden"} sm:text-center`}>
              Por favor, revisá el correo electrónico <span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 ">{user?.email}</span> y enviá la verificación.
            </p>
          </div>
        </Frente> 
      )}

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
      
      {/*crear consulta */}
      <form action={formAction}>
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
          value={session?.user.email ? session?.user.email : email}
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

      {/*Boton Enviar consult */}
      <div className="w-full flex justify-between items-center">
        <p className={`text-xs ml-2 ${consulta /* && (emailSession || session) */  && "opacity-0" } sm:text-[13px]`}><span className=" text-[#ff0000]">*</span> Requeridos</p>

        <div className="flex gap-4">
          {estado?.message !== "consultaCreada" ? (
            <form onSubmit={ files.length === 0 ? uploadToServer1 : uploadToServer2 } >
              <div className="group relative w-full flex justify-end items-center">
                <div className="w-[170px] absolute bottom-8 pt-3">
                  <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute w-[170px] bottom-[12px] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${ consulta ? "" : "group-hover:opacity-100"} sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span>
                </div>

                <ButtonA
                  className={`h-8 !px-4 text-sm !justify-start disabled:!opacity-60`}
                  type="submit"
                  disabled={ ( /* name && email && */ consulta) /* || session */ ? false : true }
                  onClick={() => {
                    setSpin(true);
                    user?.role === "member" && handleClickButtonVerification()
                    user?.role === "member" && handleClickButtonPedido()
                    // wait().then(() =>{ 
                    //   user?.role !== "memberAccount" && handleClickButtonVerification()
                    //   user?.role !== "memberAccount" && handleClickButtonPedido()
                    //   sessionStorage.setItem('emailx', `${email}`) ;
                    //   setEmailx(`${sessionStorage.getItem('emailx')}`)
                    //   sessionStorage.setItem('name', `${name}`) ;
                    // });
                  }}
                >
                  <IconCambio
                    className={`${(spin || isPending || isPendingxx ) && "animate-spin"} mr-2 w-[22px] h-[22px] `}
                  />
                  <div className="w-full">
                    Enviar consulta
                  </div>
                </ButtonA>
              </div>
            </form>
          ) :/*  !emailx && session && !polo ? (
              <form onSubmit= { files.length === 0 ? uploadToServer1 : uploadToServer2 }  >
                <div className="group relative w-full flex justify-end items-center">
                  <div className="w-[170px] absolute bottom-8 pt-3">
                    <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute w-[170px] bottom-[12px] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${consulta ? "" : "group-hover:opacity-100"} sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span>
                  </div>
                  <ButtonA
                    className={`h-8 !px-4 text-sm !justify-start disabled:!opacity-60`}
                    type="submit"
                    disabled={ consulta ? false : true }
                    onClick={() => {
                      wait().then(() =>{ 
                        sessionStorage.setItem('emailxx', "xxxx") ;
                        setEmailxx(`${sessionStorage.getItem('emailxx')}`)
                      });
                    }}
                  >
                    <IconCambio
                      className={`${(spin || isPending || isPendingx || isPendingxx || isPendingAuth) && "animate-spin"} mr-2 w-[22px] h-[22px] `}
                    />
                    <div className="w-full">
                      Enviar nueva consulta
                    </div>
                  </ButtonA>
                </div>
              </form>
            ) : */ (
            <div className="flex justify-end items-center gap-4">
              <ButtonA
                className="h-8 text-sm !justify-start"
                type="button"
                onClick={() => {
                  // sessionStorage.removeItem("name")
                  // sessionStorage.removeItem("emailx")
                  // sessionStorage.removeItem("emailxx")
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
          value="/realizar-consulta"
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
      
      {/* authentication */}
      <form action={formActionAuth} className="">
        <input
          id="email"
          type="hidden"
          name="email"
          value={email}
          readOnly
        />
        <input
          id="password"
          type="hidden"
          name="password"
          value= "xxxxxx"
          readOnly
        />
        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          type="submit" 
          ref={buttonRefAuth}
          className="hidden"
        >
          Continuar
        </button>
      </form>
    </>
  );
}
