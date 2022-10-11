import { useRouter } from "next/router"
import { parseCookies } from "nookies"

export default function Index() {
  const router = useRouter()
  const isReady = router.isReady

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
