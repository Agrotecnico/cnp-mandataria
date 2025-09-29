'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

import Dropdown from '@/app/ui/Dropdown';
import type { Post } from "@/app/lib/definitions"
import { ButtonA } from '@/app/ui/button';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import IconMenu from './logosIconos/icon-menu';
import IconWhatsApp from "@/app/ui/logosIconos/icon-whatsApp";


export default  function UserButtonMenuFaq({allPosts}:{allPosts:Post}) {

  const pathname = usePathname();

  return (
    <div 
      className={`${pathname.startsWith('/faq') ? "block" : "hidden" }  min-[1024px]:hidden`}
      >
      <Dropdown>
        <Dropdown.Button>
          <div className="flex items-center gap-2  duration-200 opacity-75 hover:opacity-[0.9]">
            <IconMenu width='18px' className="fill-[#ffffffcc]"/>
            <p className="text-[13px] leading-[1.1] text-[#fff] font-medium ">
              FAQ
            </p>
          </div>
        </Dropdown.Button>

        <Dropdown.Menu >
          <div className=" w-screen px-3 pt-8 pb-5 flex flex-col gap-[1px]">
            {allPosts.length ? (
              allPosts.map((post:Post) => (
                <Link
                  as={`/faq/${post.slug}`}
                  href="/faq/[slug]"
                  key={post.slug}
                  className={clsx(
                    'flex items-center justify-start pl-2 pr-4 text-sm text-[#020b1daa] duration-200 rounded-lg hover:text-[#020b1ded] hover:bg-[#548eff16] sm:mx-12 ',
                    {
                      'bg-[#548eff17] text-[#020b1dee]': pathname === `/faq/${post.slug}`,
                    },
                  )}
                >
                  <Dropdown.MenuItem>
                    <div className="flex items-start">
                      <div className="mt-3 mr-2 w-1.5 h-1.5 rounded-full text-transparent bg-[#39507f99]">o</div>
                      <p className="text-sm py-1.5 text-start ">
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
