import Link from "next/link"
import { mockCategories, mockTokens } from "@/lib/mock-data"
import { TokenCard } from "@/components/token-card"
import { FilterBar } from "@/components/filter-bar"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params
  const category = mockCategories.find((c) => c.id === id) || mockCategories[0]

  // In a real app, tokens would be filtered by category
  const categoryTokens = mockTokens.slice(0, 6)

  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/categories" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6">
        <ArrowLeft size={18} />
        Back to Categories
      </Link>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{category.icon}</span>
        <h1 className="text-3xl font-bold text-white">{category.name}</h1>
      </div>
      <p className="text-gray-400 mb-8">
        {category.tokenCount} tokens with {(category.volume24h / 1000).toFixed(0)}K ADA in 24h volume
      </p>

      <div className="mb-6">
        <FilterBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryTokens.map((token) => (
          <TokenCard key={token.id} token={token} />
        ))}
      </div>
    </div>
  )
}
