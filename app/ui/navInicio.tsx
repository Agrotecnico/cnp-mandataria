import Link from 'next/link';
// import { useSession } from 'next-auth/react';

import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import UserButtonHeader from '@/app/ui/user-button-header';
import { User } from '@/app/lib/definitions';


export default function NavInicio(/* { user }: { user: User | undefined } */) {
  // const { data: session, update } = useSession();

  return (
    <div className="w-ful fixed inset-x-0 top-0  z-20 bg-[#39507f] ">{/* xgroup   backdrop-blur-md*/}
      <header className=" mt-0px h-18 relative mx-auto h-[68px] bg-transparent transition-colors duration-200  sm:h-20">{/*  group-hover:bg-tranaparent group-hover:border-gray-200*/}
        <nav className=" text-small-regular mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 text-white transition-colors duration-200 sm:px-6">
          <div className="flex w-full items-center justify-end min-[1100px]:mr-0">
            {/* {session?.user ? (
              <div className=" flex items-center gap-2 ">
                <span className="hidden text-sm text-[#fffffff2] [text-shadow:_1px_1px_0px_#000000c9] sm:inline-flex">
                  {session?.user?.email}
                </span>
                <UserButtonHeader />
              </div>
            ) : (
              <div
               
                className="flex flex-col items-center opacity-80 duration-200 "
              >
                <div className="max-w-max ">
                  <IconCuenta className="w-6 sm:w-7" color={'#fff6'} />
                </div>
                <div className="flex flex-col items-center text-[#fff9] min-[500px]:flex-row">
                  <div className="text-[13px] leading-none sm:text-sm sm:leading-none">Acceso</div>
                </div>
              </div>
            )} */}
            <Link
              href= "/login"
              className="flex flex-col items-center opacity-70 duration-200 hover:opacity-100"
            >
              <div className="max-w-max ">
                <IconCuenta className="w-6 sm:w-7" color={'#fffc'} />
              </div>
              <div className="flex flex-col items-center text-[#fff] min-[500px]:flex-row">
                <div className="text-[13px] leading-none sm:text-sm sm:leading-none">Acceso</div>
              </div>
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
}
