import Link from 'next/link';
import { auth } from 'auth';
import { SessionProvider } from "next-auth/react"

import UserButtonHeader from '@/app/ui/user-button-header';
import UserButtonMenu from '@/app/ui/user-button-menu';
// import UserButtonMenuMember from '@/app/ui/user-button-menu-member';
import UserButtonMenuFaq from '@/app/ui/user-button-menu-faq';
import UserButtonMenuIni from '@/app/ui/user-button-menu-ini';
import LogoCnpColor from '@/app/ui/logosIconos/logo-cnp-color';
import LogoCnpColorV from '@/app/ui/logosIconos/logo-cnp-color-v';
import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import { fetchUserById } from '@/app/lib/data'; 
import { getAllPosts } from '@/app/lib/getPost';
import VisitorButtonHeader from './visitor-button-header';


export default async function Header( ) {
  const session = await auth()
  // const user= session?.user ? await fetchUserById(session.user.email) : null;
  const user = await fetchUserById(session?.user?.email)
  const allPosts = getAllPosts();

  return (
    <header className="fixed left-0 z-10 flex h-[68px] w-[100vw] items-center justify-center bg-[#39507f]  sm:h-20 ">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 ">
          <Link
            className="flex items-center justify-between rounded-md leading-6 md:items-end"
            href="/"
          >
            <div className="-ml-3 w-full text-white">
              <LogoCnpColorV size="58px" className="ml-3 sm:hidden" />
              <LogoCnpColor size="138px" className="hidden ml-3 sm:block" />
            </div>
          </Link>
        </div>

        <div className="flex flex-col text-center text-[18px] leading-6 text-[#ffffffd4] [text-shadow:_1px_1px_0_#00000082] md:flex-row md:leading-7">
          {session?.user.role === "admin" ? (
            <>
              <UserButtonMenuFaq  allPosts={allPosts} />
              {/* <UserButtonMenu /> */}
            </>
            ) : session ? (
            <>
              {/* <UserButtonMenuMember /> */}
              <UserButtonMenuFaq  allPosts={allPosts} />
              <UserButtonMenuIni />
            </>
            ) : (
            <>
              <UserButtonMenuFaq  allPosts={allPosts} />
              <UserButtonMenuIni />
            </>
            )
          }
        </div>

        {/* {session ? (
          <div className="flex items-center gap-2 ">
            <span className="hidden text-sm text-[#fffffff2] [text-shadow:_1px_1px_0px_#000000c9] md:inline-flex ">
              {session.user.name}
            </span> */}
            <UserButtonHeader user={user} />
          {/* </div>
        ) : (
          <VisitorButtonHeader  />
         )}  */}
      </div>
    </header>
  );
}
