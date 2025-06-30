"use client"

import Link from 'next/link';
import clsx from 'clsx';

import { Frente } from '@/app/ui/marcos';
import { usePathname } from 'next/navigation';
import type { Post } from "@/app/lib/definitions"


export default function NavLinksConsultas({allPosts}:{allPosts:Post}) {
  const pathname = usePathname();
  
  return (
    <div className="flex flex-col gap-[1px]">
      {allPosts.length ? (
        allPosts.map((post:Post) => (
          <Link
            as={`/faq/${post.slug}`}
            href="/faq/[slug]"
            key={post.slug}
            className={clsx(
              'flex items-center justify-start pl-2 pr-4 text-sm text-[#020b1dbb] duration-200 rounded-lg hover:text-[#020b1d] hover:bg-[#39507f18]',
              {
                'bg-[#39507f19] text-[#020b1e]': pathname === `/faq/${post.slug}`,
              },
            )}
          >
            <div className="flex items-start">
              <div className="mt-3 mr-2 w-1.5 h-1.5 rounded-full text-transparent bg-[#39507faa]">o</div>
              <p className="text-sm py-1.5 text-start ">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>Aún no hay ningúna consulta publicada</p>
      )}


      {/* {allPosts.length ? (
        allPosts.map((post:Post) => (
          <Link
            as={`/faq/${post.slug}`}
            href="/faq/[slug]"
            key={post.slug}
            className={clsx(`py-2 px-2.5 gap-5 flex justify-between bg-[#ffffff88]  text-[#020b1dbb] items-center duration-200 hover:bg-[#ffffffe3] hover:text-[#020b1d] text-sm first:rounded-t-xl last:rounded-b-xl [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e]`,
              {
                'text-[#020b1e] bg-[#ffffffe3] ': pathname === `/faq/${post.slug}`
              }
            )}
          >
            <p className="text-sm text-start max-[512px]:text-sm ">
              {post.excerpt}
            </p>
          </Link>
        ))
      ) : (
        <p>Aún no se ha publicado ningún blog</p>
      )} */}
    </div>
  );
}
