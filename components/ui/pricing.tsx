"use client";

import { motion, useSpring } from "framer-motion";
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { Check, Star as LucideStar } from "lucide-react";
import NumberFlow from "@number-flow/react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-600 text-white hover:bg-primary-700",
        outline:
          "border-2 border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-900",
      },
      size: {
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

function Star({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [mounted, setMounted] = useState(false);
  const [initialPos] = useState({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
  });
  const [size] = useState({
    width: 1 + Math.random() * 2,
    height: 1 + Math.random() * 2,
  });
  const [animationConfig] = useState({
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
  });

  const springConfig = { stiffness: 100, damping: 15, mass: 0.1 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      !containerRef.current ||
      mousePosition.x === null ||
      mousePosition.y === null
    ) {
      springX.set(0);
      springY.set(0);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const starX =
      containerRect.left +
      (parseFloat(initialPos.left) / 100) * containerRect.width;
    const starY =
      containerRect.top +
      (parseFloat(initialPos.top) / 100) * containerRect.height;

    const deltaX = mousePosition.x - starX;
    const deltaY = mousePosition.y - starY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const radius = 600;

    if (distance < radius) {
      const force = 1 - distance / radius;
      const pullX = deltaX * force * 0.5;
      const pullY = deltaY * force * 0.5;
      springX.set(pullX);
      springY.set(pullY);
    } else {
      springX.set(0);
      springY.set(0);
    }
  }, [mousePosition, initialPos, containerRef, springX, springY]);

  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      className="absolute bg-slate-400 rounded-full"
      style={{
        top: initialPos.top,
        left: initialPos.left,
        width: `${size.width}px`,
        height: `${size.height}px`,
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: animationConfig.duration,
        repeat: Infinity,
        delay: animationConfig.delay,
      }}
    />
  );
}

function InteractiveStarfield({
  mousePosition,
  containerRef,
}: {
  mousePosition: { x: number | null; y: number | null };
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {Array.from({ length: 150 }).map((_, i) => (
        <Star
          key={`star-${i}`}
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
      ))}
    </div>
  );
}

interface PricingPlan {
  name: string;
  price: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular?: boolean;
}

interface PricingSectionProps {
  plans: PricingPlan[];
  title?: string;
  description?: string;
}

const PricingContext = createContext<{
  isMonthly: boolean;
  setIsMonthly: (value: boolean) => void;
}>({
  isMonthly: true,
  setIsMonthly: () => { },
});

