'use client';

import { ExclamationCircleIcon, CameraIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';
import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Disclosure, DisclosurePanel } from '@headlessui/react';
import type { Session } from "next-auth"

import { User } from '@/app/lib/definitions';
import { updateUserImage, StateUserImage } from '@/app/lib/actions';
import IconCambio from '@/app/ui/logosIconos/icon-cambio';
import { Frente } from '@/app/ui/marcos';
import useToggleState from '@/app/lib/hooks/use-toggle-state';
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import { ImageListType} from '@/app/ui/consultas/typings';
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import { ButtonB, ButtonA } from "@/app/ui/button";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';


export default function EditImageComment(  /*{ session }: { session: Session | null }*/ { user }: { user: User | undefined } ) {

  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<ImageListType>([]);

  const [spin, setSpin] = useState(false);
  const [successState, setSuccessState] = useState(false);
  
  const { state, close, toggle } = useToggleState();

  const [imageSrc, setImageSrc] = useState<string | null>(null);



  const maxNumber = 1;

  const file: File | undefined = images ? images[0]?.file : undefined



  const buttonxRef = useRef<HTMLButtonElement>(null);

  const handleClickButton= () => {
    if (buttonxRef.current) buttonxRef.current.click()
  };
  const guardarConsulta= () => {
    setTimeout(handleClickButton, 200) 
    setSpin(false)
    location.reload()
  }




  // const imageSession = () => {
  //   sessionStorage.setItem('uploadedImage',  images[0].dataURL );
  //   setSpin(false)
  // };

  // Manejar el cambio de archivo
  const handleFileChange = (/* e: React.ChangeEvent<HTMLInputElement> */) => {
    // const file = e.target.files?.[0];
    // if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      sessionStorage.setItem('uploadedImage', base64);
      setImageSrc(base64);
      // setImageSrc("/dnrpa.png");
    };
    // reader.readAsDataURL({images});
    reader.readAsDataURL(file!);
    setSpin(false)
  };










  const clearState = () => {
    setSuccessState(false);
  };

  const handleToggle = () => {
    clearState();
    setTimeout(() => toggle(), 100);
  };

  useEffect(() => {
    // !images && sessionStorage.setItem('uploadedImage', `${images[0].dataURL}`);
    // if (storedImage) {
    //   setImageSrc(storedImage);
    // }

    if (successState) {
      close();
    }
  }, [successState, close, /* images */]);
  
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

      const responseData = await response.json();
      console.log('Res:', responseData);
      setImageUrl(responseData.urls);

     // console.log('responseData:', responseData);

      if (response.ok) {
        console.log('File uploaded successfully');
      }
      guardarConsulta();

    } catch (error) {
      console.error(error);
    }
    
    setSpin(false)
    
  };
  
  const renderFilePreview = (file: File | undefined ) => { 
    const fileType = file?.type; 
    if (fileType?.startsWith('image/')) { 
      return ( 
        <img 
          src={URL.createObjectURL(file!)} 
          alt={file?.name} 
          className="min-h-[80px] object-contain bg-[#ffffffaa] w-24 [border-radius:_6px_6px_0_6px] border border-[#1d021544]" />
      ); 
      } else if ( fileType === 'application/pdf' ) { 
        return ( 
        <embed 
          src={URL.createObjectURL(file!)} 
          type="application/pdf" 
          className="min-h-[80px] object-contain bg-[#ffffffaa] w-[96px] h-[120px] rounded-md border border-[#1d021544] " /> 
        ); 
      } else { return ( 
      <p className=" text-[#fff] break-words p-2 text-xs text-left">
         Tipo archivo: <i className="text-[#d9d9d9] text-xs">({fileType})</i>
      </p> 
      ); 
    }
  }

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
    // sessionStorage.setItem('uploadedImage', `${imageSrc}`);
    // setImageSrc(imageList[0]?.data_url || null);
  };
  
  const initialState: StateUserImage = { message: null, errors: {} };
  const updateUserWithId = updateUserImage.bind(null, `${user?.id}`);
  const [estado, formAction] = useActionState(updateUserWithId, initialState);

  console.log("images: ", images);
  console.log("file: ", file);
  console.log("unloadedImage: ", sessionStorage.getItem('uploadedImage'));


  return (
    <>
      <div className="flex text-small-regular gap-12 ">
        <div className="flex items-end ml-3">
          { file ? (
            <img 
              src={URL.createObjectURL(file!)} 
              alt={file?.name} 
              className="h-[50px] w-[50px] rounded-full "
              width={80}
              height={80} />
          ) : (
            <div className="flex flex-col h-[50px] w-[50px] items-center justify-center rounded-full bg-[#39507f22] text-2xl text-[#39507f99] ">
              <p className=" text-xs ">Cargá</p>
              <CameraIcon className="w-4" color='#39507f99' />
            </div>
          )}
        </div>

        <div className={`flex flex-col delay-200 `}>
          <div className="flex flex-wrap mb-[1px]">
            <div className="w-full flex flex-col items-center">
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
                  <div className={`relative flex gap-[1px] flex-col w-full `} >
                    <button
                      type="button"
                      onClick={onImageUpload}
                      {...dragProps}
                      className={`group w-full disabled:!cursor-default `}
                      disabled= {imageList.length == maxNumber}
                    >
                      <div className={`relative label-dnd w-full duration-150 text-sm flex flex-col justify-center items-center active:opacity-60  `}>

                        <div className={` hidden text-[13px] p-2 duration-150 min-[512px]:flex-ro ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100"} `}>{/* ${images.length ? "hidden" : "flex"} */}
                          <div>
                            Click o arrastrá y solta aquí <br />
                          </div>
                        </div>

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
                          <div className={` ${images.length ? "hidden" : "flex"} mt-[7px] h-9 bg-[#39507f22] rounded-md px-2 flex items-center justify-evenly outline-1 outline-dashed outline-[#999] outline-offset-1 duration-150 min-[512px]:flex-row  ${isDragging ? 'outline-[#666] bg-[#ffffff33] ' : undefined}  ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"} `}>
                            <IconDragDrop color="#39507fcc" className= "w-6 opacity-80 rotate-45 " />
                            <p className={`text-[12.5px] tracking-wide leading-[1.5] py-0.5 px-2 `}>Click o arrastrá y solta aquí</p>
                          </div>
                        )}

                        <div 
                          className={`absolute  w-[50px] h-[50px] -left-[98px] top-[0px] border border-[#39507f06]  bg-[#39507f00] rounded-full outline-1 outline-dashed outline-[#999]  outline-offset-1 duration-150  ${isDragging ? 'outline-[#666] bg-[#ffffff33] ' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#666]"}  `}
                          >
                        </div>
                      </div>
                    </button>

                    <div className={` ${images.length ? "flex" : "hidden"} mt-[7px] text-[13px] items-center justify-center  gap-0.5 `}>
                      <button 
                        onClick={() => {
                        onImageUpdate(0)
                        }} 
                        className="flex items-center gap-2 h-9 bg-[#39507f22] px-3 py-0.5 cursor-pointer rounded-md duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                        disabled= {!file}
                      >
                        Cambiar <CameraIcon className="w-4" color='#39507f88' />
                      </button>
                      <button 
                        onClick={() => {
                        onImageRemove(0)
                        }} 
                        className="flex items-center gap-2 h-9 bg-[#39507f22] px-3 py-0.5 cursor-pointer rounded-md duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                        disabled= {!file}
                        >
                        Eliminar <CameraIcon className="w-4" color='#39507f88' />
                      </button>
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

          {/* Actualizar imagen en db */}
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
          
          {/* subir img  */}
          <form 
            onSubmit={ /* !user ? */ handleFileChange /* : uploadToServer */ } /* !user ? uploadToServer : */
            // onSubmit={ file ? uploadToServer1 : uploadToServer2 }
            className="hidden -ml-0.5 w-[calc(100%_+_4px)] justify-center items-center" /* id="subir" */>
            <ButtonA
              // form="subir"
              className={`h-8 text-[13px] !px-0 !w-full rounded-t-none !bg-[#39507f] disabled:opacity-50`}
              type="submit"
              disabled={!file && true }
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
      </div>
    </>
  );
}
