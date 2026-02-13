import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brand-dark text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📰</span>
              <span className="text-lg font-bold text-white">World News</span>
            </div>
            <p className="text-sm leading-relaxed">
              Your source for the latest world news covering politics, technology, and climate. Delivering quality journalism powered by Cosmic.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/authors" className="text-sm hover:text-white transition-colors">
                  Authors
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/politics" className="text-sm hover:text-white transition-colors">
                  🏛️ Politics
                </Link>
              </li>
              <li>
                <Link href="/categories/technology" className="text-sm hover:text-white transition-colors">
                  💻 Technology
                </Link>
              </li>
              <li>
                <Link href="/categories/climate" className="text-sm hover:text-white transition-colors">
                  🌍 Climate
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-sm">
          <p>&copy; {currentYear} World News Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}