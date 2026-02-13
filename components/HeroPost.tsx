import Link from 'next/link'
import type { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface HeroPostProps {
  post: Post
}

export default function HeroPost({ post }: HeroPostProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = post.metadata?.content || ''
  const excerpt = content.replace(/^#.*\n\n?/gm, '').replace(/[#*>\-\[\]`]/g, '').trim().substring(0, 250) + '...'

  return (
    <article className="relative group">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=700&fit=crop&auto=format,compress`}
              alt={post.title}
              width={600}
              height={350}
              className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-64 lg:h-full bg-gray-100 flex items-center justify-center">
              <span className="text-6xl">📰</span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          {/* Category */}
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
          <Link href={`/posts/${post.slug}`}>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight group-hover:text-brand-accent transition-colors mb-4">
              {post.title}
            </h2>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
            {excerpt}
          </p>

          {/* Author & Read More */}
          <div className="flex items-center justify-between">
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-3 group/author"
              >
                {author.metadata?.avatar ? (
                  <img
                    src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                    alt={author.metadata?.name || author.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    ✍️
                  </div>
                )}
                <div>
                  <span className="block text-sm font-semibold text-gray-900 group-hover/author:text-brand-accent transition-colors">
                    {author.metadata?.name || author.title}
                  </span>
                </div>
              </Link>
            )}

            <Link
              href={`/posts/${post.slug}`}
              className="text-sm font-semibold text-brand-accent hover:underline"
            >
              Read Article →
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}