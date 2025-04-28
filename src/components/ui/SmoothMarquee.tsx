"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Link from "next/link";

interface MarqueeItem {
  text: string;
  id: string;
}

export function SmoothMarquee() {
  const [isHovered, setIsHovered] = useState(false);
  const animationControls = useAnimationControls();
  
  // Создаем массив с текстами
  const items: MarqueeItem[] = [
    { text: " SABRAMAN ", id: "sabraman-1" },
    { text: " DANYA YUDIN ", id: "danya-1" },
    { text: " КАРТОН ", id: "karton-1" },
    { text: " SABRAMAN ", id: "sabraman-2" },
    { text: " DANYA YUDIN ", id: "danya-2" },
    { text: " КАРТОН ", id: "karton-2" },
    { text: " SABRAMAN ", id: "sabraman-3" },
    { text: " DANYA YUDIN ", id: "danya-3" },
    { text: " КАРТОН ", id: "karton-3" },
  ];

  // Создаем дубликаты с уникальными ключами
  const duplicatedItems = [
    ...items,
    ...items.map(item => ({ text: item.text, id: `dup-${item.id}` }))
  ];
  
  // Запускаем анимацию при монтировании компонента
  useEffect(() => {
    startAnimation(false);
  }, []);

  // Функция для запуска/обновления анимации
  const startAnimation = (slow: boolean) => {
    animationControls.start({
      x: "-50%",
      transition: {
        duration: slow ? 150 : 50, // Обычная или замедленная скорость
        ease: "linear",
        repeatType: "loop",
        repeat: Number.POSITIVE_INFINITY,
      }
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    startAnimation(true); // Замедляем
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    startAnimation(false); // Нормальная скорость
  };

  return (
    <div 
      className="w-full border-b overflow-hidden whitespace-nowrap py-1 group transition-all duration-500"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/" className="block">
        <div className={`marquee-container inline-block ${isHovered ? "invert bg-background" : ""}`} 
             style={{ transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)" }}>
          <motion.div
            className="marquee-content inline-flex"
            initial={{ x: 0 }}
            animate={animationControls}
            style={{
              fontFamily: "Heading Now Variable",
              fontVariationSettings: `'wght' 1000, 'wdth' 1000`,
              willChange: "transform",
              transform: "translateZ(0)",
              backfaceVisibility: "hidden"
            }}
          >
            {duplicatedItems.map((item) => (
              <span
                key={item.id}
                className="mx-2 text-[15vh] tracking-tighter transition-all duration-500"
              >
                {item.text}
              </span>
            ))}
          </motion.div>
        </div>
      </Link>
    </div>
  );
} 