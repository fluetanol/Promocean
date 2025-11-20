// frontend/src/components/section/ContestHeroSection.tsx

/**
 * ContestHeroSection component
 * @description ContestHeroSection component is a contest hero section component that displays the contest hero section content
 * @returns {React.ReactNode}
 */
export default function ContestHeroSection() {
  return (
    <div className="h-[400px] bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-text mb-6 leading-tight">
          프롬프트 <span className="text-primary">대회</span>
        </h1>
        <p className="text-xl md:text-2xl text-text/80 mb-8 leading-relaxed">
          창의적인 프롬프트로 경쟁하고 상을 받으세요
        </p>
        <p className="text-lg text-text/60 mb-12 max-w-2xl mx-auto">
          다양한 주제의 프롬프트 대회에 참여하여 실력을 뽐내고 커뮤니티와 함께 성장하세요
        </p>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-secondary rounded-full animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary rounded-full animate-pulse delay-500"></div>
    </div>
  )
}

