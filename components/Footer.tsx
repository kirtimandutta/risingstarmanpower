import { StarMark } from "@/components/StarMark";
import { agency, navLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-gold text-ink">
              <StarMark className="size-4" />
            </span>
            <p className="font-display text-lg font-semibold tracking-tight">
              {agency.name}
            </p>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-mute">
            Corporate drivers, security personnel, and facility staff — deployed
            with a verification file and a replacement guarantee.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
            Quick links
          </p>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-mute transition hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="text-xs font-medium tracking-[0.2em] text-gold uppercase">
            Principal
          </p>
          <p className="mt-4 font-display text-2xl font-semibold tracking-tight">
            {agency.principal}
          </p>
          <p className="mt-1 text-sm text-mute">{agency.name}</p>
          <a
            href={`mailto:${agency.email}`}
            className="mt-4 inline-block text-sm text-paper underline decoration-gold/50 underline-offset-4 transition hover:decoration-gold"
          >
            {agency.email}
          </a>
          <p className="mt-3 text-sm text-mute">{agency.hours}</p>
          <p className="mt-1 text-sm text-mute">{agency.coverage}</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-5 py-6 md:flex-row md:items-start md:justify-between md:px-8">
          <p className="max-w-3xl text-xs leading-relaxed text-mute">
            All personnel are police-verified before deployment. Engagements are
            structured for ESI and PF compliance. Armed security is supplied
            only where the site holds authorization and the guard holds a valid
            licence.
          </p>
          <p className="shrink-0 text-xs text-mute">
            © 2026 {agency.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
