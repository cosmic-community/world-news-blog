// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getPostsByCategory } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import { CATEGORY_COLORS } from '@/types'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found' }
  }

  return {
    title: `${category.metadata?.name || category.title} | World News Blog`,
    description: category.metadata?.description || `Latest news in ${category.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const bgColor = CATEGORY_COLORS[category.slug] || 'bg-gray-500'

  return (
    <div>
      {/* Category Header */}
      <section className={`${bgColor} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/categories" className="hover:text-white transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-white">{category.metadata?.name || category.title}</span>
          </nav>

          <h1 className="text-3xl lg:text-4xl font-extrabold">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="text-white/80 text-lg mt-3 max-w-2xl">
              {category.metadata.description}
            </p>
          )}
          <p className="text-white/60 text-sm mt-4">
            {posts.length} article{posts.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <span className="text-5xl mb-4 block">📭</span>
            <p className="text-lg">No articles in this category yet.</p>
            <Link href="/" className="text-brand-accent font-medium mt-3 inline-block hover:underline">
              ← Back to Home
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}