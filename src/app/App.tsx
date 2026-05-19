import { useState, useEffect } from "react";
import imgMediterranean from "@assets/a9f8189a3438ea12874fba6ea2889156ac666ed5.png";
import imgGreekSalad    from "@assets/a74c793f86821f5776e4a73b57f3d7093f9ba2e0.png";
import imgBruschetta    from "@assets/cbc120a1bca38c40776a71ac9d73678373684007.png";
import imgSeaBass       from "@assets/8b313db652aeed4435d211f2e151565c1dc28d9e.png";
import imgAmbiance      from "@assets/f1903d0aa7b0c4c06dfc653679bcbbb98c0e499c.png";

// ─── constants ───────────────────────────────────────────────────────────────

const TIMES  = ["12:00 PM","1:00 PM","2:00 PM","5:00 PM","6:00 PM","7:00 PM","8:00 PM","9:00 PM"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function randomConfirmation() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "LL-" + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

function formatDate(d: Date | null) {
  return d ? d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "";
}

// ─── shared step indicator ────────────────────────────────────────────────────

function Steps({ current }: { current: number }) {
  const steps = [{ n: 1, label: "Booking details" }, { n: 2, label: "Your details" }, { n: 3, label: "Confirmation" }];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      {steps.map((s, i) => {
        const done   = s.n < current;
        const active = s.n === current;
        return (
          <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: active ? 35 : 32, height: active ? 35 : 32, borderRadius: "50%", flexShrink: 0,
                background: done ? "#495e57" : active ? "#f4ce14" : "#e5e7eb",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {done
                  ? <svg width="13" height="13" fill="none"><path d="M2.5 6.5L5 9L10.5 3.5" stroke="#fafaf9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.625"/></svg>
                  : <span style={{ fontFamily: "Karla", fontWeight: 700, fontSize: 14, color: active ? "#333" : "#9ca3af" }}>{s.n}</span>
                }
              </div>
              <span style={{ fontFamily: "Karla", fontWeight: (done || active) ? 700 : 400, fontSize: 14, color: (done || active) ? "#333" : "#9ca3af", whiteSpace: "nowrap" }}>
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ height: 2, width: 32, borderRadius: 4, background: done ? "#495e57" : "#e5e7eb", flexShrink: 0 }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── app ──────────────────────────────────────────────────────────────────────

export default function App() {

  // page state
  const [page, setPage] = useState("home");

  // booking
  const [date,   setDate]   = useState<Date | null>(null);
  const [time,   setTime]   = useState<string | null>(null);
  const [guests, setGuests] = useState(2);

  // calendar navigation
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const [calYear,  setCalYear]  = useState(today.getFullYear());
  const [calMonth, setCalMonth] = useState(today.getMonth());

  // personal details
  const [firstName, setFirstName] = useState("");
  const [lastName,  setLastName]  = useState("");
  const [email,     setEmail]     = useState("");
  const [phone,     setPhone]     = useState("");
  const [requests,  setRequests]  = useState("");

  // form validation
  const [errors,    setErrors]    = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // confirmation
  const [confNum, setConfNum] = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  function reset() {
    setDate(null); setTime(null); setGuests(2);
    setFirstName(""); setLastName(""); setEmail(""); setPhone(""); setRequests("");
    setErrors({}); setSubmitted(false);
  }

  function prevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11); }
    else setCalMonth(m => m - 1);
  }
  function nextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0); }
    else setCalMonth(m => m + 1);
  }

  function pickDate(day: number) {
    const d = new Date(calYear, calMonth, day);
    if (d < today) return;
    setDate(d);
  }

  function isPast(day: number)     { return new Date(calYear, calMonth, day) < today; }
  function isSelected(day: number) { return !!date && new Date(calYear, calMonth, day).toDateString() === date.toDateString(); }

  const firstDayOfMonth = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth     = new Date(calYear, calMonth + 1, 0).getDate();

  function validate() {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Required";
    if (!lastName.trim())  e.lastName  = "Required";
    if (!email.trim())          e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email";
    if (!phone.trim())     e.phone     = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const formValid = !!(firstName.trim() && lastName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && phone.trim());

  // ── shared navbar ──────────────────────────────────────────────────────────

  const Navbar = (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, height: 64, padding: "0 24px", background: "rgba(255,255,255,0.95)", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

      {/* Logo */}
      <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, border: "none", background: "none", cursor: "pointer" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#495e57,#3a4d45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontFamily: "Markazi Text", fontWeight: 700, color: "#f4ce14", fontSize: 18 }}>LL</span>
        </div>
        <div>
          <div style={{ fontFamily: "Markazi Text", fontWeight: 700, color: "#333", fontSize: 18, lineHeight: 1.2 }}>Little Lemon</div>
          <div style={{ fontFamily: "Karla", fontWeight: 500, color: "#495e57", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px" }}>Chicago</div>
        </div>
      </button>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {["Home", "About", "Menu"].map(label => (
          <button key={label} onClick={() => label === "Home" && setPage("home")} style={{ fontFamily: "Karla", fontWeight: 600, fontSize: 14, color: "#4a5568", border: "none", background: "none", cursor: "pointer" }}>{label}</button>
        ))}
        <button onClick={() => setPage("reserve")} style={{ fontFamily: "Karla", fontWeight: 600, fontSize: 14, color: ["reserve","details","confirmation"].includes(page) ? "#495e57" : "#4a5568", border: "none", background: "none", cursor: "pointer" }}>Reservations</button>
        <button style={{ fontFamily: "Karla", fontWeight: 600, fontSize: 14, color: "#4a5568", border: "none", background: "none", cursor: "pointer" }}>Order Online</button>
        <button onClick={() => setPage("reserve")} style={{ background: "#f4ce14", color: "#333", fontFamily: "Karla", fontWeight: 700, fontSize: 14, padding: "8px 20px", borderRadius: 999, border: "none", cursor: "pointer" }}>Reserve a table</button>
      </div>

    </nav>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // HOME PAGE
  // ══════════════════════════════════════════════════════════════════════════

  if (page === "home") return (
    <div style={{ background: "#fafaf9", minHeight: "100vh" }}>
      {Navbar}

      {/* ── hero ── */}
      <section style={{ background: "#495e57", paddingTop: 64, overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>

          <div style={{ flex: "1 1 360px" }}>
            <h1 style={{ fontFamily: "Markazi Text", color: "#f4ce14", fontSize: 80, lineHeight: 1, margin: "0 0 4px" }}>Little Lemon</h1>
            <p  style={{ fontFamily: "Markazi Text", color: "#fafaf9", fontSize: 44, margin: "0 0 20px" }}>Chicago</p>
            <p  style={{ fontFamily: "Karla", color: "rgba(250,250,249,0.85)", fontSize: 18, lineHeight: 1.65, maxWidth: 420, margin: "0 0 28px" }}>
              We are a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Fresh ingredients, bold flavors, warm hospitality.
            </p>
            <button onClick={() => setPage("reserve")} style={{ background: "#f4ce14", color: "#333", fontFamily: "Karla", fontWeight: 700, fontSize: 16, padding: "14px 32px", borderRadius: 16, border: "none", cursor: "pointer" }}>
              Reserve a table →
            </button>
          </div>

          <div style={{ position: "relative", flexShrink: 0, width: 440, height: 440 }}>
            <img src={imgMediterranean} alt="Mediterranean dishes" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 24, boxShadow: "0 32px 64px rgba(0,0,0,0.4)" }} />
            <div style={{ position: "absolute", bottom: -16, left: -16, background: "white", borderRadius: 16, boxShadow: "0 8px 12px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 12, padding: "12px 16px" }}>
              <div style={{ background: "#f4ce14", borderRadius: 14, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🍋</div>
              <div>
                <p style={{ fontFamily: "Karla", color: "#888",  fontSize: 12, margin: 0 }}>Since 2001</p>
                <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#333", fontSize: 14, margin: 0 }}>Family Owned</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── specials ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <h2 style={{ fontFamily: "Markazi Text", fontSize: 48, color: "#333", margin: 0 }}>This week's specials!</h2>
          <button style={{ fontFamily: "Karla", fontWeight: 600, color: "#495e57", fontSize: 14, border: "2px solid #495e57", borderRadius: 999, padding: "10px 20px", background: "none", cursor: "pointer" }}>Online Menu</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px,1fr))", gap: 24 }}>
          {[
            { img: imgGreekSalad, name: "Greek Salad",      price: "$12.99", desc: "Fresh organic greens, tomatoes, olives, onion, and feta cheese with house vinaigrette.", tag: "New" },
            { img: imgBruschetta, name: "Bruschetta",        price: "$5.99",  desc: "Grilled bread rubbed with garlic and topped with fresh tomato and basil.",              tag: "Popular" },
            { img: imgSeaBass,    name: "Grilled Sea Bass",  price: "$28.99", desc: "Lightly seasoned fillet with crisp skin, served with roasted vegetables.",              tag: "Chef's Pick" },
          ].map(item => (
            <div key={item.name} style={{ background: "white", borderRadius: 24, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
              <div style={{ position: "relative", height: 180 }}>
                <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <span style={{ position: "absolute", top: 12, left: 12, background: "#f4ce14", color: "#333", fontFamily: "Karla", fontWeight: 700, fontSize: 12, padding: "4px 12px", borderRadius: 999 }}>{item.tag}</span>
              </div>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "Karla", fontWeight: 700, color: "#333",    fontSize: 15 }}>{item.name}</span>
                  <span style={{ fontFamily: "Karla", fontWeight: 700, color: "#ee9972", fontSize: 15 }}>{item.price}</span>
                </div>
                <p style={{ fontFamily: "Karla", color: "#6b7280", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>{item.desc}</p>
                <span style={{ fontFamily: "Karla", fontWeight: 600, color: "#495e57", fontSize: 14, cursor: "pointer" }}>Order a delivery →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── about ── */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px", display: "flex", gap: 48, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 360px" }}>
          <h2 style={{ fontFamily: "Markazi Text", fontSize: 48, color: "#333", margin: "0 0 4px" }}>Little Lemon</h2>
          <p  style={{ fontFamily: "Markazi Text", color: "#495e57", fontSize: 32, margin: "0 0 20px" }}>Chicago</p>
          <p  style={{ fontFamily: "Karla", color: "#4a5568", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
            Founded in 2001 by brothers Mario and Adrian Rossi, Little Lemon has become a Chicago institution. We bring the vibrant flavors of the Mediterranean to the heart of the city using fresh, locally sourced ingredients.
          </p>
        </div>
        <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
          <img src={imgAmbiance}      alt="Ambiance"  style={{ width: 180, height: 280, objectFit: "cover", borderRadius: 20, marginTop: 32 }} />
          <img src={imgMediterranean} alt="Food"      style={{ width: 180, height: 280, objectFit: "cover", borderRadius: 20, marginTop: -32 }} />
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#495e57", padding: "64px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Markazi Text", color: "#fafaf9", fontSize: 48, margin: "0 0 12px" }}>Ready to dine with us?</h2>
        <p  style={{ fontFamily: "Karla", color: "rgba(250,250,249,0.7)", fontSize: 16, margin: "0 0 28px" }}>Reserve your table and enjoy a memorable Mediterranean experience.</p>
        <button onClick={() => setPage("reserve")} style={{ background: "#f4ce14", color: "#333", fontFamily: "Karla", fontWeight: 700, fontSize: 16, padding: "14px 40px", borderRadius: 16, border: "none", cursor: "pointer" }}>
          Reserve a table →
        </button>
      </section>

      {/* ── footer ── */}
      <footer style={{ background: "#333", padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "Karla", color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0 }}>© 2026 Little Lemon Restaurant, Chicago. All rights reserved.</p>
      </footer>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // RESERVE PAGE  (step 1 — date / time / guests)
  // ══════════════════════════════════════════════════════════════════════════

  if (page === "reserve") return (
    <div style={{ background: "#fafaf9", minHeight: "100vh", paddingTop: 64 }}>
      {Navbar}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px" }}>

        <button onClick={() => setPage("home")} style={{ fontFamily: "Karla", fontWeight: 600, fontSize: 14, color: "#495e57", border: "none", background: "none", cursor: "pointer", marginBottom: 24 }}>← Back to home</button>
        <Steps current={1} />

        <h1 style={{ fontFamily: "Markazi Text", fontSize: 52, color: "#333", margin: "28px 0 4px" }}>Reserve a table</h1>
        <p  style={{ fontFamily: "Karla", color: "#6b7280", fontSize: 16, margin: "0 0 32px" }}>Choose your preferred date, time, and party size</p>

        {/* ── date card ── */}
        <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: 32, marginBottom: 16 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "rgba(73,94,87,0.1)", width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📅</div>
            <div>
              <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#9ca3af", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px", margin: 0 }}>Step 1 of 3</p>
              <h2 style={{ fontFamily: "Markazi Text", fontWeight: 600, color: "#333", fontSize: 22, margin: 0 }}>Select a date</h2>
            </div>
          </div>

          {/* month nav */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <button onClick={prevMonth} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#495e57" }}>‹</button>
            <span style={{ fontFamily: "Markazi Text", fontWeight: 600, color: "#333", fontSize: 20 }}>{MONTHS[calMonth]} {calYear}</span>
            <button onClick={nextMonth} style={{ width: 32, height: 32, borderRadius: "50%", border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#495e57" }}>›</button>
          </div>

          {/* weekday labels */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 8 }}>
            {DAYS.map(d => <div key={d} style={{ textAlign: "center", fontFamily: "Karla", fontWeight: 600, color: "#9ca3af", fontSize: 12, padding: "4px 0" }}>{d}</div>)}
          </div>

          {/* day buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
            {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day), sel = isSelected(day);
              return (
                <button key={day} onClick={() => pickDate(day)} disabled={past} style={{
                  height: 48, borderRadius: 14, border: "none", cursor: past ? "not-allowed" : "pointer",
                  fontFamily: "Karla", fontSize: 14, fontWeight: sel ? 700 : 400,
                  background: sel ? "#495e57" : "transparent",
                  color: sel ? "white" : past ? "#d1d5db" : "#4a5568",
                  transition: "background 0.15s",
                }}>
                  {day}
                </button>
              );
            })}
          </div>

        </div>

        {/* ── time card ── */}
        <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: 32, marginBottom: 16 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "rgba(73,94,87,0.1)", width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🕐</div>
            <div>
              <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#9ca3af", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px", margin: 0 }}>Step 2 of 3</p>
              <h2 style={{ fontFamily: "Markazi Text", fontWeight: 600, color: "#333", fontSize: 22, margin: 0 }}>Choose your time</h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {TIMES.map(t => (
              <button key={t} onClick={() => setTime(t)} style={{
                height: 48, borderRadius: 16, border: `2px solid ${time === t ? "#495e57" : "#e5e7eb"}`,
                background: time === t ? "rgba(73,94,87,0.08)" : "white",
                color: time === t ? "#495e57" : "#4a5568",
                fontFamily: "Karla", fontWeight: time === t ? 700 : 500, fontSize: 14, cursor: "pointer",
                transition: "all 0.15s",
              }}>
                {t}
              </button>
            ))}
          </div>

        </div>

        {/* ── guests card ── */}
        <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: 32, marginBottom: 24 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ background: "rgba(73,94,87,0.1)", width: 40, height: 40, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👥</div>
            <div>
              <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#9ca3af", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px", margin: 0 }}>Step 3 of 3</p>
              <h2 style={{ fontFamily: "Markazi Text", fontWeight: 600, color: "#333", fontSize: 22, margin: 0 }}>Number of guests</h2>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "Karla", fontWeight: 600, color: "#4a5568", fontSize: 16, margin: "0 0 4px" }}>How many guests?</p>
              <p style={{ fontFamily: "Karla", color: "#9ca3af", fontSize: 14, margin: 0 }}>Maximum 20 guests per booking</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <button onClick={() => setGuests(g => Math.max(1, g - 1))}  style={{ width: 44, height: 44, borderRadius: 14, border: "2px solid #495e57", background: "none", color: "#495e57", fontSize: 20, fontWeight: 700, cursor: "pointer" }}>−</button>
              <span style={{ fontFamily: "Markazi Text", fontWeight: 600, color: "#333", fontSize: 28, minWidth: 28, textAlign: "center" }}>{guests}</span>
              <button onClick={() => setGuests(g => Math.min(20, g + 1))} style={{ width: 44, height: 44, borderRadius: 14, border: "2px solid #495e57", background: "none", color: "#495e57", fontSize: 20, fontWeight: 700, cursor: "pointer" }}>+</button>
            </div>
          </div>

          <div style={{ marginTop: 16, display: "flex", gap: 4, flexWrap: "wrap" }}>
            {Array.from({ length: guests }).map((_, i) => <span key={i} style={{ fontSize: 20 }}>🧑</span>)}
          </div>

        </div>

        <p style={{ fontFamily: "Karla", fontSize: 14, textAlign: "center", marginBottom: 12, color: (date && time) ? "#495e57" : "#9ca3af" }}>
          {(date && time) ? `✓ ${formatDate(date)} at ${time} for ${guests} guest${guests !== 1 ? "s" : ""}` : "👆 Select a date and time to continue"}
        </p>

        <button onClick={() => setPage("details")} disabled={!date || !time} style={{
          width: "100%", height: 56, borderRadius: 16, border: "none",
          background: (date && time) ? "#495e57" : "#e5e7eb",
          color:      (date && time) ? "white"   : "#9ca3af",
          fontFamily: "Karla", fontWeight: 700, fontSize: 16,
          cursor: (date && time) ? "pointer" : "not-allowed",
          boxShadow: (date && time) ? "0 4px 12px rgba(73,94,87,0.3)" : "none",
          transition: "all 0.2s",
        }}>
          Continue →
        </button>

      </div>
    </div>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // DETAILS PAGE  (step 2 — personal info form)
  // ══════════════════════════════════════════════════════════════════════════

  if (page === "details") {

    function handleConfirm() {
      setSubmitted(true);
      if (validate()) { setConfNum(randomConfirmation()); setPage("confirmation"); }
    }

    // small reusable input row — not a component, just a function returning JSX
    function inputField(label: string, value: string, onChange: (v: string) => void, placeholder: string, type = "text") {
      const err = submitted && errors[label.toLowerCase().replace(/ /g, "")];
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontFamily: "Karla", fontWeight: 700, color: "#333", fontSize: 14 }}>
            {label} <span style={{ color: "#ee9972" }}>*</span>
          </label>
          <input
            type={type} value={value} placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            style={{ padding: "14px 16px", borderRadius: 16, border: `2px solid ${err ? "#ee9972" : "#e5e7eb"}`, fontFamily: "Karla", fontSize: 16, color: "#333", outline: "none" }}
          />
          {err && <span style={{ fontFamily: "Karla", color: "#ee9972", fontSize: 12 }}>{err}</span>}
        </div>
      );
    }

    return (
      <div style={{ background: "#fafaf9", minHeight: "100vh", paddingTop: 64 }}>
        {Navbar}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px" }}>

          <button onClick={() => setPage("reserve")} style={{ fontFamily: "Karla", fontWeight: 600, fontSize: 14, color: "#495e57", border: "none", background: "none", cursor: "pointer", marginBottom: 24 }}>← Back</button>
          <Steps current={2} />

          <h1 style={{ fontFamily: "Markazi Text", fontSize: 52, color: "#333", margin: "28px 0 4px" }}>Your details</h1>
          <p  style={{ fontFamily: "Karla", color: "#6b7280", fontSize: 16, margin: "0 0 24px" }}>Almost there — fill in your information to complete the reservation.</p>

          {/* ── reservation summary badges ── */}
          <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: 20, marginBottom: 24 }}>
            <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#9ca3af", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 12px" }}>Your reservation so far</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {[
                { label: "Date",   value: formatDate(date), emoji: "📅" },
                { label: "Time",   value: time ?? "",        emoji: "🕐" },
                { label: "Guests", value: `${guests} guest${guests !== 1 ? "s" : ""}`, emoji: "👥" },
              ].map(b => (
                <div key={b.label} style={{ background: "rgba(73,94,87,0.07)", borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10, flex: "1 1 auto", minWidth: 140 }}>
                  <div style={{ background: "rgba(73,94,87,0.12)", width: 32, height: 32, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>{b.emoji}</div>
                  <div>
                    <p style={{ fontFamily: "Karla", fontWeight: 600, color: "#9ca3af", fontSize: 11, margin: 0 }}>{b.label}</p>
                    <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#333",    fontSize: 13, margin: 0 }}>{b.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── form fields ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {inputField("First name", firstName, setFirstName, "e.g. Maria")}
              {inputField("Last name",  lastName,  setLastName,  "e.g. Rossi")}
            </div>

            {inputField("Email address", email, setEmail, "you@example.com", "email")}
            <p style={{ fontFamily: "Karla", color: "#9ca3af", fontSize: 12, margin: "-12px 0 0" }}>We'll send your confirmation to this address</p>

            {inputField("Phone number", phone, setPhone, "+1 (312) 555-0192", "tel")}

            {/* special requests */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: "Karla", fontWeight: 700, color: "#333", fontSize: 14 }}>
                Special requests <span style={{ fontFamily: "Karla", fontWeight: 400, color: "#9ca3af", fontSize: 12 }}>(optional)</span>
              </label>
              <textarea
                value={requests} onChange={e => setRequests(e.target.value)}
                placeholder="Allergies, dietary needs, occasion, high chair, seating preference…"
                rows={4} maxLength={300}
                style={{ padding: "14px 16px", borderRadius: 16, border: "2px solid #e5e7eb", fontFamily: "Karla", fontSize: 15, color: "#333", outline: "none", resize: "none" }}
              />
              <span style={{ fontFamily: "Karla", color: "#c4c4c4", fontSize: 12, textAlign: "right" }}>{requests.length}/300</span>
            </div>

            {/* privacy notice */}
            <div style={{ background: "rgba(73,94,87,0.05)", border: "1px solid rgba(73,94,87,0.1)", borderRadius: 16, padding: "12px 16px" }}>
              <p style={{ fontFamily: "Karla", color: "#6b7280", fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                🔒 Your details are used solely to manage your reservation and will never be shared with third parties.
              </p>
            </div>

            <button onClick={handleConfirm} style={{
              width: "100%", height: 56, borderRadius: 16, border: "none",
              background: formValid ? "#495e57" : "#e5e7eb",
              color:      formValid ? "white"   : "#9ca3af",
              fontFamily: "Karla", fontWeight: 700, fontSize: 16, cursor: "pointer",
              boxShadow: formValid ? "0 4px 12px rgba(73,94,87,0.3)" : "none",
              transition: "all 0.2s",
            }}>
              Confirm reservation →
            </button>

          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // CONFIRMATION PAGE  (step 3)
  // ══════════════════════════════════════════════════════════════════════════

  if (page === "confirmation") return (
    <div style={{ background: "#fafaf9", minHeight: "100vh", paddingTop: 64 }}>
      {Navbar}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px" }}>

        <Steps current={3} />

        {/* ── confirmation banner ── */}
        <div style={{ background: "#495e57", borderRadius: 24, overflow: "hidden", marginTop: 28, marginBottom: 20 }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontFamily: "Karla", fontWeight: 700, color: "rgba(250,250,249,0.55)", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 4px" }}>Little Lemon · Chicago</p>
              <h2 style={{ fontFamily: "Markazi Text", fontWeight: 600, color: "#fafaf9", fontSize: 22, margin: 0 }}>Reservation Summary</h2>
            </div>
            <span style={{ fontSize: 36 }}>🍋</span>
          </div>
          <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f4ce14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>✓</div>
            <div>
              <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#fafaf9", fontSize: 16, margin: 0 }}>Reservation confirmed!</p>
              <p style={{ fontFamily: "Karla", color: "rgba(250,250,249,0.7)", fontSize: 14, margin: 0 }}>Confirmation #{confNum}</p>
            </div>
          </div>
        </div>

        {/* ── detail rows ── */}
        <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: "0 24px", marginBottom: 16 }}>
          {[
            { label: "Date",       value: formatDate(date),                                   emoji: "📅" },
            { label: "Time",       value: time ?? "",                                          emoji: "🕐" },
            { label: "Party size", value: `${guests} guest${guests !== 1 ? "s" : ""}`,         emoji: "👥" },
            { label: "Name",       value: `${firstName} ${lastName}`,                          emoji: "👤" },
            { label: "Email",      value: email,                                               emoji: "✉️" },
            { label: "Phone",      value: phone,                                               emoji: "📞" },
          ].map((row, i, arr) => (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
              <div style={{ background: "rgba(73,94,87,0.08)", width: 36, height: 36, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 15 }}>{row.emoji}</div>
              <div>
                <p style={{ fontFamily: "Karla", fontWeight: 600, color: "#9ca3af", fontSize: 12, margin: 0 }}>{row.label}</p>
                <p style={{ fontFamily: "Karla", fontWeight: 600, color: "#333",    fontSize: 14, margin: 0 }}>{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        {requests && (
          <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: "20px 24px", marginBottom: 16 }}>
            <p style={{ fontFamily: "Karla", fontWeight: 700, color: "#9ca3af", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.2px", margin: "0 0 8px" }}>Special requests</p>
            <p style={{ fontFamily: "Karla", color: "#4a5568", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{requests}</p>
          </div>
        )}

        {/* ── cancellation policy ── */}
        <div style={{ background: "white", borderRadius: 24, boxShadow: "0 4px 12px rgba(0,0,0,0.07)", padding: "20px 24px", marginBottom: 20 }}>
          <p style={{ fontFamily: "Karla", color: "#6b7280", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            📋 <strong style={{ color: "#495e57" }}>Free cancellation</strong> up to 24 hours before your reservation.
            Call <strong style={{ color: "#495e57" }}>(312) 555-0192</strong> or email <strong style={{ color: "#495e57" }}>hello@littlelemon.com</strong>.
          </p>
        </div>

        {/* ── action buttons ── */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={() => { reset(); setPage("home"); }} style={{ flex: 1, height: 56, borderRadius: 16, border: "2px solid #495e57", background: "none", color: "#495e57", fontFamily: "Karla", fontWeight: 700, fontSize: 16, cursor: "pointer", minWidth: 200 }}>
            ← Back to home
          </button>
          <button onClick={() => { reset(); setPage("reserve"); }} style={{ flex: 1, height: 56, borderRadius: 16, border: "none", background: "#f4ce14", color: "#333", fontFamily: "Karla", fontWeight: 700, fontSize: 16, cursor: "pointer", minWidth: 200, boxShadow: "0 4px 12px rgba(244,206,20,0.3)" }}>
            Make another reservation →
          </button>
        </div>

      </div>
    </div>
  );

  return null;
}
