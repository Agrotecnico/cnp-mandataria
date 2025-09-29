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
              'flex items-center justify-start pl-2 pr-4 text-sm text-[#020b1dbb] duration-200 rounded-[4px] hover:text-[#020b1d] hover:bg-[#548eff13]',
              {
                'bg-[#548eff12] text-[#020b1e]': pathname === `/faq/${post.slug}`,
              },
            )}
          >
            <div className="flex items-start">
              <div className="mt-3 mr-2 w-1.5 h-1.5 rounded-full text-transparent bg-[#39507f77]">o</div>
              <p className="text-sm py-1.5 text-start ">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>Aún no hay ningúna consulta publicada</p>
      )}
    </div>
  );
}
