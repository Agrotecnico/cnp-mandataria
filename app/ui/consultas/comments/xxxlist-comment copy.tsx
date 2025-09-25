"use client"

import Image from 'next/image';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import {
  ExclamationCircleIcon,
  UserIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react"
import clsx from 'clsx';

import { User, CommentsPost, Post } from "@/app/lib/definitions";
import  distanceToNow  from "@/app/lib/dateRelative";
import { Fondo } from "@/app/ui/marcos";
import DeleteComment from './delete-comment';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from "@/app/ui/logosIconos/icon-drag-drop";
import { createComment, StateComment, updateUserImage, StateUserImage } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import IconComments from "@/app/ui/logosIconos/icon-comments"
import { ButtonB, ButtonA } from '@/app/ui/button';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function ListComment({ 
  comments,
  user,
  post
  }: {
  comments: CommentsPost[]
  user: User | undefined
  post: Post
  }) {

  
  const [nombre, setNombre] = useState("");
  const [comment, setComment] = useState('');

  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [commentOk, setCommentOk] = useState(true);
  const [comme, setComme] = useState(true);

  const [name, setName] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);


  const { data: session, update } = useSession()

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
  setImages(imageList);
  };

  const maxNumber = 1;

  const renderFilePreview = (file: File ) => { 
    const fileType = file?.type; 
    if (fileType.startsWith('image/')) { 
      return ( 
        <Image 
          src={URL.createObjectURL(file)} 
          alt={file.name} 
          width={50}
          height={50}
          className=" object-cover bg-[#ffffffaa] rounded-full w-[50px] h-[50px] border border-[#1d021544]"
        />
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

  const files: File[]= []
  images.map((image) => {
    files.push(image.file!)
  })
  const file: File | undefined = images ? images[0]?.file : undefined

  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const guardarConsulta= () => {
    if (files.length === 0) {
      // setTimeout(() => handleClickButton(), 200)
      handleClickButton()
      console.log("Consulta creada")
      setSpin(false)
    }  return null; 
  }
  const enviarConsulta= () => {
    setTimeout(() => handleClickButton(), 200) 
    // user?.image === null && setTimeout(handleClickImage, 200)
    // setTimeout(handleClickImage, 200) 
    // setSpin(false)
    console.log("Consulta creada")
  }

  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // setSpin(true)
      guardarConsulta();
      // {session ? enviarConsultax() : enviarConsulta() }
    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };
  ///////////////////////////////////////////////////////////////
  const uploadToServer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    try {
      const data = new FormData();
      data.set('file', file );

      const response = await fetch('/api/upload-query', {
        method: 'POST',
        body: data,
      });

        //  console.log('Res:', response);

      const responseData = await response.json();
      
      setImageUrl(responseData.urls);

     console.log('responseData:', responseData);

      if (response.ok) {
        console.log('File uploaded successfully');
      }
      // guardarConsulta();
      enviarConsulta()

    } catch (error) {
      console.error(error);
    }
    // setSpin(false)
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
        console.log('Ok imagen subida');
      }

      enviarConsulta();

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };

  useEffect(() => {
    // sessionStorage.removeItem("nombre")
    // sessionStorage.removeItem("comment")
    setComme(true)
    setCommentOk(true)
    user?.name && setNombre(`${user?.name}`)
    user?.email && setEmail(`${user?.email}`)
    user?.image && setImageUrl(`${user?.image}`)

    // setImageUrl("")
    // setError(false)
    // user?.image && setImageUrl(`${user?.image}`)
  }, [/* comme, commentOk */]);

  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction] = useActionState(createComment, initialState);

   const initialStatex: StateUserImage = { message: null, errors: {} };
  const updateUserWithId = updateUserImage.bind(null, `${user?.id}`);
  const [estadox, formActionx] = useActionState(updateUserWithId, initialStatex);

  // const avatar: string = comments[0].avatar && JSON.parse(`${comments[0].avatar}`);
  // console.log("CommentImage: ", comments[0]?.avatar)
  console.log("Comment: ", comments)
  console.log("comme: ", comme)
  console.log("commenOk: ", commentOk)

  return (
    <div className="relative space-y-5 mt-6">

      {/* Form Crear comment */}
      <div className={` ${commentOk === true ? "block" : "hidden"}`}>
        <p className={` text-sm sm:text-[15px] `}>
            <span>{session?.user.name ? (<span><b>{session.user.name}</b>, p</span>) : "P" }odés ampliar esta consulta</span>
        </p>
        
        <Frente className={`!p-2 w-full mt-2 mb-9 text-small-regular sm:!p-4 !bg-[#39507f11]`}>
          <div className={`flex items-center justify-between gap-2.5 sm:gap-5 ${open && "mb-4"}`}>
            <div className="w-max">
              <IconComments className="opacity-80 w-9 sm:w-10" />
            </div>

            <p className={`w-full text-start leading-[1.2] delay-50 text-[13px] text-[#39507f] transition-[opacity] duration-300 ${open && "opacity-0"} sm:text-[15px]`}>
              Comentá tu experiencia
            </p>

            <ButtonB
              className={`h-8 text-[13px]  w-max`}
              onClick={() => { setOpen(!open); setComment(""); setNombre("")/* ; setImageUrl("") */ }}
              data-testid="edit-button"
              data-active={open}
            >
              {open ? "Cancelar" :  <div className="text-[13px] overflow-auto whitespace-nowrap"> Comentar</div>  }
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
            {/* Form Crear comment  */}
            <div className={` ${!open && "invisible"}`} > 
              {/* nombre */}
              <fieldset className={`grid grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4`}>
                {/* { !user  && ( */}
                <InputCnp
                  className={`text-sm h-8 mb-4 !w-full placeholder:text-[#000000aa] placeholder:text-[13px]  ${!open && "invisible"} ${user && "hidden"}`}
                  id="nombre"
                  name="nombre"
                  type="text"
                  minLength={3}
                  maxLength={100}
                  value={ nombre }
                  placeholder= "Nombre..."
                  required
                  disabled={ !open }
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                >
                  <div className="absolute rounded-l-[4px] h-[32px] w-[32px] left-0 top-0 bg-[#020b1d0b]" >
                  </div>
                  <IconCuenta  className={`absolute w-[14px] left-[9px] top-[9px]  ${nombre ? "hidden" : "block"}`} color="#39507faa" />
                </InputCnp>
                  {/* )}  */}
              </fieldset>

              {/* comment */}
              <TextareaCnp
                id="comment"
                name="comment"
                className={`text-sm placeholder:text-[#000000aa] placeholder:text-[13px] `}
                rows={3}
                placeholder={`Comentario...`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                disabled={ !open }
              />

              {/* Massages erros */}
              <div
                className="flex items-end relative space-x-8 "
                aria-live="polite"
                aria-atomic="true"
              >
                {estado?.message && (
                  <>
                    <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                    <p className="pt-4 text-sm text-red-500">{estado?.message}</p>
                  </>
                )}
              </div>
            </div>

            {/* crear comment */}
            <form action={formAction}>
              <div className="flex justify-center gap-3 ml-2 ">
                <input
                  type="hidden"
                  id="nombre"
                  name="nombre"
                  value= {nombre}
                  readOnly
                />

                <input
                  type="hidden"
                  id="email_id"
                  name="email_id"
                  value= {email ? email : "comment@gmail.com"}
                  readOnly
                />

                <input
                  type="hidden"
                  id="avatar"
                  name="avatar"
                  value= { imageUrl ? imageUrl : "" }/* https://res.cloudinary.com/dchmrl6fc/image/upload/v1746358221/amy-burns_yqljpt.png */
                  readOnly
                />

                <input
                  type="hidden"
                  id="comment"
                  name="comment"
                  value= {comment}
                  readOnly
                />

                <input
                  type="hidden"
                  id="post_slug"
                  name="post_slug"
                  value= {post.slug}
                  readOnly
                />
                {/* <button
                  type="submit"
                  ref={buttonyRef}
                  className= "hidden"
                >
                  enviar
                </button> */}
                <div className={`flex items-center justify-end w-full gap-4 mt-4 text-sm `}>
                  <ButtonA
                    type="submit"
                    className={`h-8 text-[13px] w-max `}
                    disabled={ comment && nombre ? false : true }
                    onClick={() => {
                      setImages([])
                      setOpen(!open);
                      setComme(!comme);
                      setCommentOk(!commentOk)
                    }}
                  >
                    Crear comentario
                  </ButtonA>
                </div>
              </div>
            </form>

            {/* <form 
              action={formAction}
              className={` ${!open && "invisible"}`}>
              <input
                type="hidden"
                id="nombre"
                name="nombre"
                value= { nombre}
                readOnly
              />

              <input
                type="hidden"
                id="email_id"
                name="email_id"
                value= { email ? email : "" }
                readOnly
              />

              <input
                type="hidden"
                id="avatar"
                name="avatar"
                value= {imageUrl }
                readOnly
              />

              <input
                type="hidden"
                id="comment"
                name="comment"
                value= {comment}
                readOnly
              />

              <input
                type="hidden"
                id="post_slug"
                name="post_slug"
                value= {post.slug}
                readOnly
              />

              <div className={`flex items-center justify-end gap-4 mt-4 text-sm `}>
                {imageUrl ? (
                  <ButtonA
                    className={`h-8 text-[13px] w-max`}
                    disabled={ comment ? false : true }
                    onClick={() => {
                      wait().then(() => setComment(""));
                      setOpen(!open);
                    }}
                  >
                      Guardar
                  </ButtonA>
                ) : (
                  <ButtonA
                    type="button"
                    className={`h-8 text-[13px] w-max `}
                    disabled={ comment && nombre ? false : true }
                    onClick={() => {
                      setOpen(!open);
                      setComme(false);
                      setCommentOk(false)
                    }}
                  >
                    Ver comentario
                  </ButtonA>
                )}
              </div>
            </form> */}

            {/* <div className={`flex items-center justify-end gap-4 mt-4 text-sm `}>
              {user?.image ? (
                <ButtonA
                  className={`h-8 text-[13px] w-max`}
                  disabled={ comment ? false : true }
                  onClick={() => {
                    wait().then(() => setComment(""));
                    setOpen(!open);
                  }}
                >
                    Guardar
                </ButtonA>
              ) : (
                <ButtonA
                  type="button"
                  className={`h-8 text-[13px] w-max `}
                  disabled={ comment && nombre ? false : true }
                  onClick={() => {
                    setImages([])
                    setOpen(!open);
                    setComme(false);
                    setCommentOk(false)
                  }}
                >
                  Ver comentario
                </ButtonA>
              )}
            </div> */}

            
          </div>
        </Frente>
      </div>

      {/* Actualizar avatar comment */}
      <div className={`absolute -top-[79px] left-[-3px] w-full gap-2 flex flex-col -mb-3 } ${comme === true ? "hidden" : "block" } `}>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          // onError={onError}
          maxNumber={maxNumber}
          dataURLKey="data_url"
          maxFileSize= {3000000}
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
            <div className={`flex flex-col `} >
              <button
                type="button"
                onClick={onImageUpload}
                {...dragProps}
                className={`group disabled:!cursor-default w-60 `}
                disabled= {imageList.length == maxNumber}
              >
                <div 
                  className={`relative label-dnd w-full ml-1 duration-150 text-sm flex flex-col justify-center items-start active:opacity-60  `}>
                  {errors ? (
                    <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] py-0.5 px-2 bg-[#39507fcc] rounded-xl `}>
                      {errors.maxNumber && (
                        <span>La cantidad excede el máximo permitido</span>
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
                  ) : (
                    <div className={` ${images.length ? "hidden" : "flex"} h-8 w-full bg-[#39507f22] rounded-md flex items-center justify-evenly outline-1 outline-dashed outline-[#999] outline-offset-1  min-[512px]:flex-row  ${isDragging ? 'outline-[#666] bg-[#ffffff33] ' : undefined}  ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"} `}>
                      <IconDragDrop color="#39507f" className= "w-[22px] opacity-80 rotate-45 " />
                      <p className={`text-[12.5px] tracking-wide leading-[1.5] py-0.5 px-2 `}>Click o arrastrá y solta aquí</p>
                    </div>
                  )}

                  <div 
                    className={`absolute h-8 ${images.length ? "left-0 top-0 w-[177px] hidden" : "left-0 top-0 w-full block"} border border-[#39507f06]  bg-[#39507f00] rounded-md outline-1 outline-dashed outline-[#999]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55] ' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                    >
                  </div>

                  <div 
                    className={`absolute  w-[50px] h-[50px] ${images.length ? "left-[8px] top-[48px]" : "left-[8px] top-[48px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-full outline-1 outline-dashed outline-[#999]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                    >
                  </div>

                  <div 
                    className={`absolute  w-[60px] h-[60px] ${images.length ? "left-[7px] top-[43px] " : "left-[12px] top-[48px] hidden"}  bg-[#39507f00] rounded-full outline-1 outline-dashed outline-[#00000000]  outline-offset-1   ${isDragging ? 'outline-[#000] bg-[#39507f66]' : undefined}   `}
                    >
                  </div>
                </div>
              </button>

              <div className= "flex flex-col items-start rounded-b-lg">
                <div className= {`flex items-baseline justify-start gap-x-2 flex-wrap ${images.length ? "mt-0" : "pt-4"} text-sm w-full cursor-default max-[512px]:justify-center sm:gap-x-4 `}>
                  <div className="w-full flex flex-col items-start">
                    <div className="w-full flex flex-col-reverse justify-start gap-4">
                      <div className={`flex justify-between items-end rounded-full ml-3`}>
                        { files.length ? (
                          renderFilePreview( images[0].file! )
                        ) : (
                          <div className="flex flex-col h-[50px] w-[50px] items-center justify-center rounded-full bg-[#dee1e8] text-2xl text-[#39507faa] ">
                            <p className=" text-xs ">Cargá</p>
                            <CameraIcon className="w-4 mt-0.5" color='#39507faa' />
                          </div> 
                        )}
                        {/* //////////////////////////////////////*/}
                        <form onSubmit={  /* user  ? uploadToServer2 :  */uploadToServer1  } >
                          <div className="flex justify-center gap-3 mb-0.5 ml-2 ">
                            <button
                              type="submit"
                              // ref={buttonyRef}
                              onClick={() => {
                                setSpin(true);
                                wait().then(() =>{ 
                                  // setImages([])
                                  setComme(true)
                                  setCommentOk(true)
                                  
                                });
                              }}
                              className={`${spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden  px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#548eff] opacity-80 duration-150 rounded-lg hover:opacity-100 `}
                            >
                              enviar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setNombre("")
                                setComment("")
                                setComme(true)
                                setCommentOk(true)
                              }}
                              className="px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#39507f] opacity-80 duration-150 rounded-lg hover:opacity-100"
                            >
                              eliminar
                            </button>
                          </div>
                        </form>
                      </div>

                      <div className={` ${images.length ? "flex" : "hidden"} text-[13px] items-center justify-start  gap-[1px] `}>
                        <button 
                          onClick={() => {
                          onImageUpdate(0)
                          }} 
                          className="flex items-center gap-1.5 h-8 bg-[#39507f22] px-2 py-0.5 cursor-pointer rounded-l-md duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                          disabled= {!files.length}
                        >
                          <CameraIcon className="w-4" color='#39507faa' />Cambiar
                        </button>
                        <button 
                          onClick={() => {
                          onImageRemove(0)
                          setImages([])
                          }} 
                          className="flex items-center gap-1.5 h-8 bg-[#39507f22] px-2 py-0.5 cursor-pointer rounded-r-md duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                          disabled= {!files.length}
                          >
                          <CameraIcon className="w-4" color='#39507f88' />Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ImageUploading>

        <Fondo className="hidden space-x-4 w-full mb-8 p-3 pb-2 !bg-[#39507f11] !rounded-[6px] ">
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap">
                <p className="font-semibold mr-2">
                  {nombre}
                </p>
                <p className="text-[#020b1d66]">
                  hace 2 segundos
                </p>
              </div>

              {/* crear comment */}
              {/* <form action={formAction}>
                <div className="flex justify-center gap-3 ml-2 ">
                  <input
                    type="hidden"
                    id="nombre"
                    name="nombre"
                    value= {nombre}
                    readOnly
                  />

                  <input
                    type="hidden"
                    id="email_id"
                    name="email_id"
                    value= {email ? email : "comment@gmail.com"}
                    readOnly
                  />

                  <input
                    type="hidden"
                    id="avatar"
                    name="avatar"
                    value= {imageUrl ? imageUrl : ""}
                    readOnly
                  />

                  <input
                    type="hidden"
                    id="comment"
                    name="comment"
                    value= {comment}
                    readOnly
                  />

                  <input
                    type="hidden"
                    id="post_slug"
                    name="post_slug"
                    value= {post.slug}
                    readOnly
                  />
                  <button
                    type="submit"
                    ref={buttonyRef}
                    className= "hidden"
                  >
                    enviar
                  </button>
                </div>
              </form> */}

              {/* actualizar image user  */}
              <form action={formAction} className="hidden">
                {/* Image */}
                  <input
                    id="image"
                    type="text"
                    name="image"
                    value={imageUrl}
                    readOnly
                  />
                {/* Massages */}
                <div
                  className= "flex items-end relative space-x-8"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {estado?.message && (
                    <>
                      <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                      <p className="pt-4 text-sm text-red-500">
                        {estado?.message}
                      </p>
                    </>
                  )}
                </div>

                {/* Guardar cambio */}
                  <button
                    type="submit"
                    ref={buttonRef}
                    onClick={() => {
                      // location.reload();
                    }}
                  >
                    Guardar cambios
                  </button>
              </form>

              {/*   */}
              {/* <form onSubmit={ !user && files.length === 0 ? uploadToServer1 :  uploadToServer2 } > */}
              <form onSubmit={  /* user  ? uploadToServer2 :  */uploadToServer1  } >
                <div className="flex justify-center gap-3 ml-2 ">
                  <button
                    type="submit"
                    // ref={buttonyRef}
                    onClick={() => {
                      setSpin(true);
                      wait().then(() =>{ 
                        // setImages([])
                        setComme(true)
                        setCommentOk(true)
                        
                      });
                    }}
                    className={`${spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden  px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#548eff] opacity-80 duration-150 rounded-lg hover:opacity-100 `}
                  >
                    enviar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNombre("")
                      setComment("")
                      setComme(true)
                      setCommentOk(true)
                    }}
                    className="px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#39507f] opacity-80 duration-150 rounded-lg hover:opacity-100"
                  >
                    eliminar
                  </button>
                </div>
              </form>

            </div>

            <div className=" mt-1 leading-relaxed">
              {/* {comment} */}
            </div>
          </div>
        </Fondo>
      </div>

      {/* List comment */}
      {comments &&
        comments.map((comment, index) => {
          // const avatar: string = comments[0].avatar && JSON.parse(`${comments[index].avatar}`);
          const isAuthor = user && user.email === comment.email_id;
          // const isAdmin =user && user.role === "admin";
          const isAdmin =user?.role === "admin" ? true : false;
          // const isMember =user && user.role === "member";

          return (
            <div key={index} className="flex flex-col gap-1">
              {/* { index !== 0 ? ( */}
                <div className={`flex-shrink-0 ml-0`}>
                  {comment.image || comment.avatar ? (
                    <Image
                      src={`${comment.image ? comment.image : JSON.parse(`${comment.avatar}`) }`}
                      alt="Imagen de usuario"
                      width={40}
                      height={40}
                      className="rounded-full object-cover ml-3 h-10 w-10"
                    />
                  ) : (
                    <span className="flex ml-3 h-10 w-10 text-[#39507fcc] items-center justify-center rounded-full bg-[#020b1d18] text-2xl ">
                      {comment.nombre ? `${comment.nombre?.substring(0, 1).toUpperCase()}` : `${comment.name?.substring(0, 1).toUpperCase()}` }
                    </span>
                  )}
                </div>
                {/* ) : (
                  ""
                )} */}
              

              <Fondo key={comment.id} className="flex space-x-4 w-full p-3 pb-2 !bg-[#39507f11] !rounded-[6px] ">
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap">
                      <p className="font-semibold mr-2">{!comment.nombre ? comment.name : comment.nombre}</p>
                    
                      <time className="text-[#020b1d66]">
                        {distanceToNow(new Date(`${comment.created_at}`))}
                      </time>
                    </div>
                    { (isAdmin || isAuthor)   /* || isMember */   &&
                      <DeleteComment id={comment.id} />
                    }
                  </div>
                  <div className=" mt-1 leading-relaxed">
                    {comment.comment}
                  </div>
                </div>
              </Fondo>
            </div>
          );
        })}
    </div>
  );
}
