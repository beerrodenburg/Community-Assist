import { CommunityAssistHeart } from "@/components/brand/CommunityAssistHeart";

export function Footer() {
  return (
    <footer className="mt-24 flex flex-col items-center gap-6 pb-12">
      <CommunityAssistHeart className="h-16 w-auto text-[color:var(--color-ca-pink)]" />
      <a
        href="https://www.instagram.com/communityassistbali/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Community Assist on Instagram"
        className="text-[color:var(--color-ca-pink)] transition-opacity hover:opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </footer>
  );
}
