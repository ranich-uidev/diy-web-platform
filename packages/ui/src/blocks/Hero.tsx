// packages/ui/src/blocks/Hero.tsx
interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  imageUrl?: string;
  theme?: 'finance' | 'medical'; // Scoped styling
}

export const Hero01 = ({ title, subtitle, ctaText, imageUrl }: HeroProps) => {
  return (
    <section className="py-20 px-6 flex flex-col md:flex-row items-center gap-10">
      <div className="flex-1 space-y-6">
        <h1 className="text-5xl font-bold tracking-tight text-primary">{title}</h1>
        <p className="text-xl text-muted-foreground">{subtitle}</p>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium">
          {ctaText}
        </button>
      </div>
      <div className="flex-1">
        <img src={imageUrl} alt="Hero" className="rounded-2xl shadow-2xl" />
      </div>
    </section>
  );
};