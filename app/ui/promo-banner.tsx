import Link from "next/link";
import Image from "next/image";

type PromoBannerProps = {
  image: string;
  imageAlt: string;
  eyebrow?: string;
  title: string;
  text: string;
  href: string;
  cta: string;
};

export default function PromoBanner({
  image,
  imageAlt,
  eyebrow,
  title,
  text,
  href,
  cta,
}: PromoBannerProps) {
  return (
    <section
      aria-label={title}
      className="relative overflow-hidden rounded-sm min-h-90 md:min-h-105 flex items-end md:items-center"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes="100vw"
        className="object-cover object-left"
      />

      <div className="absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 p-8 md:p-16 md:ml-[45%] max-w-xl text-white">
        {eyebrow && (
          <p className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-3">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg mb-8 leading-relaxed">{text}</p>
        <Link
          href={href}
          className="inline-block bg-white text-black py-4 px-8 text-sm rounded-sm font-bold uppercase tracking-wider hover:bg-white/80 transition-colors"
        >
          {cta}
        </Link>
      </div>
    </section>
  );
}
