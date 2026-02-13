import { getCategories, getPosts } from '@/lib/cosmic'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CATEGORY_COLORS } from '@/types'

export const metadata: Metadata = {
  title: 'Categories | World News Blog',
  description: 'Browse world news by category — Politics, Technology, and Climate.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  const posts = await getPosts()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-brand-accent font-semibold text-sm uppercase tracking-widest">
          Explore
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
          All Categories
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl mx-auto">
          Dive into world news organized by topic. Choose a category to read the latest stories.
        </p>
      </div>

      {/* Category Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const bgColor = CATEGORY_COLORS[category.slug] || 'bg-gray-500'
            const categoryPosts = posts.filter(
              (p) => p.metadata?.category?.slug === category.slug
            )

            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className={`group relative block ${bgColor} text-white rounded-2xl p-8 hover:opacity-90 transition-opacity`}
              >
                <div className="mb-4">
                  <span className="text-4xl">
                    {category.slug === 'politics' ? '🏛️' : category.slug === 'technology' ? '💻' : '🌍'}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  {category.metadata?.name || category.title}
                </h2>
                {category.metadata?.description && (
                  <p className="text-white/80 text-sm leading-relaxed mb-4">
                    {category.metadata.description}
                  </p>
                )}
                <div className="flex items-center gap-2 text-sm font-medium text-white/90">
                  <span>{categoryPosts.length} article{categoryPosts.length !== 1 ? 's' : ''}</span>
                  <span>→</span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <p className="text-lg">No categories found. Add some in your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  )
}