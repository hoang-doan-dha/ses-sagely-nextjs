import type { NextPage } from 'next'
import Head from 'next/head'
import useUser from '../lib/useUser'
import styles from '../styles/Home.module.css'
import HomeContent from './components/homeContent'
import Layout from './components/layout'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Home: NextPage = () => {
  const { user } = useUser({
    redirectTo: '/login'
  });


  // It still render the page first then hooking API to check isLoggedIn or not
  if (!user || !user?.isLoggedIn) {
    return (
      <div className="h-screen d-flex align-center justify-center">
        <div className="animate-spin h-5 w-5 mr-3 text-white">
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      </div>
    )
  }

  // return (
  //   <div className="h-screen d-flex align-center justify-center">
  //     <div className="animate-spin h-5 w-5 mr-3 text-white">
  //       <FontAwesomeIcon icon={faSpinner} />
  //     </div>
  //   </div>
  // )

  return (
    <Layout>
      <Head>
        <title>SES Mock - Home</title>
      </Head>
      <HomeContent />
    </Layout>
  )
}

export default Home
