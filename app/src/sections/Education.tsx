import { useEffect, useRef } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.education-header',
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

      // Cards animation
      gsap.fromTo(
        '.education-card',
        { y: 80, opacity: 0, rotateX: 30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.education-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // GPA badges animation
      gsap.fromTo(
        '.gpa-badge',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.5,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.education-grid',
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const educationData = [
    {
      icon: GraduationCap,
      degree: 'Bachelor of Business Administration (BBA)',
      major: 'Marketing',
      institution: 'Daffodil International University',
      year: 'Expected: 2029',
      status: 'Ongoing',
      gpa: null,
      coursework: [
        'Digital Marketing Strategy',
        'Consumer Behavior',
        'Market Research',
        'Financial Analysis',
      ],
      color: 'lime',
    },
    {
      icon: BookOpen,
      degree: 'Higher Secondary Certificate (HSC)',
      major: 'Business Studies',
      institution: 'Rajuk Uttara Model College',
      year: '2024',
      status: 'Completed',
      gpa: '4.92/5.0',
      coursework: ['Business Studies', 'Accounting', 'Economics', 'Management'],
      color: 'blue',
    },
    {
      icon: Award,
      degree: 'Secondary School Certificate (SSC)',
      major: 'Business Studies',
      institution: 'Feni Government Pilot High School',
      year: '2022',
      status: 'Completed',
      gpa: '4.94/5.0',
      coursework: ['Business Studies', 'Science', 'Mathematics', 'English'],
      color: 'purple',
    },
  ];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      
      <div className="container-custom">
        {/* Section Header */}
        <div className="education-header text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium uppercase tracking-widest mb-4">
            Education
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Academic <span className="text-gradient">Background</span>
          </h2>
          <p className="text-dark-light max-w-2xl mx-auto">
            A strong educational foundation in business and marketing, complemented by 
            continuous professional development.
          </p>
        </div>

        {/* Education Cards */}
        <div className="education-grid grid md:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="education-card relative bg-dark-card border border-dark-medium rounded-xl p-6 hover:border-lime/50 transition-all duration-300 card-hover group"
            >
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-medium rounded-full ${
                edu.status === 'Ongoing' 
                  ? 'bg-lime/20 text-lime' 
                  : 'bg-dark-medium text-dark-light'
              }`}>
                {edu.status}
              </div>

              {/* Icon */}
              <div className="p-3 bg-lime/10 rounded-lg w-fit mb-4 group-hover:bg-lime/20 transition-colors">
                <edu.icon className="w-6 h-6 text-lime" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
              <p className="text-lime text-sm font-medium mb-2">{edu.major}</p>
              <p className="text-dark-light text-sm mb-4">{edu.institution}</p>

              {/* Year */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs text-dark-light bg-dark-medium px-2 py-1 rounded">
                  {edu.year}
                </span>
              </div>

              {/* GPA Badge */}
              {edu.gpa && (
                <div className="gpa-badge absolute -bottom-3 right-6 px-4 py-2 bg-lime text-black font-bold text-sm rounded-lg shadow-glow">
                  GPA: {edu.gpa}
                </div>
              )}

              {/* Coursework */}
              <div className="mt-4 pt-4 border-t border-dark-medium">
                <p className="text-xs text-dark-light mb-2">Key Coursework:</p>
                <div className="flex flex-wrap gap-2">
                  {edu.coursework.map((course, i) => (
                    <span
                      key={i}
                      className="text-xs text-dark-light bg-dark-medium px-2 py-1 rounded"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
