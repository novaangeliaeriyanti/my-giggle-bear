"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const isId = (segment: string) => /^[0-9]+$/.test(segment) || /^[0-9a-fA-F]{24}$/.test(segment);

  const breadcrumbs = pathSegments
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");

      return { segment, href };
    })
    .filter(({ segment }) => !isId(segment))
    .map(({ segment, href }) => {
      const label = decodeURIComponent(segment)
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

      return { label, href };
    });

  return (
    <nav className="text-small">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-hover">
            Home
          </Link>
          <span className="mx-1">/</span>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index < breadcrumbs.length - 1 ? (
              <>
                <Link href={crumb.href} className="hover:text-hover">
                  {crumb.label}
                </Link>
                <span className="mx-1">/</span>
              </>
            ) : (
              <span>{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
