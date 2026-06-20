import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GoodLife collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink-800">
        Privacy Policy
      </h1>
      <p className="mt-3 text-sm text-ink-400">Last updated: [Add launch date]</p>

      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          <strong>This is a starter template.</strong> Replace the bracketed
          sections below with your actual practices before publishing, and
          consider having a lawyer review the final version, especially once
          ads or affiliate links are live.
        </p>

        <h2>What We Collect</h2>
        <p>
          When you subscribe to our newsletter, we collect your email
          address through [MailerLite]. When you visit the site, our
          analytics tools (Vercel Analytics, Google Search Console) may
          collect anonymized usage data such as pages visited, device type,
          and approximate location.
        </p>

        <h2>How We Use Your Information</h2>
        <p>
          We use your email to send the newsletter and any free downloads
          you requested. We use analytics data to understand which content
          is useful and improve the site. We do not sell your personal
          information to third parties.
        </p>

        <h2>Cookies</h2>
        <p>
          This site uses cookies for analytics and, once activated,
          advertising. See our{" "}
          <a href="/cookie-policy">Cookie Policy</a> for details.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We use third-party services including [MailerLite] for email,
          [Vercel Analytics] for site analytics, and may use advertising
          partners such as [Mediavine/AdThrive/Google AdSense] once the site
          qualifies for their programs. Each of these services has its own
          privacy policy governing how they handle your data.
        </p>

        <h2>Your Rights</h2>
        <p>
          You can unsubscribe from our newsletter at any time using the link
          at the bottom of any email. To request deletion of your data,
          contact us at [hello@goodlife.com].
        </p>

        <h2>Children&apos;s Privacy</h2>
        <p>
          This site is not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be
          posted on this page with an updated revision date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to [hello@goodlife.com].
        </p>
      </div>
    </div>
  );
}
