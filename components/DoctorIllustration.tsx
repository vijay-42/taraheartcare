/*
 * Colourful illustrated portrait used until a real doctor photo is added
 * (lib/clinic.ts → team[].photo). Each variant has its own palette and figure.
 */

type Palette = {
  from: string;
  to: string;
  blob: string;
  accent: string;
  skin: string;
  hair: string;
  shirt: string;
  hairStyle: "short" | "long" | "beard";
};

const PALETTES: Palette[] = [
  { from: "#FBD9BF", to: "#E8876A", blob: "#F6B48C", accent: "#FFE9A8", skin: "#C98B62", hair: "#2B1A13", shirt: "#2F6F7E", hairStyle: "short" },
  { from: "#CFEBDD", to: "#4E9C82", blob: "#93CDB4", accent: "#F7D36B", skin: "#A96A47", hair: "#1D130F", shirt: "#7E2C46", hairStyle: "long" },
  { from: "#DCD5FA", to: "#6F5CCB", blob: "#AFA2EC", accent: "#FF9F86", skin: "#8B5838", hair: "#35251D", shirt: "#E2A63A", hairStyle: "beard" },
  { from: "#FFE1A1", to: "#D9694F", blob: "#FFC47A", accent: "#8FD3C0", skin: "#B97A55", hair: "#3A2418", shirt: "#3B4FA0", hairStyle: "long" },
];

export default function DoctorIllustration({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  const p = PALETTES[variant % PALETTES.length];
  const id = `doc-${variant}`;

  return (
    <svg viewBox="0 0 250 200" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.from} />
          <stop offset="1" stopColor={p.to} />
        </linearGradient>
        <linearGradient id={`${id}-coat`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EEF0F4" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="250" height="200" fill={`url(#${id}-bg)`} />
      <circle cx="125" cy="96" r="78" fill={p.blob} opacity="0.75" />
      <circle cx="214" cy="34" r="22" fill={p.accent} opacity="0.9" />
      <path d="M-10 168 C40 140 70 190 120 160 S210 130 260 150 L260 200 L-10 200Z" fill={p.to} opacity="0.35" />

      {/* ECG trace */}
      <polyline
        points="0,62 34,62 42,62 48,48 54,76 60,40 66,62 92,62"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />
      {/* Sparkles */}
      <g fill="#FFFFFF" opacity="0.85">
        <path d="M206 92 l2 6 6 2 -6 2 -2 6 -2 -6 -6 -2 6 -2z" />
        <path d="M30 110 l1.5 4 4 1.5 -4 1.5 -1.5 4 -1.5 -4 -4 -1.5 4 -1.5z" />
      </g>
      {/* Little heart */}
      <path d="M190 64 c-4 -6 -14 -3 -12 5 c1 5 12 11 12 11 s11 -6 12 -11 c2 -8 -8 -11 -12 -5z" fill={p.accent} />

      {/* Long hair sits behind the head */}
      {p.hairStyle === "long" && (
        <path d="M95 96 C90 56 160 56 155 96 L160 146 C150 140 146 122 148 104 L102 104 C104 122 100 140 90 146Z" fill={p.hair} />
      )}

      {/* Coat & shirt */}
      <path d="M42 200 C46 154 78 134 125 134 C172 134 204 154 208 200Z" fill={`url(#${id}-coat)`} />
      <path d="M107 135 L125 176 L143 135Z" fill={p.shirt} />
      <path d="M107 135 L118 168 L100 200 M143 135 L132 168 L150 200" fill="none" stroke="#D5D9E2" strokeWidth="1.6" />
      <rect x="152" y="160" width="20" height="4" rx="2" fill="#D5D9E2" />
      <rect x="160" y="150" width="3" height="14" rx="1.5" fill={p.to} />

      {/* Neck & head */}
      <rect x="113" y="110" width="24" height="28" rx="10" fill={p.skin} />
      <path d="M113 128 Q125 136 137 128 L137 138 L113 138Z" fill="#000" opacity="0.12" />
      <ellipse cx="125" cy="90" rx="27" ry="31" fill={p.skin} />
      <ellipse cx="98.5" cy="94" rx="4" ry="6" fill={p.skin} />
      <ellipse cx="151.5" cy="94" rx="4" ry="6" fill={p.skin} />

      {/* Hair front */}
      {p.hairStyle === "short" && (
        <path d="M97 90 C93 56 157 52 153 88 C150 74 140 68 126 70 C112 70 101 76 97 90Z" fill={p.hair} />
      )}
      {p.hairStyle === "long" && (
        <path d="M97 92 C95 60 155 58 153 92 C146 76 132 70 120 72 C110 74 102 80 97 92Z" fill={p.hair} />
      )}
      {p.hairStyle === "beard" && (
        <>
          <path d="M97 86 C96 58 154 56 153 86 C148 74 136 70 125 71 C113 71 102 75 97 86Z" fill={p.hair} />
          <path d="M99 96 C100 126 150 126 151 96 C148 110 140 114 125 114 C110 114 102 110 99 96Z" fill={p.hair} />
        </>
      )}

      {/* Soft cheek glow */}
      <circle cx="112" cy="100" r="5" fill="#FF8A7A" opacity="0.25" />
      <circle cx="138" cy="100" r="5" fill="#FF8A7A" opacity="0.25" />

      {/* Stethoscope */}
      <path d="M110 137 C96 160 102 182 120 186" fill="none" stroke="#2A2A33" strokeWidth="3" strokeLinecap="round" />
      <path d="M140 137 C154 160 148 182 130 186" fill="none" stroke="#2A2A33" strokeWidth="3" strokeLinecap="round" />
      <circle cx="125" cy="188" r="7" fill="#C9CED8" stroke="#2A2A33" strokeWidth="2.5" />
    </svg>
  );
}
