import { Link } from "wouter";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans text-foreground">
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-[#1B2A4A] text-[#FAF7F2] py-12 px-6 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C9922A] flex items-center justify-center text-white font-bold text-base">
                C
              </div>
              <span className="font-serif font-bold text-xl">ClearPath Elder Guide</span>
            </div>
            <p className="text-[#FAF7F2]/70 max-w-sm mb-6">
              Clear guidance for life's hardest transitions.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[#FAF7F2]/70 hover:text-[#C9922A] transition-colors">Home</Link></li>
              <li><Link href="/start" className="text-[#FAF7F2]/70 hover:text-[#C9922A] transition-colors">Start Here</Link></li>
              <li><Link href="/resources" className="text-[#FAF7F2]/70 hover:text-[#C9922A] transition-colors">Resources</Link></li>
              <li><Link href="/experts" className="text-[#FAF7F2]/70 hover:text-[#C9922A] transition-colors">Find an Expert</Link></li>
              <li><Link href="/about" className="text-[#FAF7F2]/70 hover:text-[#C9922A] transition-colors">About</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-[#FAF7F2]/20 text-sm text-[#FAF7F2]/50 text-center">
          <p className="mb-4 max-w-3xl mx-auto leading-relaxed">
            ClearPath Elder Guide provides general educational information only. Nothing on this website constitutes legal, financial, or medical advice. Every situation is different — the information here is a starting point, not a substitute for guidance from a qualified professional. Always consult a licensed attorney, financial advisor, or healthcare provider for advice specific to your circumstances.
          </p>
          <p>© 2025 ClearPath Elder Guide</p>
        </div>
      </footer>
    </div>
  );
}
