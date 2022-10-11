import type { NextPage } from "next"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import LoginPage from "./login"

export default function Index() {
  const router = useRouter()
  const isReady = router.isReady;

  if (!isReady) {
    return <div>Loading</div>
  }

  const cookies = parseCookies()
  if (cookies.jwt) {
    router.push("/timeline/page/1")
  } else {
    router.push("/login")
  }
}
