"use client";

import { motion } from "framer-motion";
import { Activity, Anchor, ArrowUpRight, Plane, Truck } from "lucide-react";
import { useState } from "react";

const nodes = [
  { id: "nilai", name: "Nilai Hub", x: 19, y: 54, metric: "Origin control", detail: "Central coordination for Peninsular movements" },
  { id: "kk", name: "Kota Kinabalu", x: 76, y: 39, metric: "Air + sea", detail: "Sabah gateway for priority and consolidated cargo" },
  { id: "labuan", name: "Labuan", x: 69, y: 67, metric: "Island lane", detail: "Dedicated routing for Labuan-bound shipments" },
  { id: "kuching", name: "Kuching", x: 56, y: 78, metric: "Sea corridor", detail: "Sarawak gateway for consolidated cargo" },
  { id: "bintulu", name: "Bintulu", x: 72, y: 83, metric: "Industrial", detail: "Commercial and project cargo routing" },
];

export default function TransitBridge() {
  const [active, setActive] = useState("kk");
  const selected = nodes.find((node) => node.id === active) ?? nodes[1];

  return (
    <section id="network" className="bg-[#061326] px-5 py-24 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[.18em] text-blue-300">
              <Activity size={13} /> Transit command view
            </div>
            <h2 className="text-4xl font-black tracking-[-.04em] sm:text-6xl">
              One network.
              <br />
              <span className="text-blue-400">Multiple lanes.</span>
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
              See the operating corridors at a glance. Select a destination to surface the service profile and movement type it supports.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Stat icon={Truck} value="Pen → East" label="Primary corridor" />
            <Stat icon={Plane} value="Priority" label="Air option" />
            <Stat icon={Anchor} value="Consolidated" label="Sea option" />
          </div>
        </div>

        <div className="dark-glass mt-12 overflow-hidden rounded-[34px] p-4 sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
            <div className="relative min-h-[500px] overflow-hidden rounded-[26px] bg-[#081c35]">
              <div className="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[.2em] text-slate-500">
                Planning corridor / Malaysia
              </div>

              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                {nodes.slice(1).map((destination) => {
                  const origin = nodes[0];
                  const mx = (origin.x + destination.x) / 2;
                  const my = Math.min(origin.y, destination.y) - 18;
                  const path = `M ${origin.x} ${origin.y} Q ${mx} ${my} ${destination.x} ${destination.y}`;

                  return (
                    <g
                      key={destination.id}
                      onClick={() => setActive(destination.id)}
                      className="cursor-pointer"
                    >
                      <path
                        d={path}
                        fill="none"
                        stroke={active === destination.id ? "#0a8cff" : "#315579"}
                        strokeWidth={active === destination.id ? "1.1" : ".55"}
                        className="route-line"
                      />
                      {active === destination.id && (
                        <motion.circle
                          r="1.4"
                          fill="#6cc4ff"
                          animate={{ opacity: [0.2, 1, 0.2] }}
                          transition={{ duration: 1.3, repeat: Infinity }}
                        >
                          <animateMotion dur="2.8s" repeatCount="indefinite" path={path} />
                        </motion.circle>
                      )}
                    </g>
                  );
                })}
              </svg>

              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setActive(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  aria-label={`Select ${node.name}`}
                >
                  <span
                    className={`relative block h-3 w-3 rounded-full border-2 ${
                      active === node.id
                        ? "border-white bg-blue-400"
                        : "border-slate-500 bg-[#081c35]"
                    }`}
                  />
                  <span className="mt-2 block whitespace-nowrap text-[10px] font-bold text-slate-300">
                    {node.name}
                  </span>
                </button>
              ))}
            </div>

            <motion.aside
              key={selected.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="rounded-[26px] bg-white/[.055] p-6"
            >
              <div className="flex justify-between">
                <span className="rounded-xl bg-blue-500/15 p-3 text-blue-300">
                  {selected.id === "nilai" ? <Truck size={20} /> : <Anchor size={20} />}
                </span>
                <ArrowUpRight size={17} className="text-slate-500" />
              </div>

              <div className="mt-8 text-xs font-bold uppercase tracking-[.18em] text-blue-300">
                {selected.metric}
              </div>
              <h3 className="mt-2 text-2xl font-black">{selected.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{selected.detail}</p>

              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Selected lane</span>
                  <span className="font-bold text-emerald-300">Planning profile active</span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-[82%] rounded-full bg-blue-400" />
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Truck;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[.04] p-4">
      <Icon size={17} className="text-blue-300" />
      <div className="mt-4 text-sm font-black">{value}</div>
      <div className="mt-1 text-[11px] text-slate-500">{label}</div>
    </div>
  );
}
