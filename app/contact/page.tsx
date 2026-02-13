import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us - World News Blog',
  description:
    'Get in touch with the World News Blog team. Send us a message and we will get back to you.',
}

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-brand-accent font-semibold text-sm uppercase tracking-widest">
            Get in Touch
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mt-2">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-brand-muted max-w-xl mx-auto">
            Have a story tip, feedback, or a question? Fill out the form below
            and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}