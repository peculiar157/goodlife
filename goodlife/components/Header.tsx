import Link from "next/link";
import { categories, siteConfig } from "@/lib/config";

export default function Header() {
  return (
    <header className="border-b border-clay-100 bg-cream-50/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="font-serif text-2xl font-semibold text-ink-800 tracking-tight">
            {siteConfig.name}
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[15px] font-medium text-ink-600">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="hover:text-clay-600 transition-colors"
              >
                {cat.shortName}
              </Link>
            ))}
            <Link href="/about" className="hover:text-clay-600 transition-colors">
              About
            </Link>
          </nav>

          <Link
            href="/#newsletter"
            className="hidden md:inline-flex items-center rounded-full bg-clay-500 px-4 py-2 text-sm font-semibold text-white hover:bg-clay-600 transition-colors"
          >
            Join the list
          </Link>

          {/* Mobile nav: simple horizontal scroll row beneath, kept in header for no-JS reliability */}
        </div>

        <nav className="md:hidden flex gap-5 overflow-x-auto pb-3 text-sm font-medium text-ink-600 -mx-5 px-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="whitespace-nowrap hover:text-clay-600 transition-colors"
            >
              {cat.shortName}
            </Link>
          ))}
          <Link href="/about" className="whitespace-nowrap hover:text-clay-600 transition-colors">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
