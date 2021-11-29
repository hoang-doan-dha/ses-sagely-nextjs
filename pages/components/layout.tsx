import Head from "next/head";
import type { NextPage } from 'next'
import Header from "./header";

export const siteTitle = 'Sagely SES Mock'

const Layout: NextPage = ({ children }) => {
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

      <Header/>

      <main className="content-area">
        {children}
      </main>
    </div>
  )
}

export default Layout;