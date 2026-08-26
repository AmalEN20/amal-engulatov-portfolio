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
          background: "#090909",
          color: "#f5f5f5",
          padding: "72px 80px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", color: "#8c8c8c", fontSize: 24 }}>
          <span>Seattle, Washington</span>
          <span>Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 88, letterSpacing: "-5px", lineHeight: 0.92 }}>
            Amal Engulatov
          </div>
          <div style={{ color: "#a3a3a3", fontSize: 34, letterSpacing: "-1px" }}>
            Full-Stack Developer &amp; Digital Product Builder
          </div>
        </div>
        <div style={{ display: "flex", width: "100%", borderTop: "1px solid #343434", paddingTop: 24, color: "#8c8c8c", fontSize: 22 }}>
          Selected work / Capabilities / Connect
        </div>
      </div>
    ),
    socialImageSize,
  );
}
