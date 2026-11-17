import ContactForm from "../ui/contact-form";
import FlowerLine from "../ui/one-line-flower";

const CONTACT_DETAILS = [
  {
    label: "Email",
    value: "hello@ateliernorth.com",
    href: "mailto:hello@ateliernorth.com",
  },
  { label: "Phone", value: "+46(8)462 12 27", href: "tel:+46(8)462 12 27" },
  { label: "Studio", value: "Birger Jarlsgatan 14, 112 13 Stockholm" },
  { label: "Opening hours", value: "Mon–Fri, 09:00–17:00" },
];

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-20 lg:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 h-96 w-96 animate-pulse rounded-full bg-atelier-details/12 blur-3xl [animation-duration:8s] motion-reduce:animate-none" />
        <div className="absolute -bottom-40 -right-20 h-112 w-md animate-pulse rounded-full bg-atelier-details/15 blur-3xl [animation-duration:10s] motion-reduce:animate-none" />
        <FlowerLine
          cy={150}
          cx={1120}
          size={1}
          tailIn={false}
          tailOut={false}
          className="-scale-x-100"
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm tracking-[0.3em] uppercase opacity-60">
              Contact
            </p>
            <h1 className="text-5xl leading-[1.05] lg:text-7xl">
              Get in touch.
            </h1>
            <p className="text-md max-w-md opacity-80">
              Questions about an order, a product or something else? Send us a
              message and we will get back to you soon.
            </p>
          </div>

          <dl className="grid gap-6 border-t border-atelier-details/40 pt-8 sm:grid-cols-2">
            {CONTACT_DETAILS.map(({ label, value, href }) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-xs tracking-[0.2em] uppercase opacity-60">
                  {label}
                </dt>
                <dd className="text-md">
                  {href ? (
                    <a
                      href={href}
                      className="underline-offset-4 transition-opacity hover:underline hover:opacity-70"
                    >
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border border-atelier-details/30 bg-white/70 p-8 shadow-sm backdrop-blur-sm lg:p-12">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
