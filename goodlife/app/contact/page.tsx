import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with GoodLife.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink-800">
        Get in Touch
      </h1>
      <p className="mt-5 text-lg text-ink-600 leading-relaxed">
        Question, collaboration idea, broken link, or just want to say hi?
        Send a note. A real person reads every one of these.
      </p>

      <div className="mt-8 rounded-2xl border border-clay-100 bg-white p-6">
        <p className="text-ink-700">
          Email:{" "}
          <a
            href="mailto:hello@goodlife.com"
            className="font-semibold text-clay-600 underline hover:text-clay-700"
          >
            hello@goodlife.com
          </a>
        </p>
        <p className="mt-2 text-sm text-ink-400">
          Replace this with your real inbox before launch. A contact form can
          be added later using a service like Formspree or Web3Forms if you
          want one instead of a mailto link.
        </p>
      </div>
    </div>
  );
}
