import { useEffect, useRef } from 'react';
import { Mail, Linkedin, Github, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Particle Network Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 247, 72, 0.5)';
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(192, 247, 72, ${0.2 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Name animation - letter by letter
      if (nameRef.current) {
        const letters = nameRef.current.querySelectorAll('.letter');
        tl.fromTo(
          letters,
          { y: 100, opacity: 0, rotateX: -90 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.06 },
          0.3
        );
      }

      // Title animation
      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 },
        0.8
      );

      // Tagline animation
      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1
      );

      // Buttons animation
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('a');
        tl.fromTo(
          buttons,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
          1.2
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const name = "Rokibul Islam";

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Particle Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Name */}
        <h1
          ref={nameRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 perspective-1000"
          style={{ perspective: '1000px' }}
        >
          {name.split('').map((letter, index) => (
            <span
              key={index}
              className="letter inline-block"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="text-lg sm:text-xl md:text-2xl text-dark-light mb-4 font-light"
        >
          Marketing Professional | Data Analyst | Digital Strategist
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-base sm:text-lg text-lime mb-10 font-medium"
        >
          Transforming Data into Strategic Insights
        </p>

        {/* Contact Buttons */}
        <div ref={buttonsRef} className="flex flex-wrap justify-center gap-4">
          <a
            href="mailto:rokibulislam7091@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-lime text-black font-medium rounded-lg hover:bg-lime-dark transition-all duration-300 hover:scale-105 hover:shadow-glow group"
          >
            <Mail className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            Email Me
          </a>
          <a
            href="https://linkedin.com/in/rokibulislam07"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-dark-medium text-white font-medium rounded-lg hover:border-lime hover:text-lime transition-all duration-300 hover:scale-105 group"
          >
            <Linkedin className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-dark-medium text-white font-medium rounded-lg hover:border-lime hover:text-lime transition-all duration-300 hover:scale-105 group"
          >
            <Github className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            GitHub
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center text-dark-light hover:text-lime transition-colors duration-300"
        >
          <span className="text-xs mb-2 uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
