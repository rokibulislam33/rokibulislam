import { useEffect, useRef } from 'react';
import { Linkedin, Github, Mail, Heart, ArrowUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Social icons animation
      gsap.fromTo(
        '.social-icon',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Links animation
      gsap.fromTo(
        '.footer-link',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/rokibulislam07', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Mail, href: 'mailto:rokibulislam7091@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black pt-20 pb-8 overflow-hidden"
    >
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div 
          className="w-full h-full animate-gradient-sweep"
          style={{
            background: 'linear-gradient(90deg, transparent, #c0f748, transparent)',
            backgroundSize: '200% 100%',
          }}
        />
      </div>

      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="text-center mb-12">
          {/* Tagline */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Transforming Data into{' '}
            <span className="text-gradient">Strategic Insights</span>
          </h3>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="social-icon w-12 h-12 bg-dark-card border border-dark-medium rounded-full flex items-center justify-center text-white hover:bg-lime hover:text-black hover:border-lime transition-all duration-300 hover:scale-110 hover:shadow-glow"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.href)}
                className="footer-link text-dark-light hover:text-lime transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-lime transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-dark-medium mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-dark-light text-sm">
            <span>© 2026 Rokibul Islam. Made with</span>
            <Heart className="w-4 h-4 text-lime fill-lime" />
            <span>in Dhaka, Bangladesh</span>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-dark-light hover:text-lime transition-colors duration-300 group"
          >
            <span className="text-sm">Back to Top</span>
            <div className="w-8 h-8 bg-dark-card border border-dark-medium rounded-full flex items-center justify-center group-hover:bg-lime group-hover:text-black group-hover:border-lime transition-all duration-300">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
