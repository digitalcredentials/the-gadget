import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
type User = {email: string, password: string}

import fs from 'fs';
 
let users: [User];
try {
  users = JSON.parse(fs.readFileSync('./secrets.json', 'utf8')).users;
} catch (err) {
  console.error('Error reading file:', err);
}

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = users.find(user => user.email === email);
    if (user) {
        return user;
    } else {
        throw Error("user doesn't exist")
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = password === user.password;
 
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});