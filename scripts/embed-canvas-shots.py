from pathlib import Path
import json

shots_path = Path(
    r"C:\Users\hp\.cursor\projects\c-Users-hp-Documents-Codex-2026-08-06-files-mentioned-by-the-user-production-outputs-cineverse-studios\canvases\_shots.json"
)
canvas = Path(
    r"C:\Users\hp\.cursor\projects\c-Users-hp-Documents-Codex-2026-08-06-files-mentioned-by-the-user-production-outputs-cineverse-studios\canvases\architecture-change-report.canvas.tsx"
)
shots = json.loads(shots_path.read_text(encoding="utf-8"))
text = canvas.read_text(encoding="utf-8")
start = text.index("const P =")
end = text.index("export default function")
shot_fn = """function Shot({ file, caption }: { file: string; caption: string }) {
  const theme = useHostTheme();
  const src = SHOTS[file];
  return (
    <div>
      {src ? (
        <img
          src={src}
          alt={caption}
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
            objectPosition: "top",
            display: "block",
            background: theme.bg.elevated,
          }}
        />
      ) : (
        <Text size="small" tone="secondary">
          Missing screenshot: {file}
        </Text>
      )}
      <Text size="small" tone="secondary">
        {caption}
      </Text>
    </div>
  );
}

"""
lines = ["const SHOTS: Record<string, string> = {"]
for key, value in shots.items():
    lines.append(f"  {json.dumps(key)}: {json.dumps(value)},")
lines.append("};")
lines.append("")
new = text[:start] + "\n".join(lines) + "\n" + shot_fn + text[end:]
canvas.write_text(new, encoding="utf-8")
print("wrote", canvas.stat().st_size)
