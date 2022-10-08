import Avatar from "boring-avatars"
import { AiOutlineHeart } from "react-icons/ai"
import { Tweet } from "../pages/user/[userId]/tweets"

type TweetPageProps = {
  tweet: Tweet
  username: string
}

export default function TweetPage({ tweet, username }: TweetPageProps) {
  return (
    <div className="flex px-3 pt-3 pb-2 border-b border-gray-200">
      {/* user image */}
      <div className="mr-4">
        <Avatar
          size={40}
          name={username}
          variant="beam"
          colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        />
      </div>
      {/* right side */}
      <div className="flex-1">
        {/* Header */}

        <div className="flex items-center justify-between">
          {/* post user info */}
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px]">{username}</h4>
            <span className="text-sm sm:text-[15px] text-right">
              {tweet.CreatedAt.slice(0, 16).replace("T", " ")}
            </span>
          </div>
        </div>

        {/* post text */}

        {tweet.content}

        {/* post image */}

        {/* icons */}

        <div className="flex justify-between text-gray-500">
          <div className="flex items-center select-none">
            <div className="flex items-center mt-2">
              {true ? (
                <AiOutlineHeart
                  // onClick={likePost}
                  className="hoverEffect text-red-600 hover:bg-red-100 cursor-pointer"
                />
              ) : (
                <AiOutlineHeart
                  // onClick={likePost}
                  className="hoverEffect text-red-600 hover:bg-red-100 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}