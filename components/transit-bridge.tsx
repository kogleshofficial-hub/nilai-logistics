"use client";

import { motion } from "framer-motion";
import { Activity, Anchor, ArrowUpRight, Plane, Truck } from "lucide-react";
import { useState } from "react";

const nodes = [
  { id: "nilai", name: "Nilai Hub", x: 19, y: 54, metric: "Origin control", detail: "Central coordination for Peninsular movements", planning: "Peninsular pickup coverage: Mon–Sat", mode: "Road + handoff" },
  { id: "kk", name: "Kota Kinabalu", x: 76, y: 39, metric: "Air + sea", detail: "Sabah gateway for priority and consolidated cargo", planning: "Air planning: 3–4 days", mode: "Air + sea" },
  { id: "labuan", name: "Labuan", x: 69, y: 67, metric: "Island lane", detail: "Dedicated routing for Labuan-bound shipments", planning: "Sea planning: 2–3 weeks", mode: "Sea corridor" },
  { id: "kuching", name: "Kuching", x: 56, y: 78, metric: "Sea corridor", detail: "Sarawak gateway for consolidated cargo", planning: "Sea planning: 2–3 weeks", mode: "Sea corridor" },
  { id: "bintulu", name: "Bintulu", x: 72, y: 83, metric: "Industrial", detail: "Commercial and project cargo routing", planning: "Sea planning: 2–3 weeks", mode: "Sea corridor" },
];

export default function TransitBridge() {
  const [active, setActive] = useState("kk");
  const [hovered, setHovered] = useState<string | null>(null);
  const selected = nodes.find((node) => node.id === active) ?? nodes[1];
  const focus = hovered ?? active;

  return (
    <section id="network" className="bg-[#061326] px-5 py-24 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-cyan-300">
              <Activity size={13} /> Visual corridor matrix
            </div>
            <h2 className="text-4xl font-black tracking-[-.04em] sm:text-6xl">
              One network.
              <br />
              <span className="text-cyan-300">Multiple lanes.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              Hover or select a destination to isolate its corridor and surface the planning profile used for the next operations conversation.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat icon={Truck} value="Pen → East" label="Primary corridor" />
            <Stat icon={Plane} value="Priority" label="Air option" />
            <Stat icon={Anchor} value="Consolidated" label="Sea option" />
          </div>
        </div>

        <div className="dark-glass mt-12 overflow-hidden rounded-[34px] p-4 sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
            <div className="relative min-h-[500px] overflow-hidden rounded-[26px] bg-[#030b16]">
              <div className="absolute left-5 top-5 z-10 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">
                CORRIDOR MATRIX // MALAYSIA
              </div>
              <div className="absolute bottom-5 left-5 z-10 rounded-xl border border-white/[.07] bg-black/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[.12em] text-slate-500 backdrop-blur">
                Select a hub to isolate route
              </div>

              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-label="Stylized Malaysia logistics corridor map">
                {nodes.slice(1).map((destination) => {
                  const origin = nodes[0];
                  const mx = (origin.x + destination.x) / 2;
                  const my = Math.min(origin.y, destination.y) - 18;
                  const path = `M ${origin.x} ${origin.y} Q ${mx} ${my} ${destination.x} ${destination.y}`;
                  const isFocus = focus === destination.id;

                  return (
                    <g
                      key={destination.id}
                      onMouseEnter={() => setHovered(destination.id)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => setActive(destination.id)}
                      className="cursor-pointer"
                    >
                      <path
                        d={path}
                        fill="none"
                        stroke={isFocus ? "#06b6d4" : "#24435f"}
                        strokeWidth={isFocus ? "1.25" : ".55"}
                        opacity={focus && !isFocus ? 0.16 : 1}
                        className="route-line transition-opacity duration-300"
                      />
                      {isFocus && (
                        <>
                          <path d={path} fill="none" stroke="#06b6d4" strokeWidth="2.8" opacity=".08" />
                          <motion.circle
                            r="1.45"
                            fill="#67e8f9"
                            animate={{ opacity: [0.25, 1, 0.25] }}
                            transition={{ duration: 1.1, repeat: Infinity }}
                          >
                            <animateMotion dur="2.2s" repeatCount="indefinite" path={path} />
                          </motion.circle>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>

              {nodes.map((node) => {
                const isFocus = focus === node.id;
                const dimmed = Boolean(focus) && !isFocus;
                return (
                  <button
                    key={node.id}
                    onMouseEnter={() => setHovered(node.id)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => setActive(node.id)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${dimmed ? "opacity-25" : "opacity-100"}`}
                    aria-label={`Select ${node.name}`}
                  >
                    <span className={`relative block h-3.5 w-3.5 rounded-full border-2 ${isFocus ? "border-white bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,.9)]" : "border-slate-500 bg-[#081c35]"}`}>
                      {isFocus && <span className="absolute -inset-2 animate-ping rounded-full border border-cyan-300/30" />}
                    </span>
                    <span className={`mt-2 block whitespace-nowrap text-[10px] font-bold ${isFocus ? "text-white" : "text-slate-500"}`}>
                      {node.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <motion.aside
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[26px] border border-cyan-400/10 bg-white/[.055] p-6"
            >
              <div className="flex justify-between">
                <span className="rounded-xl bg-cyan-400/10 p-3 text-cyan-300">
                  {selected.id === "nilai" ? <Truck size={20} /> : <Anchor size={20} />}
                </span>
                <ArrowUpRight size={17} className="text-slate-500" />
              </div>

              <div className="mt-8 font-mono text-xs font-bold uppercase tracking-[.18em] text-cyan-300">
                {selected.metric}
              </div>
              <h3 className="mt-2 text-2xl font-black">{selected.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{selected.detail}</p>

              <div className="mt-7 grid gap-2">
                <DataBadge label="Planning window" value={selected.planning} />
                <DataBadge label="Movement profile" value={selected.mode} />
                <DataBadge label="Data state" value="Planning profile active" />
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex justify-between font-mono text-[9px] uppercase tracking-widest">
                  <span className="text-slate-500">Route focus</span>
                  <span className="font-bold text-emerald-300">Selected</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "82%" }}
                    transition={{ duration: 0.7 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-300"
                  />
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function DataBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[.07] bg-black/20 p-3">
      <div className="font-mono text-[8px] font-bold uppercase tracking-[.15em] text-slate-600">{label}</div>
      <div className="mt-1 text-xs font-bold text-slate-200">{value}</div>
    </div>
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Truck; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-4">
      <Icon size={17} className="text-cyan-300" />
      <div className="mt-4 font-mono text-sm font-black">{value}</div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[.12em] text-slate-600">{label}</div>
    </div>
  );
}
