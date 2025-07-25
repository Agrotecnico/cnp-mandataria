// import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { auth } from 'auth';
import { redirect } from 'next/navigation';
import type { Metadata } from "next"

import Header from '@/app/ui/header';

export const metadata: Metadata = {
  title: 'Acceso',
}

export default async function LoginPage() {

  const session = await auth();
  if (session )
    return redirect('/dashboard');

  return (
    <>
      <Header />
      <main className="flex items-center justify-center md:h-screen">
        <div className="relative mx-auto mt-12 flex w-full max-w-[460px] flex-col space-y-2.5 p-4 md:-mt-32">
          {/* <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <AcmeLogo />
            </div>
          </div> */}
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </>
  );
}