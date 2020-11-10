import { NextApiHandler } from "next";
import { getSession } from "next-auth/client";
import initDatabase from "server/database/init";
import { UserModel } from "server/database/models/user";

const endpoint: NextApiHandler = async (req, res) => {
  await initDatabase();
  const session = await getSession({ req });

  if (session !== null) {
    const email = session.user.email;
    const user = await UserModel.findOne({ email });

    if (user) res.send(user);
    else {
      res.statusCode = 404;
      res.end();
    }
  }

  res.statusCode = 403;
  res.end();
};

export default endpoint;
