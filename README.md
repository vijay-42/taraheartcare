# taraheartcare

Website for **TARA Heart Care**, a cardiology clinic offering preventive cardiology, non-invasive diagnostics and a 24/7 Cath Lab.

Built with Next.js 16, Tailwind CSS v4, Motion and Lenis.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

## Editing content

| What | Where |
|---|---|
| Clinic details: phones, WhatsApp, address, hours, doctor profile, reviews, insurers | `lib/clinic.ts` |
| Services, FAQs, checkup packages | `lib/services.ts` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |
| Logo (source) | `public/logo.png` (variants in `public/brand/`) |
| Doctor photo | `public/images/doctor.jpg` |

Placeholders still to fill in are marked with `[...]`. Search the code for `[` to find them.

The original static HTML version is kept in `_static-v1/`.
