import { Email } from './../../emails';
import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from 'next';
import { sessionOptions } from "../../../lib/session";
import { removeEmailById } from '../../../lib/emails';


export default withIronSessionApiRoute(emailRoute, sessionOptions)

async function emailRoute(req: NextApiRequest, res: NextApiResponse<Email | {}>) {
  const user = req.session.user

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      console.log("🚀 ~ file: [id].ts ~ line 21 ~ emailRoute ~ id", id)
      if (!Array.isArray(id)) {
        removeEmailById(id);
        res.status(200).json({ message: 'ok' });
      }
    } catch (error) {
      res.status(500).json(new Error(JSON.stringify(error)));
    }
  } else {
    res.status(405).json({ message: 'Do not support this method.' });
  }
}