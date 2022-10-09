import Avatar from "boring-avatars"
import { GetServerSideProps } from "next"
import axios from "../utils/axios"
import { FormEvent } from "react"
import Link from "next/link"

export type User = {
  ID: number
  CreatedAt: string
  Username: string
}

export type UserProps = {
  data: User[]
}

function Users(data: UserProps) {
  return (
    <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
      {data.data.map((user) => {
        return (
          <div key={user.ID} className="relative flex px-4 pt-3 pb-2 border-b border-gray-200">
            {/* user image */}
            <div className="mr-5">
              <Link href={`user/${user.ID}/tweets`}>
                <a>
                  <Avatar
                    size={39}
                    name={user.Username}
                    variant="beam"
                    colors={["#91A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                  />
                </a>
              </Link>
            </div>
            <div className="flex-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 whitespace-nowrap">
                  <Link href={`user/${user.ID}/tweets`}>
                    <a className="font-bold text-[15px] sm:text-[16px]">{user.Username}</a>
                  </Link>
                  <span className="text-sm sm:text-[14px] text-right">
                    Created at: {user.CreatedAt.slice(0, 16).replace("T", " ")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const response = await axios.get(`api/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  })
  const data = response.data.data

  return {
    props: { data },
  }
}

export default Users
