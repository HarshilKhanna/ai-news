"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import ArticleCard from "@/components/ArticleCard"
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const categories = [
    { id: "general", name: "General" },
    { id: "technology", name: "Technology" },
    { id: "sports", name: "Sports" },
    { id: "business", name: "Business" },
    { id: "health", name: "Health" },
    { id: "entertainment", name: "Entertainment" },
  ]

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch(
        `/api/news?category=${selectedCategory}&search=${searchQuery}&limit=12`
      )
      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || "Failed to fetch news")
      }

      setArticles(data.articles)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch news articles",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [selectedCategory, searchQuery])

  return (
    <main className="min-h-screen pb-10">
      <Header
        onSearch={setSearchQuery}
        categories={categories.map(cat => cat.name)}
        selectedCategory={categories.find(cat => cat.id === selectedCategory)?.name || "General"}
        onCategoryChange={(category) => {
          const cat = categories.find(c => c.name === category)
          if (cat) setSelectedCategory(cat.id)
        }}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-8">
          <h1 className="text-3xl font-bold mb-6">Latest News</h1>

          {articles.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}

