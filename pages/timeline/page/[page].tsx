// import axios from "../utils/axios"
import TweetPage from "../../../components/tweet"
import { useState } from "react"
import axios from "../../../utils/axios"
import useSWR from "swr"
import Avatar from "boring-avatars"
import { parseCookies } from "nookies"
import Pagnation from "../../../components/pagination"
import { useRouter } from "next/router"
import { PAGE_SIZE } from "../../../utils/pagesize"

export type Tweet = {
  ID: string
  CreatedAt: string
  content: string
  user_id: string
  username: string
}

export type Tweetprops = {
  tweets: Tweet[]
  totalCount: number
}

function Timeline() {
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [sentData, setSentData] = useState<Tweet[]>([])
  const router = useRouter()
  let { page } = router.query
  page = page || "1"

  const sendPost = async () => {
    if (loading) return
    setLoading(true)

    const response = await axios.post(`/api/tweet`, JSON.stringify({ content: input }))

    setInput("")
    setSentData((sentData) => [response.data.data, ...sentData])
    setLoading(false)
  }

  const cookies = parseCookies()

  // sentDataの更新とSWRのrevalidateがバッティングするのでrelaidateをオフにする
  const { data, error } = useSWR(`/api/tweet/timeline?page=${page}&page_size=${PAGE_SIZE}`, axios, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        <div className="flex  border-b border-gray-200 p-3 space-x-3 items-end">
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
            className="bg-blue-400 text-white px-4 py-1.5 rounded font-bold shadow-md hover:brightness-95 disabled:opacity-50 h-1/2"
          >
            Tweet
          </button>
        </div>
        {sentData.map((tweet: Tweet) => {
          return <TweetPage key={tweet.ID} tweet={tweet} username={cookies.username} />
        })}
        {data.data.data ? (
          data.data.data.map((tweet: Tweet) => {
            return <TweetPage key={tweet.ID} tweet={tweet} username={tweet.username} />
          })
        ) : (
          <div className="flex px-3 pt-3 pb-2 border-b border-gray-200 text-xl font-bold">
            {sentData.length == 0 ? "No tweet yet" : ""}
          </div>
        )}
      </div>
      <Pagnation
        totalCount={data.data.totalCount}
        currentPage={Number(page)}
        baseUrl={"/timeline/page/"}
      />
    </>
  )
}

export default Timeline
