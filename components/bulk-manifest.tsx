"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, CloudUpload, FileSpreadsheet, Link2, Loader2, PackageCheck, ShieldCheck, Store, X } from "lucide-react";
import * as XLSX from "xlsx";
import { useRef, useState } from "react";

type ManifestRow = Record<string, unknown>;
type ManifestState = { rows: ManifestRow[]; count: number; columns: string[]; blankRows: number; postcode: "validated" | "not-found" | "invalid" };

export default function BulkManifest() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [manifest, setManifest] = useState<ManifestState | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const handle = async (selectedFile?: File) => {
    if (!selectedFile) return;
    setError("");
    setDone(false);
    setManifest(null);
    if (!/\.(csv|xlsx)$/i.test(selectedFile.name)) { setError("Please choose a CSV or XLSX manifest."); return; }
    if (selectedFile.size > 10 * 1024 * 1024) { setError("The manifest must be 10 MB or smaller."); return; }
    setFile(selectedFile);
    setProcessing(true);
    try {
      const workbook = XLSX.read(await selectedFile.arrayBuffer(), { type: "array", dense: true });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!sheet) throw new Error("No worksheet found.");
      const rows = XLSX.utils.sheet_to_json<ManifestRow>(sheet, { defval: "", raw: false });
      if (!rows.length) throw new Error("No data rows found.");

      const columns = Object.keys(rows[0]);
      const blankRows = rows.filter((row) => Object.values(row).every((value) => String(value).trim() === "")).length;
      const postcodeKey = columns.find((column) => /post.?code|postal/i.test(column));
      let postcode: ManifestState["postcode"] = "not-found";
      if (postcodeKey) {
        const values = rows.map((row) => String(row[postcodeKey] ?? "").trim()).filter(Boolean);
        postcode = values.length > 0 && values.every((value) => /^\d{5}$/.test(value)) ? "validated" : "invalid";
      }

      setManifest({ rows: rows.slice(0, 6), count: rows.length, columns, blankRows, postcode });
      await new Promise((resolve) => window.setTimeout(resolve, 700));
      setDone(true);
    } catch (reason) {
      console.error(reason);
      setFile(null);
      setError("We could not read that manifest. Check that the file contains a readable CSV/XLSX table.");
    } finally {
      setProcessing(false);
    }
  };

  const waText = manifest
    ? `Hi Nilai Logistics, I just generated a seller manifest profile on your portal. File: ${file?.name ?? "manifest"}. Rows discovered: ${manifest.count}. Postcode syntax: ${manifest.postcode === "validated" ? "validated" : manifest.postcode === "invalid" ? "needs review" : "field not detected"}. Please confirm the next hub handoff.`
    : "";
  const waHref = `https://wa.me/60132323305?text=${encodeURIComponent(waText)}`;

  return (
    <section id="ecommerce" className="mx-auto max-w-7xl px-5 py-24 text-white sm:px-8" aria-labelledby="manifest-title">
      <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[.05] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">
            <Store size={13} aria-hidden="true" /> Seller operations
          </div>
          <h2 id="manifest-title" className="text-4xl font-black tracking-[-.04em] sm:text-5xl">Turn a spreadsheet into a shipment-ready brief.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-500">Drop a real CSV or XLSX file and the browser reads its table locally. Nothing is uploaded by this preview step.</p>
          <div className="mt-8 space-y-4">
            {["CSV/XLSX manifest intake", "Browser-side row and postcode checks", "Structured handoff-ready summary"].map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-400">
                <span className="rounded-full bg-emerald-400/10 p-1.5 text-emerald-300"><CheckCircle2 size={15} aria-hidden="true" /></span>{item}
              </div>
            ))}
          </div>
        </div>

        <div className="terminal-panel glass rounded-[34px] p-5 sm:p-7">
          <div className="flex items-center justify-between border-b border-white/[.08] pb-5">
            <div>
              <div className="font-mono text-sm font-black">Seller ingestion console</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[.12em] text-slate-600">Browser validation / handoff queue</div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.05] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Ready
            </span>
          </div>

          <button
            type="button"
            onClick={() => ref.current?.click()}
            onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(event) => { event.preventDefault(); setDragging(false); void handle(event.dataTransfer.files[0]); }}
            className={`mt-6 flex min-h-[230px] w-full flex-col items-center justify-center rounded-3xl border-2 border-dashed px-5 text-center transition ${dragging ? "border-emerald-400 bg-emerald-400/[.09] shadow-[0_0_45px_rgba(16,185,129,.14)]" : "border-white/[.08] bg-black/20 hover:border-cyan-400/50"}`}
            aria-label="Choose or drop a CSV or XLSX manifest"
          >
            <input ref={ref} hidden type="file" accept=".csv,.xlsx" onChange={(event) => void handle(event.target.files?.[0])} />
            {dragging ? (
              <>
                <CloudUpload size={36} className="text-emerald-300" aria-hidden="true" />
                <div className="mt-4 font-mono font-black text-emerald-200">[FILE INGESTION ENGINE INITIALIZED]</div>
                <div className="mt-1 text-xs text-emerald-300/70">Release to begin local validation</div>
              </>
            ) : processing ? (
              <>
                <Loader2 size={34} className="animate-spin text-cyan-300" aria-hidden="true" />
                <div className="mt-4 font-bold">Reading manifest…</div>
                <div className="mt-1 font-mono text-[10px] text-slate-500">Parsing first worksheet locally</div>
              </>
            ) : done && manifest ? (
              <>
                <PackageCheck size={38} className="text-emerald-300" aria-hidden="true" />
                <div className="mt-4 font-mono font-bold">{file?.name}</div>
                <div className="mt-1 text-xs text-slate-500">{manifest.count.toLocaleString()} rows · {manifest.columns.length} columns discovered</div>
                <span className="mt-5 rounded-xl bg-emerald-300 px-4 py-2 font-mono text-[10px] font-black uppercase text-[#031018]">Validation complete</span>
              </>
            ) : (
              <>
                <CloudUpload size={34} className="text-cyan-300" aria-hidden="true" />
                <div className="mt-4 font-mono font-bold">Drop your bulk order file here</div>
                <div className="mt-1 text-xs text-slate-500">CSV or XLSX · maximum 10 MB</div>
                <span className="mt-5 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-950">Choose file</span>
              </>
            )}
          </button>

          {error && <div role="alert" className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/15 bg-red-400/[.05] p-3 text-sm font-semibold text-red-300"><AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{error}</div>}

          {manifest && done && (
            <div className="mt-5 space-y-4">
              <div className="grid gap-2 sm:grid-cols-3">
                <Signal value={manifest.count.toLocaleString()} label="Rows discovered" />
                <Signal value={manifest.postcode === "validated" ? "Validated" : manifest.postcode === "invalid" ? "Review" : "Not detected"} label="Postcode syntax" />
                <Signal value={manifest.blankRows === 0 ? "Clean" : `${manifest.blankRows} blank`} label="Row integrity" />
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/[.07] bg-black/20">
                <div className="border-b border-white/[.07] px-4 py-3 font-mono text-[9px] font-bold uppercase tracking-[.16em] text-slate-500">Browser preview // first 6 rows</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left font-mono text-[10px]">
                    <thead className="bg-white/[.035] text-slate-500">
                      <tr>{manifest.columns.slice(0, 5).map((column) => <th key={column} className="px-3 py-2 font-bold">{column}</th>)}</tr>
                    </thead>
                    <tbody>
                      {manifest.rows.map((row, index) => (
                        <tr key={index} className="border-t border-white/[.05] text-slate-300">
                          {manifest.columns.slice(0, 5).map((column) => <td key={column} className="max-w-[150px] truncate px-3 py-2">{String(row[column] ?? "—")}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[.035] p-4 font-mono text-[10px] text-emerald-200">
                [{manifest.count.toLocaleString()} ROWS DISCOVERED] → [POSTCODE SYNTAX: {manifest.postcode === "validated" ? "VALIDATED" : manifest.postcode === "invalid" ? "REVIEW REQUIRED" : "FIELD NOT DETECTED"}] → [READY FOR HUB HANDOFF]
              </div>

              <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-4 text-sm font-black text-[#031018] transition hover:bg-emerald-200">
                Handoff manifest to operations <Link2 size={16} />
              </a>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Pipe icon={FileSpreadsheet} title="Import" status={done ? "Complete" : processing ? "Running" : "Waiting"} />
            <Pipe icon={Link2} title="Normalize" status={done ? "Checked" : processing ? "Running" : "Queued"} />
            <Pipe icon={ShieldCheck} title="Review" status={done ? "Ready" : "Queued"} />
          </div>

          {file && <button type="button" onClick={() => { setFile(null); setDone(false); setManifest(null); setError(""); }} className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-slate-500 transition hover:text-white"><X size={13} aria-hidden="true" /> Clear manifest</button>}
        </div>
      </div>
    </section>
  );
}

function Signal({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl border border-white/[.07] bg-black/20 p-3"><div className="font-mono text-sm font-black text-cyan-300">{value}</div><div className="mt-1 font-mono text-[8px] uppercase tracking-[.12em] text-slate-600">{label}</div></div>;
}

function Pipe({ icon: Icon, title, status }: { icon: typeof FileSpreadsheet; title: string; status: string }) {
  const active = status === "Complete" || status === "Ready";
  return <motion.div animate={status === "Running" ? { opacity: [0.55, 1, 0.55] } : { opacity: 1 }} transition={status === "Running" ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }} className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4"><Icon size={16} className="text-cyan-300" aria-hidden="true" /><div className="mt-3 text-xs font-black">{title}</div><div className={`mt-1 text-[10px] font-bold uppercase tracking-widest ${active ? "text-emerald-300" : status === "Running" ? "text-cyan-300" : "text-slate-400"}`}>{status}</div></motion.div>;
}
