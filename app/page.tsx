"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const NAV_LINKS = ["about", "work", "art", "games", "writing", "contact"];

type DesignProject = {
  name: string;
  type: string;
  desc: string;
  tags: string[];
  href: string | null;
  label: string | null;
  rotate: string;
};

const DESIGN_WORK: DesignProject[] = [
  {
    name: "Stable Stakes — Matchup Card Redesign",
    type: "Product Design / UI-UX",
    desc: "Redesigned the matchup card system for a fantasy horse-racing platform, consolidating four card types (1v1, O/U, 1v1v1, 2v2) into a single tabular layout with a shared column grid and selection model. Tightened information density and prioritised FP/1K as the leading decision metric.",
    tags: ["UI/UX", "Product Design", "Figma"],
    href: "https://www.figma.com/design/XfhPEjd4siaUh9I0CUow5Q/Stable-Stakes---Design-Task?node-id=0-1&t=ZkhJrZwl406yGEBF-1",
    label: "View in Figma",
    rotate: "-0.8deg",
  },
  {
    name: "tiramisu",
    type: "Full-Stack Product Design",
    desc: "Owned a full-stack catering platform end-to-end: scoped the feature set, designed the interfaces (real-time dynamic pricing, event draft workflows, digital invoicing), and deployed to production.",
    tags: ["UI/UX", "Next.js", "End-to-End"],
    href: "https://tiramisu-mu.vercel.app/",
    label: "View Live",
    rotate: "0.6deg",
  },
  {
    name: "LPG360",
    type: "Full-Stack Web Application",
    desc: "Worked directly with a real business to learn their workflow, then scoped and shipped a management system covering ordering, inventory tracking, billing, and delivery — making both the feature and UX decisions independently.",
    tags: ["UI/UX", "Full-Stack", "Product"],
    href: null,
    label: null,
    rotate: "-0.5deg",
  },
  {
    name: "Automated Clinical Reporting Engine",
    type: "Document Design & Engineering",
    desc: "Engineered an automated PDF pipeline for complex ~30-page medical reports and designed the report layout itself — structuring dense clinical data for readability at a glance.",
    tags: ["Document Design", "JavaScript", "n8n"],
    href: null,
    label: null,
    rotate: "0.7deg",
  },
  {
    name: "FAST Culinary Club — Branding",
    type: "Graphic Design & Branding",
    desc: "Created the club's full visual identity — team graphics, event posters, social banners, and communications. Established a cohesive look and feel across all club touchpoints.",
    tags: ["Branding", "Graphic Design", "Canva"],
    href: "/branding",
    label: "View Posters",
    rotate: "-0.4deg",
  },
];

const GAMES = [
  {
    name: "Centipede",
    desc: "Fixed-shooter with segment-splitting enemies, mushroom-field collisions, player firing controls, and escalating waves.",
    tags: ["C++", "Game Design", "OOP"],
    href: "https://github.com/AdeenaZaib/Centipede",
    rotate: "-0.6deg",
  },
  {
    name: "Plants vs. Zombies",
    desc: "Lane-based tower defense with grid plant placement, a sun economy, multi-lane zombie waves, and projectile collisions.",
    tags: ["C++", "Game Design", "OOP"],
    href: "https://github.com/AdeenaZaib/Plants-vs-Zombies",
    rotate: "0.8deg",
  },
];

const POSTS = [
  {
    title: "The Bear",
    date: "2025",
    preview: "Amelia puts down her novel, Faithful Place, on the bedside table. Tana French is her favorite author of all time. She headed downstairs to…",
    href: "https://medium.com/@adeenazaib42/the-bear-0c23cddd8945",
    rotate: "-0.5deg",
  },
  {
    title: "I was the reason for my Grandpa's death ….",
    date: "Jun 17, 2020",
    preview: "A deeply personal story about grief, memory, and the weight of a childhood moment that stays with you forever.",
    href: "https://medium.com/@adeenazaib42/i-was-the-reason-for-my-grandpas-death-1d8f7e59f84",
    rotate: "0.7deg",
  },
  {
    title: "Lead White — Favourite of oil painters",
    date: "Jun 14, 2020",
    preview: "A deep dive into one of history's most beloved — and dangerous — pigments, used by masters from Vermeer to Rembrandt.",
    href: "https://medium.com/@adeenazaib42/lead-white-favourite-of-oil-painters-7470830fdccd",
    rotate: "-0.8deg",
  },
  {
    title: "8 Fan Theories About 'The Umbrella Academy' Season 2",
    date: "Jun 16, 2020",
    preview: "Ahead of the Season 2 drop, a roundup of the most compelling fan theories circling the internet about the Hargreeves siblings.",
    href: "https://medium.com/@adeenazaib42/8-fan-theories-about-the-umbrella-academy-season-2-7be9b542d778",
    rotate: "0.5deg",
  },
];

