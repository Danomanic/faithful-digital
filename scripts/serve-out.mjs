// Serves the static export in out/ for local preview and browser tests.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.argv[2] ?? 4321);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".txt": "text/plain",
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

async function resolveFile(pathname) {
  const candidate = join(root, normalize(decodeURIComponent(pathname)));
  if (!candidate.startsWith(root)) return null;
  const info = await stat(candidate).catch(() => null);
  if (info?.isFile()) return candidate;
  if (info?.isDirectory()) return join(candidate, "index.html");
  return null;
}

createServer(async (request, response) => {
  const { pathname } = new URL(request.url, "http://localhost");
  const file = await resolveFile(pathname);
  const body = file && (await readFile(file).catch(() => null));
  if (!body) {
    response.writeHead(404, { "content-type": types[".html"] });
    response.end(await readFile(join(root, "404.html")).catch(() => "Not found"));
    return;
  }
  response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  response.end(body);
}).listen(port, () => console.log(`Serving out/ at http://localhost:${port}/`));
