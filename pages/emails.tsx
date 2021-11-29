import type { NextPage } from "next";
import { getEmails } from "../lib/emails";
import Link from "next/link";
import Head from "next/head";
import Layout from "./components/layout";

export interface Email {
  filename: string,
  stat: {
    size: number,
    ctime: Date,
    birthtime: Date
  }
}

export async function getStaticProps() {
  // Fetch necessary data
  const emails = getEmails();
  console.log("🚀 ~ file: emails.tsx ~ line 9 ~ getStaticProps ~ emails", emails)
  return {
    props: {
      emails
    }
  }
}

type Props = {
  emails: Email[]
};

const EmailItem: React.FC<{ file: Email }> = ({ file }) => {
  return (
    <>
      <div>
        <Link href={`/emails/${file.filename}`} >
          <a className="text-xl font-heading" target="_blank" rel="noopener noreferrer">
            <div>
              Email UUID: {file.filename}
            </div>
          </a>
        </Link>
        <div>
          Created Date: {file.stat?.ctime}
        </div>
      </div>
      <button className="rounded-lg bg-red-400 hover:bg-red-700 px-4">
        DELETE
      </button>
    </>
  )
}

const Emails: NextPage<Props> = ({ emails }) => {
  console.log("🚀 ~ file: emails.tsx ~ line 19 ~ emails", emails)
  return (
    <Layout>
      <Head>
        <title>SES Mock - Emails</title>
      </Head>
      <div className="bg-gray-300 min-h-full w-full p-4">
        <h1 className="font-semibold">
          THE LIST OF EMAILS
        </h1>
        <ul>
          {emails && emails.map((item: any) => 
            <li key={item.filename} className="py-4 px-8 mx-4 mb-2 lg:mx-32 bg-white shadow-lg rounded-lg flex justify-between">
              <EmailItem file={item} />
            </li>)
          }
        </ul>
      </div>
    </Layout>
  )
}

export default Emails;