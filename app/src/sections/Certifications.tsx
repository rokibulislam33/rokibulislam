import { useEffect, useRef } from 'react';
import { 
  Award, 
  Database, 
  TrendingUp, 
  MessageCircle, 
  Briefcase,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.cert-header',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards flip animation
      const cards = document.querySelectorAll('.cert-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateY: index % 2 === 0 ? -90 : 90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Badge icons animation
      gsap.fromTo(
        '.cert-badge',
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: '.cert-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const certifications = [
    {
      icon: Award,
      title: 'Google AI Essentials Specialization',
      provider: 'Google via Coursera',
      date: 'February 2026',
      description: 'Comprehensive training in AI-powered productivity, prompt engineering, and data analysis optimization.',
      skills: ['AI-powered productivity', 'Prompt engineering', 'Data analysis optimization'],
      credential: null,
      color: 'from-blue-500/20 to-blue-500/5',
    },
    {
      icon: Database,
      title: 'BUS611: Data Management',
      provider: 'Saylor Academy',
      date: '44 Hours',
      description: 'Proficiency in database concepts, data organization, and analytics fundamentals.',
      skills: ['Database concepts', 'Data organization', 'Analytics fundamentals'],
      credential: 'Grade: 82.50%',
      color: 'from-green-500/20 to-green-500/5',
    },
    {
      icon: TrendingUp,
      title: 'Fundamentals of Digital Marketing',
      provider: 'Ostad',
      date: 'Completed',
      description: 'Advanced training in social media marketing, SEO, SEM, and content strategy.',
      skills: ['Social media marketing', 'SEO', 'SEM', 'Content strategy'],
      credential: null,
      color: 'from-purple-500/20 to-purple-500/5',
    },
    {
      icon: MessageCircle,
      title: 'Effective Speaking & Listening Skills',
      provider: 'Wadhwani Foundation',
      date: 'Completed',
      description: 'Certification in professional communication and presentation excellence (US English).',
      skills: ['Professional communication', 'Presentation excellence', 'US English'],
      credential: null,
      color: 'from-orange-500/20 to-orange-500/5',
    },
    {
      icon: Briefcase,
      title: 'Job Ready: Employability Skills',
      provider: 'Wadhwani Foundation',
      date: 'Completed',
      description: 'Enhanced workplace readiness and professional development competencies.',
      skills: ['Workplace readiness', 'Professional development', 'Career skills'],
      credential: null,
      color: 'from-pink-500/20 to-pink-500/5',
    },
  ];

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      
      <div className="container-custom">
        {/* Section Header */}
        <div className="cert-header text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium uppercase tracking-widest mb-4">
            Certifications
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Professional <span className="text-gradient">Development</span>
          </h2>
          <p className="text-dark-light max-w-2xl mx-auto">
            Continuous learning and skill enhancement through industry-recognized certifications 
            and specialized training programs.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="cert-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="cert-card bg-dark-card border border-dark-medium rounded-xl p-6 hover:border-lime/50 transition-all duration-300 card-hover group"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Badge Icon */}
              <div className="cert-badge absolute -top-3 -right-3 w-10 h-10 bg-lime rounded-full flex items-center justify-center shadow-glow">
                <CheckCircle2 className="w-5 h-5 text-black" />
              </div>

              {/* Icon & Provider */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${cert.color} rounded-lg`}>
                  <cert.icon className="w-6 h-6 text-lime" />
                </div>
                <span className="text-xs text-dark-light bg-dark-medium px-2 py-1 rounded">
                  {cert.date}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-lime transition-colors">
                {cert.title}
              </h3>
              <p className="text-lime text-sm font-medium mb-3">{cert.provider}</p>
              <p className="text-dark-light text-sm mb-4">{cert.description}</p>

              {/* Credential */}
              {cert.credential && (
                <div className="mb-4 p-2 bg-lime/10 rounded-lg">
                  <p className="text-lime text-sm font-medium text-center">{cert.credential}</p>
                </div>
              )}

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs text-dark-light bg-dark-medium px-2 py-1 rounded hover:bg-lime/10 hover:text-lime transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* View Credential Link */}
              <div className="mt-4 pt-4 border-t border-dark-medium">
                <button className="flex items-center gap-2 text-sm text-lime hover:underline group/link">
                  <span>View Credential</span>
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="text-center p-4 bg-dark-card border border-dark-medium rounded-xl">
            <div className="text-3xl font-bold text-lime mb-1">5+</div>
            <div className="text-sm text-dark-light">Certifications</div>
          </div>
          <div className="text-center p-4 bg-dark-card border border-dark-medium rounded-xl">
            <div className="text-3xl font-bold text-lime mb-1">44+</div>
            <div className="text-sm text-dark-light">Training Hours</div>
          </div>
          <div className="text-center p-4 bg-dark-card border border-dark-medium rounded-xl">
            <div className="text-3xl font-bold text-lime mb-1">3+</div>
            <div className="text-sm text-dark-light">Providers</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
