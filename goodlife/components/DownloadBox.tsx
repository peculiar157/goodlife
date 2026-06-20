export default function DownloadBox({
  fileUrl,
  label,
}: {
  fileUrl: string;
  label: string;
}) {
  return (
    <div className="my-8 rounded-2xl border border-sage-200 bg-sage-50 p-6 text-center">
      <p className="font-serif text-lg font-semibold text-ink-800">
        Your free download is ready
      </p>
      <p className="mt-1 text-sm text-ink-500">
        Print it, save it, share it. It&apos;s yours.
      </p>
      <a
        href={fileUrl}
        download
        className="mt-4 inline-flex items-center justify-center rounded-full bg-sage-500 px-6 py-3 font-semibold text-white hover:bg-sage-600 transition-colors"
      >
        {label}
      </a>
    </div>
  );
}
