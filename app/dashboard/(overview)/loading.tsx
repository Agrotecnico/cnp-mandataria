import { ResumenSkeleton } from '@/app/ui/skeletons';
import { auth } from 'auth';

export default /* async */ function Loading() {
  // const session = await auth();
  // if (session?.user?.email === process.env.ADMIN )
  //   return  (
  //     <CardControlSkeleton />
  //   );
    return  (
      // <div>Loading resumen...</div>
      <ResumenSkeleton />
    )
  }