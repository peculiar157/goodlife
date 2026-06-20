import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure",
  description: "GoodLife's affiliate and advertising disclosure.",
};

export default function DisclosurePage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink-800">
        Disclosure
      </h1>

      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          <strong>This is a starter template.</strong> Update it once
          specific affiliate programs or ad networks are active.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          Some posts on GoodLife contain affiliate links. This means that if
          you click a link and make a purchase, we may earn a small
          commission at no additional cost to you. We only recommend
          products or services we genuinely believe in.
        </p>

        <h2>Advertising</h2>
        <p>
          GoodLife may display advertising through networks such as
          [Mediavine/AdThrive/Google AdSense] once the site qualifies for
          their programs. These ads are served by third parties and may use
          cookies to show relevant content, as described in our{" "}
          <a href="/cookie-policy">Cookie Policy</a>.
        </p>

        <h2>Sponsored Content</h2>
        <p>
          If a post is sponsored or includes paid placement, it will be
          clearly marked as such at the top of the post, in compliance with
          FTC guidelines.
        </p>

        <h2>Questions</h2>
        <p>
          Reach out at [hello@goodlife.com] if you have any questions about
          this disclosure.
        </p>
      </div>
    </div>
  );
}
