type NoContentProps = {
  content: string
}

export default function NoContent({ content }: NoContentProps) {
  return (
    <div className="flex px-3 pt-3 pb-2 border-b border-gray-200 text-xl font-bold">{content}</div>
  )
}
