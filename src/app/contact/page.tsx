"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { 
  ArrowRight, 
  Github, 
  Instagram, 
  Linkedin, 
  Mail,
  MessageSquare,
  X
} from "lucide-react";

// Contact form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Custom icons
interface IconProps {
  className?: string;
}

const TelegramIcon: React.FC<IconProps> = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M17.0943 7.14643C17.6874 6.93123 17.9818 6.85378 18.1449 6.82608C18.1461 6.87823 18.1449 6.92051 18.1422 6.94825C17.9096 9.39217 16.8906 15.4048 16.3672 18.2026C16.2447 18.8578 16.1507 19.1697 15.5179 18.798C15.1014 18.5532 14.7245 18.2452 14.3207 17.9805C12.9961 17.1121 11.1 15.8189 11.2557 15.8967C9.95162 15.0373 10.4975 14.5111 11.2255 13.8093C11.3434 13.6957 11.466 13.5775 11.5863 13.4525C11.64 13.3967 11.9027 13.1524 12.2731 12.8081C13.4612 11.7035 15.7571 9.56903 15.8151 9.32202C15.8246 9.2815 15.8334 9.13045 15.7436 9.05068C15.6539 8.97092 15.5215 8.9982 15.4259 9.01989C15.2904 9.05064 13.1326 10.4769 8.95243 13.2986C8.33994 13.7192 7.78517 13.9242 7.28811 13.9134L7.29256 13.9156C6.63781 13.6847 5.9849 13.4859 5.32855 13.286C4.89736 13.1546 4.46469 13.0228 4.02904 12.8812C3.92249 12.8466 3.81853 12.8137 3.72083 12.783C8.24781 10.8109 11.263 9.51243 12.7739 8.884C14.9684 7.97124 16.2701 7.44551 17.0943 7.14643ZM19.5169 5.21806C19.2635 5.01244 18.985 4.91807 18.7915 4.87185C18.5917 4.82412 18.4018 4.80876 18.2578 4.8113C17.7814 4.81969 17.2697 4.95518 16.4121 5.26637C15.5373 5.58382 14.193 6.12763 12.0058 7.03736C10.4638 7.67874 7.39388 9.00115 2.80365 11.001C2.40046 11.1622 2.03086 11.3451 1.73884 11.5619C1.46919 11.7622 1.09173 12.1205 1.02268 12.6714C0.970519 13.0874 1.09182 13.4714 1.33782 13.7738C1.55198 14.037 1.82635 14.1969 2.03529 14.2981C2.34545 14.4483 2.76276 14.5791 3.12952 14.6941C3.70264 14.8737 4.27444 15.0572 4.84879 15.233C6.62691 15.7773 8.09066 16.2253 9.7012 17.2866C10.8825 18.0651 12.041 18.8775 13.2243 19.6531C13.6559 19.936 14.0593 20.2607 14.5049 20.5224C14.9916 20.8084 15.6104 21.0692 16.3636 20.9998C17.5019 20.8951 18.0941 19.8479 18.3331 18.5703C18.8552 15.7796 19.8909 9.68351 20.1332 7.13774C20.1648 6.80544 20.1278 6.433 20.097 6.25318C20.0653 6.068 19.9684 5.58448 19.5169 5.21806Z" />
  </svg>
);

const VKIcon: React.FC<IconProps> = ({ className }) => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" height="1em" width="1em" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M545 117.7c3.7-12.5 0-21.7-17.8-21.7h-58.9c-15 0-21.9 7.9-25.6 16.7 0 0-30 73.1-72.4 120.5-13.7 13.7-20 18.1-27.5 18.1-3.7 0-9.4-4.4-9.4-16.9V117.7c0-15-4.2-21.7-16.6-21.7h-92.6c-9.4 0-15 7-15 13.5 0 14.2 21.2 17.5 23.4 57.5v86.8c0 19-3.4 22.5-10.9 22.5-20 0-68.6-73.4-97.4-157.4-5.8-16.3-11.5-22.9-26.6-22.9H38.8c-16.8 0-20.2 7.9-20.2 16.7 0 15.6 20 93.1 93.1 195.5C160.4 378.1 229 416 291.4 416c37.5 0 42.1-8.4 42.1-22.9 0-66.8-3.4-73.1 15.4-73.1 8.7 0 23.7 4.4 58.7 38.1 40 40 46.6 57.9 69 57.9h58.9c16.8 0 25.3-8.4 20.4-25-11.2-34.9-86.9-106.7-90.3-111.5-8.7-11.2-6.2-16.2 0-26.2.1-.1 72-101.3 79.4-135.6z" />
  </svg>
);

export default function ContactPage() {
  // Contact form setup
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Contact form submission handler
  const onSubmit = async (data: FormData) => {
    console.log(data);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert("Message sent! (demo)");
  };

  return (
    <div className="bg-background">
      {/* Contact Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 overflow-hidden"
          >
            <h1 
              className="text-5xl md:text-6xl xl:text-7xl uppercase font-extrabold tracking-tight text-center"
              style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 800` }}
            >
              <span className="relative z-0 mr-4 md:mr-8 inline-block">
                <span className="absolute -inset-1 bg-accent blur-sm opacity-50" />
                GET
              </span>
              IN TOUCH
            </h1>
            <p className="text-xl text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
              Let's collaborate on your next project. Fill out the form below or reach out through any of the channels listed.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card rounded-xl border p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your name"
                    className={errors.name ? "border-destructive" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Your email address"
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell me about your project or idea"
                    rows={5}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full group"
                >
                  <span>Send Message</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-xl border p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 text-accent p-3 rounded-full">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href="mailto:sabraman@ya.ru" className="font-medium hover:text-accent">sabraman@ya.ru</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 text-accent p-3 rounded-full">
                      <TelegramIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Telegram</p>
                      <a href="https://t.me/sabraman" className="font-medium hover:text-accent">@sabraman</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 text-accent p-3 rounded-full">
                      <VKIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">VK</p>
                      <a href="https://vk.com/sabraman" className="font-medium hover:text-accent">sabraman</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 text-accent p-3 rounded-full">
                      <Github className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <a href="https://github.com/sabraman" className="font-medium hover:text-accent">sabraman</a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-accent/10 text-accent p-3 rounded-full">
                      <Instagram className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <a href="https://instagram.com/sabraman" className="font-medium hover:text-accent">sabraman</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl border p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Location</h3>
                <p className="text-muted-foreground">
                  Saint Petersburg, Russia
                </p>
                <p className="mt-2 text-muted-foreground">
                  Available for remote work worldwide. Open to video meetings at your convenience.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Visual element - abstract background */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background opacity-90" />
        
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`blob-${i}-${Math.random().toString(36).substring(2, 7)}`}
            className="absolute rounded-full bg-accent/5"
            style={{
              width: `${Math.random() * 500 + 200}px`,
              height: `${Math.random() * 500 + 200}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(80px)',
            }}
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
} 