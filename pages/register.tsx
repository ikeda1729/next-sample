import type { FormEvent } from "react"

import { NextPage } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import { setCookie } from "nookies"

import axios from "../utils/axios"

const LoginPage: NextPage = () => {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [errMsg, setErrMsg] = useState("")

  const onSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault()
      if (password != passwordConfirmation) {
        return setErrMsg("Confirm your password")
      }
      const response = await axios.post("/api/user", JSON.stringify({ username, email, password }))
      router.push("/login")
    } catch (err: any) {
      setErrMsg(JSON.stringify(err.response.data.data))
    }
  }

  return (
    <div className="flex flex-col items-center h-screen mt-10">
      {errMsg && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {errMsg}
        </div>
      )}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
        <h2 className="mt-6 text-center text-xl font-bold tracking-tight text-gray-900 mb-6">
          Create a new account
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
            id="username"
            value={username}
            onInput={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            id="email"
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onInput={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="passwordConfirmation"
          >
            Confirm password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm password"
            id="passwordConfirmation"
            type="password"
            value={passwordConfirmation}
            onInput={(e) => setPasswordConfirmation(e.currentTarget.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
