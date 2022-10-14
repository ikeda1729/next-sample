import Avatar from "boring-avatars"
import { GetServerSideProps } from "next"
import axios from "../../../../../utils/axios"
import TweetPage from "../../../../../components/tweet"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import Link from "next/link"
import Pagnation from "../../../../../components/pagination"
import { PAGE_SIZE } from "../../../../../utils/pagesize"
import NoContent from "../../../../../components/NoContent"

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
  totalCount: number
  currentPage: number
}

function UserTweets(data: TweetsProps) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [followings, setFollowings] = useState(0)
  const [followers, setFollowers] = useState(0)
  const [isMe, setIsMe] = useState(false)
  const router = useRouter()
  const cookies = parseCookies()
  const { userId } = router.query

  useEffect(() => {
    ;(async () => {
      if (cookies.jwt) {
        // loginしていたらIsFollowingを計算
        const response = await axios.get(`/api/user/${userId}/isFollowing`, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
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
    ;(async () => {
      let response = await axios.get(`/api/user/${userId}/followings`)
      setFollowings(response.data.totalCount)
      response = await axios.get(`/api/user/${userId}/followers`)
      setFollowers(response.data.totalCount)
      setIsMe(cookies.userId == userId)
    })()
  }, [userId])

  async function follow() {
    const { userId } = router.query
    await axios.post(`/api/relation/${userId}`, JSON.stringify({}), {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
    setIsFollowing(true)
  }

  async function unfollow() {
    const { userId } = router.query
    await axios.delete(`/api/relation/${userId}`, {
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
    setIsFollowing(false)
  }

  if (data.data.username != "") {
    return (
      <>
        <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
          <div className="flex flex-col py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200">
            {!isMe && // 自分のページではfollowボタンを出さない
              (isFollowing ? ( // followしていたらunfollowボタン
                <button
                  className="absolute right-0 mt-4 mr-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={unfollow}
                >
                  Unfollow
                </button>
              ) : (
                // followしていなかったらfollowボタン
                <button
                  className="absolute right-0 mt-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={follow}
                >
                  Follow
                </button>
              ))}
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
              <Link href={`/user/${userId}/followings/page/1`}>
                <a>
                  <div className="mr-2">
                    <span className="font-bold">{followings}</span> Following
                  </div>
                </a>
              </Link>
              <Link href={`/user/${userId}/followers/page/1`}>
                <a>
                  <div>
                    <span className="font-bold">{followers}</span> Followers
                  </div>
                </a>
              </Link>
            </div>
          </div>
          {data.data.tweets.map((tweet) => {
            return <TweetPage key={tweet.ID} tweet={tweet} username={data.data.username} />
          })}
          {data.totalCount == 0 && <NoContent content={"No tweet yet"} />}
        </div>
        <Pagnation
          totalCount={data.totalCount}
          currentPage={data.currentPage}
          baseUrl={`/user/${userId}/tweets/page/`}
        />
      </>
    )
  } else
    return (
      <div className="flex items-center justify-center text-3xl mt-4">User does not exist.</div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  type PathParams = {
    userId: string
    page: string
  }

  const { userId, page } = context.params as PathParams

  const response = await axios.get(`/api/user/${userId}/tweet`, {
    params: {
      page,
      page_size: PAGE_SIZE,
    },
  })
  const data = response.data.data

  return {
    props: { data, totalCount: response.data.totalCount, currentPage: page },
  }
}

export default UserTweets
