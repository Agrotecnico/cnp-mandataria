"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { FormEvent, useState, useEffect, useRef } from 'react';
import { useActionState } from 'react';
import {
  ExclamationCircleIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react"
import clsx from 'clsx';

import { User, CommentsPost, Post, CommentLast } from "@/app/lib/definitions";
import  distanceToNow  from "@/app/lib/dateRelative";
import { Fondo } from "@/app/ui/marcos";
import DeleteComment from './delete-comment';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from "@/app/ui/logosIconos/icon-drag-drop";
import { createComment, StateComment, updateComment, StateUpdateComment, updateUserImage, StateUserImage } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import IconComments from "@/app/ui/logosIconos/icon-comments"
import { ButtonB, ButtonA } from '@/app/ui/button';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconCamara from '@/app/ui/logosIconos/icon-camara';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function ListComment({ 
  comments,
  commentLast,
  user,
  post
  }: {
  comments: CommentsPost[]
  commentLast: CommentLast
  user: User | undefined
  post: Post
  }) {
  
  // const [nombre, setNombre] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [name, setName] = useState("");
  // const [nameVisitor, setNameVisitor] = useState<string | null>(null);
  const [nameVisitor, setNameVisitor] = useState("");

  const [comment, setComment] = useState("");

  const [email, setEmail] = useState("");
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imgUrlSession, setImgUrlSession] = useState<string | null>(null);

  const [imgVisitor, setImgVisitor] = useState<string | null>(null);

  const [commentOk, setCommentOk] = useState(true);
  const [comme, setComme] = useState(true);

  const [images, setImages] = useState<ImageListType>([]);

  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);

  const [salir, setSalir] = useState(false);
  
  const { data: session, update } = useSession()

  const router = useRouter()
  
  // const imagenUrl = JSON.parse(imageUrl);
  const id= user?.id!
  const id2:string= comment /* `${sessionStorage.getItem("commentSession")}` *//* "1234567890" */
  const id3= `${commentLast.comment}`

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
  setImages(imageList);
  };

  const maxNumber = 1;

  // const avatar= comments
  // const archivosAdjuntos= tramite?.documentos_url
  // const archivos: string[] = JSON.parse(`${archivosAdjuntos}`)

  const renderFilePreview = (file: File ) => { 
    const fileType = file?.type; 
    if (fileType.startsWith('image/')) { 
      return ( 
        <Image 
          src={URL.createObjectURL(file)} 
          alt={file.name} 
          width={50}
          height={50}
          className="z-[15] object-cover bg-[#ffffffaa] rounded-full w-[50px] h-[50px] border border-[#1d021544]"
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
  const buttonRefx = useRef<HTMLButtonElement>(null);
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  };
  const buttonRefxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxx= () => {
    if (buttonRefxx.current) buttonRefxx.current.click()
  };

  const crearComment= () => {
    setTimeout(() => handleClickButton(), 200)
    // !user?.image && setTimeout(() => handleClickButtonx(), 200) 
    // user ? 
    // setTimeout(() => handleClickButtonxx(), 200) 
    // : 
    // handleClickButtonxx;
    setTimeout(() => setOpen(!open), 2000)
    !user?.image && setTimeout(() => setComme(!comme), 2000)
    !user?.image && setTimeout(() => setCommentOk(!commentOk), 2000)
    console.log("Comentario creado")
  }

  const actualizarComment= () => {
    setTimeout(() => handleClickButtonx(), 2000)//updated último comment
    // setTimeout(() => handleClickButton(), 200)//create comment
    
    !user?.image && setTimeout(() => handleClickButtonxx(), 2000) //updated img user

    //user && setTimeout(() => handleClickButtonxx(), 200) updated user image
    // setTimeout(() => handleClickButtonx(), 200); 
    setTimeout(() => setComme(!comme), 2000)
    setTimeout(() => setCommentOk(!commentOk), 2000)
    setTimeout(() => setImages([]), 2000)
    setTimeout(() => setSpin(false), 2000)
    // setTimeout(() => router.refresh(), 3000)
    
    
    console.log("Comentario autualizado")
  }

  const crearComment3= () => {
    setTimeout(() => handleClickButtonx(), 200)//updated avatar comment
    // !user?.image && setTimeout(() => handleClickButtonxx(), 200) 

    //user && setTimeout(() => handleClickButtonxx(), 200) updated user image
    // setTimeout(() => handleClickButtonx(), 200); 
    // setTimeout(() => setComme(!comme), 2000)
    // setTimeout(() => setCommentOk(!commentOk), 2000)
    // setTimeout(() => setImages([]), 2000)
    setTimeout(() => setSpin(false), 2000)
    // setTimeout(() => router.refresh(), 3000)
    
    
    console.log("Comentario autualizado")
  }

  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      crearComment();

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };

  const uploadToServer3 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      crearComment3();

    } catch (error) {
      console.error(error);
    }
    setSpin(false)
  };
  ///////////////////////////////////////////////////////////////
  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const resizedBlobs: Blob[] = [];
    for (const file of files) {
      const resizedBlob = await resizeImage(file, 80, 80);
      resizedBlobs.push(resizedBlob);
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      !user?.image && sessionStorage.setItem('imgVisitor', base64);
    };
    reader.readAsDataURL(files[0]);

    try {
      const data = new FormData();
      {resizedBlobs.map((resizedBlob, index) => {
        data.append(`file${index}`, resizedBlob );
      })}

      const response = await fetch('/api/upload-query', {
        method: 'POST',
        body: data,
      });

      console.log("response: ", response)

      const responseData = await response.json();
      console.log("responseData: ", responseData)
    
      const polo: string= responseData.urls[0]
      console.log("polo: ", polo)

      // const respon= JSON.stringify( polo )
      // console.log("respon: ", respon)

      sessionStorage.setItem("imgUrlSession", polo)
  
      setImageUrl(polo);
      // setImageUrl(responseData.urls);

      
      // !user?.image && sessionStorage.setItem("imgUrlSession", responseData.urls)

      if (response.ok) {
        console.log('Ok imagen subida');
      }


      actualizarComment();

      // sessionStorage.setItem("imgUrlSession", `${comments[0].avatar?.slice(1, -1)}`)
      

      // user?.image ? user.image : sessionStorage.setItem("imgUrlSession", responseData)

      location.reload()

    } catch (error) {
      console.error(error);
    }
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

  useEffect(() => {
    setComme(true)
    setCommentOk(true)
    // user?.name ? setNombre(`${user?.name}`) : setNombre(sessionStorage.getItem('nombre'))
    sessionStorage.getItem('nombre') && setNombre(`${sessionStorage.getItem('nombre')}`)
    user?.name && setName(user.name)
    sessionStorage.getItem('nameVisitor') && setNameVisitor(`${sessionStorage.getItem('nameVisitor')}`)

    user?.image ? setImageUrl(user.image) : sessionStorage.getItem('imgUrlSession') && setImageUrl(`${sessionStorage.getItem('imgUrlSession')}`) 
    

    sessionStorage.getItem('imgVisitor') && setImgVisitor(sessionStorage.getItem('imgVisitor'))
    // sessionStorage.getItem('imgUrlSessionxx') && setImageUrlxx(sessionStorage.getItem('imgUrlSessionxx')) 

    user?.email && setEmail(`${user?.email}`)
  }, [/* imageUrlxx */]);


  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createComment, initialState);

  const initialStatex: StateUpdateComment = { message: null, errors: {} };
  const updateCommentWithId = updateComment.bind(null, id3 );
  const [estadox, formActionx, isPendingx] = useActionState(updateCommentWithId, initialStatex);

  const initialStatexx: StateUserImage = { message: null, errors: {} };
  const updateUserImageWithId = updateUserImage.bind(null, id );
  const [estadoxx, formActionxx, isPendingxx] = useActionState(updateUserImageWithId, initialStatexx);


  console.log("nombre:", user?.name)
  console.log("email:", user?.email)
  // console.log("nameVisitor:", nameVisitor)
  console.log("comment:", comment)
  // console.log("slug:", comments[0].post_slug)
  console.log("imageUrl:",   imageUrl  )
  // console.log("imgUrlSession:",   imgUrlSession  )
  console.log("commentLastComment:", commentLast.comment )
  console.log("id3:", id3 )

  
  return (
    <>
      <div className={` ${comme === true ? "pb-6" : "pb-[68px]" }`}>
      </div>
      <div className="relative space-y-5">

        {/* Form Crear comment */}
        <div className={` ${commentOk === true || imgVisitor /* sessionStorage.getItem("imgVisitor") */ ? "block" : "hidden"}`}>
          <div className={` text-sm sm:text-[15px] `}>
              { session ? (
                <p><b>{session?.user.name}</b>, podés ampliar esta consulta</p>
              ) : nameVisitor ? (
                <p><b>{nameVisitor}</b>, podés ampliar esta consulta</p>
              ) : "Podés ampliar esta consulta"}
          </div>
          
          <Frente className={`!p-2 w-full mt-2 mb-9 text-small-regular sm:!p-4 !bg-[#39507f11]`}>
            <div className={`flex items-center justify-between gap-2.5 sm:gap-5 ${open && "mb-4"}`}>
              <div className="w-max">
                <IconComments className="opacity-80 w-9 sm:w-10" />
              </div>

              <p className={`flex flex-col gap-2 w-full text-start leading-[1.2] delay-50 text-[13px] text-[#39507f] transition-[opacity] duration-300 ${open && "opacity-0"} sm:text-[15px] sm:flex-row`}>
                <span>Comentá tu experiencia</span><span className='text-xs text-[#200b1d77]'>(podés eliminarlo)</span>
              </p>

              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setComment(""); 
                  // setNombre("")
                  // setImageUrl("");
                  // user || nombre &&   setNombre("")
                }}
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
                <fieldset className={` grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4 ${/* sessionStorage.getItem("nombre")*/ name || nameVisitor ? "hidden" : "grid" }`}>
                  <InputCnp
                    className={`text-sm h-8 mb-4 !w-full placeholder:text-[#000000aa] placeholder:text-[13px]  ${!open && "invisible"}`}/*  ${!user || nombre && "hidden"} */
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
                    <IconCuenta  className={`absolute w-[14px] left-[9px] top-[9px]`} color="#39507faa" />{/*   ${nombre ? "hidden" : "block"} */}
                  </InputCnp>
                </fieldset>

                {/* comment */}
                <TextareaCnp
                  id="comment"
                  name="comment"
                  className={`text-sm placeholder:text-[#000000aa] placeholder:text-[13px]`}
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

                {/*Form acction crear comment */}
                <form onSubmit={ uploadToServer1 } >
                  <div className={`flex items-center justify-end w-full gap-4 mt-4 text-sm `}>
                    <ButtonA
                      type="submit"
                      className={`${isPending && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden h-8 text-[13px] w-max `}
                      disabled={ comment && (nombre || name || nameVisitor  /*|| sessionStorage.getItem("nombre") */ )  ? false : true }
                      onClick={() => {
                        // sessionStorage.getItem("nombre") ? "" : sessionStorage.setItem("nombre", nombre)
                        !user?.name && !nameVisitor && sessionStorage.setItem("nameVisitor", nombre)
                        sessionStorage.setItem("commentSession", comment)
                      }}
                    >
                      Crear comentario
                    </ButtonA>
                  </div>
                </form>
              </div>
            </div>
          </Frente>
        </div>

        {/* Actualizar avatar comment */}
        <div className={`absolute ${images.length != 0 ? "-top-[77px]" : "-top-[125px]"} left-[-3px] w-full gap-2 flex flex-col -mb-3 } ${comme === true || imgVisitor /* sessionStorage.getItem("imgVisitor") */ ? "hidden" : "block" } `}>
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
                  className={`group disabled:!cursor-default w-0 `}
                  disabled= {imageList.length == maxNumber}
                >
                  <div 
                    className={`relative label-dnd w-full duration-150 text-sm flex flex-col justify-center items-start active:opacity-60  `}>
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
                      <div className={` ${images.length ? "hidden" : "flex"} h-8 w-full bg-[#39507f22] rounded-md flex items-center justify-evenly outline-0 outline-dashed outline-[#999] outline-offset-1  min-[512px]:flex-row  ${isDragging ? 'outline-[#666] bg-[#ffffff33] ' : undefined}  ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"} `}>
                        <IconDragDrop color="#39507f" className= "hidden w-[22px] opacity-80 rotate-45 " />
                        <p className={`hidden text-[12.5px] tracking-wide leading-[1.5] py-0.5 px-2 `}>Click o arrastrá y solta aquí</p>
                      </div>
                    )}

                    <div 
                      className={`absolute h-8 ${images.length ? "left-0 top-0 w-[177px] hidden" : "left-0 top-0 w-full block"} border border-[#39507f06]  bg-[#39507f00] rounded-md outline-0 outline-dashed outline-[#999]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55] ' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                      >
                    </div>

                    <div 
                      className={`absolute z-20 w-[50px] h-[50px] ${images.length ? "left-[12px] top-[48px]" : "left-[12px] top-[96px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-full outline-1 outline-dashed outline-[#888]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                      >
                    </div>

                    <div 
                      className={`absolute w-[60px] h-[60px] ${images.length ? "left-[7px] top-[43px] " : "left-[12px] top-[48px] hidden"}  bg-[#39507f00] rounded-full outline-1 outline-dashed outline-[#00000000]  outline-offset-1   ${isDragging ? 'outline-[#000] bg-[#39507f66]' : undefined}   `}
                      >
                    </div>

                    <div 
                      className={`absolute w-[142px] h-[24px] ${images.length ? "left-[12px] top-[48px] hidden" : "left-[6px] top-[52px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-sm outline-1 outline-dashed outline-[#888]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
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
                            <div className="z-10 flex flex-col h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ffffff] text-2xl text-[#39507fcc] ">
                              <p className=" text-xs mt-[4px] ">imagen</p>
                              <IconCamara className="w-[15px] mt-0.5" />
                            </div> 
                          )}

                          {/* <form onSubmit={ uploadToServer2 } >
                            <div className="relative flex justify-end gap-3 mb-0.5 ml-2 ">
                              <button
                                type="submit"
                                onClick={() => {
                                  setSpin(true);
                                }}
                                className={`${ spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden  px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#548eff] opacity-80 duration-150 rounded-lg hover:opacity-100 disabled:cursor-default disabled:opacity-60 `}
                                disabled={!images.length}
                              >
                                cargar imagen
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setImages([])
                                  !user && setNombre("")
                                  setComment("")
                                  setComme(true)
                                  setCommentOk(true)
                                  location.reload()
                                }}
                                className="px-2 h-5 flex text-[#020b1d99] items-center text-sm border border-transparent bg-[#ffffff] duration-150 rounded-lg hover:text-[#020b1dee]"
                              >
                                salir
                              </button>

                              <div className="absolute z-10 w-[144px] h-5 bg-[#ecedf1] top-[40px] left-[31px]"></div>
                            </div>
                          </form> */}
                        </div>

                        <div className={` ${images.length ? "hidden" : "flex" } ml-2 text-[13px] items-center justify-start gap-5 `}>
                          <button 
                            onClick={() => {
                            // onImageUpdate(0)
                            }} 
                            className="flex items-center gap-1.5 h-8 bg-[#ffffff] text-[#020b1daa] px-2 py-0.5 cursor-pointer rounded-l-md "
                            disabled= {!files.length}
                          >
                            Agregar imagen<IconCamara className="w-[14px]" />
                          </button>
                          <button 
                            onClick={() => {
                              setSalir(true)
                              setImages([])
                              !user && setNombre("")
                              setComment("")
                              setComme(true)
                              setCommentOk(true)
                              location.reload()
                            }} 
                            className="flex items-center gap-3 h-6 bg-[#39507f] text-[#ffffff] px-3 py-0.5 cursor-pointer rounded-[4px] duration-200 opacity-80 hover:opacity-100 active:opacity-70 "
                            // disabled= {!files.length}
                            >
                            Salir
                          </button>
                        </div>

                        <div className={` ${images.length ? "flex" : "hidden"} text-[13px] items-center justify-start gap-[1px] `}>
                          <button 
                            onClick={() => {
                            onImageUpdate(0)
                            }} 
                            className="flex items-center gap-1.5 h-8 bg-[#ffffff] text-[#020b1daa] px-2 py-0.5 cursor-pointer rounded-l-md duration-200 hover:text-[#020b1dee] active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                            disabled= {!files.length}
                          >
                            Cambiar<IconCamara className="w-[14px]" />
                          </button>
                          <button 
                            onClick={() => {
                            onImageRemove(0)
                            setImages([])
                            }} 
                            className="flex items-center gap-1.5 h-8 bg-[#ffffff] text-[#020b1daa] px-2 py-0.5 cursor-pointer rounded-r-md duration-200 hover:text-[#020b1dee] active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                            disabled= {!files.length}
                            >
                            Eliminar<IconCamara className="w-[14px]" />
                          </button>
                          <form onSubmit={ uploadToServer2 } >
                            <div className="relative flex justify-end gap-3 mb-0.5 ml-2 ">
                              <button
                                type="submit"
                                onClick={() => {
                                  setSpin(true);
                                  // setImages([])
                                  // !user && setNombre("")
                                  // setComment("")
                                  // setComme(true)
                                  // setCommentOk(true)
                                  // location.reload()
                                }}
                                className={`${ spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden  px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#4281fd] opacity-80 duration-150 rounded-lg hover:opacity-100 disabled:cursor-default disabled:opacity-60 `}
                                disabled={!images.length}
                              >
                                cargar <IconCamara color="#ffffff" className="ml-2 w-[13px]"  />
                              </button>

                              {/* <button
                                type="button"
                                onClick={() => {
                                  setImages([])
                                  !user && setNombre("")
                                  setComment("")
                                  setComme(true)
                                  setCommentOk(true)
                                  location.reload()
                                }}
                                className="px-2 h-5 flex text-[#020b1d99] items-center text-sm border border-transparent bg-[#ffffff] duration-150 rounded-lg hover:text-[#020b1dee]"
                              >
                                salir
                              </button> */}

                              {/* <div className="absolute z-10 w-[144px] h-5 bg-[#ecedf1] top-[40px] left-[31px]"></div> */}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </ImageUploading>
        </div>
        
        {/* List comment */}
        <div className='relative'>{/* #ebedf1 */}
          {/* <div className={`absolute w-20 h-5 bg-[#f00] `}></div> */}
          {comments &&
            comments.map((comment, index) => {
              const isAuthor = user && user.email === comment.email_id;
              const isAdmin =user && user.role === "admin";
              const isVisitor=  /* sessionStorage.getItem("nameVisitor") === comment.nombre || */ nameVisitor === comment.nombre  /* && imageUrl === comment.avatar */

              return (
                <div key={index} className="flex flex-col mb-3 gap-2">

                  { comment.email_id === "comment@gmail.com" ? (
                    <div>
                      {comment.avatar ? (
                        <Image
                          src={ comment.avatar }
                          alt="Imagen de usuario"
                          width={40}
                          height={40}
                          className="rounded-full object-cover ml-3 h-10 w-10"
                        />
                      ) : /* comment.avatar ? (
                        <Image
                          src={ comment.avatar }
                          alt="Imagen de usuario"
                          width={40}
                          height={40}
                          className="rounded-full object-cover ml-3 h-10 w-10"
                        />
                      )  :*/ (
                        <span className="flex ml-3 h-10 w-10 text-[#39507fcc] items-center justify-center rounded-full bg-[#020b1d18] text-2xl ">
                          {/* {comment?.name?.substring(0, 1).toUpperCase() } */}
                          {comment?.nombre?.substring(0, 1).toUpperCase() }
                        </span>
                      )}
                    </div>
                  ) :  comment.image  ? (
                    <Image
                      src={ comment.image  }
                      alt="Imagen de usuario"
                      width={40}
                      height={40}
                      className="rounded-full object-cover ml-3 h-10 w-10"
                    />
                  ) : comment.avatar ? (
                        <Image
                          src={ comment.avatar }
                          alt="Imagen de usuario"
                          width={40}
                          height={40}
                          className="rounded-full object-cover ml-3 h-10 w-10"
                        />
                      )  : (
                    <span className="flex ml-3 h-10 w-10 text-[#39507fcc] items-center justify-center rounded-full bg-[#020b1d18] text-2xl ">
                      {comment?.nombre?.substring(0, 1).toUpperCase() }
                    </span>
                  )}

                  <Fondo key={comment.id} className="flex space-x-4 w-full p-3 pb-2 !bg-[#39507f11] !rounded-[6px] ">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap">
                          <p className="font-semibold mr-2">{!comment.nombre ? comment.name : comment.nombre}</p>
                        
                          <time className="text-[#020b1d66]">
                            {distanceToNow(new Date(`${comment.created_at}`))}
                          </time>
                        </div>
                        <div className='relative flex items-center gap-0'>
                        { (isAdmin || (isAuthor /* && comme */ || isVisitor)  /* || isMember */) &&
                          <>
                            {/* <form onSubmit={uploadToServer3}>
                              <button 
                                type="submit"
                                className={`px-2 ml-2 text-xs text-[#200b1dbb] bg-[#ffffffaa] opacity-80 duration-150 rounded-full hover:opacity-100 hover:text-[#ffffff] hover:bg-[#548eff] ${(commentLast.avatar ) && "hidden"}`}
                              >
                                guardar
                              </button>
                            </form> */}
                            {/* {salir === false && index == 0 && comme ? ( */}
                            { !comme && index === 0 && !imgVisitor ? (
                                <div className={` w-20 h-5 bg-[#ebedf1] `}></div>/* bg-[#ebedf1] */
                              ) : (
                                <DeleteComment id={comment.id} />/*  ${ salir === true ? "block" : "hidden" } */
                              )}
                            
                            {/* <DeleteComment id={comment.id} /> */}
                          </>
                        }
                        </div>
                      </div>
                      <div className=" mt-1 leading-relaxed">
                        {comment.comment}
                      </div>
                    </div>
                  </Fondo>
                </div>
              );
            }
          )}
        </div>
        

        {/*Form acction crear comment */}
        <form action={formAction}>
          <div className="hidden flex-col text-sm justify-center gap-3 ml-2 ">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value= { name ? name : nombre ? nombre : nameVisitor }
              readOnly
            />
            <input
              type="text"
              id="comment"
              name="comment"
              value= {comment }
              readOnly
            />
            <input
              type="text"
              id="post_slug"
              name="post_slug"
              value= {post.slug}
              readOnly
            />
            <input
              type="text"
              id="avatar"
              name="avatar"
              // value= { imageUrl ? imageUrl : comments[0].avatar }
              value= {imageUrl ? imageUrl : "" }
              // value= {imageUrl ? imageUrl : "" }
              readOnly
            />
            <input
              type="text"
              id="email_id"
              name="email_id"
              value= {email ? email : "comment@gmail.com"}
              readOnly
            />
            <div>
              <button
                type="submit"
                ref={buttonRef}
                className=''
              >
                Crear comentario
              </button>
            </div>
          </div>
        </form>

        {/* ///////////////////////////////////////////////////////// */}

        {/*Form acction update comment */}
        <form action={formActionx}>
          <div className="flex justify-center gap-3 ml-2 ">
            {/* <input
              type="hidden"
              id="nombre"
              name="nombre"
              value= {   nombre! }
              // value= {nombre ? nombre : `${sessionStorage.getItem("nombre")}`}
              readOnly
            /> */}
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
              // value={"https://res.cloudinary.com/dchmrl6fc/image/upload/v1756482321/michael-novotny_xkeqbn.png"}
              // value= {imageUrl ? imageUrl : "" }
              value= { imageUrl ? imageUrl : sessionStorage.getItem("imgUrlSession") ? `${sessionStorage.getItem("imgUrlSession")}` : "" }
              readOnly
            />
            {/* <input
              type="hidden"
              id="comment"
              name="comment"
              value= {comment }
              readOnly
            /> */}
            <input
              type="hidden"
              id="post_slug"
              name="post_slug"
              value= {post.slug}
              readOnly
            />
            <div>
              <button
                type="submit"
                ref={buttonRefx}
                className='hidden'
              >
                Crear comentario
              </button>
            </div>
          </div>
        </form>

        {/*Form update imagen user */}
        <form action={formActionxx}>
          <div className="flex justify-center gap-3 ml-2 ">
            <input
              type="hidden"
              id="image"
              name="image"
              // value= "https://res.cloudinary.com/dchmrl6fc/image/upload/v1756482321/michael-novotny_xkeqbn.png"
              // value= {imageUrl ? imageUrl : "" }
              value= {  sessionStorage.getItem("imgUrlSession") ? `${sessionStorage.getItem("imgUrlSession")}` : "" }
              readOnly
            />
            <div>
              <button
                type="submit"
                ref={buttonRefxx}
                className='hidden'
              >
                Crear comentario
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
