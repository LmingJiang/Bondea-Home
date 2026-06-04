import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ArrowRight, Check, Phone, Send, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const images = {
  hero:
    "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2200&q=85",
  curtains:
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=80",
  bedding:
    "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=900&q=80",
  cushions:
    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=900&q=80",
  table:
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  fabric:
    "https://images.unsplash.com/photo-1602872030490-4a484a7b3ba6?auto=format&fit=crop&w=1200&q=80",
  living:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  dining:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
  footer:
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85",
};

const categories = [
  {
    title: "Curtains",
    description: "Sheer, blackout, and textured curtains for living rooms and bedrooms.",
    image: images.curtains,
  },
  {
    title: "Bedding Sets",
    description: "Soft four-piece bedding sets for calm and restful nights.",
    image: images.bedding,
  },
  {
    title: "Cushions & Throws",
    description: "Small details that make your sofa and bedroom feel warmer.",
    image: images.cushions,
  },
  {
    title: "Table Linen",
    description: "Tablecloths and fabric details for everyday dining.",
    image: images.table,
  },
];

const products = [
  ["Cream Blackout Curtains", "Curtains", "Soft privacy with a gentle woven texture.", images.curtains, "md:col-span-7"],
  ["Washed Cotton Bedding Set", "Bedding", "Breathable layers for relaxed family bedrooms.", images.bedding, "md:col-span-5"],
  ["Linen Cushion Covers", "Soft Decor", "Neutral cushions that refresh sofas and reading corners.", images.cushions, "md:col-span-5"],
  ["Soft Neutral Table Cloth", "Table Linen", "Everyday dining with a calmer fabric finish.", images.dining, "md:col-span-7"],
] as const;

const cases = [
  {
    title: "Warm Bedroom Setup",
    badge: "Bedroom",
    description: "Layered bedding, soft curtain light, and calm tones for better rest.",
    image: images.bedding,
  },
  {
    title: "Soft Living Room Curtains",
    badge: "Living Room",
    description: "Sheer fabric and neutral cushions make the family room feel lighter.",
    image: images.living,
  },
  {
    title: "Natural Dining Corner",
    badge: "Dining",
    description: "Table linen and warm textures bring everyday meals closer together.",
    image: images.dining,
  },
];

