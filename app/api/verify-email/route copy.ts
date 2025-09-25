// import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { fetchToken, fetchUserByIdentifier } from "@/app/lib/data";
import { updateUserEmailVerified, deleteVerification } from "@/app/lib/actions"


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");

  if (!token) {
    return new Response("Token no encontrado", { status: 400 });
  }

  // verificar si existe un token en la base de datos
  const verifyToken = await fetchToken(token);
  // const verifyToken = await db.verificationToken.findFirst({
  //   where: {
  //     token,
  //   },
  // });
  
  if (!verifyToken) {
    return new Response("Token no encontrado", { status: 400 });
  }

  // verificar si el token ya expiró
  if (new Date(verifyToken.expires) < new Date()) {
    return new Response("Token expirado", { status: 400 });
  }

  // verificar si el email ya esta verificado
  const user= await fetchUserByIdentifier(verifyToken.identifier)
  // const user = await db.user.findUnique({
  //   where: {
  //     email: verifyToken.identifier,
  //   },
  // });
  
  if (user?.emailVerified) {
    return new Response("Correo electrónico ya verificado", { status: 400 });
  }

  // marcar el email como verificado
  const identifier= verifyToken.identifier
  await updateUserEmailVerified(identifier)
  // await db.user.update({
  //   where: {
  //     email: verifyToken.identifier,
  //   },
  //   data: {
  //     emailVerified: new Date(),
  //   },
  // });

  // eliminar el token
  await deleteVerification(identifier)
  // await db.verificationToken.delete({
  //   where: {
  //     identifier: verifyToken.identifier,
  //   },
  // });

  // return Response.json({ token });
  // redirect("/login?verified=true");
  redirect('/realizar-consulta');

}
