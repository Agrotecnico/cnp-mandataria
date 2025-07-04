import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
// import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { signOut } from '@/auth';
import  NavLinksAdmin  from '@/app/ui/dashboard/nav-links-admin'

import { Fondo } from '@/app/ui/marcos'

export default function SideNav() {
  return (
    <Fondo className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex justify-center items-center text-center pb-2 px-2 lg:pt-1 lg:pb-3"
        href="/"
      >
        <div className="w-32 md:w-40">
          Panel ADMIN
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* <NavLinks /> */}
        <div className="flex md:flex-col w-full">
          <NavLinksAdmin />
        </div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/' });
          }}
        >
          <button className="flex h-full w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </Fondo>
  );
}