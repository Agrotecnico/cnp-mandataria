"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import { links }  from '@/app/constant';


export default function NavLinksAdmin() {
  const pathname = usePathname();
  
    return (
      <>
        {links?.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx('w-full text-sm flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-200 text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#020b1d] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md',
                {
                  'text-[#020b1d] bg-[#ffffffe3] ':  pathname === link.href,
                }
              )}
            >
              <button className="w-full py-2 px-2.5 gap-2 flex flex-col items-center justify-center sm:flex-row sm:justify-start" >
                <LinkIcon className="w-[18px] text-[#39507f]" />
                <p className="text-sm text-start ">
                {link.name}
                </p>
              </button>
            </Link>
          );
        })}
      </>
    );
}
