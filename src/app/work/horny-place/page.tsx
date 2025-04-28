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
        className="fixed w-12 h-12 rounded-full bg-accent/30 mix-blend-multiply pointer-events-none z-50 hidden md:block"
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
      <section className="h-screen relative overflow-hidden flex items-center justify-center">
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
                className="absolute bg-accent/10 rounded-full"
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
              className="mb-6 px-4 py-1.5 rounded-full text-accent bg-accent/10 hover:bg-accent/20"
            >
              BRAND CASE STUDY
            </Badge>
            
            <h1 
              className="text-6xl md:text-9xl font-black mb-8 tracking-tighter"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
            >
              <span className="text-accent">HORNY</span> PLACE
            </h1>
            
            <p className="text-xl md:text-3xl text-muted-foreground mb-12 max-w-2xl">
              Creating a bold and distinctive brand identity for a contemporary retail chain
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Badge className="px-4 py-1.5 text-lg bg-accent/10 text-accent hover:bg-accent/20">
                Branding
              </Badge>
              <Badge className="px-4 py-1.5 text-lg bg-accent/10 text-accent hover:bg-accent/20">
                Print Design
              </Badge>
              <Badge className="px-4 py-1.5 text-lg bg-accent/10 text-accent hover:bg-accent/20">
                Web Development
              </Badge>
              <Badge className="px-4 py-1.5 text-lg bg-accent/10 text-accent hover:bg-accent/20">
                Retail Experience
              </Badge>
            </div>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Project Introduction */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 
                className="text-4xl md:text-6xl font-bold mb-8"
                style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
              >
                BRAND IDENTITY WITH PURPOSE
              </h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl md:text-2xl mb-8">
                  HORNY PLACE required a distinctive visual identity that would resonate with its audience while standing out in the competitive retail landscape.
                </p>
                
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  The challenge was to create a brand that felt contemporary and edgy, yet accessible and cohesive across multiple touchpoints - from physical retail environments to digital platforms.
                </p>
                
                <div className="flex flex-col space-y-6 mt-12">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Paintbrush className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Visual Design</h3>
                      <p className="text-muted-foreground">Creating a consistent visual language</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Store className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Retail Experience</h3>
                      <p className="text-muted-foreground">Designing immersive brand environments</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Layout className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Digital Platforms</h3>
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
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-card border shadow-xl">
                {/* Placeholder for brand mood board */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/10 flex items-center justify-center">
                  <h3 
                    className="text-4xl md:text-6xl font-black text-accent/20"
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
            <Badge className="mb-6 px-4 py-1.5 rounded-full bg-accent text-accent-foreground">PROCESS</Badge>
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              DESIGN JOURNEY
            </h2>
            <p className="text-xl text-muted-foreground">
              From initial concept to a comprehensive brand ecosystem spanning physical and digital touchpoints
            </p>
          </motion.div>
          
          <div className="space-y-32 relative">
            {/* Timeline line */}
            <div className="absolute left-[calc(50%-1px)] w-0.5 h-full bg-border hidden md:block" />
            
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
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                  item.position === "right" ? "md:text-right" : ""
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: item.delay }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Timeline indicator dot */}
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-accent hidden md:block" />
                
                <div className={`${item.position === "right" ? "md:order-2" : ""}`}>
                  <div className="bg-card border rounded-xl p-8 shadow-lg">
                    <div className="h-12 w-12 mb-6 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{item.phase}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                
                <div className={`${item.position === "right" ? "md:order-1" : ""}`}>
                  <div className="h-40 md:h-60 rounded-xl bg-primary/5 border flex items-center justify-center">
                    <div className="text-2xl font-bold text-primary/30">Phase {index + 1}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Carousel */}
      <section className="py-20 md:py-32 bg-card relative overflow-hidden border-y">
        {/* Dynamic background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-background to-transparent" />
          
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
      
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              KEY ELEMENTS
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Exploring the different components created for the HORNY PLACE brand
            </p>
          </motion.div>
          
          <div className="flex flex-col space-y-12">
            {/* Navigation tabs */}
            <div className="flex justify-center">
              <div className="inline-flex bg-background border rounded-full p-1.5">
                {caseStudies.map((study, index) => (
                  <button
                    key={study.id}
                    type="button"
                    className={`px-6 py-2.5 text-sm font-medium rounded-full transition-all ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`case-image-${currentView}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-video rounded-xl overflow-hidden shadow-lg"
                >
                  {/* Image placeholder - in a real project use actual images */}
                  <div className="absolute inset-0 bg-accent/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent/40">
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
                  <Badge className="mb-6 px-4 py-1.5 rounded-full text-accent bg-accent/10 hover:bg-accent/20">
                    {caseStudies[currentView]?.title || "Case Study"}
                  </Badge>
                  
                  <h3 
                    className="text-3xl font-bold mb-6"
                    style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 800, 'wdth' 900` }}
                  >
                    {caseStudies[currentView]?.title.toUpperCase() || "CASE STUDY"}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8">
                    {caseStudies[currentView]?.description || "Case study description"}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
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
                      <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
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
            className="max-w-3xl mb-16"
          >
            <Badge className="mb-6 px-4 py-1.5 rounded-full bg-accent text-accent-foreground">RESULTS</Badge>
            <h2 
              className="text-3xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              PROJECT OUTCOMES
            </h2>
            <p className="text-xl text-muted-foreground">
              The impact of the brand identity and implementation across different touchpoints
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="bg-card border rounded-xl p-8 shadow-md"
              >
                <div className="text-4xl font-bold text-accent mb-6">0{index + 1}</div>
                <h3 className="text-2xl font-bold mb-4">{result.title}</h3>
                <p className="text-muted-foreground">{result.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 
              className="text-3xl md:text-5xl font-bold mb-8"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 900, 'wdth' 900` }}
            >
              READY TO CREATE YOUR BRAND?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's work together to develop a distinctive brand identity that resonates with your audience and stands out in the market.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="rounded-full group text-base px-8 py-6 font-medium bg-accent text-accent-foreground hover:bg-accent/90"
                asChild
              >
                <Link href="/contact">
                  <span>START A PROJECT</span>
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