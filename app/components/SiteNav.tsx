"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { TransitionLink } from "./SiteShell";

const links = [
  { href: "/work", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="site-nav" data-home-route={pathname === "/" ? "true" : undefined}>
      <span className="nav-reveal-mask">
        <TransitionLink
          className="site-brand nav-reveal-item"
          href="/"
          aria-label="Amal, home"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Amal
        </TransitionLink>
      </span>

      <nav aria-label="Primary navigation">
        {links.map(({ href, label }, index) => {
          const isActive = pathname === href;

          return (
            <span className="nav-reveal-mask" key={href}>
              <TransitionLink
                className="nav-reveal-item"
                href={href}
                transitionLabel={label}
                aria-current={isActive ? "page" : undefined}
                style={{ "--nav-index": index + 1 } as CSSProperties}
              >
                {label}
              </TransitionLink>
            </span>
          );
        })}
      </nav>
    </header>
  );
}
