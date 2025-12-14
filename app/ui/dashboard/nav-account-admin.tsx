"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'

import { links }  from '@/app/constant';
import { User } from "@/app/lib/definitions";
import IconCuenta from '../logosIconos/icon-cuenta';


export default function NavAccountAdmin({user}: {user: User | undefined}) {
  const pathname = usePathname();

  return (
    <>
      <Link
        // href={ user?.account === "abierto" && (user?.role === "memberAccount" || user?.role === "admin") ? "#" : "/dashboard/cuenta"}
        href={ user?.role === "admin" ? "/dashboard/cuenta" : "#"}
        className={clsx(' flex w-full text-[13px] items-center justify-start rounded-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffff] hover:text-[#020b1d] sm:text-sm ',
          {
            'text-[#020b1e] bg-[#ffffff] ':  pathname === "/dashboard/cuenta",
            'hidden ':  user?.account === "abierto" && (user.role === "memberAccount" || user.role === "admin"),
            'opacity-40 !cursor-default':  user?.role !== "admin"
          }
        )}
        // prefetch={user?.role !== "admin" ? false : true}
        // aria-disabled={ user?.role === "admin" ? true : false }
      >
        <div 
          className="w-full h-8 px-2.5 gap-2 flex items-center justify-start sm:h-9 sm:flex-row sm:justify-start"
          >
          <IconCuenta className={`w-5 ${pathname === "/dashboard/cuenta" ? "fill-[#548eff]" : "fill-[#548eff88]"} `} />
          <p className="text-start ">
            { 
              user?.account === "cerrado" && (user.role === "memberAccount" || user.role === "admin") ? "Ingresá a tu CUENTA" :
              user?.account === "cerrado" && (user.role === "memberVerified" ) && "Creá tu CUENTA"
            }
          </p>
        </div>
      </Link>

      <div>
        {links?.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('w-full text-sm items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d]  md:first:rounded-bl-none md:last:rounded-tr-none  md:first:rounded-t-md md:last:rounded-b-md ',
                {
                  'text-[#020b1e] bg-[#ffffffe3] ':  pathname === link.href,
                  'flex': user?.account === "abierto",
                  'hidden': user?.account === "cerrado",
                }
              )}
            >
              <button className="h-[34px] w-full px-2.5 gap-3 flex items-center justify-start sm:flex-row sm:justify-start" >
                <LinkIcon className={`w-[16px] ${pathname === link.href ? "fill-[#39507f]" : "fill-[#39507f88]"} `} />

                <p className={`text-sm text-start `}>
                  {link.name}
                </p>
              </button>
            </Link>
          );
        })}
      </div>
    </>
  );
}
