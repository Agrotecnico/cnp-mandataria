// import { auth } from "auth"
// import { SessionProvider } from "next-auth/react"

import CNPMandataria from '@/app/CNP-mandataria';
import { getAllPosts } from '@/app/lib/getPost';
// import { fetchUserById } from '@/app/lib/data'; 


const allPosts = getAllPosts();

const linkDatos= allPosts.map((linkdato) => {
  return {slug: `${linkdato.slug}`, excerpt: `${linkdato.excerpt}`}
})

export default async function Page() {

  // const session = await auth();
  // const user = await fetchUserById(session?.user?.email)
  const user = {
  id: "123456",
  name: "Mario",
  email: "mario@gmail.com",
  role: 'member',
  password: "456789",
  image: "/customers/Mario.png"
};


  return (
    <div className=" w-full h-full min-h-screen">
      {/* <SessionProvider> */}
        <CNPMandataria /* user={user} */  linkDatos={linkDatos} />
      {/* </SessionProvider> */}
    </div>
    
  )
}
