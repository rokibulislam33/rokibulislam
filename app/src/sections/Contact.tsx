import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.contact-header',
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

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Contact cards animation
      gsap.fromTo(
        '.contact-card',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Submit button animation
      gsap.fromTo(
        '.submit-btn',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 50%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'rokibulislam7091@gmail.com',
      href: 'mailto:rokibulislam7091@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '0183-7775101',
      href: 'tel:01837775101',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Dhaka, Bangladesh',
      href: null,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/rokibulislam07',
      href: 'https://linkedin.com/in/rokibulislam07',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
      
      <div className="container-custom">
        {/* Section Header */}
        <div className="contact-header text-center mb-16">
          <span className="inline-block text-lime text-sm font-medium uppercase tracking-widest mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-dark-light max-w-2xl mx-auto">
            Ready to bring value to your organization. Reach out for opportunities, 
            collaborations, or just to say hello.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="contact-info lg:col-span-2 space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="contact-card flex items-center gap-4 p-4 bg-dark-card border border-dark-medium rounded-xl hover:border-lime/50 transition-all duration-300 group"
              >
                <div className="p-3 bg-lime/10 rounded-lg group-hover:bg-lime/20 transition-colors">
                  <info.icon className="w-5 h-5 text-lime" />
                </div>
                <div>
                  <p className="text-xs text-dark-light uppercase tracking-wider">{info.label}</p>
                  {info.href ? (
                    <a
                      href={info.href}
                      target={info.href.startsWith('http') ? '_blank' : undefined}
                      rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white hover:text-lime transition-colors"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-white">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Quick Stats */}
            <div className="p-6 bg-dark-card border border-dark-medium rounded-xl mt-8">
              <h3 className="text-white font-bold mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-lime rounded-full animate-pulse" />
                  <span className="text-dark-light text-sm">Open to full-time opportunities</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-lime rounded-full animate-pulse" />
                  <span className="text-dark-light text-sm">Available for freelance projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-lime rounded-full animate-pulse" />
                  <span className="text-dark-light text-sm">Willing to relocate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-dark-card border border-dark-medium rounded-xl p-6 sm:p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-lime" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-dark-light">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'name' || formData.name
                            ? '-top-2 text-xs text-lime bg-dark-card px-2'
                            : 'top-3 text-dark-light'
                        }`}
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-medium rounded-lg text-white focus:border-lime focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="relative">
                      <label
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'email' || formData.email
                            ? '-top-2 text-xs text-lime bg-dark-card px-2'
                            : 'top-3 text-dark-light'
                        }`}
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 bg-dark-bg border border-dark-medium rounded-lg text-white focus:border-lime focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="relative mb-6">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'subject' || formData.subject
                          ? '-top-2 text-xs text-lime bg-dark-card px-2'
                          : 'top-3 text-dark-light'
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-medium rounded-lg text-white focus:border-lime focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div className="relative mb-6">
                    <label
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === 'message' || formData.message
                          ? '-top-2 text-xs text-lime bg-dark-card px-2'
                          : 'top-3 text-dark-light'
                      }`}
                    >
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className="w-full px-4 py-3 bg-dark-bg border border-dark-medium rounded-lg text-white focus:border-lime focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="submit-btn w-full flex items-center justify-center gap-2 px-6 py-4 bg-lime text-black font-medium rounded-lg hover:bg-lime-dark transition-all duration-300 hover:scale-[1.02] hover:shadow-glow group"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
