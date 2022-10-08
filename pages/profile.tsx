import axios from "../utils/axios"
import { GetServerSideProps } from "next"

type Data = {
  id: number
  name: string
  email: string
}

function Blog(data: Data) {
  return (
    <>
      <p>{data.id}</p>
      <p>{data.name}</p>
      <p>{data.email}</p>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const response = await axios.get(`/api/user/1/isFollowing`, {
    headers: {
      "Content-Type": "application/json",
      "Cookie": context.req.headers.cookie || "",
    },

    withCredentials: true,
  })
  const data = response.data.data
  console.log(response)

  return {
    props: data,
  }
}

export default Blog
