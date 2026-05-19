type Page = "home" | "reserve" | "details" | "confirmation";

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/[0.06] h-16 px-6 flex items-center justify-between">
      <button
        onClick={() => onNavigate("home")}
        className="flex items-center gap-2.5 h-10 cursor-pointer"
      >
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, #495e57 0%, #3a4d45 100%)" }}
        >
          <span className="font-['Markazi_Text'] font-bold text-[#f4ce14] text-lg leading-none">LL</span>
        </div>
        <div className="flex flex-col items-start">
          <span className="font-['Markazi_Text'] font-bold text-[#333] text-[18px] leading-tight">Little Lemon</span>
          <span className="font-['Karla'] font-medium text-[#495e57] text-[12px] uppercase tracking-widest leading-none">Chicago</span>
        </div>
      </button>

      <div className="hidden md:flex items-center gap-8">
        <button
          onClick={() => onNavigate("home")}
          className={`font-['Karla'] font-semibold text-sm tracking-wide transition-colors cursor-pointer ${
            currentPage === "home" ? "text-[#495e57]" : "text-[#4a5568] hover:text-[#495e57]"
          }`}
        >
          Home
          {currentPage === "home" && (
            <div className="h-0.5 bg-[#f4ce14] rounded-full mt-0.5" />
          )}
        </button>
        <button className="font-['Karla'] font-semibold text-[#4a5568] text-sm tracking-wide hover:text-[#495e57] transition-colors cursor-pointer">
          About
        </button>
        <button className="font-['Karla'] font-semibold text-[#4a5568] text-sm tracking-wide hover:text-[#495e57] transition-colors cursor-pointer">
          Menu
        </button>
        <button
          onClick={() => onNavigate("reserve")}
          className={`font-['Karla'] font-semibold text-sm tracking-wide transition-colors cursor-pointer ${
            ["reserve", "details", "confirmation"].includes(currentPage)
              ? "text-[#495e57]"
              : "text-[#4a5568] hover:text-[#495e57]"
          }`}
        >
          Reservations
          {["reserve", "details", "confirmation"].includes(currentPage) && (
            <div className="h-0.5 bg-[#f4ce14] rounded-full mt-0.5" />
          )}
        </button>
        <button className="font-['Karla'] font-semibold text-[#4a5568] text-sm tracking-wide hover:text-[#495e57] transition-colors cursor-pointer">
          Order Online
        </button>
        <button
          onClick={() => onNavigate("reserve")}
          className="bg-[#f4ce14] text-[#333] font-['Karla'] font-bold text-sm px-5 py-2 rounded-full hover:bg-[#e6be10] transition-colors cursor-pointer"
        >
          Reserve a table
        </button>
      </div>

      <button
        onClick={() => onNavigate("reserve")}
        className="md:hidden bg-[#f4ce14] text-[#333] font-['Karla'] font-bold text-sm px-4 py-2 rounded-full cursor-pointer"
      >
        Reserve
      </button>
    </nav>
  );
}
