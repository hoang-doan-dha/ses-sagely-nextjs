import type { NextPage } from "next";
import Head from "next/head";
import Layout from "./components/layout";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { API_URL } from "../auth";
import Link from "next/link";


export interface FamilyUser {
  lastName: string,
  verified: string,
  invited: string,
  active: string,
  bounced: string,
  firstName: string,
  phone: string,
  invitedDate: Date,
  email: string,
  _rev: string,
  _href: string,
  contentType: string,
  photo: {
    _href: string
  },
  relationships: {
    _href: string
  },
  messages: {
    _href: string
  }
};


export async function getStaticProps() {
  // Fetch necessary data
  try {
    const res = await axios.get(`${API_URL}/api/familyUsers`);
    return {
      props: {
        familyUsers: res.data?.items
      }
    }
  } catch (error) {
    console.log("🚀 ~ file: familyUsers.tsx ~ line 40 ~ getStaticProps ~ error", error)
    return {
      props: {
        error: JSON.parse(JSON.stringify(error))
      }
    }
  }
  // // const familyUsers = [];
  // console.log("🚀 ~ file: familyUsers.tsx ~ line 39 ~ getStaticProps ~ familyUsers", familyUsers)
  // return {
  //   props: {
  //     familyUsers
  //   }
  // }
}

type Props = {
  familyUsers: FamilyUser[]
  error: {
    config: any,
    message: string,
    name: string,
    stack: string,
    status: number
  }
};

const parseIdFromHref = (href: string) => {
  const words = href.split('/');
  // Array ["http:", "", "54.255.38.53:7111", "api", "familyUsers", "1"]
  return '/familyUsers/' + words[words.length - 1];
}

const FamilyUserItem: React.FC<{ familyUser: FamilyUser }> = ({ familyUser }) => {


  return (
    <>
      <Link href={parseIdFromHref(familyUser._href)} passHref>
        <div className="rounded-md bg-white flex justify-between items-center py-2 px-4 mb-2 group hover:bg-gray-200">
          <div>
            <div className="font-semibold text-lg text-indigo-600">{familyUser.firstName} {familyUser.lastName}</div>
            <div className="truncate max-w-xs">{familyUser.email}</div>
          </div>
          {familyUser.verified &&
          <div className="flex items-center">
            <div className="rounded-lg bg-green-500 text-white p-2">
              VERIFIED
            </div>
          </div>
          }
        </div>
      </Link>
    </>
  )
}


const FamilyUsers: NextPage<Props> = ({ familyUsers = [], error }) => {
  // const [mails, setMails] = useState(emails);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Call this function whenever you want to
  // refresh props!
  const refreshData = () => {
    router.replace(router.asPath);
  }

  const getFilteredData = function () {
    let results = [];
    if (familyUsers.length) {
      const regex = new RegExp(searchTerm, 'i');
      for (let i = 0; i < familyUsers.length; i++) {
        const fullName = familyUsers[i].firstName + ' ' + familyUsers[i].lastName;
        if (regex.test(fullName)) {
          results.push(familyUsers[i]);
        } else if (regex.test(familyUsers[i].email)) {
          results.push(familyUsers[i]);
        }
      }
    }
    return results;
  };

  // const handleDelete = async (filename: string) => {
  //   try {
  //     const data = await axios.delete(`api/emails/${filename}`);
  //     if (data.status === 200) {
  //       refreshData();
  //     }
  //   } catch (error) {
  //     console.log("🚀 ~ file: emails.tsx ~ line 35 ~ handleDelete ~ error", error)
  //     alert(JSON.stringify(error, null, 2));
  //   }
  // }

  return (
    <Layout>
      <Head>
        <title>SES Mock - Family Users</title>
      </Head>
      <div className="bg-gray-300 min-h-full w-full p-4 flex justify-center">
        {error && error.status === 401 &&
          <div className="text-red-600 font-bold">No permissions. Please use the sagely support account</div>
        }
        <div className="w-3/4">
          <div className="w-full mb-2">
            <input
              className="focus:ring-2 focus:ring-blue-600 w-full p-3 rounded-md"
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter name or email"
            />
          </div>
          {
            getFilteredData().map((user) => <FamilyUserItem key={user._href} familyUser={user} />)
          }
        </div>

      </div>
    </Layout>
  )
}

export default FamilyUsers;