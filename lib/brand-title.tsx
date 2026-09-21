import type { ReactNode } from "react";

/** Home-style title: black lead, blue emphasis, yellow stop. */
export function brandHeroTitle(title: string): ReactNode {
  const amp = title.indexOf(" & ");
  if (amp !== -1) {
    return (
      <>
        {title.slice(0, amp + 3)}
        <em>{title.slice(amp + 3)}</em>
        <span className="title-stop">.</span>
      </>
    );
  }

  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) {
    return (
      <>
        {title}
        <span className="title-stop">.</span>
      </>
    );
  }

  const last = parts.pop()!;
  return (
    <>
      {parts.join(" ")}{" "}
      <em>{last}</em>
      <span className="title-stop">.</span>
    </>
  );
}
