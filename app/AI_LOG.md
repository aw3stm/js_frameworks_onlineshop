# AI Log – Atelier North

All AI use in this project is documented below, in line with the assignment's AI policy.
Tool used throughout: Claude (Anthropic), unless stated otherwise.

---

### 1. Project planning and structure

- **Date:** 28 October 2026
- **Purpose:** Brainstorming project structure and workflow for the online shop (Next.js + TypeScript + Tailwind), based on the assignment requirements. Asked the AI to act as a teacher and explain how to approach the assignment step by step.
- **Outcome:** Clearer plan for pages, components and order of work.

### 2. Dropdown search bar and Vercel deploy

- **Date:** 1 November 2026
- **Purpose:** Help with making the search bar expand from the header when clicking "Search". Debugging a deploy issue on Vercel (framework preset).
- **Outcome:** Deploy fixed by selecting the Next.js preset. Dropdown search: adapted example code to my own header component.

### 3. Home page and /products page structure

- **Date:** 5 November 2026
- **Purpose:** Brainstorming user flow: home page with hero + about 8 products and a "View all products" link, a separate /products page, and a promo banner between two product rows. (Banner design sketched by me in Figma.)
- **Outcome:** Decided on the page structure and user flow; built the home page, banner and /products page based on my own Figma sketch.

### 4. Contact page design

- **Date:** 9 November 2026
- **Purpose:** Ideas for making the contact page with ContactForm feel less flat (background, split layout), using UI examples I had found as inspiration.
- **Outcome:** Chose a split layout with a different background; adapted the suggested layout and styling to my existing ContactForm.

### 5. Rendering strategies and caching

- **Date:** 9 November 2026
- **Purpose:** Explanation of SSG, SSR, CSR and ISR and how they apply in this project, including Cache Components, `"use cache"`, `cacheLife("hours")` and `generateStaticParams` for product pages. Also discussed the cart (CartProvider + localStorage).
- **Outcome:** Improved understanding of rendering in Next.js. Product pages are now pre-rendered at build time (25 static pages).

### 6. Category filtering on /products

- **Date:** 11 November 2026
- **Purpose:** Brainstorming how to organise products by category. Grouping by headings gave too few products per category, so I switched to filter buttons.
- **Outcome:** Replaced category headings with filter buttons; adapted the suggested filtering logic to my /products page.

### 7. Typing API responses

- **Date:** 19 November 2026
- **Purpose:** Understanding teacher feedback that all API calls must have well-defined types. Explanation of the generic type `ApiResponse<T>` with `response.json()`, and why `res.ok` should be checked.
- **Outcome:** Used my existing `ApiResponse<T>` type in `products.ts` and `searchbar.tsx` and added `res.ok` checks; adapted example code from the AI.

### 8. Debugging

- **Date:** 19 November 2026
- **Purpose:** Debugging assistance by describing the error `Failed to open database … "LOG 2"` when running `npm run dev`.
- **Outcome:** The build cache was corrupted (likely by iCloud sync). Fixed by deleting the `.next` folder.
