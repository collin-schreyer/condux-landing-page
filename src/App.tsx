import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Lightning, MapTrifold, Buildings, WifiHigh, Fingerprint, ShieldCheck } from '@phosphor-icons/react';
import { VideoScrubber } from './components/VideoScrubber';

function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

function App() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-emerald-500/20 selection:text-emerald-900">

      {/* Navigation - Taste Skill Floating Nav */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="liquid-glass px-6 py-3 rounded-full flex items-center gap-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
          <img src="/condux-logo-new.png" alt="Condux+Tesmec Logo" className="h-5 object-contain" />
          <div className="w-px h-4 bg-zinc-200" />
          <ul className="flex gap-6 text-sm font-medium text-zinc-500">
            <li className="hover:text-zinc-900 transition-colors cursor-pointer">Intelligence</li>
            <li className="hover:text-zinc-900 transition-colors cursor-pointer">Infrastructure</li>
            <li className="hover:text-zinc-900 transition-colors cursor-pointer">Advantage</li>
          </ul>
        </div>
      </nav>

      {/* Hero Section - Asymmetric per Taste Skill */}
      <section className="relative min-h-[100dvh] w-full flex items-center pt-24 pb-12 overflow-hidden bg-white">
        {/* BG Image Layer */}
        <motion.div
          style={{ y, opacity }}
          className="absolute top-0 right-0 w-full md:w-[65%] h-full origin-top"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent z-10" />
          <img
            src="/hero_datacenter_condux.png"
            alt="Data Center"
            className="w-full h-full object-cover opacity-20 hover:opacity-40 transition-opacity duration-1000 grayscale mix-blend-multiply"
          />
        </motion.div>

        <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Asymmetric Offset */}
          <div className="col-span-1 border-l border-zinc-200 h-[60vh] hidden md:block opacity-60"></div>

          <div className="col-span-11 md:col-span-6 space-y-8 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-50 text-emerald-600 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
                <WifiHigh weight="bold" className="animate-pulse" /> Alpha Intel Live
              </div>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-[1.05] mb-6 text-zinc-900">
                Dominate the <br />
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-700">
                  Data Center
                </span> Edge.
              </h1>
              <p className="text-zinc-500 text-lg max-w-[500px] leading-relaxed relative">
                <span className="absolute -left-6 top-2 w-[2px] h-full bg-emerald-500/50 rounded-full" />
                CONDUX intercepts GSR extracts and municipality permits at the source. We identify massive backup generator deployments before electrical contractors even step into the bidding room.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <MagneticButton>
                <button className="bg-zinc-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-zinc-800 active:scale-95 transition-all flex items-center gap-2 group shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_-5px_rgba(0,0,0,0.3)] duration-500">
                  Access Intelligence
                  <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:scale-150 transition-transform" />
                </button>
              </MagneticButton>
              <button className="px-8 py-4 rounded-full font-semibold text-zinc-500 hover:text-zinc-900 transition-colors relative overflow-hidden group">
                <span className="relative z-10">View Architecture</span>
                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-zinc-900 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Interactive Section - Scrub on Scroll */}
      <VideoScrubber src="/condux.mp4" />

      {/* Bento Grid Features - Taste Skill 2.0 Light Layout */}
      <section className="py-32 px-6 w-full bg-zinc-50 relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-zinc-900">
                The <span className="font-semibold">Alpha Channel.</span>
              </h2>
              <p className="text-zinc-500 mt-4 max-w-xl text-lg leading-relaxed">
                Our extraction engines bypass traditional procurement feeds, tapping straight into physical municipal infrastructure data.
              </p>
            </div>
            <div className="text-sm font-mono text-zinc-400 uppercase tracking-widest leading-relaxed">
              Phase II <br /> Tracking Active <br /> <span className="text-emerald-500 animate-pulse inline-block mt-2 font-bold">● Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
            {/* Massive Map Card */}
            <motion.div
              whileHover={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="col-span-1 md:col-span-8 bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden relative group cursor-crosshair"
            >
              <div className="absolute inset-0 opacity-10 mix-blend-multiply group-hover:opacity-20 transition-opacity duration-[2s]">
                <img src="/intelligence_map_condux.png" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s] ease-out" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent p-10 flex flex-col justify-end pointer-events-none">
                <MapTrifold size={32} className="text-emerald-500 mb-4" />
                <h3 className="text-3xl font-medium tracking-tight text-zinc-900">Geospatial Routing (GSR)</h3>
                <p className="text-zinc-500 mt-2 max-w-lg text-lg">Correlating utility corridor expansions with stealth data center construction zones.</p>
              </div>
            </motion.div>

            {/* Metric Card */}
            <motion.div
              whileHover={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="col-span-1 md:col-span-4 bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <Lightning size={32} className="text-emerald-500" />
                <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Efficiency</span>
              </div>
              <div>
                <div className="font-mono text-6xl font-light text-zinc-900 mb-2 tracking-tighter">47.2<span className="text-3xl text-zinc-400">%</span></div>
                <div className="text-xs uppercase tracking-widest text-emerald-600 font-bold mb-4">First-Mover Win Rate</div>
                <div className="h-px w-full bg-zinc-100 mb-4" />
                <p className="text-zinc-500 text-sm leading-relaxed">
                  By tracking 100MW+ generator permits, you bypass the crowded RFP phase and insert equipment specs directly to the source.
                </p>
              </div>
            </motion.div>

            {/* Generator Imagery Card */}
            <motion.div
              whileHover={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="col-span-1 md:col-span-5 bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] overflow-hidden relative group"
            >
              <img src="/generators_section_condux.png" className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-multiply group-hover:opacity-30 transition-all duration-[2s] grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent p-10 flex flex-col justify-end pointer-events-none">
                <Buildings size={32} className="text-emerald-600 mb-4" />
                <h3 className="text-2xl font-medium tracking-tight text-zinc-900">Heavy Iron Tracking</h3>
                <p className="text-zinc-500 mt-2">Identifying massive Caterpillar & Cummins deployments before ground break.</p>
              </div>
            </motion.div>

            {/* Forensic Intel Card */}
            <motion.div
              whileHover={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="col-span-1 md:col-span-7 bg-white border border-zinc-200/60 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-10 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 text-zinc-100 pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                <Fingerprint size={400} />
              </div>

              <ShieldCheck size={32} className="text-emerald-500 mb-6 relative z-10" />
              <h3 className="text-3xl font-medium tracking-tight max-w-[400px] mb-4 text-zinc-900 relative z-10">Forensic Bid Intelligence</h3>
              <p className="text-zinc-500 leading-relaxed max-w-[500px] relative z-10">
                We aren't just selling data. We're giving you the exact blueprint of the electrical contractor's incoming requirements before they know what they are.
                <br /><br />
                Our parsers read the raw municipal PDFs, extract the kW ratings, and flag the general contractor directly into your CRM.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 relative overflow-hidden flex items-center justify-center bg-white border-y border-zinc-200">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-8 max-w-2xl px-6 leading-[1.1] text-zinc-900">
            Ready to front-run the <br />
            <span className="font-semibold text-emerald-600">procurement cycle?</span>
          </h2>
          <MagneticButton>
            <button className="bg-emerald-500 text-white px-10 py-5 rounded-full font-bold hover:bg-emerald-600 transition-colors shadow-[0_10px_40px_rgba(16,185,129,0.3)] border border-emerald-400">
              Request Platform Access
            </button>
          </MagneticButton>
        </div>
      </section>

      {/* True Footer */}
      <footer className="bg-zinc-50 py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/condux-logo-new.png" alt="Condux+Tesmec Logo" className="h-6 object-contain grayscale opacity-80" />
            <span className="font-bold tracking-widest text-sm uppercase text-zinc-800">// Intel Platform</span>
          </div>
          <p className="text-zinc-400 text-xs text-center md:text-right font-mono">ENCRYPTED ORIGIN // DEPLOYMENT READY</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
