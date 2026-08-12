import type { Metadata } from "next";
import "./globals.css";
import "./drone.css";
import "./media.css";
import "./assets.css";
import { Navigation } from "@/components/navigation";
import { SiteFooter } from "@/components/site-footer";
export const metadata: Metadata = {title:"Narayani Studios LLP — Brand, Media & Entertainment",description:"Narayani Studios LLP is an integrated branding, content, media, entertainment and digital-platform studio.",metadataBase:new URL("https://narayanistudios.com"),openGraph:{title:"Narayani Studios LLP",description:"Ideas that move culture.",type:"website"}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Navigation/>{children}<SiteFooter/></body></html>}
