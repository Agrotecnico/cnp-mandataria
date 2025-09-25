import { auth } from "auth"
import { SessionProvider } from "next-auth/react"

import CNPMandataria from '@/app/CNP-mandataria';
import { getAllPosts } from '@/app/lib/getPost';
import { fetchUserById } from '@/app/lib/data'; 
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: 'CNPmandataria',
  description:
    "Servicios de asesoramiento y gestión en la compra/venta de vehículos automotor y náutico, transferencia de dominio, cédula de identificación y otros trámites de registros de la propiedad automotor. Podés realizar consultas o iniciar trámites"
  // icons: {icon:"favicon.ico"} ,
}



const allPosts = getAllPosts();

const linkDatos= allPosts.map((linkdato) => {
  return {slug: `${linkdato.slug}`, excerpt: `${linkdato.excerpt}`}
})

export default async function Page() {

  const session = await auth();
  const user = await fetchUserById(session?.user?.email)

  


  return (
    <div className=" w-full h-full min-h-screen">
      <SessionProvider /* basePath={"/auth"} */ session={session}>
        <CNPMandataria  user={user}  linkDatos={linkDatos} />
      </SessionProvider>
    </div>
    
  )
}
