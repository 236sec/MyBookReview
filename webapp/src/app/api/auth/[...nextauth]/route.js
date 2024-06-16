import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { PrismaAdapter } from '@auth/prisma-adapter'
import GitHubProvider from "next-auth/providers/github";
import { redirect } from 'next/dist/server/api-utils'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          if(user.approve == false){
            throw new Error('Your Account not Approved')
          }
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role ? user.role : "member",
          }
        } else {
          throw new Error('Invalid email or password')
        }
      },
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    //   profile(profile) {
    //     console.log(profile)
    //     let userrole;
    //     if(profile.type == "User"){
    //       userrole = "member";
    //     }
    //     if(profile.type == "User"){
    //       userrole = "admin";
    //     }
    //     console.log("User Login : ",userrole);
    //     return {
    //       id: profile.id,
    //       name: profile.name,
    //       email: profile.email,
    //       image: profile.avatar_url,
    //       role: userrole,
    //     }
    //   },
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id
        session.user.role = token.role
        session.user.image = token.picture
      }
      return session
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/profile`
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }