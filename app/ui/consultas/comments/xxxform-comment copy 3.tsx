"use client"

import { FormEvent, useState, useEffect, useRef } from 'react';
// import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import {
  ExclamationCircleIcon,
  UserIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';


import { User, CommentsPost } from "@/app/lib/definitions";
import { createComment, StateComment } from '@/app/lib/actions';
import { Post } from '@/app/lib/definitions'
import { Frente } from '@/app/ui/marcos';
import IconComments from "@/app/ui/logosIconos/icon-comments"
import { ButtonB, ButtonA } from '@/app/ui/button';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import { useActionState } from 'react';
import { useSession } from "next-auth/react"
import { Fondo } from "@/app/ui/marcos";
import { Button } from '@/app/ui/uiRadix/button';
import EditImageComment from '@/app/ui/edit-image-comment';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from "@/app/ui/logosIconos/icon-drag-drop";


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function FormComment({
   user,
   post,
  comments
  }: { 
    user: User | undefined;
    post: Post
    comments: CommentsPost[]
  }) {
  const { data: session, update } = useSession()

  const [comment, setComment] = useState('');
  const [commentOk, setCommentOk] = useState(true);
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const [comme, setComme] = useState(false);

  const [spin, setSpin] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // const buttonyRef = useRef<HTMLButtonElement>(null);
  // const handleClickButton= () => {
  //   if (buttonyRef.current) buttonyRef.current.click()
  // };

  const files: File[]= []
  images.map((image) => {
    files.push(image.file!)
  })
  const maxNumber = 1;
  // const file: File | undefined = images ? images[0]?.file : undefined
  const buttonxRef = useRef<HTMLButtonElement>(null);
  const handleClickButton= () => {
    if (buttonxRef.current) buttonxRef.current.click()
  };

  const enviarConsulta= () => {
    setTimeout(handleClickButton, 200) 
    console.log("Consulta creada")
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

  useEffect(() => {
    sessionStorage.removeItem("nombre")
    sessionStorage.removeItem("comment")
    setComme(true)
    user?.name && setName(`${user?.name}`)
    user?.email && setEmail(`${user?.email}`)
  }, []);

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };

  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction] = useActionState(createComment, initialState);

  console.log("user: ", user)
  console.log("unloadedImage: ", sessionStorage.getItem('uploadedImage'));

  return (
    <>
      <div className={` ${commentOk === true ? "block" : "hidden"}`}>
        <p className={` text-sm sm:text-[15px] `}>
          { session ? (
            <span><b>{session.user.name}</b>, podés ampliar esta consulta</span>
          ) : (
            <span>Podés ampliar esta consulta</span>
          ) }
        </p>
        
        <Frente className={`!p-2 w-full mt-2 mb-6 text-small-regular sm:!p-4 !bg-[#39507f11]`}>
          <div className={`flex items-center justify-between gap-2.5 sm:gap-5 ${open && "mb-4"}`}>
            <div className="w-max">
              <IconComments className="opacity-80 w-9 sm:w-10" />
            </div>

            <p className={`w-full text-start leading-[1.2] delay-50 text-[13px] text-[#39507f] transition-[opacity] duration-300 ${open && "opacity-0"} sm:text-[15px]`}>
              {sessionStorage.getItem('nombre') ? (
                <span className="font-semibold text-[15px] sm:text-base">
                  { sessionStorage.getItem('nombre') ? `${sessionStorage.getItem('nombre')}` :   
                  sessionStorage.getItem('name') ? `${sessionStorage.getItem('name')}` : "" }
                </span>
              ) : (
                <span>
                  {!sessionStorage.getItem('nombre') ? `Comentá tu experiencia` : "Para ampliarla comentá tu experiencia?"}
                </span>
              )} 
            </p>

            <ButtonB
              className={`h-8 text-[13px]  w-max`}
              onClick={() => { setOpen(!open); setComment(""); setNombre("") }}
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
            {/* Crear comment visitante */}
            <div className={` ${!open && "invisible"}`} > 
              {/* nombre */}
              <fieldset className={`grid grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4`}>
                { !user  && (
                  <InputCnp
                    className={`text-sm h-8 mb-4 !w-full placeholder:text-[#000000aa] placeholder:text-[13px]  ${!open && "invisible"}`}
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
                    <IconCuenta  className={`absolute w-[14px] left-[9px] top-[9px]  ${name ? "hidden" : "block"}`} color="#39507faa" />
                  </InputCnp>
                )} 
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

            <form 
              action={formAction}
              className={` ${!open && "invisible"}`}>
              <input
                type="hidden"
                id="nombre"
                name="nombre"
                value= {name ? name : nombre}
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
                {user ? (
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
                      sessionStorage.setItem("nombre", nombre)
                      sessionStorage.setItem("comment", comment)
                      setNombre(`${sessionStorage.getItem("nombre")}`)
                      setComment(`${sessionStorage.getItem("comment")}`)
                      setCommentOk(false)
                    }}
                  >
                    Ver comentario
                  </ButtonA>
                )}
              </div>
            </form>
          </div>
        </Frente>
      </div>

      <div className={`gap-2 flex flex-col ${comme === true && "hidden" }`}>
        {/* <div className="flex text-small-regular gap-12 "> */}
          <div className={`flex flex-col delay-200 `}>
            <div className="flex flex-wrap mb-[1px]">
              <div className="w-full flex flex-col items-center">
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
                    <div className={`flex rounded-lg ${!images.length ? 'gap-0' : 'gap-0.5'} `} >
                      <div className= "flex flex-col rounded-b-lg ">
                        <div className= {`flex items-baseline justify-start gap-x-2 flex-wrap text-sm w-full cursor-default max-[512px]:justify-center sm:gap-x-4 `}>
                            <div className="flex flex-col items-start">
                              <div className=" flex justify-start gap-12">
                                <div className="flex items-center w-[50px] ml-3">
                                  { files.length ? (
                                    renderFilePreview( images[0].file! )
                                  ) : (
                                    <div className="flex flex-col h-[50px] w-[50px] items-center justify-center rounded-full bg-[#39507f22] text-2xl text-[#39507f99] ">
                                      <p className=" text-xs ">Cargá</p>
                                      <CameraIcon className="w-4" color='#39507f99' />
                                    </div> 
                                  )}
                                </div>

                                <div className={` ${images.length ? "flex" : "hidden"} text-[13px] items-center justify-center  gap-0.5 `}>
                                  <button 
                                    onClick={() => {
                                    onImageUpdate(0)
                                    }} 
                                    className="flex items-center gap-2 h-9 bg-[#39507f22] px-3 py-0.5 cursor-pointer rounded-md duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                                    disabled= {!files.length}
                                  >
                                    Cambiar <CameraIcon className="w-4" color='#39507f88' />
                                  </button>
                                  <button 
                                    onClick={() => {
                                    onImageRemove(0)
                                    }} 
                                    className="flex items-center gap-2 h-9 bg-[#39507f22] px-3 py-0.5 cursor-pointer rounded-md duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                                    disabled= {!files.length}
                                    >
                                    Eliminar <CameraIcon className="w-4" color='#39507f88' />
                                  </button>
                                </div>
                              </div>
                            </div>
                            {/* ))} */}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={onImageUpload}
                        {...dragProps}
                        className={`group w-full disabled:!cursor-default `}
                        disabled= {imageList.length == maxNumber}
                      >
                        <div 
                          className={`relative label-dnd w-full duration-150 text-sm flex flex-col justify-center items-center active:opacity-60  `}>
                          {/* <div 
                          className={`hidden text-[13px] p-2 duration-150 min-[512px]:flex-ro ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100"} `}>
                            <div>
                              <IconDragDrop className= "w-9 opacity-80  min-[512px]:mr-7" />
                              Click o arrastrá y solta aquí <br />
                            </div>
                          </div> */}

                          {errors ? (
                            <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] py-0.5 px-2 bg-[hsl(220,46%,39%)] rounded-xl `}>
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
                            <div className={` ${images.length ? "hidden" : "flex"} ml-12 mt-[7px] h-9 bg-[#39507f22] rounded-md px-2 flex items-center justify-evenly outline-1 outline-dashed outline-[#999] outline-offset-1  min-[512px]:flex-row  ${isDragging ? 'outline-[#666] bg-[#ffffff33] ' : undefined}  ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"} `}>{/* duration-150 */}
                              <IconDragDrop color="#39507fcc" className= "w-6 opacity-80 rotate-45 " />
                              <p className={`text-[12.5px] tracking-wide leading-[1.5] py-0.5 px-2 `}>Click o arrastrá y solta aquí</p>
                            </div>
                          )}

                          <div 
                            className={`absolute  w-[50px] h-[50px] ${images.length ? "right-[248px] -top-[25px]" : "-left-[50px] -top-[7px]"} border border-[#39507f06]  bg-[#39507f00] rounded-full outline-1 outline-dashed outline-[#999]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#ffffff33] ' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}/* duration-150 */
                            >
                          </div>
                        </div>
                      </button>
                    </div>
                  )}
                </ImageUploading>
              </div>
            </div>

            {/* No No NOOOOOOOOOOO */}
            <form action={formAction} className="w-full">
              {/* Image */}
              <div className="hidden">
                <input
                  className="w-full"
                  id="image"
                  type="text"
                  name="image"
                  defaultValue={imageUrl}
                />
              </div>

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
              <div className="hidden items-center justify-end gap-4 text-sm">
                <button
                  type="submit"
                  ref={buttonxRef}
                  className="small:max-w-[140px] flex h-[26px] w-max items-center justify-center rounded-md bg-[#300322dd] !px-2.5 text-center text-[13px] text-[#d9d9d9] duration-150 hover:bg-[#300322] hover:text-[#eee] active:!bg-[#300322aa] disabled:opacity-40 disabled:hover:bg-[#300322dd] disabled:hover:text-[#d9d9d9] disabled:active:!bg-[#300322dd]"
                  // disabled={imageUrl === ''}
                  // onClick={() => {
                  //   location.reload();
                  // }}
                >
                  Guardar cambio
                </button>
              </div>
            </form>
            
            {/* subir img No No NOOOOOOOOOOO   */}
            <form 
              onSubmit={ /* !user ? */  /*handleFileChange :*/ uploadToServer2  } /* !user ? uploadToServer : */
              // onSubmit={ file ? uploadToServer1 : uploadToServer2 }
              className="hidden -ml-0.5 w-[calc(100%_+_4px)] justify-center items-center" /* id="subir" */>
              <ButtonA
                // form="subir"
                className={`h-8 text-[13px] !px-0 !w-full rounded-t-none !bg-[#39507f] disabled:opacity-50`}
                type="submit"
                disabled={!files && true }
                onClick={() => {
                  setSpin(true);
                }}
              >
                <div
                  className={`w-full h-8 flex items-center justify-center gap-3 ${spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"} relative overflow-hidden `}
                >
                  Guardar cambio
                </div>
              </ButtonA>
            </form>
          </div>
        {/* </div> */}

        <Fondo className="flex space-x-4 w-full p-3 pb-2 !bg-[#39507f11] !rounded-[6px] ">
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
                    value= {"comment@gmail.com"}
                    readOnly
                  />

                  <input
                    type="hidden"
                    id="avatar"
                    name="avatar"
                    value= {imageUrl /* ? imageUrl : "/imagen-cliente.png" */}
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
                    ref={buttonxRef}
                    className= "hidden"
                  >
                    enviar
                  </button>
                </div>
              </form>

              <form onSubmit={ /* files.length === 0 ? uploadToServer1 : */ uploadToServer2 } >
                <div className="flex justify-center gap-3 ml-2 ">
                 
                  <button
                    type="submit"
                    // ref={buttonyRef}
                    onClick={() => {
                      // setSpin(true);
                      wait().then(() =>{ 
                        sessionStorage.removeItem("nombre")
                        sessionStorage.removeItem("comment")
                        setNombre("")
                        setComment("")
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
                      sessionStorage.removeItem("nombre")
                      sessionStorage.removeItem("comment")
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
              {comment}
            </div>
          </div>
        </Fondo>
      </div>
    </>
  );
}
