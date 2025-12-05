"use client"

import { Suspense, useState } from 'react';
import { auth } from 'auth';
import { redirect, notFound } from 'next/navigation';
import type { Metadata } from "next"

import { fetchUserByEmail } from '@/app/lib/data';
import RegisterAccount from '@/app/ui/register-account';
import LoginAccount from '@/app/ui/login-Account';
import { User } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: 'Cuenta',
}

export default /* async */ function AccessAccount({user}: {user: User | undefined }) {

const [open, setOpen] = useState<boolean>(true)

// const session = await auth();
// const user = await fetchUserByEmail(session?.user?.email)
// const email = session?.user?.email


// if (open )
  return (
    <main className="flex items-start justify-center ">{/*  pt-0 sm:pt-8 */}
      <div className="relative flex w-full max-w-[472px] flex-col">{/*  p-3 sm:p-4 */}
        {open ? (
            <Suspense>
                <LoginAccount user= {user} setOpen={setOpen} />
            </Suspense>
        ) : (
            <Suspense>
                <RegisterAccount user= {user} setOpen={setOpen} />
            </Suspense>
        )}
        
      </div>
    </main>
  );

//   return (
//       <main className="flex items-start justify-center pt-0 sm:pt-8 ">
//         <div className="relative flex w-full max-w-[472px] flex-col p-3 sm:p-4">
//           <Suspense>
//             <RegisterAccount user= {user} setOpen={setOpen} />
//           </Suspense>
//         </div>
//       </main>
//     );





}