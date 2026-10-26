const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function asset(path: string) {
  return `${assetBase}${path}`;
}

export const agency = {
  name: "The Rising Star Manpower",
  principal: "Mr. Bhoumik",
  email: "enquire@risingstarmanpower.com",
  coverage: "Pan-India corporate coverage",
  hours: "Dispatch desk open 24/7",
};

export type Requirement = "Drivers" | "Security" | "Facility" | "Custom";

export const requirements: Requirement[] = [
  "Drivers",
  "Security",
  "Facility",
  "Custom",
];

export type Tier = {
  id: string;
  index: string;
  short: string;
  kicker: string;
  title: string;
  body: string;
  metric: string;
  metricValue: string;
  metricNote: string;
  image: string;
  prop: string;
  propAlt: string;
  alt: string;
};

export const tiers: Tier[] = [
  {
    id: "drivers",
    index: "01",
    short: "Drivers",
    kicker: "Tier 01  ·  Fleet",
    title: "Executive & Fleet Drivers",
    body: "Chauffeurs for principals and commercial drivers for logistics desks. Each profile is police-verified, route-briefed, and in uniform before the first pickup.",
    metric: "Verified Backgrounds",
    metricValue: "100%",
    metricNote:
      "Police verification is closed before a driver is offered to your account.",
    image: asset("/assets/driver.png"),
    prop: asset("/assets/car-prop.png"),
    propAlt: "Dark navy executive sedan in a three-quarter view",
    alt: "Uniformed chauffeur in a navy suit and cap, standing with hands clasped",
  },
  {
    id: "security",
    index: "02",
    short: "Security",
    kicker: "Tier 02  ·  Security",
    title: "Elite Armed & Unarmed Security Guards",
    body: "Gate, campus, and event security with a written post and a relief name already on the roster. Armed cover is staffed only where the site and the guard are both authorized.",
    metric: "Zero Downtime",
    metricValue: "Relief staged",
    metricNote:
      "The next guard is rostered before a shift is allowed to open a gap.",
    image: asset("/assets/security.png"),
    prop: asset("/assets/gate-prop.png"),
    propAlt: "Pair of glass corporate access gates with blue edge lighting",
    alt: "Security officer in a navy uniform and cap, standing with arms crossed",
  },
  {
    id: "facility",
    index: "03",
    short: "Facility",
    kicker: "Tier 03  ·  Facility",
    title: "Facility Maintenance & Technical Operations Staff",
    body: "Janitorial, housekeeping, and technical crews for offices, plants, and campuses. Supervisors stay on the floor with the shift, not only on a spreadsheet.",
    metric: "Immediate Dispatch",
    metricValue: "Same day",
    metricNote:
      "Surge headcount can move the day the requisition is confirmed.",
    image: asset("/assets/facility.png"),
    prop: asset("/assets/cart-prop.png"),
    propAlt: "Industrial floor scrubber beside a stocked janitorial cart",
    alt: "Facility supervisor in a navy uniform and high-visibility vest, holding a tablet",
  },
];

export const services = [
  {
    index: "01",
    title: "Chauffeurs & Commercial Logistics Drivers",
    requirement: "Drivers" as Requirement,
    icon: "car" as const,
    summary:
      "Executive cars, shift fleets, and commercial driving with logbooks your admin team can audit.",
    points: [
      "Principal chauffeurs and pool cars",
      "Shift fleets with a named backup driver",
      "Commercial logistics driving and trip logs",
    ],
  },
  {
    index: "02",
    title: "Armed Guards, Bouncers & Event Security",
    requirement: "Security" as Requirement,
    icon: "shield" as const,
    summary:
      "Static posts, visitor control, and event floors. Every guard is briefed on your site rules before taking a gate.",
    points: [
      "Armed and unarmed static posts",
      "Event security and door supervision",
      "Access control with a written handover",
    ],
  },
  {
    index: "03",
    title: "Industrial & Corporate Janitorial / Facility Workforce",
    requirement: "Facility" as Requirement,
    icon: "factory" as const,
    summary:
      "Housekeeping and technical helpers scaled to the floor plate, with statutory onboarding already in the file.",
    points: [
      "Corporate and industrial housekeeping",
      "Technical helpers and site operations",
      "Supervisors present on the shift",
    ],
  },
];

export const badges = [
  { label: "Police Verified", icon: "badge" as const },
  { label: "ESI/PF Compliant", icon: "shield" as const },
  { label: "Rigorous Training", icon: "training" as const },
];

export type Stat =
  | {
      id: string;
      value: number;
      decimals: number;
      suffix: string;
      label: string;
      detail: string;
    }
  | {
      id: string;
      display: string;
      label: string;
      detail: string;
    };

export const stats: Stat[] = [
  {
    id: "personnel",
    value: 500,
    decimals: 0,
    suffix: "+",
    label: "Verified Personnel",
    detail: "On the active roster across drivers, security, and facility.",
  },
  {
    id: "retention",
    value: 99.4,
    decimals: 1,
    suffix: "%",
    label: "Client Retention",
    detail: "Accounts that renew once the roster has settled on site.",
  },
  {
    id: "cover",
    display: "24/7",
    label: "Rapid Replacement Guarantee",
    detail: "The desk stays open when a shift needs a name the same night.",
  },
];

export const reasons = [
  {
    index: "01",
    title: "Verified before they are visible",
    body: "Police checks close before a profile is offered. You see a name only after the file is complete.",
  },
  {
    index: "02",
    title: "ESI and PF inside the engagement",
    body: "Statutory structure sits in the contract. It is not a document chased after deployment.",
  },
  {
    index: "03",
    title: "A principal, not a queue",
    body: "Mr. Bhoumik stays the account lead. Escalations do not disappear into a shared inbox.",
  },
  {
    index: "04",
    title: "Replacement before the gap",
    body: "Relief is rostered in advance. Cover moves before an empty post becomes your problem.",
  },
];

export const navLinks = [
  { href: "#solutions", label: "Solutions" },
  { href: "#workforce", label: "Workforce Tiers" },
  { href: "#why-us", label: "Why Us" },
  { href: "#get-staff", label: "Get Staff" },
];
