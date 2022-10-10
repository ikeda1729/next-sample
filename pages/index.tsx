import type { NextPage } from "next"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import LoginPage from "./login"

export default function Index() {
  const router = useRouter()
  const cookies = parseCookies()
  if (cookies.jwt) {
    router.push("/home")
  } else {
    router.push("/login")
  }
}
