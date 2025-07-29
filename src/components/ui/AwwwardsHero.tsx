"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

// Optimized fluid particle system with instanced rendering
function FluidParticles() {
	const meshRef = useRef<THREE.InstancedMesh>(null);
	const { viewport, invalidate } = useThree();
	const mouse = useRef({ x: 0, y: 0 });

	// Pre-calculate optimized particle system
	const particles = useMemo(() => {
		const count = 150;
		const positions: Array<{
			x: number;
			y: number;
			z: number;
			vx: number;
			vy: number;
			phase: number;
		}> = [];

		for (let i = 0; i < count; i++) {
			positions.push({
				x: (Math.random() - 0.5) * viewport.width * 1.5,
				y: (Math.random() - 0.5) * viewport.height * 1.5,
				z: (Math.random() - 0.5) * 8,
				vx: (Math.random() - 0.5) * 0.02,
				vy: (Math.random() - 0.5) * 0.02,
				phase: Math.random() * Math.PI * 2,
			});
		}
		return positions;
	}, [viewport]);

	// Reuse objects for performance
	const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
	const tempPosition = useMemo(() => new THREE.Vector3(), []);

	useFrame((state) => {
		if (!meshRef.current) return;

		const time = state.clock.elapsedTime;

		particles.forEach((particle, i) => {
			// Fluid motion with mouse attraction
			const mouseInfluence = 0.15;
			const dx = mouse.current.x - particle.x;
			const dy = mouse.current.y - particle.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < 3) {
				particle.vx += dx * mouseInfluence * 0.01;
				particle.vy += dy * mouseInfluence * 0.01;
			}

			// Natural flow with sine waves
			particle.x += particle.vx + Math.sin(time * 0.5 + particle.phase) * 0.008;
			particle.y += particle.vy + Math.cos(time * 0.3 + particle.phase) * 0.006;
			particle.z += Math.sin(time * 0.8 + particle.phase) * 0.004;

			// Boundary wrapping
			if (particle.x > viewport.width) particle.x = -viewport.width;
			if (particle.x < -viewport.width) particle.x = viewport.width;
			if (particle.y > viewport.height) particle.y = -viewport.height;
			if (particle.y < -viewport.height) particle.y = viewport.height;

			// Damping for smooth motion
			particle.vx *= 0.99;
			particle.vy *= 0.99;

			// Update instance matrix efficiently
			const scale = 0.8 + Math.sin(time * 2 + particle.phase) * 0.3;
			tempPosition.set(particle.x, particle.y, particle.z);
			tempMatrix.makeTranslation(
				tempPosition.x,
				tempPosition.y,
				tempPosition.z,
			);
			tempMatrix.scale(new THREE.Vector3(scale, scale, scale));

			meshRef.current?.setMatrixAt(i, tempMatrix);
		});

		meshRef.current.instanceMatrix.needsUpdate = true;
		invalidate(); // Only render when needed
	});

	// Mouse tracking for interaction
	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<instancedMesh
			ref={meshRef}
			args={[undefined, undefined, particles.length]}
		>
			<sphereGeometry args={[0.015, 8, 8]} />
			<meshBasicMaterial color="#7878fa" transparent opacity={0.7} />
		</instancedMesh>
	);
}

// Dynamic gradient mesh that responds to scroll
function DynamicGradientMesh() {
	const meshRef = useRef<THREE.Mesh>(null);
	const materialRef = useRef<THREE.ShaderMaterial>(null);

	// Custom shader material for advanced effects
	const shaderMaterial = useMemo(() => {
		return new THREE.ShaderMaterial({
			uniforms: {
				time: { value: 0 },
				colorA: { value: new THREE.Color("#7878fa") },
				colorB: { value: new THREE.Color("#64ffda") },
				opacity: { value: 0.15 },
			},
			vertexShader: `
				varying vec2 vUv;
				varying vec3 vPosition;
				uniform float time;
				
				void main() {
					vUv = uv;
					vPosition = position;
					
					vec3 pos = position;
					pos.z += sin(pos.x * 4.0 + time) * 0.1;
					pos.z += cos(pos.y * 3.0 + time * 0.5) * 0.1;
					
					gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
				}
			`,
			fragmentShader: `
				uniform vec3 colorA;
				uniform vec3 colorB;
				uniform float opacity;
				uniform float time;
				varying vec2 vUv;
				varying vec3 vPosition;
				
				void main() {
					vec2 uv = vUv;
					
					// Animated gradient
					float mixer = sin(uv.x * 3.0 + time * 0.5) * 0.5 + 0.5;
					mixer += cos(uv.y * 2.0 + time * 0.3) * 0.3;
					
					vec3 color = mix(colorA, colorB, mixer);
					
					gl_FragColor = vec4(color, opacity);
				}
			`,
			transparent: true,
			side: THREE.DoubleSide,
		});
	}, []);

	useFrame((state) => {
		if (materialRef.current?.uniforms?.time) {
			materialRef.current.uniforms.time.value = state.clock.elapsedTime;
		}

		if (meshRef.current) {
			meshRef.current.rotation.z =
				Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
		}
	});

	return (
		<mesh ref={meshRef}>
			<planeGeometry args={[20, 20, 32, 32]} />
			<primitive object={shaderMaterial} ref={materialRef} attach="material" />
		</mesh>
	);
}

