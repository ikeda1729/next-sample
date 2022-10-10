// import axios from "../utils/axios"
import TweetPage from "../components/tweet"
import { useEffect } from "react"
import axios from "../utils/axios"
import useSWR from 'swr'

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
  const { data, error } = useSWR('api/tweet/timeline', axios)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  console.log(data.data.data)

  return (
    <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
      {data.data.data.map((x: Tweetprops) => {
        return <TweetPage key={x.Tweet.ID} tweet={x.Tweet} username={x.Username} />
        return <>hello</>
      })}
    </div>
  )
}


export default Timeline