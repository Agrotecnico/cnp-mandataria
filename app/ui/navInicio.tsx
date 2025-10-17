
import UserButtonHeader from '@/app/ui/user-button-header';
import { User } from '@/app/lib/definitions';


export default function NavInicio( { user }: { user: User | undefined }  ) {

  return (
    <div className="w-ful fixed inset-x-0 top-0  z-20 bg-[#39507f] ">
      <header className=" mt-0px h-18 relative mx-auto h-[68px] bg-transparent transition-colors duration-200  sm:h-20">
        <nav className=" text-small-regular mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4 text-white transition-colors duration-200 sm:px-6">
          <div className="flex w-full items-center justify-end min-[1100px]:mr-0">
            <UserButtonHeader user={user} />
          </div>
        </nav>
      </header>
    </div>
  );
}
