import Link from 'next/link';
import { auth } from 'auth';

import UserButtonHeader from '@/app/ui/user-button-header';
import UserButtonMenuFaq from '@/app/ui/user-button-menu-faq';
import UserButtonMenuIni from '@/app/ui/user-button-menu-ini';
import LogoCnpColor from '@/app/ui/logosIconos/logo-cnp-color';
import LogoCnpColorV from '@/app/ui/logosIconos/logo-cnp-color-v';
import { fetchUserById } from '@/app/lib/data'; 
import { getAllPosts } from '@/app/lib/getPost';


export default async function Header( ) {
  const session = await auth()
  const user = await fetchUserById(session?.user?.email)
  const allPosts = getAllPosts();

  return (
    <header className="fixed left-0 z-10 flex h-[68px] w-[100vw] items-center justify-center bg-[#39507f] sm:h-20 ">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4 ">
          <Link
            className="flex items-center justify-between rounded-md leading-6 md:items-end duration-150 opacity-85 hover:opacity-100"
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
            </>
            ) : session ? (
            <>
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

        <UserButtonHeader user={user} />
      </div>
    </header>
  );
}
