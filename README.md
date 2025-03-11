# Next.js Rendering Methods Demo

This project demonstrates different rendering methods in Next.js, including Client-Side Rendering (CSR), Time-Based Incremental Static Regeneration (ISR), On-Demand ISR, and Server-Side Rendering (SSR).

## Important Note About ISR

**ISR features only work in production builds.** When running in development mode (`pnpm dev`), you won't see the actual caching behavior of ISR. To properly test and see ISR in action:

```bash
# Build the production version
pnpm build

# Run the production server
pnpm start
```

## Getting Started

First, install dependencies:

```bash
pnpm install
```

For development (note: ISR won't work properly):

```bash
pnpm dev
```

For production (recommended to see ISR in action):

```bash
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Purpose

This demo illustrates the different rendering strategies in Next.js and when to use each:

1. **Client-Side Rendering (CSR)**: Data fetched in the browser after page load. Good for personalized or frequently changing content.

2. **Time-Based ISR**: Pages cached and regenerated at fixed intervals. Balances performance with freshness.

3. **On-Demand ISR**: Pages cached until manually revalidated. Perfect for content that changes on specific events.

4. **Server-Side Rendering (SSR)**: Fresh data on every request. Ideal for highly dynamic content that needs SEO.

## Mobile-First Design

The demo is built with a mobile-first approach using:

- Tailwind CSS for responsive styling
- Shadcn UI components for a consistent design system
- Accessible color contrasts and responsive layouts

## Learn More

To learn more about Next.js rendering methods:

- [Next.js Data Fetching Documentation](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)
- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
