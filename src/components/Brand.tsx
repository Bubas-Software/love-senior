import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false, href = "/" }: { compact?: boolean; href?: string }) {
  return (
    <Link href={href} className="brand-lockup" aria-label="Love Sênior Cuidados Humanizados — página inicial">
      <Image
        src="/images/love-senior-logo.png"
        alt=""
        width={654}
        height={437}
        unoptimized
        priority
        className={compact ? "h-10 w-[3.75rem] object-contain" : "h-[6rem] w-[9rem] object-contain"}
      />
    </Link>
  );
}
