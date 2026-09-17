import { ImageResponse } from "next/og";
export const alt = "Embuilded. Embedded intelligence for the built world.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ background: "#182322", color: "#f3f6ee", width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: 75, justifyContent: "space-between" }}><div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>embuilded<span style={{ color: "#f47843" }}>.</span></div><div style={{ display: "flex", flexDirection: "column", fontSize: 70, lineHeight: 1.1 }}><span>Embedded intelligence</span><span style={{ color: "#c4d4b5" }}>for the built world.</span></div><div style={{ display: "flex", borderTop: "2px solid #4b5f4c", paddingTop: 24, fontSize: 20, color: "#ced8cf" }}>Devices. Intelligence. Evidence.</div></div>, size); }
