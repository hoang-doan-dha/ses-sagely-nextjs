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



// export async function getStaticPaths() {
//   const emails = getEmails();
//   if (Array.isArray(emails)) {
//     const paths = emails.map<Path>((item: Email) => {
//       return { params: { id: item.filename } }
//     })
//     console.log("🚀 ~ file: [id].tsx ~ line 17 ~ getStaticPaths ~ paths", paths)
//     // Return a list of possible value for id
//     return {
//       paths,
//       fallback: false
//     }
//   }
// }

// Get external data from the file system, API, DB, etc.
export async function getStaticProps({ params }: Path) {
  // Fetch necessary data for the blog post using params.id
  return {
    props: {
      
    }
  }
}

const FamilyUserDetail: NextPage<{}> = ({ }) => {
  return (
    <Fragment>
      <Head>
        <title>FamilyUserDetail</title>
      </Head>
      <Fragment>
        <div>FamilyUserDetail</div>
      </Fragment>
    </Fragment>
  )
}

export default FamilyUserDetail;