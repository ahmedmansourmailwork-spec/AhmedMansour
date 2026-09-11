import { ImageResponse } from "next/og";
import { locales } from "@/i18n/config";

export const alt = "A&K Brand — Made in Egypt. Designed for everyone.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Share card. Drawn with primitives rather than a photograph so it renders
 * identically everywhere and needs no asset pipeline.
 */
export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0b0c",
          padding: "72px",
          fontFamily: "Helvetica, Arial, sans-serif",
        }}
      >
        {/* Warp rules */}
        <div style={{ display: "flex", position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: "1px",
                height: "100%",
                marginRight: "49px",
                backgroundColor: "#f4f1ec",
                opacity: 0.07,
              }}
            />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ width: "72px", height: "2px", backgroundColor: "#c4502b" }} />
          <div style={{ color: "#f4f1ec", fontSize: 22, letterSpacing: "0.24em", opacity: 0.7 }}>
            CLOTHING COMPANY &amp; MANUFACTURING HOUSE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f4f1ec",
              fontSize: 210,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.86,
            }}
          >
            A&amp;K
          </div>
          <div
            style={{
              color: "#c4502b",
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginTop: "8px",
            }}
          >
            BRAND
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(244,241,236,0.18)",
            paddingTop: "26px",
          }}
        >
          <div style={{ color: "#f4f1ec", fontSize: 30, opacity: 0.85 }}>
            Made in Egypt. Designed for everyone.
          </div>
          <div style={{ color: "#f4f1ec", fontSize: 22, letterSpacing: "0.2em", opacity: 0.45 }}>
            MEN · WOMEN · KIDS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
