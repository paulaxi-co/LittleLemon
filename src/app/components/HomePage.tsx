import imgMediterranean from "@assets/a9f8189a3438ea12874fba6ea2889156ac666ed5.png";
import imgGreekSalad from "@assets/a74c793f86821f5776e4a73b57f3d7093f9ba2e0.png";
import imgBruschetta from "@assets/cbc120a1bca38c40776a71ac9d73678373684007.png";
import imgSeaBass from "@assets/8b313db652aeed4435d211f2e151565c1dc28d9e.png";
import imgAmbiance from "@assets/f1903d0aa7b0c4c06dfc653679bcbbb98c0e499c.png";

interface HomePageProps {
  onReserve: () => void;
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="#f4ce14" viewBox="0 0 14 14">
      <path
        d="M7 1L8.8 5.2L13.5 5.6L10.1 8.5L11.1 13.1L7 10.6L2.9 13.1L3.9 8.5L0.5 5.6L5.2 5.2L7 1Z"
        stroke="#f4ce14"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.16667"
      />
    </svg>
  );
}

const specials = [
  {
    id: 1,
    image: imgGreekSalad,
    name: "Greek Salad",
    price: "$12.99",
    description: "Fresh organic greens, tomatoes, olives, onion, and feta cheese with our house vinaigrette.",
    tag: "New",
  },
  {
    id: 2,
    image: imgBruschetta,
    name: "Bruschetta",
    price: "$5.99",
    description: "Grilled bread rubbed with garlic and topped with fresh tomato and basil.",
    tag: "Popular",
  },
  {
    id: 3,
    image: imgSeaBass,
    name: "Grilled Sea Bass",
    price: "$28.99",
    description: "Lightly seasoned fillet with a crisp skin, served with roasted vegetables.",
    tag: "Chef's Pick",
  },
];

