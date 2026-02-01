# Jacob Bernoulli Clock - AI Coding Guidelines

## Architecture Overview
This is a Next.js 16 application using the App Router, built for a clock display with mathematical animations. Key architectural decisions:
- **App Router**: Uses `app/` directory structure with server/client components
- **UI Framework**: shadcn/ui with New York style, RSC-compatible components
- **Styling**: Tailwind CSS v4 with custom theme variables and dark mode support
- **Animations**: Framer Motion for React animations, GSAP for complex timelines
- **Data**: GraphQL client (`graphql-request`) for external data fetching
- **Icons**: Lucide React for consistent iconography

## Key Files & Directories
- `app/layout.tsx`: Root layout with Geist fonts and metadata
- `app/page.tsx`: Main page component (currently default Next.js template)
- `lib/utils.ts`: Utility function `cn()` for merging Tailwind classes
- `components.json`: shadcn/ui configuration with path aliases
- `public/`: Static assets including clock-related AVIF images

## Development Workflow
- **Start dev server**: `npm run dev` (auto-reloads on changes)
- **Build for production**: `npm run build` (outputs to `.next/`)
- **Start production server**: `npm run start`
- **Linting**: `npm run lint` (ESLint with Next.js rules)
- **TypeScript**: Strict mode enabled, incremental compilation

## Coding Patterns & Conventions
- **Path Aliases**: Use `@/components`, `@/lib/utils`, `@/ui` for imports (configured in `tsconfig.json` and `components.json`)
- **Class Merging**: Always use `cn()` from `@/lib/utils` for conditional Tailwind classes
- **Component Structure**: Place reusable components in `components/` directory (create if needed)
- **Styling**: Leverage Tailwind v4's `@theme inline` for custom CSS variables
- **Animations**: Prefer Framer Motion for component-level animations, GSAP for page-wide effects
- **Icons**: Import from `lucide-react` with consistent naming (e.g., `Clock`, `Play`)

## Dependencies & Integrations
- **GraphQL**: Use `graphql-request` for API calls - create dedicated query files in `lib/`
- **Animations**: Combine Framer Motion (declarative) and GSAP (imperative) based on complexity
- **Images**: Optimize with Next.js `<Image>` component, use AVIF format for clock assets

## Project-Specific Notes
- Clock images in `public/` are numbered AVIF files - likely for digit displays
- Project named after Jacob Bernoulli, suggesting mathematical/time-themed UI
- Tailwind v4 features: `@custom-variant dark`, inline theme configuration
- ESLint config overrides default ignores for better control

## Examples
```tsx
// Component with animations and styling
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnimatedClock({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn("flex items-center gap-2", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Clock className="h-4 w-4" />
      <span>Current Time</span>
    </motion.div>
  );
}
```

```typescript
// GraphQL query example
import { gql } from "graphql-request";

export const GET_TIME_DATA = gql`
  query GetTimeData {
    currentTime {
      hours
      minutes
      seconds
    }
  }
`;
```</content>
<parameter name="filePath">e:\code-man-begin\clock\jacob-bernoulli\.github\copilot-instructions.md