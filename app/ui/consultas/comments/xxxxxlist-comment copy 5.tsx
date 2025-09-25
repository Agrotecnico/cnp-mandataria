"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation'
import { FormEvent, useState, useEffect, useRef, useActionState  } from 'react';
import {
  ExclamationCircleIcon,
  CameraIcon,
} from '@heroicons/react/24/outline';
import { useSession } from "next-auth/react"
import clsx from 'clsx';

import { User, CommentsPost, Post, Comment } from "@/app/lib/definitions";
import  distanceToNow  from "@/app/lib/dateRelative";
import { Fondo } from "@/app/ui/marcos";
import UpdateComment from '@/app/ui/consultas/comments/update-comment';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from "@/app/ui/logosIconos/icon-drag-drop";
import { createComment, StateComment, updateComment, StateUpdateComment, updateUserImage, StateUserImage, deleteComment, updateCommentImage, StateUpdateCommentImage, updateCommentDelete } from '@/app/lib/actions';
import { Frente } from '@/app/ui/marcos';
import IconComments from "@/app/ui/logosIconos/icon-comments"
import { ButtonB, ButtonA } from '@/app/ui/button';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconCamara from '@/app/ui/logosIconos/icon-camara';
import useToggleState from '@/app/lib/hooks/use-toggle-state';
import IconConsultaRight from '../../logosIconos/icon-consulta-right';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));

