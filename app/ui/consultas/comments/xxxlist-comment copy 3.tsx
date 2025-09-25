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
// import  sharp  from 'sharp';
// const sharp = require("sharp")

import { User, CommentsPost, Post } from "@/app/lib/definitions";
import  distanceToNow  from "@/app/lib/dateRelative";
import { Fondo } from "@/app/ui/marcos";
import DeleteComment from './delete-comment';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from "@/app/ui/logosIconos/icon-drag-drop";
import { createComment, StateComment, updateComment, updateUserImage, StateUserImage } from '@/app/lib/actions';
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
  const [comment, setComment] = useState("");

  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [commentOk, setCommentOk] = useState(true);
  const [comme, setComme] = useState(true);

  const [images, setImages] = useState<ImageListType>([]);

  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  // const [buffer, setBuffer] = useState<Buffer>();
  // const [buffer2, setBuffer2] = useState<ArrayBuffer>();
  // const [polio, setPolio] = useState<sharp.Sharp>();
  // const [previews, setPreviews] = useState<string | null>(null);

  const { data: session, update } = useSession()
  

  const id= user?.id

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

  // const imgAvatar= comments[0].avatar?.slice(0, -1)
  // const imgAvatar= comments[0].avatar
  

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
    // setTimeout(() => setImages([]), 2000)
    setTimeout(() => setOpen(!open), 2000)
    !user?.image && setTimeout(() => setComme(!comme), 2000)
    !user?.image && setTimeout(() => setCommentOk(!commentOk), 2000)
    console.log("Comentario creada")
  }

  const actualizarComment= () => {
    setTimeout(() => handleClickButtonx(), 200)
    // setTimeout(() => handleClickButtonxx(), 200) 
    
    // setTimeout(() => setImages([]), 200)

    setTimeout(() => setComme(!comme), 2000)
    setTimeout(() => setCommentOk(!commentOk), 2000)
    setTimeout(() => setImages([]), 2000)

    // imageUrl && sessionStorage.setItem("avatar", `${imageUrl}` )

    setTimeout(() => setSpin(false), 2000)
    
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
      actualizarComment()

    } catch (error) {
      console.error(error);
    }
    // setSpin(false)
  };

  const uploadToServer2 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files.length === 0) return;

    const resizedBlobs: Blob[] = [];
    // const previewUrls: string[] = [];
    for (const file of files) {
      const resizedBlob = await resizeImage(file, 80, 80);
      resizedBlobs.push(resizedBlob);
      // previewUrls.push(URL.createObjectURL(resizedBlob));
    }
    // setPreviews(previewUrls);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      sessionStorage.setItem('imgVisitor', base64);
      // setPreviews(base64);
    };
    reader.readAsDataURL(files[0]);

    try {
      // const data = new FormData();
      // {files.map((file, index) => {
      //   data.append(`file${index}`, file );
      // })}
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
      console.log("body: ", responseData)
    
      const polo: string[]= responseData.urls
      console.log("polo: ", polo)

      const respon= JSON.stringify( polo[0] )
      console.log("respon: ", respon)
    
      setImageUrl(respon);

      if (response.ok) {
        console.log('Ok imagen subida');
      }

      actualizarComment();

      // sessionStorage.setItem("imgUrlSession", `${comments[0].avatar?.slice(1, -1)}`)
      sessionStorage.setItem("imgUrlSession", `${comments[0].avatar?.slice(1, -1)}`)
      sessionStorage.setItem("post_slug", `${comments[0].post_slug}`)


    } catch (error) {
      console.error(error);
    }
    // setSpin(false)
  };
  const resizeImage = (file: File, maxWidth: number, maxHeight: number): Promise<Blob> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const reader = new FileReader();
      // const img = new Image();
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
    // sessionStorage.removeItem("nombre")
    // sessionStorage.removeItem("comment")
    setComme(true)
    setCommentOk(true)
    user?.name && setNombre(`${user?.name}`)
    user?.email && setEmail(`${user?.email}`)
    user?.image && setImageUrl(`${user?.image}`)

    // sessionStorage.setItem("avatar", `${imageUrl}`)
    // sessionStorage.setItem("imgUrlSession", imageUrl.slice(1, -1))

    // sessionStorage.setItem("imgUrlSession", `${comments[0].avatar?.slice(1, -1)}`)
   
    // setImageUrl("")
    // setError(false)
    // user?.image && setImageUrl(`${user?.image}`)
  }, [/* comme, commentOk */]);

  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createComment, initialState);

  const initialStatex: StateComment = { message: null, errors: {} };
  const updateCommentWithId = updateComment.bind(null, comments[0].id);
  const [estadox, formActionx, isPendingx] = useActionState(updateCommentWithId, initialStatex);

  const initialStatexx: StateUserImage = { message: null, errors: {} };
  const updateUserImageWithId = updateUserImage.bind(null, `${id}` );
  const [estadoxx, formActionxx, isPendingxx] = useActionState(updateUserImageWithId, initialStatexx);

  // const avatar: string = comments[0].avatar && JSON.parse(`${comments[0].avatar}`);

  // console.log("CommentImage: ", comments[0]?.avatar)
  // 
  // console.log("comme: ", comme)
  // console.log("commenOk: ", commentOk)
  // console.log("nombre: ", nombre)
  // console.log("Comment: ", comment)
  // console.log("post_slug: ", post.slug)

  // console.log("imageUrl: ", imageUrl)
  // console.log("email: ", email)

  //  console.log("urlAvatar: ", `${comments[6].avatar?.slice(1, -1) }`)
  console.log("urlAvatar: ", `${comments[0].avatar?.slice(1, -1)}`)
  console.log("imgUserSession: ", `${sessionStorage.getItem("imgUserSession")}`)
  
  // console.log("nombre: ", comments[0].nombre)
  // console.log("buffer2: ", buffer2)
  // console.log("buffer: ", buffer)
  // console.log("file: ", file)
  console.log("comments: ", comments)
  

  return (
    <>
      <div className={` ${comme === true ? "pb-6" : "pb-[68px]" }`}>
      </div>
      <div className="relative space-y-5">

        {/* Form Crear comment */}
        <div className={` ${commentOk === true || sessionStorage.getItem("imgVisitor") ? "block" : "hidden"}`}>
          <div className={` text-sm sm:text-[15px] `}>
              { session ? (
                <p><b>{session?.user.name}</b>, podés ampliar esta consulta</p>
              ) : sessionStorage.getItem("nombre") ? (
                <p><b>{sessionStorage.getItem("nombre")}</b>, podés ampliar esta consulta</p>
              ) : "Podés ampliar esta consulta"}
          </div>
          
          <Frente className={`!p-2 w-full mt-2 mb-9 text-small-regular sm:!p-4 !bg-[#39507f11]`}>
            <div className={`flex items-center justify-between gap-2.5 sm:gap-5 ${open && "mb-4"}`}>
              <div className="w-max">
                <IconComments className="opacity-80 w-9 sm:w-10" />
              </div>

              <p className={`flex flex-col gap-2 w-full text-start leading-[1.2] delay-50 text-[13px] text-[#39507f] transition-[opacity] duration-300 ${open && "opacity-0"} sm:text-[15px] sm:flex-row`}>
                <span>Comentá tu experiencia</span><span className='text-xs text-[#200b1d77]'>(también podés eliminarlo)</span>
              </p>

              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setComment(""); 
                  setImageUrl(""); 
                  !user &&  setNombre("") }}
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
                <fieldset className={`grid grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4 ${sessionStorage.getItem("nombre") && "hidden" }`}>
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
                      disabled={ comment && (nombre || sessionStorage.getItem("nombre") )  ? false : true }
                      onClick={() => {
                        sessionStorage.getItem("nombre") ? "" : sessionStorage.setItem("nombre", nombre)
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
        <div className={`absolute -top-[77px] left-[-3px] w-full gap-2 flex flex-col -mb-3 } ${comme === true || sessionStorage.getItem("imgVisitor") ? "hidden" : "block" } `}>
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

                          {/* <div className="flex flex-col h-[50px] w-[50px] items-center justify-center rounded-full bg-[#dee1e8] text-2xl text-[#39507faa] ">
                            <p className=" text-xs ">Cargá</p>
                            <CameraIcon className="w-4 mt-0.5" color='#39507faa' />
                          </div>  */}

                          <form onSubmit={ uploadToServer2 } >
                            <div className="flex justify-center gap-3 mb-0.5 ml-2 ">
                              <button
                                type="submit"
                                onClick={() => {
                                  setSpin(true);
                                  // user?.role === "member" && handleClickButtonxx()
                                  // wait().then(() =>{ 
                                  //   // setImages([])
                                  // sessionStorage.setItem("imgVisitor", imageUrl)
                                  //   setComme(true)
                                  //   setCommentOk(true)
                                  // });
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
                                }}
                                className="px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#39507f] opacity-80 duration-150 rounded-lg hover:opacity-100"
                              >
                                salir
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
        </div>
        

        {/* List comment */}
        {comments &&
          comments.map((comment, index) => {
            // const avatar: string = comments[0].avatar && JSON.parse(`${comments[index].avatar}`);
            const isAuthor = user && user.email === comment.email_id;
            const isAdmin =user && user.role === "admin";
            // const isAdmin =user?.role === "admin" ? true : false;
            // const isMember =user && user.role === "member";

            const isVisitor= sessionStorage.getItem("nombre") && sessionStorage.getItem("nombre")  === comments[index].nombre

            return (
              <div key={index} className="flex flex-col gap-2">
                {/* <div className={`flex-shrink-0 ml-0`}>
                  {comment.avatar ? (
                    <Image
                      src={ `${comment.avatar?.slice(1, -1) }`}
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
                </div> */}




                { comment.email_id !== "comment@gmail.com" ? (
                  <div>
                    {comment.image ? (
                      <Image
                        src={ comment.image }
                        alt="Imagen de usuario"
                        width={40}
                        height={40}
                        className="rounded-full object-cover ml-3 h-10 w-10"
                      />
                    ) : (
                      <span className="flex ml-3 h-10 w-10 text-[#39507fcc] items-center justify-center rounded-full bg-[#020b1d18] text-2xl ">
                        {comment?.name?.substring(0, 1).toUpperCase() }
                      </span>
                    )}
                  </div>
                ) : comment.avatar ? (
                  <Image
                    src={ `${comment.avatar?.slice(1, -1) }`}
                    alt="Imagen de usuario"
                    width={40}
                    height={40}
                    className="rounded-full object-cover ml-3 h-10 w-10"
                  />
                ) : (
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
                      { (isAdmin || (isAuthor /* && comme */ || isVisitor)  /* || isMember */)   &&
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
          }
        )}
        

        {/*Form acction crear comment */}
        <form action={formAction}>
          <div className="flex flex-col text-sm justify-center gap-3 ml-2 ">
            <input
              type="text"
              id="nombre"
              name="nombre"
              value= {nombre ? nombre : `${sessionStorage.getItem("nombre")}`}
              readOnly
            />
            <input
              type="text"
              id="comment"
              name="comment"
              value= {comment /* ? comment : comments[0].comment */ }
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
              // value= { imageUrl ? imageUrl : sessionStorage.getItem("imgVisitor") ? `${sessionStorage.getItem("imgVisitor")}` : "" }
              // readOnly

              value= { imageUrl ? imageUrl : "" /* comments[0].avatar */ }

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

        {/*Form acction update comment */}
        <form action={formActionx}>
          <div className="flex justify-center gap-3 ml-2 ">
            <input
              type="hidden"
              id="nombre"
              name="nombre"
              value= {nombre ? nombre : `${sessionStorage.getItem("nombre")}`}
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
              // value= { imageUrl ? imageUrl : sessionStorage.getItem("imgVisitor") ? `${sessionStorage.getItem("imgVisitor")}` : "" }

              value= { imageUrl ? imageUrl :  comments[0].avatar }

              readOnly
            />
            <input
              type="hidden"
              id="comment"
              name="comment"
              value= {comment /* ? comment : comments[0].comment */ }
              readOnly
            />
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
              // value= { imageUrl ? imageUrl.slice(0, -1) : "" }
              // value= { comments[0].avatar }
              value= "https://res.cloudinary.com/dchmrl6fc/image/upload/v1746362176/jared-palmer_ypvpwr.png"
              // value= '["https://res.cloudinary.com/dchmrl6fc/image/upload/v1755739917/hd0eocbm4hscmthca3lj.jpg"]'
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






{/* <form action={formActionx}>
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
      value= { imageUrl ? imageUrl : "" }
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
</form> */}