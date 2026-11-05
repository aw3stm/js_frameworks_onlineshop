import Link from "next/link";
import { FaInstagram, FaTiktok, FaRegEnvelope } from "react-icons/fa6";

const socials = [
  {
    href: "https://www.instagram.com",
    label: "Instagram",
    Icon: FaInstagram,
    external: true,
  },
  {
    href: "/contact",
    label: "Contact us",
    Icon: FaRegEnvelope,
    external: false,
  },
  {
    href: "https://www.tiktok.com",
    label: "TikTok",
    Icon: FaTiktok,
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="bg-atelier-details text-white">
      <div className="max-w-screen-2xl mx-auto px-8 py-12 md:px-16 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="text-2xl tracking-[0.18em]">
          Atelier North
        </Link>

        <nav aria-label="Social media and email">
          <ul className="flex items-center gap-2">
            {socials.map(({ href, label, Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="flex h-11 w-11 items-center justify-center text-white/80 hover:text-white transition-colors"
                >
                  <Icon size={22} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-white/70">© 2026 Atelier North</p>
      </div>
    </footer>
  );
}
