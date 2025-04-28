"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { 
  ArrowLeft, 
  ExternalLink, 
  MessageSquare, 
  Tablet, 
  Code, 
  Smartphone, 
  Braces,
  LayoutGrid,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function VaparshopPage() {
  // Refs for scroll animations
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const router = useRouter();

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    damping: 50, 
    stiffness: 400 
  });

  // Transform values based on scroll
  const headerOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const headerScale = useTransform(smoothProgress, [0, 0.1], [1, 0.8]);
  const headerY = useTransform(smoothProgress, [0, 0.1], [0, -100]);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Skip rendering until client-side hydration is complete
  if (!isMounted) {
    return null;
  }

  // Project details for the scrolling gallery
  const projects = [
    {
      id: 1,
      title: "VaparWaToTgBot",
      description: "Telegram bot that streamlines WhatsApp-to-Telegram data conversion and automates daily reporting.",
      image: "/work/vaparshop/bot1.jpg",
      tags: ["Telegram API", "Node.js", "Data Automation"]
    },
    {
      id: 2,
      title: "VaparScannerBot",
      description: "Enhances customer interaction by simplifying the use of GetMeBack cards without app installation.",
      image: "/work/vaparshop/bot2.jpg",
      tags: ["Telegram API", "Customer Experience", "GetMeBack Integration"] 
    },
    {
      id: 3,
      title: "Price Tag Generator",
      description: "Custom web application to automate the creation of price tags, boosting operational productivity.",
      image: "/work/vaparshop/price-tag.jpg",
      tags: ["Next.js", "Automation", "UI/UX Design"]
    },
    {
      id: 4,
      title: "Telegram Mini App",
      description: "Advanced mini app with QR scanning capabilities, phone-based searches, and detailed reporting.",
      image: "/work/vaparshop/mini-app.jpg",
      tags: ["Next.js", "Telegram Mini App API", "React", "tRPC"]
    },
  ];

  return (
    <div ref={containerRef} className="bg-background">
      {/* Hero Section with Parallax */}
      <div className="h-screen relative overflow-hidden flex items-center justify-center">
        {/* Background gradient animation */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
        
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div 
              key={`particle-${i}-${Math.random().toString(36).substring(2, 7)}`}
              className="absolute rounded-full bg-primary/10"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(50px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
        
        {/* Header Content */}
        <motion.div
          ref={headerRef}
          className="container relative z-10 px-4 flex flex-col items-center text-center"
          style={{ 
            opacity: headerOpacity,
            scale: headerScale,
            y: headerY
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm rounded-full">CASE STUDY</Badge>
            
            <h1 
              className="text-5xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
            >
              VAPARSHOP
            </h1>
            
            <p className="text-xl md:text-3xl max-w-2xl mb-12 text-muted-foreground">
              Designing and developing digital tools to revolutionize retail operations
            </p>
            
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <Badge className="px-3 py-1.5 text-base bg-accent text-accent-foreground">Telegram Bots</Badge>
              <Badge className="px-3 py-1.5 text-base bg-primary/20 text-primary">Web Applications</Badge>
              <Badge className="px-3 py-1.5 text-base bg-primary/20 text-primary">Automation</Badge>
              <Badge className="px-3 py-1.5 text-base bg-primary/20 text-primary">UI/UX Design</Badge>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Overview Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <motion.div 
              className="lg:col-span-5 lg:sticky top-20 self-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
              >
                PROJECT OVERVIEW
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">TIMELINE</h3>
                  <p className="text-2xl">June 2024 - Present</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">ROLE</h3>
                  <p className="text-2xl">Designer & Junior Developer</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-medium text-muted-foreground mb-2">DELIVERABLES</h3>
                  <ul className="space-y-2 text-xl">
                    <li className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      <span>Telegram Bots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <LayoutGrid className="h-5 w-5 text-accent" />
                      <span>Web Applications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-accent" />
                      <span>Telegram Mini App</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Braces className="h-5 w-5 text-accent" />
                      <span>Custom API Integrations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl md:text-2xl leading-relaxed mb-8">
                  VAPARSHOP needed to optimize internal operations and enhance customer engagement across multiple retail locations. The challenge was to create digital tools that would streamline workflows, improve data management, and provide a better experience for both staff and customers.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">The Challenge</h3>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  The retail chain was struggling with manual processes that consumed valuable time and resources. Store managers needed a way to efficiently generate price tags, process customer loyalty cards, and automate daily reporting from across multiple communication channels.
                </p>
                
                <h3 className="text-2xl font-bold mb-4">The Approach</h3>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  I designed and developed a suite of digital tools that addressed specific operational challenges:
                </p>
                
                <ul className="space-y-6 mb-8">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Telegram Bots</h4>
                      <p className="text-muted-foreground">Automated data conversion and reporting between WhatsApp and Telegram, reducing manual work and improving accuracy.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                      <Code className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Web Applications</h4>
                      <p className="text-muted-foreground">Created a Price Tag Generator to automate the creation of standardized price displays across all stores.</p>
                    </div>
                  </li>
                  
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 h-10 w-10 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                      <Tablet className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold">Telegram Mini App</h4>
                      <p className="text-muted-foreground">Developed a comprehensive application integrating with GetMeBack API for loyalty card management and advanced reporting.</p>
                    </div>
                  </li>
                </ul>
                
                <h3 className="text-2xl font-bold mb-4">The Results</h3>
                <p className="text-lg md:text-xl text-muted-foreground">
                  The implementation of these tools significantly improved operational efficiency, reducing manual work hours by approximately 70% and increasing customer satisfaction through faster service and enhanced loyalty management.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Technologies Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
            >
              TECHNOLOGIES USED
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced, modern stacks were employed to ensure performance, scalability, and maintainability
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Next.js", icon: "/icons/nextjs.svg", delay: 0 },
              { name: "React", icon: "/icons/react.svg", delay: 0.1 },
              { name: "TypeScript", icon: "/icons/typescript.svg", delay: 0.2 },
              { name: "tRPC", icon: "/icons/trpc.svg", delay: 0.3 },
              { name: "Telegram API", icon: "/icons/telegram.svg", delay: 0.4 },
              { name: "Node.js", icon: "/icons/nodejs.svg", delay: 0.5 },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: tech.delay }}
                viewport={{ once: true }}
                className="flex flex-col items-center bg-card p-6 rounded-lg border shadow-sm"
              >
                <div className="h-20 w-20 flex items-center justify-center mb-4">
                  {/* Placeholder for technology icons */}
                  <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold">{tech.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-medium">{tech.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Project Gallery */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
            >
              PROJECT SHOWCASE
            </h2>
            <p className="text-xl text-muted-foreground">
              Explore the key components developed for VAPARSHOP
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-xl overflow-hidden group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="aspect-video relative bg-primary/20 overflow-hidden">
                  {/* Image placeholder - in a real project, use actual project images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-card">
                    <div className="text-4xl font-bold text-primary/40">{project.title}</div>
                  </div>
                  
                  {/* Hover overlay */}
                  <motion.div 
                    className="absolute inset-0 bg-accent/80 flex items-center justify-center p-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center text-accent-foreground">
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {project.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="bg-white/20 text-white">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Process Section with Horizontal Scroll (simplified for this example) */}
      <section className="py-20 bg-card border-y">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
            >
              DEVELOPMENT PROCESS
            </h2>
            <p className="text-xl text-muted-foreground">
              A methodical approach from concept to deployment
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { 
                phase: "Research & Analysis", 
                description: "Understanding business needs and user requirements through stakeholder interviews and workflow analysis.", 
                delay: 0 
              },
              { 
                phase: "Design & Prototyping", 
                description: "Creating intuitive interfaces and interaction patterns, validated through user testing.", 
                delay: 0.1 
              },
              { 
                phase: "Development", 
                description: "Building robust solutions using Next.js, React, and Telegram API with a focus on performance.", 
                delay: 0.2 
              },
              { 
                phase: "Deployment & Feedback", 
                description: "Implementing solutions with continuous improvement based on real-world usage and feedback.", 
                delay: 0.3 
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: phase.delay }}
                viewport={{ once: true }}
                className="bg-background p-8 rounded-xl border"
              >
                <div className="text-4xl font-bold text-accent/30 mb-4">0{index + 1}</div>
                <h3 className="text-xl font-bold mb-4">{phase.phase}</h3>
                <p className="text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-8"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
            >
              INTERESTED IN WORKING TOGETHER?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's create digital solutions that transform your business operations and enhance customer experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="rounded-full group text-base px-8 py-6 font-medium"
                asChild
              >
                <Link href="/contact">
                  <span>GET IN TOUCH</span>
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-[-4px] group-hover:translate-x-[4px]" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full group text-base px-8 py-6 font-medium"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  <span>BACK TO HOME</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 