import Link from 'next/link'
import type { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = post.metadata?.content || ''
  const excerpt = content.replace(/^#.*\n\n?/gm, '').replace(/[#*>\-\[\]`]/g, '').trim().substring(0, 150) + '...'

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <Link href={`/posts/${post.slug}`} className="block overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={225}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-52 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        {category && (
          <div className="mb-3">
            <CategoryBadge name={category.metadata?.name || category.title} slug={category.slug} />
          </div>
        )}

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug group-hover:text-brand-accent transition-colors line-clamp-2 mb-2">
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 mb-4">
          {excerpt}
        </p>

        {/* Author */}
        {author && (
          <Link
            href={`/authors/${author.slug}`}
            className="flex items-center gap-2 group/author"
          >
            {author.metadata?.avatar ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={author.metadata?.name || author.title}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm">
                ✍️
              </div>
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover/author:text-brand-accent transition-colors">
              {author.metadata?.name || author.title}
            </span>
          </Link>
        )}
      </div>
    </article>
  )
}