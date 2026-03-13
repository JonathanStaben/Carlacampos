/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Dra. Carla Campos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const sealSvg = readFileSync(
  join(process.cwd(), "public/assets/logos/Selo - Carla Campos.svg"),
  "utf8",
);

const sealDataUri = `data:image/svg+xml;base64,${Buffer.from(sealSvg).toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background:
            "linear-gradient(135deg, #f7f1ea 0%, #f1e4d1 48%, #e7d5bf 100%)",
          color: "#422354",
          padding: "56px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            border: "3px solid #bca586",
            borderRadius: "32px",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "48px",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "280px",
              height: "280px",
              borderRadius: "999px",
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #bca586",
              flexShrink: 0,
            }}
          >
            <img
              src={sealDataUri}
              alt="Selo Dra. Carla Campos"
              width={220}
              height={220}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              Dra. Carla Campos
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 34,
                color: "#6b4f7a",
              }}
            >
              Médica hematologista e transplante de medula óssea
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#5a4867",
              }}
            >
              Atendimento humanizado, individualizado e com comunicação clara.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
