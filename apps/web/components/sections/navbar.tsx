export function Navbar({ logo, links }: any) {
  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 md:px-8 py-4">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">🎨</span>
          </div>
          <span className="hidden sm:inline text-xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
            {logo}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {links?.map((link: any) => (
            <a
              key={link.text}
              href={link.url}
              className="group relative px-4 py-2 text-sm font-medium text-muted transition-all duration-300 hover:text-primary rounded-lg hover:bg-primary-50"
            >
              {link.text}
              <span className="absolute bottom-0 left-4 h-0.5 w-0 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
            </a>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* CTA Button */}
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-bold rounded-lg shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Mobile menu button (responsive) */}
          <button className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-neutral-200 bg-background/50 backdrop-blur">
        <div className="flex items-center gap-2 overflow-x-auto px-4 py-3">
          {links?.map((link: any) => (
            <a
              key={`mobile-${link.text}`}
              href={link.url}
              className="whitespace-nowrap px-3 py-1.5 text-sm font-medium text-muted hover:text-primary transition-colors rounded-full hover:bg-primary-50"
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}