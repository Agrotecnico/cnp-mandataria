"use client"

import { useState, useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx';

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

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

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
  const [comme, setComme] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("nombre")
    sessionStorage.removeItem("comment")
    setComme(true)
    sessionStorage.getItem('name') ? setName(`${sessionStorage.getItem('name')}`) : ""
    sessionStorage.getItem('email') ? setEmail(`${sessionStorage.getItem('email')}`) : ""
  }, []);

  const initialState: StateComment = { message: null, errors: {} };
  const [estado, formAction] = useActionState(createComment, initialState);

  return (
    <>
      <div className={`${session && "hidden"}`}>
        <p className={` text-sm sm:text-[15px]  ${commentOk === true ? "block" : "hidden"} `}>
          <span className="font-semibold text-[15px] mr-1 sm:text-base">
            { sessionStorage.getItem('nombre') ? `${sessionStorage.getItem('nombre')}` :   
            sessionStorage.getItem('name') ? `${sessionStorage.getItem('name')}` : "" }
          </span>
          <span>
            {!sessionStorage.getItem('nombre') ? `Podés ampliar esta consulta` : "¿Qué opinás de esta consulta?"}
          </span>
        </p> 
        
        <Frente className={`!p-2 w-full mt-2 mb-6 text-small-regular sm:!p-4 !bg-[#39507f11] ${commentOk === true ? "block" : "hidden"}`}>
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
          {session ? (""
            // <>
            //   {/* Crear comment user */}
            //   <div className="pt-2 sm:pt-4"> 
            //     {/* comment */}
            //     <TextareaCnp
            //       id="comment"
            //       name="comment"
            //       className={`text-sm placeholder:text-[#000000aa] placeholder:text-[13px]  ${open === false ? "hidden" : "block"}`}
            //       rows={3}
            //       placeholder={`Comentario...`}
            //       onChange={(e) => setComment(e.target.value)}
            //       value={comment}
            //       required
            //       disabled={ !open }
            //     />

            //     {/* Massages erros */}
            //     <div
            //       className="flex items-end relative space-x-8"
            //       aria-live="polite"
            //       aria-atomic="true"
            //     >
            //       {estado?.message && (
            //         <>
            //           <ExclamationCircleIcon className="absolute top-4 h-5 w-5 text-red-500" />
            //           <p className="pt-4 text-sm text-red-500">{estado?.message}</p>
            //         </>
            //       )}
            //     </div>
            //   </div>

            //   <form action={formAction}>
            //     {/* nombre */}
            //     <input
            //       type="hidden"
            //       id="nombre"
            //       name="nombre"
            //       value= {`${session.user.name}`}
            //       readOnly
            //     />

            //     {/* email */}
            //     <input
            //       type="hidden"
            //       id="email_id"
            //       name="email_id"
            //       value= {`${session.user.email}`}
            //       readOnly
            //     />

            //     <input
            //       type="hidden"
            //       id="comment"
            //       name="comment"
            //       value= {comment}
            //       readOnly
            //     />

            //     {/* post_slug */}
            //     <input
            //       type="hidden"
            //       id="post_slug"
            //       name="post_slug"
            //       value= {post.slug}
            //       readOnly
            //     />

            //     {/* button submit */}
            //     <div className={`flex items-center justify-end gap-4 mt-4 text-sm  ${open === false ? "hidden" : "block"}`}
            //       >
            //       <ButtonA
            //         className={`h-8 text-[13px] w-max`}
            //         disabled={ comment && session.user.email ? false : true }
            //         onClick={() => {
            //           wait().then(() => setComment(""));
            //           setOpen(!open)
            //         }}
            //       >
            //         Enviar
            //       </ButtonA>
            //     </div>
            //   </form>
            // </>
            ) : (
            <>
              {/* Crear comment visitante */}
              <div className="" > 
                {/* nombre */}
                <fieldset className="grid grid-cols items-center gap-2 sm:grid-cols-2 md:flex-row md:gap-4">
                  {!sessionStorage.getItem('nombre') &&
                    <InputCnp
                      className={`text-sm h-8 mb-4 !w-full placeholder:text-[#000000aa] placeholder:text-[13px]  ${name ? "hidden" : "block"}`}
                      id="nombre"
                      name="nombre"
                      type="text"
                      minLength={3}
                      maxLength={100}
                      value={name ? name : nombre ? nombre : "" }
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
                  } 
                  
                </fieldset>

                {/* comment */}
                <TextareaCnp
                  id="comment"
                  name="comment"
                  className={`text-sm placeholder:text-[#000000aa] placeholder:text-[13px] ${open === false ? "hidden" : "block"} `}
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

              <form action={formAction}>
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
                  value= {email ? email : "comment@gmail.com"}
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

                <div className={`flex items-center justify-end gap-4 mt-4 text-sm  ${open === false ? "hidden" : "block"}`}>
                  {user?.role == "admin" || user?.role == "memberAccount" ? (
                    <ButtonA
                      className={`h-8 text-[13px] w-max`}
                      disabled={ comment && nombre ? false : true }
                      onClick={() => {
                        wait().then(() => setComment(""));
                        setOpen(!open);
                      }}
                    >
                        Enviar
                    </ButtonA>
                  ) : (
                    <ButtonA
                      type="button"
                      className={`h-8 text-[13px] w-max`}
                      disabled={ comment && (nombre || name) ? false : true }
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
                      Guardar
                    </ButtonA>
                  )}
                </div>
              </form>
            </>
          )}
          </div>
        </Frente>
      </div>

      <div className={`gap-2 flex flex-col sm:flex-row ${comme === true && "hidden" }`}>
        <div className="flex-shrink-0">
          <span className="flex h-10 w-10 items-center text-[#39507fcc] justify-center rounded-full bg-[#020b1d18] text-2xl ">
            {nombre ? nombre.substring(0, 1).toUpperCase() :
            name ? name.substring(0, 1).toUpperCase() : ""}
          </span>
        </div>

        <Fondo className="flex space-x-4 w-full p-3 pb-2 !bg-[#39507f09] !rounded-[6px] ">
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap">
                <p className="font-semibold mr-2">
                  {nombre ? nombre : name ? name : ""}
                </p>
                <p className="text-[#020b1d66]">
                  hace 1 segundos
                </p>
              </div>

              <form action={formAction}>
                <div className="flex justify-center gap-3 ml-2 ">
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
                    value= {email ? email : "comment@gmail.com"}
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
                    onClick={() => {
                      wait().then(() =>{ 
                        sessionStorage.removeItem("nombre")
                        sessionStorage.removeItem("comment")
                        setNombre("")
                        setComment("")
                        setComme(true)
                        setCommentOk(true)
                      });
                    }}
                    className="px-2 text-sm text-[#fff] border border-transparent bg-[#548eff] opacity-80 duration-150 rounded-full hover:opacity-100 "
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
                    className="px-3 text-sm text-[#020b1d99] border border-[#020b1d22] duration-150 rounded-full hover:text-[#ff0000aa]"
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
