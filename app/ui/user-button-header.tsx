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
import { usePathname, useRouter } from 'next/navigation';
import {
  AtSymbolIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState, useRef, useActionState } from 'react';
import Image from 'next/image'

import { Button } from '@/app/ui/uiRadix/button';
import { User } from '@/app/lib/definitions';
import EditProfileImage from '@/app/ui/edit-profile-image';
import EditProfileName from '@/app/ui/edit-profile-name';
import EditProfileEmail from '@/app/ui/edit-profile-email';
import IconMapaSitio from './logosIconos/icon-mapa-sitio';
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import IconConsulta from './logosIconos/icon-consulta';
import IconPresupuesto from './logosIconos/icon-presupuesto';
import IconCamara from './logosIconos/icon-camara';
import IconEmail2 from './logosIconos/icon-email2';
import IconComment from './logosIconos/icon-comment';
import { createAccountOpen, StateAccountOpen } from '@/app/lib/actions';


export default function UserButtonHeader( { user }: { user: User | undefined } ) {

  const [imgVisitor, setImgVisitor ] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const pathname = usePathname();

  const router = useRouter()

  const buttonRef = useRef<HTMLButtonElement>(null); // update estado account
  const handleClickButton= () => {
    if (buttonRef.current) buttonRef.current.click()
  };

  const initialState: StateAccountOpen = { message: null, errors: {} };
  const createAccountOpenWithId = createAccountOpen.bind(null, `${user?.email}`);
  const [state, formAccountOpen, isPending] = useActionState(createAccountOpenWithId, initialState);

  useEffect(() => {
    sessionStorage.getItem('imgVisitor') && setImgVisitor(`${sessionStorage.getItem('imgVisitor')}`) 
  }, []);

  const isEmailVisitor= user?.email.slice(16) === "@cnpmandataria.com"

  console.log("state:", state)
  

  return (
    <div className='flex items-center justify-end gap-4 '>
      <DropdownMenu>
        <div className={`relative items-center justify-center ${user ? "flex" : "hidden" }`} >
          <DropdownMenuTrigger >
            <div className={`relative flex items-end justify-center gap-2`} >
              {user?.image ? (
                <Image 
                  src= { user.image }
                  alt="imagen de perfil"
                  className="h-8 w-8 rounded-full "
                  width={40}
                  height={40}>
                </Image>
              ) : imgVisitor ? (
                <Image 
                  src= { imgVisitor }
                  alt="imagen de perfil"
                  className="h-8 w-8 rounded-full "
                  width={40}
                  height={40}>
                </Image>
              ) : (
                <span className="flex text-base h-7 w-7 items-center opacity-80 duration-150 justify-center rounded-full bg-[#ffffffdd] text-[#374151] sm:text-lg hover:opacity-95 active:opacity-70 ">
                  { user?.name.substring(0, 1).toUpperCase()  }
                </span>
              )}
            </div>
          </DropdownMenuTrigger>
        </div>

        <Link href={'/login'} className={`${ user && "hidden" }`} >
          <div className={`flex items-center justify-center w-9 h-9 rounded-full opacity-60  hover:opacity-75 active:bg-opacity-60 cursor-pointer`}>
            <IconCuenta className="w-6 sm:w-7" color='#ffffffdd' />
          </div>
        </Link>

        <DropdownMenuContent
          className="relative -mr-8 mt-1.5 bg-white w-[300px] !p-2 rounded-md shadow-xl shadow-[#30032222] sm:mt-3"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-[#374151] ">
                {user?.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none text-[#64748b]">
                {!isEmailVisitor && user?.email}
              </p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          <Button
            variant={'ghost'}
            className="!p-0 !justify-start !rounded-[4px] file:ml-auto h-auto w-full text-[#020b1d99] opacity-90 hover:opacity-100 active:opacity-70 disabled:opacity-40 hover:bg-[#547eff16] hover:text-[#020b1dc1]"
            onClick={ () => {
              setIsModalOpen(true)
            }}
            >
            <DropdownMenuItem className='w-full px-4 py-1 cursor-pointer'>
              <IconCamara className="w-4 mr-2" color='#548effdd' />
              <p>{user?.image ? "Cambiar" : "Cargar"} imagen</p>
            </DropdownMenuItem>
          </Button>

          <Button
            variant={'ghost'}
            className="!p-0 !justify-start !rounded-[4px] file:ml-auto h-auto w-full text-[#020b1d99] opacity-90 hover:opacity-100 active:opacity-70 disabled:opacity-40 hover:bg-[#547eff16] hover:text-[#020b1dc1]"
            onClick={ () => {
              setIsModalOpen2(true)
            }}
            >
            <DropdownMenuItem className='w-full px-4 py-1 cursor-pointer'>
              <IconCuenta className="w-4 mr-2 " color="#548effdd" />
              <p>Actualizar nombre</p>
            </DropdownMenuItem>
          </Button>

          <Button
            variant={'ghost'}
            className={`group !p-0 !justify-start rounded-[4px] file:ml-auto h-auto w-full text-[#020b1d99]`}
            onClick={ () => {
              !isEmailVisitor && setIsModalOpen3(true)
            }}
            >
            {!isEmailVisitor  ? (
              <DropdownMenuItem className={`w-full px-4 py-1 cursor-pointer opacity-90 hover:opacity-100 hover:bg-[#548eff16] group-hover:text-[#020b1dc1] active:opacity-70`}>
                <IconEmail2 className="w-4 mr-2" color='#548effdd' />
                <p>Actualizar e-mail</p>
              </DropdownMenuItem>
            ) : (
              <div className='flex items-center cursor-default w-full px-4 py-1 opacity-45  hover:bg-[#548eff26] group-active:!opacity-65'>
                <AtSymbolIcon className="w-4 mr-2 text-[#39507f]" />
                <p className=''>Cargar e-mail</p>
              </div>
            )}
          </Button>

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          <Button
            variant={'ghost'}
            className="!p-0 !justify-start cursor-default file:ml-auto h-auto w-full  text-[#374151] active:!opacity-100"
            onClick={ () => {
            }}
            >
            <DropdownMenuItem className=''>
            </DropdownMenuItem>
            <div className='w-full px-4 py-1 opacity-40 hover:bg-[#547eff26]'>
              <p className="w-full pr-2 text-start cursor-default py-0 rounded-md text-[#374151] ">Actualizar <span  className='text-[13px] font-medium text-[#39507f]'>DIRECCIÓN ENVIO</span></p>
            </div>
          </Button>

          <Button
            variant={'ghost'}
            className="!p-0 !justify-start cursor-default file:ml-auto h-auto w-full  text-[#374151] active:!opacity-100"
            onClick={ () => {
            }}
            >
            <DropdownMenuItem className=''>
            </DropdownMenuItem>
            <div className='w-full px-4 py-1 opacity-40 hover:bg-[#547eff26]'>
              <p className="w-full pr-2 text-start py-0 rounded-md text-[#374151] ">Cargar <span  className='text-[13px] font-medium text-[#39507f]'>INFORMACIÓN PERSONAL</span></p>
            </div>
          </Button>

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          <DropdownMenuItem>
            <Button
              variant={'ghost'}
              className="mt-1 !px-4 !py-1 !justify-start !rounded-[4px] file:ml-auto h-auto w-full text-[#020b1d99] opacity-90 hover:opacity-100 active:opacity-70 disabled:opacity-40 hover:bg-[#547eff16] hover:text-[#020b1dc1]"
              onClick={ () => {
                handleClickButton()
                setTimeout(() => signOut({ redirectTo: "/" }), 1000) 
              }}
              disabled={!user}
            >
              <PowerIcon className="w-[18px] mr-4 text-[#548eff] stroke-[3]"/>
              <p>Salir</p>
              
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center justify-center w-9 h-9 rounded-full opacity-60 cursor-pointer duration-150 hover:opacity-75 active:bg-opacity-60'>
            <IconMapaSitio size={24} color="#ffffff" />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="relative mt-1.5 bg-white w-[300px] !p-2 rounded-md shadow-xl shadow-[#30032222] sm:mt-3"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal p-3">
            <div className="flex flex-col justify-center items-center leading-[1.1rem] text-[13px] text-[#39507f]  max-w-[1100px] mx-auto">
              <div className="flex items-center">
                <span className="font-semibold">C</span><div className="opacity-80 mr-1 flex h-full items-center">arina</div>
                <span className="font-semibold">N</span><div className="opacity-80 mr-1 flex h-full items-center">oemí</div>
                <span className="font-semibold">P</span><div className="opacity-80 mr-1 flex h-full items-center">acheco</div>
              </div>
              <div className="text-[#39507faa] ">cnp.mandataria@gmail.com</div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          {pathname == '/' ? (
            <Link
              href={'#'}
            >
              <div className="cursor-default relative flex justify-start text-sm gap-4 h-8 w-full !font-normal text-start rounded-md px-0 opacity-50 hover:bg-[#548eff26]" >
                <div className="flex items-center gap-0 w-max rounded-md px-2 text-[#374151] ">
                  <div className="w-full px-2 py-1"><span className='font-semibold  text-[13px] text-[#39507f]'>CNP </span>mandataria</div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/'}
            >
              <DropdownMenuItem>
                <div className="group cursor-pointer flex justify-start text-sm gap-4 h-8 w-full !font-normal text-start rounded-[4px] px-0 hover:bg-[#548eff16] active:opacity-70" >
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
              <div className="cursor-default relative flex justify-start text-sm gap-4 h-8 w-full !font-normal text-start px-0 opacity-50 hover:bg-[#548eff26]" >
                <div className="flex items-center gap-0 w-max rounded-md px-2 text-[#374151] ">
                  <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold text-[#39507f]'>CONSULTAS </span>Frecuentes</div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/faq/compra-venta-vehiculo'}
            >
              <DropdownMenuItem>
                <div className="group cursor-pointer flex justify-start text-sm gap-4 h-8 w-full !font-normal text-start rounded-[4px] px-0 hover:bg-[#548eff16] active:opacity-70" >
                  <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-80 text-[#374151] group-hover:opacity-100">
                    <div className="w-full px-2 py-1"> <span className='font-semibold  text-[13px] text-[#39507f]'>CONSULTAS </span>Frecuentes</div>
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/dashboard') || !user || user.role === 'visitor' || user.role === "member" ? (
            <Link
              href={'#'}
            >
              <div className="cursor-default relative flex justify-start text-sm gap-4 w-full !font-normal text-start px-0 opacity-50 hover:bg-[#548eff26]" >
                <div className="flex items-center gap-0 w-max rounded-md px-2 text-[#374151] ">
                  { user?.role === "admin" ? (
                    <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>ADMIN </span>Panel</div>
                  ) : user?.role === "memberAccount" && user?.account === "abierto" ? (
                    <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>CUENTA </span>Panel</div>
                  ) : (
                    <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>INFO </span>Panel</div>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/dashboard'}
            >
              <DropdownMenuItem>
                <div className="cursor-pointer flex justify-start text-sm gap-4 w-full !font-normal text-start rounded-[4px] px-0 hover:bg-[#548eff16] active:opacity-70" >
                  <div className="flex items-center gap-0 w-max rounded-md px-2 opacity-80 text-[#374151] group-hover:opacity-100">
                    {user?.role === "admin" ? (
                      <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>ADMIN </span>Panel</div>
                    ) : (user?.role === "memberAccount" && user?.account === "abierto") ? (
                      <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>CUENTA </span>Panel</div>
                    ) : (
                      <div className="w-full text-[13px] px-2 py-1"><span className='font-semibold h-8 text-[#39507f]'>INFO </span>Panel</div>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          {pathname == '/realizar-consulta' ? (
            <Link
              href={'#'}
            >
              <div className="group relative cursor-default flex items-center gap-2 pr-4 text-sm h-8 !font-normal text-start rounded-[4px] px-0 opacity-50 hover:bg-[#548eff26]" >
                <IconConsulta className="fill-[#548effdd] rounded-full ml-4 w-[17px] text-[#39507faa] bg-[#548eff00]" />
                <div className=" w-max rounded-md text-[#374151] ">
                  {user?.role === "admin" ? (
                    <div className="w-full py-1"><span className=' text-[#39507f]'>Consultas</span></div>
                  ) : (
                    <div className="w-full py-1"><span className=' text-[#39507f]'>Realizá </span>la consulta</div>
                  )}
                </div>
                
              </div>
            </Link>
          ) : (
            <Link
              href={user?.role === "admin" ? '/dashboard/consultas' : '/realizar-consulta'}
              className=""
            >
              <DropdownMenuItem>
                <div className="group relative cursor-pointer flex items-center gap-2 pr-4 text-sm h-8 w-full !font-normal text-start rounded-[4px] px-0 hover:bg-[#548eff16] active:opacity-70" >
                  <IconConsulta className="fill-[#548effdd] rounded-full ml-4 w-[17px] text-[#39507faa]" />
                  <div className="w-max rounded-md opacity-80 text-[#374151] group-hover:opacity-100">
                    {user?.role === "admin" ? (
                      <div className="w-full py-1">
                        <span className=' text-[#39507f]'>Consultas</span></div>
                    ) : (
                      <div className="w-full py-1"><span className=' text-[#39507f]'>Realizá </span>la consulta</div>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/iniciar-tramite') ? (
            <Link
              href={'#'}
            >
              <div className=" relative cursor-default flex items-center gap-2 pr-4 text-sm h-8 !font-normal text-start rounded-[4px] px-0 opacity-50 hover:bg-[#548eff26]" >
                <IconPresupuesto className="fill-[#548effdd] ml-4 w-[17px] text-[#39507faa] rounded-[3px]" />
                <div className="w-max rounded-md text-[#374151] ">
                  {user?.role === "admin" ? (
                    <div className="w-full py-1"><span className=' text-[#39507f]'>Trámites</span></div>
                  ) : (
                    <div className="w-full py-1"><span className=' text-[#39507f]'>Pedí </span>el presupuesto</div>
                  )}
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={user?.role === "admin" ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'}
              className=""
            >
              <DropdownMenuItem>
                <div className="group relative cursor-pointer rounded-[4px] flex items-center gap-2 pr-4 text-sm h-8 w-full !font-normal text-start px-0 hover:bg-[#548eff16] active:opacity-70" >
                  <IconPresupuesto className="fill-[#548effdd] ml-4 w-[17px] text-[#39507faa] rounded-[3px]" />
                  <div className=" w-max opacity-80 text-[#374151] group-hover:opacity-100">
                    {user?.role === "admin" ? (
                      <div className="w-full py-1"><span className=' text-[#39507f]'>Trámites</span></div>
                    ) : (
                      <div className="w-full py-1"><span className=' text-[#39507f]'>Pedí </span>el presupuesto</div>
                    )}
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          {pathname == '/dashboard/comments' || !user || user.role === 'visitor' || user.role === "member" ? (
            <Link
              href={'#'}
            >
              <div className="cursor-default relative flex justify-start text-sm gap-2 h-8 w-full !font-normal text-start rounded-md px-0 opacity-50 hover:bg-[#548eff26]" >
                <IconComment className="fill-[#548effdd] ml-4 w-[17px] text-[#39507faa] rounded-[3px]" />
                <div className="flex items-center w-max rounded-md text-[#374151] ">
                  <div className="w-full py-1">Ver <span className='font-semibold text-[13px] text-[#39507f]'>COMENTARIOS </span></div>
                </div>
              </div>
            </Link>
          ) : (
            <Link
              href={'/dashboard'}
            >
              <DropdownMenuItem>
                <div className="group cursor-pointer flex justify-start text-sm gap-2 h-8 w-full !font-normal text-start rounded-[4px] px-0 hover:bg-[#548eff16]" >
                  <IconComment className="fill-[#548effdd] ml-4 w-[17px] text-[#39507faa] rounded-[3px]" />
                  <div className="flex items-center w-max rounded-md opacity-80 text-[#374151]   group-hover:opacity-100">
                    <div className="w-full py-1">ver<span className='ml-1 font-semibold text-[13px] text-[#39507f]'>COMENTARIOS </span></div>
                  </div>
                </div>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 items-start justify-end ${isModalOpen ? "flex" : "hidden"}`}>
        <div className="relative w-[300px] mt-[64px] mr-10 bg-white rounded-md shadow-lg sm:mr-12 sm:mt-[76px] min-[1024px]:mr-[calc((100vw_-_928px)_/_2)]">
          <EditProfileImage user={user}  setIsModalOpen= {setIsModalOpen} />
        </div>
      </div>

      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 items-start justify-end ${isModalOpen2 ? "flex" : "hidden"}`}>
        <div className="relative w-[300px] mt-[64px] mr-10 bg-white rounded-md shadow-lg sm:mr-12 sm:mt-[76px] min-[1024px]:mr-[calc((100vw_-_928px)_/_2)]">
          <EditProfileName user={user} setIsModalOpen2= {setIsModalOpen2} />
        </div>
      </div>

      <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 items-start justify-end ${isModalOpen3 ? "flex" : "hidden"}`}>
        <div className="relative w-[300px] mt-[64px] mr-10 bg-white rounded-md shadow-lg sm:mr-12 sm:mt-[76px] min-[1024px]:mr-[calc((100vw_-_928px)_/_2)]">
          <EditProfileEmail user={user}  setIsModalOpen3= {setIsModalOpen3} />
        </div>
      </div>

      {/*update accountClouse */}
      <form action={formAccountOpen}>
        <input
          type="hidden"
          name="account"
          value= "cerrado"
          readOnly
        />
        <button
          type="submit"
          ref={buttonRef}
          className= "hidden" 
        >
          Enviar
        </button>
      </form>
    </div>
  );
}