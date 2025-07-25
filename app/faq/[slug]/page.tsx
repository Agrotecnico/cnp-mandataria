import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { auth } from 'auth';
import Image from 'next/image'
import Link from 'next/link';
// import { useState } from "react"

import { getPostBySlug } from '@/app/lib/getPost';
import markdownToHtml from '@/app/lib/markdownToHtml';
import distanceToNow from '@/app/lib/dateRelative';
import markdownStyles from '@/app/ui/consultas/markdown-styles.module.css';
import FormComment from '@/app/ui/consultas/comments/form-comment';
import ListComment from '@/app/ui/consultas/comments/list-comment';
import {Frente} from '@/app/ui/marcos'
import { fetchUserById } from '@/app/lib/data';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import  IconWhatsApp  from "@/app/ui/logosIconos/icon-whatsApp2";
import { fetchFilteredComments } from '@/app/lib/data';
import { Providers } from '@/app/dashboard/providers'
import { SessionProvider } from "next-auth/react"
import { Fondo } from "@/app/ui/marcos";
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';


// export const metadata: Metadata = {
//   title: 'Consultas',
//   description:'En esta página listamos y detallamos las consultas más frecuentes ',
// };

type Params = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Params) {

  // const [comme, setComme] = useState(false);

  const session = await auth();
  const user = await fetchUserById(session?.user?.email)


  const post = getPostBySlug(params.slug);

  const id= post.slug!

  const comments= await fetchFilteredComments(id)

  if (!post) {
    return notFound();
  }
  const content = await markdownToHtml(post.content || '');

  return (
    <>
      <Frente className="!rounded-lg !bg-[#ffffffaa] ">
        <article className="px-3 pb-6 pt-6 md:px-6">
          <h1 className="mb-3 text-xl font-bold sm:mb-6 md:text-2xl">
            {post.excerpt}
          </h1>

          <div className="hidden md:mb-6 md:block">
            <div className="flex items-center">
              {post.avatar ? (
                <Image
                  src={`${post.avatar}`}
                  alt="my desk"
                  width={300}
                  height={300}
                  className="mr-4 h-auto w-12 rounded-full"
                />
              ) : null}
              <div className="text-lg font-semibold">{post.autor}</div>
            </div>
          </div>

          <div className="mx-auto mb-4 max-w-max rounded p-0.5 [box-shadow:inset_0_2px_0_#4d4d4db8,inset_0_-2px_0_#ffffff] md:mb-8 ">
            <div className="sm:mx-0">
              {post.image ? (
                <Image
                  src={`${post.image}`}
                  alt="my desk"
                  width={481}
                  height={361}
                  className="roundrd w-64 h-auto sm:w-96 "
                  priority
                />
              ) : null}
            </div>
          </div>

          <div className="mx-auto max-w-2xl">
            {/* <div className="mb-6 block md:hidden">
              <div className="flex items-center">
                {post.avatar ? (
                  <Image
                    src={`${post.avatar}`}
                    alt="my desk"
                    width={300}
                    height={300}
                    className="mr-4 h-auto w-12 rounded-full"
                  />
                ) : null}
                <div className="text-lg font-bold">{post.autor}</div>
              </div>
            </div> */}

            <div className="text-md mb-3 sm:mb-6">
              <time className="mt-2 flex text-[14px] text-[#020b1daa] ">
                {distanceToNow(new Date(`${post.date}`))}
              </time>
            </div>
          </div>

          <div className="mx-auto mb-8 max-w-2xl text-sm sm:text-base">
            <div
              className={` ${markdownStyles['markdown']}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div className="mt-20 mx-auto text-sm max-w-2xl sm:text-[15px]">
            <SessionProvider  /* basePath={"/auth"} */ session={session}>
              <FormComment  user={user} post={post}  comments={comments}/>
            </SessionProvider>
            <ListComment user={user} post={post} comments={comments}  />
          </div>
        </article>
      </Frente>

      <div className="flex flex-col w-max mx-auto my-12 gap-0.5 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12 sm:flex-row lg:hidden">
        <Link 
          href={"/iniciar-tramite/cambio-de-radicacion"} 
          className="group h-7 flex items-center rounded-t-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-tr-none sm:rounded-l-lg sm:h-8 hover:bg-white active:opacity-80">
          <IconPresupuesto 
            className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
            color="#ffffffdd" color2="#020b1d"
            />
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Pedí presupuesto</p>
        </Link>
        <Link 
          href={"/realizar-consulta"} 
          className="group h-7 flex items-center rounded-b-lg px-3 bg-[#ffffffaa] duration-150 justify-start sm:rounded-bl-none sm:rounded-r-lg sm:h-8 hover:bg-white active:opacity-80">
          <IconConsulta 
            className="mr-2 w-[15px] h-[15px] duration-150 opacity-70 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"
            color="#ffffffdd" color2="#020b1d"
            />
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">Realizá tu consulta</p>
        </Link>
      </div>
    </>
  );
}