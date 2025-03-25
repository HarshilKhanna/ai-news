"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import ArticleCard from "@/components/ArticleCard"

// Sample news data (in a real app, this would come from an API)
const sampleNews = [
  {
    id: 1,
    title: "New Breakthrough in Renewable Energy Storage",
    summary:
      "Scientists have developed a new type of battery that can store renewable energy for longer periods at a fraction of the cost.",
    image: "/placeholder.svg?height=200&width=400",
    publishedDate: "2025-03-20",
    url: "#",
  },
  {
    id: 2,
    title: "Global Tech Conference Announces Virtual Format",
    summary:
      "The annual Global Tech Summit will be held virtually this year, allowing more participants from around the world to join.",
    image: "/placeholder.svg?height=200&width=400",
    publishedDate: "2025-03-22",
    url: "#",
  },
  {
    id: 3,
    title: "Study Shows Benefits of Four-Day Work Week",
    summary:
      "A new study reveals that companies implementing a four-day work week saw increased productivity and employee satisfaction.",
    image: "/placeholder.svg?height=200&width=400",
    publishedDate: "2025-03-21",
    url: "#",
  },
  {
    id: 4,
    title: "New AI Model Can Predict Weather Patterns with 95% Accuracy",
    summary:
      "Researchers have developed an AI system that can predict extreme weather events up to two weeks in advance.",
    image: "/placeholder.svg?height=200&width=400",
    publishedDate: "2025-03-19",
    url: "#",
  },
  {
    id: 5,
    title: "Major City Announces Carbon-Neutral Plan by 2030",
    summary:
      "The metropolitan government unveiled an ambitious plan to become completely carbon-neutral within the next five years.",
    image: "/placeholder.svg?height=200&width=400",
    publishedDate: "2025-03-18",
    url: "#",
  },
  {
    id: 6,
    title: "New Health Study Links Exercise to Improved Brain Function",
    summary:
      "Regular physical activity has been shown to significantly improve cognitive abilities according to a new long-term study.",
    image: "/placeholder.svg?height=200&width=400",
    publishedDate: "2025-03-17",
    url: "#",
  },
]

// Available categories
const categories = ["All", "Technology", "Business", "Health", "Science", "Entertainment", "Sports"]

export default function Home() {
  const [news, setNews] = useState(sampleNews)
  const [filteredNews, setFilteredNews] = useState(sampleNews)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // In a real app, this would fetch news from an API
  useEffect(() => {
    // Simulating API fetch
    setIsLoading(true)
    setTimeout(() => {
      setNews(sampleNews)
      setFilteredNews(sampleNews)
      setIsLoading(false)
    }, 500)
  }, [])

  // Filter news based on search term and category
  useEffect(() => {
    if (searchTerm || selectedCategory !== "All") {
      const filtered = news.filter((article) => {
        const matchesSearch =
          searchTerm === "" ||
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesCategory = selectedCategory === "All" || article.category === selectedCategory

        return matchesSearch && matchesCategory
      })
      setFilteredNews(filtered)
    } else {
      setFilteredNews(news)
    }
  }, [searchTerm, selectedCategory, news])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  return (
    <main className="min-h-screen pb-10">
      <Header
        onSearch={handleSearch}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 mt-10">{error}</div>
      ) : (
        <div className="container mx-auto px-4 mt-8">
          <h1 className="text-3xl font-bold mb-6">Latest News</h1>

          {filteredNews.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}

