import { getAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authors | World News Blog',
  description: 'Meet the journalists and writers behind World News Blog.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-brand-accent font-semibold text-sm uppercase tracking-widest">
          Our Team
        </span>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
          Meet the Authors
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl mx-auto">
          The journalists and correspondents bringing you the latest world news.
        </p>
      </div>

      {/* Authors Grid */}
      {authors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">
          <p className="text-lg">No authors found. Add some in your Cosmic dashboard.</p>
        </div>
      )}
    </div>
  )
}