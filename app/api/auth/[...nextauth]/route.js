import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";

import {User} from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    async session({ session }) {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id;
        session.user.name = sessionUser.name;
        session.user.image = sessionUser.image;

    },
    async signIn({ profile }) {
        try {
            await connectToDB()   
            // 계정이 있다면 확인
            const userExists = await User.findOne({ email: profile.email });
            // 계정이 없다면 계정 생성
            if (!userExists) {
                await User.create({
                    email: profile.email,
                    name: profile.name.replace(" ", ""),
                    image: profile.image,
                });
            }


            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
})

export { handler as GET, handler as POST }