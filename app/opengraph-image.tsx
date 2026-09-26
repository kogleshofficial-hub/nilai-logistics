import { ImageResponse } from "next/og";

export const alt = "Nilai Logistics & Trans — Peninsular Malaysia ↔ Sabah & Sarawak";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#07111f",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
          fontSize: 30,
          fontWeight: 800,
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: 16,
            background: "#0a8cff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>N</span>
        </div>
        <span>NILAI LOGISTICS &amp; TRANS</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <span
          style={{
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: "-0.05em",
          }}
        >
          Cargo that moves with clarity.
        </span>
        <span
          style={{
            marginTop: 28,
            fontSize: 28,
            color: "#9fb0c5",
          }}
        >
          Peninsular Malaysia ↔ Sabah &amp; Sarawak
        </span>
      </div>
    </div>,
    { ...size },
  );
}
