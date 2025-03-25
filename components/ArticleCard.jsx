import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { SummaryDialog } from "./SummaryDialog"

export default function ArticleCard({ article }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState(null)
  const { toast } = useToast()

  // Format the date to show as "X days/hours ago"
  const formattedDate = formatDistanceToNow(new Date(article.publishDate), { addSuffix: true })

  const handleSummarize = async () => {
    try {
      setIsLoading(true)
      console.log('Sending summarize request for:', article.sourceUrl);
      
      // Get the best available content
      const content = article.summary || article.description || article.content;
      if (!content) {
        throw new Error('No content available to summarize');
      }

      console.log('Content length:', content.length);
      
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articleUrl: article.sourceUrl,
          articleContent: content
        }),
      })

      const data = await response.json()
      console.log('Received response:', data);

      if (!response.ok) {
        throw new Error(data.error || data.message || `HTTP error! status: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to summarize article')
      }

      setSummary(data.summary)
      setShowSummary(true)
      toast({
        title: "Success",
        description: "Article summarized successfully!",
      })
    } catch (error) {
      console.error('Error in handleSummarize:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to summarize article. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 h-full flex flex-col">
        {/* Article image */}
        <div className="relative w-full h-[300px] overflow-hidden rounded-t-lg">
          <Image
            src={article.imageUrl || '/placeholder.jpg'}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Article content */}
        <div className="p-5 flex-grow flex flex-col">
          <div className="flex-grow">
            <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100 line-clamp-2">{article.title}</h2>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span>{formattedDate}</span>
              <span>•</span>
              <span>{article.source}</span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {article.summary}
            </p>
          </div>

          <div className="flex gap-2 mt-auto">
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-block bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors duration-300"
            >
              Read More
            </a>
            <button
              onClick={handleSummarize}
              disabled={isLoading}
              className="flex-1 inline-block bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg text-center transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Summarizing..." : "Summarize"}
            </button>
          </div>
        </div>
      </div>

      {summary && (
        <SummaryDialog
          isOpen={showSummary}
          onClose={() => setShowSummary(false)}
          article={article}
          summary={summary}
        />
      )}
    </>
  )
}

