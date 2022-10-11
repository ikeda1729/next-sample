import React from 'react'
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  totalCount: number
  currentPage: number
  baseUrl: string
};

const COUNT_PER_PAGE = 20

export const Pagination = ({ totalCount, currentPage = 1, baseUrl }: Props) => {
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i)
  const pageCount = Math.ceil(totalCount / COUNT_PER_PAGE)

  return (
    <div className="flex justify-center mt-6 mb-6">

      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px">
          <>
            {currentPage > 1 &&
              <li>
                <Link href={`${baseUrl}${currentPage - 1}`}>
                  <a className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                    Previous
                  </a>
                </Link>
              </li>
            }
            {
              range(1, pageCount).map((number, index) => {
                return (
                  // currentPageはハイライトして表示
                  number == currentPage ?
                    <li>
                      <Link href={`${baseUrl}${number}`}>
                        <a aria-current="page" className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                          {number}
                        </a>
                      </Link>
                    </li>
                    :
                    <li>
                      <Link href={`${baseUrl}${number}`}>
                        <a className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                          {number}
                        </a>
                      </Link>
                    </li>
                )
              })
            }
            {currentPage < pageCount &&
              <li>
                {/* 文字列結合になるので * 1する*/}
                <Link href={`${baseUrl}${currentPage * 1 + 1}`}>
                  <a className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer">
                    Next
                  </a>
                </Link>
              </li>
            }
          </>
        </ul>
      </nav>

    </div>
  )
}

export default Pagination