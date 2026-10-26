"use client";

import { useInquiry } from "@/components/InquiryForm";
import { badges, services, type Requirement } from "@/lib/content";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  Car,
  Factory,
  GraduationCap,
  Shield,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useRef, type PointerEvent } from "react";

const serviceIcons: Record<(typeof services)[number]["icon"], LucideIcon> = {
  car: Car,
  shield: Shield,
  factory: Factory,
};

const badgeIcons: Record<(typeof badges)[number]["icon"], LucideIcon> = {
  badge: BadgeCheck,
  shield: ShieldCheck,
  training: GraduationCap,
};

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function ServicesGrid() {
  const { openInquiry } = useInquiry();

  return (
    <section id="solutions" className="relative overflow-x-clip border-t border-white/10 bg-ink py-24">
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
            Solutions
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
            Three trades. One accountable desk.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mute">
            Chauffeurs, guards, and facility crews, contracted as a roster your
            admin team can audit.
          </p>
        </div>

        <motion.div
          className="mt-12 grid gap-5 lg:grid-cols-3"
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.index}
              service={service}
              onRequest={() => openInquiry(service.requirement)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  onRequest,
}: {
  service: (typeof services)[number];
  onRequest: () => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const Icon = serviceIcons[service.icon];

  const onMove = (event: PointerEvent<HTMLElement>) => {
    const card = cardRef.current;
    if (!card) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = card.getBoundingClientRect();
    const px = (event.clientX - bounds.left) / bounds.width;
    const py = (event.clientY - bounds.top) / bounds.height;
    card.style.transition = "none";
    card.style.transform = `perspective(1000px) rotateX(${(py - 0.5) * -7}deg) rotateY(${(px - 0.5) * 9}deg)`;
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
      glowRef.current.style.background = `radial-gradient(420px circle at ${px * 100}% ${py * 100}%, rgba(245,158,11,0.28), transparent 46%)`;
    }
  };

  const onLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.45s ease";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    if (glowRef.current) glowRef.current.style.opacity = "0";
  };

  return (
    <motion.div variants={item} className="h-full">
      <article
        ref={cardRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-panel p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        />
        <div className="relative flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
            <Icon className="size-5" />
          </span>
          <span className="font-display text-sm tracking-[0.18em] text-white/30">
            {service.index}
          </span>
        </div>
        <h3 className="relative mt-6 font-display text-2xl leading-tight font-semibold tracking-tight">
          {service.title}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-mute">{service.summary}</p>
        <ul className="relative mt-5 space-y-2.5">
          {service.points.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm text-paper/90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <ul className="relative mt-6 flex flex-wrap gap-2">
          {badges.map((badge) => {
            const BadgeIcon = badgeIcons[badge.icon];
            return (
              <li
                key={badge.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-gold"
              >
                <BadgeIcon className="size-3.5" />
                {badge.label}
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          onClick={onRequest}
          className="relative mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-gold transition hover:text-gold-soft"
        >
          Request {requestLabel(service.requirement)}
          <ArrowUpRight className="size-4" />
        </button>
      </article>
    </motion.div>
  );
}

function requestLabel(requirement: Requirement) {
  if (requirement === "Drivers") return "drivers";
  if (requirement === "Security") return "security";
  return "facility staff";
}
