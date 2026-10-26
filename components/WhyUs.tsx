"use client";

import { reasons } from "@/lib/content";
import { motion } from "framer-motion";

export function WhyUs() {
  return (
    <section className="bg-ink py-24" aria-labelledby="why-heading">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
            How the desk holds a site
          </p>
          <h2
            id="why-heading"
            className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl"
          >
            The post stays filled.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
            Retention here is a roster with a relief name on it. Payroll stays
            compliant, and the principal stays reachable.
          </p>
          <a
            href="#get-staff"
            className="hire-glow mt-8 inline-flex rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-soft"
          >
            Get staff
          </a>
        </div>
        <ol className="lg:col-span-7">
          {reasons.map((reason, index) => (
            <motion.li
              key={reason.index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[auto_1fr] gap-5 border-t border-white/10 py-6"
            >
              <span className="font-display text-sm tracking-[0.16em] text-gold">
                {reason.index}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {reason.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
                  {reason.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
