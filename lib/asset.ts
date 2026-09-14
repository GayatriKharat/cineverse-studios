/** Prefix public files for GitHub Pages (`/cineverse-studios/...`). Empty on localhost. */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path || path.startsWith("http") || path.startsWith("data:") || path.startsWith("blob:")) return path;
  const q = path.indexOf("?");
  const file = q >= 0 ? path.slice(0, q) : path;
  const query = q >= 0 ? path.slice(q) : "";
  const normalized = file.startsWith("/") ? file : `/${file}`;
  const encoded = normalized
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `${base}${encoded}${query}`;
}

export function cssUrl(path: string) {
  return `url("${asset(path)}")`;
}
