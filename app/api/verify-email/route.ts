// import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { fetchToken, fetchUserByIdentifier } from "@/app/lib/data";
import { updateUserEmailVerified, deleteVerification } from "@/app/lib/actions"
import { emailVerified } from "@/app/lib/brevo/email-verified";


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  const page = searchParams.get("page");


  if (!token) {
    return new Response("Token no encontrado", { status: 400 });
  }

  // verificar si existe un token en la base de datos
  const verifyToken = await fetchToken(token);
  
  if (!verifyToken) {
    return new Response("Token no encontrado", { status: 400 });
  }

  // verificar si el token ya expiró
  if (new Date(verifyToken.expires) < new Date()) {
    return new Response("Token expirado", { status: 400 });
  }

  // verificar si el email ya esta verificado
  const user= await fetchUserByIdentifier(verifyToken.identifier)
  
  if (user?.email_verified) {
    return new Response("Correo electrónico ya verificado", { status: 400 });
    // return redirect(`/realizar-consulta?verified=true&name=${user?.name}&email=${user?.email}`);
  }
  // marcar el email como verificado
  const identifier= verifyToken.identifier
  await updateUserEmailVerified(identifier)

  // eliminar el token
  await deleteVerification(identifier)


  // return Response.json({ token });
  // redirect("/login?verified=true");
  redirect(`/email-verified?verified=true&name=${user?.name}&email=${user?.email}&page=${page}`);
  // redirect(`/login?verified=true&name=${user?.name}&email=${user?.email}&page=${page}`);
  // redirect(`${page}?verified=true&role=${user?.role}`);

}
