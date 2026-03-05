# Portfolio Juan

Portfolio personal orientado a conversión con CTA principal **Book a Call**.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** + tema dark con acento morado
- **shadcn/ui** (utilidades y variables; componentes añadibles con `npx shadcn@latest add`)
- **Framer Motion** (animaciones, page transition, scroll reveal)
- Deploy en **Vercel**

## Cómo arrancar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home con CTA Book a Call |
| `/work` | Grid tipo mural de proyectos |
| `/work/[slug]` | Case study de un proyecto |
| `/work/labs` | Proyectos spec / Labs |
| `/skills` | Skills |
| `/about` | Sobre mí |
| `/book` | Book a Call (Calendly embed + fallback Email/LinkedIn) |

## Estructura

- `src/app/` — Rutas y layout (App Router)
- `src/components/` — Header, Footer, cursor, WorkTile, ScrollReveal, PageTransition
- `src/content/` — Datos: `work.ts`, `labs.ts`, `skills.ts`, `about.ts`
- `src/lib/utils.ts` — `cn()` para Tailwind + shadcn

## Personalización

1. **Proyectos**: edita `src/content/work.ts` (y opcionalmente `labs.ts`).
2. **Skills / About**: `src/content/skills.ts` y `src/content/about.ts`.
3. **Book a Call**: en `src/app/book/page.tsx` sustituye el placeholder por tu iframe de Calendly y tus enlaces de email/LinkedIn.
4. **Cursor**: variantes con `data-cursor="link"`, `data-cursor="view"`, `data-cursor="cta"`. Se desactiva en móvil y con `prefers-reduced-motion`.

## Build y deploy

```bash
npm run build
npm start
```

Para Vercel: conectar el repo y deploy automático con el preset de Next.js.