export function HomePage({ onReserve }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Hero Section */}
      <section className="bg-[#495e57] pt-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-1 min-w-0">
            <h1 className="font-['Markazi_Text'] font-medium text-[#f4ce14] text-7xl md:text-8xl leading-none mb-1">
              Little Lemon
            </h1>
            <p className="font-['Markazi_Text'] text-[#fafaf9] text-4xl md:text-5xl leading-tight mb-6">
              Chicago
            </p>
            <p className="font-['Karla'] text-[rgba(250,250,249,0.85)] text-lg leading-relaxed mb-8 max-w-md">
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Fresh ingredients, bold flavors, warm hospitality.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={onReserve}
                className="bg-[#f4ce14] text-[#333] font-['Karla'] font-bold text-base px-8 py-4 rounded-2xl hover:bg-[#e6be10] transition-colors cursor-pointer flex items-center gap-2"
              >
                Reserve a table
                <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 18 18">
                  <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
                </div>
                <span className="font-['Karla'] text-[rgba(250,250,249,0.7)] text-sm">4.9 · 2,400+ reviews</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 14 14">
                  <path d="M7 1.167C5.024 1.167 3.5 2.69 3.5 4.667c0 2.917 3.5 8.167 3.5 8.167s3.5-5.25 3.5-8.167c0-1.976-1.524-3.5-3.5-3.5z" stroke="#f4ce14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  <circle cx="7" cy="4.667" r="1.167" stroke="#f4ce14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                </svg>
                <span className="font-['Karla'] text-[rgba(250,250,249,0.65)] text-xs">123 W Michigan Ave, Chicago</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 14 14">
                  <circle cx="7" cy="7" r="5.833" stroke="#f4ce14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                  <path d="M7 3.5V7L9.333 8.167" stroke="#f4ce14" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
                </svg>
                <span className="font-['Karla'] text-[rgba(250,250,249,0.65)] text-xs">Mon–Sun: 11am – 11pm</span>
              </div>
            </div>
          </div>

          <div className="relative flex-shrink-0 w-full md:w-[480px] h-[320px] md:h-[480px] mt-4 md:mt-8">
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0px_32px_64px_0px_rgba(0,0,0,0.4)]">
              <img
                src={imgMediterranean}
                alt="Mediterranean dishes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-[0px_8px_12px_rgba(0,0,0,0.12)] flex items-center gap-3 px-4 py-3">
              <div className="bg-[#f4ce14] rounded-xl w-10 h-10 flex items-center justify-center text-xl">🍋</div>
              <div>
                <p className="font-['Karla'] text-[#888] text-xs">Since 2001</p>
                <p className="font-['Karla'] font-bold text-[#333] text-sm">Family Owned</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specials Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-['Markazi_Text'] font-medium text-[#333] text-5xl leading-tight">
            This week's specials!
          </h2>
          <button className="font-['Karla'] font-semibold text-[#495e57] text-sm border-2 border-[#495e57] px-5 py-2.5 rounded-full hover:bg-[#495e57] hover:text-white transition-colors cursor-pointer">
            Online Menu
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specials.map((item) => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-[0px_4px_16px_rgba(0,0,0,0.07)] hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#f4ce14] text-[#333] font-['Karla'] font-bold text-xs px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-['Karla'] font-bold text-[#333] text-base">{item.name}</h3>
                  <span className="font-['Karla'] font-bold text-[#ee9972] text-base">{item.price}</span>
                </div>
                <p className="font-['Karla'] text-[#6b7280] text-sm leading-relaxed mb-4">{item.description}</p>
                <button className="font-['Karla'] font-semibold text-[#495e57] text-sm flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
                  Order a delivery
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16">
                    <path d="M6 12L10 8L6 4" stroke="#495e57" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1">
          <h2 className="font-['Markazi_Text'] font-medium text-[#333] text-5xl leading-tight mb-2">
            Little Lemon
          </h2>
          <p className="font-['Markazi_Text'] text-[#495e57] text-3xl leading-tight mb-6">Chicago</p>
          <p className="font-['Karla'] text-[#4a5568] text-base leading-relaxed mb-4">
            Founded in 2001 by brothers Mario and Adrian Rossi, Little Lemon has become a Chicago institution. We bring the vibrant flavors of the Mediterranean to the heart of the city, using fresh, locally sourced ingredients whenever possible.
          </p>
          <p className="font-['Karla'] text-[#4a5568] text-base leading-relaxed">
            Our menu changes seasonally to reflect the best of what's available, with classic dishes like our Greek Salad and Grilled Sea Bass always available alongside exciting seasonal specials.
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto flex gap-4">
          <div className="w-[180px] h-[280px] rounded-2xl overflow-hidden shadow-lg mt-8">
            <img src={imgAmbiance} alt="Restaurant ambiance" className="w-full h-full object-cover" />
          </div>
          <div className="w-[180px] h-[280px] rounded-2xl overflow-hidden shadow-lg -mt-8">
            <img src={imgMediterranean} alt="Mediterranean food" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#495e57] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-['Markazi_Text'] font-medium text-[#fafaf9] text-5xl leading-tight mb-10">
            What our guests say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Sarah K.", rating: 5, text: "Absolutely incredible food and service. The Greek Salad is the best I've ever had!" },
              { name: "James M.", rating: 5, text: "A true gem in Chicago. The ambiance is perfect for date nights." },
              { name: "Priya L.", rating: 5, text: "Fresh ingredients, bold flavors. We visit every month without fail." },
              { name: "Carlos R.", rating: 4, text: "Warm hospitality and delicious Mediterranean food. Highly recommend!" },
            ].map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <StarIcon key={j} />
                  ))}
                </div>
                <p className="font-['Karla'] text-[rgba(250,250,249,0.85)] text-sm leading-relaxed mb-4">"{t.text}"</p>
                <p className="font-['Karla'] font-bold text-[#f4ce14] text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="font-['Markazi_Text'] font-medium text-[#333] text-5xl leading-tight mb-4">
          Ready to dine with us?
        </h2>
        <p className="font-['Karla'] text-[#6b7280] text-lg mb-8">
          Reserve your table online and enjoy a memorable Mediterranean experience.
        </p>
        <button
          onClick={onReserve}
          className="bg-[#f4ce14] text-[#333] font-['Karla'] font-bold text-base px-10 py-4 rounded-2xl hover:bg-[#e6be10] transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          Reserve a table
          <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 18 18">
            <path d="M6.75 13.5L11.25 9L6.75 4.5" stroke="#333" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-[#333] text-[rgba(255,255,255,0.6)] py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #495e57 0%, #3a4d45 100%)" }}
            >
              <span className="font-['Markazi_Text'] font-bold text-[#f4ce14] text-sm">LL</span>
            </div>
            <span className="font-['Markazi_Text'] font-bold text-white text-base">Little Lemon · Chicago</span>
          </div>
          <p className="font-['Karla'] text-sm">© 2026 Little Lemon Restaurant. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
