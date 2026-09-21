import Link from "next/link";

const items = [
  { label: "All resources", href: "/resources" },
  { label: "Articles", href: "/resources/articles" },
  { label: "FAQs", href: "/resources/faqs" },
  { label: "Testimonials", href: "/resources/testimonials" },
] as const;

export function ResourceSubnav({ current }: { current?: string }) {
  return (
    <nav className="resource-subnav wrap" aria-label="Resources sections">
      {items.map((item) => {
        const active =
          current === item.label ||
          (current === "Articles" && item.href.includes("/articles")) ||
          (current === "FAQs" && item.href.includes("/faqs")) ||
          (current === "Testimonials" && item.href.includes("/testimonials")) ||
          (current === "All resources" && item.href === "/resources");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={active ? "is-active" : undefined}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
