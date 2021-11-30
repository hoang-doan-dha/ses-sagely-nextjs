import type { NextPage } from "next";
import { getEmails } from "../lib/emails";
import Link from "next/link";
import Head from "next/head";
import Layout from "./components/layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

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
  return {
    props: {
      emails
    }
  }
}

type Props = {
  emails: Email[]
};

const EmailItem: React.FC<{ file: Email, onDelete: Function }> = ({ file, onDelete }) => {

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
      <button onClick={() => onDelete(file.filename)} className="rounded-lg bg-red-400 hover:bg-red-700 px-4">
        DELETE
      </button>
    </>
  )
}

const Emails: NextPage<Props> = ({ emails }) => {
  // const [mails, setMails] = useState(emails);
  const router = useRouter();

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const handleDelete = async (filename: string) => {
    try {
      const data = await axios.delete(`api/emails/${filename}`);
      if (data.status === 200) {
        refreshData();
      }
    } catch (error) {
      console.log("🚀 ~ file: emails.tsx ~ line 35 ~ handleDelete ~ error", error)
      alert(JSON.stringify(error, null, 2));
    }
  }

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
              <EmailItem file={item} onDelete={handleDelete} />
            </li>)
          }
        </ul>
      </div>
    </Layout>
  )
}

export default Emails;