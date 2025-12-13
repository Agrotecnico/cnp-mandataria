'use client';

import { FormEvent, useState, useEffect, useRef, useActionState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { Disclosure, DisclosurePanel } from '@headlessui/react';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { ToastContainer, toast, Zoom, Flip } from 'react-toastify';

import { createConsulta, createVerificationToken, StateConsulta, StateVerificationToken, updateUserEmail, StateUserEmail, updateCommentEmail, StateUpdateCommentEmail, createUser2, StateUser, authenticate3, authenticate, authenticate2, handleFormPedido } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import useToggleState from "@/app/lib/hooks/use-toggle-state";
import IconConsulta from "@/app/ui/logosIconos/icon-consulta"
import IconCambio from '@/app/ui/logosIconos/icon-cambio';
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconEmail2 from "@/app/ui/logosIconos/icon-email2"
import IconRegistro from "@/app/ui/logosIconos/icon-registro"
import IconAdjunto from '@/app/ui/logosIconos/icon-adjunto';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import { ButtonB, ButtonA } from '@/app/ui/button';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import { nanoid } from "nanoid";
import { User } from '@/app/lib/definitions';
import 'react-toastify/dist/ReactToastify.css';
import NotifyVerified from '@/app/ui/consultas/notify-verified';
import NotifyVerify from '@/app/ui/consultas/notify-verify';
import './styles.css';

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export default function RealizarConsulta({ 
  user
}: { 
  user: User | undefined 
}) {
  
  const [consulta, setConsulta] = useState('');
  const [successState, setSuccessState] = useState(false)

  // Archivos adjuntos a consulta (imageUrl e images)
  const [imageUrl, setImageUrl] = useState<string>("");
  const [images, setImages] = useState<ImageListType>([]);

  const [nameVisitor, setNameVisitor] = useState("");

  const [spin, setSpin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");

  const { state, close, toggle } = useToggleState()
  const [consultaDisabled, setConsultaDisabled] = useState(false);

  const pathname = usePathname();
  const tokenx= nanoid()
  const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"
  const id= user?.email!
  const maxNumber = 2;

  const isEmailValid= (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    return regex.test(email);
  }

  const searchParams = useSearchParams();
  const isVerified = searchParams.get('verified')

  const files: File[]= []
  images.map((image) => {
    files.push(image.file!)
  })

  const buttonRefPedido = useRef<HTMLButtonElement>(null);
  const handleClickButtonPedido= () => {
    if (buttonRefPedido.current) buttonRefPedido.current.click()
  };

  const buttonyRef = useRef<HTMLButtonElement>(null); // create consulta
  const handleClickButton= () => {
    if (buttonyRef.current) buttonyRef.current.click()
  };

  const buttonRefVerification = useRef<HTMLButtonElement>(null);
  const handleClickButtonVerification= () => {
    if (buttonRefVerification.current) buttonRefVerification.current.click()
  };

  const buttonRefAuth = useRef<HTMLButtonElement>(null); // authentication
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const buttonRefxxxx = useRef<HTMLButtonElement>(null); // update comment email
  const handleClickButtonxxxx= () => {
    if (buttonRefxxxx.current) buttonRefxxxx.current.click()
  };

  const buttonRefxxx = useRef<HTMLButtonElement>(null); // update user email
  const handleClickButtonxxx= () => {
    if (buttonRefxxx.current) buttonRefxxx.current.click()
  };

  const refCreateUser = useRef<HTMLButtonElement>(null);
  const handleCreateUser= () => {
    if (refCreateUser.current) refCreateUser.current.click()
  };

  const enviarConsulta= () => {
    setTimeout(handleClickButton, 200) 
    console.log("Consulta creada")
  }
  const enviarConsultaxxxx= () => {
    setTimeout( () => handleClickButtonxxxx(), 200) // update comment email
    setTimeout( () => handleClickButtonxxx(), 200) // update user email
    console.log("Email comment and user updated")
  }

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };
  
  const clearState = () => {
    setSuccessState(false)
  }

  ///////////////////////////////////////////////////////////////
  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSpin(true)
      enviarConsulta();
    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };
  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const resizedBlobs: Blob[] = [];
    for (const file of files) {
      if ( file.type === "application/pdf" ) {
        resizedBlobs.push(file);
      } else {
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
        console.log('Ok imagen subida');
      }

      enviarConsulta();

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
        let scale = Math.min(maxWidth / img.width, maxHeight / img.height);

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
        <img 
          src={URL.createObjectURL(file)} 
          alt={file.name} 
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
    if (successState) {
      close()
    }
    setToken(tokenx)

    isVerified && toast(<NotifyVerified /> , {
      autoClose: undefined,
      closeButton:  false ,
      transition: Flip,
      className: `!w-full !min-h-min !mt-0 !p-0 !shadow-[0px_4px_12px_#a0b8e996] !bg-transparent !mb-0`,
    });

    !user || !isEmailVisitor && !isVerified && 
    toast(<NotifyVerify isEmailVisitor= {isEmailVisitor} consulta={consulta} email={email} user={user} />, {
      customProgressBar: true,
      hideProgressBar: true,
      transition: Flip,
      className: '!w-full !min-h-min !mt-8 !p-0 !shadow-[0_10px_20px_#c0cde7] ',
    });
  }, [])

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser2, initialStatex);

  const initialState: StateConsulta = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createConsulta, initialState);

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
  const notifyVerify = () =>
    toast(<NotifyVerify isEmailVisitor= {isEmailVisitor} consulta={consulta} user={user} email={email} />, {
      autoClose: undefined,
      closeButton:  false ,
      transition: Flip,
      className: `!w-full !min-h-min !mt-8 !p-0 !shadow-[0px_4px_12px_#a0b8e996] bg-transparent items-start mb-0`,
    });

  return (
    <>
      <Frente className=" p-2 text-small-regular sm:p-4 !bg-[#548eff16] ">
        <div className="flex items-center justify-between sm:flex-row" >
          <div className="relative flex items-center gap-2.5 sm:gap-5">
            <IconConsulta 
              className=" ml-1.5 w-[18px] sm:ml-3 sm:w-[22px] fill-[#39507fcc] " 
            />
            <p className="text-sm text-[#39507f]">Consulta <span className={` text-[#ff0000] ${consulta && "text-[#0000]"}`}>*</span></p>
          </div>
          <ButtonB
            className={`h-8 text-[13px] w-max `}
            onClick={() => { 
              setConsulta('')
            }}
            data-testid="edit-button"
            type='button'
            disabled= {!consulta}
          >
            Cancelar
          </ButtonB>
        </div>

        <div 
          className={'mt-2 overflow-visible transition-[max-height,opacity] duration-300 ease-in-out sm:mt-4'}>
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
            disabled={consultaDisabled }
          />
        </div>
      </Frente>

      {/* adjuntar archivos */}
      <Frente 
       className=" p-2 mt-2 text-small-regular sm:p-4 !bg-[#548eff16] "
      >
        <div className="flex items-center justify-between sm:flex-row" >
          <div className="relative flex items-center gap-2.5 sm:gap-5">
            <IconAdjunto className=" ml-1.5 w-[22px] sm:ml-3 sm:w-[27px]" />
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
            disabled={consultaDisabled }
          >
            {state ? ( 'Cancelar' ) : ( <div> {' '} Adjuntar
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
                <div className={` ${!state && "invisible"} flex flex-col ${!images.length ? 'gap-0' : 'gap-1.5'} `} >
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

          </DisclosurePanel>
        </Disclosure>
      </Frente>

      {/* registrar email consulta */}
      <Frente className={`${!user || isEmailVisitor ? "block" : "hidden"} py-1.5 px-2 mt-2 text-small-regular !bg-[#548effe2] sm:!px-4 `}>
        <div className={`${open ? "justify-end py-1.5 " : "justify-between "} flex items-start gap-3 sm:items-center sm:gap-5 `}>
          <div className={`${open && "hidden"} flex items-center justify-start gap-3 w-full text-[13px] text-[#ffffff] [text-shadow:_1px_1px_#3d61ad] sm:text-[15px] `}>
            <div className="mt-[3px] mb-auto sm:mt-[3px] ">
              <IconRegistro className=" w-[16px] ml-1.5 sm:w-[22px] sm:ml-3" />
            </div>
            {isEmailVisitor ? (
              <p><b>{ user.name }</b>, enviame un e-mail para mandarte la respuesta<span className="text-[15px] text-[#ff0000]  [text-shadow:_1px_1px_#fff9,_-1px_-1px_#fff9,_1px_1px_#fff9,_-1px_1px_#fff9] ml-1.5">*</span>
              </p>
            ) : (
              <p className='leading-[1.1] sm:leading-normal'>Envíame un Email para que pueda mandarte la respuesta<span className="text-[15px] text-[#ff0000]  [text-shadow:_1px_1px_#fff9,_-1px_-1px_#fff9,_1px_1px_#fff9,_-1px_1px_#fff9] ml-1.5">*</span>
              </p>
            )}
          </div>

          <div className='flex items-center gap-3'>
            {/* button submit */}
            <ButtonB
              className={`group ${!open && "hidden"} ${email && name && "!bg-[#ffffff]" } w-max h-[28px] !rounded-md text-[13px] !text-[#020b1daa] ml-auto !opacity-100 disabled:!opacity-85  disabled:hover:!opacity-85 hover:!text-[#020b1dee] `}
              onClick={() => { 
                handleCreateUser()
                setTimeout(handleClickButtonAuth, 200)
                setTimeout(notifyVerify, 2000)
              }}
              disabled= { (name || user?.name) && email && isEmailValid(`${email}`)  ? false : true}
            >
              <IconCambio fill="#548eff" className={`${(isPendingx || isPendingAuth) && "animate-spin"} fill-[#fff0] stroke-[#548eff36] mr-2 w-[26px] h-[26px] opacity-70  group-hover:opacity-100`} />{/*  */}

              <p className="w-full" >Enviar</p>
            </ButtonB>

            <ButtonB
              className={`h-[28px] text-[13px] !rounded-md w-max !opacity-100 !bg-[#ffffffcc] hover:!bg-[#ffffff] active:!opacity-70 `}
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
        </div>
        
        <div
          className={clsx(
            "transition-[max-height,opacity] duration-300 ease-in-out overflow-visible",
            {
              "max-h-[1000px] opacity-100 pb-1.5": open,
              "max-h-0 opacity-0": !open,
            }
          )}
        >
          <div className={`pt-1.5 ${!open && "invisible"} `}> 
            <fieldset className={` grid grid-cols-1 items-center gap-2 md:grid-cols-2 md:flex-row md:gap-4`}>
              <InputCnp
                className={`${email ? "bg-[#ffffff]" : "bg-[#ffffffcc]"} text-sm h-[30px] pb-[3px] !opacity-100 hover:!bg-[#ffffff] focus:!bg-[#ffffff]`}
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
                <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#548eff26]" >
                </div>
                <IconEmail2  className="absolute w-[14px] left-[9px] top-[7px] " color="#39507fcc" />
              </InputCnp>
              
              <div className={` ${isEmailVisitor && "hidden"}`}>
                <InputCnp
                  className={`${name ? "!bg-[#ffffff]" : "!bg-[#ffffffcc]"} text-sm h-[30px] pb-[3px] !opacity-100 hover:!bg-[#ffffff] focus:!bg-[#ffffff]`}
                  id="name"
                  type="text"
                  name="name"
                  minLength={2}
                  maxLength={100}
                  value={ name /* ? name : nameVisitor ? nameVisitor : "" */ }
                  placeholder= "Nombre"
                  required
                  disabled={ !open }
                  onChange={(e) => {
                    setName(e.target.value);
                  }} >
                  <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#548eff26]" >
                  </div>
                  <IconCuenta  className="absolute w-[14px] left-[9px] top-[7px] " color="#39507fcc" />
                </InputCnp>
              </div>
            </fieldset>

            {/* Massages erros */}
            <div
              className="flex items-end relative space-x-8"
              aria-live="polite"
              aria-atomic="true"
            >
              {estadox?.message && estadox.message !== "usuario" && (
                <>
                  <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                  <p className="pt-4 text-sm text-red-500">{estadox?.message}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </Frente>

      {/* <div
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
      </div> */}

      {/*Boton Enviar consult */}
      <div className="mt-3 w-full flex justify-between items-start ">{/* items-center */}

        <p className={`text-xs ml-2 ${consulta && user?.email && !isEmailVisitor  && "opacity-0" } sm:text-[13px]`}><span className=" text-[#ff0000]">*</span> Requeridos</p>
        

        {estado?.message !== "consultaCreada" ? (
          <form onSubmit={ files.length === 0 ? uploadToServer1 : uploadToServer2 } >
            <div className="group relative w-full flex justify-between items-center">

              <div className="w-[188px] absolute bottom-8 pt-3">

                {/* <span className={`opacity-0 invisible text-xs text-[#020b1d] absolute w-[170px] bottom-[12px] bg-[#ffffff] pt-[3px] pb-[5px] pl-1.5 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${ consulta && user?.email ? "" : "group-hover:opacity-100"} sm:text-[13px] group-hover:visible`}><span className="text-base text-[#ff0000]">* </span>Completar requeridos</span> */}

                <span className={`items-center hidden text-[13px] text-[#020b1dcc] absolute h-8 w-max -bottom-[32px] right-[200px] bg-[#ffffff] py-auto pl-2 pr-3 rounded-lg duration-150 shadow-[0_20px_25px_-5px_rgb(0_0_0_/_0.2),_0_8px_10px_-6px_rgb(0_0_0_/_0.2),_0px_-5px_10px_#00000012] ${ consulta && user?.email ? "bottom-9" : "group-hover:opacity-100"} sm:text-[13px] group-hover:flex`}><span className=" text-[#ff0000] mx-1">* </span>Completar requeridos</span>


              </div>

              <ButtonA
                className={`h-8 w-max !px-3 text-[13px] !justify-start disabled:!opacity-100 `}
                type="submit"
                disabled={ consulta && user?.email && !isEmailVisitor ? false : true }
                onClick={() => {
                  setSpin(true);
                  user?.role === "member" && handleClickButtonVerification()
                  user?.role === "member" && handleClickButtonPedido()
                  limpiarNotificaciones()
                  wait().then(() => {
                    setConsultaDisabled(true)
                    notifyVerify()
                  })
                }}
              >
                <IconCambio
                  className={`${(spin || isPending || isPendingxx ) && "animate-spin"} fill-[#fff0] stroke-[#ffffff55] mr-1.5 w-[22px] h-[22px] `}
                />
                <div className="w-full text-start">
                  Enviar consulta
                </div>
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
              Realizá nueva consulta
            </ButtonA>
          </div>
        )}
      </div>
      
      <ToastContainer  className={ !isVerified  ? "foo" : "foo2" } autoClose={false} />


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
          value= {token}
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

      {/*crear consulta */}
      <form action={formAction}>
        <input
          type="hidden"
          name="archivos_url"
          value={imageUrl ? imageUrl : '["https://res.cloudinary.com/dchmrl6fc/image/upload/v1740640515/sin-adjuntos_ut7col.png"]' }
          readOnly
        />
        <input
          type="hidden"
          name="consulta"
          value={consulta}
          readOnly
        />
        <input
          type="hidden"
          name="email_id"
          value={user?.email ? user.email : email}
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

      {/*create user */}
      <form action={formActionx}>
        <input
          type="hidden"
          name="email"
          value={ email }
          readOnly
        />
        <input
          type="hidden"
          name="name"
          value={ name ? name : user?.name }
          readOnly
        />
        <input
          type="hidden"
          name="image"
          value={ "" }
          readOnly
        />
        <input
          type="hidden"
          name="token"
          value= {token }
          readOnly
        />
        <button
          type="submit"
          ref={refCreateUser}
          className= "hidden " 
        >
          Enviar Consulta
        </button>
      </form>
    </>
  );
}