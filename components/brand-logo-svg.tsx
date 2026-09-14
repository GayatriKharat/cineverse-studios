import { BrandLogo } from "@/components/brand-logo";

type BrandLogoSvgProps = {
  variant?: "dark" | "light";
  showTagline?: boolean;
  className?: string;
};

export function BrandLogoSvg({ variant = "dark", showTagline = false, className }: BrandLogoSvgProps) {
  return <BrandLogo variant={variant} showTagline={showTagline} className={className} />;
}
