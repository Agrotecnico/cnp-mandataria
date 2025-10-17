import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import  NavLinksAdmin  from '@/app/ui/dashboard/nav-links-admin'

import { Fondo } from '@/app/ui/marcos'

export default function SideNav() {
  return (
    <Fondo className="flex h-full flex-col px-3 py-4 md:px-2">
      <div className="mb-2 flex justify-center items-center text-center pb-2 px-2 lg:pt-1 lg:pb-3">
        Panel ADMIN
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* <NavLinks /> */}
        <div className="flex md:flex-col gap-[1px] w-full md:gap-0">
          <NavLinksAdmin />
        </div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-full w-full grow items-center justify-center gap-2 rounded-md text-[#020b1dbb] bg-[#ffffff88] [box-shadow:_inset_0_1px_#ffffff,inset_0_-1px_#0000002e] p-3 text-sm font-medium hover:bg-[#ffffffe3] hover:text-[#020b1d] md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-5 text-red-500" />
            <div className=" hidden md:block">Salir</div>
          </button>
        </form>
      </div>
    </Fondo>
  );
}