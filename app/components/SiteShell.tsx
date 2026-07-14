"use client";

import { AnimatePresence, motion } from "motion/react";
import NextLink from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ComponentProps, MouseEvent as ReactMouseEvent } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const introItems = ["ChatGPT", "Claude", "Codex", "Cursor", "Gemini", "Copilot", "Perplexity", "Replit", "LangChain", "MCP", "AI Agents"];
const aiCompanies = ["OpenAI", "Anthropic", "Google DeepMind", "xAI", "Mistral AI", "Hugging Face"];

type TransitionState = { href: string; label: string };

const TransitionContext = createContext<{
  navigate: (href: string, label: string) => void;
  pathname: string;
} | null>(null);

function labelFromHref(href: string) {
  if (href === "/") return "Home";
  if (href === "/work") return "Projects";
  if (href === "/about") return "About";
  if (href === "/contact") return "Contact";
  const lastPart = href.split("/").filter(Boolean).pop() ?? "Next";
  return lastPart.split("-").map((word) => word[0]?.toUpperCase() + word.slice(1)).join(" ");
}

function indexFromHref(href: string) {
  const index = navItems.findIndex((item) => item.href === href);
  return String(index >= 0 ? index + 1 : 1).padStart(2, "0");
}

type TransitionLinkProps = Omit<ComponentProps<typeof NextLink>, "href" | "onClick"> & {
  href: string;
  transitionLabel?: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
};

