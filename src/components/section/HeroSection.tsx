// frontend/src/components/section/HeroSection.tsx

/**
 * HeroSection component
 * @description HeroSection component is a hero section component that displays the hero section content
 * @returns {React.ReactNode}
 */
export default function HeroSection() {
  return (
    <div className="h-[320px] bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-bold text-text mb-6 leading-tight">
          Prom<span className="text-primary">Ocean</span>
        </h1>
        <p className="text-xl md:text-2xl text-text/80 mb-8 leading-relaxed">
          프롬프트의 바다에서 새로운 아이디어를 발견하세요
        </p>
        <p className="text-lg text-text/60 mb-12 max-w-2xl mx-auto">
          AI 프롬프트를 공유하고, 검색하고, 경쟁하며 함께 성장하는 커뮤니티 플랫폼
        </p>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
    </div>
  )
}