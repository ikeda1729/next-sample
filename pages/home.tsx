// import axios from "../utils/axios"
import TweetPage from "../components/tweet"
import { useEffect, useState } from "react"
import axios from "../utils/axios"
import useSWR from "swr"
import Avatar from "boring-avatars"
import { parseCookies } from "nookies"

export type Tweet = {
  ID: string
  CreatedAt: string
  content: string
  user_id: string
}

export type Tweetprops = {
  Username: string
  Tweet: Tweet
}

function Timeline() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sentData, setSentData] = useState<Tweet[]>([])

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const response = await axios.post(`api/tweet`, JSON.stringify({ content: input }))

    setInput("")
    setSentData((sentData) => [response.data.data, ...sentData])
    setLoading(false)
  }

  const cookies = parseCookies()

  // sentDataの更新とSWRのrevalidateがバッティングするのでrelaidateをオフにする
  const { data, error } = useSWR("api/tweet/timeline", axios, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        <div className="flex  border-b border-gray-200 p-3 space-x-3">
          <Avatar
            size={80}
            name={cookies.username}
            variant="beam"
            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
          />
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700 p-2"
                rows={2}
                placeholder="What's happening?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              ></textarea>
            </div>
          </div>
          <button
            onClick={sendPost}
            disabled={!input.trim()}
            className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
        {sentData.map((tweet: Tweet) => {
          return <TweetPage key={tweet.ID} tweet={tweet} username={cookies.username} />
        })}
        {data.data.data.map((x: Tweetprops) => {
          return <TweetPage key={x.Tweet.ID} tweet={x.Tweet} username={x.Username} />
        })}
      </div>
    </>
  )
}

export default Timeline
