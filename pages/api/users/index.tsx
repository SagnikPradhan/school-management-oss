import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import initDatabase from "server/database/init";
import { UserModel, UserType } from "server/database/models/user";

const endpoint: NextApiHandler = async (req, res) => {
  await initDatabase();
  const session = await getSession({ req });

  if (session !== null) {
    const email = session.user.email;
    const user = await UserModel.findOne({ email });

    if (user) {
      switch (user.type) {
        case UserType.ROOT:
          res.send(await UserModel.find({}));
          return;

        case UserType.ADMIN:
        case UserType.TEACHER:
          const users = await UserModel.find({ school: user.school });
          res.send({ users });
          return;
      }
    }
  }

  res.statusCode = 403;
  res.statusMessage = "Forbidden";
  res.end();
};

export default endpoint;
