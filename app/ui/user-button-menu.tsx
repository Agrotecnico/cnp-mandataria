'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import IconMenu from '@/app/ui/logosIconos/icon-menu';
import { useSession } from 'next-auth/react';
import { links, linkMembers } from '@/app/constant';
import Dropdown from '@/app/ui/Dropdown';


export default  function UserButtonMenu() {

  const { data: session, update } = useSession();

  const pathname = usePathname();


  return (
    <div className={`${pathname.startsWith('/faq') && "hidden" } min-[824px]:hidden `}>
      <Dropdown >
        <Dropdown.Button>
          <IconMenu
            width="20"
            heightx="20"
            className="fill-[#fff9] duration-200 group-hover:fill-[#ffffffdd] min-[824px]:hidden "
          />
        </Dropdown.Button>

        <Dropdown.Menu>
          <div className="px-4 pt-8 pb-2 flex items-center flex-col space-y-1 mx-4 sm:pt-10 sm:pb-0 md:pt-8 md:pb-1">
            <p className="text-sm font-medium leading-none ">
              {session?.user?.name}
            </p>
          </div>

          <div className="flex w-screen flex-col pt-2.5 px-4 pb-6 gap-[1px] rounded-xl">
            {links &&
              links?.map((link) => {
                const LinkIcon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={clsx(
                      'flex items-center justify-start px-4 bg-[#1d021519] text-sm text-[#1d0215bb] duration-200 first:rounded-t-md last:rounded-b-md hover:text-[#1d0215] hover:bg-[#1d02150d]',
                      {
                        'bg-[#1d02150e] text-[#1d0214]':
                        pathname === link.href,
                      },
                    )}
                  >
                    <Dropdown.MenuItem>
                      <div className="flex w-full items-center justify-start gap-2 px-2.5 py-2">
                        <LinkIcon className="w-5 text-[#50073aaa]" />
                        <p className="text-start text-sm ">{link.name}</p>
                      </div>
                    </Dropdown.MenuItem>
                  </Link>
                );
              })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
