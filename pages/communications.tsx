import type { NextPage } from "next";
import Head from "next/head";
import { SyntheticEvent, useState } from "react";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";
import Layout from "./components/layout";

interface Output {
  cmd: string,
  code: number,
  killed: boolean,
  signal: any,
  stderr: string,
  stdout: string,
}

const Communications: NextPage = () => {
  const [command, setCommand] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<Output | null>(null);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (isRunning) {
      return;
    }
    setIsRunning(true);
    const res: any = await axios.post('/api/communications', {
      command
    });
    console.log("🚀 ~ file: communications.tsx ~ line 25 ~ handleSubmit ~ res", res)
    if (res.data) {
      setOutput(res.data.response);
    }
    setIsRunning(false);
  }

  return (
    <Layout>
      <Head>
        <title>SES Mock - Communications CLI</title>
      </Head>
      <div className="bg-gray-300 min-h-full w-full p-4 md:p-8 lg:p-16">
        <h1 className="font-extrabold text-indigo-600">
          INPUT *
        </h1>
        <form className="my-4 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="hidden block text-sm font-medium text-gray-700 mb-2">
              Command
            </label>
            <input 
              name="command"
              id="command"
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              required
              placeholder="Enter a command line"
            />
            <div className="absolute top-2 right-0">
              {isRunning &&
                <div className="animate-spin h-5 w-5 mr-3 text-indigo-600">
                  <FontAwesomeIcon icon={faSpinner} />
                </div>
              }
            </div>
          </div>
          <div className="text-sm italic">
            (*) It takes at least 1 minute to run a command. Please be patient.
          </div>
          <button type="submit" className="hidden">Run</button>
        </form>
        <h1 className="font-extrabold text-indigo-600">
          OUTPUT
        </h1>
        <div className="bg-gray-100 rounded relative block w-full px-3 py-2 my-4 min-h-32">
          <pre>
            $ {command && `grunt run-${command}`}
          </pre>
          {output?.stdout &&
            <pre className="break-words whitespace-pre-wrap">
              {output.stdout}
            </pre>
          }
          {output?.stderr &&
            <pre className="break-words whitespace-pre-wrap text-red-700">
              {output.stderr}
            </pre>
          }
          {output &&
            <pre className="break-words whitespace-pre-wrap">
              {JSON.stringify(output)}
            </pre>
          }
        </div>
      </div>
    </Layout>
  )
}

export default Communications;