import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-clay-100 bg-cream-100 mt-20">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="font-serif text-xl font-semibold text-ink-800">{siteConfig.name}</p>
            <p className="mt-2 text-sm text-ink-500 leading-relaxed">
              A calmer corner of the internet. Mindfulness, quotes, zodiac
              musings, and free printables for whoever needs them tonight.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-700 mb-3">Explore</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li><Link href="/self-mindfulness" className="hover:text-clay-600">Self & Mindfulness</Link></li>
              <li><Link href="/quotes" className="hover:text-clay-600">Quotes</Link></li>
              <li><Link href="/zodiac" className="hover:text-clay-600">Zodiac & Horoscope</Link></li>
              <li><Link href="/coloring-pages" className="hover:text-clay-600">Coloring Pages</Link></li>
              <li><Link href="/printables-planners" className="hover:text-clay-600">Printables & Planners</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink-700 mb-3">Site</p>
            <ul className="space-y-2 text-sm text-ink-500">
              <li><Link href="/about" className="hover:text-clay-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-clay-600">Contact</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-clay-600">Privacy Policy</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-clay-600">Cookie Policy</Link></li>
              <li><Link href="/disclosure" className="hover:text-clay-600">Disclosure</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-clay-200/60 text-xs text-ink-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p>Made slowly, on purpose.</p>
        </div>
      </div>
    </footer>
  );
}
