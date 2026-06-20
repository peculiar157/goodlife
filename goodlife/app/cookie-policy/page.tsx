import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How GoodLife uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink-800">
        Cookie Policy
      </h1>
      <p className="mt-3 text-sm text-ink-400">Last updated: [Add launch date]</p>

      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          <strong>This is a starter template.</strong> Update it to reflect
          your actual cookie usage, particularly once an ad network is
          active, since most ad networks require specific cookie-consent
          language and a working consent banner.
        </p>

        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files placed on your device when you visit
          a website. They help the site function properly and help us
          understand how visitors use it.
        </p>

        <h2>Cookies We Use</h2>
        <p>
          <strong>Essential cookies:</strong> Required for basic site
          functionality.
        </p>
        <p>
          <strong>Analytics cookies:</strong> Used by Vercel Analytics and
          Google Search Console to understand traffic patterns, anonymized
          where possible.
        </p>
        <p>
          <strong>Advertising cookies:</strong> Once an ad network such as
          [Mediavine/AdThrive/AdSense] is active, this site will use
          advertising cookies to serve relevant ads. This section should be
          updated with that network&apos;s specific cookie disclosure
          language when that happens.
        </p>

        <h2>Managing Cookies</h2>
        <p>
          Most browsers let you control or delete cookies through their
          settings. Blocking cookies may affect how parts of this site
          function.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to [hello@goodlife.com].
        </p>
      </div>
    </div>
  );
}
