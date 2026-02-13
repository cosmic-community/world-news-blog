import { getPosts, getCategories } from '@/lib/cosmic'
import HeroPost from '@/components/HeroPost'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { CATEGORY_COLORS } from '@/types'

export default async function HomePage() {
  const posts = await getPosts()
  const categories = await getCategories()

  const heroPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-900 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8">
            <span className="text-brand-accent font-semibold text-sm uppercase tracking-widest">
              Latest News
            </span>
            <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mt-2">
              Today&apos;s Top Story
            </h1>
          </div>

          {/* Hero Post */}
          {heroPost ? (
            <HeroPost post={heroPost} />
          ) : (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              <p className="text-lg">No posts yet. Add some content in your Cosmic dashboard.</p>
            </div>
          )}
        </div>
      </section>

      {/* More Stories */}
      {remainingPosts.length > 0 && (
        <section className="py-12 lg:py-16 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-brand-accent font-semibold text-sm uppercase tracking-widest">
                  More Stories
                </span>
                <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
                  Latest Articles
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-brand-accent font-semibold text-sm uppercase tracking-widest">
                Explore
              </span>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white mt-2">
                Browse by Category
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {categories.map((category) => {
                const bgColor = CATEGORY_COLORS[category.slug] || 'bg-gray-500'
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className={`group relative block ${bgColor} text-white rounded-xl p-8 text-center hover:opacity-90 transition-opacity`}
                  >
                    <h3 className="text-xl font-bold mb-2">
                      {category.metadata?.name || category.title}
                    </h3>
                    {category.metadata?.description && (
                      <p className="text-sm text-white/80 leading-relaxed">
                        {category.metadata.description}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}