import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap" style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px" }}>
      <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", marginBottom: "16px", color: "var(--color-primary, #2337c6)" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "12px", color: "var(--ink, #111)" }}>Page Not Found</h2>
      <p style={{ maxWidth: "460px", marginBottom: "28px", color: "#666" }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/" className="button" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
        Back to Home
      </Link>
    </main>
  );
}
