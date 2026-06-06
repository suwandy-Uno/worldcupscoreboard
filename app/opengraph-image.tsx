import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "World Cup 2026 Live Scoreboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0d1117 0%, #0f2027 50%, #1a1a2e 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "40px 40px", display: "flex" }} />

        {/* Trophy icon */}
        <div style={{ fontSize: 80, marginBottom: 16, display: "flex" }}>🏆</div>

        {/* Title */}
        <div style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", letterSpacing: "-2px", textAlign: "center", lineHeight: 1.1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span>World Cup 2026</span>
          <span style={{ color: "#f59e0b" }}>Live Scoreboard</span>
        </div>

        {/* Subtitle */}
        <div style={{ marginTop: 24, fontSize: 26, color: "#94a3b8", textAlign: "center", display: "flex" }}>
          Live Scores · Standings · Schedule · Predictions
        </div>

        {/* URL */}
        <div style={{ marginTop: 32, background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.4)", borderRadius: 12, padding: "10px 28px", fontSize: 22, color: "#f59e0b", display: "flex" }}>
          worldcupscoreboard.com
        </div>

        {/* Flag row */}
        <div style={{ position: "absolute", bottom: 32, display: "flex", gap: 12, fontSize: 36 }}>
          🇺🇸 🇨🇦 🇲🇽 ⚽ 🌍
        </div>
      </div>
    ),
    size
  );
}
