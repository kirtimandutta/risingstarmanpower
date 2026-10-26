"use client";

import { StarMark } from "@/components/StarMark";
import { useInquiry } from "@/components/InquiryForm";
import { agency, navLinks } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { openInquiry } = useInquiry();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("workforce");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const marker = window.scrollY + 140;
      let current = "workforce";
      for (const link of navLinks) {
        const id = link.href.slice(1);
        const section = document.getElementById(id);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const hire = () => {
    setOpen(false);
    openInquiry();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#workforce"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[80] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
      >
        Skip to roster
      </a>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-50 mx-auto mt-3 flex w-[min(1120px,calc(100%-1.25rem))] items-center justify-between gap-3 rounded-full border px-3 py-2 backdrop-blur-md sm:mt-4 sm:px-4 ${
          scrolled || open
            ? "border-white/15 bg-ink/80"
            : "border-white/10 bg-white/5"
        }`}
      >
        <a href="#workforce" className="flex min-w-0 items-center gap-2.5 pl-1">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-ink">
            <StarMark className="size-4" />
          </span>
          <span className="truncate font-display text-sm font-semibold tracking-tight sm:text-[15px]">
            <span className="sm:hidden">Rising Star</span>
            <span className="hidden sm:inline">{agency.name}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-sm transition ${
                  isActive ? "text-paper" : "text-mute hover:text-paper"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={hire}
            className="hire-glow rounded-full bg-gold px-3 py-2 text-xs font-semibold text-ink transition hover:bg-gold-soft sm:px-4 sm:text-sm"
            aria-label="Book Manpower / Hire Now"
          >
            <span className="xl:hidden">Hire Now</span>
            <span className="hidden xl:inline">Book Manpower / Hire Now</span>
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-white/10 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/85 backdrop-blur-md lg:hidden"
            onClick={() => setOpen(false)}
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex w-[min(1120px,calc(100%-1.25rem))] flex-col gap-1 px-2 pt-24"
              onClick={(event) => event.stopPropagation()}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index }}
                  className="rounded-2xl px-4 py-3 font-display text-3xl font-semibold tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
