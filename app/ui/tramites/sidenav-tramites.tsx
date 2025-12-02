
import NavLinksTramites from '@/app/ui/tramites/nav-links-tramites';
import { getAllTramites } from '@/app/lib/getTramite';


export default async function SideNavTramites() {

  const allTramites = getAllTramites();

  return (
    <NavLinksTramites  allTramites={allTramites} />
  );
}
