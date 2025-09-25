'use client';

import { useActionState } from 'react';
import { FormEvent, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
// import { redirect, revalidatePath } from 'next/navigation';
// import { useRouter } from 'next/router';



import { User } from '@/app/lib/definitions';
import { updateUserImage, StateUserImage, updateCommentAvatarMenu, StateUpdateCommentAvatarMenu } from '@/app/lib/actions';
import useToggleState from '@/app/lib/hooks/use-toggle-state';
import ImageUploading from "@/app/ui/consultas/ImageUploading"
import { ImageListType} from '@/app/ui/consultas/typings';
import IconDragDrop from '@/app/ui/logosIconos/icon-drag-drop';
import { ButtonA } from "@/app/ui/button";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import IconCamara from './logosIconos/icon-camara';
import { isArgumentsObject } from 'util/types';
import { useSearchParams, usePathname } from 'next/navigation';


const wait = () => new Promise((resolve) => setTimeout(resolve, 2000));


export default function EditProfileImage( { user }: { user: User | undefined } ) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  // const callbackUrl = searchParams.get('callbackUrl') || '/';
  const callbackUrl = pathname

  const [images, setImages] = useState<ImageListType>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imgVisitor, setImgVisitor] = useState<string | null>(null);
  // const [imgVisitorx, setImgVisitorx] = useState<string | null>(null);
  const [imgUrlSession, setImgUrlSession] = useState("");
  const [imgUrlSessionx, setImgUrlSessionx] = useState("");

  const [nameVisitor, setNameVisitor] = useState<string | null>(null);
  
  const [spin, setSpin] = useState(false);
  const [successState, setSuccessState] = useState(false);
  
  const { state, close, toggle } = useToggleState();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);


  const maxNumber = 1;

  // const id= "imgUrlSession"
  const id= user?.image ? user.image : imgUrlSession /* ? imgUrlSessionx : imgUrlSession */

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
  const buttonRefx = useRef<HTMLButtonElement>(null);
  const handleClickButtonx= () => {
    if (buttonRefx.current) buttonRefx.current.click()
  };

  const actualizarImageUser= () => {
     
    setTimeout(() => handleClickButtonx(), 200)
    user && setTimeout(() => handleClickButton(), 200)
    // /* user ? *//*  setTimeout(() => handleClickButton(), 200) : */ setTimeout(() => handleClickButtonx(), 200)
    
    //updated img user
     //updated img user
    // setTimeout(() => setImages([]), 200)
    setTimeout(() => setSpin(false), 2000)
    // setSpin(false)
    setTimeout(() => location.reload(), 2000)
    // location.reload()
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

      console.log('1111111111111');

      if (response.ok) {
        console.log('Ok imagen subida');
      }

      actualizarImageUser();

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
      /* !user?.image && */ sessionStorage.setItem('imgVisitor', base64);
    };
    reader.readAsDataURL(files[0]);
    // actualizarComment();
    // setSpin(false)
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
    // sessionStorage.getItem('imgUrlSessionx') && setImgUrlSessionx(`${sessionStorage.getItem('imgUrlSessionx')}`)


    sessionStorage.getItem('imgUrlSession') && setImgUrlSession(`${sessionStorage.getItem('imgUrlSession')}`)
    // sessionStorage.getItem('imgUrlSessionx') ? setImgUrlSession(`${sessionStorage.getItem('imgUrlSessionx')}`) : sessionStorage.getItem('imgUrlSession') && setImgUrlSession(`${sessionStorage.getItem('imgUrlSession')}`)



    sessionStorage.getItem('imgVisitor') && setImgVisitor(`${sessionStorage.getItem('imgVisitor')}`) /* : setImgVisitor(`${sessionStorage.getItem('imgVisitor')}`)  */

    sessionStorage.getItem('imgUrlSessionx') && setImgUrlSessionx(`${sessionStorage.getItem('imgUrlSessionx')}`)
    // sessionStorage.getItem('imgVisitorx') && setImgVisitorx(`${sessionStorage.getItem('imgVisitorx')}`) 
    sessionStorage.getItem('nameVisitor') && setNameVisitor(`${sessionStorage.getItem('nameVisitor')}`) 
    if (successState) {
      close();
    }

    // setImages([])
  }, [successState, close ]);

  const onChange = (imageList: ImageListType, addUpdateIndex: Array<number> | undefined) => {
    setImages(imageList);
    // handleFileChange
  };
  // const onChange = () => {
  //   handleFileChange
  // };
  
  const initialState: StateUserImage = { message: null, errors: {} };
  const updateUserImageWithId = updateUserImage.bind(null, `${user?.id}`);
  const [estado, formAction, isPending] = useActionState(updateUserImageWithId, initialState);

  const initialStatex: StateUpdateCommentAvatarMenu= { message: null, errors: {} };
  const updateCommentAvatarMenuWithId = updateCommentAvatarMenu.bind(null, id );
  const [estadox, formActionx, isPendingx] = useActionState(updateCommentAvatarMenuWithId, initialStatex);


  // console.log("callbackUrl: ", callbackUrl);
  
  // console.log("imageUrl: ",imageUrl );
  // console.log("imgUrlSession: ", imgUrlSession);

  // console.log("imageUrlSessionx  :", imgUrlSessionx);


  return (
    <>
      <div className="text-small-regular p-2 pb-3 ">
        <div className="mx-12 mt-2 flex items-center justify-between">
          {  file ? (
            <img 
              src={URL.createObjectURL(file!)} 
              alt="Imagen de usuario"
              className="object-cover h-16 w-16 rounded-full bg-cover [box-shadow:0_1px_#ffffff,_0_-1px_#0000002e] "
              width={80}
              height={80} />
          ) : user?.image  ? (
            <Image 
              src= { user.image }
              alt="imagen de perfil"
              className="h-16 w-16 rounded-full "
              width={80}
              height={80}>
            </Image>
          ) :  imgVisitor ? (
            <Image 
              src= { imgVisitor! }
              alt="imagen de perfil"
              className="h-16 w-16 rounded-full "
              width={80}
              height={80}>
            </Image>
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#39507f22] text-2xl text-[#39507f99] ">
              {nameVisitor ? nameVisitor.substring(0, 1).toUpperCase() : 
              <IconCuenta className="w-7 sm:w-10" color='#39507f66' />}
            </span>
          )}
        </div> 





        <div className={`flex flex-col gap-5 pt-4 delay-200 `}>
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
                      className={`text-[#020b1dcc] group w-full disabled:!cursor-default ${isDragging && 'hover:bg-[#548eff55] '} `}
                      disabled= {imageList.length == maxNumber}
                    >
                      <div className={`relative label-dnd w-full duration-150 text-sm flex flex-col justify-center items-center `}>

                        {errors ? (
                          <div className={`w-max mb-1 mt-4 mx-auto text-[12.5px] border border-[#ffffff1e] tracking-wide text-[#ffffffee] leading-[1.5] py-0.5 px-2 bg-[#365491] rounded-xl `}>
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
                          <div 
                            className={`w-full rounded-t-lg py-1 px-2 flex items-center justify-evenly duration-150  ${imageList.length == maxNumber ? "opacity-50 group-hover:opacity-50" : "opacity-80 group-hover:opacity-100"} `}>
                            <IconDragDrop color="#39507fcc" className= "w-6 opacity-80 rotate-45 " />
                            <p className={`text-[12.5px] tracking-wide leading-[1.5] py-0.5 px-2 `}>Seleccioná una IMAGEN</p>
                          </div>
                        )}

                        <div 
                          className={` duration-150 ${imageList.length == maxNumber ? "opacity-50 group-hover:opacity-50" : "opacity-80 group-hover:opacity-100"} `} >
                          <p className={`text-[13px] p-2 `}>Click y elegí un archivo o arrastralo y sueltá aquí</p>
                        </div>
                        
                        <div 
                          className={`absolute w-full h-full bg-[#548eff11] border border-[#39507f06] rounded-md outline-1 outline-dashed outline-[#0000009e] ${imageList.length == maxNumber ? "outline-[#0000005e] hover:bg-[#548eff11] active:opacity-100 " : "hover:outline-[#000000]  hover:bg-[#548eff1c]"} active:opacity-50 `}
                          >
                        </div>
                      </div>
                    </button>

                    <div className= "absolute -top-[58px] left-[136px] flex flex-col  " >
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
                        {/* <button 
                          onClick={() => {
                          onImageRemove(0)
                          }} 
                          className="flex w-[100px] bg-[#548effdd] text-white px-3 py-0.5 cursor-pointer rounded-[4px] duration-200 opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40 disabled:cursor-default"
                          disabled= {!file}
                          >
                          Eliminar <IconCamara className='w-[14px] absolute top-[31px] left-[74px] ' color="#ffffff" />
                        </button> */}
                      </div> 
                    </div>
                  </div>
                )}
              </ImageUploading>
            </div>
          </div>

          {/* subir img  */}
          <form onSubmit={ /* user ? */ uploadToServer   /* : uploadToServer  */ }
            className="-ml-0.5 w-[calc(100%_+_4px)] flex justify-end items-center" >

            <ButtonA
              className={`${ spin  && "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent bg-[#28395a] "}  relative overflow-hidden  h-[30px] text-[13px] w-[200px] bg-[#39507f] !rounded-md disabled:opacity-50 `}
              type="submit"
              // disabled={!file && true }
              disabled={!images.length }
              onClick={() => {
                setSpin(true);
                // !user?.image && sessionStorage.setItem("imgUrlSession", imageUrl)
                // handleFileChange
                // location.reload()
                console.log('2222222222222');
                // wait().then(() =>{ 
                //   sessionStorage.setItem("imgUrlSession", imageUrl )
                  
                //   location.reload()
                // });
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
              id="image"
              name="image"
              // value= {imageUrl ? imageUrl : "" }
              value= { imageUrl ? imageUrl :  "" }
              readOnly
            />
            <input type="hidden" name="redirectTo" value={callbackUrl} />
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

        {/*Form update avatar comment */}
        <form action={formActionx}>
          {/* <div></div> */}
            <input
              type="hidden"
              id="avatar"
              name="avatar"
              // value= {imageUrl ? imageUrl :  "" }
              value= { /* user?.image ? user.image : */ imageUrl ? imageUrl :  "" }
              readOnly
            />
            <input type="hidden" name="post_slug" value={callbackUrl} />
            <div>
              <button
                type="submit"
                ref={buttonRefx}
                className='hidden'
              >
                Actualizar avatar
              </button>
            </div>
          
        </form>
        
      </div>
    </>
  );
}
