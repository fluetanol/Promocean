// frontend/src/components/section/HeroSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";


/**
 * HeroSection component
 * @description 베테랑 사용자를 위한 메인 배너 영역
 * @returns {React.ReactNode}
 */
export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: ["함께 만드는", "고품질 프롬프트"],
      buttons: [
        { text: "커뮤니티 페이지로 가기", href: "/community" }
      ],
      image : "/assets/hero-1.png"
    },
    {
      title: ["나만의 공간에서", "프롬프트를 관리해요"],
      buttons: [
        { text: "개인 스페이스로", href: "/my-space" },
        { text: "팀 스페이스로", href: "/team-space" }
      ],
      image : "/assets/hero-2.png"
    },
    {
      title: ["경쟁을 통한", "AI 사용의 고수가 되어보아요"],
      buttons: [
        { text: "대회 페이지로", href: "/contest" }
      ],
       image : "/assets/hero-3.png"
    }
  ];

  // 자동 롤링 효과
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5초마다 전환

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <section
      className="relative w-full h-96 border-b border-gray-300 overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 백그라운드 이미지들 - section 전체를 꽉 채움 */}
      {slides.map((slide, index) => (
        <div
          key={`bg-${index}`}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`${slide.title.join(' ')} background`}
            fill
            className="object-cover object-center saturate-150 group-hover:scale-105 transition-transform duration-500"
            priority={index === 0}
          />
          {/* 텍스트 가독성을 위한 오버레이 */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}

      {/* 컨텐츠 영역 - 패딩 적용 */}
      <div className="relative w-full h-full flex flex-col p-12 z-10">
        <div className="text-xl font-semibold pb-4">
          <h3>Promocean</h3>
        </div>

        {/* 슬라이드 컨텐츠 컨테이너 */}
        <div className="relative flex-1 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >

              <div className="font-semibold text-5xl space-y-1.5 whitespace-nowrap text-white drop-shadow-lg">
                {slide.title.map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div className="flex-1"></div>

              <div className="flex flex-row justify-end gap-2">
                {slide.buttons.map((button, i) => (
                  <Link key={i} href={button.href}>
                    <div className="w-fit rounded-full bg-primary border border-gray-400 text-white px-4 py-2 hover:bg-primary/70 hover:border-white transition-all duration-150">
                      {button.text}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 인디케이터 */}
        <div className="absolute bottom-24 left-12">
          <ul className="relative flex flex-row gap-2">
            {slides.map((_, index) => (
              <li
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full border-2 border-white cursor-pointer transition-all duration-300 ${
                  index === currentSlide ? "bg-primary scale-110" : "bg-transparent hover:bg-gray-300"
                }`}
              />
            ))}
          </ul>
        </div>
      </div>

    </section>
  );
}
