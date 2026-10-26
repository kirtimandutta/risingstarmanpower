"use client";

import { stats } from "@/lib/content";
import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function StatsBar() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      ref={ref}
      aria-label="Why us"
      className="border-y border-white/10 bg-panel"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
          Why us
        </p>
        <div className="mt-8 grid gap-10 md:grid-cols-3 md:gap-0">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={
                index === 0
                  ? "md:pr-8"
                  : "md:border-l md:border-white/10 md:px-8"
              }
            >
              {"display" in stat ? (
                <p className="font-display text-5xl font-semibold tracking-tight text-gold tabular-nums md:text-6xl">
                  {stat.display}
                </p>
              ) : (
                <p className="font-display text-5xl font-semibold tracking-tight text-gold tabular-nums md:text-6xl">
                  <span className="sr-only">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span aria-hidden="true">
                    <CountUp
                      active={inView}
                      target={stat.value}
                      decimals={stat.decimals}
                    />
                    {stat.suffix}
                  </span>
                </p>
              )}
              <p className="mt-3 font-display text-lg font-semibold tracking-tight">
                {stat.label}
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountUp({
  active,
  target,
  decimals,
}: {
  active: boolean;
  target: number;
  decimals: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !active) return;
    const finalText = decimals ? target.toFixed(decimals) : Math.round(target).toString();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = finalText;
      return;
    }
    const controls = animate(0, target, {
      duration: 1.45,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        node.textContent = decimals ? latest.toFixed(decimals) : Math.round(latest).toString();
      },
    });
    return () => controls.stop();
  }, [active, decimals, target]);

  const initial = decimals ? (0).toFixed(decimals) : "0";
  return (
    <span ref={ref} className="inline-block min-w-[4ch] text-left">
      {initial}
    </span>
  );
}
