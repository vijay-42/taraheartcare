import Image from "next/image";
import Link from "next/link";

/**
 * Brand logo. Assets are generated from /public/logo.png:
 *  - /brand/logo.png        transparent, original colours (light backgrounds)
 *  - /brand/logo-white.png  white, for dark backgrounds
 */
export default function Logo({ light = false, className = "h-[66px]" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label="TARA Heart Care, home" className="group inline-flex shrink-0 items-center">
      <Image
        src={light ? "/brand/logo-white.png" : "/brand/logo.png"}
        alt="TARA Heart Care"
        width={152}
        height={143}
        priority
        className={`w-auto transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04] ${className}`}
      />
    </Link>
  );
}
