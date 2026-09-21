import type { SocialLink } from "@/lib/profile";

type SocialIconProps = {
  icon: SocialLink["icon"];
  className?: string;
};

export function SocialIcon({ icon, className = "h-5 w-5" }: SocialIconProps) {
  switch (icon) {
    case "analytics":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M8 16v-5" />
          <path d="M12 16V8" />
          <path d="M16 16v-3" />
          <path d="M8 7l4-3 4 4 3-2" />
        </svg>
      );
    case "production":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M3 21h18" />
          <path d="M5 21V10l5 3V10l5 3V5h4v16" />
          <path d="M9 21v-4h3v4" />
        </svg>
      );
  }
}
