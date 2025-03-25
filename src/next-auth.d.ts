import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string,
            name: string,
            tel: string,
            email: string,
            role: string,
            createAt: string,
            token: string
        }
    }
}