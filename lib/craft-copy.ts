/** Prefer strap as the blue lead line; body continues without repeating it. */
export function splitCraftCopy(strap: string, description: string) {
  const lead = (strap || "").trim();
  let body = (description || "").trim();
  if (lead && body.toLowerCase().startsWith(lead.toLowerCase())) {
    body = body.slice(lead.length).replace(/^[\s.:–—-]+/, "").trim();
  }
  return { lead, body };
}
