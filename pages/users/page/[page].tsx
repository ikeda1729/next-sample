import { GetServerSideProps } from "next"
import axios from "../../../utils/axios"
import UserPage from "../../../components/user"
import Pagnation from "../../../components/pagination"

export type User = {
  ID: number
  CreatedAt: string
  Username: string
}

export type UserProps = {
  data: User[]
  totalCount: number
  currentPage: number
}

function Users(data: UserProps) {
  return (
    <>
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        {data.data.map((user) => {
          return <UserPage key={user.ID} user={user} />
        })}
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
  }
  const { page } = context.params as PathParams
  const response = await axios.get("api/user", {
    params: {
      page,
    },
  })
  const data = response.data.data

  return {
    props: { data, totalCount: response.data.totalCount, currentPage: page },
  }
}

export default Users
