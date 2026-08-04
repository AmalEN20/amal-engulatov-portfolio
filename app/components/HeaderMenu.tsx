"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  ["Work", "#work"],
  ["Projects", "#projects"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isOpen]);

  return (
    <div className="header-menu" ref={menuRef}>
      <button
        ref={buttonRef}
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="header-menu-panel"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
        <i aria-hidden="true" />
      </button>

      <nav
        className="menu-panel"
        id="header-menu-panel"
        aria-label="Primary navigation"
        aria-hidden={!isOpen}
        data-open={isOpen}
      >
        {links.map(([label, href], index) => (
          <a href={href} key={href} tabIndex={isOpen ? 0 : -1} onClick={() => setIsOpen(false)}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </a>
        ))}
      </nav>
    </div>
  );
}
