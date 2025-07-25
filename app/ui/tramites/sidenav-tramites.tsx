
import NavLinksTramites from '@/app/ui/tramites/nav-links-tramites';
import { getAllTramites } from '@/app/lib/getTramite';


export default async function SideNavTramites() {

  const allTramites = getAllTramites();

  return (
    <div className="flex h-max flex-col w-[268px] min-w-[268px] max-[900px]:w-full">
      <NavLinksTramites  allTramites={allTramites} />
    </div>
  );
}
