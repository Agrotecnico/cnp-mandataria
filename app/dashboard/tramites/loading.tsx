"use client"

import {TramitesSkeleton} from '@/app/ui/skeletons';
import { useSession } from "next-auth/react"

export default function Loading() {
  const { data: session, update } = useSession()
  if (session?.user?.role === "admin" )
    return  (
      <div className='pt-10 h-[400px] text-2xl flex items-center justify-center '>Cargando...</div>
    );
    return  (
      <TramitesSkeleton />
    )
  }