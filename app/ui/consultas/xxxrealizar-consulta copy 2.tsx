'use client';

import { useFormState } from 'react-dom';
import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useMemo, useRef } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { User } from '@/app/lib/definitions';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from "next-auth/react"

import IconConsultaRight from "@/app/ui/logosIconos/icon-consulta-right"
import IconConsulta from "@/app/ui/logosIconos/icon-consulta"
import { createConsulta, createVerificationToken, StateConsulta, StateVerificationToken } from '@/app/lib/actions';
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
import { handleFormRegistro } from '@/app/lib/actions';
import { handleFormPedido } from '@/app/lib/actions';
import { nanoid } from "nanoid";
import { emailVerification } from '@/app/lib/brevo/email-verification';
import { fetchUserById, fetchUserByEmail } from '@/app/lib/data';
import { isUndefined } from 'util';
import { authenticate } from '@/app/lib/actions';



const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


export default /* async */ function RealizarConsulta( /* { user }: { user: User | undefined  }  */ ) {

  const { data: session, update } = useSession()
  //  const router = useRouter()
  
  const [consulta, setConsulta] = useState('');
  const [successState, setSuccessState] = useState(false)

  const [imageUrl, setImageUrl] = useState<string>("");
  const [spin, setSpin] = useState(false);
  const [images, setImages] = useState<ImageListType>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [namex, setNamex] = useState("");
  const [emailx, setEmailx] = useState("");

  const [emailParam, setEmailParam] = useState("");
  // const [name, setName] = useState(`${user?.name}`);
  

  const [open, setOpen] = useState(false);
  const [openConsulta, setOpenConsulta] = useState(true);
  const [emailSession, setEmailSession] = useState(false);

  const [estadoRegistrar, setEstadoRegistrar] = useState(false)

   const searchParams = useSearchParams();
   // const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const callbackUrl = searchParams.get('/realizar-consulta') || '/realizar-consulta';

  const token= nanoid()

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

  const buttonRefVerification = useRef<HTMLButtonElement>(null);
  const handleClickButtonVerification= () => {
    if (buttonRefVerification.current) buttonRefVerification.current.click()
  };

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const enviarConsulta= () => {
    // setSpin(true)
    setTimeout(handleClickButton, 200) 
    console.log("Consulta creada")
    setTimeout(handleClickButtonRegistro, 200) 
    console.log("User creada")
    setTimeout(handleClickButtonAuth, 200) 
    console.log("Autenticación creada")
    // // authenticate
    // handleClickButtonAuth
    // setTimeout(() => setSpin(false), 200) 
    // setSpin(false)
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
      setSpin(true)
      enviarConsulta();
      // setTimeout(handleClickButton, 200) 
      // console.log("Consulta creada")

      // setTimeout(handleClickButtonRegistro, 200) 
      // console.log("User creada")

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
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
        // console.log('File uploaded successfully');
        console.log('Imagen creada');
      }

      enviarConsulta();
      console.log("consulta creada")

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
    // searchParams.get('name') && sessionStorage.setItem('name', `${searchParams.get('name')}`)
    // searchParams.get('email') && sessionStorage.setItem('email', `${searchParams.get('email')}`)

    // searchParams.get('name') && setName(`${searchParams.get('name')}`)
    // searchParams.get('email') && setEmail(`${searchParams.get('email')}`)


    if (successState) {
      close()
    }
    // sessionStorage.getItem('name') && setName(`${sessionStorage.getItem('name')}`)
    // sessionStorage.getItem('email') && setEmail(`${sessionStorage.getItem('email')}`)

    // sessionStorage.getItem('nombre') && setName(`${sessionStorage.getItem('nombre')}`)

    if (sessionStorage.getItem('email')) {
      setEmailSession(true);
    }
  }, [successState, close, /* name, email */ ])

  // const user= undefined

  // const user = fetchUserByEmail(sessionStorage.getItem('email'))
  // const user = fetchUserByEmail(email)

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx] = useActionState(createUser, initialStatex);

  const initialState: StateConsulta = { message: null, errors: {} };
  const [estado, formAction] = useActionState(createConsulta, initialState);

  const initialStatexx: StateVerificationToken  = { message: null, errors: {} };
  // const [estadoxx, formActionxx] = useActionState(createVerificationToken, initialStatexx);

  const [errorMessage, formActionAuth, isPending] = useActionState(
      authenticate,
      undefined,
    );

  // const sessionS= sessionStorage.getItem('email') 
  // const param= searchParams.get('email')
  //  const sessionS= "email"
  // const param= "email"

  console.log("sessionxx: ", session)
  // console.log("name: ", name)
  // console.log("email: ", email)
  
  // console.log("createConsulta: ", estado)
  // console.log("createUser: ", estadox)
  // console.log("sessionStorage: ", sessionStorage.getItem('email'))
  // console.log("searchParams: ", searchParams.get('email'))


  return (
    <>
      {/* consult */}
      <Frente className=" p-2 text-small-regular sm:p-4 !bg-[#020b1d16] ">
        <div className="flex items-center justify-between sm:flex-row" >
          <div className="relative flex items-center">
            {/* <IconConsultaRight className=" ml-1.5 h-[36px] w-[30px] sm:ml-3 " /> */}
            <IconConsulta 
                className=" ml-1.5 w-[22px] sm:ml-3 " 
                color="#fffc" color2="#39507fcc"
                />
            {/* <div className="absolute top-[1px] left-6 text-[#ffffff] text-xs sm:left-[30px]">?</div> */}
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
      <Frente 
        // className={`flex flex-col mt-2 text-small-regular !p-2 !bg-[#020b1d16] ${!state && 'pb-0'} sm:!p-4 `}
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
                <div className={`flex flex-col bg-[#020b1db8] rounded-lg ${!images.length ? 'gap-0' : 'gap-0.5'} ${!state && "invisible"} `} >
                  <button
                    type="button"
                    onClick={onImageUpload}
                    {...dragProps}
                    className={`group rounded-lg w-full disabled:!cursor-default `}
                    disabled= {!state}
                  >
                    <div className={`relative label-dnd  ${!images.length ? 'rounded-lg' : 'rounded-t-lg'} bg-[#020b1d] text-[#ffffffdd] w-full p-2 duration-150 text-sm flex flex-col justify-center items-center active:opacity-80 sm:p-4 `}>
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
      {session && (
        // emailSession === false ? (
        // sessionS === null && param === null && estado?.message !== "consultaCreada" && (
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
              {/* create user */}
              <div className={`pt-2 sm:pt-4`}> 
                <form action={formActionx}>
                  <fieldset className={`mb-2 flex flex-col items-center gap-2 md:flex-row md:gap-4`}>
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
                      }} >
                      <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#020b1d0b]" >
                      </div>
                      <IconCuenta  className="absolute w-[14px] left-[9px] top-[9px] " color="#39507faa" />
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
                    {estadox?.message && estadox?.message !== "usuario" && estadox?.message === "Database Error: Error al crear consulta." && (
                      <>
                        <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                        <p className="pt-4 text-sm text-red-500">{estadox?.message}</p>
                      </>
                    )}
                  </div>
  
                  {/* button submit */}
                  {/* <div className="mt-2 text-sm sm:mt-4"> */}
                    <button
                      type="submit" 
                      ref={buttonRefRegistro}
                      // className={`h-8 text-[13px] w-max ml-auto ${!open && "hidden"}`}
                      className="hidden"
                      // onClick={() => { 
                      //   email && name && sessionStorage.setItem('name', `${name}`);
                      //   email && name && sessionStorage.setItem('email', `${email}`);
                      //   wait().then(() =>{ 
                      //     handleClickButtonVerification()
                      //     handleClickButtonRegistro()
                      //   });
                      // }}
                    >
                      Registrar
                    </button>
                  {/* </div> */}
                </form>
              </div>
            </div>
          </Frente>
        /*)  : (
          // estado?.message !== "consultaCreada" ? (
           sessionS !== null && param === null && estado?.message === "consultaCreada"  && email !== "" ? (
            <Frente className="p-2 mt-2 text-small-regular sm:p-4 !bg-[#d7e5d9]">
              <div className={`w-full text-start text-[13px] text-[#020b1ddd] transition-[opacity] duration-300 sm:text-sm `}>
                <p className="mb-1 font-semibold text-sm sm:text-[15px]">{ sessionStorage.getItem('name') }</p>
                <p>Recibimos la consulta, te responderemos a la brevedad.</p>
                {sessionStorage.getItem("email") && 
                  <p>
                    Por favor, revisá el correo electrónico <span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 ">{sessionStorage.getItem('email')}</span> y enviá la verificación.
                  </p>
                }
                
              </div>
            </Frente> 
          ) : (
            sessionS !== null && param === null && estado?.message !== "consultaCreada" ? (
            <Frente className="p-2 mt-4 text-small-regular sm:p-4 !bg-[#d7e5d9]">
              <div className={`w-full text-start text-[13px] text-[#020b1ddd] transition-[opacity] duration-300 sm:text-sm `}>
                <p className="mb-1 font-semibold text-sm sm:text-[15px]">{ sessionStorage.getItem('name') }</p>
                Correo electrónico registrado:<span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 ">{sessionStorage.getItem('email')}</span>
              </div>
            </Frente> 
            ) : sessionS !== null && param === null && estado?.message === "consultaCreada" && email === "" &&  (
              <Frente className="p-2 mt-2 text-small-regular sm:p-4 !bg-[#d7e5d9]">
                <div className={`w-full text-start text-[13px] text-[#020b1ddd] transition-[opacity] duration-300 sm:text-sm `}>
                  <p className="mb-1 font-semibold text-sm sm:text-[15px]">{ sessionStorage.getItem('name') }</p>
                  <p>Recibimos la consulta, te responderemos a la brevedad.</p>
                </div>
              </Frente> 
            )
          ) 
        ) */
      )}

      {/* {estado?.message === "consultaCreada" && (
        <Frente className="p-2 mt-2 text-small-regular sm:p-4 !bg-[#d7e5d9]">
          <div className={`w-full text-start text-[13px] text-[#020b1ddd] transition-[opacity] duration-300 sm:text-sm `}>
            <p className="mb-1 font-semibold text-sm sm:text-[15px]">{ name }</p>
            <p>Recibimos la consulta, te responderemos a la brevedad.</p>
            <p>
              Por favor, revisá el correo electrónico <span className= "underline decoration-[#020b1d81] underline-offset-2 mx-1 ">{email}</span> y enviá la verificación.
            </p>
          </div>
        </Frente> 
      )} */}

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

      {/* crear verificationToken */}
      {/* <form action={formActionxx}>
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
          ref={buttonRefVerification}
          className= "hidden " 
        >
          Crear VerificationToken
        </button>
      </form> */}

      {/* Enviar consult */}
      <div className="w-full flex justify-between items-center">
        <p className={`text-xs ml-2 ${consulta && (emailSession || session)  && "opacity-0" } sm:text-[13px]`}><span className=" text-[#ff0000]">*</span> Requeridos</p>

        <div className="flex gap-4">
          <div className={`text-[#020b1dbb] rounded-md  bg-[#020b1d0d] duration-150 hover:bg-[#020b1d17] hover:text-[#020b1d] `} >
            <button
              type="button"
              className={` py-1 px-5`}
              onClick={() => {
                sessionStorage.removeItem("email")
                sessionStorage.removeItem("name")
                location.reload()
              }}
            >{/* !emailSession */}
              Salir
            </button> 
          </div>

          { !session ? (
            <form onSubmit={ files.length === 0 ? uploadToServer1 : uploadToServer2 } >
              <div className="group relative w-full flex justify-end items-center">
                <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute w-[170px] -bottom-[100%] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${(name && email && consulta) || session ? "" : "group-hover:opacity-100"} sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span>
                <ButtonA
                  className={`h-8 !px-4 text-sm !justify-start disabled:!opacity-60`}
                  type="submit"
                  disabled={ ( name && email && consulta) || session ? false : true }
                  onClick={() => {
                    
                    /* user?.email_verified  === undefined && */ 
                    // router.refresh()

                    // setSpin(true);
                    // // crea verificationToken
                    //   handleClickButtonVerification() 
                    wait().then(() =>{ 
                      // sessionStorage.setItem('name', `${name}`);
                      
                      // sessionStorage.setItem('email', `${email}`) ;
                      
                      // create user
                    //  handleClickButtonRegistro() 
                      
                      // // authenticate
                      // handleClickButtonAuth
                      
                      // // envía email: verificación email y confirma recepción consulta
                      // handleClickButtonPedido()
                      // setSpin(false);
                      location.reload()
                    });
                  }}
                >
                  <IconCambio
                    className={`${spin && "animate-spin"} mr-2 w-[22px] h-[22px] `}
                    // fill2="#fffc"
                    // fill="#ff00ff"
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
                  className={`h-8 text-sm !justify-start ${!session && "hidden"}`}
                >
                  Ver Consultas
                </ButtonA>
              </Link>

              <ButtonA
                className="h-8 text-sm !justify-start"
                type="button"
                onClick={() => {
                  // sessionStorage.removeItem("email")
                  // sessionStorage.removeItem("name")
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

      {/* Envio e-mail recepción consulta y verificacion email */}
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
          readOnly
        />
        <input
          type="hidden"
          name="content" 
          value="prueba"
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
        {/* <input type="hidden" name="redirectTo" value="false" /> */}

        <button
          type="submit" 
          ref={buttonRefAuth}
        >
          Continuar
        </button>
      </form>
    </>
  );
}
