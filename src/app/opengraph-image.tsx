import { ImageResponse } from "next/og";

export const alt = "Blinders: share your screen without sharing everything";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 96, background: "#f1f0eb", color: "#18181b", gap: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: 16, background: "#2438de", display: "flex" }} />
          <div style={{ fontSize: 48, fontWeight: 600 }}>Blinders</div>
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1, maxWidth: 900 }}>Share your screen, not your secrets</div>
        <div style={{ fontSize: 32, color: "#55555d" }}>Blur or cover parts of your Mac screen with one shortcut.</div>
      </div>
    ),
    size,
  );
}
