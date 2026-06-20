import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-5xl font-semibold text-ink-800">
        Hmm. Not here.
      </h1>
      <p className="mt-4 text-lg text-ink-600 leading-relaxed">
        This page wandered off somewhere. Let&apos;s get you back to
        something calmer.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-clay-500 px-6 py-3 font-semibold text-white hover:bg-clay-600 transition-colors"
      >
        Back to GoodLife
      </Link>
    </div>
  );
}
