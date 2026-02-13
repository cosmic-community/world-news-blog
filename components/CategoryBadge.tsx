import Link from 'next/link'
import { CATEGORY_COLORS } from '@/types'

interface CategoryBadgeProps {
  name: string
  slug: string
  linked?: boolean
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ name, slug, linked = true, size = 'sm' }: CategoryBadgeProps) {
  const bgColor = CATEGORY_COLORS[slug] || 'bg-gray-500'
  const sizeClasses = size === 'sm'
    ? 'px-2.5 py-0.5 text-xs'
    : 'px-3 py-1 text-sm'

  const className = `inline-block ${bgColor} text-white font-medium rounded-full ${sizeClasses} transition-opacity hover:opacity-90`

  if (linked) {
    return (
      <Link href={`/categories/${slug}`} className={className}>
        {name}
      </Link>
    )
  }

  return <span className={className}>{name}</span>
}