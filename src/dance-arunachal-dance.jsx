import { useState, useEffect } from "react";

const teams = [
  {
    id: 0, name: "Prince", role: "Mentor & Choreographer",
    accent: "#00e5a0", glow: "#00e5a033", softBg: "#00e5a012",
    count: 4, tag: "CONTEMPORARY FUSION",
    desc: "Precision meets fluidity. Pushing boundaries with contemporary fusion that's never been seen on Arunachal stages.",
  },
  {
    id: 1, name: "Nangku", role: "Mentor & Choreographer",
    accent: "#38bdf8", glow: "#38bdf833", softBg: "#38bdf812",
    count: 5, tag: "URBAN · HIP-HOP",
    desc: "Raw energy, bold expression, explosive movement. Team Nangku brings unfiltered fire to every performance.",
  },
  {
    id: 2, name: "Ravid", role: "Mentor & Choreographer",
    accent: "#ef4444", glow: "#ef444433", softBg: "#ef444412",
    count: 4, tag: "FREESTYLE · DRAMA",
    desc: "Drama, rhythm, storytelling. Ravid's team redefines what solo performance means in Northeast India.",
  },
];

const finalists = [
  { name: "Akash", tag: "Center Stage", sub: "Lead Solo Performer", accent: "#f59e0b", emoji: "🌟", rank: "01" },
  { name: "Sammy", tag: "Semi-Finalist", sub: "Solo Artist", accent: "#ef4444", emoji: "🔥", rank: "02" },
  { name: "Nikum", tag: "Semi-Finalist", sub: "Solo Artist", accent: "#38bdf8", emoji: "💫", rank: "03" },
];

function OrbitRing({ size, dotColor, duration, reverse, dotCount = 6 }) {
  return (
    <div style={{
      position: "absolute", top: "50%", left: "50%",
      width: size, height: size,
      marginTop: -size / 2, marginLeft: -size / 2,
      borderRadius: "50%",
      border: `1px solid ${dotColor}22`,
      animation: `${reverse ? "spinRev" : "spinFwd"} ${duration}s linear infinite`,
    }}>
      {[...Array(dotCount)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", top: "50%", left: "50%",
          width: 7, height: 7,
          marginTop: -3.5, marginLeft: -3.5,
          borderRadius: "50%",
          background: dotColor,
          transform: `rotate(${i * (360 / dotCount)}deg) translateX(${size / 2 - 4}px)`,
          boxShadow: `0 0 8px ${dotColor}`,
        }} />
      ))}
    </div>
  );
}

