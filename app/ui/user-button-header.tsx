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
import { PowerIcon } from '@heroicons/react/24/outline';

// import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/uiRadix/avatar';
import { Button } from '@/app/ui/uiRadix/button';
import { User } from '@/app/lib/definitions';
import Image from 'next/image'


export default function UserButtonHeader( { user }: { user: User | undefined } ) {
  
  const pathname = usePathname();


  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative gap-4 h-8 w-full max-w-max rounded-full px-0"
          >
            {user?.image ? (
              <>
              <Image
                  src={user?.image}
                  alt={user?.name ?? ''}
                  width={40}
                  height={40}
                  // priority
                  // objectFit={"container"}
                  className="rounded-full"
                >
                </Image>
              {/* <Avatar className="h-10 w-10 sm:w-11 sm:h-11">
                {user?.image && (
                  <AvatarImage
                    src={user?.image}
                    alt={user?.name ?? ''}
                  />
                )}
                <AvatarFallback>{user?.email}</AvatarFallback>
              </Avatar> */}
              </>
            ) : (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee] text-[#374151] ">
                {user?.email?.substring(0, 1).toUpperCase()}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="mt-3 bg-white w-56 rounded-md shadow-xl shadow-[#30032222]"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
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
              <div className="w-full px-2 py-1 text-sm cursor-default rounded-md text-[#37415188] ">Cnp mandataria</div>
              
            </Link>
          ) : (
            <Link
              href={'/'}
            >
              <DropdownMenuItem>
                <div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#37415111] hover:opacity-100 ">Cnp mandataria</div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/faq') ? (
            <Link
              href={'#'}
            >
              <div className="w-full px-2 py-1 text-sm cursor-default rounded-md text-[#37415188] ">Consultas frecuentes</div>
              
            </Link>
          ) : (
            <Link
              href={'/faq/dif-gestor-mandatario'}
            >
              <DropdownMenuItem>
                <div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#37415111]  hover:opacity-100">Consultas frecuentes</div>
              </DropdownMenuItem>
            </Link>
          )}
            
          {pathname == '/dashboard/consultas' ? (
            <Link
              href={'#'}
            >
              {user?.role === "admin"
                ? ''
                : (<div className="w-full px-2 py-1 text-sm  cursor-default rounded-md text-[#37415188] ">Consultas</div>) }
              
            </Link>
          ) : (
            <Link
              href={'/dashboard/consultas'}
            >
              <DropdownMenuItem>
                {user?.role === "admin"
                  ? ''
                  : (<div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#0000000a] hover:opacity-100 ">Consultas</div>)}
              </DropdownMenuItem>
            </Link>
          )}

          {pathname == '/dashboard/tramites' ? (
            <Link
              href={'#'}
            >
              {user?.role === "admin"
                ? ''
                : (<div className="w-full px-2 py-1 text-sm  cursor-default rounded-md text-[#37415188] ">Trámites</div>)}
              
            </Link>
          ) : (
            <Link
              href={'/dashboard/tramites'}
            >
              <DropdownMenuItem>
              {user?.role === "admin"
                ? ''
                : (<div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#0000000a] hover:opacity-100 ">Trámites</div>)}
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/dashboard') ? (
            <Link
              href={'#'}
            >
              {user?.role === "admin"
                ? (<div className="w-full px-2 py-1 text-sm  cursor-default rounded-md text-[#37415188] ">Panel ADMIN</div>)
                : ''}
              
            </Link>
          ) : (
            <Link
              href={'/dashboard'}
            >
              <DropdownMenuItem>
                {user?.role === "admin"
                  ? (<div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#0000000a] hover:opacity-100 ">Panel ADMIN</div>)
                  : ''}
              </DropdownMenuItem>
            </Link>
          )}
          
          <Button
            variant={'ghost'}
            className="!justify-start mt-3 file:ml-auto h-auto w-full bg-[#3741511c] text-[#374151] opacity-[0.80] hover:opacity-100 active:opacity-70"
            onClick={async () => {
              await signOut({ callbackUrl: '/' });
            }}
          >
            <DropdownMenuItem>
              {/* <div className="w-full flex justify-start"></div> */}
              <PowerIcon className="w-5 mr-4 text-red-500"/>
              <p>Salir</p>
            </DropdownMenuItem>
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
