import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import useUser from '../lib/useUser'
import styles from '../styles/Home.module.css'
import HomeContent from './components/homeContent'
import Layout from './components/layout'

import Router from 'next/router'


const Home = () => {
  const { user } = useUser({
    redirectTo: '/login'
  });
  console.log("🚀 ~ file: index.tsx ~ line 14 ~ Home ~ user", user)

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
