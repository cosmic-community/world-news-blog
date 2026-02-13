// app/posts/[slug]/page.tsx
import { getPostBySlug, getPosts } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import CategoryBadge from '@/components/CategoryBadge'
import MarkdownRenderer from '@/components/MarkdownRenderer'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const content = post.metadata?.content || ''
  const description = content.replace(/^#.*\n\n?/gm, '').replace(/[#*>\-\[\]`]/g, '').trim().substring(0, 160)

  return {
    title: `${post.title} | World News Blog`,
    description,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = post.metadata?.content || ''

  // Get related posts (other posts, excluding current)
  const allPosts = await getPosts()
  const relatedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2)

  return (
    <article>
      {/* Hero Image */}
      {featuredImage && (
        <div className="w-full h-64 md:h-96 lg:h-[500px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1600}
            height={900}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-brand-accent transition-colors">
            Home
          </Link>
          <span>/</span>
          {category && (
            <>
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-brand-accent transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-400 dark:text-gray-500 truncate">{post.title}</span>
        </nav>

        {/* Category Badge */}
        {category && (
          <div className="mb-4">
            <CategoryBadge
              name={category.metadata?.name || category.title}
              slug={category.slug}
              size="md"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
          {post.title}
        </h1>

        {/* Author Info */}
        {author && (
          <div className="flex items-center gap-4 pb-8 mb-8 border-b border-gray-200 dark:border-gray-700">
            <Link href={`/authors/${author.slug}`} className="shrink-0">
              {author.metadata?.avatar ? (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata?.name || author.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xl">
                  ✍️
                </div>
              )}
            </Link>
            <div>
              <Link
                href={`/authors/${author.slug}`}
                className="font-semibold text-gray-900 dark:text-white hover:text-brand-accent transition-colors"
              >
                {author.metadata?.name || author.title}
              </Link>
              {author.metadata?.bio && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{author.metadata.bio}</p>
              )}
            </div>
          </div>
        )}

        {/* Article Content */}
        <MarkdownRenderer content={content} />
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-gray-900 py-12 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">More Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => {
                const relImg = relatedPost.metadata?.featured_image
                const relCat = relatedPost.metadata?.category
                return (
                  <Link
                    key={relatedPost.id}
                    href={`/posts/${relatedPost.slug}`}
                    className="group flex gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
                  >
                    {relImg ? (
                      <img
                        src={`${relImg.imgix_url}?w=300&h=200&fit=crop&auto=format,compress`}
                        alt={relatedPost.title}
                        width={150}
                        height={100}
                        className="w-32 h-24 object-cover rounded-lg shrink-0"
                      />
                    ) : (
                      <div className="w-32 h-24 bg-gray-100 dark:bg-gray-700 rounded-lg shrink-0 flex items-center justify-center text-2xl">
                        📰
                      </div>
                    )}
                    <div className="flex flex-col justify-center">
                      {relCat && (
                        <span className="text-xs font-semibold text-brand-accent mb-1">
                          {relCat.metadata?.name || relCat.title}
                        </span>
                      )}
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}