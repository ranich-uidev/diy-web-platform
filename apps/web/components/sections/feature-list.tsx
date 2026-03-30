// apps/web/components/sections/feature-list.tsx

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/src/components/ui/card";

type Feature = {
  title: string;
  description?: string;
  icon?: string;
};

type FeatureListProps = {
  heading?: string;
  subheading?: string;
  features?: Feature[];
};

export function FeatureList({
  heading = "Why work with us",
  subheading = "Experience excellence with our comprehensive services and expertise.",
  features = [],
}: FeatureListProps) {
  const fallbackFeatures: Feature[] = features.length
    ? features
    : [
        {
          title: "Prime locations",
          description:
            "Access to the best opportunities in premium districts and high-demand areas.",
        },
        {
          title: "Expert guidance",
          description:
            "From consultation to closing, our team handles every detail with precision.",
        },
        {
          title: "Strategic planning",
          description:
            "Custom strategies tailored to your goals, whether growth, yield, or lifestyle.",
        },
      ];

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <div className="inline-block mb-6 px-4 py-1 rounded-full border border-primary/30 bg-primary-50">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Our Advantages
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-6">
          {heading}
        </h2>
        {subheading && (
          <p className="text-lg text-muted font-light max-w-2xl mx-auto">
            {subheading}
          </p>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-3">
        {fallbackFeatures.map((feature, idx) => (
          <div
            key={idx}
            className="group relative card hover:border-primary/50 hover:shadow-xl"
          >
            {/* Accent line on top hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent rounded-t-lg scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

            <CardHeader className="space-y-4">
              {/* Icon placeholder */}
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 text-sm font-black text-primary group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                {String(idx + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <CardTitle className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </CardTitle>

              {/* Description */}
              {feature.description && (
                <CardDescription className="text-base leading-relaxed text-muted font-normal">
                  {feature.description}
                </CardDescription>
              )}
            </CardHeader>

            {/* Icon on the right bottom */}
            {feature.icon && (
              <CardContent>
                <div className="text-3xl">{feature.icon}</div>
              </CardContent>
            )}

            {/* Hover arrow indicator */}
            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

