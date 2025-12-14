"use client"

import Link from 'next/link';
import clsx from 'clsx';

import { usePathname } from 'next/navigation';
import type { Post } from "@/app/lib/definitions"


export default function NavLinksConsultas({allPosts}:{allPosts:Post[]}) {
  const pathname = usePathname();
  
  
  return (
    <div className="flex flex-col">
      {allPosts.length ? (
        allPosts.map( async (post:Post) => (
          <Link
            as={`/faq/${post.slug}`}
            href={`/faq/[${post.slug}]`}
            key={post.slug}
            className={clsx('w-full text-sm flex items-center justify-start first:rounded-l-md last:rounded-r-md duration-150 text-[#020b1dac] bg-[#ffffff66] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] hover:bg-[#ffffffd2] hover:text-[#020b1ddd] md:first:rounded-bl-none md:last:rounded-tr-none md:first:rounded-t-md md:last:rounded-b-md active:opacity-80',
              {
                'text-[#020b1ddc] bg-[#ffffffd3] ':  pathname === `/faq/${post.slug}`,
              }
            )}
          >
            <button className="w-full py-2 px-2.5 gap-2 flex flex-col items-center justify-center sm:flex-row sm:justify-start" >
              <p className="text-sm text-start ">
              {post.excerpt}
              </p>
            </button>
          </Link>
        ))
      ) : (
        <p>Aún no hay ningúna consulta publicada</p>
      )}
    </div>
  );
}
