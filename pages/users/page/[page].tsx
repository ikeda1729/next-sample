import { GetServerSideProps } from "next"
import axios from "../../../utils/axios"
import { UserContent, UserProps } from "../../../components/UserContent"

function Users(data: UserProps) {
  return <UserContent data={data} title={"Users"} baseUrl="/users/page/" />
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
