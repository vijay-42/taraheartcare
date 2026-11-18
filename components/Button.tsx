import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./Icons";

type Variant = "ink" | "pulse" | "ghost" | "light" | "outline-light";

const styles: Record<Variant, string> = {
  ink: "bg-ink text-paper hover:bg-pulse",
  pulse: "bg-pulse text-on-pulse hover:bg-pulse-deep",
  ghost: "border border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  light: "bg-paper text-ink hover:bg-pulse hover:text-on-pulse",
  "outline-light": "border border-white/25 text-white hover:bg-white hover:text-ink",
};

/** Pill button with a rolling-text hover and a spinning arrow badge. */
export default function Button({
  href,
  children,
  variant = "ink",
  icon,
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      <span className="grid size-8 place-items-center rounded-full bg-current/10 transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-45">
        {icon ?? <ArrowUpRight className="size-4" />}
      </span>
    </>
  );
  const cls = `group inline-flex items-center gap-3 whitespace-nowrap rounded-full py-2 pl-6 pr-2 text-[15px] font-medium transition-colors duration-300 ${styles[variant]} ${className}`;
  const isExternal = external || /^(tel:|mailto:|https?:)/.test(href);
  return isExternal ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
