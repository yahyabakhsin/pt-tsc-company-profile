# Component System (`src/components/`)

Global components are split into tiers based on their scope and reusability.

## Structure

- **`ui/`**: Atomic components (buttons, badges, inputs, dialogs, cards) that are state-free and highly reusable. Powered by Tailwind CSS, framer-motion, and shadcn primitives.
- **`layout/`**: Page wrapper structures (navbar, footer, sidebar layouts).
- **`shared/`**: Generic mid-level components reused across different pages (containers, cards, skeleton states, loading overlays).
- **`sections/`**: Main component segments of pages (e.g. Hero, Features, ServiceGrid, ContactForm, CTA).
