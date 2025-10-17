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
import type { Session } from "next-auth"

// import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/uiRadix/avatar';
import { Button } from '@/app/ui/uiRadix/button';
import { User } from '@/app/lib/definitions';
import Image from 'next/image'
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';


export default function VisitorButtonHeader( /* { session }: { session: Session | null } */ ) {

  const pathname = usePathname();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            // variant="ghost"
            className="relative gap-4 h-8 w-full max-w-max rounded-full px-0"
          >
            <div className="flex items-center justify-center w-10 h-10 bg-[#ffffffdd] rounded-full opacity-70 hover:opacity-90 duration-150">
              {/* <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eee] text-[#374151] "> */}
                {/* {session?.user.email?.substring(0, 1).toUpperCase()} */}
                <IconCuenta className="w-6 sm:w-7" color='#39507fcc' />
              {/* </span> */}
              
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="mt-3 bg-white w-56 rounded-md shadow-xl shadow-[#30032222]"
          align="end"
          forceMount
        >
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

          <DropdownMenuSeparator className="h-[1px] bg-[#37415122] m-[3px]" />

          {pathname == '/realizar-consulta' ? (
            <Link
              href={'#'}
            >
              <div className="w-full px-2 py-1 text-sm cursor-default rounded-md text-[#37415188] ">Realizá la consultas</div>
            </Link>
          ) : (
            <Link
              href={'/realizar-consulta'}
            >
              <DropdownMenuItem>
                <div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#37415111]  hover:opacity-100">Realizá la consultas</div>
              </DropdownMenuItem>
            </Link>
          )}

          {pathname.startsWith('/iniciar-tramite/') ? (
            <Link
              href={'#'}
            >
              <div className="w-full px-2 py-1 text-sm cursor-default rounded-md text-[#37415188] ">Pedí presupuesto</div>
            </Link>
          ) : (
            <Link
              href={'/iniciar-tramite/cambio-de-radicacion'}
            >
              <DropdownMenuItem>
                <div className="w-full px-2 py-1 rounded-md text-[#374151] opacity-[0.85] hover:bg-[#37415111]  hover:opacity-100">Pedí presupuesto</div>
              </DropdownMenuItem>
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
