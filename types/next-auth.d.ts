import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      role: string | undefined | null | unknown;
    } & DefaultSession['user'];
    role: string | undefined | null | unknown;
    id: string | undefined | null | unknown;
  }

  interface User {
    role: string | undefined | null | unknown;
  }
}
