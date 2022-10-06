import axios from "../utils/axios"
import { GetServerSideProps } from "next"
import nookies from "nookies"

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
  const cookies = nookies.get(context)

  const response = await axios.get("api/user/profile", {
    headers: {
      "Content-Type": "application/json",
      Authorization: cookies.jwt,
    },
    withCredentials: true,
  })
  const data = response.data.data

  return {
    props: data,
  }
}

export default Blog