function GlassCard({ children, style = {}, accent = "#ef4444" }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? accent + "55" : "rgba(255,255,255,0.08)"}`,
        borderRadius: 28,
        transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        boxShadow: hovered
          ? `0 20px 60px ${accent}22, 0 0 0 1px ${accent}22`
          : "0 8px 32px rgba(0,0,0,0.4)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeTeam, setActiveTeam] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 120);
    const onMove = (e) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", onMove);
    const interval = setInterval(() => setTick(t => t + 1), 50);
    return () => { window.removeEventListener("mousemove", onMove); clearInterval(interval); };
  }, []);

  const t = teams[activeTeam];

  return (
    <div style={{ background: "#07070f", color: "#fff", minHeight: "100vh", overflowX: "hidden", fontFamily: "Georgia, serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&display=swap');
        @keyframes spinFwd  { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
        @keyframes spinRev  { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
        @keyframes blobA    { 0%,100%{border-radius:60% 40% 70% 30%/50% 60% 40% 50%} 50%{border-radius:40% 60% 30% 70%/60% 40% 60% 40%} }
        @keyframes blobB    { 0%,100%{border-radius:70% 30% 50% 50%/40% 60% 40% 60%} 50%{border-radius:30% 70% 60% 40%/50% 50% 60% 40%} }
        @keyframes blobC    { 0%,100%{border-radius:50% 50% 40% 60%/60% 30% 70% 40%} 50%{border-radius:60% 40% 60% 40%/40% 70% 30% 60%} }
        @keyframes floatY   { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-14px)} }
        @keyframes glowPulse{ 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.12)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
        @keyframes marquee  { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #07070f; }
        ::-webkit-scrollbar-thumb { background: #ef4444; border-radius: 4px; }
      `}</style>

      {/* FLOATING CURSOR */}
      <div style={{ position: "fixed", zIndex: 9999, pointerEvents: "none",
        top: mousePos.y * window.innerHeight - 10,
        left: mousePos.x * window.innerWidth - 10,
        width: 20, height: 20, borderRadius: "50%",
        background: "radial-gradient(circle, #ef4444cc, #ef444444)",
        boxShadow: "0 0 16px #ef4444",
        transition: "top 0.06s, left 0.06s",
      }} />
      <div style={{ position: "fixed", zIndex: 9998, pointerEvents: "none",
        top: mousePos.y * window.innerHeight - 28,
        left: mousePos.x * window.innerWidth - 28,
        width: 56, height: 56, borderRadius: "50%",
        border: "1px solid #ef444455",
        transition: "top 0.16s, left 0.16s",
      }} />

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "18px 5vw", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(7,7,15,0.7)", backdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "linear-gradient(135deg, #ef4444, #b91c1c)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: 1,
            boxShadow: "0 0 20px #ef444466",
          }}>DAD</div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: 1 }}>Dance Arunachal Dance</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#ef4444", letterSpacing: 3 }}>SEASON 2</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[ ["Teams","#teams"],["Semi-Finale","#semifinal"],["Event","#event"]].map(([label, href]) => (
            <a key={label} href={href} style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500,
              padding: "8px 18px", borderRadius: 50,
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
              color: "#aaa", textDecoration: "none", transition: "all 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.15)"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#ef444455"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#aaa"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 80 }}>

        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse 50% 50% at ${mousePos.x * 100}% ${mousePos.y * 100}%, #ef444418, transparent 70%)`,
          transition: "background 0.5s",
        }} />

        <div style={{ position: "absolute", top: "10%", right: "8%", width: 480, height: 480, background: "radial-gradient(circle, #ef444415, transparent 70%)", animation: "blobA 10s ease-in-out infinite", filter: "blur(40px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "5%", left: "5%", width: 360, height: 360, background: "radial-gradient(circle, #f59e0b0e, transparent 70%)", animation: "blobB 13s ease-in-out infinite", filter: "blur(50px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "55%", width: 300, height: 300, background: "radial-gradient(circle, #38bdf80a, transparent 70%)", animation: "blobC 9s ease-in-out infinite", filter: "blur(40px)", pointerEvents: "none" }} />

        <div style={{ position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)" }}>
          <OrbitRing size={420} dotColor="#ef4444" duration={18} reverse={false} dotCount={6} />
          <OrbitRing size={300} dotColor="#f59e0b" duration={12} reverse={true} dotCount={6} />
          <OrbitRing size={180} dotColor="#ffffff" duration={8}  reverse={false} dotCount={6} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 90, height: 90, marginTop: -45, marginLeft: -45,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ef444488, #ef444422, transparent)",
            boxShadow: "0 0 60px #ef444444",
            animation: "glowPulse 3s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: 40, height: 40, marginTop: -20, marginLeft: -20,
            borderRadius: "50%",
            background: "#ef4444",
            boxShadow: "0 0 30px #ef4444",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16,
          }}>🕺</div>
        </div>

        <div style={{ position: "relative", zIndex: 2, padding: "0 7vw", maxWidth: 680 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 20px", borderRadius: 50,
            background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)",
            marginBottom: 32,
            opacity: loaded ? 1 : 0, transition: "all 0.7s ease 0.1s",
            animation: loaded ? "none" : "none",
          }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "glowPulse 2s infinite" }} />
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 4, color: "#ef4444", fontWeight: 600 }}>YANKEES ACADEMY PRESENTS</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, lineHeight: 1, marginBottom: 12, letterSpacing: -1 }}>
            { ["DANCE", "ARUNACHAL", "DANCE"].map((word, i) => (
              <span key={word} style={{
                display: "block",
                fontSize: i === 1 ? "clamp(36px, 7.5vw, 88px)" : "clamp(48px, 9.5vw, 116px)",
                color: i === 1 ? "transparent" : "#fff",
                background: i === 1
                  ? "linear-gradient(90deg, #ef4444, #f59e0b, #ef4444)"
                  : "none",
                backgroundSize: i === 1 ? "200% auto" : "none",
                WebkitBackgroundClip: i === 1 ? "text" : "none",
                WebkitTextFillColor: i === 1 ? "transparent" : "#fff",
                animation: i === 1 ? "shimmer 4s linear infinite" : `fadeSlideUp 0.8s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.15}s both`,
                opacity: loaded ? 1 : 0,
              }}>
                {word}
              </span>
            )) }
          </h1>

          <div style={{
            display: "inline-block",
            padding: "7px 24px", borderRadius: 50,
            background: "linear-gradient(90deg, #ef4444, #b91c1c)",
            fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 5,
            marginBottom: 30, boxShadow: "0 0 30px #ef444455",
            opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.75s",
          }}>SEASON 2</div>

          <p style={{
            fontFamily: "'Outfit', sans-serif", fontSize: 15, color: "#888", lineHeight: 1.85,
            maxWidth: 420, marginBottom: 44,
            opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 0.9s",
          }}>
            Solo performance. Raw creativity. Real growth. Arunachal's most electric dance platform — back bigger and bolder than ever.
          </p>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "opacity 0.7s ease 1.1s" }}>
            {[{ label: "Meet the Teams", href: "#teams", filled: true },{ label: "Semi-Finale", href: "#semifinal", filled: false }].map(btn => (
              <a key={btn.label} href={btn.href} style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
                padding: "13px 30px", borderRadius: 50,
                background: btn.filled ? "linear-gradient(135deg, #ef4444, #b91c1c)" : "rgba(255,255,255,0.06)",
                color: "#fff", textDecoration: "none",
                border: btn.filled ? "none" : "1px solid rgba(255,255,255,0.12)",
                boxShadow: btn.filled ? "0 0 30px #ef444455" : "none",
                transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        <svg style={{ position: "absolute", bottom: -1, left: 0, width: "100%", pointerEvents: "none" }} viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,40 C360,90 1080,0 1440,50 L1440,90 L0,90 Z" fill="#07070f" />
        </svg>
      </section>

      <div style={{ background: "linear-gradient(90deg, #ef4444, #b91c1c, #ef4444)", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
          {[...Array(8)].map((_, i) => (
            <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: 4, paddingRight: 56, whiteSpace: "nowrap" }}>
              DANCE ARUNACHAL DANCE ✦ SEASON 2 ✦ SOLO PERFORMANCE ✦ CREATIVITY ✦ GROWTH ✦
            </span>
          ))}
        </div>
      </div>

      <section id="teams" style={{ padding: "110px 5vw 90px", position: "relative", overflow: "hidden" }}>

        <div style={{ position: "absolute", top: "30%", right: "-5%", width: 500, height: 500, background: `radial-gradient(circle, ${t.glow}, transparent 70%)`, filter: "blur(60px)", pointerEvents: "none", transition: "background 0.6s" }} />

        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 5, color: "#ef4444", fontWeight: 600, marginBottom: 12 }}>THE MENTORS</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(38px, 6vw, 70px)", letterSpacing: -1, lineHeight: 1 }}>
            Competing{" "}
            <span style={{ color: "transparent", WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>Teams</span>
          </h2>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 56, flexWrap: "wrap" }}>
          {teams.map(team => (
            <button key={team.id} onClick={() => setActiveTeam(team.id)} style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
              padding: "11px 28px", borderRadius: 50,
              background: activeTeam === team.id ? team.accent : "rgba(255,255,255,0.05)",
              color: activeTeam === team.id ? "#000" : "#666",
              border: `1px solid ${activeTeam === team.id ? team.accent : "rgba(255,255,255,0.08)"}`,
              cursor: "pointer", outline: "none",
              boxShadow: activeTeam === team.id ? `0 0 24px ${team.accent}55` : "none",
              transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
              transform: activeTeam === team.id ? "scale(1.06)" : "scale(1)",
            }}>
              {team.name}
            </button>
          ))}
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {teams.map((team, i) => (
            <div key={team.id} style={{
              display: activeTeam === i ? "grid" : "none",
              gridTemplateColumns: "1fr 1fr",
              gap: 24, alignItems: "start",
            }}>
              <GlassCard accent={team.accent} style={{ padding: "48px 44px" }}>
                <div style={{ position: "relative", width: 100, height: 100, marginBottom: 28 }}>
                  <OrbitRing size={100} dotColor={team.accent} duration={10} reverse={false} dotCount={6} />
                  <div style={{
                    position: "absolute", top: "50%", left: "50%",
                    width: 36, height: 36, marginTop: -18, marginLeft: -18,
                    borderRadius: "50%", background: `${team.accent}33`,
                    border: `2px solid ${team.accent}88`,
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                  }}>🕺</div>
                </div>

                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: team.accent, fontWeight: 600, marginBottom: 6 }}>
                  {team.role.toUpperCase()}
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 56, lineHeight: 0.9, marginBottom: 18, letterSpacing: -1 }}>
                  {team.name}
                </h3>

                <div style={{
                  display: "inline-block", padding: "5px 16px", borderRadius: 50,
                  background: team.softBg, border: `1px solid ${team.accent}44`,
                  fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 3,
                  color: team.accent, fontWeight: 600, marginBottom: 20,
                }}>{team.tag}</div>

                <p style={{ fontFamily: "'Outfit', sans-serif", color: "#666", fontSize: 14, lineHeight: 1.9 }}>{team.desc}</p>
              </GlassCard>

              <GlassCard accent={team.accent} style={{ padding: "48px 40px" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: "#444", fontWeight: 600, marginBottom: 28 }}>
                  TEAM MEMBERS — {team.count}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[...Array(team.count)].map((_, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "14px 18px", borderRadius: 16,
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      transition: "all 0.25s",
                      cursor: "default",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = team.softBg; e.currentTarget.style.borderColor = team.accent + "44"; e.currentTarget.style.transform = "translateX(8px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "none"; }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: "50%",
                        background: `${team.accent}20`, border: `1.5px solid ${team.accent}55`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Syne', sans-serif", fontSize: 11, fontWeight: 800, color: team.accent,
                      }}>{String(j + 1).padStart(2, "0")}</div>
                      <div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600, color: "#ccc" }}>Dancer {j + 1}</div>
                        <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: 2 }}>PERFORMER</div>
                      </div>
                      <div style={{ marginLeft: "auto" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: team.accent, opacity: 0.5 }} />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </section>

      {/* SVG Wave between sections */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", background: "#07070f", marginBottom: -1 }}>
        <path d="M0,0 C480,80 960,0 1440,60 L1440,80 L0,80 Z" fill="#0c0c18" />
      </svg>

      {/* ═══ SEMI-FINALISTS ═══ */}
      <section id="semifinal" style={{ background: "#0c0c18", padding: "90px 5vw 110px", position: "relative", overflow: "hidden" }}>

        {/* Background orbit decoration */}
        <div style={{ position: "absolute", top: "50%", right: "-100px", transform: "translateY(-50%)" }}>
          <OrbitRing size={460} dotColor="#f59e0b" duration={25} reverse={false} dotCount={6} />
          <OrbitRing size={320} dotColor="#ef444455" duration={18} reverse={true} dotCount={6} />
        </div>

        <div style={{ textAlign: "center", marginBottom: 70, position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 5, color: "#f59e0b", fontWeight: 600, marginBottom: 12 }}>SOLO PERFORMANCES</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(38px, 6vw, 70px)", letterSpacing: -1 }}>
            Semi{" "}
            <span style={{
              background: "linear-gradient(90deg, #f59e0b, #ef4444)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>Finale</span>
          </h2>
        </div>

        <div style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          {finalists.map((f, i) => (
            <GlassCard key={f.name} accent={f.accent} style={{
              flex: i === 0 ? "0 0 340px" : "0 0 260px",
              padding: i === 0 ? "44px 36px" : "34px 28px",
              marginTop: i === 0 ? 0 : i === 1 ? 36 : 72,
            }}>
              {/* Mini orbit in finalist card */}
              <div style={{ position: "relative", width: i === 0 ? 90 : 70, height: i === 0 ? 90 : 70, marginBottom: 22 }}>
                <OrbitRing size={i === 0 ? 90 : 70} dotColor={f.accent} duration={i === 0 ? 8 : 10} reverse={i % 2 === 1} dotCount={6} />
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  width: i === 0 ? 32 : 26, height: i === 0 ? 32 : 26,
                  marginTop: i === 0 ? -16 : -13, marginLeft: i === 0 ? -16 : -13,
                  borderRadius: "50%",
                  background: `${f.accent}33`, border: `2px solid ${f.accent}88`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: i === 0 ? 14 : 11,
                  animation: "floatY 3s ease-in-out infinite",
                }}>{f.emoji}</div>
              </div>

              <div style={{
                display: "inline-block", padding: "4px 14px", borderRadius: 50,
                background: `${f.accent}18`, border: `1px solid ${f.accent}44`,
                fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 3,
                color: f.accent, fontWeight: 600, marginBottom: 16,
              }}>{f.tag}</div>

              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: i === 0 ? 52 : 38, lineHeight: 0.88, letterSpacing: -1, marginBottom: 8 }}>
                {f.name}
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#555", letterSpacing: 2 }}>{f.sub.toUpperCase()}</div>

              {i === 0 && (
                <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.accent, animation: "glowPulse 2s infinite", boxShadow: `0 0 10px ${f.accent}` }} />
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: f.accent, letterSpacing: 2, fontWeight: 600 }}>CENTER STAGE</span>
                </div>
              )}

              {/* Rank watermark */}
              <div style={{
                position: "absolute", bottom: 12, right: 18,
                fontFamily: "'Syne', sans-serif", fontWeight: 800,
                fontSize: 64, color: f.accent, opacity: 0.06, lineHeight: 1, pointerEvents: "none",
              }}>{f.rank}</div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* SVG Wave */}
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: "block", background: "#0c0c18", marginBottom: -1 }}>
        <path d="M0,60 C480,0 960,80 1440,20 L1440,80 L0,80 Z" fill="#07070f" />
      </svg>

      {/* ═══ EVENT ═══ */}
      <section id="event" style={{ padding: "90px 5vw 100px", position: "relative", overflow: "hidden" }}>

        <div style={{ position: "absolute", bottom: "10%", left: "-80px" }}>
          <OrbitRing size={380} dotColor="#ef444433" duration={20} reverse={false} dotCount={6} />
        </div>
        <div style={{ position: "absolute", top: 0, right: 0, width: 400, height: 400, background: "radial-gradient(circle, #ef444410, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", marginBottom: 64, position: "relative", zIndex: 2 }}>
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, letterSpacing: 5, color: "#ef4444", fontWeight: 600, marginBottom: 12 }}>UPCOMING</div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(38px, 6vw, 70px)", letterSpacing: -1 }}>Event Details</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 2 }}>

          {/* Date card */}
          <GlassCard accent="#ef4444" style={{ padding: "52px 48px" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: "#ef4444", fontWeight: 600, marginBottom: 20 }}>DATE & VENUE</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 32 }}>
              <span style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 100, lineHeight: 0.8,
                background: "linear-gradient(135deg, #ef4444, #f59e0b)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>18</span>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, letterSpacing: 2 }}>FEB</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "#555", letterSpacing: 2 }}>2025</div>
              </div>
            </div>

            {[
              { icon: "📍", label: "Venue", val: "DK Convention Hall, Itanagar" },
              { icon: "⏰", label: "Time", val: "5:30 PM Onwards" },
              { icon: "🎯", label: "Format", val: "Solo Performance Battle" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0,
                }}>{item.icon}</div>
                <div style={{ paddingTop: 2 }}>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 3, color: "#444", fontWeight: 600, marginBottom: 2 }}>{item.label.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "#ccc" }}>{item.val}</div>
                </div>
              </div>
            ))}
          </GlassCard>

          {/* About card */}
          <GlassCard accent="#38bdf8" style={{ padding: "52px 48px" }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, letterSpacing: 4, color: "#38bdf8", fontWeight: 600, marginBottom: 20 }}>ABOUT DAD</div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 0, marginBottom: 36, borderRadius: 18, overflow: "hidden" }}>
              {[{ num: "2", label: "Seasons" }, { num: "3", label: "Teams" }, { num: "12+", label: "Dancers" }].map((s, i) => (
                <div key={s.label} style={{
                  flex: 1, padding: "20px 16px", textAlign: "center",
                  background: i === 1 ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.03)",
                  borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
                }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 40, color: "#ef4444", lineHeight: 0.9, marginBottom: 6 }}>{s.num}</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#444", letterSpacing: 2 }}>{s.label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "'Outfit', sans-serif", color: "#666", fontSize: 14, lineHeight: 1.9, marginBottom: 22,
              borderLeft: "2px solid #38bdf844", paddingLeft: 16 }}>
              Dance Arunachal Dance is more than a competition — it's a movement. Built to spotlight solo expression and the raw talent thriving in Northeast India.
            </p>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: "#333", fontSize: 13, lineHeight: 1.9, marginBottom: 36 }}>
              Unlike group competitions, DAD puts the entire stage on you — your story, your style, your moment. Every genre finds its home here.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {['Instagram', 'Facebook', 'YouTube'].map(s => (
                <span key={s} style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
                  padding: "7px 16px", borderRadius: 50,
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                  color: "#555", cursor: "pointer", transition: "all 0.25s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#ef444455"; e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#555"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
                  {s}
                </span>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "44px 5vw",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20,
        background: "rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ position: "relative", width: 48, height: 48 }}>
            <OrbitRing size={48} dotColor="#ef4444" duration={6} reverse={false} dotCount={6} />
            <div style={{ position: "absolute", top: "50%", left: "50%", width: 18, height: 18, marginTop: -9, marginLeft: -9, borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 10px #ef4444" }} />
          </div>
          <div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, letterSpacing: 1 }}>Dance Arunachal Dance</div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 10, color: "#333", letterSpacing: 3 }}>© SEASON 2 · YANKEES ACADEMY · A VENTURES</div>
          </div>
        </div>
        <button style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 600,
          padding: "12px 28px", borderRadius: 50,
          background: "linear-gradient(135deg, #ef4444, #b91c1c)",
          color: "#fff", border: "none", cursor: "pointer",
          boxShadow: "0 0 24px #ef444455",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}>
          Follow Us Now
        </button>
      </footer>
    </div>
  );
}
