import { Metadata } from 'next';
import { auth } from 'auth';

import { fetchUserById } from '@/app/lib/data';
import IniciarTramite from '@/app/ui/tramites/iniciar-tramite';
import { getTramiteBySlug } from '@/app/lib/getTramite';
import markdownToHtml from '@/app/lib/markdownToHtml';


export const metadata: Metadata = {
  title: 'Iniciar Trámites',
  description: "Formulario inicio trámites con opción de envío archivos adjuntos"
};

type Params = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Params) {
  const session = await auth();
  const user = await fetchUserById(session?.user?.email)

  const tramiteMd = getTramiteBySlug(params.slug);

  const content = await markdownToHtml(tramiteMd.content || '');


  return (
    <main className="min-h-[93vh] mx-auto w-full max-w-[64rem] flex-auto">
      <div className="mx-auto flex flex-col pb-16 ">
        <div className=" flex flex-col-reverse min-[1024px]:flex-row md:gap-4 md:overflow-hidden ">
          <div className="w-full flex-grow first-line:flex ">
            <IniciarTramite user= {user} tramiteMd= {tramiteMd} content={content} />
          </div>
        </div>
      </div>
    </main>
  );
}
