import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-2 p-8">
      <h1 className="font-gilroy-bold text-2xl text-ink">Page not found</h1>
      <Link href="/" className="font-gilroy text-brand underline">
        Back to builder
      </Link>
    </main>
  );
}
