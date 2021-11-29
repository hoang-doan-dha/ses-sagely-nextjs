import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../lib/session'
import { User } from './login'


export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  res.json({ isLoggedIn: false, payload: {}, token: '' })
};