"use client";

import { useMemo, useState } from "react";
import {
  portfolioCategories,
  portfolioVideos,
  youtubeEmbedSrc,
  youtubeThumb,
  type PortfolioCategory,
  type PortfolioCategoryId,
  type PortfolioVideo,
} from "@/lib/portfolio-videos";
import styles from "./portfolio-reel.module.css";

function PlayIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.14v13.72L19 12 8 5.14z" />
    </svg>
  );
}

function VideoCard({
  video,
  categoryLabel,
  featured = false,
  playing,
  onPlay,
}: {
  video: PortfolioVideo;
  categoryLabel: string;
  featured?: boolean;
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <article
      className={[styles.card, featured ? styles.cardFeatured : "", playing ? styles.cardPlaying : ""]
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
            onClick={onPlay}
          >
            <img
              className={styles.thumb}
              src={youtubeThumb(video.id)}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className={styles.shade} aria-hidden="true" />
            <span className={featured ? styles.playFeatured : styles.play} aria-hidden="true">
              <PlayIcon size={featured ? 28 : 20} />
            </span>
            <span className={styles.meta}>
              <span className={styles.badge}>
                <i className={styles.dot} aria-hidden="true" />
                {featured ? "Featured" : categoryLabel}
              </span>
              <span className={styles.hint}>Click to play</span>
            </span>
          </button>
        )}
      </div>
    </article>
  );
}

function Chapter({
  category,
  index,
  videos,
  playingId,
  onPlay,
}: {
  category: PortfolioCategory;
  index: number;
  videos: PortfolioVideo[];
  playingId: string | null;
  onPlay: (id: string) => void;
}) {
  if (videos.length === 0) return null;

  const featured = videos[0];
  const supporting = videos.slice(1);
  const sectionNum = String(index + 1).padStart(2, "0");

  return (
    <section className={styles.chapter} aria-labelledby={`chapter-${category.id}`}>
      <header className={styles.chapterHead}>
        <p className={styles.chapterIndex}>Section {sectionNum}</p>
        <h3 id={`chapter-${category.id}`} className={styles.chapterTitle}>
          {category.label}
          <span className="title-stop">.</span>
        </h3>
        <p className={styles.chapterStrap}>{category.strap}</p>
      </header>

      <VideoCard
        video={featured}
        categoryLabel={category.label}
        featured
        playing={playingId === featured.id}
        onPlay={() => onPlay(featured.id)}
      />

      {supporting.length > 0 ? (
        <div className={styles.supportGrid}>
          {supporting.map((video) => (
            <VideoCard
              key={`${category.id}-${video.id}`}
              video={video}
              categoryLabel={category.label}
              playing={playingId === video.id}
              onPlay={() => onPlay(video.id)}
            />
          ))}
        </div>
      ) : null}
    </section>
  );
}

export function PortfolioReel() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategoryId | "all">("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const chapters = useMemo(() => {
    const source =
      activeCategory === "all"
        ? portfolioCategories
        : portfolioCategories.filter((category) => category.id === activeCategory);

    return source
      .map((category, index) => ({
        category,
        index: activeCategory === "all" ? index : portfolioCategories.findIndex((item) => item.id === category.id),
        videos: portfolioVideos.filter((video) => video.category === category.id),
      }))
      .filter((chapter) => chapter.videos.length > 0);
  }, [activeCategory]);

  return (
    <section id="work" className={`wrap ${styles.reel}`} aria-labelledby="portfolio-reel-title">
      <div className={styles.head}>
        <p className={styles.kicker}>Portfolio</p>
        <h2 id="portfolio-reel-title" className={styles.title}>
          Frames that <em>move<span className="title-stop">.</span></em>
        </h2>
        <p className={styles.lede}>
          Work arranged by chapter — featured frame first, then the supporting cuts. Click any card to play muted from YouTube.
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

      <div className={styles.chapters}>
        {chapters.map(({ category, index, videos }) => (
          <Chapter
            key={category.id}
            category={category}
            index={index}
            videos={videos}
            playingId={playingId}
            onPlay={setPlayingId}
          />
        ))}
      </div>

      <p className={styles.note}>Playback is muted by default. Videos stream from YouTube when you click a card.</p>
    </section>
  );
}
