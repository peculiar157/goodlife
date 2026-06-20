/**
 * Placeholder ad slot. Renders nothing visible at launch.
 * Once approved for Mediavine, AdThrive, or AdSense, drop the ad network's
 * script/unit code inside this component and it will appear in every post
 * (in-content) or sidebar (sidebar) without touching post content or templates.
 */
export default function AdSlot({ placement }: { placement: "in-content" | "sidebar" }) {
  return (
    <div
      data-ad-placement={placement}
      className="my-8 hidden"
      aria-hidden="true"
    />
  );
}
