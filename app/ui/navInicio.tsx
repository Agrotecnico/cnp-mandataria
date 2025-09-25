import Link from 'next/link';
// import { useSession } from 'next-auth/react';
import type { Session } from "next-auth"

import IconCuenta from '@/app/ui/logosIconos/icon-cuenta';
import UserButtonHeader from '@/app/ui/user-button-header';
import { User } from '@/app/lib/definitions';
import VisitorButtonHeader from './visitor-button-header';


export default function NavInicio( /*{ session }: { session: Session | null } */ { user }: { user: User | undefined }  ) {
  // const { data: session, update } = useSession();
  

  return (
    <div className="w-ful fixed inset-x-0 top-0  z-20 bg-[#39507f] ">
      <header className=" mt-0px h-18 relative mx-auto h-[68px] bg-transparent transition-colors duration-200  sm:h-20">
        <nav className=" text-small-regular mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 text-white transition-colors duration-200 sm:px-6">
          <div className="flex w-full items-center justify-end min-[1100px]:mr-0">
            {/* {user ? (
              <div className=" flex items-center gap-2 ">
                <span className="hidden text-sm text-[#fffffff2] [text-shadow:_1px_1px_0px_#000000c9] sm:inline-flex">
                  {user.name}
                </span> */}
                <UserButtonHeader user={user} />
              {/* </div>
            ) : (
              <VisitorButtonHeader  />
            )} */}
          </div>
        </nav>
      </header>
    </div>
  );
}
