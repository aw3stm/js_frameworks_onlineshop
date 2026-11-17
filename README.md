# Atelier North

A responsive online store built with **Next.js**, **TypeScript** and **Tailwind CSS**. Products are fetched from the [Noroff Online Shop API](https://v2.api.noroff.dev/online-shop). The store has search, a shopping cart, a mock checkout and a validated contact form.

> Final assignment for the JavaScript Frameworks course.

**Live demo:** https://jsframeworksonlineshop.vercel.app/

---

## Features

- **Product listing:** the home page shows a hero, a selection of products and a promo banner. All products are listed on `/products`.
- **Search:** a search bar drops down from the header and filters products as you type.
- **Product page:** every product has its own page (`/product/[id]`) with images, price, discount, rating and reviews.
- **Shopping cart:**
  - The number of items is shown in the header.
  - You can change the quantity or remove items.
  - The total price updates automatically.
  - The cart is saved in `localStorage`, so it stays after a page reload.
- **Checkout:**
  - A mock payment form with delivery and card details.
  - Live validation and automatic formatting of the card number and expiry date.
  - A short "processing" state before the order is confirmed.
- **Order confirmation:** `/checkout/success` empties the cart. You can only reach it after completing the payment step.
- **Contact form:**
  - Validated fields (name, subject, email, message).
  - Inline error messages and a character counter.
  - An animated success state.
- **Responsive design:**
  - A separate mobile menu and desktop navigation.
  - A custom colour palette and decorative one-line flower illustrations.
- **Accessibility:**
  - Semantic HTML and labelled form fields.
  - `aria-invalid` and `aria-describedby` on form errors.
  - Visible focus states and `motion-reduce` support.

## Tech stack

| Tool                                                   | Purpose                       |
| ------------------------------------------------------ | ----------------------------- |
| [Next.js](https://nextjs.org/) (App Router)            | Framework, routing, rendering |
| [TypeScript](https://www.typescriptlang.org/) (strict) | Type safety                   |
| [Tailwind CSS](https://tailwindcss.com/)               | Styling                       |
| React Context                                          | Cart state                    |
| [Vercel](https://vercel.com/)                          | Hosting                       |

## Getting started

### Prerequisites

- Node.js 20 or later
- npm

### Installation

```bash
git clone https://github.com/aw3stm/js_frameworks_onlineshop.git
cd js_frameworks_onlineshop
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # production build
npm run start   # run the production build
npm run lint    # run ESLint
```

## Project structure

```
app/
├── about/              # About page
├── cart/               # Shopping cart
├── checkout/           # Mock payment form
│   └── success/        # Order confirmation
├── contact/            # Contact page
├── context/
│   └── cart-context.tsx  # CartProvider + useCart hook
├── lib/
│   └── products.ts     # API calls (getProducts, getProduct)
├── product/[id]/       # Product detail page (+ loading state)
├── products/           # All products
├── types/              # Shared TypeScript types
├── ui/                 # Reusable components
│   ├── header.tsx
│   ├── footer.tsx
│   ├── searchbar.tsx
│   ├── product-card.tsx
│   ├── product-list.tsx
│   ├── promo-banner.tsx
│   ├── add-to-cart.tsx
│   ├── price.tsx
│   ├── rating.tsx
│   ├── contact-form.tsx
│   ├── checkout-form.tsx
│   └── flower-line.tsx
├── globals.css
├── layout.tsx
└── page.tsx            # Home page
```

## How it works

### Data fetching and rendering

The project has **Cache Components** turned on in `next.config.ts`.

- `getProducts` and `getProduct` in `lib/products.ts` use `"use cache"` with `cacheLife("hours")`. The API is only called again when the cache expires.
- `generateStaticParams` in `product/[id]` builds all product pages ahead of time, at build time.
- The cart, checkout and contact form are client components (`"use client"`), because they use state and the browser.

### Cart

`CartProvider` wraps the whole app and shares the cart through the `useCart()` hook.

- The cart is saved to `localStorage` under the key `atelier-north-cart`.
- The `isLoaded` flag stops the cart from showing as empty before the saved data has been read.

### Checkout flow

```
/cart  →  /checkout  →  /checkout/success
```

1. **Checkout** validates the form and simulates a payment.
2. After the payment, it sets a flag in `sessionStorage`.
3. **Success** checks that flag. Without it, the visitor is sent back to the home page. With it, the cart is cleared.

> No real payment is made and no card details are stored.

## API

All product data comes from the Noroff API:

```
GET https://v2.api.noroff.dev/online-shop
GET https://v2.api.noroff.dev/online-shop/<id>
```

## Deployment

The site is deployed on **Vercel** with the Next.js framework preset. Every push to the main branch triggers a new deploy.

## Author

Anna Vestman: [GitHub](https://github.com/aw3stm)
