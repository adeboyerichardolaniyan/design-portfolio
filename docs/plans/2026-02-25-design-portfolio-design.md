# Design Portfolio — Implementation Plan

## Context

Building a design portfolio from scratch using Astro + MDX + React. The portfolio needs animated page transitions, scroll-driven animations, dark mode, and the ability to embed interactive React components (UI demos and full mini-apps) inside project pages. Content is authored in MDX files so new projects can be added by simply dropping a new `.mdx` file with frontmatter.

**Inspiration**: withalim.com — clean white canvas, bold black typography, generous whitespace, rounded containers, structured metadata grids.

**User preferences**: Full page transitions + scroll animations, light mode default with dark mode toggle, floating bottom-center dock nav (shadcn/Aceternity), shadcn/ui components throughout.

### Inspiration Reference (`docs/`)

**Homepage** (3 screenshots):
- `homepage-inspiration-2.png` — **Hero section**: Centered bold bio paragraph, massive whitespace above/below, minimal bottom-left nav pills.
- `homepage-inspiration.png` — **Project listing**: Gray project name + bold description text, then large imagery in a subtle rounded container.
- `homepage-inspiration-3.png` — **"Bits and pieces" reel**: Section header in gray + bold subtitle, then rounded card with design work samples.

**Project page** (1 screenshot):
- `projectpage-inspiration.png` — **Project detail layout**: Large hero image at top (full-width in rounded container), then below: project name + category label (left column), multi-column description text (center/right), 4-column metadata grid (Role, Collaborators, Duration, Tools), external link buttons, then content sections.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro (latest) |
| Content | Astro Content Collections + MDX |
| UI Components | shadcn/ui (via official Astro install) |
| Interactive | React islands (`client:visible` / `client:load`) |
| Nav | Aceternity UI Floating Dock |
| Page transitions | Astro `<ClientRouter />` + View Transitions API |
| Scroll animations | Motion.dev vanilla API (`inView()`, `scroll()`) |
| React animations | Motion.dev React API (`motion` components) |
| Styling | Tailwind CSS v4 |
| Dark mode | Tailwind `darkMode: "selector"` + CSS custom properties |
| Typography | Inter variable font |

---

## File Structure

```
src/
  content.config.ts
  content/
    projects/
      project-name.mdx

  components/
    ui/                                # shadcn/ui components
    nav/
      FloatingDock.tsx
    theme/
      ThemeToggle.tsx
    interactive/
      DemoWidget.tsx
      MiniAppEmbed.tsx
    ProjectCard.astro
    ProjectMeta.astro
    ProjectHero.astro
    ScrollReveal.astro
    ParallaxImage.astro

  layouts/
    Base.astro
    ProjectLayout.astro

  pages/
    index.astro
    projects/[...slug].astro
    about.astro

  styles/
    global.css
```

---

## Content Collection Schema

```typescript
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    category: z.string(),
    description: z.string(),
    role: z.string(),
    tools: z.array(z.string()),
    duration: z.string(),
    collaborators: z.array(z.string()).optional(),
    coverImage: z.string(),
    color: z.string().optional(),
    layout: z.enum(['default', 'wide', 'minimal']).default('default'),
    order: z.number(),
    draft: z.boolean().default(false),
    links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
  }),
});
```

---

## Global Design Variables

```css
:root {
  --color-bg: #ffffff;
  --color-bg-secondary: #f9f9fa;
  --color-text-primary: #000000;
  --color-text-secondary: #697175;
  --color-text-tertiary: #a0a0a0;
  --color-border: #e6eaeb;
  --color-surface: #ffffff;

  --font-sans: 'Inter', system-ui, sans-serif;
  --font-size-hero: clamp(2rem, 5vw, 3.5rem);
  --font-size-heading: clamp(1.5rem, 3vw, 2rem);
  --font-size-body: 1.125rem;
  --font-size-caption: 0.875rem;
  --font-weight-normal: 400;
  --font-weight-bold: 700;
  --line-height-tight: 1.2;
  --line-height-body: 1.6;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --content-max-width: 72rem;
  --content-padding: clamp(1.5rem, 5vw, 4rem);

  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-full: 9999px;

  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --easing-default: cubic-bezier(0.4, 0, 0.2, 1);
}

.dark {
  --color-bg: #0a0a0a;
  --color-bg-secondary: #141414;
  --color-text-primary: #fafafa;
  --color-text-secondary: #a0a0a0;
  --color-text-tertiary: #666666;
  --color-border: #262626;
  --color-surface: #171717;
}
```

---

## Implementation Phases

### Phase 1: Foundation
1. Save design plan
2. Init Astro project with React, MDX, Tailwind
3. Set up shadcn/ui + Aceternity floating dock
4. Create global CSS, content schema, Base layout
5. Create FloatingDock wrapper + ProjectLayout

### Phase 2: Pages
6. Homepage with hero + project grid
7. Dynamic project pages
8. About page
9. ProjectCard, ProjectMeta, ProjectHero components
10. Dark mode toggle

### Phase 3: Animations
11. View Transition element morphing
12. ScrollReveal + ParallaxImage components
13. Page entrance animations
14. Re-initialization on astro:page-load

### Phase 4: Interactive Components + Content
15. React island demos
16. Motion.dev React animations
17. Sample MDX project files
18. Test MDX + React rendering

### Phase 5: Polish
19. Typography refinement
20. Responsive design
21. prefers-reduced-motion support
22. Performance audit
23. Final visual review
