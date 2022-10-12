import { GetServerSideProps } from "next"
import axios from "../../../../../utils/axios"
import React from "react"
import { UserContent, UserProps } from "../../../../../components/UserContent"

function Followers(data: UserProps) {
  return <UserContent data={data} title={"Followers"} baseUrl={"users/page"} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  type PathParams = {
    page: string
    userId: string
  }
  const { page, userId } = context.params as PathParams

  const response = await axios.get(`/api/user/${userId}/followers`, {
    params: {
      page,
    },
  })
  const data = response.data.data

  return {
    props: { data, totalCount: response.data.totalCount, currentPage: page },
  }
}

export default Followers
