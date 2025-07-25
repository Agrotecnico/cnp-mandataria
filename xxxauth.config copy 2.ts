import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import type { User } from '@/app/lib/definitions';
import postgres from 'postgres';
import { fetchUserById } from "@/app/lib/data";
import { loginSchema } from "@/app/lib/zod"


// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


// async function getUser(email: string): Promise<User | undefined> {
//   try {
//     const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
//     return user[0];
//   } catch (error) {
//     console.error('Failed to fetch user:', error);
//     throw new Error('Failed to fetch user.');
//   }
// }


export default {
  providers: [

    //  Credentials({
    //   authorize: async (credentials) => {
    //     const { data, success } = loginSchema.safeParse(credentials);

    //     if (!success) {
    //       throw new Error("Invalid credentials");
    //     }
 
    //     // verificar si existe el usuario en la base de datos
    //     const user = await db.user.findUnique({
    //       where: {
    //         email: data.email,
    //       },
    //     });


    //     if (!user || !user.password) {
    //       throw new Error("No user found")
    //     }

    //     // verificar si la contraseña es correcta
    //     const isValid = await bcrypt.compare(data.password, user.password);

    //     if (!isValid) {
    //       throw new Error("Incorrect password");
    //     }

    //     // verificación de email
    //     if (!user.emailVerified) {
    //       const verifyTokenExits = await db.verificationToken.findFirst({
    //         where: {
    //           identifier: user.email,
    //         },
    //       });

    //       // si existe un token, lo eliminamos
    //       if (verifyTokenExits?.identifier) {
    //         await db.verificationToken.delete({
    //           where: {
    //             identifier: user.email,
    //           },
    //         });
    //       }

    //       const token = nanoid();

    //       await db.verificationToken.create({
    //         data: {
    //           identifier: user.email,
    //           token,
    //           expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    //         },
    //       });

    //       // enviar email de verificación
    //       await sendEmailVerification(user.email, token);

    //       throw new Error("Por favor, revisa el correo electrónico y envía la verificación.");
    //     }
 
    //     return user
    //   },
    // }),


    // Credentials({
    //   async authorize(credentials) {
    //     const parsedCredentials = z
    //       .object({ email: z.string().email(), password: z.string().min(6) })
    //       .safeParse(credentials);

    //     if (parsedCredentials.success) {
    //       const { email, password } = parsedCredentials.data;

    //       const user = await fetchUserById(email);
    //       if (!user) return null;

    //       const passwordsMatch = await bcrypt.compare(password, `${user.password}`);
    //       if (passwordsMatch) return user;
    //     }

    //     console.log('Invalid credentials');
    //     return null;
    //   },
    // }),


  ],

  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false; // Redirect unauthenticated users to login page
  //     } else if (isLoggedIn) {
  //       return Response.redirect(new URL('/dashboard', nextUrl));
  //     }
  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;