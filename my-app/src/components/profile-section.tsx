"use client";

import { useState } from "react";
import Image from "next/image";
import { profile } from "@/lib/profile";

export function ProfileSection() {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = profile.avatarSrc.length > 0 && !imageFailed;

  return (
    <section className="flex flex-col items-center text-center">
      <div className="relative mb-6 h-[88px] w-[160px] overflow-hidden rounded-xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
        {showImage ? (
          <Image
            src={profile.avatarSrc}
            alt={`${profile.name} 프로필 이미지`}
            width={160}
            height={88}
            className="h-full w-full object-contain"
            priority
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center bg-[linear-gradient(180deg,var(--surface)_0%,var(--surface-hover)_100%)] text-[34px] font-semibold tracking-tight text-[var(--foreground-secondary)]"
          >
            {profile.avatarFallback}
          </div>
        )}
      </div>

      <h1 className="text-[26px] font-semibold tracking-tight text-[var(--foreground)]">
        {profile.name}
      </h1>
      <p className="mt-2 text-[15px] font-medium text-[var(--foreground-secondary)]">
        {profile.title}
      </p>
      <p className="mt-3 max-w-[280px] text-[14px] leading-relaxed text-[var(--foreground-muted)]">
        {profile.bio}
      </p>
    </section>
  );
}
