"use client";

import { useEffect } from "react";
import { RefreshCcw, Truck } from "lucide-react";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Keep the UI recoverable without exposing internal error details.
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600"><Truck size={26} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.2em] text-blue-300">Nilai Logistics</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">That page hit a temporary issue.</h1>
        <p className="mt-4 leading-7 text-slate-400">Your shipment details are not affected. Try loading this section again.</p>
        <button type="button" onClick={reset} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950"><RefreshCcw size={16} /> Try again</button>
      </div>
    </main>
  );
}
