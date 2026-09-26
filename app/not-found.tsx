import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600"><Truck size={26} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-blue-300">404 / Not found</p>
        <h1 className="mt-3 text-3xl font-black">This route does not exist.</h1>
        <p className="mt-4 leading-7 text-slate-400">Return to the logistics planning desk and start from the shipment overview.</p>
        <Link href="/" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950"><ArrowLeft size={16} /> Back to home</Link>
      </div>
    </main>
  );
}
