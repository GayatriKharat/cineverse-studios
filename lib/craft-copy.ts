/** Blue lead = first sentence once; black body = remaining sentences only. */
export function splitCraftCopy(strap: string, description: string) {
  const strapText = (strap || "").trim();
  const desc = (description || "").trim();
  const source = desc || strapText;

  const firstMatch = source.match(/^(.+?[.!?])(?:\s+|$)/u);
  const firstSentence = firstMatch?.[1]?.trim() ?? source;

  // Prefer strap as the blue lead when available (short, intentional line).
  const lead = strapText || firstSentence;

  // Body is everything after the first sentence of the description,
  // so the opening idea never repeats under the lead.
  let body = "";
  if (desc && firstMatch) {
    body = desc.slice(firstMatch[0].length).trim();
  }

  body = stripLeadingEcho(lead, body);
  return { lead, body };
}

function stripLeadingEcho(lead: string, body: string) {
  if (!lead || !body) return body;

  const leadCore = lead.replace(/[.!?]+$/u, "").trim().toLowerCase();
  const lowerBody = body.toLowerCase();

  if (lowerBody.startsWith(leadCore)) {
    return body.slice(leadCore.length).replace(/^[\s.:–—-]+/u, "").trim();
  }

  const bodyFirst = body.match(/^(.+?[.!?])(?:\s+|$)/u)?.[1]?.trim() ?? "";
  const bodyCore = bodyFirst.replace(/[.!?]+$/u, "").trim().toLowerCase();
  if (bodyCore && bodyCore === leadCore) {
    return body.slice(bodyFirst.length).trim();
  }

  return body;
}
