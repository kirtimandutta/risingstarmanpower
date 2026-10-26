"use client";

import { tiers } from "@/lib/content";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const planes: Record<
  string,
  {
    prop: string;
    person: string;
    propShadow: string;
    personShadow: string;
    mobileProp: string;
    mobilePerson: string;
  }
> = {
  drivers: {
    prop: "bottom-[2%] left-[2%] z-10 h-[42%] w-[96%]",
    person: "bottom-0 left-[-2%] z-30 h-[84%] w-[52%]",
    propShadow: "bottom-[3%] left-[18%] z-0 w-[68%]",
    personShadow: "bottom-[1.5%] left-[8%] z-20 w-[30%]",
    mobileProp: "absolute inset-x-1 bottom-[7%] h-[40%]",
    mobilePerson: "absolute bottom-0 left-[2%] h-[90%] w-[64%]",
  },
  security: {
    prop: "bottom-[1%] left-[6%] z-10 h-[68%] w-[88%]",
    person: "bottom-0 left-[14%] z-30 h-[86%] w-[50%]",
    propShadow: "bottom-[2%] left-[14%] z-0 w-[72%]",
    personShadow: "bottom-[1.5%] left-[22%] z-20 w-[28%]",
    mobileProp: "absolute inset-x-2 bottom-[2%] h-[58%]",
    mobilePerson: "absolute bottom-0 left-[16%] h-[90%] w-[62%]",
  },
  facility: {
    prop: "bottom-[2%] left-[14%] z-10 h-[46%] w-[84%]",
    person: "bottom-0 left-[-2%] z-30 h-[84%] w-[50%]",
    propShadow: "bottom-[3%] left-[22%] z-0 w-[64%]",
    personShadow: "bottom-[1.5%] left-[8%] z-20 w-[28%]",
    mobileProp: "absolute inset-x-1 bottom-[6%] h-[44%]",
    mobilePerson: "absolute bottom-0 left-[4%] h-[90%] w-[58%]",
  },
};

const easeOut = "power2.out";
const easeIn = "power2.in";