export default function ListComment({ 
  comments,
  commentLast,
  user,
  post
  }: {
  comments: CommentsPost[]
  commentLast: Comment
  user: User | undefined
  post: Post
  }) {
  
  const [name, setName] = useState("");
  const [nombre, setNombre] = useState("");
  const [nameVisitor, setNameVisitor] = useState("");

  const [email, setEmail] = useState("");

  const [images, setImages] = useState<ImageListType>([]);
  const [imageUrl, setImageUrl] = useState("");

  const [imgUrlSession, setImgUrlSession] = useState<string | null>(null);
  const [imgVisitor, setImgVisitor] = useState<string | null>(null);


  const [comment, setComment] = useState("");
  const [commentSession, setCommentSession] = useState("");

  const [commentOk, setCommentOk] = useState(true);
  const [comme, setComme] = useState(true);

  

  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);

  const [salir, setSalir] = useState(false);
  const [successState, setSuccessState] = useState(false);

  // const { state, close, toggle } = useToggleState();
  
  const { data: session, update } = useSession()

  const router = useRouter()
  
  const id= user?.id!
  const id2:string= comment
  const id3= `${commentLast.comment}`
  const id4= `${commentLast.id}`

   const clearState = () => {
    setSuccessState(false);
  };

  // const handleToggle = () => {
  //   clearState();
  //   setTimeout(() => toggle(), 100);
  // };

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
  }; //create comment

  const buttonRefxxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxxx= () => {
    if (buttonRefxxx.current) buttonRefxxx.current.click()
  }; //updated img comment

  const buttonRefxx = useRef<HTMLButtonElement>(null);
  const handleClickButtonxx= () => {
    if (buttonRefxx.current) buttonRefxx.current.click()
  };//updated img user



  const buttonRefx = useRef<HTMLButtonElement>(null);
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  };
  

  const crearComment= () => {
    setTimeout(() => handleClickButton(), 200) //create comment
    setTimeout(() => setOpen(!open), 2000)
    !user?.image && setTimeout(() => setComme(!comme), 2000)
    !user?.image && setTimeout(() => setCommentOk(!commentOk), 2000)
    console.log("Comentario creado")
  }
  const actualizarComment= () => {
    setTimeout(handleClickButtonxxx, 200) //updated img comment
    !user?.image && setTimeout( handleClickButtonxx, 200) //updated img user
    setSpin(false)
    location.reload()
  }
  
  const actualizarCommentxxx= () => {
    // setTimeout(() => deleteComment(id4), 2000)//delete último comment

    // setTimeout(() => handleClickButton(), 2000)//create comment

    // setTimeout(() => handleClickButtonx(), 2000) 
    
    // setTimeout(() => deleteCommentWithId(), 2000) //delete last comment
    setTimeout(() => handleClickButtonx(), 2000)//updated último comment
    
    
    // !user?.image && setTimeout(() => handleClickButtonxx(), 2000) //updated img user

    //user && setTimeout(() => handleClickButtonxx(), 200) updated user image
    // setTimeout(() => handleClickButtonx(), 200); 
    setTimeout(() => setComme(!comme), 2000)
    setTimeout(() => setCommentOk(!commentOk), 2000)
    setTimeout(() => setImages([]), 2000)
    // setTimeout(() => setSpin(false), 2000)
    // setTimeout(() => router.refresh(), 3000)
    // setComment("")
    setSpin(false)
    location.reload()
    
    
    console.log("Comentario actualizado")
  }
  const crearComment3= () => {
    setTimeout(() => handleClickButtonx(), 200)//updated avatar comment
    user && setTimeout(() => handleClickButtonxx(), 200) // updated user image
    setTimeout(() => setSpin(false), 2000)
    console.log("Comentario autualizado")
  }

  ///////////////////////////////////////////////////////////////

  const uploadToServer1 = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      crearComment();

    } catch (error) {
      console.error(error);
    }

    setSpin(false)
  };
  const uploadToServer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

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

      const responseData = await response.json();
      
      setImageUrl(responseData.urls[0]);

      sessionStorage.setItem("imgUrlSession", responseData.urls[0])

      if (response.ok) {
        console.log('File uploaded successfully');
      }
      actualizarComment();

    } catch (error) {
      console.error(error);
    }
  };

  

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

      
  
      setImageUrl(polo);
      // setImageUrl(responseData.urls);

      sessionStorage.setItem("imgUrlSession", polo)

      // !user?.image && sessionStorage.setItem("imgUrlSession", responseData.urls)

      if (response.ok) {
        console.log('Ok imagen subida');
      }


      // actualizarComment();

      // sessionStorage.setItem("imgUrlSession", `${comments[0].avatar?.slice(1, -1)}`)
      

      // user?.image ? user.image : sessionStorage.setItem("imgUrlSession", responseData)

      // location.reload()

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
    // if (successState) {
    //   close();
    // }
    setComme(true)
    setCommentOk(true)
    user?.name && setName(user.name)
    user?.name ? setNombre(user.name) : sessionStorage.getItem('nameVisitor') && setNombre(`${sessionStorage.getItem('nameVisitor')}`) 
    sessionStorage.getItem('nameVisitor') && setNameVisitor(`${sessionStorage.getItem('nameVisitor')}`)
    user?.image ? setImgUrlSession(user.image) : sessionStorage.getItem('imgUrlSession') && setImgUrlSession(`${sessionStorage.getItem('imgUrlSession')}`) 
    sessionStorage.getItem('imgVisitor') && setImgVisitor(sessionStorage.getItem('imgVisitor'))
    user?.email && setEmail(`${user?.email}`)
    sessionStorage.getItem('commentSession') && setCommentSession(`${sessionStorage.getItem('commentSession')}`) 
  }, [ /* nameVisitor */ ]);


  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createComment, initialState);

  const initialStatexx: StateUserImage = { message: null, errors: {} };
  const updateUserImageWithId = updateUserImage.bind(null, id );
  const [estadoxx, formActionxx ] = useActionState(updateUserImageWithId, initialStatexx);

  const initialStatexxx: StateUpdateCommentImage = { message: null, errors: {} };
  const updateCommentImageWithId = updateCommentImage.bind(null, id4);
  const [estadoxxx, formActionxxx] = useActionState(updateCommentImageWithId, initialStatexxx);
  
  // console.log("comme:", comme)
  // console.log(" commentSesion :",   commentSession  )
  // console.log("commentLastComment:", commentLast.comment )
  // console.log("commentLastId:", commentLast.id )
  // console.log("id3:", id3 )

  return (
    <>
      <div className={`relative ${!comme && "mt-[92px]"}`}>

        {/* Form Crear comment */}
        <div className={` ${commentOk === true || imgVisitor ? "block" : "hidden"}`}>
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

              <p className={`flex flex-col items-center gap-2 w-full text-start leading-[1.2] delay-50 text-[13px] text-[#39507f] transition-[opacity] duration-300 ${open && "opacity-0"} sm:text-[15px] sm:flex-row`}>
                <span>Comentá tu experiencia</span><span className='text-xs ml-2 text-[#200b1d77]'>podés eliminarlo</span>
              </p>

              <ButtonB
                className={`h-8 text-[13px]  w-max`}
                onClick={() => { 
                  setOpen(!open); 
                  setComment(""); 
                  setNombre(""); 
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
                <fieldset className={` grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4 ${ name || nameVisitor ? "hidden" : "grid" }`}>
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
                    <IconCuenta  className={`absolute w-[14px] left-[9px] top-[9px]`} color="#39507faa" />
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
                      className={`${spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"}  relative overflow-hidden h-8 text-[13px] w-max `}
                      disabled={ comment && (nombre || name || nameVisitor  )  ? false : true }
                      onClick={() => {
                        setSpin(true)
                        !user?.name && !nameVisitor && sessionStorage.setItem("nameVisitor", nombre)
                        sessionStorage.setItem("commentSession", comment)
                        imageUrl &&
                        wait().then(() =>{ 
                          location.reload()
                        });
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
        <div className={` ${images.length != 0 ? "absolute -top-[60px]" : "absolute -top-[60px]"} -left-[5px] w-full gap-1 flex flex-col mb-3 } ${comme === true || imgVisitor  ? "hidden" : "block" } `}>
          <ImageUploading
            multiple= {false}
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
                  className={`group disabled:!cursor-default w-0 h-0 z-20 `}
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
                      className={`absolute z-20 w-[50px] h-[50px] ${images.length ? "left-[12px] top-[48px]" : "left-[12px] top-[48px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-full outline-1 outline-dashed outline-[#888]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                      >
                    </div>

                    <div 
                      className={`absolute w-[60px] h-[60px] ${images.length ? "left-[7px] top-[43px] " : "left-[12px] top-[48px] hidden"}  bg-[#39507f00] rounded-full outline-1 outline-dashed outline-[#00000000]  outline-offset-1   ${isDragging ? 'outline-[#000] bg-[#39507f66]' : undefined}   `}
                      >
                    </div>

                    <div 
                      className={`absolute w-[142px] h-[24px] ${images.length ? "left-[12px] top-[48px] hidden" : "left-[6px] top-[4px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-sm outline-1 outline-dashed outline-[#888]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                      >
                    </div>
                  </div>
                </button>

                <div className="w-full flex flex-col justify-start gap-4">
                  <div className={` ${images.length ? "hidden" : "flex" } ml-2 text-[13px] items-center justify-start gap-5 `}>
                    <p className="flex items-center gap-1.5 h-8 bg-[#ffffff] text-[#020b1daa] px-2 py-0.5 cursor-pointer rounded-l-md " >
                      Agregar imagen<IconCamara className="w-[14px]" />
                    </p>
                  </div>

                  <div className={` ${images.length ? "flex" : "hidden"} text-[13px] items-center justify-start gap-[1px] `}>
                    <button 
                      onClick={() => {
                      onImageUpdate(0)
                      }} 
                      className="flex items-center gap-1.5 h-8 bg-[#ffffff] text-[#020b1daa] px-2 py-0.5 cursor-pointer rounded-l-md duration-200 hover:text-[#020b1dee] active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                      disabled= {!files.length}
                      >
                      <p>Cambiar</p>
                      <IconCamara className="w-[14px]" />
                    </button>

                    <form onSubmit={ uploadToServer } >
                      <div className="relative flex justify-end gap-3 mb-0.5 ml-2 ">
                        <button
                          type="submit"
                          onClick={() => {
                            setSpin(true);
                            setComment("")
                          }}
                          className={`${ spin  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#0c5cfe]  "}  relative overflow-hidden  px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#4281fd] opacity-80 duration-150 rounded-[4px] hover:opacity-100 disabled:cursor-default disabled:opacity-60 `}
                          disabled={!images.length}
                        >
                          cargar <IconCamara color="#ffffff" className="ml-2 w-[13px]"  />
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className={`flex justify-between items-end rounded-full ml-3`}>
                    { files.length ? (
                      renderFilePreview( images[0].file! )
                    ) : (
                      <div className="z-[5] flex flex-col h-[50px] w-[50px] items-center justify-center rounded-full bg-[#ffffff] text-2xl text-[#39507fcc] ">
                        <p className=" text-[13px] leading-4 ">avatar</p>
                        <IconCamara className="w-[15px] mt-0.5" />
                      </div> 
                    )}
                  </div>
                </div>
              </div>
            )}
          </ImageUploading>

          {/* update avatar comment */}
          <form action={formActionxxx} className="w-full">
            {/* Image */}
            <div className="hidden">
              <input
                className="w-full"
                id="avatar"
                type="text"
                name="avatar"
                defaultValue={
                  imageUrl
                }
              />
              <input
                type="hidden"
                id="post_slug"
                name="post_slug"
                value= {post.slug}
                readOnly
              />
            </div>

            {/* Massages */}
            <div
              className= "flex items-end relative space-x-8"
              aria-live="polite"
              aria-atomic="true"
            >
              {estadoxxx?.message && (
                <>
                  <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
                  <p className="pt-4 text-sm text-red-500">
                    {estadoxxx?.message}
                  </p>
                </>
              )}
            </div>

            {/* Guardar cambio */}
            <div className="hidden items-center justify-end gap-4 text-sm">
              <button
                type="submit"
                ref={buttonRefxxx}
                className="small:max-w-[140px] flex h-[26px] w-max items-center justify-center rounded-md bg-[#300322dd] !px-2.5 text-center text-[13px] text-[#d9d9d9] duration-150 hover:bg-[#300322] hover:text-[#eee] active:!bg-[#300322aa] disabled:opacity-40 disabled:hover:bg-[#300322dd] disabled:hover:text-[#d9d9d9] disabled:active:!bg-[#300322dd]"
                // disabled={imageUrl === ''}
                onClick={() => {
                  location.reload();
                }}
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
        
        {/* List comment */}
        <div className='relative '>
          {comments &&
            comments.map((comment, index) => {
              const isAuthor = user && user.email === comment.email_id;
              const isAdmin =user && user.role === "admin";
              // const isVisitor= sessionStorage.getItem("commentSession") && sessionStorage.getItem("commentSession")  === comments[index].comment
              // const isVisitor= (sessionStorage.getItem("nameVisitor") && sessionStorage.getItem("nameVisitor")  === comments[index].nombre) && (sessionStorage.getItem("imgUrlSession") && sessionStorage.getItem("imgUrlSession")  === comments[index].avatar)
              const isVisitor= comment.nombre === nameVisitor && commentLast.comment === commentSession

              console.log("is visitor: ", isVisitor)

              return (
                <div key={index} className={`flex flex-col mb-3 gap-[2px]`}>
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
                      ) : imgUrlSession || imgVisitor ? (
                        <Image
                          src={ imgUrlSession ? imgUrlSession : imgVisitor! }
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
                    </div>
                  ) : (
                    <div>
                      { comment.image ? (
                      <Image
                        src={ comment.image  }
                        alt="Imagen de usuario"
                        width={40}
                        height={40}
                        className="rounded-full object-cover ml-3 h-10 w-10"
                      />
                      ) : imageUrl || imgUrlSession ? (
                        <Image
                          src={ imageUrl ? imageUrl : imgUrlSession! }
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
                    </div>
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
                          { (isAdmin || (isAuthor || isVisitor) ) && 
                            <UpdateComment id={comment.id} />
                          }
                          {/* { isVisitor && index == 0 && nombre  &&
                          <div className={`absolute top-0 right-0 ${ index == 0 ? "block" : "hidden" }`}>
                            <UpdateComment id={commentLast.id} />aa
                          </div>} */}
                          {/* { !isVisitor && index == 0 && !nameVisitor &&
                          <div className={`absolute top-4 right-0 `}>
                            <UpdateComment id={commentLast.id} />aa
                          </div>
                          } */}
                        </div>{/* ${ index == 0 ? "block" : "hidden" } */}
                      </div>
                      <div className=" mt-1 leading-relaxed">
                        {comment.comment }
                      </div>
                    </div>
                  </Fondo>
                </div>
              );
            }
          )}

          {/* { nameVisitor  &&
          <div className={`absolute top-0 right-0 `}>
            <UpdateComment id={commentLast.id} />aa
          </div>} */}
        </div>

        {/* ///////////////////////////////////////////////////////// */}

        {/* crear comment */}
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
              value= {sessionStorage.getItem("commentSession") ? `${sessionStorage.getItem("commentSession")}` : comment }
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
              value= {imageUrl ? imageUrl : imgUrlSession ? imgUrlSession : "" }
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

        {/* update imagen user */}
        <form action={formActionxx}>
          <div className="">
            <input
              type="hidden"
              id="image"
              name="image"
              defaultValue={ imageUrl ? imageUrl : imgUrlSession ? imgUrlSession : "" }
              // readOnly
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


















      {/* update comment */}
        <form action={""}>
          <div className="flex justify-center gap-3 ml-2 ">
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
              value= { imageUrl ? imageUrl : sessionStorage.getItem("imgUrlSession") ? `${sessionStorage.getItem("imgUrlSession")}` : "" }
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
                // ref={buttonRefx}
                className='hidden'
              >
                Crear comentario
              </button>
            </div>
          </div>
        </form>

        {/*  avatar comment */}
        <form action={"formActionx"} className="w-full">
          {/* Image */}
          <div className="hidden">
            <input
              className="w-full"
              id="avatar"
              type="text"
              name="avatar"
              value= {imageUrl ? imageUrl : "" }
            />
            <input
              type="hidden"
              id="post_slug"
              name="post_slug"
              value= {post.slug}
              readOnly
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
          <div className="hidden">
            <button
              type="submit"
              ref={buttonRefx}
              onClick={() => {
                location.reload();
              }}
            >
              Guardar cambios
            </button>
          </div>
        </form>


    </>
  );
}
