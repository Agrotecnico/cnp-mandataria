"use client"


// import { useState } from "react"
import { TrashIcon } from '@heroicons/react/24/outline';

import { deleteConsulta } from '@/app/lib/actions';
import { ButtonB } from "@/app/ui/button";



import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import Image from 'next/image';

import { User } from '@/app/lib/definitions';
import { updateUserImage, StateUserImage } from '@/app/lib/actions';
import useToggleState from '@/app/lib/hooks/use-toggle-state';
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import { ImageListType} from '@/app/ui/consultas/typings';
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import { ButtonA } from "@/app/ui/button";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import IconCamara from '@/app/ui/logosIconos/icon-camara';



const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));


export default function EditProfileImageModal({ user }: { user: User | undefined }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [images, setImages] = useState<ImageListType>([]);

  const [spin, setSpin] = useState(false);
  const [successState, setSuccessState] = useState(false);
  
  const { state, close, toggle } = useToggleState();

  const [imageSrc, setImageSrc] = useState<string | null>(null);


  const maxNumber = 1;

  const file: File | undefined = images ? images[0]?.file : undefined

  const clearState = () => {
    setSuccessState(false);
  };

  const files: File[]= []
    images.map((image) => {
      files.push(image.file!)
    })
  
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleClickButton= () => {
      if (buttonRef.current) buttonRef.current.click()
    };
  
    const actualizarComment= () => {
      !user?.image && setTimeout(() => handleClickButton(), 200) //updated img user
      setTimeout(() => setImages([]), 2000)
      setTimeout(() => setSpin(false), 2000)
    }
  
    /////////////////////////////////////
    const uploadToServer = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (files.length === 0) return;
  
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        !user?.image && sessionStorage.setItem('imgVisitor', base64);
      };
      reader.readAsDataURL(files[0]);
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
        console.log("body: ", responseData)
      
        const polo: string[]= responseData.urls
        console.log("respon: ", polo)
  
        const respon= JSON.stringify( polo )
    
        // setImageUrl(respon);
        setImageUrl(responseData.urls);
  
        if (response.ok) {
          console.log('Ok imagen subida');
        }
  
        actualizarComment();
  
        // sessionStorage.setItem("imgUrlSession", `${comments[0].avatar?.slice(1, -1)}`)
        !user?.image && sessionStorage.setItem("imgUrlSession", responseData.urls)
  
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

    const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
    // handleFileChange
  };

  // const deleteConsultaWithId = deleteConsulta.bind(null, id);
  const initialState: StateUserImage = { message: null, errors: {} };
  const updateUserWithId = updateUserImage.bind(null, `${user?.id}`);
  const [estado, formAction, isPending] = useActionState(updateUserWithId, initialState);


  return (
    <>
      <div className="text-small-regular p-2 ">
        <div className="mx-14 flex items-center justify-between">
          { file  ? (
            <>
            <img 
              src={URL.createObjectURL(file!)} 
              alt={file?.name} 
              className="object-cover h-16 w-16 rounded-full bg-cover [box-shadow:0_1px_#ffffff,_0_-1px_#0000002e] "
              width={80}
              height={80} />
            </>
          ) : user?.image || imageUrl ? (
            <Image 
              src= { imageUrl! }
              alt="imagen de perfil"
              className="h-16 w-16 rounded-full "
              width={80}
              height={80}>
            </Image>
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#39507f22] text-2xl text-[#39507f99] ">
              {user ? user?.name?.substring(0, 1).toUpperCase() : 
              <IconCuenta className="w-7 sm:w-10" color='#39507f66' />}
            </span>
          )}
        </div>

        <div className={`flex flex-col gap-2 pt-4 delay-200 `}>
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
                          <div className={`w-full rounded-t-lg py-1 px-2 flex flex-col items-center justify-evenly duration-150 min-[512px]:flex-row  ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100"} `}>
                            <IconDragDrop color="#39507fcc" className= "w-6 opacity-80 rotate-45 " />
                            <p className={`text-[12.5px] tracking-wide leading-[1.5] py-0.5 px-2 `}>Seleccioná una IMAGEN</p>
                          </div>
                        )}

                        <div className={`text-[13px] p-4 duration-150 min-[512px]:flex-ro ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100"} `}>
                          <div>
                            Click y elegí un archivo o arrastralo y sueltá aquí <br />
                          </div>
                        </div>
                        
                        <div 
                          className={`absolute w-full h-full border border-[#39507f06]  bg-[#39507f16] rounded-md outline-1 outline-dashed outline-[#0000009e]  ${isDragging ? 'outline-[#000000] bg-[#ffffff33] ' : undefined} ${imageList.length == maxNumber ? "opacity-50" : "opacity-80"} ${imageList.length == maxNumber ? "group-hover:opacity-50" : "group-hover:opacity-100 group-hover:outline-[#000000]"}  `}
                          >
                        </div>
                      </div>
                    </button>

                    <div className= "absolute -top-[72px] left-[140px] flex flex-col  " >
                      <div className="text-[13px] flex flex-col items-center justify-end  gap-0.5">
                        <button 
                          onClick={() => {
                          onImageUpdate(0)
                          }} 
                          className="flex w-[100px] bg-[#548eff] text-white px-3 py-0.5 cursor-pointer rounded-[4px] duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                          disabled= {!file}
                        >
                          Cambiar <IconCamara className='w-[14px] absolute top-[5px] left-[74px] ' color="#ffffff" />
                        </button>
                        <button 
                          onClick={() => {
                          onImageRemove(0)
                          }} 
                          className="flex w-[100px] bg-[#548eff] text-white px-3 py-0.5 cursor-pointer rounded-[4px] duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                          disabled= {!file}
                          >
                          Eliminar <IconCamara className='w-[14px] absolute top-[31px] left-[74px] ' color="#ffffff" />
                        </button>
                      </div> 
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

          
          
          {/* subir img  */}
          <form 
            onSubmit={ imageUrl  ?  uploadToServer2 : uploadToServer}
            className="-ml-0.5 w-[calc(100%_+_4px)] flex justify-center items-center" >
            <ButtonA
              className={`h-8 text-[13px] !px-0 !w-full !rounded-md !bg-[#39507f] disabled:opacity-50`}
              type="submit"
              disabled={!file && true }
              onClick={(e) => {
                setSpin(true);
                // handleFileChange
              }}
            >
              <div
                className={`w-full h-8 flex items-center justify-center gap-3 ${isPending && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent"} relative overflow-hidden `}
              >
                Guardar cambio
              </div>
            </ButtonA>
          </form>
        </div>

        {/*Form update imagen user */}
        <form action={formAction}>
          <div className="flex justify-center gap-3 ml-2 ">
            <input
              type="hidden"
              id="image"
              name="image"
              value= {imageUrl ? imageUrl : "" }
              readOnly
            />
            <div>
              <button
                type="submit"
                ref={buttonRef}
                className='hidden'
              >
                Actualizar imagen
              </button>
            </div>
          </div>
        </form>
        
      </div>
    </>
  );
}
