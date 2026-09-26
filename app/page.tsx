import {
  ArrowRight,
  CheckCircle2,
  Terminal,
  ChevronRight,
  Clock3,
  Facebook,
  FileSpreadsheet,
  LockKeyhole,
  Mail,
  MapPin,
  MessageCircle,
  PackageCheck,
  Phone,
  ShieldCheck,
  Truck,
  Warehouse,
  Zap,
} from "lucide-react";
import InstantQuote from "@/components/instant-quote";
import TransitBridge from "@/components/transit-bridge";
import BulkManifest from "@/components/bulk-manifest";

const services = [
  {
    icon: Truck,
    title: "Air Freight",
    text: "For time-sensitive cargo moving between Peninsular Malaysia, Sabah and Sarawak.",
    meta: "Typical planning window: 3–4 days",
  },
  {
    icon: PackageCheck,
    title: "Sea Freight",
    text: "A cost-conscious option for larger and heavier consignments across the East Malaysia corridor.",
    meta: "Typical planning window: 2–3 weeks",
  },
  {
    icon: FileSpreadsheet,
    title: "E-commerce Consolidation",
    text: "Structured shipment planning for recurring seller volumes and bulk manifests.",
    meta: "Built for repeat shipments",
  },
  {
    icon: Warehouse,
    title: "Specialized & Household Cargo",
    text: "Planning support for medical equipment, commercial goods and household relocation.",
    meta: "Cargo-led planning",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="overflow-hidden">
      <nav
        aria-label="Primary navigation"
        className="fixed inset-x-0 top-0 z-50 border-b border-white/[.08] bg-[#030712]/80 backdrop-blur-2xl"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#" className="flex items-center gap-3" aria-label="Nilai Logistics home">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-white/[.04] text-cyan-300">
              <Truck size={20} />
            </div>
            <div>
              <div className="text-sm font-black tracking-tight text-white">NILAI LOGISTICS</div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[.18em] text-slate-500">
                & TRANS SDN BHD
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-7 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-slate-500 md:flex">
            <a href="#quote" className="transition hover:text-cyan-300">Instant Quote</a>
            <a href="#services" className="transition hover:text-cyan-300">Services</a>
            <a href="#network" className="transition hover:text-cyan-300">Network</a>
            <a href="#ecommerce" className="transition hover:text-cyan-300">Seller Portal</a>
          </div>

          <a
            href="https://wa.me/60132323305"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[.1em] text-cyan-200 transition hover:bg-cyan-400/20"
          >
            Operations <MessageCircle size={14} />
          </a>
        </div>
      </nav>

      <section className="command-hero grid-noise relative flex min-h-screen items-center px-5 pb-20 pt-32 sm:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-14 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/[.05] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-emerald-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981]" />
              ALL SYSTEMS OPERATIONAL // NILAI HUB
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[.9] tracking-[-.065em] text-white sm:text-7xl lg:text-[88px]">
              Move cargo. See the{" "}
              <span className="text-gradient">system.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              Nilai Logistics &amp; Trans helps businesses and households plan cargo
              movement between Peninsular Malaysia, Sabah and Sarawak—across air,
              sea, commercial, e-commerce and specialized shipments.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quote"
                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3.5 text-sm font-black text-[#031018] shadow-[0_0_35px_rgba(6,182,212,.18)] transition hover:bg-cyan-200"
              >
                Open quote matrix <ArrowRight size={16} />
              </a>
              <a
                href="tel:+60387789008"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-bold text-white transition hover:border-cyan-400/30 hover:bg-white/[.07]"
              >
                <Phone size={16} /> Call +603 8778 9008
              </a>
            </div>

            <div className="mt-9 grid max-w-2xl grid-cols-3 gap-3">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck size={15} className="text-cyan-300" /> Structured shipment handoff
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 size={15} className="text-cyan-300" /> Air &amp; sea planning
              </span>
              <span className="inline-flex items-center gap-2">
                <LockKeyhole size={15} className="text-cyan-300" /> Secure lead capture
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="terminal-panel relative rounded-[36px] border border-cyan-400/20 bg-[#07101d]/90 p-6 text-white shadow-[0_35px_120px_rgba(0,0,0,.5)] sm:p-8">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-blue-300">
                  Shipment planning
                </span>
                <Terminal size={17} className="text-cyan-300" />
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3">
                <Mini l="Origin" v="Peninsular Malaysia" />
                <Mini l="Destinations" v="Sabah · Sarawak" />
                <Mini l="Modes" v="Air / Sea" />
                <Mini l="Use cases" v="Business / Household" />
              </div>

              <div className="mt-5 rounded-3xl border border-white/[.07] bg-black/30 p-5">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Planning view</span>
                  <span className="font-bold text-emerald-300">Ready to plan</span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="pipeline-beam h-full w-[42%] rounded-full bg-gradient-to-r from-cyan-500 via-cyan-300 to-emerald-300" />
                </div>
                <div className="mt-4 flex justify-between font-mono text-[9px] uppercase text-slate-600">
                  <span>Pickup</span>
                  <span>Transit</span>
                  <span>Arrival</span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-emerald-400/10 bg-emerald-400/[.035] p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                  <div>
                    <div className="font-mono text-[10px] font-bold uppercase tracking-[.12em] text-emerald-200">Handoff surface online</div>
                    <div className="mt-1 text-[10px] leading-5 text-slate-600">
                      Route · cargo type · weight or volume · contact handoff
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[.07] bg-[#050b14] px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 font-mono text-[9px] font-bold uppercase tracking-[.2em] text-slate-600">
          <span>Peninsular Malaysia</span>
          <span>Sabah</span>
          <span>Sarawak</span>
          <span>Air Freight</span>
          <span>Sea Freight</span>
          <span>Commercial Cargo</span>
        </div>
      </section>

      <section id="services" className="bg-[#050b14] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-cyan-400">
              What we move
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-6xl">
              One logistics partner. Different cargo realities.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-500">
              Start with the shipment you actually have. The planning flow adapts to
              the route, cargo category and shipment size instead of forcing every
              customer into the same process.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="blueprint-card group relative overflow-hidden rounded-[28px] border border-white/[.08] bg-[#07101d] p-7 transition duration-500 hover:-translate-y-1 hover:border-cyan-400/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/15 bg-cyan-400/[.05] text-cyan-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-white">{service.title}</h3>
                  <p className="mt-3 leading-7 text-slate-500">{service.text}</p>
                  <div className="mt-5 border-t border-white/[.07] pt-4 font-mono text-[9px] font-bold uppercase tracking-[.13em] text-slate-600">
                    {service.meta}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <InstantQuote />
      <TransitBridge />
      <BulkManifest />

      <section className="border-y border-white/[.07] bg-[#030712] px-5 py-20 text-white sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <div className="text-xs font-bold uppercase tracking-[.2em] text-blue-600">
              Company profile
            </div>
            <h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">
              Nilai-based logistics with an East Malaysia focus.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-500">
              Nilai Logistics &amp; Trans Sdn Bhd is based in Bandar Baru Nilai,
              Negeri Sembilan, and focuses on freight forwarding and cargo movement
              across Malaysian domestic corridors.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Fact label="Company" value="Nilai Logistics & Trans Sdn Bhd" />
            <Fact label="Registration" value="202001011540" />
            <Fact label="Established" value="18 May 2020" />
            <Fact label="Base" value="Putra Nilai, 71800 Nilai" />
          </div>
        </div>
      </section>

      <section className="bg-[#050b14] px-5 py-24 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1fr_.8fr]">
            <div>
              <div className="text-xs font-bold uppercase tracking-[.2em] text-blue-300">
                Talk to the team
              </div>
              <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-.04em] sm:text-5xl">
                Ready to discuss a shipment?
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Send the route, cargo details and approximate weight or volume.
                For recurring business shipments, the bulk manifest flow can help
                structure the request before handoff.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/60132323305"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-2xl bg-cyan-300 px-5 py-3.5 text-sm font-bold text-[#031018] transition hover:bg-cyan-200"
                >
                  WhatsApp +6013 232 3305 <MessageCircle size={16} />
                </a>
                <a
                  href="mailto:nilai.logistics@gmail.com"
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/5"
                >
                  <Mail size={16} /> Email the team
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[.04] p-7">
              <div className="text-xs font-bold uppercase tracking-[.18em] text-slate-500">
                Office
              </div>
              <div className="mt-4 flex items-start gap-3">
                <MapPin className="mt-1 shrink-0 text-blue-300" size={19} />
                <p className="text-sm leading-7 text-slate-300">
                  PT12899-A, Tingkat Satu, Jalan BBN 1/7F,
                  <br />
                  Putra Indah, Putra Nilai,
                  <br />
                  71800 Nilai, Negeri Sembilan, Malaysia
                </p>
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <a
                  href="tel:+60387789008"
                  className="flex items-center gap-3 text-sm font-bold text-white"
                >
                  <Phone size={16} className="text-blue-300" />
                  +603 8778 9008
                </a>
                <a
                  href="mailto:nilai.logistics@gmail.com"
                  className="mt-3 flex items-center gap-3 text-sm font-bold text-white"
                >
                  <Mail size={16} className="text-blue-300" />
                  nilai.logistics@gmail.com
                </a>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href="https://www.facebook.com/nilai.logistics/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nilai Logistics on Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/5"
                >
                  <Facebook size={17} />
                </a>
                <a
                  href="https://www.tiktok.com/@nilailogistics"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Nilai Logistics on TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:bg-white/5"
                >
                  <span className="text-xs font-black">TT</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#030712] px-5 pb-10 text-slate-600 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/[.07] pt-7 font-mono text-[9px] uppercase tracking-[.14em] sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Nilai Logistics &amp; Trans Sdn Bhd</span>
          <span>Peninsular Malaysia · Sabah · Sarawak · Labuan</span>
        </div>
      </footer>
    </main>
  );
}

function Mini({ l, v }: { l: string; v: string }) {
  return (
    <div className="rounded-2xl bg-white/[.05] p-4">
      <div className="text-[10px] uppercase tracking-widest text-slate-500">{l}</div>
      <div className="mt-2 text-sm font-black">{v}</div>
    </div>
  );
}

function HeroMetric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/[.07] bg-white/[.025] p-3">
      <div className="font-mono text-sm font-black text-cyan-300">{value}</div>
      <div className="mt-1 text-[9px] leading-4 text-slate-600">{label}</div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[.08] bg-white/[.025] p-5">
      <div className="font-mono text-[9px] font-bold uppercase tracking-[.15em] text-slate-600">{label}</div>
      <div className="mt-2 text-sm font-black text-white">{value}</div>
    </div>
  );
}
