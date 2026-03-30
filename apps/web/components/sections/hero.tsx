export function Hero({ title, subtitle, ctaButton, buttonText, buttonUrl }: any) {
  // 1. Resolve which text to use (Check nested first, then flat fallback)
  const finalButtonText = ctaButton?.text || buttonText;
  const finalButtonUrl = ctaButton?.url || buttonUrl;

  return (
    <section className="relative overflow-hidden border-b border-neutral-200 bg-gradient-to-b from-background via-primary-50/30 to-background px-6 py-24 text-center md:py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-6 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      <div className="relative mx-auto max-w-5xl">
        {/* Badge */}
        <div className="inline-flex rounded-full border border-primary/30 bg-primary-50 px-5 py-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            ✨ Premium Design
          </span>
        </div>

        {/* Main heading with gradient */}
        <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight tracking-tight text-foreground">
          {title || "Welcome"}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-8 max-w-3xl text-lg md:text-2xl leading-relaxed text-muted font-light">
          {subtitle}
        </p>
      </div>

      {/* CTA Button */}
      {finalButtonText && (
        <div className="relative mt-12 flex justify-center">
          <a
            href={finalButtonUrl || "#"}
            className="group relative inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:brightness-110 overflow-hidden"
          >
            <span className="relative z-10">{finalButtonText}</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </a>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}