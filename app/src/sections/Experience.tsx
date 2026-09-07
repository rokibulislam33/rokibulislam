import { useEffect, useRef } from 'react';
import { Briefcase, Target, BarChart2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Timeline items animation
      const items = document.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          item,
          { 
            x: isLeft ? -100 : 100, 
            opacity: 0,
            rotateY: isLeft ? 15 : -15 
          },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Node animations
      gsap.fromTo(
        '.timeline-node',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.2,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const experiences = [
    {
      icon: Target,
      title: 'Digital Marketing Case Study Analysis',
      company: 'Academic Project',
      date: '2024',
      description: 'Market research and campaign optimization project analyzing real-world marketing campaigns across digital channels.',
      achievements: [
        'Analyzed real-world marketing campaigns across digital channels and identified optimization opportunities',
        'Applied data-driven insights to recommend strategic improvements resulting in enhanced campaign efficiency',
        'Demonstrated proficiency in interpreting analytics data and translating insights into actionable recommendations',
      ],
    },
    {
      icon: BarChart2,
      title: 'Business Data Analysis Project',
      company: 'Academic Project',
      date: '2024',
      description: 'Comprehensive data management and visualization project using Excel and statistical analysis techniques.',
      achievements: [
        'Processed large datasets using Excel and applied statistical analysis techniques',
        'Created comprehensive data visualizations to communicate findings to non-technical stakeholders',
        'Utilized data management principles to ensure accuracy and reliability of analytical insights',
      ],
    },
    {
      icon: Briefcase,
      title: 'Academic Coursework & Training',
      company: 'Daffodil International University',
      date: '2024 - Present',
      description: 'Pursuing BBA in Marketing with focus on digital marketing strategy and business analytics.',
      achievements: [
        'Core Coursework: Digital Marketing Strategy, Consumer Behavior, Market Research, Financial Analysis',
        'Maintaining strong academic performance with focus on practical applications',
        'Engaging in various professional development certifications alongside studies',
      ],
    },
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium uppercase tracking-widest mb-4">
            Experience
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Professional <span className="text-gradient">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-dark-medium transform md:-translate-x-1/2">
            <div
              className="timeline-line absolute inset-0 bg-gradient-to-b from-lime via-lime to-lime/30 origin-top"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`timeline-item relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ perspective: '1000px' }}
              >
                {/* Node */}
                <div className="timeline-node absolute left-4 md:left-1/2 w-4 h-4 bg-lime rounded-full transform -translate-x-1/2 mt-6 z-10 shadow-glow" />

                {/* Content Card */}
                <div
                  className={`ml-12 md:ml-0 md:w-[45%] ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                >
                  <div className="bg-dark-card border border-dark-medium rounded-xl p-6 hover:border-lime/50 transition-all duration-300 card-hover group">
                    {/* Icon & Date */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-lime/10 rounded-lg group-hover:bg-lime/20 transition-colors">
                        <exp.icon className="w-6 h-6 text-lime" />
                      </div>
                      <span className="text-lime text-sm font-medium">{exp.date}</span>
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-dark-light text-sm mb-4">{exp.company}</p>

                    {/* Description */}
                    <p className="text-dark-light text-sm mb-4">{exp.description}</p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-dark-light">
                          <span className="w-1.5 h-1.5 bg-lime rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
