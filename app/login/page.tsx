
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
    return redirect('/');

  return (
    <>
      <Header />
      <main className="flex items-start justify-center pt-16 md:h-screen ">
        <div className="relative mt-16 flex w-full max-w-[472px] flex-col p-3 sm:p-4">
          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </main>
    </>
  );
}