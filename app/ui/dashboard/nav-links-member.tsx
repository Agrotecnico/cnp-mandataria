"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import { useSession } from "next-auth/react"

import { linksMembers }  from '@/app/constant';
import { User } from "@/app/lib/definitions";
import IconCuenta from '../logosIconos/icon-cuenta';


export default function NavLinksMember(/* {user}: {user: User | undefined} */) {
  const pathname = usePathname(); 

  const { data: session, update } = useSession()

  console.log("session:", session)

    return (
      <>
        {linksMembers?.map((linkMember) => {
          const LinkIcon = linkMember.icon;
          return (

            <Link
              key={linkMember.name}
              href={linkMember.href}
              className={clsx(' w-full text-[13px] flex items-center justify-start first:rounded-t-md last:rounded-b-md  duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] sm:text-sm md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md',
                {
                  'text-[#020b1d] bg-[#ffffffe3] ':  pathname === linkMember.href,
                }
              )}
            >
              <button className="w-full h-8 px-2.5 gap-2 flex items-center justify-start sm:h-9 sm:flex-row sm:justify-start" >
                <LinkIcon className={` w-[17px] text-[#39507f] md:w-18`} />{/*  ${linkMember.name === "Ingreso mi CUENTA" && " !w-5 fill-[#548eff] "} */}
                <p className="text-start ">
                  {linkMember.name /* === "Ingreso mi CUENTA" && session?.user.role !== "memberAccount" ? "Ingresá a tu CUENTA" : linkMember.name === "Ingreso mi CUENTA" && session?.user.role === "memberAccount" ? "Creá tu Cuenta" : linkMember.name */  }
                </p>
              </button>
            </Link>
          );
        })}

        <Link
          href={"/dashboard/cuenta"}
          className={clsx(' w-full text-[13px] flex items-center justify-start first:rounded-t-md last:rounded-b-md  duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] sm:text-sm md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md',
            {
              'text-[#020b1d] bg-[#ffffffe3] ':  pathname === "/dashboared/cuenta",
            }
          )}
        >
          <button className="w-full h-8 px-2.5 gap-2 flex items-center justify-start sm:h-9 sm:flex-row sm:justify-start" >
            <IconCuenta className={` w-5 fill-[#548eff]`} />
            <p className="text-start ">
              Tu CUENTA
            </p>
          </button>
        </Link>
      </>
    );
}
