import { ImageResponse } from "next/og";

export const socialImageAlt =
  "Amal Engulatov — Full-Stack Developer and Digital Product Builder";
export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#777772", fontSize: 24 }}>
          <span>Seattle, Washington</span>
          <span>Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, letterSpacing: "-5px", lineHeight: 0.92 }}>
            Amal Engulatov
          </div>
          <div style={{ color: "#666662", fontSize: 34, letterSpacing: "-1px" }}>
            Full-Stack Developer &amp; Digital Product Builder
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", borderTop: "1px solid #d8d8d2", paddingTop: 24, color: "#777772", fontSize: 22 }}>
          Bio / Notes / Projects / Experiments
        </div>
      </div>
    ),
    socialImageSize,
  );
}
