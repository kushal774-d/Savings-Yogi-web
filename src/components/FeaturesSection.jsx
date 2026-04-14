import { PiggyBank, BookOpen, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: PiggyBank,
    title: "Smart Savings  ",
    description:
      "Learn proven strategies to save more money every month. From emergency funds to long-term goals, we cover it all.",
    cta: "Start Saving",
    link: "/asdf",
    popular: false,
  },
  {
    icon: BookOpen,
    title: "Financial Education",
    description:
      "Easy-to-understand guides on budgeting, investing basics, and building wealth. No jargon, just practical knowledge.",
    cta: "Learn More",
    link: "/financial-education",
    popular: true,
  },
  {
    icon: Target,
    title: "Goal Planning",
    description:
      "Set achievable financial goals and track your progress. Whether buying a home or retiring early, we help you plan.",
    cta: "Set Goals",
    link: "/Planning",
    popular: false,
  },
];

export const FeaturesSection = () => {
  return (
    <section
      id="services"
      className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-28 bg-background"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2 sm:mb-3 md:mb-4">
            Why Choose SavingsYogi
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2 sm:px-4">
            We provide unbiased, practical financial guidance to help you build
            better money habits and secure your future.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.link}
              onClick={() => {
                setTimeout(() => {
                  document.getElementById("hero")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }, 100);
              }}
              className={`relative group rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer ${
                feature.popular
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card border border-border hover:border-accent/30"
              }`}
            >
              {/* Popular Badge */}
              {feature.popular && (
                <span className="absolute -top-2 sm:-top-3 right-3 sm:right-4 md:right-6 bg-accent text-accent-foreground text-[9px] sm:text-[10px] md:text-xs font-bold px-2 sm:px-3 py-1 rounded-full">
                  POPULAR
                </span>
              )}

              {/* Icon */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 md:mb-6 ${
                  feature.popular ? "bg-primary-foreground/10" : "bg-primary/10"
                }`}
              >
                <feature.icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${
                    feature.popular ? "text-accent" : "text-primary"
                  }`}
                />
              </div>

              {/* Content */}
              <h3
                className={`text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 ${
                  feature.popular
                    ? "text-primary-foreground"
                    : "text-foreground"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 md:mb-6 ${
                  feature.popular
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                }`}
              >
                {feature.description}
              </p>

              {/* CTA */}
              <span
                className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold ${
                  feature.popular
                    ? "text-accent group-hover:text-accent/80"
                    : "text-accent group-hover:text-primary"
                }`}
              >
                {feature.cta}
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
