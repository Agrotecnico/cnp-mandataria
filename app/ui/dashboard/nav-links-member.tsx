"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation'
import { linkMembers }  from '@/app/constant';


export default function NavLinksMember() {
  const pathname = usePathname(); 
    return (
      <>
        {linkMembers?.map((linkMember) => {
          const LinkIcon = linkMember.icon;
          return (
            <Link
              key={linkMember.name}
              href={linkMember.href}
              className={clsx(
                'text-sm flex items-center justify-start first:rounded-t-lg last:rounded-b-lg duration-200 text-[#1d0215bb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffe3] hover:text-[#1d0215]',
                {
                  'text-[#1d0216] bg-[#ffffffe3] ':  pathname === linkMember.href,
                }
              )}
            >
              <button className="w-full py-2 px-2.5 gap-2 flex justify-start items-center"
                >
                <LinkIcon className="w-[20px]  text-[#50073aaa]" />
                <p className="text-sm text-start ">
                {linkMember.name}
                </p>
              </button>
            </Link>
          );
        })}
      </>
    );
}
