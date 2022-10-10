import { parseCookies, destroyCookie } from "nookies"
import { useState, useEffect } from "react"
import Avatar from "boring-avatars"
import Link from "next/link"
import axios from "../utils/axios"
import { useRouter } from "next/router"
import type { FormEvent } from "react"

export default function Header() {
  const router = useRouter()
  const cookies = parseCookies()
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (cookies.jwt) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [cookies.jwt])

  const onSignOut = async (event: FormEvent) => {
    event.preventDefault()
    await axios.post("api/auth/logout", "")
    router.push("/")
  }

  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1 items-center">
            <Link href="/">
              <a className="mr-2">
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://free-materials.com/adm/wp-content/uploads/2020/10/logo_03.png"
                  alt=""
                />
              </a>
            </Link>
            <Link href="/">
              <a className="text-2xl">NextGoApp</a>
            </Link>
          </div>
          {isLogin ? (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link href={`user/${cookies.userId}/tweets`}>
                <a>
                  <Avatar
                    size={40}
                    name={cookies.username}
                    variant="beam"
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                </a>
              </Link>
              <div className="leading-5 hidden xl:inline ml-4">
                <h4 className="font-bold">Sined in as</h4>
                <p className="text-gray-500">{cookies.username}</p>
              </div>
              <button
                onClick={onSignOut}
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <Link href="/login">
                <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  Login
                </a>
              </Link>
              <a
                href="#"
                className="ml-8 inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
