"use client"

import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FormEvent, useState, useEffect, useRef, useActionState  } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { nanoid } from "nanoid";

import { User, CommentsPost, Post, Comment } from "@/app/lib/definitions";
import  distanceToNow  from "@/app/lib/dateRelative";
import { Fondo, Frente } from "@/app/ui/marcos";
import UpdateComment from '@/app/ui/consultas/comments/update-comment';
import { ImageListType } from "@/app/ui/consultas/typings";
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import IconDragDrop from "@/app/ui/logosIconos/icon-drag-drop";
import IconCuenta from "@/app/ui/logosIconos/icon-cuenta"
import IconCamara from '@/app/ui/logosIconos/icon-camara';
import IconComments from "@/app/ui/logosIconos/icon-comments"
import { createComment, StateComment, updateUserImage, StateUserImage, createUser, StateUser, authenticate } from '@/app/lib/actions';
import { ButtonB, ButtonA } from '@/app/ui/button';
import { InputCnp } from "@/app/ui/uiRadix/input-cnp";
import { TextareaCnp } from "@/app/ui/uiRadix/textarea-cnp";


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
  
  const [nombre, setNombre] = useState("");
  const [images, setImages] = useState<ImageListType>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgUrlSession, setImgUrlSession] = useState("");
  const [imgVisitor, setImgVisitor] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [commentOk, setCommentOk] = useState(true);
  const [comme, setComme] = useState(true);
  const [spin, setSpin] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState("");

  const pathname = usePathname();
  
  const id= user?.id!

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
  
  const buttonRef = useRef<HTMLButtonElement>(null); //create comment
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const buttonRefx = useRef<HTMLButtonElement>(null); //create user
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  };

  const buttonRefAuth = useRef<HTMLButtonElement>(null);
  const handleClickButtonAuth= () => {
    if (buttonRefAuth.current) buttonRefAuth.current.click()
  };

  const buttonRefxx = useRef<HTMLButtonElement>(null); //updated img user
  const handleClickButtonxx= () => {
    if (buttonRefxx.current) buttonRefxx.current.click()
  };

  const crearComment= () => {
    setTimeout(() => handleClickButton(), 200) //create comment
    !user && setTimeout(() => handleClickButtonx(), 200) //create user
    setTimeout(() => setSpin(true), 200)
    setTimeout(() => setSpin(false), 2000)
    setTimeout(() => setOpen(!open), 2000)
    !user?.image && setTimeout(() => setComme(!comme), 2000)
    !user?.image && setTimeout(() => setCommentOk(!commentOk), 2000)
    console.log("Comentario creado")
  }
  
  const actualizarComment= () => {
    !user?.image && setTimeout( handleClickButtonxx, 200) //updated img user
    setTimeout(() => setSpin(false), 2000)
    setTimeout(() => location.reload(), 2000) 
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
    const token=  nanoid(16)
    setToken(token) 
    sessionStorage.getItem('imgUrlSession') && setImgUrlSession(`${sessionStorage.getItem('imgUrlSession')}`) 
    sessionStorage.getItem('imgVisitor') && setImgVisitor(sessionStorage.getItem('imgVisitor'))
  }, [ ]);

  const initialStatex: StateUser = { message: null, errors: {} };
  const [estadox, formActionx, isPendingx] = useActionState(createUser, initialStatex);

  const [errorMessage, formActionAuth, isPendingAuth] = useActionState(authenticate, undefined, );

  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction, isPending] = useActionState(createComment, initialState);

  const initialStatexx: StateUserImage = { message: null, errors: {} };
  const updateUserImageWithId = updateUserImage.bind(null, id );
  const [estadoxx, formActionxx ] = useActionState(updateUserImageWithId, initialStatexx);

  
  return (
    <>
      <div className={`relative ${!comme && "mt-[92px]"}`}>

        {/* Form Crear comment */}
        <div className={` ${commentOk === true || imgVisitor  ? "block" : "hidden"}`}>
          <div className={` text-sm sm:text-[15px] `}>
              { user ? (
                <p><b>{user.name}</b>, podés ampliar esta consulta</p>
              ) : "Podés ampliar esta consulta"}
          </div>
          
          <Frente className={`!p-2 w-full mt-2 mb-9 text-small-regular sm:!p-4 !bg-[#e5ebf5]`}>
            <div className={`flex items-center justify-between gap-2.5 sm:gap-5 ${open && "mb-4"}`}>
              <div className="w-max">
                <IconComments className="opacity-80 w-8 sm:w-10" />
              </div>

              <p className={`flex flex-col items-start w-full text-start leading-[1.2] delay-50 text-[13px] text-[#39507f] transition-[opacity] duration-300 ${open && "opacity-0"} sm:text-[15px] sm:flex-row`}>
                <span className='mr-2'>Comentá tu experiencia</span><span className='text-[13px] text-[#200b1d77]'>(podés eliminarlo)</span>
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
              {/*  Crear comment  */}
              <div className={` ${!open && "invisible"}`} > 
                <fieldset className={` grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4 ${ user?.name ? "hidden" : "grid" }`}>
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
                      className={`${spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent"}  relative overflow-hidden h-8 text-[13px] w-max `}
                      disabled={ comment && (nombre || user?.name )  ? false : true }
                      onClick={() => {
                        wait().then(() =>{ 
                          handleClickButtonAuth()
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
        <div className={` ${images.length != 0 ? "absolute -top-[56px]" : "absolute -top-[56px]"} -left-[5px] w-full gap-1 flex flex-col mb-3 } ${comme === true || imgVisitor  ? "hidden" : "block" } `}>
          <ImageUploading
            multiple= {false}
            value={images}
            onChange={onChange}
            // onError={onError}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            maxFileSize= {4000000}
            acceptType={["jpg", "png"]}
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
                        {/* {errors.maxFileSize && (
                          <span>El tamaño excede el máximo permitido</span>
                        )} */}
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
                      className={`absolute z-20 w-[50px] h-[50px] ${images.length ? "left-[12px] top-[46px]" : "left-[12px] top-[44px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-full outline-1 outline-dashed outline-[#888]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                      >
                    </div>

                    <div 
                      className={`absolute z-[70] w-[60px] h-[60px] ${images.length ? "left-[7px] top-[41px] " : "left-[12px] top-[48px] hidden"}  bg-[#39507f00] rounded-full outline-1 outline-dashed outline-[#00000000]  outline-offset-1   ${isDragging ? 'outline-[#000] bg-[#39507f66]' : undefined}   `}
                      >
                    </div>

                    <div 
                      className={`absolute w-[142px] h-7 ${images.length ? "left-[12px] top-[48px] hidden" : "left-[8px] top-[0px]"} border border-[#39507f06]  bg-[#ffffff00] rounded-md outline-1 outline-dashed outline-[#888]  outline-offset-1   ${isDragging ? 'outline-[#666] bg-[#39507f55]  hover:bg-[#ffffff]' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                      >
                    </div>
                  </div>
                </button>

                <div className="w-full flex flex-col justify-start gap-4">
                  <div className={` ${images.length ? "hidden" : "flex" } ml-2 text-[13px] items-center justify-start gap-5 `}>
                    <p className="flex items-center gap-1.5 w-[142px] h-7 bg-[#ffffff] text-[#020b1daa] px-2 py-0.5 cursor-pointer rounded-md " >
                      Agregar imagen<IconCamara className="w-[14px]" />
                    </p>
                  </div>

                  <div className={` ${images.length ? "flex" : "hidden"} text-[13px] items-center justify-start gap-2 `}>
                    <button 
                      onClick={() => {
                      onImageUpdate(0)
                      }} 
                      className="flex items-center ml-2 gap-1.5 h-[30px] opacity-80 bg-[#ffffffee] text-[#020b1ddd] px-2 py-0.5 cursor-pointer rounded-md duration-200 hover:opacity-100 active:opacity-70 "/* disabled:opacity-40 disabled:cursor-default */
                      // disabled= {!files.length}
                      >
                      <p>Cambiar</p>
                      <IconCamara className="w-[14px]" color="#39507f" />
                    </button>

                    <form onSubmit={ uploadToServer } >
                      <div className="relative flex justify-end gap-3 ">
                        <button
                          type="submit"
                          onClick={() => {
                            setSpin(true);
                          }}
                          className={`${ spin && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent bg-[#39507f] "} relative overflow-hidden  px-3 h-7 flex items-center text-sm text-[#ffffff] border border-transparent bg-[#39507f] opacity-80 duration-150 rounded-[4px] hover:opacity-100 disabled:cursor-default disabled:opacity-60 `}
                          disabled={!images.length}
                        >
                          cargar <IconCamara color="#ffffff" className="ml-3 w-[13px]"  />
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

          { !user ?
          <div className={`absolute top-[118px] right-4 z-30 `}>
            <UpdateComment id={commentLast.id } />
          </div> : ""
          }
        </div>
        
        {/* List comment */}
        <div className='relative '>
          {comments &&
            comments.map((comment, index) => {
              const isAuthor = user && user.email === comment.email_id;
              const isAdmin =user && user.role === "admin";
              // const isVisitor= comment.email_id === user?.email 

              return (
                <div key={index} className={`flex flex-col mb-3 gap-[2px]`}>
                  { comment.image ? (
                    <Image
                      src={ comment.image }
                      alt="Imagen de usuario"
                      width={40}
                      height={40}
                      className="rounded-full p-[1px] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000055] object-cover ml-3 h-10 w-10"
                    />
                  )  :  (
                    <span className="flex ml-3 h-10 w-10 text-[#39507fcc] items-center justify-center rounded-full bg-[#020b1d12] text-2xl ">
                      {comment?.name?.substring(0, 1).toUpperCase() }
                    </span>
                  )}
                 

                  <Frente key={comment.id} className="flex text-[#020b1dbb] space-x-4 w-full p-3 !bg-[#ffffffbb] !rounded-[6px] ">
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap">
                          <p className="font-semibold mr-2">{ comment.name }</p>
                        
                          <time className="text-[#020b1d66] text-[13px]">
                            {distanceToNow(new Date(`${comment.created_at}`))}
                          </time>
                        </div>
                        <div className='relative flex items-center gap-0'>
                          { (isAdmin || (isAuthor /* || isVisitor */) ) &&
                            <UpdateComment id={comment.id} /> 
                          }
                        </div>
                      </div>
                      <div className=" mt-1 leading-relaxed text-[#020b1db6]">
                        {comment.comment }
                      </div>
                    </div>
                  </Frente>
                </div>
              );
            }
          )}
        </div>

        {/* ///////////////////////////////////////////////////////// */}

        {/* crear user */}
        <form action={formActionx}>
          <input
            type="hidden"
            name="email"
            value="comment@gmail.com"
            readOnly
            />
          <input
            type="hidden"
            name="name"
            value={ nombre }
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
            value= { token }
            readOnly
          />
          <input type="hidden" name="pathname" value={pathname} readOnly />
          <button
            type="submit"
            ref={buttonRefx}
            className='hidden'
          >
            Enviar
          </button>
        </form>

        {/* authentication */}
        <form action={formActionAuth}>
          <input
            type="hidden"
            name="email"
            value="coment@gmail.com"
            readOnly
          />
          <input
            type="hidden"
            name="password"
            value= "72cf0550-3f64-474d-b150-aa813c6b4b67"
            readOnly
          />
          <input type="hidden" name="redirectTo" value={pathname} readOnly />
          <input
            type="hidden"
            name="token"
            value= { token }
            readOnly
          />
          <button
            type="submit" 
            ref={buttonRefAuth}
            className="hidden"
          >
            Continuar
          </button>
        </form>
        
        {/* crear comment */}
        <form action={formAction}>
          <input
            type="hidden"
            name="nombre"
            value= { user?.name ? user?.name : nombre ? nombre : "" }
            readOnly
          />
          <input
            type="hidden"
            name="comment"
            value= {comment }
            readOnly
          />
          <input
            type="hidden"
            name="post_slug"
            value= {post.slug}
            readOnly
          />
          <input
            type="hidden"
            name="avatar"
            value= { user?.image ? user.image : imgUrlSession ? imgUrlSession : "" }
            readOnly
          />
          <input
            type="hidden"
            name="email_id"
            value= {user?.email ? user?.email : ""}
            readOnly
          />
          <input
            type="hidden"
            name="token"
            value= { token }
            readOnly
          />
          <input type="hidden" name="pathname" value={pathname} readOnly />
          <button
            type="submit"
            ref={buttonRef}
            className='hidden'
          >
            Crear comentario
          </button>
        </form>

        {/* update imagen user */}
        <form action={formActionxx}>
          <input
            type="hidden"
            name="image"
            // defaultValue={ imageUrl ? imageUrl : user?.image ? user.image : imgUrlSession ? imgUrlSession : "" }
            defaultValue={ imageUrl }
            readOnly
          />
          <input type="hidden" name="pathname" value={pathname} readOnly />
          <button
            type="submit"
            ref={buttonRefxx}
            className='hidden'
          >
            Crear comentario
          </button>
        </form>
      </div>
    </>
  );
}
