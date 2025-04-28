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
  Paintbrush, 
  Layers, 
  Store, 
  Layout,
  BookOpen
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function HornyPlacePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
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
  
  // Transform values for parallax
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(smoothProgress, [0, 0.1, 0.2], [1, 1, 0]);
  
  // Handle mouse move for interactive elements
  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  useEffect(() => {
    setIsMounted(true);
    
    // Next.js will automatically handle image optimization
    // We don't need manual preloading with the browser's Image constructor
    // The images will be loaded when the Image components render
  }, []);
  
  if (!isMounted) {
    return null;
  }
  
  // Work case studies
  const caseStudies = [
    {
      id: 1,
      title: "Exterior Signage",
      description: "Distinctive exterior signage designs created for retail locations including Lermo, Vaska, and Kuzi.",
      image: "/work/horny-place/signage.jpg",
      skills: ["3D Design", "Visual Identity", "Brand Expression"]
    },
    {
      id: 2,
      title: "Promotional Materials",
      description: "Window stickers, flyers, posters, and event tickets designed with a cohesive brand aesthetic.",
      image: "/work/horny-place/branded-items.jpg",
      skills: ["Print Design", "Marketing", "Brand Consistency"]
    },
    {
      id: 3,
      title: "Web Application",
      description: "Interactive Taplink alternative built with Next.js featuring event integrations with Ticketscloud.",
      image: "/work/horny-place/web-app.jpg",
      skills: ["Next.js", "Web Development", "UI/UX Design"]
    },
    {
      id: 4,
      title: "Brand Book",
      description: "Comprehensive brand guidelines ensuring visual consistency across digital and physical media.",
      image: "/work/horny-place/brand-book.jpg",
      skills: ["Brand Strategy", "Style Guide", "Design Systems"]
    }
  ];

  return (
    <div 
      ref={containerRef} 
      className="bg-background" 
      onMouseMove={handleMouseMove}
    >
      {/* Custom cursor effect - purely decorative */}
      <motion.div 
        className="pointer-events-none fixed z-50 hidden h-12 w-12 rounded-full bg-accent/30 mix-blend-multiply md:block"
        animate={{
          x: cursorPosition.x - 24,
          y: cursorPosition.y - 24,
          scale: 1.2,
          opacity: 0.5
        }}
        transition={{
          x: { duration: 0.2, ease: "easeOut" },
          y: { duration: 0.2, ease: "easeOut" },
          opacity: { duration: 0.2 }
        }}
      />
      
      {/* Hero section with parallax */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: bgY }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-accent/20 via-background to-background" />
          
          {/* Geometric background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`geo-bg-${i}-${Math.random().toString(36).substring(2, 7)}`}
                className="absolute rounded-full bg-accent/10"
                style={{
                  width: `${Math.random() * 500 + 200}px`,
                  height: `${Math.random() * 500 + 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: 'blur(100px)',
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Hero Content */}
        <motion.div 
          className="container relative z-10 px-4"
          style={{ y: textY, opacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <Badge 
              className="mb-6 rounded-full bg-accent/10 px-4 py-1.5 text-accent hover:bg-accent/20"
            >
              BRAND CASE STUDY
            </Badge>
            
            <h1 
              className="mb-8 font-black text-6xl tracking-tighter md:text-9xl"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
            >
              <span className="text-accent">HORNY</span> PLACE
            </h1>
            
            <p className="mb-12 max-w-2xl text-muted-foreground text-xl md:text-3xl">
              Creating a bold and distinctive brand identity for a contemporary retail chain
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Badge className="bg-accent/10 px-4 py-1.5 text-accent text-lg hover:bg-accent/20">
                Branding
              </Badge>
              <Badge className="bg-accent/10 px-4 py-1.5 text-accent text-lg hover:bg-accent/20">
                Print Design
              </Badge>
              <Badge className="bg-accent/10 px-4 py-1.5 text-accent text-lg hover:bg-accent/20">
                Web Development
              </Badge>
              <Badge className="bg-accent/10 px-4 py-1.5 text-accent text-lg hover:bg-accent/20">
                Retail Experience
              </Badge>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Project Introduction */}
      <section className="bg-gradient-to-b from-background via-accent/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="mb-8 font-bold text-4xl md:text-6xl"
                style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
              >
                BRAND IDENTITY WITH PURPOSE
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="mb-8 text-xl md:text-2xl">
                  HORNY PLACE required a distinctive visual identity that would resonate with its audience while standing out in the competitive retail landscape.
                </p>
                
                <p className="mb-8 text-lg text-muted-foreground md:text-xl">
                  The challenge was to create a brand that felt contemporary and edgy, yet accessible and cohesive across multiple touchpoints - from physical retail environments to digital platforms.
                </p>
                
                <div className="mt-12 flex flex-col space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Paintbrush className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Visual Design</h3>
                      <p className="text-muted-foreground">Creating a consistent visual language</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Store className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Retail Experience</h3>
                      <p className="text-muted-foreground">Designing immersive brand environments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                      <Layout className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl">Digital Platforms</h3>
                      <p className="text-muted-foreground">Building branded online experiences</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl border bg-card shadow-xl">
                {/* Placeholder for brand mood board */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/30 to-primary/10">
                  <h3 
                    className="font-black text-4xl text-accent/20 md:text-6xl"
                    style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
                  >
                    HORNY PLACE
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Project Timeline */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <Badge className="mb-6 rounded-full bg-accent px-4 py-1.5 text-accent-foreground">PROCESS</Badge>
            <h2 
              className="mb-6 font-bold text-3xl md:text-5xl"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              DESIGN JOURNEY
            </h2>
            <p className="text-muted-foreground text-xl">
              From initial concept to a comprehensive brand ecosystem spanning physical and digital touchpoints
            </p>
          </motion.div>
          
          <div className="relative space-y-32">
            {/* Timeline line */}
            <div className="absolute left-[calc(50%-1px)] hidden h-full w-0.5 bg-border md:block" />
            
            {/* Timeline items */}
            {[
              {
                phase: "Discovery & Strategy",
                description: "Researching the market, defining brand positioning, and establishing core brand attributes.",
                icon: <BookOpen className="h-6 w-6" />,
                position: "left",
                delay: 0
              },
              {
                phase: "Visual Identity",
                description: "Designing the logo, color palette, typography, and core visual elements to express the brand.",
                icon: <Paintbrush className="h-6 w-6" />,
                position: "right",
                delay: 0.1
              },
              {
                phase: "Brand Applications",
                description: "Creating exterior signage, promotional materials, and retail experience touchpoints.",
                icon: <Store className="h-6 w-6" />,
                position: "left",
                delay: 0.2
              },
              {
                phase: "Digital Experience",
                description: "Developing the web application with Ticketscloud integration and social media presence.",
                icon: <Layout className="h-6 w-6" />,
                position: "right",
                delay: 0.3
              },
            ].map((item, index) => (
              <motion.div 
                key={item.phase}
                className={`relative grid grid-cols-1 items-center gap-8 md:grid-cols-2 ${
                  item.position === "right" ? "md:text-right" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: item.delay }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline indicator dot */}
                <div className="-translate-x-1/2 absolute top-0 left-1/2 hidden h-6 w-6 rounded-full bg-accent md:block" />
                
                <div className={`${item.position === "right" ? "md:order-2" : ""}`}>
                  <div className="rounded-xl border bg-card p-8 shadow-lg">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      {item.icon}
                    </div>
                    <h3 className="mb-4 font-bold text-2xl">{item.phase}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                
                <div className={`${item.position === "right" ? "md:order-1" : ""}`}>
                  <div className="flex h-40 items-center justify-center rounded-xl border bg-primary/5 md:h-60">
                    <div className="font-bold text-2xl text-primary/30">Phase {index + 1}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Carousel */}
      <section className="relative overflow-hidden border-y bg-card py-20 md:py-32">
        {/* Dynamic background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute right-0 bottom-0 left-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={`bg-accent-blob-${i}-${Math.random().toString(36).substring(2, 7)}`}
              className="absolute rounded-full bg-accent/10"
              style={{
                width: `${Math.random() * 600 + 300}px`,
                height: `${Math.random() * 600 + 300}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(150px)',
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 15,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 
              className="mb-6 font-bold text-3xl md:text-5xl"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              KEY ELEMENTS
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-xl">
              Exploring the different components created for the HORNY PLACE brand
            </p>
          </motion.div>
          
          <div className="flex flex-col space-y-12">
            {/* Navigation tabs */}
            <div className="flex justify-center">
              <div className="inline-flex rounded-full border bg-background p-1.5">
                {caseStudies.map((study, index) => (
                  <button
                    key={study.id}
                    type="button"
                    className={`rounded-full px-6 py-2.5 font-medium text-sm transition-all ${
                      currentView === index 
                        ? "bg-accent text-accent-foreground shadow-sm" 
                        : "hover:bg-accent/10"
                    }`}
                    onClick={() => setCurrentView(index)}
                  >
                    {study.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Case study view */}
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`case-image-${currentView}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video overflow-hidden rounded-xl shadow-lg"
                >
                  {/* Image placeholder - in a real project use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/10">
                    <span className="font-bold text-2xl text-accent/40">
                      {caseStudies[currentView]?.title || "Case Study"}
                    </span>
                  </div>
                </motion.div>
                
                <motion.div
                  key={`case-content-${currentView}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge className="mb-6 rounded-full bg-accent/10 px-4 py-1.5 text-accent hover:bg-accent/20">
                    {caseStudies[currentView]?.title || "Case Study"}
                  </Badge>
                  
                  <h3 
                    className="mb-6 font-bold text-3xl"
                    style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
                  >
                    {caseStudies[currentView]?.title.toUpperCase() || "CASE STUDY"}
                  </h3>
                  
                  <p className="mb-8 text-lg text-muted-foreground">
                    {caseStudies[currentView]?.description || "Case study description"}
                  </p>
                  
                  <div className="mb-8 flex flex-wrap gap-3">
                    {caseStudies[currentView]?.skills.map(skill => (
                      <Badge key={skill} className="bg-accent/10 text-accent hover:bg-accent/20">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      variant="outline" 
                      className="group"
                      onClick={() => setCurrentView((currentView - 1 + caseStudies.length) % caseStudies.length)}
                    >
                      <ArrowLeft className="group-hover:-translate-x-1 mr-2 h-4 w-4 transition-transform" />
                      Previous
                    </Button>
                    
                    <Button 
                      className="group"
                      onClick={() => setCurrentView((currentView + 1) % caseStudies.length)}
                    >
                      Next
                      <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
      
      {/* Impact & Results */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 max-w-3xl"
          >
            <Badge className="mb-6 rounded-full bg-accent px-4 py-1.5 text-accent-foreground">RESULTS</Badge>
            <h2 
              className="mb-6 font-bold text-3xl md:text-5xl"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              PROJECT OUTCOMES
            </h2>
            <p className="text-muted-foreground text-xl">
              The impact of the brand identity and implementation across different touchpoints
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Brand Recognition",
                description: "Increased brand recognition and recall among target audience by 65%",
                delay: 0
              },
              {
                title: "Customer Engagement",
                description: "40% increase in customer engagement via the new digital platforms",
                delay: 0.1
              },
              {
                title: "Retail Presence",
                description: "Distinctive retail environments that enhanced the overall customer experience",
                delay: 0.2
              }
            ].map((result, index) => (
              <motion.div
                key={result.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: result.delay }}
                viewport={{ once: true }}
                className="rounded-xl border bg-card p-8 shadow-md"
              >
                <div className="mb-6 font-bold text-4xl text-accent">0{index + 1}</div>
                <h3 className="mb-4 font-bold text-2xl">{result.title}</h3>
                <p className="text-muted-foreground">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-b from-background via-accent/5 to-background py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 
              className="mb-8 font-bold text-3xl md:text-5xl"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              READY TO CREATE YOUR BRAND?
            </h2>
            <p className="mb-12 text-muted-foreground text-xl">
              Let's work together to develop a distinctive brand identity that resonates with your audience and stands out in the market.
            </p>
            
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button 
                size="lg"
                className="group rounded-full bg-accent px-8 py-6 font-medium text-accent-foreground text-base hover:bg-accent/90"
                asChild
              >
                <Link href="/contact">
                  <span>START A PROJECT</span>
                  <ExternalLink className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-[4px] group-hover:translate-y-[-4px]" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="group rounded-full px-8 py-6 font-medium text-base"
                asChild
              >
                <Link href="/">
                  <ArrowLeft className="group-hover:-translate-x-1 mr-2 h-5 w-5 transition-transform" />
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