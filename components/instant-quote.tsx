"use client";

import { motion } from "framer-motion";
import { Check, Clock3, LockKeyhole, MessageCircle, Package, Plane, Ship, Sparkles, Truck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const routes = [
  { id: "pen-sabah", label: "Peninsular → Sabah", detail: "Kota Kinabalu, Labuan & statewide delivery" },
  { id: "pen-sarawak", label: "Peninsular → Sarawak", detail: "Kuching, Bintulu & statewide delivery" },
  { id: "east-pen", label: "East Malaysia → Peninsular", detail: "Reverse logistics and return movements" },
];

const cargo = [
  { id: "household", label: "Household Moving", detail: "Furniture, appliances & personal effects", icon: Truck },
  { id: "commercial", label: "Commercial Goods", detail: "Stock, machinery & business cargo", icon: Package },
  { id: "medical", label: "Medical / Specialized", detail: "Sensitive, high-value or specialist equipment", icon: Sparkles },
  { id: "ecommerce", label: "Bulk E-Commerce", detail: "Consolidated seller inventory & fulfilment stock", icon: MessageCircle },
];

type Unit = "kg" | "cbm" | "lbs" | "cuft";

const unitConfig: Record<Unit, { label: string; min: number; max: number; step: number; toKg: (value: number) => number }> = {
  kg: { label: "KG", min: 10, max: 5000, step: 10, toKg: (value) => value },
  cbm: { label: "CBM", min: 1, max: 30, step: 1, toKg: (value) => value * 167 },
  lbs: { label: "LBS", min: 22, max: 11000, step: 22, toKg: (value) => value * 0.45359237 },
  cuft: { label: "CU FT", min: 35, max: 1060, step: 1, toKg: (value) => value * 4.72 },
};

export default function InstantQuote() {
  const [route, setRoute] = useState(routes[0].id);
  const [cargoType, setCargoType] = useState(cargo[0].id);
  const [unit, setUnit] = useState<Unit>("kg");
  const [quantity, setQuantity] = useState(450);
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const selectedRoute = routes.find((item) => item.id === route) ?? routes[0];
  const selectedCargo = cargo.find((item) => item.id === cargoType) ?? cargo[0];
  const config = unitConfig[unit];
  const planningKg = config.toKg(quantity);

  const estimate = useMemo(() => ({
    air: Math.round(Math.max(1850, 1250 + planningKg * 7.8) / 50) * 50,
    sea: Math.round(Math.max(980, 720 + planningKg * 2.65) / 50) * 50,
  }), [planningKg]);

  const waText = useMemo(
    () =>
      `Hi Nilai Logistics, I just generated a shipment profile on your portal. Route: ${selectedRoute.label}. Cargo: ${selectedCargo.label}. Shipment size: ${quantity.toLocaleString()} ${config.label}. Planning weight: ${Math.round(planningKg).toLocaleString()} KG. Air planning estimate: RM ${estimate.air.toLocaleString()} (3–4 days). Sea planning estimate: RM ${estimate.sea.toLocaleString()} (2–3 weeks). Please confirm the current rate and terminal capacity.`,
    [selectedRoute.label, selectedCargo.label, quantity, config.label, planningKg, estimate.air, estimate.sea]
  );
  const waHref = `https://wa.me/60132323305?text=${encodeURIComponent(waText)}`;

  const lock = async () => {
    setError("");
    if (!form.name || !form.email || !form.whatsapp) {
      setError("Enter your name, business email and WhatsApp number to lock the current estimate.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          route: selectedRoute.label,
          cargoType: selectedCargo.label,
          quantity,
          quantityUnit: unit === "cbm" || unit === "cuft" ? "cbm" : "kg",
          estimate: { air: estimate.air, sea: estimate.sea, airTransit: "3–4 days", seaTransit: "2–3 weeks" },
        }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok) throw new Error(payload?.error ?? "Lead capture failed");
      setSaved(true);
    } catch {
      setError("We could not save the shipment brief right now. Please check your details and try again.");
    } finally {
      setSaving(false);
    }
  };

  const setUnitAndReset = (next: Unit) => {
    setUnit(next);
    const nextConfig = unitConfig[next];
    setQuantity(Math.min(Math.max(next === "cbm" ? 5 : next === "cuft" ? 120 : next === "lbs" ? 990 : 450, nextConfig.min), nextConfig.max));
  };

  return (
    <section id="quote" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-10 max-w-4xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[.05] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[.18em] text-cyan-700">
          <Sparkles size={13} /> Instant quote matrix
        </div>
        <h2 className="text-4xl font-black tracking-[-.04em] text-slate-950 sm:text-6xl">Know the lane before you call.</h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
          Change the route, cargo and shipment scale in one screen. Planning estimates update immediately; final rates are confirmed against the actual shipment.
        </p>
      </div>

      <div className="glass overflow-hidden rounded-[34px] text-slate-950">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <MatrixLabel>01 / Route</MatrixLabel>
            <div className="mt-4 grid gap-3">
              {routes.map((item) => (
                <button key={item.id} type="button" onClick={() => setRoute(item.id)} className={`rounded-2xl border p-4 text-left transition ${route === item.id ? "border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-100" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{item.label}</span>
                    {route === item.id && <Check size={17} className="text-cyan-700" />}
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{item.detail}</div>
                </button>
              ))}
            </div>

            <MatrixLabel>02 / Cargo</MatrixLabel>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {cargo.map((item) => {
                const Icon = item.icon;
                return (
                  <button key={item.id} type="button" onClick={() => setCargoType(item.id)} className={`rounded-2xl border p-4 text-left transition ${cargoType === item.id ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-100" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                    <div className="flex items-start justify-between">
                      <span className="rounded-xl bg-slate-100 p-2.5 text-slate-800"><Icon size={18} /></span>
                      {cargoType === item.id && <Check size={17} className="text-emerald-700" />}
                    </div>
                    <div className="mt-4 font-bold">{item.label}</div>
                    <div className="mt-1 text-xs leading-5 text-slate-500">{item.detail}</div>
                  </button>
                );
              })}
            </div>

            <MatrixLabel>03 / Shipment scale</MatrixLabel>
            <div className="mt-4 rounded-3xl bg-slate-950 p-6 text-white">
              <div className="flex flex-wrap gap-2">
                {(Object.keys(unitConfig) as Unit[]).map((item) => (
                  <button key={item} type="button" onClick={() => setUnitAndReset(item)} className={`rounded-xl px-3 py-2 font-mono text-[10px] font-black uppercase tracking-widest transition ${unit === item ? "bg-cyan-300 text-[#031018]" : "bg-white/[.06] text-slate-400 hover:text-white"}`}>
                    {unitConfig[item].label}
                  </button>
                ))}
              </div>
              <div className="mt-7 flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[.16em] text-slate-500">Live shipment scale</div>
                  <div className="mt-2 text-5xl font-black tracking-tight">{quantity.toLocaleString()} <span className="font-mono text-sm text-cyan-300">{config.label}</span></div>
                </div>
                <div className="rounded-2xl border border-emerald-400/10 bg-emerald-400/[.04] px-4 py-3 text-right">
                  <div className="font-mono text-[8px] uppercase tracking-widest text-slate-500">Planning weight</div>
                  <div className="mt-1 font-mono text-sm font-black text-emerald-300">{Math.round(planningKg).toLocaleString()} KG</div>
                </div>
              </div>
              <input aria-label={`Shipment size in ${config.label}`} className="mt-8 w-full accent-cyan-400" type="range" min={config.min} max={config.max} step={config.step} value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
              <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-slate-500"><span>{config.min.toLocaleString()} {config.label}</span><span>{config.max.toLocaleString()} {config.label}</span></div>
            </div>
          </div>

          <div>
            <div className="rounded-3xl border border-cyan-400/15 bg-[#061326] p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-cyan-300">04 / Live planning terminal</div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.05] px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-widest text-emerald-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> Calculating</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <Quote kind="air" price={estimate.air} />
                <Quote kind="sea" price={estimate.sea} />
              </div>
            </div>

            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6">
              <MatrixLabel>05 / Qualified handoff</MatrixLabel>
              <p className="mt-2 text-sm leading-6 text-slate-500">Lock the planning profile, then send the same route and cargo context directly to the operations team.</p>
              <div className="mt-5 grid gap-3">
                <Field l="Name" v={form.name} set={(value) => setForm({ ...form, name: value })} p="Your name" />
                <Field l="Business email" v={form.email} set={(value) => setForm({ ...form, email: value })} p="name@company.com" type="email" />
                <Field l="WhatsApp number" v={form.whatsapp} set={(value) => setForm({ ...form, whatsapp: value })} p="+60 12 345 6789" />
              </div>
              {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
              <button disabled={saving} onClick={lock} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:opacity-60">
                <LockKeyhole size={17} /> {saving ? "Securing shipment brief…" : "Lock in current planning rate"}
              </button>
              {saved && (
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">Shipment brief saved. Your WhatsApp message is already prepared with the selected route, cargo and shipment scale.</div>
                  <a href={waHref} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-300 px-5 py-4 text-sm font-black text-[#031018] transition hover:bg-emerald-200">
                    Open pre-filled WhatsApp handoff <MessageCircle size={17} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white px-6 py-4 font-mono text-[9px] uppercase tracking-[.14em] text-slate-500 sm:px-8">
          Planning note: displayed estimates are directional and not a guaranteed carrier quote. Final pricing depends on dimensions, chargeable weight, cargo characteristics, pickup/delivery points and current carrier conditions.
        </div>
      </div>
    </section>
  );
}

function MatrixLabel({ children }: { children: React.ReactNode }) {
  return <div className="mt-7 font-mono text-[9px] font-black uppercase tracking-[.18em] text-cyan-700 first:mt-0">{children}</div>;
}

function Field({ l, v, set, p, type = "text" }: { l: string; v: string; set: (value: string) => void; p: string; type?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-slate-700">{l}</span>
      <input required type={type} value={v} onChange={(event) => set(event.target.value)} placeholder={p} className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10" />
    </label>
  );
}

function Quote({ kind, price }: { kind: "air" | "sea"; price: number }) {
  const air = kind === "air";
  return (
    <div className={`rounded-3xl border p-5 ${air ? "border-cyan-400/15 bg-cyan-400/[.04]" : "border-white/[.08] bg-white/[.035]"}`}>
      <div className="flex items-center justify-between">
        <span className={`rounded-xl p-2.5 ${air ? "bg-cyan-300 text-[#031018]" : "bg-white/10 text-white"}`}>{air ? <Plane size={18} /> : <Ship size={18} />}</span>
        <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">{air ? "Priority planning" : "Consolidated planning"}</span>
      </div>
      <h3 className="mt-5 font-mono text-sm font-black uppercase tracking-wider text-white">{air ? "Air Freight" : "Sea Freight"}</h3>
      <RollingNumber value={price} />
      <div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-300"><Clock3 size={15} /> {air ? "3–4 days" : "2–3 weeks"}</div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div initial={false} animate={{ width: air ? "86%" : "64%" }} transition={{ duration: 0.45 }} className={`h-full rounded-full ${air ? "bg-cyan-300" : "bg-slate-400"}`} />
      </div>
    </div>
  );
}

function RollingNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const start = display;
    const delta = value - start;
    if (!delta) return;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / 420);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + delta * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);
  return <div className="mt-2 overflow-hidden font-mono text-3xl font-black tracking-tight text-white">RM {display.toLocaleString()}</div>;
}
