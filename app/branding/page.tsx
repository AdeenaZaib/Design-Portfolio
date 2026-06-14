"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const POSTERS = [
  { src: "/branding-1.png", title: "Team Publications", desc: "Vintage editorial-style graphic for the Publications team." },
  { src: "/branding-2.png", title: "Team Finance",      desc: "Bold, high-energy graphic for the Finance team." },
  { src: "/branding-3.png", title: "Spicy Noodles Challenge", desc: "Event poster for the FAST Culinary Club challenge." },
  { src: "/branding-4.png", title: "Food for Thought",  desc: "Newsletter banner — a guide to campus food and recipes." },
  { src: "/design-blogposter.png", title: "Blog Poster", desc: "Promotional poster for the club's blog launch." },
];

export default function BrandingPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#FDFBF5",
      backgroundImage: "radial-gradient(circle, rgba(163,163,128,0.28) 1.5px, transparent 1.5px)",
      backgroundSize: "22px 22px",
      fontFamily: "var(--font-dm-sans), sans-serif",
      color: "#5C4A3A",
    }}>
      {/* Back nav */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(253,251,245,0.88)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(215,206,147,0.6)", padding: "0 1.5rem", height: 56, display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ color: "#BB8588", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: "0.4rem" }}>
          ← back
        </Link>
        <span style={{ color: "rgba(92,74,58,0.3)" }}>|</span>
        <span style={{ fontFamily: "var(--font-caveat), cursive", fontSize: "1.2rem", color: "#5C4A3A" }}>
          FAST Culinary Club — Branding
        </span>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "1rem", marginBottom: "0.4rem" }}>graphic design & branding ✦</div>
          <h1 style={{ fontFamily: "var(--font-nunito), sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, color: "#5C4A3A", marginBottom: "0.75rem", lineHeight: 1.2 }}>
            FAST Culinary Club
          </h1>
          <p style={{ color: "rgba(92,74,58,0.65)", fontSize: "0.95rem", maxWidth: 520, lineHeight: 1.8 }}>
            Visual identity work for FAST NUCES&apos;s Culinary Club — team graphics, event posters, and social banners.
            Click any poster to view full size.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.75rem" }}>
          {POSTERS.map((poster, i) => {
            const rotates = ["-0.8deg", "0.6deg", "-0.5deg", "0.7deg", "-0.4deg"];
            return (
              <div
                key={poster.title}
                onClick={() => setLightbox(poster.src)}
                style={{
                  position: "relative",
                  transform: `rotate(${rotates[i % rotates.length]})`,
                  cursor: "pointer",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px) rotate(0deg)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 12px 32px rgba(92,74,58,0.18)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = `rotate(${rotates[i % rotates.length]})`; (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; }}
              >
                {/* Tape */}
                <div style={{
                  position: "absolute", width: 52, height: 16, zIndex: 10,
                  backgroundColor: ["rgba(215,206,147,0.65)", "rgba(216,164,143,0.55)", "rgba(163,163,128,0.5)", "rgba(187,133,136,0.45)", "rgba(215,206,147,0.6)"][i % 5],
                  borderRadius: 3, top: -9, left: "50%", transform: `translateX(-50%) rotate(${i % 2 === 0 ? "-2deg" : "2deg"})`,
                }} />
                {/* Polaroid */}
                <div style={{ backgroundColor: "#EDE7D9", padding: "10px 10px 44px", boxShadow: "3px 5px 18px rgba(92,74,58,0.1)", border: "1px solid rgba(215,206,147,0.5)", borderRadius: 4 }}>
                  <Image
                    src={poster.src}
                    alt={poster.title}
                    width={400}
                    height={400}
                    style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 2, display: "block" }}
                  />
                  <div style={{ paddingTop: 10, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-nunito), sans-serif", color: "#5C4A3A", fontWeight: 700, fontSize: "0.88rem" }}>{poster.title}</div>
                    <div style={{ fontFamily: "var(--font-caveat), cursive", color: "#A3A380", fontSize: "0.82rem", marginTop: 2 }}>{poster.desc}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed", inset: 0, zIndex: 100,
            backgroundColor: "rgba(92,74,58,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "2rem", cursor: "zoom-out",
          }}
        >
          <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <Image
              src={lightbox}
              alt="Full size"
              width={1200}
              height={1200}
              style={{ maxWidth: "90vw", maxHeight: "88vh", objectFit: "contain", borderRadius: 4, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}
            />
            <button
              onClick={() => setLightbox(null)}
              style={{ position: "absolute", top: -14, right: -14, width: 32, height: 32, borderRadius: "50%", backgroundColor: "#BB8588", color: "#fff", border: "none", cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
