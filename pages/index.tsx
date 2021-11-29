import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import HomeContent from './components/homeContent'
import Layout from './components/layout'

const Home: NextPage = () => {
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
