/** Prefer strap as the blue lead line; body continues without repeating it. */
export function splitCraftCopy(strap: string, description: string) {
  const lead = (strap || "").trim();
  let body = (description || "").trim();

  if (lead && body) {
    const leadCore = lead.replace(/[.!?]+$/u, "").trim();
    const lowerBody = body.toLowerCase();
    const lowerLead = lead.toLowerCase();
    const lowerLeadCore = leadCore.toLowerCase();

    if (lowerBody.startsWith(lowerLead)) {
      body = body.slice(lead.length).replace(/^[\s.:–—-]+/u, "").trim();
    } else if (leadCore && lowerBody.startsWith(lowerLeadCore)) {
      body = body.slice(leadCore.length).replace(/^[\s.:–—-]+/u, "").trim();
    }
  }

  // If body still opens with the same sentence as the lead, drop that sentence.
  if (lead && body) {
    const leadCore = lead.replace(/[.!?]+$/u, "").trim().toLowerCase();
    const firstSentence = body.match(/^(.+?[.!?])(?:\s|$)/u)?.[1]?.trim() ?? "";
    const firstCore = firstSentence.replace(/[.!?]+$/u, "").trim().toLowerCase();
    if (firstCore && firstCore === leadCore) {
      body = body.slice(firstSentence.length).trim();
    }
  }

  return { lead, body };
}
