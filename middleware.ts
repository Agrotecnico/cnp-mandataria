import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"
import { log } from "console"
 
const { auth: middleware } = NextAuth(authConfig)

const publicRoutes= [
  "/",
  "/faq/formulario-08",
  "/faq/compra-venta-vehiculo",
  "/faq/denuncia-de-venta",
  "/faq/dif-gestor-mandatario",
  "/realizar-consulta",
  // "/iniciar-tramite/verificacion-policial",
  // "/iniciar-tramite/cambio-de-radicacion",
  // "/iniciar-tramite/:path+",
  // "/^\/iniciar-tramite\/[\w-]+$/.test(pathname)",
  "/login",
  "/register",
  "/email-verified",
  "/api/auth/signIn",
  "/api/auth/auth",
  "/api/verify-email",
  "/api",
  "/api/upload-query",
  // "/api/auth/providers",
  // "/query",
  "/pruebas"
]

export default middleware((req) => {
  const {nextUrl, auth} = req
  const isLoggedIn= !!auth?.user
  // const account= auth?.user.role === "memberAccount"
  // const verified= auth?.user.role === "memberVerified"
  const polo= auth?.user.role
  const account= polo === "memberAccount"
  const verified= polo === "memberVerified"
  // const isLoggedIn= !account || !verified
  // const isLoggedIn= auth?.user.role == "memberAccount" || auth?.user.role == "memberVerified"
  const isLoggedInx= !account || !verified

  const { pathname } = req.nextUrl

  // Autorizar solo rutas que coinciden con /faq/[slug]

 
  // if (/^\/iniciar-tramite\/[\w-]+$/.test(pathname)) {
    // lógica de autorización aquí
    // return NextResponse.next()
  // }
  // } else {
  //   return NextResponse.redirect(new URL("/login", nextUrl))
  // }





  if (pathname.startsWith('/iniciar-tramite/')) {
    const slug = pathname.replace('/iniciar-tramite/', '')

    // Verificás si el slug cumple alguna condición (ej: pertenece a una lista de slugs permitidos)
    const allowedSlugs = ['cedula-de-posesion', 'cambio-de-radicacion', 'verificacion-policial', 'denuncia-de-venta', 'duplicado-titulo-o-cedula', 'informe-estado-dominio', 'inscripcion-inicial', 'informe-infraccion', 'transferencia-dominio', 'x-Otros']
    if (allowedSlugs.includes(slug)) {
      return NextResponse.next()
    }
  }




  //proteger /dashboard /admin
  if(!publicRoutes.includes(nextUrl.pathname) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return NextResponse.next()

})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};