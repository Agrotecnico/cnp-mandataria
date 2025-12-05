
import LoginAccount from '@/app/ui/login-Account';
// import { Suspense, useState } from 'react';
import { auth } from 'auth';
import { redirect, notFound } from 'next/navigation';
import type { Metadata } from "next"
import { fetchUserByEmail } from '@/app/lib/data';

import Header from '@/app/ui/header';
import RegisterAccount from '@/app/ui/register-account';
import AccessAccount from '@/app/ui/xxxaccess-account';

export const metadata: Metadata = {
  title: 'Cuenta',
}

export default async function LoginPage() {

// const [open, setOpen] = useState(true)

//   const session = await auth();
const session = await auth();
const user = await fetchUserByEmail(session?.user?.email)
// const email = session?.user?.email


//   if (session )
//     return redirect('/');

// if (open )
  return (
    <>
     {/* <main className="flex items-start justify-center pt-0 md:h-screen sm:pt-8 ">
       <div className="relative flex w-full max-w-[472px] flex-col p-3 sm:p-4"> */}
        {/* <Suspense> */}
          <AccessAccount user= {user} />
          
          {/* <RegisterAccount /> */}
        {/* </Suspense> */}
       {/* </div>
     </main> */}
    </>
  );

  // return (
  //     <main className="flex items-start justify-center pt-0 md:h-screen sm:pt-8 ">
  //       <div className="relative flex w-full max-w-[472px] flex-col p-3 sm:p-4">
  //         <Suspense>
  //           {/* <LoginAccount open= {open} /> */}
  //           <RegisterAccount />
  //         </Suspense>
  //       </div>
  //     </main>
  //   );



















  // if (
  //   session?.user.role === "memberAccount"
  //   // session?.user.role === "memberVerified" || 
  //   // session?.user.role === "member"
  //   )
  //   return (
  //     <main className="flex items-start justify-center pt-16 md:h-screen ">
  //     <div className="relative flex w-full max-w-[472px] flex-col p-3 sm:p-4">
  //       <Suspense>
  //         {/* <LoginForm /> */}
  //         <RegisterAccount />
  //       </Suspense>
  //     </div>
  //   </main>
  //   );

  // return notFound();

  // return (
  //   <>
  //     <main className="flex items-start justify-center pt-16 md:h-screen ">
  //       <div className="relative flex w-full max-w-[472px] flex-col p-3 sm:p-4">
  //         <Suspense>
  //           {/* <LoginForm /> */}
  //           <RegisterAccount />
  //         </Suspense>
  //       </div>
  //     </main>
  //   </>
  // );
}