
import { notFound } from 'next/navigation';
import { auth } from 'auth';
import Image from 'next/image'
import Link from 'next/link';
import { SessionProvider } from "next-auth/react"

import { getPostBySlug } from '@/app/lib/getPost';
import markdownToHtml from '@/app/lib/markdownToHtml';
import distanceToNow from '@/app/lib/dateRelative';
import markdownStyles from '@/app/ui/consultas/markdown-styles.module.css';
import ListComment from '@/app/ui/consultas/comments/list-comment';
import { Frente, Fondo } from '@/app/ui/marcos'
import { fetchCommentLast } from '@/app/lib/data';
import IconPresupuesto from '@/app/ui/logosIconos/icon-presupuesto';
import IconConsulta from '@/app/ui/logosIconos/icon-consulta';
import { fetchFilteredComments } from '@/app/lib/data';
import { fetchUserById2 } from "@/app/lib/data";


type Params = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Params) {
  const session = await auth();
  const user = await fetchUserById2(session?.user.id)

  const post = getPostBySlug(params.slug);

  const slug= post.slug!
  const comments= await fetchFilteredComments(slug)

  const commentLast = await fetchCommentLast()

  if (!post) {
    return notFound();
  }
  const content = await markdownToHtml(post.content || '');

  // console.log("session", session)

  return (
    <>
      <Fondo className="!rounded-lg ">
        <article className="px-3 pb-6 pt-6 md:px-6">
          <h1 className="mb-3 text-xl font-bold sm:mb-6 md:text-2xl">
            {post.excerpt}
          </h1>

          <div className="hidden md:mb-2 md:block">
            <div className="flex items-center">
              {post.avatar ? (
                <Image
                  src={`${post.avatar}`}
                  alt="my desk"
                  width={300}
                  height={300}
                  className="mr-4 p-[1px] h-auto w-12 [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#00000055] rounded-full"
                />
              ) : null}
              <div className="flex flex-col">
                <div className="text-base font-semibold">{post.autor}</div>
                <time className="flex text-[13px] leading-[1] text-[#020b1d66] ">
                  {distanceToNow(new Date(`${post.date}`))}
                </time>
              </div>
            </div>
          </div>

          <div className="mx-auto mb-2 max-w-max rounded p-[1px] [box-shadow:inset_0_1px_0_#ffffff,inset_0_-1px_0_#00000055] md:mb-4 ">
            <div className="sm:mx-0">
              {post.image ? (
                <Image
                  src={`${post.image}`}
                  alt="my desk"
                  width={481}
                  height={361}
                  className="rounded w-48 h-auto sm:w-60 "
                  priority
                />
              ) : null}
            </div>
          </div>

          <div className="mx-auto pt-0.5 px-4 pb-2 rounded mb-7 bg-[#ffffffaa] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] max-w-2xl text-sm sm:mb-9 sm:text-base" >
            <div
              className={`text-[#020b1dbb] mb-4 ${markdownStyles['markdown']}`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          <div className="mx-auto text-sm max-w-2xl sm:text-[15px]">
            <SessionProvider basePath={"/auth"} session={session}>
              <ListComment post={post} comments={comments} commentLast={commentLast} user={user}  />
            </SessionProvider>
          </div>
        </article>
      </Fondo>

      <div className="flex flex-col w-max mx-auto my-12 text-sm rounded-lg shadow-[0_10px_20px_#020b1d33] sm:text-[15px] sm:mt-12 sm:flex-row lg:hidden">
        <Link 
          href={session?.user.role === "admin" ? '/dashboard/tramites' : '/iniciar-tramite/cambio-de-radicacion'} 
          className="group h-7 flex items-center rounded-t-lg px-3 bg-[#548eff0b] duration-150 justify-start sm:rounded-tr-none sm:rounded-l-lg sm:h-8 hover:bg-white active:opacity-80">
          <IconPresupuesto 
            className="mr-2 w-[15px] h-[15px] duration-150 opacity-90 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"/>
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver trámites' : 'Pedí presupuesto'}</p>
        </Link>
        <Link 
          href={session?.user.role === "admin" ? '/dashboard/consultas' : '/realizar-consulta'} 
          className="group h-7 flex items-center rounded-b-lg px-3 bg-[#548eff0b] duration-150 justify-start sm:rounded-bl-none sm:rounded-r-lg sm:h-8 hover:bg-white active:opacity-80">
          <IconConsulta 
            className="mr-2 w-[15px] h-[15px] duration-150 opacity-90 group-hover:opacity-100 sm:w-[16px] sm:h-[16px]"/>
          <p className="text-[#020b1dcc] duration-150 group-hover:text-[#020b1d]">{session?.user.role === "admin" ? 'Ver consultas' : 'Realizá tu consulta'}</p>
        </Link>
      </div>
    </>
  );
}