import ContactForm from "../ui/contact-form";

export default function ContactPage() {
  return (
    <main className="p-8 max-w-2xl mx-auto md:p-16">
      <h1 className="text-xl font-black mb-8">Looking for something specific? Drop us a note.</h1>
      <ContactForm />
    </main>
  );
}
