# Features Directory (`src/features/`)

This directory is organized using a feature-based architecture. A "feature" represents a self-contained business module or domain containing all assets related to it.

## Structural Design

For large features (e.g., `projects`, `admin-dashboard`), organize files as follows:
- `components/` - Feature-specific React components.
- `hooks/` - Feature-specific React hooks.
- `actions/` - Feature-specific server actions.
- `services/` - Feature-specific business logic client services.
- `types/` - Custom types or interfaces specific to the domain.

## Recommended Feature Modules
- `admin-dashboard/` - Content management systems (CMS) and lead review interfaces.
- `projects/` - Project showcase list and details layout.
- `services/` - Service grid and technical specification detail views.
- `contact/` - Lead inquiry capture form.
