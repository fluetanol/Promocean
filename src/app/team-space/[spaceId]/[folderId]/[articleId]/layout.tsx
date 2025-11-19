import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";




export default function TeamSpaceArticleLayout({
    children
}: Readonly<{children: React.ReactNode}>){
        return(
            <div className="min-h-screen bg-gray-50">
            <SpaceBoardHeader description={`팀 스페이스 아카이브에 작성된 글을 확인하세요`} />
             {children}
           </div>
        )
}
