import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind GoodLife, and the kind of corner of the internet we're trying to build.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-serif text-4xl font-semibold text-ink-800">
        About GoodLife
      </h1>

      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          GoodLife started the way most good things start. Quietly, on a
          regular Tuesday, with no big plan attached to it.
        </p>
        <p>
          I was not in crisis. I was not falling apart. I was just tired in
          that specific way where everything on paper looks fine and
          something underneath it does not feel fine at all. I started
          saving quotes that said what I had not figured out how to say
          myself. I started coloring pages meant for my kid after she went
          to bed. I started noticing my horoscope a little too closely on
          weeks that felt heavy.
        </p>
        <p>
          None of it fixed anything overnight. But it helped. And the
          helping added up slowly, the way most real change does.
        </p>
        <p>
          This site is everything I wish I had found in one place back
          then: mindfulness that does not ask you to overhaul your life,
          quotes that earn their spot instead of just filling space, zodiac
          content with a little wink in it, and free printables for the
          nights you need your hands busy and your mind quiet.
        </p>
        <p>
          There is no guru voice here. No five-step transformation plan. Just
          someone who figured out a few things that actually helped, writing
          them down for whoever needs them next.
        </p>
        <p>If that is you tonight, I am glad you found this.</p>
      </div>
    </div>
  );
}
