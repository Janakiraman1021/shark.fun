import Link from "next/link"
import { mockCategories } from "@/lib/mock-data"
import { Layers, ArrowRight } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-2">
        <Layers size={28} className="text-[#9CFFBB]" />
        <h1 className="text-3xl font-bold text-white">Categories</h1>
      </div>
      <p className="text-gray-400 mb-8">Browse tokens by category</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockCategories.map((category) => (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <div className="glass-card rounded-xl p-6 hover:border-[#9CFFBB]/30 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{category.icon}</span>
                <ArrowRight size={20} className="text-gray-500 group-hover:text-[#9CFFBB] transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{category.tokenCount} tokens</span>
                <span className="text-[#9CFFBB]">{(category.volume24h / 1000).toFixed(0)}K ADA vol</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
