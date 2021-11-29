import type { NextPage } from "next";
import Head from 'next/head';
import parse from 'html-react-parser';
import { getEmailById, getEmails } from "../../lib/emails";
import { Email } from "../emails";
import { Fragment } from "react";


interface Path {
  params: {
    id: string
  }
}

interface EmailEml {
  date: Date,
  subject: string,
  headers: object,
  text: string,
  html: string,
  attachments: {
    id: string,
    name: string,
    contentType: string,
    inline: boolean,
    data: Buffer
  }[]
}


export async function getStaticPaths() {
  const emails = getEmails();
  if (Array.isArray(emails)) {
    const paths = emails.map<Path>((item: Email) => {
      return { params: { id: item.filename } }
    })
    console.log("🚀 ~ file: [id].tsx ~ line 17 ~ getStaticPaths ~ paths", paths)
    // Return a list of possible value for id
    return {
      paths,
      fallback: false
    }
  }
}

// Get external data from the file system, API, DB, etc.
export async function getStaticProps({ params }: Path) {
  // Fetch necessary data for the blog post using params.id
  let email: EmailEml | undefined;

  try {
    await getEmailById(params.id, (error: Error, data: Email) => {
      if (error) {
        console.log('error ==', error);
        return {
          error,
          message: 'Error in reading a specified email'
        };
      };
      console.log('getEmailById SUCCESS ===');
      console.log(data); //List of files
      email = JSON.parse(JSON.stringify(data));
    });
    // The value of the `props` key will be
    //  passed to the `Home` component
    return {
      props: {
        email
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: [id].tsx ~ line 50 ~ getStaticProps ~ error", error)
    // Note: With notFound: true the page will return a 404 even if there was a successfully generated page before. 
    // This is meant to support use-cases like user generated content getting removed by its author.
    return {
      notFound: true,
    }
  }
}

const EmailDetail: NextPage<{ email: EmailEml }> = ({ email }) => {
  return (
    <Fragment>
      <Head>
        <title>{email.subject}</title>
      </Head>
      <Fragment>
        {parse(email.html)}
      </Fragment>
    </Fragment>
  )
}

export default EmailDetail;