export function PricingSection({
  plans,
  title = "Simple, Transparent Pricing",
  description = "Choose the plan that's right for you.",
}: PricingSectionProps) {
  const [isMonthly, setIsMonthly] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  };

  return (
    <PricingContext.Provider value={{ isMonthly, setIsMonthly }}>
      <div
        id="pricing"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePosition({ x: null, y: null })}
        className="relative w-full py-12 sm:py-16"
      >
        <InteractiveStarfield
          mousePosition={mousePosition}
          containerRef={containerRef}
        />
        <div className="relative z-10 container-padding">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-block px-3 py-1 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-4">
              Pricing
            </div>
            <h2 className="section-heading text-4xl font-bold tracking-tighter sm:text-5xl text-slate-900">
              {title}
            </h2>
            <p className="text-slate-600 text-lg whitespace-pre-line">
              {description}
            </p>
          </div>
          {plans.some((p) => Number(p.price) > 0) && <PricingToggle />}
          <div
            className={cn(
              "mt-12 grid grid-cols-1 items-start gap-8",
              plans.length === 1
                ? "lg:grid-cols-1 max-w-md mx-auto"
                : "lg:grid-cols-3",
            )}
          >
            {plans.map((plan, index) => (
              <PricingCard key={index} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </div>
    </PricingContext.Provider>
  );
}

function PricingToggle() {
  const { isMonthly, setIsMonthly } = useContext(PricingContext);
  const confettiRef = useRef<HTMLDivElement>(null);
  const monthlyBtnRef = useRef<HTMLButtonElement>(null);
  const annualBtnRef = useRef<HTMLButtonElement>(null);

  const [pillStyle, setPillStyle] = useState({});

  useEffect(() => {
    const btnRef = isMonthly ? monthlyBtnRef : annualBtnRef;
    if (btnRef.current) {
      setPillStyle({
        width: btnRef.current.offsetWidth,
        transform: `translateX(${btnRef.current.offsetLeft}px)`,
      });
    }
  }, [isMonthly]);

  const handleToggle = (monthly: boolean) => {
    if (isMonthly === monthly) return;
    setIsMonthly(monthly);

    if (!monthly && confettiRef.current) {
      const rect = annualBtnRef.current?.getBoundingClientRect();
      if (!rect) return;

      const originX = (rect.left + rect.width / 2) / window.innerWidth;
      const originY = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 80,
        spread: 80,
        origin: { x: originX, y: originY },
        colors: ["#2563eb", "#ffffff", "#eff6ff"],
        ticks: 300,
        gravity: 1.2,
        decay: 0.94,
        startVelocity: 30,
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div
        ref={confettiRef}
        className="relative flex w-fit items-center rounded-full bg-slate-100 p-1"
      >
        <motion.div
          className="absolute left-0 top-0 h-full rounded-full bg-primary-600 p-1"
          style={pillStyle}
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
        <button
          ref={monthlyBtnRef}
          onClick={() => handleToggle(true)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            isMonthly ? "text-white" : "text-slate-600 hover:text-slate-900",
          )}
        >
          Monthly
        </button>
        <button
          ref={annualBtnRef}
          onClick={() => handleToggle(false)}
          className={cn(
            "relative z-10 rounded-full px-4 sm:px-6 py-2 text-sm font-medium transition-colors",
            !isMonthly ? "text-white" : "text-slate-600 hover:text-slate-900",
          )}
        >
          Annual
          <span
            className={cn(
              "hidden sm:inline",
              !isMonthly ? "text-white/80" : "",
            )}
          >
            {" "}
            (Save 20%)
          </span>
        </button>
      </div>
    </div>
  );
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const { isMonthly } = useContext(PricingContext);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{
        y: plan.isPopular && isDesktop ? -20 : 0,
        opacity: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.15,
      }}
      className={cn(
        "rounded-3xl p-8 flex flex-col relative transition-all duration-300",
        plan.isPopular
          ? "bg-white/80 backdrop-blur-xl border-2 border-transparent shadow-premium-lg hover:shadow-glow z-10 hover:scale-[1.02]"
          : "bg-white/60 backdrop-blur-lg border border-slate-200 shadow-premium hover:shadow-premium-lg hover:bg-white/90 hover:scale-[1.01]",
      )}
      style={
        plan.isPopular
          ? {
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(135deg, #2546eb, #6366f1, #8b5cf6)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
          }
          : undefined
      }
    >
      {plan.isPopular && (
        <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-primary-600 to-indigo-600 py-1.5 px-4 rounded-full flex items-center gap-1.5 shadow-lg shadow-primary-500/30 ring-4 ring-white">
            <LucideStar className="text-yellow-300 h-3.5 w-3.5 fill-current" />
            <span className="text-white text-xs font-bold tracking-wide uppercase">
              Most Popular
            </span>
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col text-center">
        <h3 className="text-xl font-heading font-bold text-slate-900">
          {plan.name}
        </h3>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          {plan.description}
        </p>
        <div className="mt-6 flex items-baseline justify-center gap-x-1">
          <span className="text-5xl font-bold tracking-tight text-slate-900">
            {Number(plan.price) === 0 ? (
              "Free"
            ) : (
              <NumberFlow
                value={
                  isMonthly ? Number(plan.price) : Number(plan.yearlyPrice)
                }
                format={{
                  style: "currency",
                  currency: "INR",
                  minimumFractionDigits: 0,
                }}
                className="font-variant-numeric: tabular-nums"
              />
            )}
          </span>
          {Number(plan.price) > 0 && (
            <span className="text-sm font-semibold leading-6 tracking-wide text-slate-500">
              / {plan.period}
            </span>
          )}
        </div>
        {Number(plan.price) > 0 && (
          <p className="text-xs text-slate-400 mt-2 font-medium">
            {isMonthly ? "Billed Monthly" : "Billed Annually"}
          </p>
        )}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

        <ul
          role="list"
          className="space-y-4 text-sm leading-5 text-left text-slate-600"
        >
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-3 items-start">
              <div className="mt-0.5 p-0.5 rounded-full bg-primary-50 text-primary-600">
                <Check className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
              </div>
              <span className="text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <Link
            href={plan.href}
            className={cn(
              buttonVariants({
                variant: plan.isPopular ? "default" : "outline",
                size: "lg",
              }),
              "w-full rounded-full text-base py-6 shadow-sm transition-all duration-300",
              plan.isPopular
                ? "shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-1"
                : "hover:border-slate-300 hover:bg-slate-50",
            )}
          >
            {plan.buttonText}
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
