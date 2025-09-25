"use client"

import { FormEvent, useState, useEffect, useRef } from 'react';
// import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
  CameraIcon,
  QuestionMarkCircleIcon,
  CurrencyDollarIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/app/ui/uiRadix/dropdown-menu';


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

   const buttonyRef = useRef<HTMLButtonElement>(null);
  const handleClickButton= () => {
    if (buttonyRef.current) buttonyRef.current.click()
  };

  // const files: File[]= []
  // images.map((image) => {
  //   files.push(image.file!)
  // })

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

  useEffect(() => {
    sessionStorage.removeItem("nombre")
    sessionStorage.removeItem("comment")
    setComme(true)
    user?.name && setName(`${user?.name}`)
    user?.email && setEmail(`${user?.email}`)
  }, []);

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
        <EditImageComment user={user} />

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
                    ref={buttonyRef}
                    // onClick={() => {
                    //   wait().then(() =>{ 
                    //     sessionStorage.removeItem("nombre")
                    //     sessionStorage.removeItem("comment")
                    //     setNombre("")
                    //     setComment("")
                    //     setComme(true)
                    //     setCommentOk(true)
                    //   });
                    // }}
                    className= "hidden" /* "px-2 h-5 flex items-center text-sm text-[#fff] border border-transparent bg-[#548eff] opacity-80 duration-150 rounded-lg hover:opacity-100 " */
                  >
                    enviar
                  </button>
                  {/* <button
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
                  </button> */}
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
