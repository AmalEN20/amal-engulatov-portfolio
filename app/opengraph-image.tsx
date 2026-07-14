import { ImageResponse } from "next/og";

export const alt = "Amal Engulatov — AI Software Engineer portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "100%",
          overflow: "hidden",
          background: "linear-gradient(135deg, #061525 0%, #0d2a52 48%, #173c9c 100%)",
          color: "#f7f9ff",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -70,
            display: "flex",
            width: 640,
            height: 640,
            border: "2px solid rgba(255,255,255,.24)",
            borderRadius: "50%",
            boxShadow: "0 0 160px rgba(47,91,234,.55)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 68,
            right: 125,
            display: "flex",
            width: 340,
            height: 340,
            border: "2px solid rgba(255,255,255,.18)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "54px 64px 58px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}>
            <span>© Amal Engulatov</span>
            <span style={{ letterSpacing: "0.14em", textTransform: "uppercase" }}>Seattle, WA</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 23, letterSpacing: "0.16em", textTransform: "uppercase" }}>
              AI Software Engineer
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 88, lineHeight: 0.94, letterSpacing: "-0.065em" }}>
              Amal Engulatov—
            </div>
            <div style={{ display: "flex", maxWidth: 720, marginTop: 28, fontSize: 31, lineHeight: 1.2, color: "#dce6ff" }}>
              Building AI agents and intelligent products that make complicated work feel simple.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