export function ScrollyShowcase() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLParagraphElement>(null);
  const propRefs = useRef<Array<HTMLDivElement | null>>([]);
  const personRefs = useRef<Array<HTMLDivElement | null>>([]);
  const propShadowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const personShadowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sceneRefs = useRef<Array<HTMLDivElement | null>>([]);
  const phaseRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine)", () => {
      const pin = pinRef.current;
      const stage = stageRef.current;
      const tilt = tiltRef.current;
      const props = propRefs.current;
      const people = personRefs.current;
      const propShadows = propShadowRefs.current;
      const personShadows = personShadowRefs.current;
      const panels = panelRefs.current;
      if (
        !pin ||
        !stage ||
        !tilt ||
        props.some((node) => !node) ||
        people.some((node) => !node) ||
        propShadows.some((node) => !node) ||
        personShadows.some((node) => !node) ||
        panels.some((node) => !node)
      ) {
        return;
      }

      const setPhase = (phase: number) => {
        phaseRefs.current.forEach((node, index) => {
          node?.setAttribute("data-active", index === phase ? "true" : "false");
        });
        sceneRefs.current.forEach((node, index) => {
          node?.setAttribute("aria-hidden", index === phase ? "false" : "true");
        });
        panels.forEach((panel, index) => {
          panel?.setAttribute("aria-hidden", index === phase ? "false" : "true");
        });
      };

      gsap.set(tilt, { transformPerspective: 1000, rotateX: 0, rotateY: 0 });
      gsap.set(props[0], { xPercent: 100, autoAlpha: 0, force3D: true, transformOrigin: "50% 100%" });
      gsap.set(people[0], { y: 60, scale: 0.95, autoAlpha: 0, z: 40, force3D: true, transformOrigin: "50% 100%" });
      gsap.set(props[1], {
        xPercent: 60,
        scale: 0.92,
        rotation: 8,
        autoAlpha: 0,
        force3D: true,
        transformOrigin: "50% 70%",
      });
      gsap.set(people[1], {
        xPercent: 60,
        y: 60,
        scale: 0.95,
        autoAlpha: 0,
        z: 40,
        force3D: true,
        transformOrigin: "50% 100%",
      });
      gsap.set(props[2], {
        xPercent: 34,
        y: 110,
        scale: 0.94,
        autoAlpha: 0,
        force3D: true,
        transformOrigin: "80% 100%",
      });
      gsap.set(people[2], { y: 70, scale: 0.95, autoAlpha: 0, z: 40, force3D: true, transformOrigin: "50% 100%" });
      gsap.set([...propShadows, ...personShadows], {
        scaleX: 0.35,
        autoAlpha: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(panels, { y: 28, autoAlpha: 0 });
      if (ringRef.current) gsap.set(ringRef.current, { rotation: 0, transformOrigin: "50% 50%" });
      if (railRef.current) gsap.set(railRef.current, { scaleY: 0 });

      let scrollYaw = 0;
      let hovering = false;
      const rotY = gsap.quickTo(tilt, "rotateY", { duration: 0.55, ease: "power3.out" });
      const rotX = gsap.quickTo(tilt, "rotateX", { duration: 0.55, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        if (!window.matchMedia("(pointer: fine)").matches) return;
        const bounds = stage.getBoundingClientRect();
        const px = (event.clientX - bounds.left) / bounds.width - 0.5;
        const py = (event.clientY - bounds.top) / bounds.height - 0.5;
        hovering = true;
        rotY(px * 7 + scrollYaw);
        rotX(py * -4.5);
      };
      const onLeave = () => {
        hovering = false;
        rotY(scrollYaw);
        rotX(0);
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: "+=300%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const phase = self.progress < 0.33 ? 0 : self.progress < 0.66 ? 1 : 2;
            setPhase(phase);
            scrollYaw = (self.progress - 0.5) * 5;
            if (!hovering) rotY(scrollYaw);
          },
        },
      });

      timeline.addLabel("drivers", 0);
      timeline.addLabel("security", 1);
      timeline.addLabel("facility", 2);

      timeline
        .to(props[0], { xPercent: 10, autoAlpha: 1, duration: 0.42, ease: easeOut }, "drivers+=0.02")
        .to(propShadows[0], { scaleX: 1, autoAlpha: 0.9, duration: 0.42, ease: easeOut }, "drivers+=0.02")
        .to(people[0], { y: 0, scale: 1.05, autoAlpha: 1, duration: 0.38, ease: easeOut }, "drivers+=0.16")
        .to(personShadows[0], { scaleX: 1, autoAlpha: 0.85, duration: 0.38, ease: easeOut }, "drivers+=0.16")
        .to(panels[0], { y: 0, autoAlpha: 1, duration: 0.3, ease: easeOut }, "drivers+=0.04")
        .to(props[0], { xPercent: 4, duration: 0.46, ease: "none" }, "drivers+=0.52")
        .to(props[0], { xPercent: -60, autoAlpha: 0, duration: 0.34, ease: easeIn }, "security")
        .to(propShadows[0], { scaleX: 0.4, autoAlpha: 0, duration: 0.28, ease: easeIn }, "security")
        .to(people[0], { xPercent: -60, autoAlpha: 0, duration: 0.34, ease: easeIn }, "security")
        .to(personShadows[0], { autoAlpha: 0, duration: 0.24, ease: easeIn }, "security")
        .to(panels[0], { y: -24, autoAlpha: 0, duration: 0.28, ease: easeIn }, "security")
        .to(
          props[1],
          { xPercent: 0, scale: 1, rotation: 0, autoAlpha: 1, duration: 0.42, ease: easeOut },
          "security+=0.1",
        )
        .to(propShadows[1], { scaleX: 1, autoAlpha: 0.9, duration: 0.42, ease: easeOut }, "security+=0.1")
        .to(
          people[1],
          { xPercent: 0, y: 0, scale: 1.05, autoAlpha: 1, duration: 0.4, ease: easeOut },
          "security+=0.22",
        )
        .to(personShadows[1], { scaleX: 1, autoAlpha: 0.85, duration: 0.4, ease: easeOut }, "security+=0.22")
        .to(panels[1], { y: 0, autoAlpha: 1, duration: 0.32, ease: easeOut }, "security+=0.12")
        .to(props[1], { xPercent: -4, duration: 0.36, ease: "none" }, "security+=0.64")
        .to(props[1], { xPercent: -60, autoAlpha: 0, duration: 0.34, ease: easeIn }, "facility")
        .to(propShadows[1], { autoAlpha: 0, scaleX: 0.4, duration: 0.24, ease: easeIn }, "facility")
        .to(people[1], { xPercent: -60, autoAlpha: 0, duration: 0.34, ease: easeIn }, "facility")
        .to(personShadows[1], { autoAlpha: 0, duration: 0.24, ease: easeIn }, "facility")
        .to(panels[1], { y: -24, autoAlpha: 0, duration: 0.28, ease: easeIn }, "facility")
        .to(
          props[2],
          { xPercent: 8, y: 0, scale: 1, autoAlpha: 1, duration: 0.46, ease: easeOut },
          "facility+=0.1",
        )
        .to(propShadows[2], { scaleX: 1, autoAlpha: 0.9, duration: 0.46, ease: easeOut }, "facility+=0.1")
        .to(people[2], { y: 0, scale: 1.05, autoAlpha: 1, duration: 0.4, ease: easeOut }, "facility+=0.24")
        .to(personShadows[2], { scaleX: 1, autoAlpha: 0.85, duration: 0.4, ease: easeOut }, "facility+=0.24")
        .to(panels[2], { y: 0, autoAlpha: 1, duration: 0.32, ease: easeOut }, "facility+=0.12");

      const tail = 3 - timeline.duration();
      if (tail > 0.01) timeline.to({}, { duration: tail });

      if (ringRef.current) {
        timeline.to(ringRef.current, { rotation: 168, ease: "none", duration: timeline.duration() }, 0);
      }
      if (railRef.current) {
        timeline.to(railRef.current, { scaleY: 1, ease: "none", duration: timeline.duration() }, 0);
      }
      if (hintRef.current) {
        timeline.to(hintRef.current, { autoAlpha: 0, duration: 0.2 }, 0.15);
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);

      return () => {
        stage.removeEventListener("pointermove", onMove);
        stage.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("load", refresh);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="workforce" className="relative bg-ink">
      <MobileStory />
      <div className="step-stack flex-col gap-5 px-4 pt-28 pb-16">
        <div className="px-1">
          <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
            The Rising Star Manpower
          </p>
          <h1 className="mt-4 max-w-xl font-display text-[2.4rem] leading-[1.05] font-semibold tracking-tight text-balance">
            Personnel for the car, the gate, and the floor.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
            Corporate drivers, security, and facility crews. Verified before they
            are visible on your site.
          </p>
        </div>
        {tiers.map((tier, index) => {
          const plane = planes[tier.id];
          return (
            <motion.article
              key={tier.id}
              initial={{ opacity: 0, y: reduce ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reduce ? 0 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-3xl border border-white/10 bg-panel"
            >
              <div className="relative h-[68vw] max-h-[520px] min-h-[320px] overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.16),transparent_62%)]">
                <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(226,232,240,0.2),transparent_72%)]" />
                <motion.div
                  className={plane.mobileProp}
                  initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={tier.prop}
                    alt={tier.propAlt}
                    fill
                    sizes="92vw"
                    className="object-contain object-bottom drop-shadow-[0_18px_14px_rgba(0,0,0,0.45)]"
                  />
                </motion.div>
                <motion.div
                  className={plane.mobilePerson}
                  initial={{ opacity: 0, y: reduce ? 0 : 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: reduce ? 0 : 0.65, delay: reduce ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image
                    src={tier.image}
                    alt={tier.alt}
                    fill
                    preload={index === 0}
                    sizes="70vw"
                    className="object-contain object-bottom drop-shadow-[0_18px_16px_rgba(0,0,0,0.5)]"
                  />
                </motion.div>
              </div>
              <div className="space-y-3 p-6">
                <p className="text-xs font-medium tracking-[0.18em] text-gold uppercase">
                  {tier.kicker}
                </p>
                <h2 className="font-display text-2xl leading-tight font-semibold tracking-tight">
                  {tier.title}
                </h2>
                <p className="text-sm leading-relaxed text-mute">{tier.body}</p>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[11px] font-medium tracking-[0.18em] text-gold uppercase">
                    {tier.metric}
                  </p>
                  <p className="mt-1 font-display text-3xl font-semibold">{tier.metricValue}</p>
                  <p className="mt-2 text-sm leading-relaxed text-mute">{tier.metricNote}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <div ref={pinRef} className="pin-stage relative h-dvh bg-ink">
        <div className="roster-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.45)_100%)]" />
        <div className="relative mx-auto flex h-full w-full max-w-6xl items-center gap-8 px-6 pt-24 pb-8 lg:px-8">
          <div className="flex w-[48%] min-w-0 flex-col justify-center xl:w-[46%]">
            <motion.div
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
                The Rising Star Manpower
              </p>
              <h1 className="hero-title mt-4 max-w-xl font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance xl:text-5xl">
                Personnel for the car, the gate, and the floor.
              </h1>
              <p className="hero-lede mt-4 max-w-md text-base leading-relaxed text-mute">
                A single desk for corporate drivers, security personnel, and
                facility staff. Mr. Bhoumik keeps the roster accountable.
              </p>
            </motion.div>

            <div className="relative mt-7 grid overflow-hidden">
              {tiers.map((tier, index) => (
                <div
                  key={tier.id}
                  ref={(node) => {
                    panelRefs.current[index] = node;
                  }}
                  aria-hidden={index === 0 ? "false" : "true"}
                  className="col-start-1 row-start-1 max-w-lg opacity-0"
                >
                  <p className="text-xs font-medium tracking-[0.18em] text-gold uppercase">
                    {tier.kicker}
                  </p>
                  <h2 className="tier-title mt-2 font-display text-[1.85rem] leading-tight font-semibold tracking-tight xl:text-3xl">
                    {tier.title}
                  </h2>
                  <p className="tier-copy mt-3 text-sm leading-relaxed text-mute xl:text-[15px]">
                    {tier.body}
                  </p>
                  <div className="metric-card mt-5 max-w-sm rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-[11px] font-medium tracking-[0.18em] text-gold uppercase">
                      {tier.metric}
                    </p>
                    <p className="mt-1 font-display text-3xl font-semibold tracking-tight">
                      {tier.metricValue}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-mute">{tier.metricNote}</p>
                  </div>
                </div>
              ))}
            </div>

            <ol className="mt-7 grid max-w-lg grid-cols-3 gap-3">
              {tiers.map((tier, index) => (
                <li
                  key={tier.id}
                  ref={(node) => {
                    phaseRefs.current[index] = node;
                  }}
                  data-active={index === 0 ? "true" : "false"}
                  className="phase-node"
                >
                  <span className="phase-bar mb-2 block h-px w-full bg-gold" />
                  <span className="phase-index block text-[11px] font-medium tracking-[0.16em]">
                    {tier.index}
                  </span>
                  <span className="mt-1 block text-sm">{tier.short}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="relative hidden h-44 w-px shrink-0 self-center overflow-hidden bg-white/10 xl:block">
            <div ref={railRef} className="absolute inset-0 origin-top scale-y-0 bg-gold" />
          </div>

          <div
            ref={stageRef}
            className="relative h-full min-w-0 flex-1 overflow-hidden [perspective:1000px]"
          >
            <div ref={tiltRef} className="relative h-full w-full [transform-style:preserve-3d]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.16),transparent_64%)]" />
              <div className="pointer-events-none absolute top-[48%] left-1/2 size-[min(108%,560px)] -translate-x-1/2 -translate-y-1/2">
                <div className="orbit-spin size-full rounded-full border border-dashed border-gold/35" />
              </div>
              <div className="pointer-events-none absolute top-[48%] left-1/2 size-[min(86%,440px)] -translate-x-1/2 -translate-y-1/2">
                <div className="orbit-spin-reverse size-full rounded-full [background:conic-gradient(from_0deg,transparent_0_70%,rgba(245,158,11,0.5)_100%)] [mask-image:radial-gradient(circle,transparent_63%,#000_66%)]" />
              </div>
              <div className="pointer-events-none absolute top-[48%] left-1/2 size-[min(96%,500px)] -translate-x-1/2 -translate-y-1/2">
                <div ref={ringRef} className="size-full rounded-full border border-white/15" />
              </div>
              <div className="pointer-events-none absolute top-[48%] left-1/2 h-px w-10 -translate-x-1/2 bg-gold/50" />
              <div className="pointer-events-none absolute top-[48%] left-1/2 h-10 w-px -translate-y-1/2 bg-gold/50" />
              <div className="pointer-events-none absolute bottom-[4%] left-1/2 z-0 h-8 w-[76%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse,rgba(226,232,240,0.18),transparent_72%)]" />

              {tiers.map((tier, index) => {
                const plane = planes[tier.id];
                return (
                  <div
                    key={tier.id}
                    ref={(node) => {
                      sceneRefs.current[index] = node;
                    }}
                    aria-hidden={index === 0 ? "false" : "true"}
                    className="absolute inset-0 isolate overflow-hidden"
                  >
                    <div
                      ref={(node) => {
                        propShadowRefs.current[index] = node;
                      }}
                      className={`pointer-events-none absolute h-5 origin-center rounded-[100%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.72),transparent_70%)] opacity-0 blur-md ${plane.propShadow}`}
                    />
                    <div
                      ref={(node) => {
                        propRefs.current[index] = node;
                      }}
                      className={`pointer-events-none absolute opacity-0 will-change-transform ${plane.prop}`}
                    >
                      <Image
                        src={tier.prop}
                        alt={tier.propAlt}
                        fill
                        sizes="42vw"
                        preload={index === 0}
                        onLoad={() => ScrollTrigger.refresh()}
                        className="object-contain object-bottom drop-shadow-[0_22px_16px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                    <div
                      ref={(node) => {
                        personShadowRefs.current[index] = node;
                      }}
                      className={`pointer-events-none absolute h-4 origin-center rounded-[100%] bg-[radial-gradient(ellipse,rgba(0,0,0,0.78),transparent_70%)] opacity-0 blur-md ${plane.personShadow}`}
                    />
                    <div
                      ref={(node) => {
                        personRefs.current[index] = node;
                      }}
                      className={`pointer-events-none absolute opacity-0 will-change-transform ${plane.person}`}
                    >
                      <Image
                        src={tier.image}
                        alt={tier.alt}
                        fill
                        sizes="28vw"
                        preload={index === 0}
                        className="object-contain object-bottom drop-shadow-[0_20px_18px_rgba(0,0,0,0.55)]"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p
          ref={hintRef}
          className="absolute bottom-6 left-8 flex items-center gap-2 text-xs tracking-[0.18em] text-mute uppercase"
        >
          <ChevronDown className="size-4 text-gold" />
          Scroll the roster
        </p>
      </div>
    </section>
  );
}

function MobileStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const [phase, setPhase] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = value < 0.34 ? 0 : value < 0.67 ? 1 : 2;
    setPhase((current) => (current === next ? current : next));
  });

  const copyOpacity = [
    useTransform(scrollYProgress, [0, 0.24, 0.36], [1, 1, 0]),
    useTransform(scrollYProgress, [0.28, 0.4, 0.58, 0.7], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.62, 0.76, 1], [0, 1, 1]),
  ];
  const propOpacity = [
    useTransform(scrollYProgress, [0, 0.24, 0.36], [1, 1, 0]),
    useTransform(scrollYProgress, [0.26, 0.4, 0.58, 0.7], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.6, 0.76, 1], [0, 1, 1]),
  ];
  const personOpacity = [
    useTransform(scrollYProgress, [0, 0.24, 0.36], [1, 1, 0]),
    useTransform(scrollYProgress, [0.32, 0.46, 0.58, 0.7], [0, 1, 1, 0]),
    useTransform(scrollYProgress, [0.66, 0.82, 1], [0, 1, 1]),
  ];
  const propY = [
    useTransform(scrollYProgress, [0, 0.24, 0.36], [0, 0, -24]),
    useTransform(scrollYProgress, [0.26, 0.4, 0.58, 0.7], [28, 0, 0, -24]),
    useTransform(scrollYProgress, [0.6, 0.76, 1], [36, 0, 0]),
  ];
  const personY = [
    useTransform(scrollYProgress, [0, 0.24, 0.36], [0, 0, -20]),
    useTransform(scrollYProgress, [0.32, 0.46, 0.58, 0.7], [48, 0, 0, -20]),
    useTransform(scrollYProgress, [0.66, 0.82, 1], [56, 0, 0]),
  ];
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={trackRef} className="motion-story motion-track relative">
      <div className="motion-sticky sticky top-0 flex flex-col overflow-x-clip px-4 pt-24 pb-4">
        <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
          The Rising Star Manpower
        </p>
        <h1 className="mt-3 max-w-xl font-display text-[1.7rem] leading-[1.05] font-semibold tracking-tight text-balance min-[380px]:text-4xl">
          Personnel for the car, the gate, and the floor.
        </h1>

        <div className="relative mt-4 min-h-[7.5rem]">
          {tiers.map((tier, index) => (
            <StoryCopy
              key={tier.id}
              tierIndex={index}
              opacity={copyOpacity[index]}
              hidden={phase !== index}
            />
          ))}
        </div>

        <div className="relative mt-2 min-h-[220px] flex-1 overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-[12%] bottom-[8%] h-8 rounded-[100%] bg-[radial-gradient(ellipse,rgba(226,232,240,0.22),transparent_72%)]" />
          {tiers.map((tier, index) => {
            const plane = planes[tier.id];
            return (
              <div key={tier.id} className="absolute inset-0" aria-hidden={phase === index ? undefined : true}>
                <motion.div
                  style={{ opacity: propOpacity[index], y: propY[index] }}
                  className={plane.mobileProp}
                >
                  <Image
                    src={tier.prop}
                    alt={tier.propAlt}
                    fill
                    sizes="92vw"
                    className="object-contain object-bottom"
                  />
                </motion.div>
                <motion.div
                  style={{ opacity: personOpacity[index], y: personY[index] }}
                  className={plane.mobilePerson}
                >
                  <Image
                    src={tier.image}
                    alt={tier.alt}
                    fill
                    sizes="70vw"
                    preload={index === 0}
                    className="object-contain object-bottom"
                  />
                </motion.div>
              </div>
            );
          })}
        </div>

        <ol className="mt-3 grid grid-cols-3 gap-3">
          {tiers.map((tier, index) => (
            <li key={tier.id} data-active={phase === index ? "true" : "false"} className="phase-node">
              <span className="phase-bar mb-2 block h-px w-full bg-gold" />
              <span className="phase-index block text-[11px] font-medium tracking-[0.16em]">
                {tier.index}
              </span>
              <span className="mt-1 block text-sm">{tier.short}</span>
            </li>
          ))}
        </ol>
        <motion.p
          style={{ opacity: hintOpacity }}
          className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.18em] text-mute uppercase"
        >
          <ChevronDown className="size-4 text-gold" />
          Scroll the roster
        </motion.p>
      </div>
    </div>
  );
}

function StoryCopy({
  tierIndex,
  opacity,
  hidden,
}: {
  tierIndex: number;
  opacity: MotionValue<number>;
  hidden: boolean;
}) {
  const tier = tiers[tierIndex];
  return (
    <motion.div style={{ opacity }} aria-hidden={hidden} className="absolute inset-x-0 top-0">
      <p className="text-xs font-medium tracking-[0.18em] text-gold uppercase">{tier.kicker}</p>
      <h2 className="mt-1 font-display text-xl leading-tight font-semibold tracking-tight">
        {tier.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mute">{tier.body}</p>
    </motion.div>
  );
}
