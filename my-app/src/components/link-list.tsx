import { socialLinks } from "@/lib/profile";
import { SocialIcon } from "./social-icon";

export function LinkList() {
  return (
    <nav aria-label="소셜 링크" className="mt-10 flex w-full flex-col gap-3">
      {socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-14 w-full items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 text-[15px] font-medium text-[var(--foreground)] shadow-[var(--button-shadow)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--foreground)]"
        >
          <span className="absolute left-5 flex h-5 w-5 items-center justify-center text-[var(--foreground)]">
            <SocialIcon icon={link.icon} />
          </span>
          <span className="mx-auto">{link.label}</span>
        </a>
      ))}
    </nav>
  );
}