export function TransitionLink({ href, transitionLabel, onClick, children, ...props }: TransitionLinkProps) {
  const transition = useContext(TransitionContext);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target === "_blank" ||
      href.startsWith("#")
    ) return;

    if (!transition || href === transition.pathname) return;
    event.preventDefault();
    transition.navigate(href, transitionLabel ?? labelFromHref(href));
  };

  return <NextLink href={href} onClick={handleClick} {...props}>{children}</NextLink>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const cursor = useRef<HTMLDivElement>(null);
  const pageRevealPending = useRef(false);
  const introRevealStarted = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const [introActive, setIntroActive] = useState(true);
  const [introExiting, setIntroExiting] = useState(false);
  const [introIndex, setIntroIndex] = useState(0);
  const [floatingMenuVisible, setFloatingMenuVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIntroIndex(introItems.length - 1);
      const reducedTimer = window.setTimeout(() => setIntroActive(false), 220);
      return () => window.clearTimeout(reducedTimer);
    }

    const step = 150;
    const itemTimers = introItems.slice(1).map((_, index) =>
      window.setTimeout(() => setIntroIndex(index + 1), step * (index + 1)),
    );
    const exitTimer = window.setTimeout(() => setIntroExiting(true), step * introItems.length + 40);
    const finishTimer = window.setTimeout(() => setIntroActive(false), step * introItems.length + 860);
    return () => {
      itemTimers.forEach((timer) => window.clearTimeout(timer));
      window.clearTimeout(exitTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
    const syncScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", syncScrollTrigger);
    let frame = 0;
    const tick = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick);

    const move = (event: globalThis.MouseEvent) => {
      if (!cursor.current) return;
      gsap.to(cursor.current, { x: event.clientX, y: event.clientY, duration: 0.16, ease: "power2.out" });
    };
    const enter = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement;
      cursor.current?.setAttribute("data-active", String(Boolean(target.closest("a, button"))));
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", enter);
    return () => {
      cancelAnimationFrame(frame);
      lenis.off("scroll", syncScrollTrigger);
      lenis.destroy();
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", enter);
    };
  }, []);

  useEffect(() => {
    if (introActive && !introExiting) {
      gsap.set(".line-mask > span", { y: "112%" });
      gsap.set(".reveal-line", { opacity: 0 });
      gsap.set(".reveal-up", { y: 60, opacity: 0 });
      return;
    }

    if (transition) {
      if (pathname === transition.href) {
        pageRevealPending.current = true;
        gsap.set(".line-mask > span", { y: "112%" });
        gsap.set(".reveal-line", { opacity: 0 });
        gsap.set(".reveal-up", { y: 60, opacity: 0 });
      }
      return;
    }

    if (!introActive && introRevealStarted.current) {
      introRevealStarted.current = false;
      return;
    }

    const isIntroExitReveal = introActive && introExiting;
    if (isIntroExitReveal) introRevealStarted.current = true;
    const revealDelay = pageRevealPending.current ? 820 : 0;
    let context: gsap.Context | undefined;
    const animationTimer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      context = gsap.context(() => {
        gsap.set(".line-mask > span", { y: "112%" });
        gsap.set(".reveal-line", { opacity: 0 });
        gsap.set(".reveal-up", { y: 60, opacity: 0 });
        gsap.to(".line-mask > span", { y: 0, duration: 1.05, stagger: 0.08, ease: "power4.out", delay: 0.05 });
        gsap.to(".reveal-line", { opacity: 1, duration: 0.8, delay: 0.18 });
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((element, index) => {
          const isPriorityReveal = element.matches(".work-card, .project-row");
          const isAlreadyVisible = isPriorityReveal || element.getBoundingClientRect().top < window.innerHeight * 0.94;
          gsap.to(element, {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: isAlreadyVisible ? 0.08 + index * 0.055 : 0,
            ease: "power3.out",
            ...(isAlreadyVisible ? {} : { scrollTrigger: { trigger: element, start: "top 90%", once: true } }),
          });
        });
        ScrollTrigger.refresh();
      });
      pageRevealPending.current = false;
    }, revealDelay);

    return () => {
      window.clearTimeout(animationTimer);
      if (!isIntroExitReveal) context?.revert();
    };
  }, [introActive, introExiting, pathname, transition]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || transition || introActive ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [introActive, menuOpen, transition]);

  useEffect(() => {
    const updateFloatingMenu = () => setFloatingMenuVisible(window.scrollY > 120);
    updateFloatingMenu();
    window.addEventListener("scroll", updateFloatingMenu, { passive: true });
    return () => window.removeEventListener("scroll", updateFloatingMenu);
  }, [pathname]);

  const navigate = useCallback((href: string, label: string) => {
    setMenuOpen(false);
    setTransition({ href, label });
  }, []);

  useEffect(() => {
    if (!transition || pathname === transition.href) return;
    const routeTimer = window.setTimeout(() => router.push(transition.href), 900);
    return () => window.clearTimeout(routeTimer);
  }, [pathname, router, transition]);

  useEffect(() => {
    if (!transition || pathname !== transition.href) return;
    const revealTimer = window.setTimeout(() => setTransition(null), 260);
    return () => window.clearTimeout(revealTimer);
  }, [pathname, transition]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const isRetainAIPage = pathname === "/work/retainai";

  return (
    <TransitionContext.Provider value={{ navigate, pathname }}>
      <div ref={cursor} className="cursor-dot" data-active="false" aria-hidden="true" />
      <AnimatePresence>
        {introActive && (
          <motion.div className={`intro-loader ${introExiting ? "intro-exiting" : ""}`} initial={false} exit={{ opacity: 0 }} transition={{ duration: 0.05 }} aria-live="polite">
            <div className="intro-loader-panels" aria-hidden="true">
              {Array.from({ length: 5 }, (_, panel) => <i key={panel} />)}
            </div>
            <div className="intro-loader-grid" aria-hidden="true" />
            <div className="intro-loader-orbit" aria-hidden="true"><i /><i /><i /><b /><b /><b /></div>
            <div className="intro-company-cloud" aria-hidden="true">
              {aiCompanies.map((company) => <span key={company}>{company}</span>)}
            </div>
            <div className="container-shell intro-loader-inner">
              <div className="intro-loader-meta"><span className="eyebrow">Amal Engulatov / AI Software Engineer</span><span className="eyebrow">{String(introIndex + 1).padStart(2, "0")} / {String(introItems.length).padStart(2, "0")}</span></div>
              <div className="intro-word-mask">
                <AnimatePresence initial={false}>
                  <motion.span
                    key={introItems[introIndex]}
                    className="intro-loader-word"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {introItems[introIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className={`site-header ${pathname === "/" || pathname === "/contact" || isRetainAIPage ? "header-on-blue" : "header-on-light"}`}>
        <div className="container-shell header-inner">
          <TransitionLink href="/" className="brand" transitionLabel="Home">© Amal Engulatov</TransitionLink>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.slice(1).map((item) => (
              <TransitionLink key={item.href} href={item.href} transitionLabel={item.label} data-active={isActive(item.href)}>{item.label}</TransitionLink>
            ))}
          </nav>
          <button className="menu-button" type="button" aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>Menu</button>
        </div>
      </header>

      <AnimatePresence>
        {floatingMenuVisible && !menuOpen && !introActive && !transition && (
          <motion.button
            className="floating-menu-trigger"
            type="button"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(true)}
            initial={{ x: 34, scale: 0.68, rotate: 18, opacity: 0 }}
            animate={{ x: 0, scale: 1, rotate: 0, opacity: 1 }}
            exit={{ x: 24, scale: 0.76, rotate: -12, opacity: 0 }}
            whileHover={{ scale: 1.08, rotate: 4 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="floating-menu-ring" aria-hidden="true" />
            <span className="floating-menu-lines" aria-hidden="true"><i /><i /><i /></span>
          </motion.button>
        )}
      </AnimatePresence>

      {children}

      <footer className="site-footer">
        <div className="container-shell footer-inner">
          <div><span className="eyebrow">Version</span><p>2026 © Edition</p></div>
          <div><span className="eyebrow">Location</span><p>Seattle, WA · PT</p></div>
          <div className="footer-social"><span className="eyebrow">Socials</span><p><a href="https://www.linkedin.com/in/amal-engulatov-18b144277/" target="_blank" rel="noreferrer">LinkedIn <span className="link-arrow" aria-hidden="true" /></a><a href="https://github.com/AmalEN20?tab=repositories" target="_blank" rel="noreferrer">GitHub <span className="link-arrow" aria-hidden="true" /></a></p></div>
        </div>
      </footer>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="menu-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1, pointerEvents: "auto" }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <motion.button className="menu-backdrop" aria-label="Close navigation" onClick={() => setMenuOpen(false)} />
            <motion.nav className="menu-panel" aria-label="Fullscreen navigation" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}>
              <div className="menu-top"><span className="eyebrow">Navigation</span><button className="menu-close" onClick={() => setMenuOpen(false)}>Close ×</button></div>
              <div className="menu-links">
                {navItems.map((item) => <TransitionLink key={item.href} href={item.href} transitionLabel={item.label} onClick={() => setMenuOpen(false)}>{item.label}</TransitionLink>)}
              </div>
              <div className="menu-foot"><span>Open to opportunities</span><span>Seattle, WA · PT</span></div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {transition && (
          <motion.div
            className={`route-transition ${transition.href === "/work/retainai" ? "route-transition-retainai" : ""}`}
            aria-live="polite"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.82, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="route-transition-panels" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((panel) => (
                <motion.i
                  key={panel}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: 0.04 + panel * 0.055, duration: 0.66, ease: [0.76, 0, 0.24, 1] }}
                />
              ))}
            </div>
            <div className="route-transition-grid" aria-hidden="true" />
            {transition.href === "/work/retainai" && (
              <motion.div className="retainai-transition-bloom" aria-hidden="true" initial={{ scale: 0.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.12, duration: 1.15, ease: [0.16, 1, 0.3, 1] }} />
            )}
            <motion.div className="route-transition-orbit" aria-hidden="true" initial={{ scale: 0.55, rotate: -35, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}><i /><i /></motion.div>
            <div className="container-shell route-transition-inner">
              <motion.div className="route-transition-meta" initial={{ y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.32, duration: 0.55 }}><span className="eyebrow">{transition.href === "/work/retainai" ? "Entering case study" : "Going to"} / {indexFromHref(transition.href)}</span><span className="eyebrow">Amal Engulatov © 2026</span></motion.div>
              <h2 className="route-transition-title" aria-label={`Going to ${transition.label}`}>
                <span className="route-transition-title-mask" aria-hidden="true">
                  {Array.from(transition.label).map((character, index) => (
                    <motion.span
                      className="route-transition-character"
                      key={`${character}-${index}`}
                      initial={{ y: "125%", rotate: 5, opacity: 0 }}
                      animate={{ y: 0, rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.24 + index * 0.045, duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
                    >{character === " " ? "\u00a0" : character}</motion.span>
                  ))}
                </span>
              </h2>
              <motion.span className="route-transition-index" aria-hidden="true" initial={{ opacity: 0, x: 80 }} animate={{ opacity: 0.12, x: 0 }} transition={{ delay: 0.38, duration: 0.75 }}>{transition.label}</motion.span>
              <div className="route-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.18, duration: 0.75, ease: [0.65, 0, 0.35, 1] }} /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
