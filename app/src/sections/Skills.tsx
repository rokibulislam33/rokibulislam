import { useEffect, useRef, useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Brain, 
  MessageSquare, 
  FileSpreadsheet,
  Search,
  Share2,
  PenTool,
  Lightbulb,
  Users,
  Presentation,
  Target
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.skills-header',
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

      // Skill cards animation
      gsap.fromTo(
        '.skill-card',
        { y: 60, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Trigger skill bar animations when cards are in view
      ScrollTrigger.create({
        trigger: '.skills-grid',
        start: 'top 70%',
        onEnter: () => {
          skillCategories.forEach((category) => {
            category.skills.forEach((skill) => {
              setTimeout(() => {
                setAnimatedSkills((prev) => new Set([...prev, skill.name]));
              }, 500 + Math.random() * 500);
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillCategories = [
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      color: 'from-lime/20 to-lime/5',
      skills: [
        { name: 'SEO & SEM', level: 85 },
        { name: 'Social Media Marketing', level: 90 },
        { name: 'Content Strategy', level: 88 },
        { name: 'Campaign Optimization', level: 82 },
      ],
    },
    {
      icon: BarChart3,
      title: 'Data Analysis',
      color: 'from-blue-500/20 to-blue-500/5',
      skills: [
        { name: 'Microsoft Excel (Advanced)', level: 92 },
        { name: 'Data Visualization', level: 85 },
        { name: 'Statistical Analysis', level: 80 },
        { name: 'Marketing Metrics', level: 88 },
      ],
    },
    {
      icon: Brain,
      title: 'AI & Technology',
      color: 'from-purple-500/20 to-purple-500/5',
      skills: [
        { name: 'AI-Powered Tools', level: 87 },
        { name: 'Prompt Engineering', level: 85 },
        { name: 'Google Analytics', level: 82 },
        { name: 'Automation', level: 78 },
      ],
    },
    {
      icon: MessageSquare,
      title: 'Soft Skills',
      color: 'from-orange-500/20 to-orange-500/5',
      skills: [
        { name: 'Executive Communication', level: 90 },
        { name: 'Strategic Thinking', level: 88 },
        { name: 'Cross-functional Collaboration', level: 85 },
        { name: 'Presentation Delivery', level: 87 },
      ],
    },
  ];

  const tools = [
    { icon: FileSpreadsheet, name: 'Microsoft Excel', category: 'Data' },
    { icon: Search, name: 'Google Analytics', category: 'Analytics' },
    { icon: Share2, name: 'Social Media Tools', category: 'Marketing' },
    { icon: PenTool, name: 'Content Creation', category: 'Creative' },
    { icon: Lightbulb, name: 'AI Tools', category: 'Technology' },
    { icon: Users, name: 'Team Collaboration', category: 'Soft Skills' },
    { icon: Presentation, name: 'Presentation', category: 'Communication' },
    { icon: Target, name: 'Project Management', category: 'Management' },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      
      <div className="container-custom">
        {/* Section Header */}
        <div className="skills-header text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium uppercase tracking-widest mb-4">
            Skills
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Core <span className="text-gradient">Competencies</span>
          </h2>
          <p className="text-dark-light max-w-2xl mx-auto">
            A comprehensive skill set combining marketing expertise, analytical capabilities, 
            and modern technology proficiency.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid md:grid-cols-2 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-card bg-dark-card border border-dark-medium rounded-xl p-6 hover:border-lime/50 transition-all duration-300 card-hover group"
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-br ${category.color} rounded-lg`}>
                  <category.icon className="w-6 h-6 text-lime" />
                </div>
                <h3 className="text-xl font-bold text-white">{category.title}</h3>
              </div>

              {/* Skill Bars */}
              <div className="space-y-4">
                {category.skills.map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-dark-light">{skill.name}</span>
                      <span className="text-sm text-lime font-medium">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-medium rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-lime to-lime-dark rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: animatedSkills.has(skill.name) ? `${skill.level}%` : '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tools & Software */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-2">Tools & Software</h3>
          <p className="text-dark-light">Technologies I work with daily</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-dark-card border border-dark-medium rounded-full hover:border-lime/50 hover:bg-lime/5 transition-all duration-300 group"
            >
              <tool.icon className="w-4 h-4 text-lime group-hover:scale-110 transition-transform" />
              <span className="text-sm text-white">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
