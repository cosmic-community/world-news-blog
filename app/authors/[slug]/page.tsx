// app/authors/[slug]/page.tsx
import { getAuthorBySlug, getPostsByAuthor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    return { title: 'Author Not Found' }
  }

  return {
    title: `${author.metadata?.name || author.title} | World News Blog`,
    description: author.metadata?.bio || `Articles by ${author.title}`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const avatar = author.metadata?.avatar
  const name = author.metadata?.name || author.title
  const bio = author.metadata?.bio

  return (
    <div>
      {/* Author Header */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <Link href="/" className="hover:text-brand-accent transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/authors" className="hover:text-brand-accent transition-colors">
              Authors
            </Link>
            <span>/</span>
            <span className="text-gray-400 dark:text-gray-500">{name}</span>
          </nav>

          {/* Avatar */}
          {avatar ? (
            <img
              src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover mx-auto mb-6 ring-4 ring-white dark:ring-gray-800 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mx-auto mb-6 flex items-center justify-center text-5xl shadow-lg">
              ✍️
            </div>
          )}

          {/* Name */}
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
            {name}
          </h1>

          {/* Bio */}
          {bio && (
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
              {bio}
            </p>
          )}

          <p className="text-gray-400 dark:text-gray-500 text-sm mt-4">
            {posts.length} article{posts.length !== 1 ? 's' : ''} published
          </p>
        </div>
      </section>

      {/* Author's Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
          Articles by {name}
        </h2>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <span className="text-5xl mb-4 block">📭</span>
            <p className="text-lg">No articles by this author yet.</p>
            <Link href="/" className="text-brand-accent font-medium mt-3 inline-block hover:underline">
              ← Back to Home
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}