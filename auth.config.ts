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
  ],
} satisfies NextAuthConfig;