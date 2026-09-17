import { ImageResponse } from "next/og";
export const alt = "Embuilded. Embedded intelligence for the built world.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ background: "#fafbfc", color: "#222832", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 75, justifyContent: "space-between" }}><div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>embuilded<span style={{ color: "#2854b8" }}>.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 70, lineHeight: 1.1 }}><span>Embedded intelligence</span><span>for the built world.</span></div><div style={{ display: "flex", borderTop: "2px solid #dce1e8", paddingTop: 24, fontSize: 20, color: "#626b78" }}>Devices. Intelligence. Evidence.</div></div>, size); }
