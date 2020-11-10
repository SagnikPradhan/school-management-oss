import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import { UserModel } from "server/database/models/user";

const options: InitOptions = {
  debug: true,
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async ({ email, password }) => {
        const user = await UserModel.findOne({ email }, "password");
        if (!user) return null;

        const correctPassword = await user.validatePassword(password);
        if (!correctPassword) return null;

        return { email, name: user.name };
      },
    }),
  ],
};

const NextAuthAPI = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default NextAuthAPI;
