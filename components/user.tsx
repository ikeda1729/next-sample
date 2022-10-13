import Avatar from "boring-avatars"
import Link from "next/link"
import { User } from "./UserContent"

type UserProps = {
  user: User
}

export default function UserPage({ user }: UserProps) {
  return (
    <div key={user.ID} className="relative flex px-4 pt-3 pb-2 border-b border-gray-200">
      <div className="mr-5">
        <Link href={`/user/${user.ID}/tweets/page/1`}>
          <a>
            <Avatar
              size={39}
              name={user.Username}
              variant="beam"
              colors={["#91A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          </a>
        </Link>
      </div>
      <div className="flex-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 whitespace-nowrap">
            <Link href={`/user/${user.ID}/tweets/page/1`}>
              <a className="font-bold text-[15px] sm:text-[16px]">{user.Username}</a>
            </Link>
            <span className="text-sm sm:text-[14px] text-right">
              Created at: {user.CreatedAt.slice(0, 16).replace("T", " ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
