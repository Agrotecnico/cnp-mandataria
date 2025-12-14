import { auth } from 'auth';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CardControl from '@/app/ui/dashboard/card-control';
import CardControlMember from '@/app/ui/dashboard/card-control-member';


export const metadata: Metadata = {
  title: 'Info ganeral',
};

export default async function Page() {
  const session = await auth();
  const email = session?.user?.email

  // if (session?.user.email === process.env.ADMIN )
  if (session?.user.role === "admin" )
    return (
      <main>
        <h1 className={`mb-[22px] mt-1.5 text-xl lg:text-2xl`} >
          Resumen
        </h1>
        <CardControl />
      </main>
    );

  if (
    session?.user.role === "memberAccount" || 
    session?.user.role === "memberVerified" /* || 
    session?.user.role === "member" */
    )
    return (
      <main>
        <h1 className={`mb-[22px] mt-1.5 text-xl lg:mb-[22px] lg:text-2xl`} >
          Resumen
        </h1>
        <CardControlMember email={email} />
      </main>
    );

  return notFound();
}