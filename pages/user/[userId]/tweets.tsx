import Avatar from "boring-avatars"
import { GetServerSideProps } from "next"
import axios from "../../../utils/axios"
import TweetPage from "../../../components/tweet"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"

type PathParams = {
  userId: string
}

export type Tweet = {
  ID: string
  CreatedAt: string
  content: string
  user_id: string
}

export type TweetsProps = {
  data: {
    username: string
    tweets: Tweet[]
  }
}


function UserTweets(data: TweetsProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followings, setFollowings] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [isMe, setIsMe] = useState(false)
  const router = useRouter()
  const cookies = parseCookies()

  useEffect(() => {
    (async () => {
      const { userId } = router.query;

      if (cookies.jwt) { // loginしていたらIsFollowingを計算
        const response = await axios.get(`api/user/${userId}/isFollowing`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
        if (response.data.data.IsFollowing) {
          setIsFollowing(true)
        } else {
          setIsFollowing(false)
        }
      }
    })()
  }, [isFollowing])

  useEffect(() => {
    (async () => {
      const { userId } = router.query;
      let response = await axios.get(`api/user/${userId}/followings`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      setFollowings(response.data.data.length)
      response = await axios.get(`api/user/${userId}/followers`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      setFollowers(response.data.data.length)
      setIsMe(cookies.userId == userId)
    })()
  }, [])

  async function follow() {
    const { userId } = router.query;
    const response = await axios.post(`api/relation/${userId}`, JSON.stringify({}), {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    setIsFollowing(true)
  }

  async function unfollow() {
    const { userId } = router.query;
    const response = await axios.delete(`api/relation/${userId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    setIsFollowing(false)
  }

  if (data.data.username != "") {
    return (
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        <div className="flex flex-col py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
          {!isMe && // 自分のページではfollowボタンを出さない
            (isFollowing ? // followしていたらunfollowボタン
              <button
                className="absolute right-0 mt-4 mr-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={unfollow}
              >
                Unfollow
              </button>
              : // followしていなかったらfollowボタン
              <button
                className="absolute right-0 mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={follow}
              >
                Follow
              </button>)
          }
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
              <span className="font-bold">{followings}</span> Following
            </div>
            <div>
              <span className="font-bold">{followers}</span> Followers
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

  let response = await axios.get(`api/user/${userId}/tweet`, {
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

export default UserTweets