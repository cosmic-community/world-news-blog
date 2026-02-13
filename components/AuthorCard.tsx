import Link from 'next/link'
import type { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const bio = author.metadata?.bio
  const name = author.metadata?.name || author.title

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow duration-300 text-center"
    >
      {/* Avatar */}
      {avatar ? (
        <img
          src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
          alt={name}
          width={100}
          height={100}
          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 ring-4 ring-gray-100 dark:ring-gray-700 group-hover:ring-brand-accent/20 transition-all"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto mb-4 flex items-center justify-center text-3xl">
          ✍️
        </div>
      )}

      {/* Name */}
      <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-brand-accent transition-colors mb-2">
        {name}
      </h3>

      {/* Bio */}
      {bio && (
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
          {bio}
        </p>
      )}
    </Link>
  )
}