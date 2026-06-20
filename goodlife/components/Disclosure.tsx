import Link from "next/link";

export default function Disclosure() {
  return (
    <p className="text-xs text-ink-400 italic border-l-2 border-clay-200 pl-3 my-6">
      This post may contain affiliate links. If you click through and make a
      purchase, GoodLife may earn a small commission at no extra cost to you.
      Full details on the{" "}
      <Link href="/disclosure" className="underline hover:text-clay-600">
        disclosure page
      </Link>
      .
    </p>
  );
}
