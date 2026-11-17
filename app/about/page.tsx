import Image from "next/image";
import Button from "../ui/Button";
import FlowerLine from "../ui/one-line-flower";

const values = [
  {
    title: "Made to last",
    text: "We choose durable materials and timeless design, so every piece stays in your life for years rather than seasons.",
  },
  {
    title: "Responsibly sourced",
    text: "Our partners are selected for fair working conditions and low-impact production, many of them within the Nordic region.",
  },
  {
    title: "Circular by design",
    text: "From recycled packaging to repair guides, we design our products and processes to keep resources in use for as long as possible.",
  },
];

const stats = [
  { value: "2014", label: "Founded in Sweden" },
  { value: "100%", label: "Recycled packaging" },
  { value: "85%", label: "Renewable energy in our supply chain" },
  { value: "12", label: "Local partner workshops" },
];

export default function AboutPage() {
  return (
    <main className="bg-stone-50 text-stone-900">
      <section className="relative h-[60vh] min-h-105 w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1440581572325-0bea30075d9d"
          alt="Atelier North workspace"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 mx-auto flex h-full max-w-5xl flex-col justify-end px-6 pb-16">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-stone-200">
            About us
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Designed in Sweden. Made with care for the planet.
          </h1>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <FlowerLine
          cy={490}
          cx={1100}
          size={1.3}
          tailIn={false}
          className="-scale-x-100"
        />
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 md:grid-cols-2">
          <h2 className="text-3xl font-semibold md:text-4xl">Our story</h2>
          <div className="space-y-5 text-lg leading-relaxed text-stone-700">
            <p>
              Atelier North was founded in 2014 in a small studio in Stockholm,
              Sweden. What started as a shared love for simple, honest design
              quickly grew into a brand built on one idea: good things should be
              good for the world, too.
            </p>
            <p>
              Inspired by the Swedish concept of <em>lagom</em> — not too much,
              not too little — we create products that are thoughtful, useful
              and made to be kept. We believe the most sustainable product is
              the one you never need to replace.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-3xl font-semibold md:text-4xl">
            What we stand for
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.title}
                className="rounded-2xl border border-stone-200 bg-stone-50 p-8 transition-shadow hover:shadow-md"
              >
                <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                <p className="leading-relaxed text-stone-600">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <dl className="grid grid-cols-2 gap-12 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="order-2 mt-2 text-sm text-stone-600">
                {stat.label}
              </dt>
              <dd className="text-4xl font-semibold text-atelier-button">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-atelier-beige py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl text-atelier-details">
            Our promise to the planet
          </h2>
          <p className="text-lg mb-4 leading-relaxed text-atelier-details">
            We are committed to reaching net-zero emissions across our entire
            value chain by 2030. Every year we publish an open sustainability
            report, because real change starts with honesty and transparency.
          </p>
          <Button href="/products">Explore the collection</Button>
        </div>
      </section>
    </main>
  );
}
