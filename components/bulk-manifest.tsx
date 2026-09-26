"use client";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, CloudUpload, FileSpreadsheet, Link2, Loader2, PackageCheck, ShieldCheck, Store, X } from "lucide-react";
import * as XLSX from "xlsx";
import { useRef, useState } from "react";

type ManifestState = { rows: number; columns: number; blankRows: number };

export default function BulkManifest() {
  const [file, setFile] = useState<File | null>(null), [processing, setProcessing] = useState(false), [done, setDone] = useState(false), [error, setError] = useState(""), [manifest, setManifest] = useState<ManifestState | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handle = async (selectedFile?: File) => {
    if (!selectedFile) return;
    setError(""); setDone(false); setManifest(null);
    if (!/\.(csv|xlsx)$/i.test(selectedFile.name)) { setError("Please choose a CSV or XLSX manifest."); return; }
    if (selectedFile.size > 10 * 1024 * 1024) { setError("The manifest must be 10 MB or smaller."); return; }
    setFile(selectedFile); setProcessing(true);
    try {
      const workbook = XLSX.read(await selectedFile.arrayBuffer(), { type: "array", dense: true });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!sheet) throw new Error("No worksheet found.");
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: "", raw: false });
      if (!rows.length) throw new Error("No data rows found.");
      const columns = Object.keys(rows[0]).length;
      const blankRows = rows.filter((row) => Object.values(row).every((value) => String(value).trim() === "")).length;
      setManifest({ rows: rows.length, columns, blankRows });
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setDone(true);
    } catch (reason) {
      console.error(reason); setFile(null); setError("We could not read that manifest. Check that the file contains a readable CSV/XLSX table.");
    } finally { setProcessing(false); }
  };

  return <section id="ecommerce" className="mx-auto max-w-7xl px-5 py-24 sm:px-8" aria-labelledby="manifest-title">
    <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
      <div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-blue-700"><Store size={13} aria-hidden="true" /> Seller operations</div>
        <h2 id="manifest-title" className="text-4xl font-black tracking-[-.04em] sm:text-5xl">Turn a spreadsheet into a shipment-ready brief.</h2>
        <p className="mt-5 text-lg leading-8 text-slate-600">Drop a real CSV or XLSX file and the browser will read its table locally, giving you an immediate manifest check before any operational handoff.</p>
        <div className="mt-8 space-y-4">{["CSV/XLSX manifest intake", "Local table validation", "Clear handoff-ready summary"].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-700"><span className="rounded-full bg-emerald-50 p-1.5 text-emerald-600"><CheckCircle2 size={15} aria-hidden="true" /></span>{item}</div>)}</div>
      </div>
      <div className="glass rounded-[34px] p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-slate-200 pb-5"><div><div className="text-sm font-black">Bulk manifest console</div><div className="mt-1 text-xs text-slate-400">Local validation / intake queue</div></div><span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Ready</span></div>
        <button type="button" onClick={() => ref.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); void handle(event.dataTransfer.files[0]); }} className="mt-6 flex min-h-[230px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 px-5 text-center transition hover:border-blue-400" aria-label="Choose or drop a CSV or XLSX manifest">
          <input ref={ref} hidden type="file" accept=".csv,.xlsx" onChange={(event) => void handle(event.target.files?.[0])} />
          {processing ? <><Loader2 size={34} className="animate-spin text-blue-600" aria-hidden="true" /><div className="mt-4 font-bold">Reading manifest…</div><div className="mt-1 text-xs text-slate-400">Parsing the first worksheet locally</div></> : done && manifest ? <><PackageCheck size={38} className="text-emerald-600" aria-hidden="true" /><div className="mt-4 font-bold">{file?.name}</div><div className="mt-1 text-xs text-slate-500">{manifest.rows.toLocaleString()} rows · {manifest.columns} columns</div>{manifest.blankRows > 0 && <div className="mt-2 text-xs font-semibold text-amber-600">{manifest.blankRows} blank row(s) detected</div>}<span className="mt-5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white">Validated locally</span></> : <><CloudUpload size={34} className="text-blue-600" aria-hidden="true" /><div className="mt-4 font-bold">Drop your bulk order file here</div><div className="mt-1 text-xs text-slate-400">CSV or XLSX · maximum 10 MB</div><span className="mt-5 rounded-xl bg-slate-950 px-4 py-2 text-xs font-bold text-white">Choose file</span></>}
        </button>
        {error && <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700"><AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{error}</div>}
        <div className="mt-6 grid gap-3 sm:grid-cols-3"><Pipe icon={FileSpreadsheet} title="Import" status={done ? "Complete" : processing ? "Running" : "Waiting"} /><Pipe icon={Link2} title="Normalize" status={done ? "Checked" : processing ? "Running" : "Queued"} /><Pipe icon={ShieldCheck} title="Review" status={done ? "Ready" : "Queued"} /></div>
        {file && <button type="button" onClick={() => { setFile(null); setDone(false); setManifest(null); setError(""); }} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-slate-900"><X size={13} aria-hidden="true" /> Clear manifest</button>}
      </div>
    </div>
  </section>;
}
function Pipe({ icon: Icon, title, status }: { icon: typeof FileSpreadsheet; title: string; status: string }) {
  const active = status === "Complete" || status === "Ready";
  return <motion.div animate={status === "Running" ? { opacity: [0.55, 1, 0.55] } : { opacity: 1 }} transition={status === "Running" ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }} className="rounded-2xl border border-slate-200 bg-white p-4"><Icon size={16} className="text-blue-600" aria-hidden="true" /><div className="mt-3 text-xs font-black">{title}</div><div className={`mt-1 text-[10px] font-bold uppercase tracking-widest ${active ? "text-emerald-600" : status === "Running" ? "text-blue-600" : "text-slate-400"}`}>{status}</div></motion.div>;
}
