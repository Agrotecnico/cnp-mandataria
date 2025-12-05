// "use client"

// import { Suspense, useState } from 'react';
import { auth } from 'auth';

import RegisterAccount from '@/app/ui/register-account';
import LoginAccount from '@/app/ui/login-Account';
import AccessAccount from '@/app/ui/access-account';
import { fetchUserByEmail } from '@/app/lib/data';


export default async function LoginPage() {

  // const [open, setOpen] = useState<boolean>(true)

  const session = await auth();
  const user = await fetchUserByEmail(session?.user?.email)

  return (

    <AccessAccount user= {user} />

    // <main className="flex items-start justify-center ">
    //   <div className="relative flex w-full max-w-[472px] flex-col">
    //     {open ? (
    //         <Suspense>
    //             <LoginAccount setOpen={setOpen} />
    //         </Suspense>
    //     ) : (
    //         <Suspense>
    //             <RegisterAccount setOpen={setOpen} />
    //         </Suspense>
    //     )}
    //   </div>
    // </main>
  );
}