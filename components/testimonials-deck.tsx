"use client";

import { useRef, useState } from "react";

type Testimonial = { quote: string; name: string; scope: string };

export function TestimonialsDeck({ items }: { items: readonly Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, down: false });
  const start = useRef({ x: 0, y: 0 });

  const rotate = (direction: number) => {
    setActive((current) => (current + direction + items.length) % items.length);
    setDrag({ x: 0, y: 0, down: false });
  };

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    start.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setDrag({ x: 0, y: 0, down: true });
  };

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!drag.down) return;
    setDrag({ x: event.clientX - start.current.x, y: event.clientY - start.current.y, down: true });
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (!drag.down) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    if (Math.abs(drag.x) > 70) rotate(drag.x < 0 ? 1 : -1);
    else setDrag({ x: 0, y: 0, down: false });
  };

  const prev = (active - 1 + items.length) % items.length;
  const next = (active + 1) % items.length;

  return (
    <div className="testimonial-deck-shell">
      <div className="testimonial-deck" aria-label="Draggable client testimonials">
        {items.map((item, index) => {
          const isFront = index === active;
          const isPrev = index === prev;
          const isNext = index === next;
          const show = isFront || isPrev || isNext;
          const position = isFront ? 0 : isNext ? 1 : -1;
          const x = isFront ? drag.x : position * 200;
          const y = isFront ? drag.y : 0;
          const rotateZ = isFront ? drag.x * 0.035 : position * 3;
          // Perspective lives only on side cards. Putting it on the shell
          // makes Chromium soft-rasterize the front quote.
          const transform = isFront
            ? `translate(${x}px, ${y}px) rotate(${rotateZ}deg)`
            : `perspective(1400px) translate(${show ? x : position * 420}px, ${y}px) rotateZ(${rotateZ}deg) rotateY(${position * -28}deg) scale(0.82)`;

          return (
            <article
              className={`testimonial-card${isFront ? " is-front" : ""}${drag.down && isFront ? " is-dragging" : ""}`}
              key={`${item.name}-${index}`}
              style={{
                zIndex: isFront ? items.length : show ? 2 : 0,
                opacity: show ? 1 : 0,
                pointerEvents: show ? "auto" : "none",
                transform,
              }}
              onPointerDown={isFront ? onPointerDown : undefined}
              onPointerMove={isFront ? onPointerMove : undefined}
              onPointerUp={isFront ? onPointerUp : undefined}
              onPointerCancel={isFront ? onPointerUp : undefined}
              onClick={() => {
                if (!drag.x && !isFront && show) setActive(index);
              }}
            >
              <div className="testimonial-card-top">
                <span className="testimonial-signal">
                  0{index + 1} / 0{items.length}
                </span>
                <span className="testimonial-orbit" aria-hidden="true">
                  ◌
                </span>
              </div>
              <span className="stars" aria-label="5 stars">
                ★★★★★
              </span>
              <blockquote>“{item.quote}”</blockquote>
              <footer>
                <b>{item.name}</b>
                <small>{item.scope}</small>
              </footer>
              <span className="testimonial-card-line" aria-hidden="true" />
            </article>
          );
        })}
      </div>
      <div className="testimonial-deck-controls" aria-label="Testimonial controls">
        <button type="button" onClick={() => rotate(-1)} aria-label="Previous testimonial">
          ←
        </button>
        <span>
          <b>0{active + 1}</b> / 0{items.length}
        </span>
        <button type="button" onClick={() => rotate(1)} aria-label="Next testimonial">
          →
        </button>
      </div>
    </div>
  );
}
