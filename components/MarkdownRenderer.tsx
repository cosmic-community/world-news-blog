import { marked } from 'marked'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = marked.parse(content, { async: false }) as string

  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-brand-accent prose-blockquote:text-gray-600 prose-blockquote:italic prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}