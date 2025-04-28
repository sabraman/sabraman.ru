"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { 
	ArrowUpRight, 
	ArrowRight, 
	Download, 
	ExternalLink,
	Code,
	Paintbrush,
	LineChart,
	MessageSquare,
	Github,
	Linkedin,
	Instagram,
	X,
	Mail,
	UserCircle2
} from "lucide-react";

// Contact form validation schema
const formSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Please enter a valid email"),
	message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

// Work Experience Item Component with staggered animations
function WorkExperienceItem({ 
	company, 
	title, 
	period, 
	location, 
	logo, 
	achievements,
	delay
}: { 
	company: string; 
	title: string; 
	period: string; 
	location: string; 
	logo: string;
	achievements: string[];
	delay: number;
}) {
	return (
		<motion.div 
			initial={{ opacity: 0, y: 100 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
			viewport={{ once: true }}
			className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12"
		>
			<div className="relative lg:col-span-4">
				<div className="sticky top-32">
					<div className="mb-6 flex items-center gap-6">
						<div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-primary font-extrabold text-2xl text-primary-foreground md:h-24 md:w-24 md:text-4xl">
							{logo}
						</div>
						<div>
							<h3 className="font-extrabold text-3xl md:text-4xl">{company}</h3>
							<p className="text-muted-foreground text-xl">{period}</p>
						</div>
					</div>
					<div>
						<h4 className="mb-2 font-bold text-2xl">{title}</h4>
						<p className="text-muted-foreground text-xl">{location}</p>
					</div>
				</div>
			</div>
			
			<div className="lg:col-span-8">
				<ul className="space-y-6">
					{achievements.map((achievement, index) => {
						const uniqueKey = `${company}-achievement-${index}-${achievement.substring(0, 10).replace(/\s+/g, '')}`;
						
						// Check if achievement has bold text (marked with ** **)
						if (achievement.includes('**')) {
							return (
								<motion.li 
									key={uniqueKey}
									initial={{ opacity: 0, x: 50 }}
									whileInView={{ opacity: 1, x: 0 }}
									transition={{ 
										duration: 0.5, 
										ease: [0.22, 1, 0.36, 1], 
										delay: 0.1 * index 
									}}
									viewport={{ once: true }}
									className="relative pl-6 text-xl leading-relaxed before:absolute before:top-[14px] before:left-0 before:h-3 before:w-3 before:rounded-full before:bg-accent before:content-[''] md:text-2xl"
								>
									{achievement.split(/\*\*(.*?)\*\*/g).map((part, i) => {
										// Even indices are regular text, odd indices are bold text
										return i % 2 === 0 ? (
											<span key={`regular-${i}-${part.substring(0, 5)}`}>{part}</span>
										) : (
											<strong key={`bold-${i}-${part.substring(0, 5)}`} className="text-accent">{part}</strong>
										);
									})}
								</motion.li>
							);
						}

						return (
							<motion.li 
								key={uniqueKey}
								initial={{ opacity: 0, x: 50 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ 
									duration: 0.5, 
									ease: [0.22, 1, 0.36, 1], 
									delay: 0.1 * index 
								}}
								viewport={{ once: true }}
								className="relative pl-6 text-xl leading-relaxed before:absolute before:top-[14px] before:left-0 before:h-3 before:w-3 before:rounded-full before:bg-accent before:content-[''] md:text-2xl"
							>
								{achievement}
							</motion.li>
						);
					})}
				</ul>
			</div>
		</motion.div>
	);
}

// Project card component
function ProjectCard({ title, description, tags, href }: { title: string; description: string; tags: string[]; href: string }) {
	return (
		<Card className="group overflow-hidden">
			<Link href={href} className="block p-6">
				<div className="flex h-full flex-col">
					<h3 
						className="mb-3 text-2xl transition-colors duration-300 group-hover:text-accent"
						style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 700, 'wdth' 900` }}
					>
						{title}
						<span className="group-hover:-translate-y-1 ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
							<ArrowUpRight className="inline h-5 w-5" />
						</span>
					</h3>
					
					<p className="mb-6 text-muted-foreground">{description}</p>
					
					<div className="mt-auto flex flex-wrap gap-2">
						{tags.map(tag => (
							<Badge key={tag} variant="secondary" className="rounded-full px-3 py-1">
								{tag}
							</Badge>
						))}
					</div>
				</div>
			</Link>
		</Card>
	);
}

// Add the custom icons after imports
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

export default function HomePage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);
	
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
	
	// Contact info
	const contactInfo = [
		{
			id: "email",
			icon: <Mail className="h-5 w-5" />,
			title: "Email",
			value: "sabraman@ya.ru",
			link: "mailto:sabraman@ya.ru",
		},
		{
			id: "telegram",
			icon: <MessageSquare className="h-5 w-5" />,
			title: "Telegram",
			value: "@sabraman",
			link: "https://t.me/sabraman",
		},
		{
			id: "github",
			icon: <Github className="h-5 w-5" />,
			title: "GitHub",
			value: "sabraman",
			link: "https://github.com/sabraman",
		},
		{
			id: "linkedin",
			icon: <Linkedin className="h-5 w-5" />,
			title: "LinkedIn",
			value: "Danya Yudin",
			link: "https://linkedin.com/in/sabra-man",
		},
	];
	
	// Setup scroll animations
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"]
	});
	
	const textScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.5]);
	const textOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.15], [1, 0, 0]);
	const textY = useTransform(scrollYProgress, [0, 0.1], ["0%", "-50%"]);
	
	// Random letter animation setup
	const originalName = "DANYA YUDIN";
	const [displayName, setDisplayName] = useState(originalName);
	
	useEffect(() => {
		setIsMounted(true);
		
		// Function to randomize a single character
		const randomChar = () => {
			const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			return chars.charAt(Math.floor(Math.random() * chars.length));
		};
		
		// Function to create a scrambled version of the name
		const scrambleName = (progress: number) => {
			const targetLength = originalName.length;
			let result = "";
			
			for (let i = 0; i < targetLength; i++) {
				if (i < progress * targetLength) {
					result += originalName[i];
				} else if (originalName[i] === " ") {
					result += " ";
				} else {
					result += randomChar();
				}
			}
			
			return result;
		};
		
		// Animation loop for name scrambling
		let frame = 0;
		let progress = 0;
		const totalFrames = 20;
		
		const animate = () => {
			if (progress < 1) {
				frame++;
				progress = frame / totalFrames;
				setDisplayName(scrambleName(progress));
				requestAnimationFrame(animate);
			}
		};
		
		const timeout = setTimeout(() => {
			animate();
		}, 500);
		
		return () => clearTimeout(timeout);
	}, []);
	
	if (!isMounted) {
		return null;
	}

	return (
		<div ref={containerRef} className="relative">
			{/* Hero Section with name animation */}
			<section className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
				<motion.div 
					className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center"
					style={{ 
						scale: textScale,
						opacity: textOpacity,
						y: textY,
					}}
				>
					<div className="max-w-7xl px-4">
						<motion.div
							initial={{ opacity: 0, y: 100 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								duration: 0.8, 
								ease: [0.22, 1, 0.36, 1],
								delay: 0.2
							}}
						>
							<h1 
								className="mb-8 font-extrabold text-[8vw] leading-none tracking-tight md:text-[6vw] lg:text-[5vw] xl:text-[4vw]"
								style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
							>
								{displayName}
							</h1>
						</motion.div>
						
						<motion.h2
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								duration: 0.8, 
								ease: [0.22, 1, 0.36, 1],
								delay: 0.4
							}}
							className="mb-10 text-[5vw] text-muted-foreground leading-tight md:text-[4vw] lg:text-[3vw] xl:text-[2.5vw]"
						>
							CREATIVE DESIGNER &<br/>
							<span className="bg-gradient-to-r from-accent to-sky-300 bg-clip-text text-transparent">
								EARLY-STAGE DEVELOPER
							</span>
						</motion.h2>
						
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ 
								duration: 0.6, 
								ease: [0.22, 1, 0.36, 1],
								delay: 0.7
							}}
							className="flex flex-col justify-center gap-4 md:flex-row"
						>
							<Button 
								size="lg"
								className="group rounded-full px-8 py-6 font-medium text-base"
								asChild
							>
								<a href="/DANYA_YUDIN_CV.md" download>
									<span>DOWNLOAD RESUME</span>
									<Download className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-1" />
								</a>
						</Button>
							
							<Button 
								variant="outline" 
								size="lg"
								className="group cursor-pointer rounded-full px-8 py-6 font-medium text-base"
								onClick={() => {
									// Scroll to contact section
									const contactSection = document.getElementById('contact-section');
									if (contactSection) {
										contactSection.scrollIntoView({ behavior: 'smooth' });
									}
								}}
							>
								<span>GET IN TOUCH</span>
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
						</Button>
						</motion.div>
					</div>
				</motion.div>
				
				<motion.div 
					className="absolute inset-0 z-0 flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 1 }}
				>
					<div 
						className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-95"
					/>
					
					<motion.div 
						className="absolute h-[150vh] w-[150vw]" 
						animate={{ 
							rotate: 360,
						}} 
						transition={{ 
							duration: 180, 
							ease: "linear", 
							repeat: Number.POSITIVE_INFINITY 
						}}
					>
						{/* Abstract background pattern */}
						<div className="absolute h-full w-full rounded-full border-[1px] border-foreground/5" style={{ top: "10%", left: "10%" }} />
						<div className="absolute h-[90%] w-[90%] rounded-full border-[1px] border-foreground/5" style={{ top: "5%", left: "5%" }} />
						<div className="absolute h-[80%] w-[80%] rounded-full border-[1px] border-foreground/10" style={{ top: "10%", left: "10%" }} />
						<div className="absolute h-[70%] w-[70%] rounded-full border-[1px] border-foreground/10" style={{ top: "15%", left: "15%" }} />
						<div className="absolute h-[60%] w-[60%] rounded-full border-[1px] border-foreground/15" style={{ top: "20%", left: "20%" }} />
						<div className="absolute h-[50%] w-[50%] rounded-full border-[1px] border-foreground/15" style={{ top: "25%", left: "25%" }} />
						<div className="absolute h-[40%] w-[40%] rounded-full border-[1px] border-foreground/20" style={{ top: "30%", left: "30%" }} />
						<div className="absolute h-[30%] w-[30%] rounded-full border-[1px] border-primary/50" style={{ top: "35%", left: "35%" }} />
						<div className="absolute h-[20%] w-[20%] rounded-full border-[1px] border-primary" style={{ top: "40%", left: "40%" }} />
						<div className="absolute h-[10%] w-[10%] rounded-full border-[1px] border-accent" style={{ top: "45%", left: "45%" }} />
					</motion.div>
				</motion.div>
			</section>

			{/* About Section with glitch effect */}
			<section className="relative min-h-screen bg-secondary/5 py-32" id="about">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-20 overflow-hidden"
					>
						<h2 
							className="font-extrabold text-7xl uppercase tracking-tight md:text-7xl xl:text-[12rem]"
							style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
						>
							WHO<span className="relative z-0 ml-4 inline-block md:ml-8 xl:ml-12">
								<span className="-inset-1 absolute bg-accent opacity-50 blur-sm" />
								I AM
							</span>
						</h2>
					</motion.div>
					
					<div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
						<motion.div 
							className="lg:col-span-2"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
							viewport={{ once: true }}
						>
							<div className="prose prose-xl dark:prose-invert max-w-none">
								<p className="mb-8 text-2xl leading-relaxed lg:text-3xl">
									Creative Designer and Early-Stage Developer with extensive hands-on experience in visual design, branding, and application development.
								</p>
								
								<p className="text-muted-foreground text-xl leading-relaxed lg:text-2xl">
									I have a proven track record of transforming concepts into visually appealing and functional digital products. My passion lies in integrating design and technology to deliver intuitive user experiences.
								</p>
								
								<div className="mt-12 flex flex-wrap gap-6">
									<div className="flex items-center gap-2">
										<TelegramIcon className="h-6 w-6 text-primary" />
										<Link href="https://t.me/sabraman" className="text-xl transition-colors hover:text-accent">@sabraman</Link>
									</div>
									
									<div className="flex items-center gap-2">
										<Github className="h-6 w-6 text-primary" />
										<Link href="https://github.com/sabraman" className="text-xl transition-colors hover:text-accent">sabraman</Link>
									</div>
									
									<div className="flex items-center gap-2">
										<Instagram className="h-6 w-6 text-primary" />
										<Link href="https://instagram.com/sabraman" className="text-xl transition-colors hover:text-accent">sabraman</Link>
									</div>
									
									<div className="flex items-center gap-2">
										<X className="h-6 w-6 text-primary" />
										<Link href="https://x.com/1sabraman" className="text-xl transition-colors hover:text-accent">1sabraman</Link>
									</div>
								</div>
							</div>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
							viewport={{ once: true }}
							className="flex flex-col gap-8"
						>
							<div className="rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
								<h3 className="mb-4 font-bold text-2xl">EXPERTISE AREAS</h3>
								<ul className="space-y-4">
									<li className="flex items-start gap-3">
										<Paintbrush className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
										<div>
											<h4 className="font-semibold text-xl">Visual Design</h4>
											<p className="text-muted-foreground">Creating engaging visual experiences across different mediums</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<Code className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
										<div>
											<h4 className="font-semibold text-xl">Application Development</h4>
											<p className="text-muted-foreground">Building functional web apps and Telegram bots</p>
										</div>
									</li>
									<li className="flex items-start gap-3">
										<LineChart className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
										<div>
											<h4 className="font-semibold text-xl">Branding</h4>
											<p className="text-muted-foreground">Crafting comprehensive brand identities and guidelines</p>
										</div>
									</li>
								</ul>
							</div>
							
							<div className="rounded-xl border bg-card p-6 shadow-lg backdrop-blur-sm">
								<h3 className="mb-4 font-bold text-2xl">TECH STACK</h3>
								<div className="flex flex-wrap gap-2">
									<Badge className="rounded-md bg-accent/10 px-4 py-2 text-accent text-base hover:bg-accent/20">Next.js</Badge>
									<Badge className="rounded-md bg-accent/10 px-4 py-2 text-accent text-base hover:bg-accent/20">React</Badge>
									<Badge className="rounded-md bg-accent/10 px-4 py-2 text-accent text-base hover:bg-accent/20">TypeScript</Badge>
									<Badge className="rounded-md bg-accent/10 px-4 py-2 text-accent text-base hover:bg-accent/20">Telegram API</Badge>
									<Badge className="rounded-md bg-accent/10 px-4 py-2 text-accent text-base hover:bg-accent/20">Figma</Badge>
									<Badge className="rounded-md bg-accent/10 px-4 py-2 text-accent text-base hover:bg-accent/20">UI/UX</Badge>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Experience Section - Dynamic, Staggered */}
			<section className="relative min-h-screen py-32" id="experience">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-20 overflow-hidden"
					>
						<h2 
							className="font-extrabold text-4xl uppercase tracking-tight md:text-7xl xl:text-[9rem]"
							style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 1000` }}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
								<span className="-inset-1 absolute bg-sky-400 opacity-50 blur-sm" />
								WORK
							</span>
							EXPERIENCE
						</h2>
					</motion.div>
					
					<div className="space-y-40">
						{/* VAPARSHOP */}
						<WorkExperienceItem 
							company="VAPARSHOP"
							title="Designer & Junior Developer"
							period="June 2024 – Present"
							location="Saint Petersburg"
							logo="V"
							delay={0}
							achievements={[
								"Developed Telegram bots significantly improving internal operational efficiency",
								"Designed and developed a custom Price Tag Generator web application to automate manual tasks",
								"Created branded Telegram Emoji Pack to enhance brand recognition",
								"Redesigned corporate presentations, reinforcing the unique visual identity",
								"Developed a Taplink alternative using Next.js, including blogs, location points, and interactive widgets",
								"Building a Telegram Mini App integrated with GetMeBack API"
							]}
						/>
						
						{/* HORNY PLACE */}
						<WorkExperienceItem 
							company="HORNY PLACE"
							title="Visual Designer & Developer"
							period="October 2022 – May 2024"
							location="Saint Petersburg"
							logo="H"
							delay={0.2}
							achievements={[
								"Created various exterior signage designs for retail locations",
								"Developed promotional materials, including window stickers, flyers, posters",
								"Revamped visual branding elements, including QR-codes and YouTube thumbnails",
								"Built a stylish and interactive Taplink alternative using Next.js",
								"Authored a comprehensive brand book to ensure visual consistency",
								"Designed clothing items, including \"Languages\" hoodie for Horny Vape"
							]}
						/>
						
						{/* ELYSIUM */}
						<WorkExperienceItem 
							company="ELYSIUM"
							title="Visual Merchandising & Sales Specialist"
							period="September 2020 – September 2022"
							location="Saint Petersburg"
							logo="E"
							delay={0.4}
							achievements={[
								"Enhanced in-store visual merchandising to improve customer experience",
								"Developed engaging training materials and presentations for onboarding new staff"
							]}
						/>
						
						{/* VAPE CLUB */}
						<WorkExperienceItem 
							company="VAPE CLUB"
							title="Visual Merchandiser & Sales Manager"
							period="February 2019 – August 2020"
							location="Saint Petersburg"
							logo="VC"
							delay={0.6}
							achievements={[
								"Maintained attractive and engaging visual store layouts",
								"Leveraged trend analysis to optimize product placement"
							]}
						/>
					</div>
				</div>
			</section>

			{/* Projects Section */}
			<section className="bg-primary/5 py-32" id="projects">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-20 overflow-hidden"
					>
						<h2 
							className="font-extrabold text-7xl uppercase tracking-tight md:text-8xl xl:text-[15rem]"
							style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 800` }}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
								<span className="-inset-1 absolute bg-accent opacity-50 blur-sm" />
								MY
							</span>
							WORK
						</h2>
					</motion.div>
					
					<div className="grid grid-cols-1 gap-10 md:grid-cols-2">
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
							viewport={{ once: true }}
						>
							<ProjectCard 
								title="VAPARSHOP" 
								description="Telegram bots and web applications improving operational efficiency"
								tags={["Next.js", "Bot API", "tRPC"]}
								href="/work/vaparshop"
							/>
						</motion.div>
						
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
							viewport={{ once: true }}
						>
							<ProjectCard 
								title="HORNY PLACE" 
								description="Comprehensive branding and interactive web solutions"
								tags={["Branding", "UI/UX", "React"]}
								href="/work/horny-place"
							/>
						</motion.div>
						
						
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section id="contact-section" className="relative overflow-hidden py-24">
				<div className="container mx-auto px-4">
					<motion.div
						initial={{ opacity: 0, y: 100 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
						viewport={{ once: true }}
						className="mb-16 overflow-hidden"
					>
						<h2 
							className="font-extrabold text-7xl uppercase tracking-tight md:text-8xl xl:text-[15rem]"
							style={{ fontFamily: 'Heading Now Variable', fontVariationSettings: `'wght' 1000, 'wdth' 800` }}
						>
							<span className="relative z-0 mr-4 inline-block md:mr-8 xl:mr-12">
								<span className="-inset-1 absolute bg-accent opacity-50 blur-sm" />
								GET
							</span>
							IN TOUCH
						</h2>
					</motion.div>
					
					<div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
						{/* Contact Form */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
						>
							<form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-8 shadow-lg">
								<h3 className="mb-6 font-bold text-2xl">Send a Message</h3>
								
								<div className="space-y-2">
									<label htmlFor="name" className="font-medium text-sm">Name</label>
									<Input
										id="name"
										{...register("name")}
										placeholder="Your name"
										className={errors.name ? "border-destructive" : ""}
									/>
									{errors.name && (
										<p className="text-destructive text-sm">{errors.name.message}</p>
									)}
								</div>
								
								<div className="space-y-2">
									<label htmlFor="email" className="font-medium text-sm">Email</label>
									<Input
										id="email"
										type="email"
										{...register("email")}
										placeholder="Your email address"
										className={errors.email ? "border-destructive" : ""}
									/>
									{errors.email && (
										<p className="text-destructive text-sm">{errors.email.message}</p>
									)}
								</div>
								
								<div className="space-y-2">
									<label htmlFor="message" className="font-medium text-sm">Message</label>
									<Textarea
										id="message"
										{...register("message")}
										placeholder="Tell me about your project or idea"
										rows={5}
										className={errors.message ? "border-destructive" : ""}
									/>
									{errors.message && (
										<p className="text-destructive text-sm">{errors.message.message}</p>
									)}
								</div>
								
								<Button 
									type="submit" 
									disabled={isSubmitting}
									className="group w-full"
								>
									<span>Send Message</span>
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Button>
							</form>
						</motion.div>
						
						{/* Contact Info */}
						<motion.div
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							viewport={{ once: true }}
							className="space-y-8"
						>
							<div className="rounded-xl border bg-card p-8 shadow-lg">
								<h3 className="mb-6 font-bold text-2xl">Contact Information</h3>
								
								<div className="space-y-4">
									<div className="flex items-center gap-4">
										<div className="rounded-full bg-accent/10 p-3 text-accent">
											<TelegramIcon className="h-6 w-6" />
										</div>
										<div>
											<p className="text-muted-foreground text-sm">Telegram</p>
											<a href="https://t.me/sabraman" className="font-medium hover:text-accent">@sabraman</a>
										</div>
									</div>
									
									<div className="flex items-center gap-4">
										<div className="rounded-full bg-accent/10 p-3 text-accent">
											<VKIcon className="h-6 w-6" />
										</div>
										<div>
											<p className="text-muted-foreground text-sm">VK</p>
											<a href="https://vk.com/sabraman" className="font-medium hover:text-accent">sabraman</a>
										</div>
									</div>
									
									<div className="flex items-center gap-4">
										<div className="rounded-full bg-accent/10 p-3 text-accent">
											<Github className="h-6 w-6" />
										</div>
										<div>
											<p className="text-muted-foreground text-sm">GitHub</p>
											<a href="https://github.com/sabraman" className="font-medium hover:text-accent">sabraman</a>
										</div>
									</div>
									
									<div className="flex items-center gap-4">
										<div className="rounded-full bg-accent/10 p-3 text-accent">
											<Instagram className="h-6 w-6" />
										</div>
										<div>
											<p className="text-muted-foreground text-sm">Instagram</p>
											<a href="https://instagram.com/sabraman" className="font-medium hover:text-accent">sabraman</a>
										</div>
									</div>
					</div>
				</div>

							<div className="rounded-xl border bg-card p-8 shadow-lg">
								<h3 className="mb-6 font-bold text-2xl">Location</h3>
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

			{/* Footer */}
			<footer className="border-t py-12">
				<div className="container mx-auto px-4">
					<div className="flex flex-col items-center justify-between md:flex-row">
						<p className="mb-4 md:mb-0">&copy; {new Date().getFullYear()} Danya Yudin</p>
						
					<div className="flex gap-6">
							<Link 
								href="https://t.me/sabraman" 
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
							Telegram
						</Link>
							<Link 
								href="https://github.com/sabraman" 
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
							GitHub
						</Link>
							<Link 
								href="https://instagram.com/sabraman" 
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
							Instagram
						</Link>
							<Link 
								href="https://x.com/1sabraman" 
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
							X
						</Link>
							<Link 
								href="https://vk.com/sabraman" 
								className="text-muted-foreground text-sm transition-colors duration-300 hover:text-foreground"
							>
							VK
						</Link>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
