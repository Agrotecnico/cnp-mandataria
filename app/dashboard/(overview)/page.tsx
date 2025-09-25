import { auth } from 'auth';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
  CardControlSkeleton,
  CardsMemberSkeleton,
} from '@/app/ui/skeletons';
import CardControl from '@/app/ui/dashboard/card-control';
import CardWrapperMember from '@/app/ui/dashboard/cards-member';
import { fetchUserById } from '@/app/lib/data';


export const metadata: Metadata = {
  title: 'Info ganeral',
};

export default async function Page() {
  const session = await auth();
  // const user = await fetchUserById(session?.user?.email);

  if (session?.user.role === "admin" )
  return (
    <main>
      <h1
        className={` mb-4 text-xl lg:text-2xl`}
      >
        Resumen
      </h1>
      <div className="grid gap-5 grid-cols-1 min-[448px]:grid-cols-2 lg:grid-cols-3 mb-5">
        <Suspense fallback={<CardControlSkeleton />}>
          <CardControl />
        </Suspense>
      </div>

      {/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div> */}
    </main>
  );

  return notFound();
  
  // return (
  //   <>
  //   <main>
  //     <h1
  //       className={` mb-4 text-xl md:mb-8 lg:text-2xl`}
  //     >
  //       Resumen
  //     </h1>
  //     <div className="grid gap-x-6 gap-y-3 grid-cols-3 sm:gap-6 lg:grid-cols-4">
  //       <Suspense fallback={<CardsMemberSkeleton />}>
  //         <CardWrapperMember />
  //       </Suspense>
  //     </div>
  //   </main>

  //   {/* <div className="h-[50%] flex items-center justify-center ">
  //     Página no disponble
  //   </div> */}
  //   </>
  // );
}