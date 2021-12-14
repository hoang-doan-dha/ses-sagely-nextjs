import type { NextPage } from "next";
import Head from 'next/head';
import parse from 'html-react-parser';
import { getEmailById, getEmails } from "../../lib/emails";
import { Email } from "../emails";
import { Fragment } from "react";
import axios from "axios";
import { API_URL } from "../../auth";
import { FamilyUser } from "../familyUsers";


interface Path {
  params: {
    id: string
  }
}

const parseIdFromHref = (href: string) => {
  const words = href.split('/');
  // Array ["http:", "", "54.255.38.53:7111", "api", "familyUsers", "1"]
  return words[words.length - 1];
}


export async function getStaticPaths() {
  try {
    const res = await axios.get(`${API_URL}/api/familyUsers`);
    const familyUsers: FamilyUser[] = res.data?.items || [];
    const paths = familyUsers.map<Path>((user: FamilyUser) => {
      return { params: { id: parseIdFromHref(user._href) } }
    });
    // Return a list of possible value for id
    return {
      paths,
      fallback: false
    }
  } catch (error) {
    console.log("🚀 ~ file: [id].tsx ~ line 24 ~ getStaticPaths ~ error", error)
    return {
      paths: [],
      fallback: false
    }
  }
}

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