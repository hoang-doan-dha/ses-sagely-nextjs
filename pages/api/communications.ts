// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import util from 'util';
const exec = util.promisify(require('child_process').exec);

const AVAILABLE_CLI_LIST = [
  'cognitoCustomMessage',
  'eventSchedule',
  'eventReminder',
  'familyEmailSend',
  'notifyFamilyMessage',
  'notifyResidentMessage',
  'scheduleMessage',
];

type Data = {
  name: string
}

const runCommandLine = async (commandLine: string) => {
  let cli = 'cd ../sagely-communications/ && grunt run-';
  if (!commandLine) return new Error('The command line is empty.');
  if (!AVAILABLE_CLI_LIST.includes(commandLine)) return new Error('The command line is not supported right now. Please try another one.');
  try {
    const endCLI = cli.concat(commandLine);
    const response = await exec(endCLI);
    console.log('stdout:', response.stdout);
    console.log('stderr:', response.stderr);
    return response;
  } catch (error) {
    console.log("🚀 ~ file: communications.js ~ line 29 ~ runCommandLine ~ error", error)
    return error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const user = req.session.user

  if (!user || user.isLoggedIn === false) {
    res.status(401).end()
    return
  }
  
  if (req.method === 'POST') {
    // Process a POST request
    try {
      const response = await runCommandLine(req.body.command); 
      res.status(200).json({ response });
    } catch (error) {
      console.log("🚀 ~ file: communications.ts ~ line 46 ~ error", error)
      res.status(500).json({ error });
    }
  } else {
    // Handle any other HTTP method
    res.status(200).json({ name: 'John Doe' })
  }
}
