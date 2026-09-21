import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";

export function HomeCard({
  href,
  title,
  copy,
  image,
  index = 0,
}: {
  href?: string;
  title: string;
  copy: string;
  image?: string;
  index?: number;
}) {
  const isWhite = index % 2 === 0;
  const className = `service-architecture-card${href ? " service-card-link" : ""} ${isWhite ? "card-theme-white" : "card-theme-blue"}`;

  const face = (
    <div className="service-card-face">
      {image ? (
        <div className="service-card-media-wrap">
          <img src={asset(image)} alt={title} className="service-card-image" />
        </div>
      ) : null}
      <div className="service-card-body">
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      {isWhite && <span className="service-card-yellow-slash" aria-hidden="true" />}
      {href ? (
        <span className="service-card-arrow-action" aria-hidden="true">
          <ArrowUpRight className="service-card-arrow-icon" size={34} strokeWidth={2.4} />
        </span>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link className={className} href={href}>
        {face}
      </Link>
    );
  }

  return <article className={className}>{face}</article>;
}
