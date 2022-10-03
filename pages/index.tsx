import type { NextPage } from "next"
import Head from "next/head"
import LoginPage from "./login"

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NextGoApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <LoginPage/> */}
    </div>
  )
}

export default Home
