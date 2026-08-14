import { spawn } from "node:child_process";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, writeFile, copyFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ffmpeg = require("ffmpeg-static");
const root = process.cwd();
const raw = path.join(root, "public", "reels", "_craft");
const cuts = path.join(root, "public", "reels", "_craft_cuts");

const shots = [
  { id: "script", label: "Scripting & content", ids: [6951168, 854982, 37330785, 3252136] },
  { id: "shoot", label: "Video shooting", ids: [3045163, 3209298, 5752729] },
  { id: "edit", label: "Video editing", ids: [3129957, 31050550, 3141207] },
  { id: "digital", label: "Digital marketing", ids: [6981411, 3945315, 4057498] },
  { id: "branded", label: "Branded campaigns", ids: [2053100, 3195394, 3063970] },
  { id: "comms", label: "Marketing communication", ids: [7647632, 9365168, 5977498, 3252136] },
  { id: "conference", label: "Conference", ids: [7647632, 9365168, 5977498] },
  { id: "broadcast", label: "Broadcast", ids: [37330785, 6951168, 5752729] },
  { id: "live", label: "Live shows", ids: [3571264, 2022395] },
];

const suffixes = [
  "sd_640_360_30fps",
  "sd_640_360_25fps",
  "sd_640_360_24fps",
  "hd_1280_720_30fps",
  "hd_1280_720_25fps",
  "hd_1920_1080_30fps",
];

const reuse = {
  shoot: path.join(root, "public", "reels", "_biz", "film.mp4"),
  edit: path.join(root, "public", "reels", "_biz", "post.mp4"),
  digital: path.join(root, "public", "reels", "_biz", "digital.mp4"),
  branded: path.join(root, "public", "reels", "_biz", "ads.mp4"),
  live: path.join(root, "public", "reels", "_biz", "events.mp4"),
  script: path.join(root, "public", "reels", "_biz", "pre.mp4"),
};

function run(bin, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(bin, args, { stdio: "inherit" });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${args.join(" ")} -> ${code}`))));
  });
}

async function download(name, ids) {
  const dest = path.join(raw, `${name}.mp4`);
  if (existsSync(dest)) return dest;
  for (const id of ids) {
    for (const s of suffixes) {
      const url = `https://videos.pexels.com/video-files/${id}/${id}-${s}.mp4`;
      try {
        const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
        const type = res.headers.get("content-type") || "";
        if (!res.ok || !res.body || !type.includes("video")) continue;
        await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
        console.log("ok", name, id, s);
        return dest;
      } catch {
        /* next */
      }
    }
  }
  const local = reuse[name];
  if (local && existsSync(local)) {
    await copyFile(local, dest);
    console.log("reuse", name);
    return dest;
  }
  throw new Error(`no clip for ${name}`);
}

await mkdir(raw, { recursive: true });
await mkdir(cuts, { recursive: true });

const cutFiles = [];
for (const shot of shots) {
  const src = await download(shot.id, shot.ids);
  const cut = path.join(cuts, `${shot.id}.mp4`);
  await run(ffmpeg, [
    "-y", "-ss", "0.25", "-t", "2.5", "-i", src, "-an", "-r", "25",
    "-vf", "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=25,eq=contrast=1.08:brightness=-0.02:saturation=0.85,fade=t=in:st=0:d=0.18,fade=t=out:st=2.2:d=0.28",
    "-c:v", "libx264", "-preset", "veryfast", "-crf", "22", "-pix_fmt", "yuv420p", cut,
  ]);
  cutFiles.push(cut);
}

const list = path.join(cuts, "list.txt");
await writeFile(list, cutFiles.map((f) => `file '${f.replace(/\\/g, "/")}'`).join("\n"));
const out = path.join(root, "public", "reels", "house-reel.mp4");
await run(ffmpeg, ["-y", "-f", "concat", "-safe", "0", "-i", list, "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "22", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out]);
await copyFile(out, path.join(root, "public", "house-reel.mp4"));
console.log("done", out);
