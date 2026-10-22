import { exec } from "node:child_process";

export function shellPlugin() {
  return {
    name: "chantan-shell",
    apply: "serve" as const,
    configureServer(server: any) {
      server.middlewares.use("/__shell", (req: any, res: any) => {
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: "method not allowed" }));
          return;
        }
        let raw = "";
        req.setEncoding("utf8");
        req.on("data", (chunk: string) => { raw += chunk; });
        req.on("end", () => {
          let cmd = "";
          try { cmd = String(JSON.parse(raw || "{}").cmd || ""); } catch { cmd = ""; }
          exec(cmd, { shell: "/bin/bash", maxBuffer: 52428800, cwd: process.cwd() },
            (err: any, stdout: string, stderr: string) => {
              res.statusCode = 200;
              res.end(JSON.stringify({
                stdout: String(stdout || ""),
                stderr: String(stderr || ""),
                code: err ? (typeof err.code === "number" ? err.code : 1) : 0,
                cwd: process.cwd()
              }));
            });
        });
      });
    }
  };
}

export default shellPlugin;
