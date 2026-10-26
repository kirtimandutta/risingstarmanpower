"use client";

import {
  agency,
  requirements,
  type Requirement,
} from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type Fields = {
  name: string;
  organization: string;
  requirement: Requirement | "";
  headcount: string;
  phone: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const emptyFields: Fields = {
  name: "",
  organization: "",
  requirement: "",
  headcount: "",
  phone: "",
};

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-paper outline-none transition placeholder:text-mute/60 focus:border-gold focus:bg-white/[0.07]";

type InquiryContextValue = {
  openInquiry: (requirement?: Requirement) => void;
};

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function useInquiry() {
  const value = useContext(InquiryContext);
  if (!value) {
    throw new Error("useInquiry must be used within InquiryProvider");
  }
  return value;
}

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<Requirement | "">("");
  const [ticket, setTicket] = useState(0);
  const lastFocus = useRef<HTMLElement | null>(null);

  const openInquiry = useCallback((requirement?: Requirement) => {
    lastFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setPreset(requirement ?? "");
    setTicket((current) => current + 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => lastFocus.current?.focus());
  }, []);

  const value = useMemo(() => ({ openInquiry }), [openInquiry]);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryModal
        open={open}
        ticket={ticket}
        preset={preset}
        onClose={close}
      />
    </InquiryContext.Provider>
  );
}

export function InquiryForm() {
  return (
    <section id="get-staff" className="border-t border-white/10 bg-ink py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">
            Get staff
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-semibold tracking-tight text-balance md:text-5xl">
            Tell the desk what the site needs.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-mute">
            Share the trade, the headcount, and a number. {agency.name} replies
            with a roster, not a brochure.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              "Name the site and the trade.",
              "We match a verified roster.",
              "Deployment moves with replacement cover.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span className="font-display text-sm text-gold">
                  0{index + 1}
                </span>
                <span className="text-sm text-paper/90">{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-3xl border border-white/10 bg-panel p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8 lg:col-span-7">
          <LeadForm idPrefix="desk" />
        </div>
      </div>
    </section>
  );
}

function InquiryModal({
  open,
  ticket,
  preset,
  onClose,
}: {
  open: boolean;
  ticket: number;
  preset: Requirement | "";
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const root = dialogRef.current;
    const focusable = () =>
      Array.from(
        root?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const field = root?.querySelector<HTMLElement>("input, select");
    (field ?? focusable()[0])?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !root) return;
      const items = focusable();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, ticket]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[min(720px,calc(100dvh-1.5rem))] w-full max-w-lg overflow-y-auto rounded-3xl border border-white/10 bg-panel p-6 shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium tracking-[0.18em] text-gold uppercase">
                  Book manpower
                </p>
                <h2 id="inquiry-title" className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  Hire now
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid size-10 place-items-center rounded-full border border-white/10 text-paper"
                aria-label="Close inquiry"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-6">
              <LeadForm
                key={ticket}
                idPrefix={`modal-${ticket}`}
                initialRequirement={preset}
                compact
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function LeadForm({
  idPrefix,
  initialRequirement = "",
  compact = false,
}: {
  idPrefix: string;
  initialRequirement?: Requirement | "";
  compact?: boolean;
}) {
  const [values, setValues] = useState<Fields>({
    ...emptyFields,
    requirement: initialRequirement,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (done) statusRef.current?.focus();
  }, [done]);

  const setField = (key: keyof Fields, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`${idPrefix}-${first}`)?.focus();
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="py-6 outline-none">
        <span className="grid size-12 place-items-center rounded-full bg-gold text-ink">
          <Check className="size-5" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
          Requisition noted.
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
          {values.organization} asked for {values.headcount}{" "}
          {values.requirement.toLowerCase()} staff. {agency.principal}&apos;s desk
          will confirm the shift pattern and a named roster.
        </p>
        <button
          type="button"
          className="mt-6 text-sm font-semibold text-gold"
          onClick={() => {
            setValues({ ...emptyFields, requirement: initialRequirement });
            setDone(false);
          }}
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
      <Field
        id={`${idPrefix}-name`}
        label="Name"
        error={errors.name}
        className={compact ? undefined : "sm:col-span-1"}
      >
        <input
          id={`${idPrefix}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => setField("name", event.target.value)}
          className={fieldClass}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
        />
      </Field>
      <Field
        id={`${idPrefix}-organization`}
        label="Organization"
        error={errors.organization}
      >
        <input
          id={`${idPrefix}-organization`}
          name="organization"
          autoComplete="organization"
          value={values.organization}
          onChange={(event) => setField("organization", event.target.value)}
          className={fieldClass}
          aria-invalid={errors.organization ? true : undefined}
          aria-describedby={errors.organization ? `${idPrefix}-organization-error` : undefined}
        />
      </Field>
      <Field
        id={`${idPrefix}-requirement`}
        label="Requirement Type"
        error={errors.requirement}
      >
        <div className="relative">
          <select
            id={`${idPrefix}-requirement`}
            name="requirement"
            value={values.requirement}
            onChange={(event) => setField("requirement", event.target.value)}
            className={`${fieldClass} appearance-none pr-10`}
            aria-invalid={errors.requirement ? true : undefined}
            aria-describedby={errors.requirement ? `${idPrefix}-requirement-error` : undefined}
          >
            <option value="">Select a trade</option>
            {requirements.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-mute" />
        </div>
      </Field>
      <Field
        id={`${idPrefix}-headcount`}
        label="Headcount Needed"
        error={errors.headcount}
      >
        <input
          id={`${idPrefix}-headcount`}
          name="headcount"
          inputMode="numeric"
          value={values.headcount}
          onChange={(event) => setField("headcount", event.target.value.replace(/[^\d]/g, ""))}
          className={fieldClass}
          aria-invalid={errors.headcount ? true : undefined}
          aria-describedby={errors.headcount ? `${idPrefix}-headcount-error` : undefined}
        />
      </Field>
      <Field
        id={`${idPrefix}-phone`}
        label="Contact Number"
        error={errors.phone}
        className={compact ? undefined : "sm:col-span-2"}
      >
        <input
          id={`${idPrefix}-phone`}
          name="tel"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => setField("phone", event.target.value)}
          className={fieldClass}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? `${idPrefix}-phone-error` : undefined}
        />
      </Field>
      <div className={compact ? undefined : "sm:col-span-2"}>
        <button
          type="submit"
          className="hire-glow inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition hover:bg-gold-soft sm:w-auto"
        >
          Request roster
          <ArrowRight className="size-4" />
        </button>
        <p className="mt-3 text-xs leading-relaxed text-mute">
          For {agency.principal}. Armed roles are confirmed only where licensing allows.
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className ?? ""}`} htmlFor={id}>
      <span className="mb-2 block text-[11px] font-medium tracking-[0.16em] text-mute uppercase">
        {label}
      </span>
      {children}
      {error ? (
        <span id={`${id}-error`} className="mt-1.5 block text-xs text-red-300">
          {error}
        </span>
      ) : null}
    </label>
  );
}

function validate(values: Fields): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Enter the contact name.";
  if (values.organization.trim().length < 2) errors.organization = "Enter the organization.";
  if (!values.requirement) errors.requirement = "Choose a requirement.";
  const headcount = Number(values.headcount);
  if (!Number.isInteger(headcount) || headcount < 1 || headcount > 5000) {
    errors.headcount = "Enter a headcount from 1 to 5000.";
  }
  const digits = values.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) {
    errors.phone = "Enter a reachable phone number.";
  }
  return errors;
}
