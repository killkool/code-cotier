export function assetPath(path?: string) {
  if (!path) return "";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!base || !path.startsWith("/") || path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
}
