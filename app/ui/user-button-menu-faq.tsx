'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/app/ui/uiRadix/dropdown-menu';

import Dropdown from '@/app/ui/Dropdown';
import type { Post } from "@/app/lib/definitions"
import IconMenu from './logosIconos/icon-menu';


export default  function UserButtonMenuFaq({allPosts}:{allPosts:Post}) {

  const pathname = usePathname();

  return (
    <div 
      className={`${pathname.startsWith('/faq') ? "block" : "hidden" }  lg:hidden`}
      >
      <Dropdown>
        <Dropdown.Button>
          <p className="text-[13px] leading-[1.1] text-[#fff] font-medium duration-200 opacity-80 hover:opacity-95 sm:text-sm">
            FAQ
          </p>
        </Dropdown.Button>

        <Dropdown.Menu >
          <div className=" w-screen px-[6%] pt-8 pb-5 flex flex-col">
            {allPosts.length ? (
              allPosts.map((post:Post) => (
                <Link
                  as={`/faq/${post.slug}`}
                  href="/faq/[slug]"
                  key={post.slug}
                  className={clsx('w-full text-sm flex items-center justify-start first:rounded-t-md last:rounded-b-md duration-200 text-[#020b1d88] bg-[#548eff14] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#548eff29] hover:text-[#020b1dbb] active:opacity-80',
                    {
                      'text-[#020b1dba] bg-[#548eff28] ':  pathname === `/faq/${post.slug}`,
                    }
                  )}
                >
                  <Dropdown.MenuItem>
                    <div className="w-full py-2 px-2.5 gap-2 flex items-center justify-start sm:justify-start" >
                      <p className="text-sm text-start ">
                      {post.excerpt}
                      </p>
                    </div>
                  </Dropdown.MenuItem>
                </Link>
              ))
            ) : (
              <p>Aún no hay ningúna consulta publicada</p>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
