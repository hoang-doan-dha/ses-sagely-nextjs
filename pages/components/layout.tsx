import Head from "next/head";
import type { NextPage } from 'next'
import Header from "./header";
import Router from "next/router";
import axios from "axios";

export const siteTitle = 'Sagely SES Mock'

const Layout: NextPage = ({ children }) => {

  const handleLogout = async () => {
    try {
      const res = await axios.get('/api/logout');
      if (res.status === 200) {
        console.log("🚀 ~ file: layout.tsx ~ line 15 ~ handleLogout ~ res", res)
        Router.push('/login');
      }
    } catch (error) {
      alert(JSON.stringify(error, null, 2));
      console.log("🚀 ~ file: index.tsx ~ line 22 ~ handleLogout ~ error", error)
    }
  }

  return (
    <div className="h-full">
      <Head>
        <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header onLogout={handleLogout} />

      <main className="content-area">
        {children}
      </main>
    </div>
  )
}

export default Layout;