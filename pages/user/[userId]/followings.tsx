import { GetServerSideProps } from "next"
import axios from "../../../utils/axios"
import UserPage from "../../../components/user"
import React from "react"

type PathParams = {
  userId: string
}

export type User = {
  ID: number
  CreatedAt: string
  Username: string
}

export type UserProps = {
  data: User[]
}

function Followings(data: UserProps) {
  return (
    <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
      {data.data.map((user) => {
        return <UserPage key={user.ID} user={user} />
      })}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as PathParams
  const response = await axios.get(`/api/user/${userId}/followings`)
  const data = response.data.data

  return {
    props: { data },
  }
}

export default Followings
