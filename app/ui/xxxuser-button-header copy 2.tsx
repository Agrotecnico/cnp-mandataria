'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/app/ui/uiRadix/dropdown-menu';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
// import { PowerIcon } from '@heroicons/react/24/outline';
import {
  AtSymbolIcon,
  UserIcon,
  CameraIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import { Button } from '@/app/ui/uiRadix/button';
import { User } from '@/app/lib/definitions';
import Image from 'next/image'
import EditProfileImage from '@/app/ui/edit-profile-image';
import EditProfileName from '@/app/ui/edit-profile-name';
import EditProfileEmail from '@/app/ui/edit-profile-email';
import IconMapaSitio from './logosIconos/icon-mapa-sitio';
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import IconConsulta from './logosIconos/icon-consulta';
import IconPresupuesto from './logosIconos/icon-presupuesto';


export default function UserButtonHeader( { user }: { user: User | undefined } ) {

  // const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imgUserSession, setImgUserSession ] = useState<string | null>(null)
  const [nombre, setNombre ] = useState<string | null>(null)
  const [imgVisitor, setImgVisitor ] = useState<string | null>(null)

  const pathname = usePathname();

  useEffect(() => {
    // const storedImage = sessionStorage.getItem('imgVisitor');
    // if (storedImage) {
    //   setImageSrc(storedImage);
    // }

    const data= sessionStorage.getItem('imgUrlSession')
    setImgUserSession(data)

    const data2= sessionStorage.getItem('imgVisitor')
    setImgVisitor(data2)

    const data3= sessionStorage.getItem('nombre')
    setNombre(data3)
  }, []);


  return (
    <div className='flex items-center justify-end space-x-4'>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger >
            <div className='relative flex items-center justify-center '>
              {user.image ? (
                <Image 
                  src= { user.image }
                  alt="imagen de perfil"
                  className="h-10 w-10 rounded-full "
                  width={40}
                  height={40}>
                </Image>
              ) : !user?.image && (
                <span className="flex text-lg h-10 w-10 items-center justify-center rounded-full bg-[#eee] text-[#374151] sm:text-xl ">
                  {user?.name?.substring(0, 1).toUpperCase()}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="mt-1.5 bg-white w-[300px] !p-2 rounded-md shadow-xl shadow-[#30032222] sm:mt-3"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <h2 className="text-sm text-center font-medium leading-none text-[#374151] ">
                  Editar perfil User
                </h2>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />
            
            {/* Editar imagen */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative justify-start gap-4 h-8 w-full !font-normal text-start rounded-full px-0"
                >
                  <div className="flex items-center gap-0 rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    <CameraIcon className="w-5 text-[#39507f]" />
                    {user.image ? (
                      <div className="w-full px-2 py-1">Cambiar <span className='text-[13px] font-medium text-[#39507f]'>IMAGEN</span></div>
                      ) : (
                        <div className="w-full px-2 py-1">Cargar <span className='text-[13px] font-medium text-[#39507f]'>IMAGEN</span></div>
                      )}
                    </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[90px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Editar nombre */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative justify-start gap-4 h-8 w-full !font-normal text-start rounded-full px-0"
                >
                  <div className="flex items-center gap-0 rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    <UserIcon className="w-5 text-[#39507f]" />
                    {user ? (
                      <div className="w-full px-2 py-1">Actualizar <span className='text-[13px] font-medium text-[#39507f]'>NOMBRE</span></div>
                      ) : (
                        <div className="w-full px-2 py-1">Cargar <span className='text-[13px] font-medium text-[#39507f]'>NOMBRE</span></div>
                      )}
                    </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[122px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Editar email */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative justify-start gap-4 h-8 w-full !font-normal text-start rounded-full px-0"
                >
                  <div className="flex items-center gap-0 rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    <AtSymbolIcon className="w-5 text-[#39507f]" />
                    {user ? (
                      <div className="w-full px-2 py-1">Actualizar <span className='text-[13px] font-medium text-[#39507f]'>EMAIL</span></div>
                      ) : (
                        <div className="w-full px-2 py-1">Verificar <span className='text-[13px] font-medium text-[#39507f]'>EMAIL</span></div>
                      )}
                    </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[154px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

            {/* Editar dirección */}
            <DropdownMenu>
                <Button
                  variant="ghost"
                  className="relative gap-4 h-8 w-full cursor-default !font-normal text-start rounded-full px-0 opacity-50"
                >
                  <div className="w-full px-2 py-1 rounded-md text-[#374151] ">Actualizar <span  className='text-[13px] font-medium text-[#39507f]'>DIRECCIÓN ENVIO</span></div>
                </Button>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[193px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Editar Información personal */}
            <DropdownMenu>
                <Button
                  variant="ghost"
                  className="relative gap-4 h-8 w-full cursor-default !font-normal text-start rounded-full px-0 opacity-50"
                >
                  <div className="w-full px-2 py-1 rounded-md text-[#374151] ">Cargar <span  className='text-[13px] font-medium text-[#39507f]'>INFORMACIÓN PERSONAL</span></div>
                </Button>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[193px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant={'ghost'}
              className="!justify-start mt-3 file:ml-auto h-auto w-full bg-[#3741511c] text-[#374151] opacity-[0.80] hover:opacity-100 active:opacity-70"
              onClick={async () => {
                // await signOut({ callbackUrl: '/' });
              }}
            >
              <DropdownMenuItem>
                {/* <PowerIcon className="w-5 mr-4 text-red-500"/> */}
                {/* <p>Salir</p> */}
              </DropdownMenuItem>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger >
            <div className={`relative items-center justify-center ${nombre ? "flex" : "hidden" }`} >
                {imgUserSession ? (
                <>
                  <Image 
                    src= { imgUserSession! ? imgUserSession : imgVisitor! }
                    alt="imagen de perfil"
                    className="h-10 w-10 rounded-full "
                    width={40}
                    height={40}>
                  </Image>
                </>
              ) : (
                <span className="flex text-lg h-9 w-9 items-center opacity-80 duration-150 justify-center rounded-full bg-[#ffffffdd] text-[#374151] sm:text-xl hover:opacity-95 active:opacity-70 ">
                  {nombre?.substring(0, 1).toUpperCase()}
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
          <div className={`items-center justify-center w-10 h-10 bg-[#ffffff00] rounded-full opacity-30  ${ nombre ? "hidden" : "flex" } `}>
            <IconCuenta className="w-7 sm:w-8" color='#ffffffdd' />
          </div>

          <DropdownMenuContent
            className="relative left-6 mt-1.5 bg-white w-[300px] !p-2 rounded-md shadow-xl shadow-[#30032222] sm:mt-3"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <h2 className="text-sm text-center font-medium leading-none text-[#374151] ">
                  Editar perfil Visit
                </h2>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />
            
            {/* Editar imagen */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative justify-start gap-4 h-8 w-full !font-normal text-start rounded-full px-0"
                >
                  <div className="flex items-center gap-0 rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    <CameraIcon className="w-5 text-[#39507f]" />
                    <div className="w-full px-2 py-1">{imgUserSession ? "Actualizar" : "Cargar"} <span className='text-[13px] font-medium text-[#39507f]'>IMAGEN</span></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[90px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Editar nombre */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative justify-start gap-4 h-8 w-full !font-normal text-start rounded-full px-0"
                >
                  <div className="flex items-center gap-0 rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    <UserIcon className="w-5 text-[#39507f]" />
                    {/* {user ? ( */}
                      <div className="w-full px-2 py-1">Actualizar <span className='text-[13px] font-medium text-[#39507f]'>NOMBRE</span></div>
                      {/* ) : (
                        <div className="w-full px-2 py-1">Cargar <span className='text-[13px] font-medium text-[#39507f]'>NOMBRE</span></div>
                      )} */}
                    </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[122px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileName user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Editar email */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="group relative justify-start gap-4 h-8 w-full !font-normal text-start rounded-full px-0"
                >
                  <div className="flex items-center gap-0 rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    <AtSymbolIcon className="w-5 text-[#39507f]" />
                    {user ? (
                      <div className="w-full px-2 py-1">Actualizar <span className='text-[13px] font-medium text-[#39507f]'>EMAIL</span></div>
                      ) : (
                        <div className="w-full px-2 py-1">Verificar <span className='text-[13px] font-medium text-[#39507f]'>EMAIL</span></div>
                      )}
                    </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[154px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileEmail user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

            {/* Editar dirección */}
            <DropdownMenu>
                <Button
                  variant="ghost"
                  className="relative gap-4 h-8 w-full cursor-default !font-normal text-start rounded-full px-0 opacity-50"
                >
                  <div className="w-full px-2 py-1 rounded-md text-[#374151] ">Actualizar <span  className='text-[13px] font-medium text-[#39507f]'>DIRECCIÓN ENVIO</span></div>
                </Button>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[193px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Editar Info personal */}
            <DropdownMenu>
                <Button
                  variant="ghost"
                  className="relative gap-4 h-8 w-full cursor-default !font-normal text-start rounded-full px-0 opacity-50"
                >
                  <div className="w-full px-2 py-1 rounded-md text-[#374151] ">Cargar <span  className='text-[13px] font-medium text-[#39507f]'>INFORMACIÓN PERSONAL</span></div>
                </Button>

              <DropdownMenuContent
                className="relative mt-3 bg-white left-2 -top-[193px] w-[300px] rounded-md shadow-xl shadow-[#30032222]"
                align="end"
                forceMount
              >
                <EditProfileImage user={user} />
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              variant={'ghost'}
              className="!justify-start mt-3 file:ml-auto h-auto w-full bg-[#3741511c] text-[#374151] opacity-[0.80] hover:opacity-100 active:opacity-70"
              onClick={async () => {
                // await signOut({ callbackUrl: '/' });
              }}
            >
              <DropdownMenuItem>
              </DropdownMenuItem>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center justify-center w-10 h-10 rounded-full opacity-60 cursor-pointer duration-150 hover:opacity-85 active:bg-opacity-70'>
            <IconMapaSitio size={26} color="#ffffff" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="mt-1.5 bg-white w-[300px] !p-2 rounded-md shadow-xl shadow-[#30032222] sm:mt-3"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-[#374151] ">
                {user?.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none text-[#64748b]">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

           {pathname == '/' ? (
            <Link
              href={'#'}
            >
              <div className="cursor-default relative justify-start text-sm gap-4 h-8 w-full !font-normal text-start rounded-md px-0" >
                <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-70 text-[#374151] ">
                  <div className="w-full px-2 py-1"><span className='font-semibold  text-[13px] text-[#39507f]'>CNP </span>mandataria</div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/'}
            >
              <DropdownMenuItem>
                <div className="cursor-pointer justify-start text-sm gap-4 h-8 w-full !font-normal text-start rounded-md px-0 hover:bg-[#37415111]" >
                  <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-80 text-[#374151]   group-hover:opacity-100">
                    <div className="w-full px-2 py-1"><span className='font-semibold text-[13px] text-[#39507f]'>CNP </span>mandataria</div>
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/faq') ? (
            <Link
              href={'#'}
            >
              <div className="cursor-default relative justify-start text-sm gap-4 h-8 w-full !font-normal text-start px-0" >
                <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-70 text-[#374151] ">
                  <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold text-[#39507f]'>CONSULTAS </span>Frecuentes</div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/faq/compra-venta-vehiculo'}
            >
              <DropdownMenuItem>
                <div className="cursor-pointer justify-start text-sm gap-4 h-8 w-full !font-normal text-start rounded-md px-0 hover:bg-[#37415111]" >
                  <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-80 text-[#374151]   group-hover:opacity-100">
                    <div className="w-full px-2 py-1"> <span className='font-semibold  text-[13px] text-[#39507f]'>CONSULTAS </span>Frecuentes</div>
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/dashboard') ? (
            <Link
              href={'#'}
            >
              <div className="group relative cursor-default justify-start text-sm gap-4 w-full !font-normal text-start rounded-full px-0" >
                <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-70 text-[#374151] ">
                  {user?.role === "admin" ? (
                    <div className="w-full  text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>ADMIN </span>Panel</div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/dashboard'}
            >
              <DropdownMenuItem>
                <div className="group relative cursor-pointer justify-start text-sm gap-4 w-full !font-normal text-start rounded-full px-0" >
                  <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-80 text-[#374151]  group-hover:bg-[#37415111] group-hover:opacity-100">
                    {user?.role === "admin" ? (
                      <div className="w-full px-2 py-1"><span className='font-semibold  text-[13px] h-8 text-[#39507f]'>ADMIN </span>Panel</div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          {pathname == '/realizar-consulta' || pathname.startsWith('/dashboard/consultas') ? (
            <Link
              href={'#'}
            >
              <div className="group relative cursor-default flex items-center justify-between gap-2 pr-4 text-sm h-8 w-full !font-normal text-start opacity-70 rounded-full px-0" >
                <div className=" w-max rounded-md ml-2 text-[#374151] ">
                  {user?.role === "admin" ? (
                    <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Consultas</span></div>
                  ) : (
                    <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Realizá</span>la consulta</div>
                  )}
                </div>
                <IconConsulta color="#ffffff" color2="#fff0" className="w-[16px] text-[#39507faa] rounded-[3px] bg-[#548eff]" />
              </div>
            </Link>
          ) : (
            <Link
              href={user?.role === "admin" ? '/dashboard/consultas' : '/realizar-consulta'}
              className=""
            >
              <DropdownMenuItem>
                <div className="group relative cursor-pointer flex items-center justify-between gap-2 ml-2 pr-4 text-sm h-8 w-full !font-normal text-start rounded-md px-0 hover:bg-[#37415111]" >
                  <div className="w-max rounded-md opacity-80 text-[#374151] group-hover:opacity-100">
                    {user?.role === "admin" ? (
                      <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Consultas</span></div>
                    ) : (
                      <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Realizá </span>la consulta</div>
                    )}
                  </div>
                  <IconConsulta color="#ffffff"  color2="#fff0" className="w-[16px] text-[#39507faa] rounded-[3px] bg-[#548eff]" />
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/iniciar-tramite') || pathname.startsWith('/dashboard/tramites') ? (
            <Link
              href={'#'}
            >
              <div className="group relative cursor-default flex items-center justify-between pr-4 text-sm h-8 w-full !font-normal text-start opacity-70 rounded-full px-0" >
                <div className="w-max rounded-md px-2 text-[#374151] ">
                  {user?.role === "admin" ? (
                    <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Trámites</span></div>
                  ) : (
                    <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Pedí </span>el presupuesto</div>
                  )}
                </div>
                <IconPresupuesto color="#ffffff" color2="#fff0" className="w-[16px] text-[#39507faa] rounded-[3px] bg-[#548eff]" />
              </div>
            </Link>
          ) : (
            <Link
              href={user?.role === "admin" ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'}
              className=""
            >
              <DropdownMenuItem>
                <div className=" relative cursor-pointer rounded-md flex items-center justify-between pr-4 text-sm h-8 w-full !font-normal text-start px-0 hover:bg-[#37415111]" >
                  <div className=" w-max px-2 opacity-80 text-[#374151] group-hover:opacity-100">
                    
                    {user?.role === "admin" ? (
                      <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Trámites</span></div>
                    ) : (
                      <div className="w-full px-2 py-1"><span className='font-semibold text-[#39507f]'>Pedí </span>el presupuesto</div>
                    )}
                    
                  </div>
                  <IconPresupuesto color="#ffffff" color2="#fff0" className="w-[16px] text-[#39507faa] rounded-[3px] bg-[#548eff]" />
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          <Button
            variant={'ghost'}
            className="!justify-start mt-3 file:ml-auto h-auto w-full bg-[#3741511c] text-[#374151] opacity-80 hover:opacity-100 active:opacity-70 disabled:opacity-40"
            onClick={async () => {
              await signOut({ callbackUrl: '/' });
              sessionStorage.clear()
            }}
            disabled={!user}
          >
            <DropdownMenuItem>
              <PowerIcon className="w-5 mr-4 text-red-500"/>
              <p>Salir</p>
            </DropdownMenuItem>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
