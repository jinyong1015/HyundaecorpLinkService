export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: "analytics" | "production";
};

export const profile = {
  name: "Hyundaecorp",
  title: "AI website",
  bio: "배너 클릭시 해당 링크로 이동됩니다.",
  /** public 폴더 이미지 경로. 비우면 이니셜 Avatar가 표시됩니다. */
  avatarSrc: "/avatar.png" as string,
  avatarFallback: "H",
};

export const socialLinks: SocialLink[] = [
  {
    id: "analytics",
    label: "검사DATA분석",
    href: "https://jinyong1015-company.vercel.app/",
    icon: "analytics",
  },
  {
    id: "production",
    label: "생산DATA 분석",
    href: "https://jinyong1015-companysangsan.vercel.app/",
    icon: "production",
  },
];
