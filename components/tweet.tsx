import Avatar from "boring-avatars"
import Link from "next/link"
import { Tweet } from "../pages/user/[userId]/tweets/page/[page]"

type TweetPageProps = {
  tweet: Tweet
  username: string
}

export default function TweetPage({ tweet, username }: TweetPageProps) {
  return (
    <div className="flex px-3 pt-3 pb-2 border-b border-gray-200">
      <div className="mr-4">
        <Link href={`/user/${tweet.user_id}/tweets/page/1`}>
          <a>
            <Avatar
              size={40}
              name={username}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </a>
        </Link>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px]">{username}</h4>
            <span className="text-sm sm:text-[15px] text-right">
              {tweet.CreatedAt.slice(0, 16).replace("T", " ")}
            </span>
          </div>
        </div>

        {tweet.content}

      </div>
    </div>
  )
}
