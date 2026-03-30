"use client"; // We need this for the alert/state

import { createLeadAction } from "@/app/actions/leads";
import { useParams } from "next/navigation";

export function ContactForm({ title, description, fields, submitText }: any) {
  const { tenant } = useParams(); // Get the current tenant from the URL

  async function handleSubmit(formData: FormData) {
    const result = await createLeadAction(tenant as string, formData);
    if (result.success) {
      alert("Success! We'll get back to you soon.");
    } else {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 md:px-8 py-20 md:py-28">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-block mb-6 px-4 py-1 rounded-full border border-primary/30 bg-primary-50">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Get In Touch
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-4">
          {title || "Contact Us"}
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-muted font-light">
          {description || "We'd love to hear from you. Send us a message!"}
        </p>
      </div>

      {/* Form Container */}
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Left side - Info cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2">Email</h3>
            <p className="text-sm text-muted">hello@example.com</p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a11.959 11.959 0 112.409 6.5M9 11h.01M15 17H9" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2">Response Time</h3>
            <p className="text-sm text-muted">Within 24 hours</p>
          </div>

          <div className="card p-6">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a10 10 0 100 20 10 10 0 000-20zm0 2a8 8 0 100 16 8 8 0 000-16z" />
              </svg>
            </div>
            <h3 className="font-bold text-foreground mb-2">Available 24/7</h3>
            <p className="text-sm text-muted">Always ready to help</p>
          </div>
        </div>

        {/* Form */}
        <form
          action={handleSubmit}
          className="lg:col-span-2 card p-8 md:p-10 bg-gradient-to-br from-surface via-surface to-primary-50/20 border border-neutral-200"
        >
          <div className="space-y-6">
            {fields?.map((field: any, index: number) => (
              <div key={index} className="flex flex-col gap-3">
                <label className="text-sm font-bold text-foreground uppercase tracking-wide">
                  {field.label}
                  {field.required && <span className="text-error ml-1">*</span>}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.label}
                    required={field.required}
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                    className="min-h-32 px-4 py-3 bg-background border border-neutral-200 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                    rows={4}
                  />
                ) : (
                  <input
                    name={field.label}
                    type={field.type}
                    required={field.required}
                    placeholder={`Enter your ${field.label.toLowerCase()}...`}
                    className="px-4 py-3 bg-background border border-neutral-200 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all duration-200"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-8 w-full btn btn-primary py-4 md:py-5 text-lg font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            <span>{submitText || "Send Message"}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          <p className="mt-4 text-xs text-muted text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
}