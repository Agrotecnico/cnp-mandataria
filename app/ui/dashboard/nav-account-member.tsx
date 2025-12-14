"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import { linksMembers }  from '@/app/constant';
import { User } from "@/app/lib/definitions";


export default function NavAccountMember({user}: {user: User | undefined}) {
  const pathname = usePathname();
  
    return (
      <>
        {linksMembers?.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('w-full text-sm flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffff] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md',
                {
                  'text-[#020b1e] bg-[#ffffff] ':  pathname === link.href,
                }
              )}
            >
              <button className="h-[34px] w-full px-2.5 gap-3 flex items-center justify-start sm:flex-row sm:justify-start" >
                {user?.account === "abierto" ? (
                  <LinkIcon className={`w-[16px] ${pathname === link.href ? "fill-[#39507f]" : "fill-[#39507f88]"} `} />
                ) : (
                  <LinkIcon className={`w-[16px] ${pathname === link.href ? "fill-[#548eff]" : "fill-[#548eff88]"} `} />
                )}

                <p className={`text-sm text-start `}>
                  {link.name}
                </p>
              </button>
            </Link>
          );
        })}
      </>
    );
}
