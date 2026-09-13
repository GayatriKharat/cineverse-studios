"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  AlertCircle,
  Users,
  Check,
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  LayoutGrid,
  SlidersHorizontal,
  Layers,
  Clock,
  Compass,
} from "lucide-react";
import type { Craft } from "@/lib/offerings";

export function SubServicesShowcase({
  crafts,
  serviceSlug,
  serviceTitle,
  serviceCode,
}: {
  crafts: Craft[];
  serviceSlug: string;
  serviceTitle: string;
  serviceCode: string;
}) {
  const [activeSlug, setActiveSlug] = useState<string>(crafts[0]?.slug ?? "");
  const [viewMode, setViewMode] = useState<"spotlight" | "grid">("spotlight");

  // Sync with URL hash if provided
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && crafts.some((c) => c.slug === hash)) {
        setActiveSlug(hash);
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [crafts]);

  const activeIndex = crafts.findIndex((c) => c.slug === activeSlug);
  const currentCraft = crafts[activeIndex] || crafts[0];

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${slug}`);
    }
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + crafts.length) % crafts.length;
    handleSelect(crafts[prevIndex].slug);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % crafts.length;
    handleSelect(crafts[nextIndex].slug);
  };

  if (!crafts || crafts.length === 0) return null;

  return (
    <section id="subservices-showcase" className="subservices-section">
      <div className="wrap">
        {/* Section Header */}
        <div className="subservices-head">
          <div className="subservices-head-text">
            <span className="subservices-eyebrow">
              <Layers className="icon-tiny" />
              Division {serviceCode} · Core Capabilities
            </span>
            <h2 className="subservices-title">
              What We Do Inside <em>{serviceTitle}</em>
            </h2>
            <p className="subservices-lede">
              Explore each sub-service below to understand exactly what it is for, the specific problems we solve, the deliverables you receive, and our execution process.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="subservices-view-toggle">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "spotlight" ? "is-active" : ""}`}
              onClick={() => setViewMode("spotlight")}
              aria-label="Interactive Spotlight View"
            >
              <SlidersHorizontal className="icon-tiny" />
              <span>Interactive Spotlight</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === "grid" ? "is-active" : ""}`}
              onClick={() => setViewMode("grid")}
              aria-label="View All Grid View"
            >
              <LayoutGrid className="icon-tiny" />
              <span>All Sub-Services ({crafts.length})</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* VIEW MODE 1: INTERACTIVE SPOTLIGHT STAGE (DEFAULT)        */}
        {/* ========================================================= */}
        {viewMode === "spotlight" && currentCraft && (
          <div className="subservices-spotlight-wrapper">
            {/* Horizontal Sub-Service Navigation Rail */}
            <div className="subservices-nav-rail" role="tablist">
              {crafts.map((craft, idx) => {
                const isActive = craft.slug === currentCraft.slug;
                return (
                  <button
                    key={craft.slug}
                    role="tab"
                    aria-selected={isActive}
                    className={`subservice-nav-pill ${isActive ? "is-active" : ""}`}
                    onClick={() => handleSelect(craft.slug)}
                  >
                    <span className="nav-pill-index">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="nav-pill-title">{craft.title}</span>
                    {isActive && <span className="nav-pill-dot" />}
                  </button>
                );
              })}
            </div>

            {/* Spotlight Showcase Stage */}
            <div className="spotlight-card" id={currentCraft.slug}>
              {/* Media Column (Left) */}
              <div className="spotlight-media-col">
                <div className="spotlight-image-container">
                  <Image
                    src={currentCraft.image}
                    alt={`${currentCraft.title} - ${serviceTitle}`}
                    width={760}
                    height={440}
                    className="spotlight-image"
                    priority
                    referrerPolicy="no-referrer"
                  />
                  <div className="spotlight-badge-overlay">
                    <span className="spotlight-index-tag">
                      Sub-Service {String(activeIndex + 1).padStart(2, "0")} of {String(crafts.length).padStart(2, "0")}
                    </span>
                    <span className="spotlight-division-tag">Division {serviceCode}</span>
                  </div>
                </div>

                {/* Who this is for callout card */}
                {currentCraft.forWho && (
                  <div className="spotlight-target-box">
                    <div className="target-box-header">
                      <Users className="icon-small text-gold" />
                      <strong>Who It Is For</strong>
                    </div>
                    <p>{currentCraft.forWho}</p>
                  </div>
                )}

                {/* Direct Enquiry CTA Box */}
                <div className="spotlight-cta-box">
                  <div>
                    <span className="cta-box-sub">Ready to deploy this capability?</span>
                    <h4 className="cta-box-title">Start with {currentCraft.title}</h4>
                  </div>
                  <Link
                    href={`/contact?service=${encodeURIComponent(serviceSlug)}&subservice=${encodeURIComponent(currentCraft.title)}`}
                    className="button spotlight-enquire-btn"
                  >
                    <span>Enquire Now</span>
                    <ArrowUpRight className="icon-small" />
                  </Link>
                </div>
              </div>

              {/* Information Column (Right) */}
              <div className="spotlight-info-col">
                <div className="spotlight-header">
                  <div className="spotlight-index-header">
                    <span className="spotlight-eyebrow-num">CAPABILITY 0{activeIndex + 1}</span>
                    <div className="spotlight-nav-buttons">
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="spotlight-nav-arrow"
                        aria-label="Previous sub-service"
                        title="Previous capability"
                      >
                        <ArrowLeft className="icon-small" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="spotlight-nav-arrow"
                        aria-label="Next sub-service"
                        title="Next capability"
                      >
                        <ArrowRight className="icon-small" />
                      </button>
                    </div>
                  </div>

                  <h3 className="spotlight-craft-title">{currentCraft.title}</h3>
                  <p className="spotlight-strap">{currentCraft.strap}</p>
                </div>

                {/* Purpose / What this service is for */}
                <div className="spotlight-purpose-section">
                  <h4 className="spotlight-section-heading">
                    <Compass className="icon-tiny text-blue" />
                    What Actually This Service Is For
                  </h4>
                  <p className="spotlight-desc-text">{currentCraft.description}</p>
                </div>

                {/* Problem vs Solution Grid */}
                {(currentCraft.problem || currentCraft.solution) && (
                  <div className="spotlight-insight-grid">
                    {currentCraft.problem && (
                      <div className="insight-card challenge-card">
                        <div className="insight-card-header">
                          <AlertCircle className="icon-small text-alert" />
                          <strong>The Problem It Solves</strong>
                        </div>
                        <p>{currentCraft.problem}</p>
                      </div>
                    )}
                    {currentCraft.solution && (
                      <div className="insight-card solution-card">
                        <div className="insight-card-header">
                          <Sparkles className="icon-small text-blue" />
                          <strong>Narayani Studios Approach</strong>
                        </div>
                        <p>{currentCraft.solution}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Deliverables: What You Leave With */}
                {currentCraft.deliverables && currentCraft.deliverables.length > 0 && (
                  <div className="spotlight-deliverables-section">
                    <h4 className="spotlight-section-heading">
                      <Check className="icon-tiny text-blue" />
                      What You Leave With (Deliverables)
                    </h4>
                    <div className="deliverables-chips-wrap">
                      {currentCraft.deliverables.map((item) => (
                        <div key={item} className="deliverable-chip">
                          <Check className="icon-tiny chip-check" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Execution Workflow / Steps */}
                {currentCraft.steps && currentCraft.steps.length > 0 && (
                  <div className="spotlight-workflow-section">
                    <h4 className="spotlight-section-heading">
                      <Clock className="icon-tiny text-blue" />
                      Execution Process & Timeline
                    </h4>
                    <div className="workflow-steps-track">
                      {currentCraft.steps.map((step, sIdx) => (
                        <div key={step} className="workflow-step-node">
                          <div className="step-badge">
                            <span>0{sIdx + 1}</span>
                          </div>
                          <div className="step-label">
                            <strong>Step 0{sIdx + 1}</strong>
                            <span>{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* VIEW MODE 2: ALL SUB-SERVICES GRID VIEW                    */}
        {/* ========================================================= */}
        {viewMode === "grid" && (
          <div className="subservices-grid-wrapper">
            <div className="subservices-cards-grid">
              {crafts.map((craft, index) => (
                <article key={craft.slug} id={craft.slug} className="subservice-grid-card">
                  {/* Top 16:9 Image */}
                  <div className="grid-card-media">
                    <Image
                      src={craft.image}
                      alt={craft.title}
                      width={600}
                      height={340}
                      className="grid-card-image"
                      referrerPolicy="no-referrer"
                    />
                    <div className="grid-card-tag">
                      <span>0{index + 1}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="grid-card-body">
                    <div className="grid-card-meta">
                      <span className="grid-card-num">CAPABILITY 0{index + 1}</span>
                      <span className="grid-card-division">DIV {serviceCode}</span>
                    </div>

                    <h3 className="grid-card-title">{craft.title}</h3>
                    <p className="grid-card-strap">{craft.strap}</p>
                    <p className="grid-card-desc">{craft.description}</p>

                    {/* Problem/Solution Quick Snippets */}
                    {craft.problem && (
                      <div className="grid-mini-insight">
                        <strong>The Challenge:</strong>
                        <p>{craft.problem}</p>
                      </div>
                    )}
                    {craft.solution && (
                      <div className="grid-mini-insight is-solution">
                        <strong>Studio Solution:</strong>
                        <p>{craft.solution}</p>
                      </div>
                    )}

                    {/* Deliverables Tags */}
                    {craft.deliverables && craft.deliverables.length > 0 && (
                      <div className="grid-deliverables-box">
                        <small className="grid-subhead">Deliverables</small>
                        <div className="grid-chips">
                          {craft.deliverables.map((item) => (
                            <span key={item} className="grid-chip">
                              ✓ {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Process Steps */}
                    {craft.steps && craft.steps.length > 0 && (
                      <div className="grid-steps-box">
                        <small className="grid-subhead">Execution Workflow</small>
                        <ol className="grid-steps-list">
                          {craft.steps.map((step, sIdx) => (
                            <li key={step}>
                              <b>0{sIdx + 1}</b> {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Card Footer CTA */}
                    <div className="grid-card-foot">
                      <Link
                        href={`/contact?service=${encodeURIComponent(serviceSlug)}&subservice=${encodeURIComponent(craft.title)}`}
                        className="button grid-enquire-btn"
                      >
                        Enquire About {craft.title}
                        <ArrowUpRight className="icon-small" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
