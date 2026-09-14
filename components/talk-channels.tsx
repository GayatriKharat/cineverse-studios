import { SocialLinks } from "@/components/social-links";

const channels = [
  {
    label: "Email",
    value: "business@narayanistudios.com",
    href: "mailto:business@narayanistudios.com",
  },
  {
    label: "Phone",
    value: "+91 7447474431",
    href: "tel:+917447474431",
  },
] as const;

export function TalkChannels({ showLocale = false }: { showLocale?: boolean }) {
  return (
    <div className="talk-channels">
      {channels.map((channel) => (
        <a className="talk-channel" key={channel.label} href={channel.href}>
          <span className="talk-channel-label">{channel.label}</span>
          <span className="talk-channel-value">{channel.value}</span>
          <span className="talk-channel-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ))}
      {showLocale && (
        <div className="talk-channel is-static">
          <span className="talk-channel-label">Where we work</span>
          <span className="talk-channel-value">India · International</span>
        </div>
      )}
      <div className="talk-channel-socials">
        <span className="talk-channel-label">Socials</span>
        <SocialLinks />
      </div>
    </div>
  );
}
