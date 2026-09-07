import { useEffect, useRef } from 'react';
import { TrendingUp, BarChart3, Brain, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { x: -100, opacity: 0, rotateY: -30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Content animation
      if (contentRef.current) {
        const elements = contentRef.current.querySelectorAll('.animate-item');
        gsap.fromTo(
          elements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Highlights animation
      if (highlightsRef.current) {
        const cards = highlightsRef.current.querySelectorAll('.highlight-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: highlightsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const highlights = [
    {
      icon: TrendingUp,
      title: 'Digital Marketing Expertise',
      description: 'SEO, SEM, Social Media, Content Strategy',
    },
    {
      icon: BarChart3,
      title: 'Data Analysis Proficiency',
      description: 'Excel, Analytics, Visualization, Statistics',
    },
    {
      icon: Brain,
      title: 'AI-Powered Solutions',
      description: 'AI Tools, Prompt Engineering, Automation',
    },
    {
      icon: Lightbulb,
      title: 'Strategic Thinking',
      description: 'Business Intelligence, Market Research',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div
            ref={imageRef}
            className="relative group"
            style={{ perspective: '800px' }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Image frame with glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-lime/20 to-lime/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img
                src="/profile-new.png"
                alt="Rokibul Islam"
                className="relative w-full max-w-md mx-auto rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-lime/30 rounded-lg -z-10" />
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-lime/10 rounded-lg -z-10" />
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef}>
            <span className="animate-item inline-block text-lime text-sm font-medium uppercase tracking-widest mb-4">
              About Me
            </span>
            
            <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Results-Driven{' '}
              <span className="text-gradient">Marketing Professional</span>
            </h2>
            
            <div className="animate-item space-y-4 text-dark-light leading-relaxed mb-8">
              <p>
                Results-driven Marketing graduate with strong analytical acumen and proven expertise 
                in digital marketing, data analysis, and business intelligence. Demonstrated proficiency 
                in leveraging data-driven insights and AI-powered tools to optimize marketing campaigns 
                and enhance business performance.
              </p>
              <p>
                Certified in data management, business analytics, and Google AI technologies with 
                exceptional communication and presentation skills. Seeking to contribute technical 
                marketing expertise and analytical mindset to a dynamic MNC organization.
              </p>
            </div>

            {/* Highlights Grid */}
            <div ref={highlightsRef} className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="highlight-card p-4 bg-dark-card border border-dark-medium rounded-xl hover:border-lime/50 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-lime/10 rounded-lg group-hover:bg-lime/20 transition-colors">
                      <item.icon className="w-5 h-5 text-lime" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">{item.title}</h3>
                      <p className="text-dark-light text-xs">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
