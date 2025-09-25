import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { z } from 'zod';
import  authConfig  from './auth.config';
import { fetchUserById, fetchVerificationToken } from "@/app/lib/data";
import type { User } from '@/app/lib/definitions';
import { deleteVerificationToken, createVerificationToken } from '@/app/lib/actions';
import { nanoid } from "nanoid";

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

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("email: ", email)
          console.log("password: ", password)
          const user = await fetchUserById(email);
          if (!user) return null;
          // console.log("userxxx: ", user)
          const passwordsMatch = await bcrypt.compare(password, `${user.password}`);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;
      },

      // authorize: async (credentials) => {
      //   const parsedCredentials = z
      //     // .object({ email: z.string().email(), password: z.string().min(6) })
      //     .object({ email: z.string().email(), password: z.string().min(3) })
      //     .safeParse(credentials);

      //   if (!parsedCredentials.success) {
      //     throw new Error("Invalid credentials");
      //   }
 
      //   // verificar si existe el usuario en la base de datos
      //   const { email, password } = parsedCredentials.data;
      //   const user = await fetchUserById(email);

      //   if (!user || !user.password) {
      //     throw new Error("No user found")
      //   }

      //   // verificar si la contraseña es correcta
      //   const isValid = await bcrypt.compare(password, user.password);

      //   if (!isValid) {
      //     throw new Error("Incorrect password");
      //   }

      //   // verificación de email
      //   // if (!user.email_verified) {
      //   //   const verifyTokenExits = await fetchVerificationToken(email);

      //     // si existe un token, lo eliminamos
      //     // if (verifyTokenExits?.identifier) {
      //     //   await deleteVerificationToken(email)
      //     // }

      //     // const token = nanoid();
      //     // const data = new FormData();

      //     // await createVerificationToken(email, token);

      //     // enviar email de verificación
      //     // await sendEmailVerification(user.email, token);
      //     // await emailVerification(user.email, token);

      //   //   throw new Error("Por favor, revisa el correo electrónico y envía la verificación.");
      //   // }
 
      //   return user
      // },

    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    // jwt() se ejecuta cada vez que se crea o actualiza un token JWT.
    // Aquí es donde puedes agregar información adicional al token.
    jwt({ token, user }) {

      if (user) {
        token.role = user.role;
      }
      return token;
    },
    // session() se utiliza para agregar la información del token a la sesión del usuario,
    // lo que hace que esté disponible en el cliente.
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});