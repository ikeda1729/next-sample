import UserPage from "../components/user"
import Pagnation from "../components/pagination"
import NoContent from "./NoContent"

export type User = {
  ID: number
  CreatedAt: string
  Username: string
}

export type UserProps = {
  data: User[]
  totalCount: number
  currentPage: number
  title: string
  baseUrl: string
}

export type UserContentProps = {

}

export function UserContent({ data, title, baseUrl }: { data: UserProps, title: string, baseUrl: string }) {
  return (
    <>
      <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
        <div className="flex flex-col py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-200 text-3xl">
          {title}
        </div>
        <div className="border-l border-r border-gray-200 max-w-xl container mx-auto">
          {data.data.map((user) => {
            return <UserPage key={user.ID} user={user} />
          })}
        </div>
        {data.totalCount == 0 &&
          <NoContent content={`No ${title} yet`} />
        }
      </div>
      <Pagnation
        totalCount={data.totalCount}
        currentPage={data.currentPage}
        baseUrl={baseUrl}
      />
    </>
  )
}

