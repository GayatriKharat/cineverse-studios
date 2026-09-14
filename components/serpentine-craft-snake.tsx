"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { splitCraftCopy } from "@/lib/craft-copy";
import type { Craft } from "@/lib/offerings";

interface SerpentineCraftSnakeProps {
  crafts: Craft[];
  serviceSlug: string;
}

// Geometric constants guaranteeing an immutable, distortion-free serpentine snake line
const ROW_HEIGHT = 190;
const PEAK_LEFT = 443;
const PEAK_RIGHT = 557;
const CENTER_X = 500;
const ROW_CENTER_OFFSET = 95;

export function SerpentineCraftSnake({ crafts, serviceSlug }: SerpentineCraftSnakeProps) {
  // First sub-service card opens by default; others open on hover/click.
  const [activeSlug, setActiveSlug] = useState<string | null>(crafts[0]?.slug ?? null);
  const [dismissedSlug, setDismissedSlug] = useState<string | null>(null);

  const totalHeight = crafts.length * ROW_HEIGHT;

  // Mathematically computed snake path: 100% IMMUTABLE.
  // Card expansion has zero effect on this curve shape!
  const pathData = useMemo(() => {
    if (crafts.length === 0) return "";

    const firstApexX = PEAK_LEFT;
    const firstApexY = ROW_CENTER_OFFSET;

    // Top entry: smooth curve from center (500, 0) into first apex
    let d = `M ${CENTER_X} 0 `;
    d += `C ${CENTER_X} 45, ${firstApexX} 50, ${firstApexX} ${firstApexY} `;

    // Undulating S-curves connecting each node apex
    for (let i = 0; i < crafts.length - 1; i++) {
      const currX = i % 2 === 0 ? PEAK_LEFT : PEAK_RIGHT;
      const nextX = i % 2 === 0 ? PEAK_RIGHT : PEAK_LEFT;
      const currY = ROW_CENTER_OFFSET + i * ROW_HEIGHT;
      const nextY = ROW_CENTER_OFFSET + (i + 1) * ROW_HEIGHT;

      // Cubic bezier control points with vertical tangents at apexes
      const cp1y = currY + 92;
      const cp2y = nextY - 92;

      d += `C ${currX} ${cp1y}, ${nextX} ${cp2y}, ${nextX} ${nextY} `;
    }

    // Bottom exit: smooth curve from last node into bottom center
    const lastIdx = crafts.length - 1;
    const lastApexX = lastIdx % 2 === 0 ? PEAK_LEFT : PEAK_RIGHT;
    const lastApexY = ROW_CENTER_OFFSET + lastIdx * ROW_HEIGHT;
    const exitY = totalHeight;

    d += `C ${lastApexX} ${lastApexY + 45}, ${CENTER_X} ${exitY - 45}, ${CENTER_X} ${exitY}`;

    return d;
  }, [crafts.length, totalHeight]);

  return (
    <div className="serpentine-section" id="sub-services-serpentine">
      <div className="serpentine-header-bar">
        <div className="serpentine-title-wrap">
          <h2 className="serpentine-section-title">Explore our services</h2>
        </div>
      </div>

      <div
        className="serpentine-track-container"
        style={{ height: `${totalHeight}px` }}
      >
          {/* Dynamic SVG Snake Line (Shape is 100% fixed and unaffected by card expansion) */}
          {pathData && (
            <svg
              className="serpentine-svg-canvas"
              width="1000"
              height={totalHeight}
              viewBox={`0 0 1000 ${totalHeight}`}
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="snakeGradientFixed" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#2337C6" stopOpacity="0.9" />
                  <stop offset="30%" stopColor="#F5B400" stopOpacity="1" />
                  <stop offset="65%" stopColor="#2337C6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#F5B400" stopOpacity="0.9" />
                </linearGradient>

                <filter id="snakeGlowFixed" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Atmospheric ambient glow */}
              <path
                d={pathData}
                stroke="url(#snakeGradientFixed)"
                strokeWidth="10"
                strokeLinecap="round"
                fill="none"
                opacity="0.22"
                filter="url(#snakeGlowFixed)"
              />

              {/* Crisp main serpentine snake path */}
              <path
                d={pathData}
                stroke="url(#snakeGradientFixed)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              {/* Constant traveling energy pulse along the fixed snake curve */}
              <circle r="6" fill="#F5B400" filter="url(#snakeGlowFixed)">
                <animateMotion dur="7s" repeatCount="indefinite" path={pathData} />
              </circle>
            </svg>
          )}

          {/* Sub-service Rows: Fixed height, anchor points never shift */}
          <div className="serpentine-rows" style={{ height: `${totalHeight}px` }}>
            {crafts.map((craft, idx) => {
              const isLeft = idx % 2 === 0;
              const formattedNum = String(idx + 1).padStart(2, "0");
              const isExtended = activeSlug === craft.slug;
              const { lead, body } = splitCraftCopy(craft.strap, craft.description || craft.strap);

              const handleToggle = () => {
                if (isExtended) {
                  // If already open, clicking closes it immediately
                  setActiveSlug(null);
                  setDismissedSlug(craft.slug);
                } else {
                  // If closed, clicking opens it
                  setActiveSlug(craft.slug);
                  setDismissedSlug(null);
                }
              };

              const handleEnter = () => {
                // Open on hover unless the user just clicked to close it while cursor is still there
                if (dismissedSlug !== craft.slug) {
                  setActiveSlug(craft.slug);
                }
              };

              const handleLeave = () => {
                // Reset dismissed state when the cursor leaves the card
                setDismissedSlug(null);
                setActiveSlug((prev) => (prev === craft.slug ? null : prev));
              };

              return (
                <div
                  key={craft.slug}
                  id={`serpentine-curve-${craft.slug}`}
                  className={`serpentine-row ${isLeft ? "is-left" : "is-right"}${isExtended ? " is-extended" : ""}`}
                >
                  {/* Left-handed Row Structure */}
                  {isLeft ? (
                    <div className="serpentine-group-left">
                      {/* Sub-service Card */}
                      <div className="serpentine-card-wrap">
                        <article
                          className="serpentine-capsule"
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                        >
                          <button
                            type="button"
                            className="serpentine-capsule-trigger"
                            aria-expanded={isExtended}
                            onClick={handleToggle}
                            id={`trigger-${craft.slug}`}
                          >
                            <h3 className="serpentine-trigger-title">{craft.title}</h3>
                            <span className="serpentine-trigger-icon" aria-hidden="true">
                              {isExtended ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </span>
                          </button>

                          {/* Extended Drawer: 100% Unchanged Exact Copy */}
                          <div className="serpentine-drawer" aria-hidden={!isExtended}>
                            <div className="serpentine-drawer-inner">
                              <div className="craft-anim-filler is-compact" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                                <i />
                              </div>
                              {lead ? <p className="serpentine-drawer-strap craft-lead-line">{lead}</p> : null}
                              {body ? <p className="serpentine-drawer-desc">{body}</p> : null}
                              <div className="serpentine-drawer-action">
                                <Link
                                  href={`/contact?service=${encodeURIComponent(serviceSlug)}&subservice=${encodeURIComponent(craft.title)}`}
                                  className="serpentine-enquire-btn"
                                  id={`enquire-btn-${craft.slug}`}
                                >
                                  <span>Enquire about {craft.title} ↗</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={handleToggle}
                                  className="serpentine-close-btn"
                                  aria-label={`Close ${craft.title}`}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>

                      {/* Gapless Horizontal Connector Bridge */}
                      <div
                        className="serpentine-bridge"
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        onClick={handleToggle}
                        aria-hidden="true"
                      >
                        <span className="serpentine-bridge-line" />
                        <span className="serpentine-bridge-pulse" />
                      </div>

                      {/* Curve Beacon Node Anchor */}
                      <div className="serpentine-node-wrap">
                        <button
                          type="button"
                          className="serpentine-curve-node"
                          aria-label={`Sub-service ${formattedNum}: ${craft.title}`}
                          aria-expanded={isExtended}
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                          onClick={handleToggle}
                        >
                          <span>{formattedNum}</span>
                        </button>
                        <div className="serpentine-node-halo" aria-hidden="true" />
                      </div>
                    </div>
                  ) : (
                    /* Right-handed Row Structure */
                    <div className="serpentine-group-right">
                      {/* Curve Beacon Node Anchor */}
                      <div className="serpentine-node-wrap">
                        <button
                          type="button"
                          className="serpentine-curve-node"
                          aria-label={`Sub-service ${formattedNum}: ${craft.title}`}
                          aria-expanded={isExtended}
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                          onClick={handleToggle}
                        >
                          <span>{formattedNum}</span>
                        </button>
                        <div className="serpentine-node-halo" aria-hidden="true" />
                      </div>

                      {/* Gapless Horizontal Connector Bridge */}
                      <div
                        className="serpentine-bridge"
                        onMouseEnter={handleEnter}
                        onMouseLeave={handleLeave}
                        onClick={handleToggle}
                        aria-hidden="true"
                      >
                        <span className="serpentine-bridge-line" />
                        <span className="serpentine-bridge-pulse" />
                      </div>

                      {/* Sub-service Card */}
                      <div className="serpentine-card-wrap">
                        <article
                          className="serpentine-capsule"
                          onMouseEnter={handleEnter}
                          onMouseLeave={handleLeave}
                        >
                          <button
                            type="button"
                            className="serpentine-capsule-trigger"
                            aria-expanded={isExtended}
                            onClick={handleToggle}
                            id={`trigger-${craft.slug}`}
                          >
                            <h3 className="serpentine-trigger-title">{craft.title}</h3>
                            <span className="serpentine-trigger-icon" aria-hidden="true">
                              {isExtended ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            </span>
                          </button>

                          {/* Extended Drawer: 100% Unchanged Exact Copy */}
                          <div className="serpentine-drawer" aria-hidden={!isExtended}>
                            <div className="serpentine-drawer-inner">
                              <div className="craft-anim-filler is-compact" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                                <i />
                              </div>
                              {lead ? <p className="serpentine-drawer-strap craft-lead-line">{lead}</p> : null}
                              {body ? <p className="serpentine-drawer-desc">{body}</p> : null}
                              <div className="serpentine-drawer-action">
                                <Link
                                  href={`/contact?service=${encodeURIComponent(serviceSlug)}&subservice=${encodeURIComponent(craft.title)}`}
                                  className="serpentine-enquire-btn"
                                  id={`enquire-btn-${craft.slug}`}
                                >
                                  <span>Enquire about {craft.title} ↗</span>
                                  <ArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                                <button
                                  type="button"
                                  onClick={handleToggle}
                                  className="serpentine-close-btn"
                                  aria-label={`Close ${craft.title}`}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="serpentine-hint-bar">
            <span>Hover or tap any curve node to explore sub-service details</span>
          </div>
        </div>
    </div>
  );
}