const journal = [
  ["How to choose curtains for a small bedroom", "4 min read · May 2026", images.curtains],
  ["Cream colors that make a room feel softer", "3 min read · May 2026", images.living],
  ["Bedding textures for better sleep", "5 min read · May 2026", images.bedding],
  ["Simple fabric details that change a home", "4 min read · May 2026", images.fabric],
] as const;

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Curtains", "Bedding", "Soft Home"];

  useEffect(() => {
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / 2200, 1);
      setCount(Math.round(progress * 100));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
        return;
      }

      window.setTimeout(onComplete, 400);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % words.length);
    }, 750);
    return () => window.clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-cream text-text-primary"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.p
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        CozyNest Home
      </motion.p>
      <div className="grid h-full place-items-center px-6 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[wordIndex]}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.4 }}
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
      <p className="absolute bottom-8 right-6 font-display text-6xl tabular-nums md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </p>
      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left shadow-[0_0_10px_rgba(185,139,99,0.25)]"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const links = [
    ["Home", "home"],
    ["Products", "products"],
    ["Cases", "cases"],
    ["Contact", "contact"],
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex items-center rounded-full border border-white/50 bg-cream/75 px-2 py-2 shadow-sm backdrop-blur-md transition ${
          scrolled ? "bg-cream/90 shadow-md shadow-coffee/10" : ""
        }`}
      >
        <a href="#home" className="accent-gradient grid size-9 place-items-center rounded-full p-[2px] transition hover:scale-110">
          <span className="grid size-full place-items-center rounded-full bg-cream font-display text-[15px] italic text-coffee">
            织
          </span>
        </a>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        {links.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className="rounded-full px-3 py-1.5 text-xs text-muted transition hover:bg-linen/50 hover:text-text-primary sm:px-4 sm:py-2 sm:text-sm"
          >
            {label}
          </a>
        ))}
        <span className="mx-1 hidden h-5 w-px bg-stroke md:block" />
        <a
          href="#contact"
          className="group hidden rounded-full p-[2px] transition hover:accent-gradient hover:scale-105 sm:inline-flex"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-sm text-text-primary backdrop-blur-md">
            Get advice <ArrowRight size={14} />
          </span>
        </a>
      </div>
    </nav>
  );
}

function SectionHeading({
  eyebrow,
  title,
  highlight,
  text,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
}) {
  return (
    <motion.div
      className="mb-10 max-w-2xl md:mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-muted">
        <span className="h-px w-8 bg-stroke" />
        {eyebrow}
      </div>
      <h2 className="text-4xl leading-tight text-text-primary md:text-6xl">
        {title} <span className="font-display italic text-coffee">{highlight}</span>
      </h2>
      <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">{text}</p>
    </motion.div>
  );
}

function Hero() {
  const [role, setRole] = useState(0);
  const roles = useMemo(() => ["warm", "soft", "peaceful", "beautiful"], []);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
      .fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 },
        0.3,
      )
      .fromTo(".hero-cta", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }, 0.8);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setRole((current) => (current + 1) % roles.length), 2000);
    return () => window.clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      <img src={images.hero} alt="Warm bedroom with soft linen bedding and curtains" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-cream/35" />
      <div className="absolute bottom-0 left-0 h-56 w-full bg-gradient-to-t from-bg to-transparent" />
      <div className="absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-accent-soft/25 blur-3xl" />
      <div className="absolute bottom-20 right-[-8rem] h-96 w-96 rounded-full bg-sage/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 pt-20 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">Soft Living Collection</p>
        <h1 className="name-reveal mb-5 font-display text-6xl italic leading-[0.9] tracking-normal text-text-primary md:text-8xl lg:text-9xl">
          织梦家
        </h1>
        <p className="blur-in mb-6 text-xl uppercase tracking-[0.2em] text-coffee md:text-2xl">CozyNest Home</p>
        <p className="blur-in mb-5 text-lg text-text-primary md:text-xl">
          Make your home feel more{" "}
          <span key={roles[role]} className="inline-block animate-role-fade-in font-display italic text-coffee">
            {roles[role]}
          </span>
          .
        </p>
        <p className="blur-in mx-auto mb-12 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          Curtains, bedding, and soft furnishings for everyday homes: simple, comfortable, and gently beautiful.
        </p>
        <div className="inline-flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#products" className="hero-cta rounded-full bg-text-primary px-7 py-3.5 text-sm text-cream opacity-0 transition duration-500 hover:scale-105 hover:bg-coffee">
            View Products
          </a>
          <a href="#contact" className="hero-cta rounded-full border-2 border-stroke bg-cream/70 px-7 py-3.5 text-sm text-text-primary opacity-0 backdrop-blur transition duration-500 hover:scale-105 hover:border-accent">
            Contact Us
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Scroll</p>
        <div className="relative mx-auto h-10 w-px overflow-hidden bg-stroke">
          <div className="accent-gradient absolute left-0 top-0 h-5 w-px animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  useEffect(() => {
    if (!marqueeRef.current) return;
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 45,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tween.kill();
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>
      <Navbar />
      <main>
        <Hero />

        <section id="products" className="bg-bg py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
            <SectionHeading
              eyebrow="Our Collection"
              title="Soft pieces for a"
              highlight="warmer home"
              text="From curtains to bedding, every piece is selected to make daily living more comfortable, natural, and beautiful."
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {categories.map((item) => (
                <motion.article
                  key={item.title}
                  className="group overflow-hidden rounded-[2rem] border border-stroke bg-surface-soft p-5 transition duration-500 hover:border-accent-soft hover:shadow-xl hover:shadow-coffee/10 md:p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <img src={item.image} alt={item.title} className="mb-5 aspect-[4/5] w-full rounded-[1.5rem] object-cover transition duration-700 group-hover:scale-105" />
                  <h3 className="font-display text-xl italic text-text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
            <SectionHeading
              eyebrow="Featured Products"
              title="Everyday comfort, carefully"
              highlight="chosen"
              text="Simple textures, soft colors, and practical materials for real homes."
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
              {products.map(([name, category, sellingPoint, image, span]) => (
                <article key={name} className={`group relative min-h-[360px] overflow-hidden rounded-3xl border border-stroke bg-surface-soft ${span}`}>
                  <img src={image} alt={name} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee/50 via-coffee/10 to-transparent" />
                  <div className="absolute inset-0 fabric-overlay" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                    <p className="mb-2 text-xs uppercase tracking-[0.24em] text-cream/75">{category}</p>
                    <h3 className="font-display text-3xl italic">{name}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-cream/85">{sellingPoint}</p>
                  </div>
                  <span className="absolute right-5 top-5 rounded-full border border-white/70 bg-cream/90 px-4 py-2 text-sm text-text-primary opacity-0 backdrop-blur transition duration-500 group-hover:opacity-100">
                    View <span className="font-display italic">{name}</span>
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="bg-bg py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
            <SectionHeading
              eyebrow="Home Cases"
              title="Real rooms, softer"
              highlight="moments"
              text="See how curtains, bedding, and fabric details change the feeling of a room."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {cases.map((item) => (
                <article key={item.title} className="group overflow-hidden rounded-[2rem] border border-stroke bg-surface-soft">
                  <img src={item.image} alt={item.title} className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="p-5">
                    <span className="rounded-full bg-linen/70 px-3 py-1 text-xs text-coffee">{item.badge}</span>
                    <h3 className="mt-4 font-display text-2xl italic text-text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:px-16">
            <img src={images.fabric} alt="Soft fabric texture and textile folds" className="rounded-[2.5rem] border border-white/60 shadow-xl shadow-coffee/10" />
            <div>
              <SectionHeading
                eyebrow="Fabric & Quality"
                title="Soft touch, practical"
                highlight="daily use"
                text="Good home textiles should look beautiful, feel comfortable, be easy to care for, and fit naturally into everyday life."
              />
              {[
                ["Comfortable textures", "Gentle touch for bedrooms, sofas, and window light."],
                ["Soft neutral colors", "Warm tones that are easy to match with family spaces."],
                ["Easy-care materials", "Practical fabrics selected for everyday routines."],
                ["Suitable for real family homes", "Simple, durable pieces for rooms people truly live in."],
              ].map(([title, text]) => (
                <div key={title} className="flex items-start gap-4 border-b border-stroke py-4">
                  <span className="accent-gradient mt-1 grid size-6 shrink-0 place-items-center rounded-full text-cream">
                    <Check size={14} />
                  </span>
                  <div>
                    <h3 className="text-base text-text-primary">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-bg py-16 md:py-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
            <SectionHeading
              eyebrow="Journal"
              title="Recent"
              highlight="home notes"
              text="Simple ideas about curtains, bedding, color matching, and making a home feel warmer."
            />
            <div className="grid gap-4">
              {journal.map(([title, meta, image]) => (
                <article key={title} className="flex flex-col gap-5 rounded-[2rem] border border-stroke bg-surface-soft/70 p-4 transition duration-500 hover:bg-surface-soft sm:flex-row sm:items-center md:hover:translate-x-1">
                  <img src={image} alt={title} className="h-28 w-full rounded-[1.25rem] object-cover sm:w-32" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted">{meta}</p>
                    <h3 className="mt-2 font-display text-2xl italic text-text-primary">{title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-5 px-6 md:grid-cols-3 md:px-10 lg:px-16">
            {[
              ["500+", "Happy Homes"],
              ["1000+", "Fabric Choices"],
              ["8+", "Years Experience"],
            ].map(([number, label]) => (
              <div key={label} className="rounded-[2rem] border border-white/60 bg-surface-soft p-8 text-center shadow-sm">
                <p className="font-display text-6xl italic text-coffee">{number}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.24em] text-muted">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <footer id="contact" className="relative overflow-hidden bg-coffee pb-8 pt-16 text-cream md:pb-12 md:pt-20">
          <img src={images.footer} alt="Warm home textile close-up" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-coffee/75" />
          <div className="pointer-events-none absolute top-10 flex whitespace-nowrap" ref={marqueeRef}>
            {Array.from({ length: 10 }).map((_, index) => (
              <span key={index} className="pr-10 font-display text-[14vw] italic leading-none text-cream/10">
                MAKE HOME SOFTER
              </span>
            ))}
          </div>
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.3em] text-cream/75">Let's make your home warmer</p>
            <h2 className="font-display text-5xl italic leading-tight md:text-7xl">Need curtains or bedding advice?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream/80 md:text-base">
              Tell us your room style, size, and color preference. We will help you choose soft furnishings that fit your home.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a className="inline-flex items-center justify-center gap-2 rounded-full bg-cream px-6 py-3 text-sm text-text-primary transition hover:scale-105" href="mailto:hello@cozynesthome.com">
                <Send size={16} /> Add WeChat
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm text-cream transition hover:scale-105 hover:border-cream" href="tel:+8613800000000">
                <Phone size={16} /> Call Us
              </a>
              <a className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 px-6 py-3 text-sm text-cream transition hover:scale-105 hover:border-cream" href="#products">
                <ShoppingBag size={16} /> View Products
              </a>
            </div>
            <a className="mt-8 inline-block text-sm text-cream/80 underline decoration-cream/30 underline-offset-4" href="mailto:hello@cozynesthome.com">
              hello@cozynesthome.com
            </a>
          </div>
          <div className="relative z-10 mx-auto mt-16 flex max-w-[1200px] flex-col gap-5 border-t border-cream/20 px-6 pt-8 text-sm text-cream/70 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
            <p>© 2026 织梦家 CozyNest Home</p>
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2">
                <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
                Available for home styling advice
              </span>
              {["WeChat", "Xiaohongshu", "Douyin", "Taobao"].map((item) => (
                <a key={item} href="#contact" className="hover:text-cream">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
