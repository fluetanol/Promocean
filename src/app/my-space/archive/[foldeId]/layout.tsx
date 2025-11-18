import { SpaceBoardHeader } from "@/components/layout/SpaceBoardHeader";




export default function MyFolderLayout({
    children
}: Readonly<{children: React.ReactNode}>){
        return(
            <div className="min-h-screen bg-gray-50">
            <SpaceBoardHeader description={`자신이 아카이브에 쓴 글을 확인하세요`} /> 
             {children}
           </div>
        )
}
