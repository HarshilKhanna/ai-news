import { formatDistanceToNow } from "date-fns"

export default function ArticleCard({ article }) {
  // Format the date to show as "X days/hours ago"
  const formattedDate = formatDistanceToNow(new Date(article.publishedDate), { addSuffix: true })

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-full flex flex-col">
      {/* Article image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={article.image || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Article content */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex-grow">
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200 line-clamp-2">{article.title}</h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{formattedDate}</p>

          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{article.summary}</p>
        </div>

        <a
          href={article.url}
          className="inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-300 mt-auto"
        >
          Read More
        </a>
      </div>
    </div>
  )
}

