import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { NextApiRequest, NextApiResponse } from 'next';
import { login } from '../../auth';

export type User = {
  payload?: {
    email?: string,
    lastName?: string,
    firstName?: string,
    userType?: string,
    displayName?: string,
  },
  token?: string,
  isLoggedIn?: boolean,
}

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await login(req.body);
    console.log("🚀 ~ file: login.ts ~ line 22 ~ loginRoute ~ userData", userData);

    if (userData) {
      req.session.user = userData.data;
      await req.session.save();
      res.json({
        ...req.session.user,
        isLoggedIn: true,
      })
    } else {
      res.status(500).json({ message: 'User not found.', data: userData });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
    console.log("🚀 ~ file: login.ts ~ line 39 ~ loginRoute ~ error", error)
  }


  // if (req.session.user) {
  //   // in a real world application you might read the user id from the session and then do a database request
  //   // to get more information on the user if needed
  //   res.json({
  //     ...req.session.user,
  //     isLoggedIn: true,
  //   })
  // } else {
  //   res.json({
  //     isLoggedIn: false,
  //     payload: {},
  //     token: '',
  //   })
  // }
}