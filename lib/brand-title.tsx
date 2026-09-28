import type { ReactNode } from "react";

/** Plain title with yellow stop glued to the last word (never wraps alone). */
export function titleWithStop(title: string): ReactNode {
  const parts = title.trim().split(/\s+/);
  const last = parts.pop() ?? title;
  return (
    <>
      {parts.length ? `${parts.join(" ")} ` : null}
      <span className="title-end">
        {last}
        <span className="title-stop">.</span>
      </span>
    </>
  );
}

/** Home-style title: black lead, blue emphasis, yellow stop glued to last word. */
export function brandHeroTitle(title: string): ReactNode {
  const amp = title.indexOf(" & ");
  if (amp !== -1) {
    const emphasis = title.slice(amp + 3).trim().split(/\s+/);
    const last = emphasis.pop() ?? "";
    return (
      <>
        {title.slice(0, amp + 3)}
        <em>
          {emphasis.length ? `${emphasis.join(" ")} ` : null}
          <span className="title-end">
            {last}
            <span className="title-stop">.</span>
          </span>
        </em>
      </>
    );
  }

  const parts = title.trim().split(/\s+/);
  if (parts.length < 2) {
    return (
      <span className="title-end">
        {title}
        <span className="title-stop">.</span>
      </span>
    );
  }

  const last = parts.pop()!;
  return (
    <>
      {parts.join(" ")}{" "}
      <em>
        <span className="title-end">
          {last}
          <span className="title-stop">.</span>
        </span>
      </em>
    </>
  );
}
