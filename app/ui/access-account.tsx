"use client"

import { Suspense, useState } from 'react';
import type { Metadata } from "next"

import RegisterAccount from '@/app/ui/register-account';
import LoginAccount from '@/app/ui/login-Account';
import { User } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: 'Cuenta',
}

export default function AccessAccount({user}: {user: User | undefined }) {

const [open, setOpen] = useState<boolean>(true)

  return (
    <main className="flex items-start justify-center ">
      <div className="relative flex w-full max-w-[472px] flex-col">
        {open && user?.role === "memberAccount" ? (
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
}