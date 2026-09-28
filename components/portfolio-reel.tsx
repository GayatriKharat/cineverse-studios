"use client";

import { useMemo, useState } from "react";
import {
  portfolioCategories,
  portfolioVideos,
  youtubeEmbedSrc,
  youtubeThumb,
  type PortfolioCategoryId,
} from "@/lib/portfolio-videos";
import styles from "./portfolio-reel.module.css";

function PlayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

export function PortfolioReel() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategoryId | "all">("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const items = useMemo(() => {
    if (activeCategory === "all") return portfolioVideos;
    return portfolioVideos.filter((video) => video.category === activeCategory);
  }, [activeCategory]);

  const activeMeta =
    activeCategory === "all"
      ? { label: "All work", strap: "Short form, long form, VTC and podcast cuts — click any frame to play muted from YouTube." }
      : portfolioCategories.find((category) => category.id === activeCategory);

  return (
    <section id="work" className={`wrap ${styles.reel}`} aria-labelledby="portfolio-reel-title">
      <div className={styles.head}>
        <p className={styles.kicker}>Portfolio</p>
        <h2 id="portfolio-reel-title" className={styles.title}>
          Frames that <em>move<span className="title-stop">.</span></em>
        </h2>
        <p className={styles.lede}>
          Click a card to start playback muted from YouTube. Sound stays off so the room stays clean — open the platform link if you want the full mix.
        </p>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Portfolio categories">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === "all"}
          className={`${styles.tab}${activeCategory === "all" ? ` ${styles.tabActive}` : ""}`}
          onClick={() => {
            setActiveCategory("all");
            setPlayingId(null);
          }}
        >
          All
        </button>
        {portfolioCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === category.id}
            className={`${styles.tab}${activeCategory === category.id ? ` ${styles.tabActive}` : ""}`}
            onClick={() => {
              setActiveCategory(category.id);
              setPlayingId(null);
            }}
          >
            {category.label}
          </button>
        ))}
      </div>

      {activeMeta ? <p className={styles.sectionStrap}>{activeMeta.strap}</p> : null}

      <div className={styles.grid}>
        {items.map((video, index) => {
          const playing = playingId === video.id;
          const categoryLabel =
            portfolioCategories.find((category) => category.id === video.category)?.label ?? "Work";
          const portrait = video.aspect === "portrait";
          const wide = !portrait && index % 5 === 0;

          return (
            <article
              key={`${video.category}-${video.id}`}
              className={[
                styles.card,
                portrait ? styles.cardPortrait : "",
                wide ? styles.cardWide : "",
                playing ? styles.cardPlaying : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className={styles.frame}>
                {playing ? (
                  <>
                    <span className={styles.live}>
                      <i aria-hidden="true" />
                      Playing muted
                    </span>
                    <iframe
                      className={styles.player}
                      src={youtubeEmbedSrc(video.id)}
                      title={`${categoryLabel} portfolio video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    className={styles.hit}
                    aria-label={`Play ${categoryLabel} reel muted`}
                    onClick={() => setPlayingId(video.id)}
                  >
                    <img
                      className={styles.thumb}
                      src={youtubeThumb(video.id)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.shade} aria-hidden="true" />
                    <span className={styles.play} aria-hidden="true">
                      <PlayIcon />
                    </span>
                    <span className={styles.meta}>
                      <span className={styles.badge}>
                        <i className={styles.dot} aria-hidden="true" />
                        {categoryLabel}
                      </span>
                      <span className={styles.hint}>Click to play</span>
                    </span>
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <p className={styles.note}>Playback is muted by default. Videos stream from YouTube when you click a card.</p>
    </section>
  );
}
