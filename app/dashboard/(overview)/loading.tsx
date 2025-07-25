import DashboardSkeleton from '@/app/ui/skeletons';
import { auth } from 'auth';

export default async function Loading() {
  const session = await auth();
  if (session?.user?.email === process.env.ADMIN )
    return  (
      <DashboardSkeleton />
    );
    return  (
      <div>Loanding...</div>
    )
  }