const TAG_BG = [
  "bg-[#A3A380]/25 text-[#5C4A3A]",
  "bg-[#D7CE93]/60 text-[#5C4A3A]",
  "bg-[#D8A48F]/30 text-[#5C4A3A]",
  "bg-[#BB8588]/20 text-[#5C4A3A]",
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.6rem", color: "#BB8588" }}>
        {children}
      </span>
      <div className="flex-1 border-b-2 border-dashed border-[#D7CE93]" />
      <span style={{ color: "#D7CE93", fontSize: "1.1rem" }}>✦</span>
    </div>
  );
}

function Tape({ color = "rgba(215,206,147,0.6)", rotate = "-2deg", style = {} }: { color?: string; rotate?: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "absolute", width: 52, height: 16,
      backgroundColor: color, borderRadius: 3,
      transform: `rotate(${rotate})`, zIndex: 10, ...style,
    }} />
  );
}

function Card({ children, rotate = "0deg", style = {} }: { children: React.ReactNode; rotate?: string; style?: React.CSSProperties }) {
  return (
    <div style={{
      position: "relative", backgroundColor: "#EDE7D9", borderRadius: 4,
      padding: "1.6rem", boxShadow: "3px 5px 18px rgba(92,74,58,0.09)",
      border: "1px solid rgba(215,206,147,0.6)", transform: `rotate(${rotate})`,
      transition: "transform 0.25s, box-shadow 0.25s", height: "100%", ...style,
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px) rotate(0deg)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "4px 10px 28px rgba(92,74,58,0.15)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${rotate})`; (e.currentTarget as HTMLDivElement).style.boxShadow = "3px 5px 18px rgba(92,74,58,0.09)"; }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const entry of entries) { if (entry.isIntersecting) setActiveSection(entry.target.id); } },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "var(--font-dm-sans), sans-serif" }}>

      {/* Doodle circles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", border: "2.5px dashed rgba(163,163,128,0.35)", top: "6%", right: "-60px" }} />
        <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "2px dashed rgba(216,164,143,0.38)", top: "16%", right: "60px" }} />
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "2px dashed rgba(187,133,136,0.28)", bottom: "22%", left: "-60px" }} />
        <div style={{ position: "absolute", width: 120, height: 120, borderRadius: "50%", border: "2px dashed rgba(215,206,147,0.5)", bottom: "38%", left: "60px" }} />
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", border: "2px dashed rgba(163,163,128,0.25)", top: "55%", right: "4%" }} />
      </div>

      {/* Scattered dots */}
      {[
        { top: "10%", left: "4%",  size: 8,  color: "#D8A48F", opacity: 0.5 },
        { top: "28%", right: "6%", size: 6,  color: "#A3A380", opacity: 0.4 },
        { top: "52%", left: "2%",  size: 10, color: "#D7CE93", opacity: 0.6 },
        { top: "70%", right: "4%", size: 7,  color: "#BB8588", opacity: 0.4 },
        { top: "86%", left: "7%",  size: 5,  color: "#A3A380", opacity: 0.35 },
      ].map((d, i) => (
        <div key={i} style={{
          position: "fixed", top: d.top,
          left: "left" in d ? d.left : undefined,
          right: "right" in d ? (d as { right: string }).right : undefined,
          width: d.size, height: d.size, borderRadius: "50%",
          backgroundColor: d.color, opacity: d.opacity,
          pointerEvents: "none", zIndex: 0,
        }} />
      ))}

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#D7CE93]/60"
        style={{ backgroundColor: "rgba(253,251,245,0.88)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.45rem", color: "#5C4A3A" }}>
            adeena. <span style={{ color: "#BB8588" }}>design</span>
          </span>
          <ul className="hidden md:flex gap-8">
            {NAV_LINKS.map(link => (
              <li key={link}>
                <a href={`#${link}`} style={{
                  fontSize: "0.82rem", textTransform: "capitalize", position: "relative",
                  color: activeSection === link ? "#BB8588" : "rgba(92,74,58,0.6)",
                  transition: "color 0.2s",
                }}>
                  {link}
                  <span style={{
                    position: "absolute", bottom: -2, left: 0, height: 2, borderRadius: 4,
                    backgroundColor: "#BB8588",
                    width: activeSection === link ? "100%" : "0%",
                    transition: "width 0.3s ease",
                  }} />
                </a>
              </li>
            ))}
          </ul>
          <button className="md:hidden text-[#5C4A3A]" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-[#D7CE93]/50 px-6 py-4 flex flex-col gap-4" style={{ backgroundColor: "#FDFBF5" }}>
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link}`} onClick={() => setMenuOpen(false)} className="capitalize text-sm text-[#5C4A3A]">{link}</a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <header className="min-h-screen flex items-center justify-center px-6 pt-14 relative overflow-hidden">
        <div className="max-w-5xl w-full mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0)" : "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}>
            <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "1.1rem", marginBottom: "0.5rem" }}>
              product designer & builder ✦
            </div>
            <h1 style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, color: "#5C4A3A", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Adeena<br />Zaib
            </h1>
            <p style={{ color: "rgba(92,74,58,0.68)", fontSize: "1rem", lineHeight: 1.8, maxWidth: 400, marginBottom: "2rem" }}>
              I design and ship products end-to-end — from{" "}
              <span style={{ color: "#BB8588", fontWeight: 600 }}>UI/UX</span> and{" "}
              <span style={{ color: "#A3A380", fontWeight: 600 }}>branding</span> to{" "}
              <span style={{ color: "#D8A48F", fontWeight: 600 }}>full-stack code</span>.
              I own features from first sketch to live product.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="mailto:adeenazaib42@gmail.com"
                style={{ backgroundColor: "#BB8588", color: "#fff", padding: "0.6rem 1.6rem", borderRadius: 999, fontSize: "0.85rem", transition: "all 0.25s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#A3A380"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#BB8588"; e.currentTarget.style.transform = "scale(1)"; }}>
                get in touch
              </a>
              <a href="https://github.com/AdeenaZaib" target="_blank" rel="noopener noreferrer"
                style={{ border: "1.5px solid #A3A380", color: "#5C4A3A", padding: "0.6rem 1.6rem", borderRadius: 999, fontSize: "0.85rem", transition: "all 0.25s", display: "inline-block" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(215,206,147,0.35)"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}>
                GitHub
              </a>
            </div>
          </div>

          {/* Miffy polaroid */}
          <div className="flex justify-center md:justify-end" style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "translateY(0) rotate(2deg)" : "translateY(30px) rotate(2deg)",
            transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
          }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <Tape color="rgba(215,206,147,0.65)" rotate="-3deg" style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-3deg)" }} />
              <div style={{ backgroundColor: "#EDE7D9", padding: "14px 14px 44px 14px", boxShadow: "0 8px 32px rgba(92,74,58,0.13)", borderRadius: 4, border: "1px solid rgba(215,206,147,0.4)" }}>
                <Image src="/miffy.png" alt="Miffy" width={220} height={260} style={{ display: "block", borderRadius: 2 }} priority />
                <p style={{ fontFamily: "var(--font-caveat), cursive", color: "#BB8588", textAlign: "center", marginTop: 10, fontSize: "1.05rem" }}>
                  designing things ✦
                </p>
              </div>
              <div style={{ position: "absolute", bottom: 12, right: -16, fontSize: "1.4rem", transform: "rotate(15deg)", color: "#D7CE93" }}>✦</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20 space-y-32 relative" style={{ zIndex: 1 }}>

        {/* About */}
        <section id="about">
          <FadeIn><SectionLabel>about</SectionLabel></FadeIn>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <FadeIn delay={80}>
              <div style={{ position: "relative", backgroundColor: "#EDE7D9", borderRadius: 4, padding: "2rem", boxShadow: "3px 4px 18px rgba(92,74,58,0.09)", border: "1px solid rgba(215,206,147,0.5)" }}>
                <Tape color="rgba(216,164,143,0.55)" rotate="2deg" style={{ top: -10, left: 28 }} />
                <h2 style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: "2rem", color: "#5C4A3A", fontWeight: 800, marginBottom: "1rem" }}>
                  Hi, I&apos;m Adeena
                </h2>
                <p style={{ color: "rgba(92,74,58,0.72)", lineHeight: 1.8, fontSize: "0.92rem", marginBottom: "0.85rem" }}>
                  I&apos;m a CS student at FAST NUCES Islamabad who designs and ships products end-to-end. I care deeply about how things look and how they work — and I don&apos;t see those as separate concerns.
                </p>
                <p style={{ color: "rgba(92,74,58,0.72)", lineHeight: 1.8, fontSize: "0.92rem" }}>
                  I&apos;ve done UI/UX for live products, created branding for a student club, redesigned card systems for a fantasy sports platform, and built games from scratch in C++. I also write — about art history, personal stories, and pop culture.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={160}>
              <div style={{ position: "relative", backgroundColor: "#EDE7D9", borderRadius: 4, padding: "2rem", boxShadow: "3px 4px 18px rgba(92,74,58,0.09)", border: "1px solid rgba(215,206,147,0.5)", transform: "rotate(0.6deg)" }}>
                <Tape color="rgba(163,163,128,0.45)" rotate="-2deg" style={{ top: -10, right: 28 }} />
                <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "1.15rem", marginBottom: "1rem" }}>toolkit ✦</div>
                <div className="space-y-3">
                  {[
                    ["Design", "Figma, Canva, Blender, UI/UX, Graphic Design & Branding"],
                    ["Code", "React, Next.js, Node.js, FastAPI, C++, Python"],
                    ["Tools", "Git, Docker, n8n, PostgreSQL, MongoDB"],
                    ["Email", "adeenazaib42@gmail.com"],
                    ["Medium", "@adeenazaib42"],
                    ["LinkedIn", "linkedin.com/in/adeena-zaib"],
                  ].map(([label, value]) => (
                    <div key={label} style={{ display: "flex", gap: "0.75rem" }}>
                      <span style={{ color: "#BB8588", fontSize: "0.8rem", fontWeight: 700, width: 64, flexShrink: 0, paddingTop: 2 }}>{label}</span>
                      <span style={{ color: "rgba(92,74,58,0.7)", fontSize: "0.83rem", lineHeight: 1.6 }}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Work */}
        <section id="work">
          <FadeIn><SectionLabel>work</SectionLabel></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {DESIGN_WORK.map((project, i) => {
              const tapeColors = ["rgba(215,206,147,0.6)", "rgba(216,164,143,0.5)", "rgba(163,163,128,0.45)", "rgba(187,133,136,0.4)", "rgba(215,206,147,0.55)"];
              const inner = (
                <Card rotate={project.rotate}>
                  <Tape color={tapeColors[i % tapeColors.length]} rotate={i % 2 === 0 ? "-2deg" : "2deg"} style={{ top: -9, left: i % 2 === 0 ? 18 : undefined, right: i % 2 !== 0 ? 18 : undefined }} />
                  <div style={{ marginBottom: "0.4rem" }}>
                    <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "0.9rem", marginBottom: "0.25rem" }}>{project.type}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <h3 style={{ fontFamily: "var(--font-nunito), sans-serif", color: "#5C4A3A", fontWeight: 700, fontSize: "1.05rem", lineHeight: 1.35 }}>{project.name}</h3>
                      {project.href && <span style={{ color: "#BB8588", fontSize: "1rem", flexShrink: 0, marginLeft: 8 }}>↗</span>}
                    </div>
                  </div>
                  <p style={{ color: "rgba(92,74,58,0.65)", fontSize: "0.83rem", lineHeight: 1.7, marginBottom: "0.9rem" }}>{project.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: project.label ? "0.9rem" : 0 }}>
                    {project.tags.map((tag, ti) => (
                      <span key={tag} className={TAG_BG[(i + ti) % TAG_BG.length]} style={{ padding: "0.15rem 0.65rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 500 }}>{tag}</span>
                    ))}
                  </div>
                  {project.label && (
                    <span style={{ fontSize: "0.78rem", color: "#BB8588", fontWeight: 600 }}>{project.label} →</span>
                  )}
                </Card>
              );
              return (
                <FadeIn key={project.name} delay={(i % 2) * 90}>
                  {project.href
                    ? <a href={project.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%" }}>{inner}</a>
                    : inner}
                </FadeIn>
              );
            })}
          </div>
        </section>

        {/* Art */}
        <section id="art">
          <FadeIn><SectionLabel>art</SectionLabel></FadeIn>
          <FadeIn delay={80}>
            <p style={{ color: "rgba(92,74,58,0.6)", fontSize: "0.85rem", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
              Acrylic and mixed media — things I make when I&apos;m not in front of a screen.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { src: "/art-face.jpg",  title: "Untitled Portrait", medium: "Acrylic on paper", rotate: "-0.8deg" },
              { src: "/art-face2.jpg", title: "Study in Shadow",   medium: "Acrylic on paper", rotate: "0.6deg"  },
            ].map((piece, i) => (
              <FadeIn key={piece.title} delay={i * 90}>
                <div style={{ position: "relative", transform: `rotate(${piece.rotate})`, transition: "transform 0.25s, box-shadow 0.25s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px) rotate(0deg)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "4px 10px 28px rgba(92,74,58,0.15)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${piece.rotate})`; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}>
                  <Tape color={i === 0 ? "rgba(215,206,147,0.65)" : "rgba(216,164,143,0.55)"} rotate={i === 0 ? "-2deg" : "2deg"} style={{ top: -9, left: "50%", transform: "translateX(-50%)" }} />
                  {/* Polaroid frame */}
                  <div style={{ backgroundColor: "#EDE7D9", padding: "10px 10px 44px 10px", boxShadow: "3px 5px 18px rgba(92,74,58,0.12)", border: "1px solid rgba(215,206,147,0.5)", borderRadius: 4 }}>
                    <Image src={piece.src} alt={piece.title} width={600} height={500} style={{ width: "100%", height: 280, objectFit: "cover", borderRadius: 2, display: "block" }} />
                    <div style={{ paddingTop: 10, textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-nunito), sans-serif", color: "#5C4A3A", fontWeight: 700, fontSize: "0.9rem" }}>{piece.title}</div>
                      <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "0.85rem" }}>{piece.medium}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Games */}
        <section id="games">
          <FadeIn><SectionLabel>games</SectionLabel></FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {GAMES.map((game, i) => (
              <FadeIn key={game.name} delay={i * 90}>
                <a href={game.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%" }}>
                  <Card rotate={game.rotate}>
                    <Tape color={i === 0 ? "rgba(215,206,147,0.6)" : "rgba(216,164,143,0.5)"} rotate={i === 0 ? "-2deg" : "2deg"} style={{ top: -9, left: 18 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                      <h3 style={{ fontFamily: "var(--font-nunito), sans-serif", color: "#5C4A3A", fontWeight: 700, fontSize: "1.05rem" }}>{game.name}</h3>
                      <span style={{ color: "#BB8588", fontSize: "1rem", flexShrink: 0, marginLeft: 8 }}>↗</span>
                    </div>
                    <p style={{ color: "rgba(92,74,58,0.65)", fontSize: "0.83rem", lineHeight: 1.7, marginBottom: "0.9rem" }}>{game.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                      {game.tags.map((tag, ti) => (
                        <span key={tag} className={TAG_BG[(i + ti) % TAG_BG.length]} style={{ padding: "0.15rem 0.65rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>
                  </Card>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Writing */}
        <section id="writing">
          <FadeIn><SectionLabel>writing</SectionLabel></FadeIn>
          <FadeIn delay={40}>
            <p style={{ color: "rgba(92,74,58,0.6)", fontSize: "0.85rem", marginBottom: "1.5rem", marginTop: "-0.5rem" }}>
              I write on{" "}
              <a href="https://medium.com/@adeenazaib42" target="_blank" rel="noopener noreferrer" style={{ color: "#BB8588", fontWeight: 600 }}>Medium</a>
              {" "}— personal essays, art history, and whatever else is on my mind.
            </p>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {POSTS.map((post, i) => (
              <FadeIn key={post.title} delay={(i % 2) * 90}>
                <a href={post.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", height: "100%" }}>
                  <Card rotate={post.rotate}>
                    <Tape color={["rgba(215,206,147,0.6)", "rgba(216,164,143,0.5)", "rgba(163,163,128,0.45)", "rgba(187,133,136,0.4)"][i % 4]} rotate={i % 2 === 0 ? "-2deg" : "2deg"} style={{ top: -9, left: i % 2 === 0 ? 18 : undefined, right: i % 2 !== 0 ? 18 : undefined }} />
                    <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "0.88rem", marginBottom: "0.4rem" }}>{post.date}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                      <h3 style={{ fontFamily: "var(--font-nunito), sans-serif", color: "#5C4A3A", fontWeight: 700, fontSize: "1rem", lineHeight: 1.4 }}>{post.title}</h3>
                      <span style={{ color: "#BB8588", fontSize: "1rem", flexShrink: 0, marginLeft: 8 }}>↗</span>
                    </div>
                    <p style={{ color: "rgba(92,74,58,0.62)", fontSize: "0.82rem", lineHeight: 1.7 }}>{post.preview}</p>
                  </Card>
                </a>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pb-10">
          <FadeIn><SectionLabel>contact</SectionLabel></FadeIn>
          <FadeIn delay={80}>
            <div style={{ position: "relative", backgroundColor: "#EDE7D9", borderRadius: 4, padding: "3.5rem 2rem", textAlign: "center", boxShadow: "3px 6px 24px rgba(92,74,58,0.1)", border: "1px solid rgba(215,206,147,0.5)", background: "linear-gradient(135deg, rgba(215,206,147,0.45), rgba(216,164,143,0.28))" }}>
              <Tape color="rgba(215,206,147,0.7)" rotate="-2deg" style={{ top: -10, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }} />
              <Tape color="rgba(163,163,128,0.5)" rotate="3deg" style={{ top: -10, left: "30%", transform: "translateX(-50%) rotate(3deg)" }} />
              <Tape color="rgba(216,164,143,0.5)" rotate="-1deg" style={{ top: -10, left: "70%", transform: "translateX(-50%) rotate(-1deg)" }} />
              <h2 style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: "2.4rem", color: "#5C4A3A", fontWeight: 800, marginBottom: "0.85rem" }}>
                Say Hello
              </h2>
              <p style={{ color: "rgba(92,74,58,0.65)", fontSize: "0.88rem", maxWidth: 340, margin: "0 auto 2.25rem", lineHeight: 1.75 }}>
                Open to design roles, freelance, collabs, and interesting conversations.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
                {[
                  { label: "Email", href: "mailto:adeenazaib42@gmail.com" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/adeena-zaib-27435b247/" },
                  { label: "Medium", href: "https://medium.com/@adeenazaib42" },
                  { label: "GitHub", href: "https://github.com/AdeenaZaib" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} target={label !== "Email" ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ backgroundColor: "#BB8588", color: "#fff", padding: "0.6rem 1.8rem", borderRadius: 999, fontSize: "0.84rem", transition: "all 0.25s", display: "inline-block" }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#A3A380"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = "#BB8588"; e.currentTarget.style.transform = "scale(1)"; }}>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>
      </main>

      <footer style={{ textAlign: "center", padding: "2rem", color: "rgba(92,74,58,0.35)", borderTop: "1px dashed rgba(215,206,147,0.5)", fontFamily: "var(--font-caveat), cursive", fontSize: "0.95rem" }}>
        © 2025 Adeena Zaib · design portfolio ✦
      </footer>
    </div>
  );
}
