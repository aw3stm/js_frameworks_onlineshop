import ContactForm from "../ui/contact-form";

export default function ContactPage() {
  return (
    <main className="p-8 max-w-2xl mx-auto md:p-16">
      <h1 className="text-2xl font-black mb-8">Contact us</h1>
      <ContactForm />
    </main>
  );
}
