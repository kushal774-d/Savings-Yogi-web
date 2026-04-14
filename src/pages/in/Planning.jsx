import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target, ArrowRight, TrendingUp, ShieldCheck,
  BookOpen, Wallet, Calendar, Calculator,
  Home, Car, Briefcase, GraduationCap, HeartPulse
} from "lucide-react";
import Navbar from "../../components/home/Navigation";
import { Footer } from "../../components/Footer";
import planningHero from "../../assets/planning-hero.png";
import whyPlanning from "../../assets/45.jpg";
import learningImg from "../../assets/insights-hero.jpg";

gsap.registerPlugin(ScrollTrigger);

const GoalPlanningPage = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const calculatorRef = useRef(null);
  const sectionsRef = useRef([]);
  const progressRef = useRef(null);

  // Goal Calculator State
  const [goalAmount, setGoalAmount] = useState("");
  const [monthlySaving, setMonthlySaving] = useState("");
  const [months, setMonths] = useState(null);
  const [progress, setProgress] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(null);

  const goalPresets = [
    {
      id: "home",
      label: "Dream Home",
      icon: <Home size={24} />,
      amount: "5000000",
      savings: "25000",
      description: "Plan for your own sanctuary."
    },
    {
      id: "car",
      label: "Luxury Car",
      icon: <Car size={24} />,
      amount: "1500000",
      savings: "15000",
      description: "Drive your ambition."
    },
    {
      id: "retirement",
      label: "Retirement",
      icon: <Briefcase size={24} />,
      amount: "10000000",
      savings: "20000",
      description: "Secure your golden years."
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap size={24} />,
      amount: "2000000",
      savings: "10000",
      description: "Invest in the future."
    },
    {
      id: "emergency",
      label: "Emergency Fund",
      icon: <HeartPulse size={24} />,
      amount: "500000",
      savings: "5000",
      description: "Rainy day protection."
    }
  ];

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Hero Animation
    gsap.fromTo(
      heroRef.current.querySelectorAll(".animate-hero"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
    );

    // Fade-in animations for sections on scroll
    sectionsRef.current.forEach((section) => {
      if (section) {
        gsap.fromTo(
          section,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.id);
    setGoalAmount(preset.amount);
    setMonthlySaving(preset.savings);
    // Clear previous calculation results
    setMonths(null);
    setProgress(0);
  };

  const calculateGoal = () => {
    const amount = parseFloat(goalAmount);
    const saving = parseFloat(monthlySaving);

    if (!amount || !saving || saving <= 0) return;

    const totalMonths = Math.ceil(amount / saving);
    setMonths(totalMonths);

    // Percentage of monthly saving relative to goal (for visualization)
    const percentage = Math.min((saving / amount) * 100, 100);
    setProgress(percentage);

    gsap.fromTo(
      progressRef.current,
      { width: "0%" },
      { width: `${percentage}%`, duration: 1.5, ease: "power4.out" }
    );
  };

  const steps = [
    {
      icon: <Target className="w-8 h-8 text-[#FFB300]" />,
      title: "Set Your Target",
      desc: "Define exactly what you're saving for, whether it's a dream home or emergency fund.",
    },
    {
      icon: <Calendar className="w-8 h-8 text-[#FFB300]" />,
      title: "Choose Timeline",
      desc: "Decide how soon you want to achieve your goal to determine your monthly commitment.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-[#FFB300]" />,
      title: "Track Growth",
      desc: "Monitor your progress monthly and adjust your strategy as your income grows.",
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-white">
      <Navbar />

      <main>
        {/* ================= HERO ================= */}
        <section
          ref={heroRef}
          className="relative pt-12 pb-12 md:pt-16 md:pb-16 overflow-hidden bg-gradient-to-b from-[#003366] to-[#002244]"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFB300]/5 rounded-bl-[200px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative">
            <div className="text-white">
              <div className="animate-hero inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8">
                <Target size={16} className="text-[#FFB300]" />
                <span>Financial Roadmap</span>
              </div>
              <h1 className="animate-hero text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                Goal Planning <br />
                <span className="text-[#FFB300]">Made Simple.</span>
              </h1>
              <p className="animate-hero text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
                Manifest your financial dreams through disciplined planning. Set clear goals,
                visualize your roadmap, and watch your future take shape.
              </p>
              <div className="animate-hero flex flex-wrap gap-4">
                <button
                  onClick={() => calculatorRef.current.scrollIntoView({ behavior: "smooth" })}
                  className="bg-[#FFB300] text-[#003366] px-8 py-4 rounded-xl font-bold hover:bg-[#FFC433] transition-all transform hover:scale-105"
                >
                  Start Planning Now
                </button>
              </div>
            </div>

            <div className="animate-hero relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#FFB300]/20 to-transparent rounded-3xl blur-2xl" />
              <img
                src={planningHero}
                alt="Goal Planning"
                className="relative rounded-3xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </section>

        {/* ================= STEPS ================= */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-[#003366] mb-4">
                Three Steps to Success
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our simple framework helps you bridge the gap between where you are and where you want to be.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => (sectionsRef.current[i] = el)}
                  className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#FFB300]/10 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#003366] mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div ref={(el) => (sectionsRef.current[3] = el)} className="relative">
            <div className="absolute -inset-4 bg-[#003366]/5 rounded-[40px] rotate-3" />
            <img
              src={whyPlanning}
              alt="Disciplined Savings"
              className="relative rounded-[40px] shadow-xl object-cover h-[500px] w-full"
            />
          </div>

          <div ref={(el) => (sectionsRef.current[4] = el)}>
            <div className="flex items-center gap-2 text-[#FFB300] font-bold mb-4">
              <ShieldCheck size={20} />
              <span className="uppercase tracking-widest text-sm text-[#003366]">The Importance</span>
            </div>
            <h2 className="text-4xl font-bold text-[#003366] mb-6 leading-tight">
              Why Disciplined <br /> Planning Matters
            </h2>
            <div className="space-y-6">
              <p className="text-gray-600 text-lg leading-relaxed">
                Goal planning gives your money a purpose. Instead of reactive spending, every rupee you save becomes a deliberate step toward your future.
              </p>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#003366]/10 flex items-center justify-center">
                  <ArrowRight size={14} className="text-[#003366]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#003366]">Consistency is Key</h4>
                  <p className="text-gray-500">Regular micro-savings compound over time into significant wealth.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#003366]/10 flex items-center justify-center">
                  <ArrowRight size={14} className="text-[#003366]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#003366]">Financial Peace</h4>
                  <p className="text-gray-500">Knowing you have a plan reduces anxiety and increases confidence.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GOAL CALCULATOR ================= */}
        <section
          ref={calculatorRef}
          className="py-24 bg-[#003366] text-white overflow-hidden relative"
        >
          {/* Background Text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.03] select-none pointer-events-none whitespace-nowrap">
            GOALS GOALS GOALS
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Goal Calculator</h2>
              <p className="text-white/60">Find out how long it will take to reach your milestone.</p>
            </div>

            <div className="glass p-8 md:p-12 rounded-[2rem] shadow-2xl border border-white/10">

              {/* Preset Goals Section */}
              <div className="mb-12">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Target className="text-[#FFB300]" size={20} />
                  Select Your Goal Type
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {goalPresets.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handlePresetSelect(preset)}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group
                        ${selectedPreset === preset.id
                          ? 'bg-[#FFB300] border-[#FFB300] text-[#003366] scale-105 shadow-xl'
                          : 'bg-white/5 border-white/10 hover:border-[#FFB300]/50 hover:bg-white/10'
                        }`}
                    >
                      <div className={`mb-3 transition-transform duration-300 group-hover:scale-110 ${selectedPreset === preset.id ? 'text-[#003366]' : 'text-[#FFB300]'}`}>
                        {preset.icon}
                      </div>
                      <span className="text-sm font-bold text-center">{preset.label}</span>
                    </button>
                  ))}
                </div>
                {selectedPreset && (
                  <p className="text-center mt-4 text-white/60 text-sm animate-fade-in italic">
                    Assumptions auto-filled for {goalPresets.find(p => p.id === selectedPreset)?.label}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Target Amount (₹)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFB300]" size={20} />
                    <input
                      type="number"
                      placeholder="e.g. 1,00,000"
                      value={goalAmount}
                      onChange={(e) => {
                        setGoalAmount(e.target.value);
                        setSelectedPreset(null);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB300] transition-all text-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70 ml-1">Monthly Saving (₹)</label>
                  <div className="relative">
                    <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FFB300]" size={20} />
                    <input
                      type="number"
                      placeholder="e.g. 5,000"
                      value={monthlySaving}
                      onChange={(e) => {
                        setMonthlySaving(e.target.value);
                        setSelectedPreset(null);
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FFB300] transition-all text-xl"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={calculateGoal}
                className="w-full bg-[#FFB300] text-[#003366] py-5 rounded-2xl font-black text-lg hover:bg-white transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3"
              >
                CALCULATE MY ROADMAP
                <ArrowRight />
              </button>

              {months && (
                <div className="mt-12 space-y-6 pt-10 border-t border-white/10 animate-fade-in">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Timeline</p>
                      <h3 className="text-4xl font-bold">
                        {months} <span className="text-[#FFB300] text-2xl">Months</span>
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm uppercase tracking-widest mb-1">Status</p>
                      <span className="px-4 py-1.5 rounded-full bg-green-500/20 text-green-400 text-sm font-bold border border-green-500/30">
                        Achievable
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Progress Path</span>
                      <span className="text-[#FFB300] font-bold">{progress.toFixed(1)}% Velocity</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-4 overflow-hidden p-1 border border-white/10">
                      <div
                        ref={progressRef}
                        className="bg-gradient-to-r from-[#FFB300] to-[#FFD54F] h-full rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= LEARNING SECTION ================= */}
        <section className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div ref={(el) => (sectionsRef.current[5] = el)}>
            <div className="flex items-center gap-2 text-[#FFB300] font-bold mb-4">
              <BookOpen size={20} />
              <span className="uppercase tracking-widest text-sm text-[#003366]">Knowledge is Asset</span>
            </div>
            <h2 className="text-4xl font-bold text-[#003366] mb-6">Learn While You Plan</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We don't just provide tools; we provide wisdom. Our platform helps you understand the psychology of money and the math of compounding.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h4 className="font-bold text-[#003366] mb-2">Psychology</h4>
                <p className="text-sm text-gray-500 text-pretty">Build habits that stick for life.</p>
              </div>
              <div className="p-6 bg-gray-50 rounded-2xl">
                <h4 className="font-bold text-[#003366] mb-2">Strategy</h4>
                <p className="text-sm text-gray-500 text-pretty">Optimized paths for your goals.</p>
              </div>
            </div>
          </div>

          <div ref={(el) => (sectionsRef.current[6] = el)} className="relative h-[500px]">
            <img
              src={learningImg}
              alt="Financial Learning"
              className="w-full h-full object-cover rounded-[40px] shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-xl max-w-[200px]">
              <p className="text-sm font-bold text-[#003366]">"An investment in knowledge pays the best interest."</p>
              <p className="text-xs text-gray-400 mt-2">— Benjamin Franklin</p>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto bg-[#FFB300] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group">
            {/* Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#003366]/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

            <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-8 relative z-10">
              Ready to take control of <br /> your financial future?
            </h2>
            <button className="relative z-10 bg-[#003366] text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-[#002244] transition-all transform hover:scale-105 shadow-2xl flex items-center gap-3 mx-auto">
              EXPLORE TIPS & STRATEGIES
              <ArrowRight />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GoalPlanningPage;

