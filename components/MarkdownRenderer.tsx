import { marked } from 'marked'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = marked.parse(content, { async: false }) as string

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-brand-accent prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:italic prose-strong:text-gray-900 dark:prose-strong:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-li:text-gray-700 dark:prose-li:text-gray-300 dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}