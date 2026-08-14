export type FloorCell = {
  id: string;
  label: string;
  caption: string;
  stage: 0 | 1 | 2;
  still: string;
  video?: string;
};

/** How the house actually works — boards, set, stills, live, grade. */
export const floor: FloorCell[] = [
  {
    id: "board",
    label: "Boards",
    caption: "Brief · brand · plan",
    stage: 0,
    still: "/service-brand.png",
  },
  {
    id: "set",
    label: "Set",
    caption: "Camera · crew · light",
    stage: 1,
    still: "/service-documentary.png",
    video: "/reels/set.mp4",
  },
  {
    id: "stills",
    label: "Stills",
    caption: "Studio · product · portrait",
    stage: 1,
    still: "/service-photography.png",
    video: "/reels/still-life.mp4",
  },
  {
    id: "live",
    label: "Live",
    caption: "Stage · capture · recut",
    stage: 1,
    still: "/film-music.png",
    video: "/reels/afterglow.mp4",
  },
  {
    id: "grade",
    label: "Grade",
    caption: "Edit · colour · finish",
    stage: 2,
    still: "/service-vfx.png",
    video: "/reels/signal.mp4",
  },
  {
    id: "air",
    label: "Aerial",
    caption: "Location · drone · reveal",
    stage: 1,
    still: "/service-drone.png",
  },
];