// Main 3D scene component
function Scene() {
	return (
		<>
			<ambientLight intensity={0.2} />
			<pointLight position={[10, 10, 10]} intensity={0.3} />
			<FluidParticles />
			<DynamicGradientMesh />
		</>
	);
}

// Performance monitor component
function AdaptivePerformance() {
	const { performance, setDpr } = useThree();

	useEffect(() => {
		// Adaptive performance scaling
		const handlePerformance = () => {
			const fps = 1000 / (performance.current || 16.67);
			if (fps < 45) {
				setDpr(Math.max(1, window.devicePixelRatio * 0.8));
			} else if (fps > 55) {
				setDpr(Math.min(2, window.devicePixelRatio));
			}
		};

		const interval = setInterval(handlePerformance, 1000);
		return () => clearInterval(interval);
	}, [performance, setDpr]);

	return null;
}

interface AwwwardsHeroProps {
	children: React.ReactNode;
	className?: string;
}

export function AwwwardsHero({ children, className = "" }: AwwwardsHeroProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isMounted, setIsMounted] = useState(false);

	// Advanced scroll animations with spring physics
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 100,
		damping: 30,
		restDelta: 0.001,
	});

	// Parallax transforms
	const y = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
	const scale = useTransform(smoothProgress, [0, 0.5], [1, 1.1]);
	const opacity = useTransform(smoothProgress, [0, 0.3, 0.7], [1, 0.8, 0]);

	// 3D rotation effect
	const rotateX = useTransform(smoothProgress, [0, 0.5], [0, -15]);
	const rotateY = useTransform(smoothProgress, [0, 0.5], [0, 5]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<section
			ref={containerRef}
			className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden ${className}`}
			style={{ perspective: "1000px" }}
		>
			{/* Advanced Three.js Background */}
			<div className="-z-10 absolute inset-0">
				<Canvas
					dpr={[1, 2]}
					performance={{ min: 0.5 }}
					camera={{ position: [0, 0, 5], fov: 75 }}
					style={{ background: "transparent" }}
				>
					<Suspense fallback={null}>
						<Scene />
						<AdaptivePerformance />
					</Suspense>
				</Canvas>
			</div>

			{/* Gradient overlays for depth */}
			<div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
			<div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />

			{/* Dynamic light beams */}
			<motion.div
				className="absolute inset-0 opacity-30"
				animate={{
					background: [
						"radial-gradient(circle at 20% 30%, rgba(120, 120, 250, 0.1) 0%, transparent 50%)",
						"radial-gradient(circle at 80% 70%, rgba(100, 255, 218, 0.1) 0%, transparent 50%)",
						"radial-gradient(circle at 40% 80%, rgba(120, 120, 250, 0.1) 0%, transparent 50%)",
					],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					repeatType: "reverse",
					ease: "easeInOut",
				}}
			/>

			{/* Main content with advanced transforms */}
			<motion.div
				className="relative z-10 flex flex-col items-center justify-center text-center"
				style={{
					y,
					scale,
					opacity,
					rotateX,
					rotateY,
					transformStyle: "preserve-3d",
				}}
			>
				<div className="max-w-7xl px-4">{children}</div>
			</motion.div>

			{/* Interactive grid overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.03]"
				style={{
					backgroundImage: `
						linear-gradient(rgba(120, 120, 250, 0.3) 1px, transparent 1px),
						linear-gradient(90deg, rgba(120, 120, 250, 0.3) 1px, transparent 1px)
					`,
					backgroundSize: "50px 50px",
				}}
			/>
		</section>
	);
}
