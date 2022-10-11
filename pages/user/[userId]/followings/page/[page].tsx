import { GetServerSideProps } from "next"
import axios from "../../../../../utils/axios"
import UserPage from "../../../../../components/user"
import React from "react"
import Pagnation from "../../../../../components/pagination"
import { UserProps } from "../../../../users/page/[page]"
import NoContent from "../../../../../components/NoContent"

function Followings(data: UserProps) {
  return (
    <>
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        <div className="flex flex-col py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 text-3xl">
          Followings
        </div>
        <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
          {data.data.map((user) => {
            return <UserPage key={user.ID} user={user} />
          })}
          {data.totalCount == 0 && <NoContent content={"No followings yet"} />}
        </div>
      </div>
      <Pagnation
        totalCount={data.totalCount}
        currentPage={data.currentPage}
        baseUrl={"/users/page/"}
      />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  type PathParams = {
    page: string
    userId: string
  }
  const { page, userId } = context.params as PathParams

  const response = await axios.get(`/api/user/${userId}/followings`, {
    params: {
      page,
    },
  })
  const data = response.data.data

  return {
    props: { data, totalCount: response.data.totalCount, currentPage: page },
  }
}

export default Followings
