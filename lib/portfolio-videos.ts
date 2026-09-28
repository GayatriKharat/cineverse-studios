export type PortfolioCategoryId = "short-form" | "long-form" | "new-vtc" | "podcasts-shorts";

export type PortfolioVideo = {
  id: string;
  url: string;
  category: PortfolioCategoryId;
  aspect: "portrait" | "landscape";
};

export type PortfolioCategory = {
  id: PortfolioCategoryId;
  label: string;
  strap: string;
};

/** Pull a YouTube video id from common watch / youtu.be / shorts URLs. */
export function youtubeIdFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return parsed.pathname.split("/").filter(Boolean)[0] ?? null;
    }

    if (host.endsWith("youtube.com")) {
      if (parsed.pathname.startsWith("/shorts/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.split("/")[2] ?? null;
      }
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

function entry(url: string, category: PortfolioCategoryId, aspect: "portrait" | "landscape"): PortfolioVideo | null {
  const id = youtubeIdFromUrl(url);
  if (!id) return null;
  return { id, url: `https://www.youtube.com/watch?v=${id}`, category, aspect };
}

const shortFormUrls = [
  "https://www.youtube.com/shorts/yJFZgwOxI-4",
  "https://www.youtube.com/shorts/5sSx3cM7k-Q",
  "https://youtu.be/wm4oLuOFtes",
  "https://youtu.be/hUIRxRWXxXQ",
  "https://youtube.com/shorts/Wc8V1nfxqo4",
  "https://youtu.be/01jjnhCgaZA",
  "https://youtu.be/JP9mhaG-vG8",
  "https://youtu.be/FKN5m6xAR00",
];

const longFormUrls = [
  "https://youtu.be/P0Mc8FBgfMU",
  "https://youtu.be/aseqkHQfzdE",
  "https://youtu.be/Cz28UlA3vng",
  "https://youtu.be/knS4aoWdohQ",
  "https://youtu.be/RuOToQDWvpg",
  "https://youtu.be/OoShJ76U8II",
];

const newVtcUrls = [
  "https://youtu.be/PKYNTm2m8eA",
  "https://youtu.be/75xzeXRZrHQ",
  "https://youtu.be/2F54fNUvMQY",
  "https://youtu.be/91heMUnQzHw",
  "https://youtu.be/mt8gEV58jf8",
  "https://youtu.be/wjpjbFr8foY",
  "https://youtu.be/Zfmeqs-j0cE",
  "https://youtu.be/S58s6LQxA9A",
  "https://youtu.be/y2Kad3L-MCg",
];

const podcastsShortsUrls = [
  "https://youtu.be/Bh03LiBqFuw",
  "https://youtu.be/mdSynU53eRw",
  "https://youtu.be/BSRm0jMOzRw",
  "https://youtu.be/s0vaISB4se8",
  "https://youtu.be/BEG8UWpIllM",
  "https://youtu.be/OeaFVXZxGPk",
];

function build(urls: string[], category: PortfolioCategoryId, aspect: "portrait" | "landscape"): PortfolioVideo[] {
  return urls.map((url) => entry(url, category, aspect)).filter((item): item is PortfolioVideo => Boolean(item));
}

export const portfolioCategories: PortfolioCategory[] = [
  { id: "short-form", label: "Short Form", strap: "Punchy verticals and high-retention cuts." },
  { id: "long-form", label: "Long Form", strap: "Stories built to hold attention past the first minute." },
  { id: "new-vtc", label: "New VTC", strap: "Long-form VTC work from the latest slate." },
  { id: "podcasts-shorts", label: "Podcasts & Shorts", strap: "Conversation formats and clip-ready moments." },
];

export const portfolioVideos: PortfolioVideo[] = [
  ...build(shortFormUrls, "short-form", "portrait"),
  ...build(longFormUrls, "long-form", "landscape"),
  ...build(newVtcUrls, "new-vtc", "landscape"),
  ...build(podcastsShortsUrls, "podcasts-shorts", "landscape"),
];

export function youtubeThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbedSrc(id: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    controls: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}
