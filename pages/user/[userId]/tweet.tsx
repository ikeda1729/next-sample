import Avatar from "boring-avatars"
import { AiOutlineHeart } from "react-icons/ai"
import { GetServerSideProps } from "next"
import axios from "../../../utils/axios"
import TweetPage from "../../../components/tweet"

type PathParams = {
  userId: string
}

export type Tweet = {
  ID: string
  CreatedAt: string
  content: string
  user_id: string
}

export type TweetProps = {
  data: {
    username: string
    tweets: Tweet[]
  }
}

function UserTweet(data: TweetProps) {
  if (data.data.username != "") {
    return (
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        <div className="flex flex-col py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          <button
            className="absolute right-0 mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Follow
          </button>
          <div className="mb-4">
            <Avatar
              size={80}
              name={data.data.username}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </div>
          <h2 className="text-lg sm:text-xl font-bold">{data.data.username}</h2>
          <div className="flex">
            <div className="mr-2">
              <span className="font-bold">10</span> Following
            </div>
            <div>
              <span className="font-bold">15</span> Followers
            </div>
          </div>
        </div>
        {data.data.tweets.map((tweet) => {
          return <TweetPage key={tweet.ID} tweet={tweet} username={data.data.username} />
        })}
      </div>
    )
  } else
    return (
      <div className="flex items-center justify-center text-3xl mt-4">User does not exist.</div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId } = context.params as PathParams

  const response = await axios.get(`api/user/${userId}/tweet`, {
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

export default UserTweet
