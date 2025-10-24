import { auth } from 'auth';
import { SessionProvider } from 'next-auth/react';

import RegisterForm from '@/app/ui/register-form';
import Header from '@/app/ui/header';
import { fetchUserById } from '@/app/lib/data';
import type { Metadata } from "next"
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Registro',
}

export default async function RegisterPage() {

  const session = await auth();
  // const user = await fetchUserById(session?.user?.email)

  if (session )
      return redirect('/');

  return (
    <>
      <SessionProvider>
        <Header />
      </SessionProvider> 
      <main className="flex items-start justify-center pt-16 md:h-screen">
        <div className="relative mt-16 flex w-full max-w-[460px] flex-col space-y-2.5 p-4">
          <RegisterForm />
        </div>
      </main>
    </>
  );
}
