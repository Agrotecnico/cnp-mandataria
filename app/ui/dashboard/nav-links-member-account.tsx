"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import { linksMembers }  from '@/app/constant';
import IconCuenta from '../logosIconos/icon-cuenta';


export default function NavLinksMemberAccount() {
  const pathname = usePathname();
  
    return (  
      <>
        {linksMembers?.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('w-full text-sm flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md',
                {
                  'text-[#020b1d] bg-[#ffffffe3] ':  pathname === link.href,
                  ' pointer-events-none cursor-not-allowed ':  link.name === "Ingreso mi CUENTA",
                }
              )}
            >
              <button className="w-full py-2 px-2.5 gap-2 flex items-center justify-start sm:flex-row sm:justify-start" >
                <LinkIcon className={` w-[17px] ${link.name === "Ingreso mi CUENTA" && " !w-5 fill-[#548eff66] "} text-[#39507f] md:w-18`} />
                <p className={`text-sm text-start ${link.name === "Ingreso mi CUENTA" && "text-[#020b1d58] "}`}>
                {link.name}
                </p>
              </button>
            </Link>
          );
        })}

        <Link
          href={"/dashboard/cuenta"}
          className={clsx(' w-full text-[13px] flex items-center justify-start first:rounded-t-md last:rounded-b-md  duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] sm:text-sm md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md',
            {
              'text-[#020b1d] bg-[rgba(255,255,255,0.89)] ':  pathname === "/dashboared/cuenta",
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
