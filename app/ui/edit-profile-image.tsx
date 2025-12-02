'use client';

import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { User } from '@/app/lib/definitions';
import { updateUserImage, StateUserImage } from '@/app/lib/actions';
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import { ImageListType} from '@/app/ui/consultas/typings';
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import IconCamara from '@/app/ui/logosIconos/icon-camara';
import { ButtonA } from "@/app/ui/button";

const wait = () => new Promise((resolve) => setTimeout(resolve, 3000));

export default function EditProfileImage( { user, setIsModalOpen}: { user: User | undefined; setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
 } ) {

  const pathname = usePathname();

  const [images, setImages] = useState<ImageListType>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgVisitor, setImgVisitor] = useState<string | null>(null);
  const [nameVisitor, setNameVisitor] = useState<string | null>(null);
  const [spin, setSpin] = useState(false);

  const file: File | undefined = images ? images[0]?.file : undefined

  const files: File[]= []
  images.map((image) => {
    files.push(image.file!)
  })

  const buttonRef = useRef<HTMLButtonElement>(null); // update image user
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const actualizarImageUser= () => {
    user && setTimeout(() => handleClickButton(), 200)
    setTimeout(() => setSpin(false), 2000)
    setTimeout(() => location.reload(), 2000)
  }

  /////////////////////////////////////
  const uploadToServer = async (e: FormEvent<HTMLFormElement>) => {
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
      !user?.image && sessionStorage.setItem('imgVisitorx', base64);
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

      !user?.image && sessionStorage.setItem("imgUrlSessionx", responseData.urls[0])

      if (response.ok) {
        console.log('Ok imagen subida');
      }

      actualizarImageUser();

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
    sessionStorage.getItem('imgVisitor') && setImgVisitor(`${sessionStorage.getItem('imgVisitor')}`)
    sessionStorage.getItem('nameVisitor') && setNameVisitor(`${sessionStorage.getItem('nameVisitor')}`) 
  }, []);

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
  };
  
  const initialState: StateUserImage = { message: null, errors: {} };
  const updateUserImageWithId = updateUserImage.bind(null, `${user?.id}`);
  const [estado, formAction, isPending] = useActionState(updateUserImageWithId, initialState);


  return (
    <>
      <div className="text-small-regular p-2 pb-3 ">
        <div className="mx-12 mt-2 flex items-center justify-between">
          {  file ? (
            <img 
              src={URL.createObjectURL(file!)} 
              alt="Imagen de usuario"
              className="object-cover h-14 w-14 rounded-full bg-cover [box-shadow:0_1px_#ffffff,_0_-1px_#0000002e] "
              width={80}
              height={80} />
          ) : user?.image  ? (
            <Image 
              src= { user.image }
              alt="imagen de perfil"
              className="h-14 w-14 rounded-full "
              width={80}
              height={80}>
            </Image>
          ) :  imgVisitor ? (
            <Image 
              src= { imgVisitor! }
              alt="imagen de perfil"
              className="h-14 w-14 rounded-full "
              width={80}
              height={80}>
            </Image>
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#39507f22] text-2xl text-[#39507f99] ">
              {nameVisitor ? nameVisitor.substring(0, 1).toUpperCase() : 
              <IconCuenta className="w-7 sm:w-8" color='#39507f66' />}
            </span>
          )}
        </div> 

        <div className={`flex flex-col gap-9 pt-8 delay-200 `}>
          <div className="flex flex-wrap m-1">
            <div className="w-full flex flex-col items-center">
              <ImageUploading
                multiple= {false}
                value={images}
                onChange={onChange}
                // onError={onError}
                // maxNumber={maxNumber}
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
                  <div className={`relative flex flex-col gap-[1px] w-full `} >
                    <button
                      type="button"
                      onClick={onImageUpload}
                      {...dragProps}
                      className={`group w-full rounded-md disabled:!cursor-default `}
                      disabled= {imageList.length > 0}
                    >
                      <div className={`relative label-dnd rounded-md bg-[#548eff36] text-[#020b1d] w-full px-2 py-2 duration-150 text-sm flex flex-col justify-center items-center  hover:text-[#020b1dd3] `}>
                        <div className="flex items-center gap-2 text-[13px] duration-150 opacity-90 group-hover:opacity-100">
                          <IconDragDrop color='#39507f' className= "w-[30px] opacity-80 ml-2" />
                          <div className='leading-[1]'>
                            Elegí una imagen o arrastrala y sueltá aquí <br />
                            <p className="text-xs mt-1.5"> archivos <span className='font-semibold'>jpg</span >, <span  className='font-semibold' >png</span > o <span className='font-semibold' >pdf</span >
                            </p>
                          </div>
                        </div>
                        {errors && (
                          <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] px-2 bg-[#4d70b5] rounded-xl `}>
                            {errors.acceptType && (
                              <span>El tipo de archivo no está permitido</span>
                            )}
                            {errors.resolution && (
                              <span>
                                La resolución no coincide con la permitida
                              </span>
                            )}
                          </div>
                        )}
                        <div className={`absolute w-full h-full rounded-md outline-1 duration-150 outline-offset-2 outline-dashed outline-[#00000073] ${isDragging ? ' hover:bg-[#548eff44] ' : !images.length ? "bg-[#ffffff55] hover:bg-[#ffffff00] hover:outline-[#000000ee] " : "bg-[#ffffff77] hover:bg-[#ffffff77] hover:outline-[#00000073]" }`}>
                        </div>
                      </div>
                    </button>

                    <div className= "absolute -top-[74px] left-[130px] flex flex-col  " >
                      <div className="text-[13px] flex flex-col items-center justify-end  gap-0.5">
                        <button 
                          onClick={() => {
                          onImageUpdate(0)
                          }} 
                          className="flex w-[100px] bg-[#548effdd] text-white px-3 py-0.5 cursor-pointer rounded-[4px] duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                          disabled= {!file}
                        >
                          Cambiar <IconCamara className='w-[14px] absolute top-[5px] left-[74px] ' color="#ffffff" />
                        </button>
                      </div> 
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

          {/* subir img  */}
          <form onSubmit={ uploadToServer }
            className="-ml-0.5 w-[calc(100%_+_4px)] flex justify-between items-center" >
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false)
                wait().then(() => {
                  setImages([])
                })
              }}
              className="h-[30px] w-[74px] opacity-70 bg-[#ff0000] text-[#ffffff] bottom-3 text-[13px]  duration-150 px-2 rounded-md hover:opacity-100 active:opacity-70 "
            >
              Cancelar
            </button>

            <ButtonA
              className={`${ spin  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#28395a] "}  relative overflow-hidden  h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:hover:opacity-60`}
              type="submit"
              disabled={!images.length }
              onClick={() => {
                setSpin(true);
              }}
            >
              Guardar cambio
            </ButtonA>
          </form>
        </div>

        {/*Form update imagen user */}
        <form action={formAction}>
          <div className="flex justify-center gap-3 ml-2 ">
            <input
              type="hidden"
              name="image"
              value= { imageUrl ? imageUrl :  "" }
              readOnly
            />
            <input type="hidden" name="pathname" value={pathname} />
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

