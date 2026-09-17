import { cp, access } from "node:fs/promises";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const standalone = new URL("../.next/standalone/", import.meta.url);
try { await access(new URL("server.js",standalone)); }
catch { console.error("Production build missing. Run npm run build first."); process.exit(1); }
await cp(new URL("../public/",import.meta.url),new URL("public/",standalone),{recursive:true});
await cp(new URL("../.next/static/",import.meta.url),new URL(".next/static/",standalone),{recursive:true});
const child = spawn(process.execPath,[fileURLToPath(new URL("server.js",standalone))],{stdio:"inherit",env:{...process.env,HOSTNAME:process.env.HOSTNAME || "0.0.0.0"}});
for (const signal of ["SIGINT","SIGTERM"]) process.on(signal,()=>child.kill(signal));
child.on("exit",code=>process.exit(code??1));
