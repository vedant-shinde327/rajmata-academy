import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone, MessageCircle, Menu, X, Star, Award, Users, BookOpen,
  CheckCircle, ChevronRight, MapPin, Mail, Trophy, Target,
  GraduationCap, Clock, Zap, Heart, Search, Filter, Plus,
  Trash2, Edit3, Bell, LayoutDashboard, Image as ImageIcon,
  ChevronDown, ArrowRight, Quote
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const TOPPERS = [
  { id: 1, name: "Divyaraj Khandare", marks: 100, total: 100, class: "10th", year: "2024", subject: "Mathematics", avatar: null },
  { id: 2, name: "Disha Lohate",      marks: 100, total: 100, class: "10th", year: "2024", subject: "Mathematics", avatar: null },
  { id: 3, name: "Triveni Dhadkakar", marks: 100, total: 100, class: "10th", year: "2023", subject: "Mathematics", avatar: null },
  { id: 4, name: "Vaishnavi Garje",   marks: 100, total: 100, class: "10th", year: "2023", subject: "Mathematics", avatar: null },
  { id: 5, name: "Data Kote",         marks: 100, total: 100, class: "10th", year: "2022", subject: "Mathematics", avatar: null },
  { id: 6, name: "Priya Shinde",      marks:  98, total: 100, class: "10th", year: "2024", subject: "Mathematics", avatar: null },
  { id: 7, name: "Rohan Patil",       marks:  97, total: 100, class: "9th",  year: "2024", subject: "Mathematics", avatar: null },
  { id: 8, name: "Sneha Deshmukh",    marks:  96, total: 100, class: "8th",  year: "2024", subject: "Mathematics", avatar: null },
];

const TESTIMONIALS = [
  {
    name: "Ananya Kulkarni",
    role: "Class 10 Student",
    text: "Kadam Sir explains each concept so clearly that even the hardest problems feel simple. I scored 98 in Maths thanks to his guidance. His teaching style is truly unique.",
    stars: 5,
    type: "Student"
  },
  {
    name: "Mrs. Sunita Lohate",
    role: "Parent of Disha Lohate",
    text: "My daughter scored 100/100 in Mathematics. We are extremely grateful to Prof. Kadam Sir. The academy provides personal attention and regular tests that kept her on track.",
    stars: 5,
    type: "Parent"
  },
  {
    name: "Divyaraj Khandare",
    role: "100/100 Topper, Class 10",
    text: "Scoring 100 in Maths was my dream, and Kadam Sir made it possible. The doubt-solving sessions and small batch size helped me understand every topic thoroughly.",
    stars: 5,
    type: "Topper"
  }
];

const ANNOUNCEMENTS = [
  { id: 1, text: "🎉 Admissions Open for 2025–26 Academic Year!", date: "June 2025" },
  { id: 2, text: "📚 New Batch Starting 23rd July — 8th to 10th Mathematics", date: "July 2025" },
  { id: 3, text: "🏆 11th Mathematics + MHT-CET Batch from 1st August", date: "August 2025" },
];

const GALLERY_ITEMS = [
  { id: 1, category: "Toppers",    label: "Board Exam Toppers 2024",    color: "#7B1B2A" },
  { id: 2, category: "Classroom",  label: "Mathematics Lecture Session", color: "#2C3E6B" },
  { id: 3, category: "Events",     label: "Annual Prize Distribution",   color: "#1A6B3A" },
  { id: 4, category: "Toppers",    label: "100/100 Achievement Wall",    color: "#7B1B2A" },
  { id: 5, category: "Classroom",  label: "Small Batch Teaching",        color: "#2C3E6B" },
  { id: 6, category: "Celebrations", label: "Students' Day Celebration", color: "#6B3A1A" },
  { id: 7, category: "Events",     label: "Parents' Meet 2024",          color: "#1A6B3A" },
  { id: 8, category: "Toppers",    label: "District Topper Felicitation",color: "#7B1B2A" },
  { id: 9, category: "Classroom",  label: "Doubt Solving Session",       color: "#2C3E6B" },
  { id:10, category: "Celebrations","label": "Diwali Celebration",        color: "#6B3A1A" },
  { id:11, category: "Toppers",    label: "Science Olympiad Winners",    color: "#7B1B2A" },
  { id:12, category: "Events",     label: "Exam Result Announcement",    color: "#1A6B3A" },
];

const WHATSAPP_MSG = encodeURIComponent(
  "Hello Sir,\n\nI would like to enquire about admission at Rajmata Jijau Academy.\n\nStudent Name:\nClass:\nSchool:\n\nPlease provide details regarding fees and batch timings."
);
const WA_LINK = `https://wa.me/918208664612?text=${WHATSAPP_MSG}`;
const CALL_LINK = "tel:9206079696";

// ─── THEME COLORS ─────────────────────────────────────────────────────────────
const C = {
  maroon: "#7B1B2A",
  maroonDark: "#5A1220",
  maroonLight: "#9B2535",
  gold: "#C9A84C",
  goldLight: "#E2C96E",
  cream: "#FDF8F0",
  white: "#FFFFFF",
  dark: "#1A1A1A",
  gray: "#4A4A4A",
  lightGray: "#F5F5F5",
  border: "#E8E0D0",
};

// ─── UTILITIES ────────────────────────────────────────────────────────────────

function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function Avatar({ name, size = 80, bg = C.maroon }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${bg}, ${C.gold})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: size * 0.3, fontWeight: 800, flexShrink: 0,
      letterSpacing: 1
    }}>{initials}</div>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = ["Home","About","Courses","Results","Gallery","Admissions","Contact"];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled
    ? "rgba(123,27,42,0.97)"
    : "linear-gradient(180deg, rgba(123,27,42,0.95) 0%, rgba(123,27,42,0.7) 100%)";

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: bg,
      backdropFilter: "blur(12px)",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
      transition: "all 0.3s",
      borderBottom: `1px solid rgba(201,168,76,0.3)`
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        {/* Logo */}
        <button onClick={() => { setPage("Home"); setOpen(false); }} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0
          }}>
            <GraduationCap size={22} color={C.maroon} strokeWidth={2.5} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 15, lineHeight: 1.1, letterSpacing: 0.3 }}>RAJMATA JIJAU</div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, fontSize: 11, letterSpacing: 1 }}>ACADEMY</div>
          </div>
        </button>

        {/* Desktop Links */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
          {links.map(l => (
            <button key={l} onClick={() => setPage(l)} style={{
              background: "none", border: "none", cursor: "pointer",
              color: page === l ? C.gold : "rgba(255,255,255,0.85)",
              fontWeight: page === l ? 700 : 500, fontSize: 14,
              padding: "6px 12px", borderRadius: 6,
              borderBottom: page === l ? `2px solid ${C.gold}` : "2px solid transparent",
              transition: "all 0.2s",
            }}>{l}</button>
          ))}
          <a href={CALL_LINK} style={{
            marginLeft: 8,
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            color: C.maroon, fontWeight: 700, fontSize: 13,
            padding: "8px 18px", borderRadius: 6, textDecoration: "none",
            display: "flex", alignItems: "center", gap: 6,
            boxShadow: "0 2px 8px rgba(201,168,76,0.4)"
          }}>
            <Phone size={14} /> Call Now
          </a>
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", display: "none" }} className="hamburger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            style={{ background: C.maroonDark, overflow: "hidden", borderTop: `1px solid rgba(201,168,76,0.2)` }}>
            {links.map(l => (
              <button key={l} onClick={() => { setPage(l); setOpen(false); }} style={{
                display: "block", width: "100%", background: "none", border: "none",
                color: page === l ? C.gold : "rgba(255,255,255,0.85)",
                fontWeight: page === l ? 700 : 500, fontSize: 16,
                padding: "14px 24px", textAlign: "left", cursor: "pointer",
                borderBottom: `1px solid rgba(255,255,255,0.06)`
              }}>{l}</button>
            ))}
            <div style={{ padding: "12px 24px 16px", display: "flex", gap: 10 }}>
              <a href={CALL_LINK} style={{ flex: 1, background: C.gold, color: C.maroon, fontWeight: 700, fontSize: 14, padding: "10px", borderRadius: 6, textDecoration: "none", textAlign: "center" }}>📞 Call Now</a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, padding: "10px", borderRadius: 6, textDecoration: "none", textAlign: "center" }}>💬 WhatsApp</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function StatCard({ value, label, start }) {
  const num = parseInt(value);
  const suffix = value.replace(/\d+/, "");
  const count = useCounter(num, 2000, start);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      style={{ textAlign: "center", padding: "24px 16px" }}>
      <div style={{ fontSize: 44, fontWeight: 900, color: C.gold, lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginTop: 6, fontWeight: 500 }}>{label}</div>
    </motion.div>
  );
}

function TopperCard({ topper, rank, compact = false }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      whileHover={{ y: -4 }}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(123,27,42,0.12)",
        border: `1px solid ${C.border}`,
        position: "relative"
      }}>
      {/* Gold top bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${C.maroon}, ${C.gold})` }} />
      <div style={{ padding: compact ? "20px 16px" : "28px 24px", textAlign: "center" }}>
        {rank && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
            color: C.maroon, fontWeight: 800, fontSize: 12,
            padding: "3px 10px", borderRadius: 20
          }}>#{rank}</div>
        )}
        <Avatar name={topper.name} size={compact ? 64 : 80} />
        <div style={{ marginTop: 14, fontWeight: 800, fontSize: compact ? 15 : 17, color: C.dark }}>{topper.name}</div>
        <div style={{ fontSize: 12, color: C.gray, marginTop: 3 }}>Class {topper.class} | {topper.year}</div>
        {/* 100/100 stamp */}
        <div style={{
          marginTop: 12, display: "inline-flex", alignItems: "center", gap: 6,
          background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
          color: "#fff", fontWeight: 900, fontSize: compact ? 18 : 22,
          padding: "8px 20px", borderRadius: 40,
          boxShadow: `0 4px 12px rgba(123,27,42,0.3)`
        }}>
          <Trophy size={compact ? 14 : 16} /> {topper.marks}/{topper.total}
        </div>
        <div style={{ fontSize: 11, color: C.gold, fontWeight: 700, marginTop: 6, letterSpacing: 0.5 }}>MATHEMATICS</div>
      </div>
    </motion.div>
  );
}

function HomePage({ setPage }) {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });

  return (
    <div>
      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${C.maroonDark} 0%, ${C.maroon} 50%, #3D0E17 100%)`,
        display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        paddingTop: 68
      }}>
        {/* Background pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)` }} />
        {/* Decorative circles */}
        <div style={{ position: "absolute", right: -100, top: -100, width: 400, height: 400, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.15)` }} />
        <div style={{ position: "absolute", right: -50, top: -50, width: 250, height: 250, borderRadius: "50%", border: `1px solid rgba(201,168,76,0.1)` }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px", width: "100%", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
          <div style={{ flex: "1 1 480px" }}>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(201,168,76,0.15)", border: `1px solid rgba(201,168,76,0.4)`, borderRadius: 30, padding: "6px 16px", marginBottom: 24 }}>
              <Star size={14} color={C.gold} fill={C.gold} />
              <span style={{ color: C.gold, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>VASMAT'S PREMIER COACHING INSTITUTE</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 8 }}>
              Rajmata Jijau<br />
              <span style={{ background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Academy</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ fontSize: "clamp(16px,2vw,22px)", color: "rgba(255,255,255,0.85)", fontWeight: 600, marginBottom: 12 }}>
              Mathematics Excellence From 5th To 11th
            </motion.p>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
              {["100/100 Results","MHT-CET","JEE Foundation","Marathi & Semi English"].map(tag => (
                <span key={tag} style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.9)", fontSize: 12, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>{tag}</span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button onClick={() => setPage("Admissions")} style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                color: C.maroonDark, fontWeight: 800, fontSize: 16,
                padding: "14px 32px", borderRadius: 8, border: "none", cursor: "pointer",
                boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
                display: "flex", alignItems: "center", gap: 8
              }}>Apply Now <ArrowRight size={18} /></button>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{
                background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.3)",
                color: "#fff", fontWeight: 700, fontSize: 16,
                padding: "14px 28px", borderRadius: 8, textDecoration: "none",
                display: "flex", alignItems: "center", gap: 8,
                backdropFilter: "blur(10px)"
              }}>
                <MessageCircle size={18} /> WhatsApp Enquiry
              </a>
            </motion.div>
          </div>

          {/* Faculty card */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            style={{ flex: "0 1 320px" }}>
            <div style={{
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              border: `1px solid rgba(201,168,76,0.3)`,
              borderRadius: 20, padding: 28, textAlign: "center"
            }}>
              <img
                  src="data:image/jpeg;base64,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4gAAoEibnbbaaeG7fhJtf957WH7R9xxxxxT44wwww84wwAAAMMHiek4YZZZk4MfnZx1MQABc0sdpBBBBBBjNAAAAAAAEc888gZlrbaaaPrPd9dlJBNqvf1VpWPBFNxxlJRD08888884gAAbGmkYZZFr/APfWZXTPO41783XabIwTzwwUcScUcMMAAAAAAGSZZ1lpv/8A3XmXlBLNucPLNvyvvPMMNPPOd3HGEAAAAAxzxMpqqmnn333kH00nVfoXqfmxM31Ys888MMMPOd28AARzzzyXVVVbN/n2EX0X2jv+Tt08WM/eXV//AP8A+9/zzww4+fPPKAAF1lln3/fYXeZTeYV+8y0rmE2FuwBzzzzzz8//AM8tPmAAAABw33obnWF3l3mEFLPei+YGch+lb/vP/PPPP/8APLzvZAAAAAqq639t5dld5BBZeUelnjbWLldQ/wA88/8Ae888N/8A/vPnMMMMpp+/lhdh9xBF1ZFFzoe9zJElOd7zzz//APz38/7y08//ADzzxSFbXlWn+EEWWEXmbWe42LSLziEcsMM88/PPP/8Af3PTf888eS9ZF59hBF5hHzfhLdsRXF+zYBBBBBBBBxhNPDz/AG9y9PPK/wB1Xl3kEWUE+/dvX7WqfCr1Yg013333200kEHHEPe/dfzyvOl3X2EEkkeftl0KM+2wg019v32000013nE00kGEPu+UACt1W30EFlkOftOluWCQBTvy7j3nHE0001HHG03n00GEucACq112EE3kMemEU9PHF+LvoCXGvvf3HHHHHHW03GV3E0GEkC/e3kEXUX+sdlOPOHX2nE80k98+9/fP/AB999d9xNdxNxthApf8A4wWSQ+RdJQ+f08YQy/2SKweZU4w7zwww089fXdXdSbwPq6wySUdw90WfWwwQ9X0bf1WzywUS6z2096wzyw8/WZWcwFd4w4Yf6SV/1/f7wRZ2y0Ve+R+19310bxwww8w4ww17fYwKfw1VRTzX0d/wzcy9STxwQcabyxzzza64289zzw0xxw04wIywyaUaUx443x0Vw0QUfyQWbWxxb0zQ+T389zy8zy0zw0QPqxdRdUVVa6wQ1+cUVRd/xTQawQQQ+9wdS+ojutis7wssQNIyaVW3awfwwQbafTQwzf50VRwQSV816y55spnolursjiQDQ/Qaa7Y/UT8wec0/xx0f08ba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uInIn+Pljrirr/332TAMEFUP9/WMefXEvFAkFmZn33k9pWIS8GP9dfRCwrZ3331YKtVF0OsvtPNHNFt9zkBoQx2AQjLZ6FekFnWlNwhiT33315SSctkOfd8cdelXVO3QM/ru8E2IKkQgo3kMv+1jwl33332eeaaANe98sNsM98sPXmxhFNRWceuNsThk0U1cY47z33331I6edktd/r9dutM8EHvdv2nc9/eX1HuURjOccfBbz333331VlllQTg/q77Mf03193clFNOW9XmPFsWMXEVTrCT3333332RheOusbSrJL9OVWdOkdtvdWMl3mVI/kj6xwJqT33333333MePsZabZJSLduWUBBKaoaQ8EdlHdT5hQ5rDIT3333333306JqaKpdVkshuN+ccPaDNuDSaKU+MvPwrrL9z3333333330X0XkG1UOutfHkvP8A328/D55BFZHHr3kCv8999999999999f/AF6163691kmj9qN88f8Ae81P+Pv0Ntfdx33333333333332IJ6pYLarYudk2VlwJymVEFfMNVbKa333333333333333337774L+L4N+H0H32F313512MN9733333333333333333333/xAAsEQACAgAGAQIGAgMBAAAAAAAAAQIRAxASICEwMQRAExQyQVFhIjMjUHFS/9oACAECAQE/AL/2Fl7b32jUW+qivZWWWXney83IvbaLRaLXRQ0++9l7Lzs52st7EJ9LQ132XnZfU3vstZ0UVsa92+C3vrJMTsrNlFFZtV2XlZZYl0SyrO1laNa/JaaErI8b2UUUNdNll5WWRXTJlkseKdM+Yj+T5mI/UnzMmfFY5swW5RQuMl0soca6LLysshH79UiclGNjk5Ss0M0NfkoSKY+D0zVDZHsY1W+87IRt9cmm6s9TJ1SIzIzk/sSl+jExZqSow5NicUuSUofhnppcsXJFUu1qxqn0xTk0kKNKuqX0sePNYnLMTmGoXBDHSMXE1J0JN+TDaRGcPuYrV8GBPTZ6aTnb75K10WYMaVvy+t8o9RGsUl/SkaWaWWyKGmpHJbIcJnpV/j9hJfffhQ1S/SK7PV4L8km/hxyadEF+jRL8DiUNcGHBujAjUK9g1e/Bhph+31UUUTgmuTFgksnFaUKMURmv/JJRf2Fhp3SHF8o9Ph+BKsrLLLLL6pr77cKOqaXVWxoxokok09CojP8AJGVjmkYeI22aW5GCqRZe+yyy9zVrb6aPDl01sscidMlAcbjRODTIOh2zCh5ZGHJBUu2yy9klzshHTCK6K2Xk3ZOTRh4y+5GpeDEwmxYVEYJs0qKIxTViXsLzmuM8JasSK6K3Xk4pk/TRfgUpYYsf8nxICxIE8W2kQ+heyssefpl/Nv8AC6rLNRq2UaIksCL8EsCSJXEw25SRh/R7NFj85em+mT/e+srLNeVlFbbJ4cZJ2j0+EtbYuMrL9k/OWAqw10Wai9l7KKyfgwPqZXtZZYX9cd1ZN10VtojGpWJ+1llh/RH/AIt9j5zrbRW2hbl3yyw/oj/xba6r7ky+55YX9cdtljeVl7KK6FvXc8sH+tbaylnWVFe/eWA/4tfve1k+C9tFd7kJ9jywHUmulqyu1DZZYnznZV9+G6mtlbb230xH4zXtIu4p53trvfjNZUXRaoeIrE011PZhPhrZedF7LfdFWUNpIninxXQpPUjDfBYn0PZB1JdNewZAZjYjposbZDymYX05IsT68N3HprK+1kCb4ZiqVliSKdmFaRYnnYnm90HT31nWdjk0L1K+6PmYHzMCD1qy1bWVmosYnRJyPh6vJ8vEXp4oWHE0qit1l9GHK1XTWdZTwoyJ4bi+UPgwMVSjpHB3Y5JeS72WMTLLytForJrsTp2J2umikUUUiUE0fLpmFhPDmRqmY8nroh4zsUWaR2hSReVEVzkh9sJU+ysmyiuBNrwPB1Stiw0kfDRoRpRVZaUPCizRJCgzSRjyUUS7oy+3XzlSKOTkoSLRazrbQkUNpIffF9NZ0istKNKGimciky86KRRSLSHP8Db9ipbuDjOt9o4KKMV1EjiyQsRnxFR8ZDxRyte0UttZWy2XnZaLWTRQsnFNcjhGmP8AGyvargT38lss0oo0vNLNEvDPv7tPdazvpbdD8+9svOs633lLw/8AQ2X02jUhzZb90+pbn7X/xAAtEQACAgEBBwMEAgMBAAAAAAABAgARA0AEEBIgITAxE1BRFCJBYTNxMlJyQv/aAAgBAwEBPwDSVKlGVp6ld+pXaqVqa7tHt1ryQIDurdUoyjqKlc5NQnmPWBKlc1a5m5+LrU4ezWlrdXKzfgc5IEQdbO6+SpRnCZe46mo7/gdhoo3LhLCxPp2+INmMGyifTLPQWeiszLT7iNTlf/yOyRFMxqWNCKoQT1ROMGXOKcQlgzaAQ53HSVvqZX4RQ89sKfNTZQLuOoaHGv8AtFBXwZgTG6HimdAt8M+75EUPNpU0DLhOnchVJMZixJPaTqQJ6CHHMQK5ahW4dn/cTCR5niOCbhxG+kRSB1mZOMATacapQ/OozvxNQ8DtqaMwtxYov8xlwG4TCYOohAglXU2s3l0+Z+BP2fHd2XIfBMWvWMqKRdRmX5nEvzEdfmEbnYKDMrcT3p878Tn4HdDEGxMTffc4hOJi5qEEz0z/ALRVI/M9Ygi5xDhubRl8jT5n4MbHv4mporRCOMwKDCE+YFUzKiicVIBM5ttPtb/cq/HfQG4rVAaa4jgw40gAEzPZAjv9sY2dPkbjdm+T38VMaj4fiGx5mN6/M9Qw5IWsxmN1p87cOJz+tApKm4m0sPM+zLDg+J6eSHFkMTB0uP0c6fbGpFHydDUDFfEXaHHmY9pU1cDI3iZRSN/UP+R0+2n71HwNKmR1I6zPlPAoh86fajeZv1WlHkTOeif1pjuzm8z/AN6ZmvTHdl/lf/o+3Zf5X/6Pt2b+V/79sO7aBWU+2HdtQ+9T+vbDu2kWoPwfbsotGHt7imI1tGAXPSarhsHtHkzDqDrFBY0Jjw0BcTAoa4UHCRMwp+0eRxxKRrNlw+WO6hCTM98ffyLTapZgcFQJQ+YYXUDzM5BfsnmcWO8gDGjBspPgz6Vp9M0YUanXmMxlPzPWC+J9S8Od4XY/nQuKPdETM6THmDjzPMz4iuS5xQISLGjPYPUQiu8rFTYi7UwmXMuQSpgUcBj9HbmCgw42ErsntML0FbkzlRQh6knmBqLkIMLowh86Mj2I90j2An2TAAzdY2NIQLNc5Ot6y+dTw+Jxt7FYljcDUsTp3L1tSpfduX7Xcv38co9n/8QAQBAAAQMBBAcGBAQFAwQDAAAAAQACAxEEEiExEBMgMEBBUQUiMlBhcRRCUoEjM2KRNENyobFgwdEkU2OCcPDx/9oACAEBAAE/Av8A4BoTkFqZT8hXw030r4STqF8G/wCoL4I/Wvgv/J/ZfBfr/svgnfWF8FJ9TUbJN6I2aYfIjHIM2H/RQBOQQs8h5UQsnVyFmiHKqEbB8o3xaDmEbPCfkCNij5OITrFJycCnQStzYf8AQTY3uyCbZjzKbBGOXEOjjf4mhOsUZ8JIT7JM3lX2RBGY87AJyTbO7ngmxMby3lVXgXMa7xCqfYWHwmiks8rM24dR5uGudkE2zj5kABlunSMbmU61DkF8TJ7IyPObl3uqJeOa+ImHVMt7h4go7VE/nwMlmifyoeoUljkb4e8PMw0uyTYRz3cloDAcO90TrSXKqx6qhWHNGnKqqr45rulGIdaKKeWM0rUKO0Mf6HgZIY5PEPupbHI3w94eYNh+rdjMKd7mmQc/9kxrXXnk94Y480SMSRiqhy9FUhVH0p1fpV5XWlFjgmO5HJOpyTXkOFVC8ObUGo4KWzxyZjHqpbPJH6jr5Y2MlBoGW8MjdYbpoBgD1UkrWyONMxig4nqU9taVwWr9VdVWoq8UMUW+iGKMXRBp6qlU2R0dKf8A6o5w7mg7gprG12LMD0TmuYaOFPKWx9d4SApJ3UOr5IYwGQju1w90cTVD1JVR0VwdEWoDoQiR0WPIIVWB5osV4rML/wC1V28rzhgW1Uc5bll0UMokbUcFJGyQUcFPZnx45t6+TBpKDQN40FxoFa6gXRma4rFsYI5rWVbc+WtaeqaDVHmh7LurNXTyCId0TRREFGnRVRFVWioiaZrB3NEOaVFJcLXj7hVBFRwc9j+aP9ll5G1ld85xblVWijqn1T3Vgb1AxVCAfVRhOYcwqk4FDBXQslekHNGVyEjgr1eSu1WWSJa4JppUKt4UWIK1lc0x91yszu5Tpwk9mbLjk7qnscx1HDyFrOu/nL9VhyKcSXYroiCPVVFUSR6hF3oi4Jry32WeRRZ+oKjEbg5LBCoUmd4Ln6FHAqukKwO8SB4SWFsraFSwvidQ/vx7W8BPM11Wfs4c0fVAqqwXhyxC9WruOzbii0Dkg66r9VVBFrhzV53MIkoA5ItOwGqx4F6rSQU58K9jZG3XBTwOid6cjxrW8BaJDDFli/IqXOuRPROWK99GKqr1UfZUCDShGUIiUIXIWUoWRfCgJ1nwU7LrtACbgonG/RRt/Ezy4Z7GvaWuGCngdE705HiwOBlYHEVxwwU4LSs8VRGigjL/AGQsjU6yL4RfCFfB+iZZKckLOEIQhEriuq6nhWxiY3HFUoqpru8rNTPh3sa9paclPC6J1OXI8SBwV2+TjTBWnAuaeXNF1ctAYrNDRoQarquK4riuqipsFPVoyUnJVRKYe8rKa/LTiJI2yNLXKWJ0T7p4cDg2NrK09AVM9r3GnVOqgrIzWSeiaKaLwQcEKbZRTlaW9w0TnVoq6LNFfeE1oHEzwtlZQ58intcxxac+FHCTSFkMhbmnRtbC2o5VTjh99FjiuRooukR1vRGaUck22yN5KG2Xk2QOV9qvBOnaE7tFgXxwcteteFeD6p4o4j1QTWYqCO6wdeLtVn1rajxDyl7bzCFPLI0FvXD7JxBpQZKztvyN901tGqiq0LWxp0jPpUhiPKijY0ZKJOYaonBSVJWqZXvOUdmgQs8QGSfZ2FNiDFa23Z3IKxwZvP24222f+a378GOFHJTWcSyEKWxFrTRdmREzNwT20TlIye9Wi1VYiXudeHIKM/ikFjrpy91PZrjRddXDIqNhr0UIVFKMFIwp9ne1mswGIUTql9JR3RzGakdLEGl7SKjNRzF3/KOSt7e+0qGzue4YJraADjSKq0w6p/ocuBHDM8QTG94+6kLRmrAG6yo6KXNUV1OjRj9Fqk2JNbTQ8IsqjG7Eck2yxgg3VIwyeJMga3IItRjD5m16FXacfPCJYy39kQQSD5MM00ZlSF0jrqsbAx4H6VJ4lRUVFRXVRDQ7RRUVND1WkrUfILfB/NH38nae6jCBV7VZX1dX0TvEhpKL0KoaHBc0CqaXIjvNRz8gIBBBU8RikLf28mYVkmGjxRVxQVUXJ703NXwhIFfTnDRWia7QU7yO2w347wzb5PStSqi8gcVVFyfLRN7x0TNZ8xKa+Jju6ULSE+QO+chRh9atlJGgOoUHIlPcmmtfI7VDqpT0OI8mtFqdFGMKqySSOZJ3q95X8VfRKlkxKjnWufVSvlLqJwer0gbmhewUNoLKptoBRkCY7BOcnuUH5Y9/I7ZFrIvVuPk1tBc1tFY+7E/+sVV7FNdomrUhN/DoXplpjdgGrVvwqzPJGz4/llGFmWrRgFPDRamMc8UGXWnGqE3eooHd1OKlOBUH5TPJLVFqpnDlmPJXxhwTWXNY2qaSU1ya5TDvgpjGuYKhNgY01AQc/DFCWSuIC1uPgTpgR+WpHNfX8JfCyXiWyUUtn1b6VUIoxOUzsCoxRjfbyS3xXor3Nvk047jiM1VNzTSpuSs7u7oqjaWNXxbFrmlZ6LSPxAsmp70PxJ2N/fyUgEEFSMLHuaeR8lIwUnjcmuxQOClyUL6JjlSqnsxdkvh3plnk6prbraIlOf8AiJxNE80CsLKl0nk3aMdHNf1wPktFaI8L3rigmuwTskH0UMmKD0SsEApDQKSTBVxKv91G9I+gUUYjYG+TWqO/A8fceR2eIPveicynyhGqOIcCrRBddeAw0HJFRuxTHYK8g5Xqc1O/NPOWKriVeJwCs9nEYrz8onZq5Xt9fIrG3uuKcwOzT4OicO+UQprPXwYFYjByLEMCmyYK+tYtYnyJzrxVMFZLPcbecMfKe0mUex/UeQhWYfhDS+Jj8wpLI4eHFPZjipYQ5Fjmqg6ICixonJz+i71UM8FZ7NShdn5VbmXrOfTHyKL8tuzJGx4xCksbuWKkjIzCdGixXVq3Hmvh39V8L1UdnAOSDaK4XMe6mR8pc281zeoRwPkDIHuTRRoG25jHZtCksETssFLYZWcqoxq7RNV1BqY1t9oKLRqy0ZeVWtt20Se9f34qmiiDCcgm2Z5zUcLGbx8Mb82hSdnt+Qo2d7MwgxUV7/qIh7pilHfPlPaTfxWO6t4ammiomsc7IJll+pBrRkOAIqn2cZhPNFBZbzhK84DJNpyUoN93lPabfwmO6O4aiomRudkE2yfUU2zxt5IYcJIayEfqQFABoNCnQtPojZ3rUv8ApRaenktuFbM/hmRuccAo7IB4kABlw5wlr+pDIbRWrZ0WpYvh29U6zuGWPkM4rDIP0nhYYi8+ia1rRQDiDkUR3vvtUV1U2JYq4jNU8zYwucAo2BjaDipYC3H1QyHtuhofGHJ0ZHHzCksg/UeCCsjMb3FyNvMcPRQmsTd7dUkAOSc0jPjbT/ES/wBR4IKFt1gHGMFL3vuSNA0URTmhwRGPGWz+Jl9+BCgbekHHneOKCkHePGW7+Kk+3+NA4CyDxHysrkpGXvdHi7f/ABcn2/xoHAWTJ6G7KHHDPQQpGVx4u2/xUvvoG/Cs7LrPfeckOCO+OiVl08Vav4iX+s6G74KBl5+gbznwPLgaAihT2Fp4mY1mkP6jobvgrMyjK9d9z8je2808W3PfM8Q3/PSfIXeI8PaDSCU/oOlue+CGQ0jd8/IynZ8P2gaWWT7cCEOW8roPAnenPafHVHhu1XfhMb1d/jYGW9bmNkHZoqbgb47zntyjvcN2s78Vjejf87DMt6zxD38tbtz+Lhra+/apfen7bDN63NMNRXZG7PActARV4Ku07JNy25G3hwr3XGOd0FUTU12G+LfWY/h8AdA3zPDoCf4SiqU5puy/kNy5gKc0t4PtJ9yyu/UabQ3tkydtV3Ry4BopoGjBUCpsv/MbunNqERwXa8lZGM6Cv77UZw3tkOLuDHDV0ZzfbTUKqrQIuqg6hWel/iPBWmXWzyP6nDajPe3sBo9Dd00U0lBDh3GgUWMjj6aHSgGiLvVNeA0kp8pefRXiOagJcLx55Jru9peO9wNul1VmkPM4D77gGo3gNCo3VaNkbVVVV0nPiZCofmKnluNV6qMgyCqSAFRPcXvufumF1AEzNN0GMOT4y3gO15qvZF0xO4iPLe2d/epwBzQ4iRRYMUjr7qqQ3W1UIJN8oKR9AmRfugKKIbD23m79xDQScgppDLK955ncNNHDetNHBA7w7AHDHRIny924ECnO1slOQQV6gUQvm+fsqId6S7+6aabMkfMb7tWa5BcGb/8AG6idVvtvYjVjdsbV3Q7A8OU5SKhqpX3WlQRXWY5nNXU7vupyGaanPDW1UFW49U01O09lN7bp9faHO5DAbqN1129sp7pG2Nw4YIaKqqqhwJTimhSR3/eiu6yb0agFK6gTWXW+qosZHgchmmsd0Ucbq4jZKqVI3nu+0rRqbOQPE/AbyJ15vtvIn3HIGu/c9oJC1jeqrpqrwRkb1RlfXu3aIzOH0oWmuQBTH3t2QU8oTn6U6Z4BAq4lRQODclqpPpXw0xlvFuAyQgf0Xw3UqOGOMUA012CqaCKbq32jX2gkeEYN3kb7rt7Z3/LsjQNquiX8x2xU9dLbtCa5J9pc4937BRyF8gIyy5KOR0Z8JvclDPecMKOomm8K7uSIPCbZmDPFBrRy3ldiQd7c9p2nVQ3B4n4fbfQPqLvTeNNDVNO7KDeeiikiDkYnjlsOUIbcOAF7NPiuuoWVwITBZ/iI3AUxHcQMbZXhzScTdp1ULqSilfGoDy42UYbhxDWlxyGatVoNomc/9vbfNcWkFNIcARvIHd3brupY+Y0kIhwdVSxNkjBd+6fYTyAUdgfe8AA681DZAzPEhCUtnDvshxj/AA7jte1fyG/+/AWeShunI7yE0fuaqqrtuYDyRjIKMbhyTgrVMPhLtccEy0zsyc/70Rt1pPN32ouzp664uvfdSuxUD70TD6bI2qhVHXgHZbdrtLbPCX8/lHqnOLnFxOJ4GCW+2hzG7BoQht1Vd0NDmNOYVrsEjqOjx9EQ5rqOFDos7qB6LsVYP4du3UIuTnPV9yonWdrsu6fREWyLJ14IdoSDxNUdthdzoUCDkds7LstokAEnIK3Ws2mavyDwjgmuLXAhMeHtBG7hfUU2idmu23Yns0U477furRY5bPj4mdUH0rRRMfK66AoqMoOQCvtWsYtY1az0V55Xe5lUVUdNVVPiikzapLAfkNfRXbRDleCi7ReMHiqika9t4V2ToOl2W12tba/9Ow/1n/bhIZdW705oY7oGhqmOqK7B3YxR2iKhOs8XJgClnbZ3APNK80y0xOycCg4HTXRXcVV5Xlcj+gaK0V5XlVV0E6Kp2z2lbfh2XW/mO/t68NZp7puuy3cbrpQO6ppqhluKKaCOZlx7ahM7KgifeY5wVxtKImVpyBQlHPBBzXZHTVXwqg7BGwDsVVdFVXRXZtlqZZoi45/KOqlkfK9z3mpPD2Wf5HfbdRCrwsjuqqtdGZ2aqqrtEK4nWccsF+K39SM7R4mlNkY/wlYq+r6vq8ryrpqg5VVdFVeVVVXkNieeOCMyPOAVptL7TKXu+w6cTZrRf7rs/wDO5g8X2TsU06Rs103kNN5X1eV5XlVXytYrwOzRFidZm1qMCu+MwqVRroqq7FFTTXZDOuxLKyGMveaAK22x9qkqcGjwji7Nab/dd4v87iD5tBzqmndBEq8rw0URYriodkGivq+UHqumiLAnVarzXZHTVV2wFdVCUGgbEsrIWF7zQBW62vtT+jB4W8bZrVf7j8+vXbg+ZFNFXK7RXlVVVVVV0DRULPRgqLvIFw5oSOWs9FeYqNPNXFQ6bquY7FSqoldpBvcAwOaZarVH89R6pnaLSaOiN79KY8PNG1qsswgVVVVVeTdFNmeaOCMvkNArbbZLU+pwaMm8fZrZ8kh++1BkffRUtyRe9EvQkWsWsV9NcNJIVRept0HRXWq4OqueoVHqr1VfbQFRU2bU8ukc6jvsESTlG8/aiiZPrGfh0xxUMVwHqVSq1XQrVu6rU/qWpb1K1TUGN2rVa4rNHef9h1VqtctqfeecOQ6eQ2a2GPuvxb/hNIcAQcNiHwn30HS5uNVRXEWKibI5q1rlfV7vBBw672iptzOuxuQ0DMe+9t3aMVlF3xSfT/ypppJnl8jqnyOC0PhOGXRQzsmbVp+2mDIrBHaKKKqqjY1lFr/0r4hn0lGWMNqTRNlid4Xg7yum0YiioqKmI3lv7YArHZ8/r/4RJJJJqfJWvcw1aaFWe3Nf3ZMD15aIMnbkooojBEK88fMtbJ1WvPNqE8fshQ5FAeilsbgasyQEo+dwV+0/956ba7Uz5r3umW9x8UP7JsoIrQj3Wtj+sKoOR0koOwXvpcKqioqbq0WmGzsvSOp/urb2nNae6O7H06+/lNntskWB7zeisc8czXFjvtuTsFquq6rquq4hfHzFB831rWTeh+yDnfS39lj9Lf2VZPb7ItJzKuIAjJMnkb6ptpY70WB5poI0lFEKipubb2zHHVkHfd9XIKWaSZ5fI4k+Vse9jrzXEFWXtj5Zx/7BNc17Q5rgRuaKiuK4ri1a1a1auIMVxBiuK4ri1a1a1S1K1JCvyt9Vr28wQgQdBVFRU27X2jZrNg41f9IVr7StFqwJus+keXw2iaA1jfRWbteJ+EwuHryQIcKg1G3RUVFRXVdV1XVdV1UVNmippotW1BtNnns2m3WazfmPx+kZq1ds2iXCP8Nv9/M4bTPAaxvI9OSg7aYcJm3fUZJkkcjbzHAj00UVFRU4sZ6bT2lZLPgX3nfS3FWntq0y4R/ht9M1WvmzJHxmrHEH0UHbMzfzWh/rkVD2jZJspKHo7DTTRThyinTRRd6R4aPVT9uwNwhYXnrkFaO0rXaMHSUb9LcPPIbXaYfBKR6clD24/wDmxA+rVF2pYpP5l0/qwQIcKg1HDzWqzw/mStb6c1P25Zm/lsc/+wU3a9skyIYP0pznONXEk9T/AKBZJJGaseW+xUXbFtZ84d/UEzt7/uQfcFM7YsLs3FvuP+Ey1WV/hnYfvvnyRs8bw33NE/tOwMznb9sf8KTt6zDwRvd/ZSdvWk+CNjf7qW32yXxzu9hh/j/RTZHs8LiPZdn2idzxemefc7q3uc2HuuI9lNabS4kGeQj+o+U//8QALBAAAgEDAgUEAgMBAQEAAAAAAAERECExQVEgMEBhcVCBkaGxwdHh8PFgcP/aAAgBAQABPyH/AOArOH4F/AIEz+yP+6IFbD4P9f8ARMnp/Af5GJYl4ZqT2aZhD7P/AMVZ2PwaU8j+rRkG8mYL4+dg1+VJn/Yt+B7+aEp/EM+7Cv8Aj/wWQfJsvwbn83EklCXT5xd9T+cVF0SKGEMT2frbSEbGs/yN2vd35kBJv0KOEp3L099sou8nkL1d4CF2nshLCJctlPKxvdkg/wDwDnhvkw/2FqAyzowcXsxbonn3F+0C9+wz8DTVn6k+sF73v6EkrJclKWlqxYOCajJN3HtUN73HLExu0XyQqwG1BPV/JHZLboa2GdzUYVmnsMTnoF+rsyXH2GfT0m3CRrfASSUJcuLDDRqWsKGPJ2CVcJUO+kWMhWHmEHlfRN3F39CyzkdknDE/9j8Ui5M12Ik2kUOiJfYNonW12X79MvLshXZy0paSy8C9pL1DQL0zVo93qXqJiWwJtJk1dsWpDGzoQCRlwxoRJDXuI1QTt5CcqHqhxgjITJ/cuw0KeOCCCCOKU/HGPLjekJNuEhSvc+YhluBRtz1LQh+hByM33oUCwpmeAIkjQtiG22SLFhPKskS38CU8lphNyrzsIeRJsH2Nc+9obHM8EEciOG6RtuiVT9Tz6M97bim3FHEkqlvA8hXsFtDOSjL7lsji02DANRJuWSHe1rdCuuvljjCH7jSD6KkzDIO4yO6ERM7CspojKe5YvHRjWC7cuM0w4JIMDxzo4VOUQ9f4jTZpqGtPQ8h4EklC5sHYl3a22GnHd+UQIRTslLYsRYRuY/uTRskbAxMM+RwW1I7h3ykMWaMNcSLcNbkJvcWxikNEfSL0SKzHzEQTaSRny/0+CCCOcih2P5DdEfoOp8OclMbyKKrLs7jRpeGafBjHEBKyLqo+0juWNx5H3LXwE+QicZPKdiGsQVb3LEgh5RMSyDTLQkmNySNga7xLduXBHHBFPw9URBtpofXwXeeek2p0WSKm212HYSiITqJc2Jze6HPQU3+AX3J0Y3agC7YObsRSx5CN9i7JRIUTLdCebpjlmD4Q5pkdlYFS0jVVu4XSPkhMgzu/WkF3noE7NtjSBoSxDskzc5MrWJnKGKYv8jhpPgcHKTGkdxtGzQ9BwMvBp0zTDAga0F6kyyMCKk9loWWUJ2JFmWUi6WQAxvp+rI7voYBSlAQlN0/gcvJuSCyxodh5LDQkZRLeEAhobQRsRI7DQsMkhmAheLEW9rCOoORdJBAoGWJWu3udTrvorhpkJun7zAZoytS8t3QVkjsJdhLtQqqBoao1Ch0l2ia8MaRK58DUvJ1CKLP67jh7L3XT63Rrdqxu8NBdhqC0bLFghFAmNTybsZixFIIIpZCDnthyMxRY5c2H9hcQKF1LF+oMSDCZ6VJfSZsCiRv/AMuXjSy0sSbtuIRbI0DzhEUuRrMaQwlboUDkiSIlRq1BpiTFHDGgi2O1wSWSIlli7XAXVbR9u626TIlHSTXhoSptJAUWCRf2RqBCW0og3aQ4syM/0GUN/JDiXFcDUpGIyVzTCImU/ctA9rG9pPKbjpO42UdUwusibRnH99GkdKktN2aRkPa4lzfQJGg/DJ7MzFF7UovBIhJchLGElxLRPYPgxwaagtUiC93fUStNlVheImozJLr4La79gsieJdoR2G4hZoo61CNNSnlDY+8/Qp04mawjb0DKb+qcyQuzAu0OzTNExCwPJjbbKFsvWDcfYWYCJEMpgowhJW69mM5bZi2IacNejNCMhCI9xKdDcFQYdJFBoUSuIx2IkIQUt2aM/QNB7fq+el1C/wBhvKnYioXsY0tTBAyQiYRLoKRSmAhqiBmsvQ8+gFoSmoaGPxlt16NE2nqOxIsJCvJcwyilBHZDwjZCjQCSiaTJMSVa/Q7ea3trzV1KcORrNcKFBH7qJW0EaxrxaB+8DyXxJ+SMW1+KJ9gjciuhhTKoTvP0OJJf6Y9GViuMfjtJ/wAEoVDLtIaiTtHGLgzCZW4a47kSjLsK35H8MkR041I0u3b0OdaWk/fLXVpjO5Yocg1OyJ6KmqkZQTgYXUDZcg7MH1JpF4t+6B2FncWVJMiE0tRzel8KJ8XokAq74H6LFnnRimmOHPkWew5MTArzSJBj8mpyKwjbEoQk0N2jaWFyWcMvVLjc8I3gYm5qz3tj5Gd52GJ7eiIpVc+n6KyzGArnCjA/1NAu9xYIWBwM4xP1FrESlkhIkWrticS2MgmxzPsF6ItCU1D9zbaPQ4IJGQjxWSoFsNIkJEtpLEDyRG4TMBiLlgzkzOcOq7ICzZejQqsPcXoUEEUWqraMnc3g+Ratk85FEhExAktK8iZXssatLnmcUbTPo1qLpfB6DAhlJToFOlB7Hi+CKZrdF23ai1mi4RvGhaEmR5loV4NtegvLAyJtImkiRRbPr3ydlVZ4eOvgSEiLeMRWe49XvRFZJR0XDUE8mmZWmTgkRgybuS3GGOZeR8PYTWLItMx/r0nwgP266KJCEHfqttzvqSjeGzyMUEafcR3V9zuqG1QMOcsWPuSSfYY2xe7Yjdi58FhKy9JmurrrEEEECQkJHh4GRpXnVCEu19j+6qi2wRLCVBbzZbwVCFqhYUWnv6Sp5hi+RGxPKfTRWCCCCCBI0iF3O3C4oEl4XKTkw1DuiPKuJmElCoWWsJsf0FYgj0iP7/sdBHHBBFEUZtZHWJGCUvd8z77ajib9hjCKJYL3b8CUWEpa3I9Ij7A+OnQRUjJ2LV3FMIRBBFZJ5KEhqw6nZZAf2Pfiw9xIQliUQ8kEcEEehSdgfK6SBKo3zj/4TcokISL8E8M8nQiPUKhsJKi5Ed7GkhjTqEcsRwQR1+H4h/fRoSEiBTFweRKkkLhhl+TLJ4fYuO27P2GlnYbVIIGyT0G7Jn0ZPqRKSDUVgjrO534ujSEj72ZjS6COGWSSfUZkOnVj4i7DYlqY93IlqRwx1LSaaY1DaouehCg6iZyZ8K4o4EMXa8jP7DUfBIx0yGpRdGoZf9CCOKCOm7HK+6LnqiV30xWORrz0OQ6iW9o+Bj4oGhCwW1IMlHaxjCUfLjoFj/NeixzkKj7+5b358xc7nhMCB0WKuoqGriCWGhMiZdYsf6Yosc5Udo5FxTxIfIfBFIT5ZoREoVBLEHnHznzf93ZTDnIVIXNfCuY88bqq4iBAfwE6v/F2Uw5yF1GD4lR55bwJJZaIjXKyR1TT/himPNQhB0ryws8M8TuMx1fMdNFVjkpRI6MPsXRYYyOoaf8AZemHNVEetFdjMqWI4b1QuhoOq5bIJLAdtadT37f90181UTzq/wCFFW5LLEKlxwQ1RxCr5yHl1XIQ660gA1HTuFLY3Lb50hELuJuKIUYqrpcck10cBc3UdVyEMnh+7wwR0PYj8NcPMQjIefGudeFbMXJfA9Bp5quS+CKJS8jo+GCOd5dBfNU4a5iEZ/Bh4VWeOSatFGTAnPCuRgN2quB8EjBcDyX7WRIcD6WPvj4f3wNKPloR95C5FFSCOB8w6syFRcnWKiG6xF9LL397twNPMo+uFrwY5jouU6s0okQQQRxXXq+BLH2o10kw2/U4HyuWhDQj7o8qJ66YnIVDJK5ERE54IRYwkIIbjh86hqHD6RLPD29hjGy3L4HhOWhCHuD0ZFURzM8Rchl3uYlUEmBzK9mBpRogz3mKjc8LEvceXHzI4oRqhfzxNKT5SohrXfgRJAnkrQmLgXJuPPAjYMkGiKtZENi4XSbRA4fRQHvOJNHbloRYuwnPDAlyWPLF0BVkkkbolCsdqGNRcNJGxuGDAMTWFVJ9DtJ8JWXFB5ctCI/uuXiiOBk+EXOgirZKZMExEl6LiFoY4KyG5u2wSs2qBj1nwIoomR4Lzobg2Pe40wRD35aHIYlzg0oT4J4hmEIvRdCx8DMFkkzbYs1kHpAhorsgPCuwtItBNhIoguO5eN+ggR4+4+RbezloRBLh8D2EQKk0aqqZqF0rIMhkxkvo0EODx7KoxGdCJX8hwtyKikYxDV+c2+ENt9kZYpv65E85aETHZkiXDImSaImkCCdGrugl0OnCeBrkfyGJSktHuFmBo1vQczBoEhZphXGJwS6A+bDOufTlWLXlFRE67cKLDMh6EOsEdC6E9wTE6SSTzGLhNYZw42NcnLpR6dRPuLdCcNgaEkNb6DqbZvY5IhIggaHs2sc2Fn+LXKhdnZ8pURJsmLjKjfDJ40J15DCougVmRafYJ3Sr/wB08Pl2Q+F+T7kkiyVr+RuheIBIsOivRiDR1gZHFID8Fq+Z52zlojdmLS3CkJCZekEEUsMY8EgSPVCVEq1FvIQ0G1jMmT+9xqzFZi/4E+fzWCK68F4QyyBZPMi7LAnsIyTvdloJlCRCz9jWYCV/rPvDIog2WolDSaaJDXKlp+GWvvzIN6a8tUbl7CfEasVabjQrkjWtzuC+42JAo2nwWoUJ5MxqxFMu3oKY7uSXND9istoszu0LYYlCYd+GCCCKwbD3oJjE4HxKjgJjIIpb8UDVL+/janzr+zh45keJFK4ENiYnPA4huVGjykIbWaFsmKMkNIWAhqy1eGRAvGeM240LKmFfdbJNIHGdna4mHO+Y7ciaQyCCCCOUy6rYPvyG6whttkh1cYXZOcguhhKfMlhsJ8DzRQE06u5IhiILrGBqmjo7CH1dKwiKZjOWJNqCSXQvttwNvZaexDhVIoyeGBrkuk8mjSf3/RdBdz+TmWzcXAhkERxzBNMuhHIkWXc7R32JbIuhtbSFqh8EG5FbKRLdr2EbzwGM3pxQaifhCaTSCCCKOsjpn43Kh4bgm1Mlvu+hvB+7lzDZjSp4FVsJqKkkk8DzI9qGuIEHL1Dg73rEdxl9qicNM/fji1NlG+gtwKReGe4xf3/IOYW/pljflC6UPwSJ8RjJpn4nJJIlt6JDgs4f3e/RZ0kf8quUi8HdcCJvRTGKJR3XAQyRYNY6uquaJk/4w+RdxqK7fd9hEr0JFqLeGTbQaRwJtkLLoSF5FURZandCMtfcGxZ+Ee/D5EtCJ78LXqmjXcUx2Swb9IfczwGSJp2fKcpBKk4GEmmJivRDQm0KHRsSVCULhQxNJp6MlNtOyEJkS0LM+lwxxaigNxdEWIfAxkkIQefsUk3fBZqCVCRMkTQkQaeFM/Yt2Btty+lvFfh7Plvy2dSR1RNE6MEjjoWCUTfkHo8QoYBDOosmlsYrYiGn2EXqDwKxQapNFMZNSRwGJ4EUutvbdEpVy308sPvr/XKQlHceDhSJ4LKECCRvhIFqSN0SyHYdcu33ROdJPswj9hBZY4O9zDCH2UKk0GhiqLE1nOs08ERr5G9kfqjE26mMn9r5LO9hatlEvtRiDsLIiaHca1JRAsK42hSOGgx58B7gtyFqhUijUS9B/wBwIWGbuiFyEQl0Ipk8AqMNklydNTVEVino/DYK/nqk2nKFqn9j5Bb+0ZJQe5IlSw70TJHCJTGxJvQ8DvQJp6l2gl6HY6UOsDMBN4PEXLog9SxCGg9pAq22pSFhEjTWSRBKTWSZoxkEYKwYkgiir+UyXv8AwJffrJacoXBnbxmDd1RHL5GmPA41XihXdxoRIcbjkT0IXcbZ+5sExJqU7WDQINhooky4wNO6IJJdCZ2h65lwsRC8JBHmXkRogUtNXJeQhDwNiQzeJORRoX5McEM1+W9kfh6r++vw+F/PjZimMNaI2wwlSjKQrqwkhTBNJNhsboqJ2ukyUeZULJFh/DIco7khMprYVDoQMeBjZOl2uExbczALMVxB3ISxokPA2DtyWo3Aj3EtBJUisy7vHljHUx4T0GAk0XqE1m2GuPkCRZIvJ4i3iNxxMAxuyyTMhvS40EyZEqS9hTwplnoQIGKOBujuTPtCEshJ7iv2nNeEw22dw3o/67L0PVrXvMkGupVa33kbDzSBVQSjvJNRJO9F5Jd4oZK1Bl3TWVg/IsZIZHaqklkukjl4JCmlgUUF8hcttJNtwkTvnVpQfmY5bd236Kouo1RHQfOU/BIpBBFGMQQQuh6dm14FhMJG72IcDHcy3cz0MtNOSdmt0M0b7coa2a7OCLHzG3AjExv3is3wQv7USVh+4pJEkFgtw3S8M3RkvPKgXTRa+CJ3w30kjfMsrwTQMTqRBBBFIGMQaGhq3B3hSmWDTAhhjdfmD+TJnOKzXgMsPyNdkMbmvBn7e5kr+43KkolhsZCoQu05LzxQQOEm27FnH+V3HQXq/S0pJ4acCLf5WqHwnhpyqxSBjQ1Vu44ewLsooRI7DQdLxHdKULMSCCFkqp0cl5rBFUr+TfvsPn8Bvff0+czctH5RCdo7/wBRdXZhpynV1jkiHiLspQSIIIqQQNWNmghIVWiBK3zwqbO24Z32/P3G23L9S74JqexFy3n+B3000kcIRSCCCCCCOgYzHWU92D32Jv8A1Oo2ZtttvL9W71qaCypNgWhHmlIogwpHTmKM1RPgndwBTUi7D+/XIWK93wYlC7wR9MifbfswLCbMNXRoNC6SSllqf4ZLI43KdXbS/wAsa3Vlkv8A8DOBbsX4IOUdv4IYqy8n6TP9L/uIS5aRn44J5SWUW6PyLa1/vcJ3Jeyk7E97yXsXlkfj/wAUdS/3ZoV1z1XwLilzHdoNkMGxDv6R/8QAKxABAAICAQQBBAIDAQEBAQAAAQARECExIEFRcWEwgZGhQLHB0fBQ4WDx/9oACAEBAAE/EKlSpX1mMYxjhjHLGOWPS/Sf/DequupUrocsYxjGMYxjHDGOWMcM0n4Cxij7/wDkimwe5Dmx9r/U7svVs7kvWJPYP/Pc7ge0R7H5P9Jwr/t71BrW/wCDTC7C8pEb/wDIqVKlYroroTLhjGMYxjGMYxjhS3+Asp7A93/gtnA+w/zM/dEf4qV9Su9blSpWaxXUXRfgIRs33/4oa2HzQl6LOBtpZNcLQr+bf+JUrFSs1mpUSJEjHDGMYxjGOGMobx9h+WKpP4G5QO/y4FAA4AoxUqV11kJUqVK6byxe4/tzL9Q8SufKS3+GPzLkKT/wKlSpWa6kwkSJhjEjGMYxlmJ4C5uTHg2lcg9ixUqVK6LlkuMEtAv3NEJu8V9T4nYLq/EufKCdqgv5wVKlSpUqVK6UlYYxjGMYxjK0z89iVVn6CVwngKxUqV1WtF+DcalalXZixd+FUp3we7m0pfaD6qIcIBAD6SIQSzyTkH17u2fI+/ZlrV8SjCCCJyP8upUqVKlYqVKwmUiRIkYxjElUd8vYlKvxGoAAAcBmpXTQ6djfN8RTDEObTU1VDsGprEeAqA9fJCipXD7tpdIgFJPTK6NPkS3zEqmgHyzQSANyFG5v9HmVS5f11FPjoMvfWjX7REUT+G9VSpUrNSpUrNYYxiRIkYOUrwEDSfb/AJYeEBwEqViupDqXvRyhANOeXbU8CPnFIJRfF+JwwxBQb3Dsa0VCUC3mpUKAX4hqH7LllBEWoJ9kZbB3Whh+0T4g9/BmFv5SHRUWU5lxoa+R8MES4I/wA3wLW/fzH/CvH/p/IqVmpUqJhjKiZYkYxlP7Hu+pWqPL3cV9FOZtD5gjfZlrs12Kjk8DrQqpUXs7uWqlzCmubYCqPRm1oHdiQBs01cGqAK4qotUa+YhIFS42fjvEx9ek5sWkBXs8MCCpK/0Ra5mx2fJ5l55Zx2L5l+gXh5GJcnUF9QEroQREsZq5yv8AyqHRPZ/jVK6kwkSVGMYxIwchWU9Pg7EqVK6KxUqVHNJSi/EBftv3J5Ds3yGpA0smvU4LwRLEWNvk2sC+Xy9iUKw5pIlVJ+Ialgdzbv8AOzUGofid4jN/AirroeGLUg6vXJXiNFNi20+kgJEo+PPmLAiKu6RLaHelrfRhFKdA8yzVYDIHUl4PQmOO7hPIxW34Rv0fxaxUqV9BIkYxmpa7org33e7K6aSulHSwHFwWnsWoB3t3gCzb51sn4gaWl2FW69xA7RoeZ3FIoARO4MR0SoXbRBxSCUR6YAVV4qaQ27RKbA/EJbnwSl1dEWW18MJ0hcWDsF3DZVXHye4SAC4h1ekfsxxSJ8CVZU36MPqVgmUERLEpJW9ydll6yKUUifxqxUSV0MYxjG5J+zAAUHVXRUrG91q7vhR7LDqikliL3CnNOKdq18I7iA7y15XfuBWyLdBUOVodqhszgdVHqADza4gLK7gi2o0l76RYbor3jdJPhgxrfniDV35CLCuwolxeESG5ut1/kiVKa5Hx2ZcApXEEQniCYqxZ2SX4/scEMBcpKSkqVE60iZZ0CfA/EMFP9nk/hVKy9SRIxjOIvUV1V0Vm4DlUb0RohWz2jAUBxGg+I7Zqq9hEey/kgBvXhIEAruNGBSynxzLr+6DCfJ8iuvUDvMd9hO+3zTc2i36olwKW42lx7PN3UIxc8N/qHdmoG6fXaABPlPaJy649M2YpAss0sIl2LlD7KJRlaQIHUkqVKSkqJhLlSpSclRs+Wb1ldXD/AAa6HLhIxjKg1P4HiV1VisV0K6HL8IRbM2aOLD4YDQIaFymNjiVUp2DuS7b7kQexW6hpY9z/ABRqiPI6WILQnVx4Wvwjcj35JZdMvyVOafahuOBbeniLBJ5rIxYo0ickswtdvEpK3cEacXwl84lWyv6mmOgutPDGt/VqVKj0GY/KHyeGcqZ8L8Ph/iJlyxlQP+gldFSpWKxXRUCwUG02Qla+O1jz5gWqel395pRsawLgE/zDzPQ4layjzCKS+Jtm+6yUewRim28BI4Qb5rvL9xDbdxZsqWasHtNJPBohZRrUHprULe031MopVXzcCwKp5l65peSyl6/gVKlRKwCAuyVJt/8A8H5/gvSxwxnzjoCV0V0mHiUQ2rrQku1DKXZbsQv2zbfMLnDC7L8OVlMH4QixSEdbnwztxju40XCVjIjUjgLtEtx4krAJQr4hmms0wvhxGy9oV49tx1dXlUqVKlSon00uUlIOMOz/ACTem09of7P4TGMcMZVq9YrFQ6qlZowy4xpbXVDyfLHYDwIbMNUCu5LtR0agN+0KllSrIRwi5C4HxBXtKe0DPWFegA1Fuxq4+FWNxfiVPK13JTqNP3ywOhdnDDcr6FSpUqVE+gkvS8T3XYfJD0+e35j+C5cMtbcYrJ1V0HRc1tzt7YU7KNrbp4I00Uap5+8atuiX6ryC/AKggSmIjjhBNMqKSsjrBQ4VgsXRsXKEL4ZuNxMiNO6hpAorXxKxXVUqV01KlR6hYAb70lNtofwGPR6acSuiuipR0VKM1cu6CjwL3Lo7dpycuTzNCLsbasYA7VR10QLHNEUC18Q2CxuiPH18wRrZfSC0bjsXAkvEa96nayPqyyWolg2j8x6HmI+ibJOoCNzVC4JX8Oo9J02x+1DYolJyfTY4Y9AKAgCiV0V0V01neRL3TYGqAHsJp6QD5q1LSuJik0oRDzUL7zC8TiD6bgjsy7szzTNuozgWbJTZuxGaQNsS8LH2IRSpfN3DEr7JYkohK5AhWjHozm4Kv5wSpUqVKlSpUqVKlSo9FSpUqVHPFEio4fp2OWMcUreXpoySuipR1t40JfKlAY/17sg2lFpXCOFLvYjPetNQSxBsCp4CUOQ14LhWXfGgG2t0xzWDnmQYEiSA8E2ktvscxHTEVoEDBHTiNfikEWxPY9lQwQLx3PcH7UpJciXol7tAu0X4SiVK+vUqVHNYqVGBeAicIxebbkePHs+kxyxxY24rrroo+jq/yxC3NpXDQ/qDhpchsE37TvCAb5a8Qh7HkI27vb3LlVaQuyaY4SoXmSrtYjY1N3ztO6ipZJxwInBPgxdZI0GA64dhUrNSpUqVKlSon06lR6KlSoA5vsxM6yOyfRY4YxgW1AoqV0VDFHRR9CjDfMSiXcsiC3dGW51mORZHXiU8QCbponPL6QOal7sQPsRI4mph+R/Mh3A1cqVK+nUYR+jUqVExUuDYKH9fRGPQyouV0UZozRKOslGKMMK9tReRYt+GDZRIWFMBJSomdwmtbYuTSWgxnUwV1Ys4eM3Itq8SwrjISpUqVKiYCVmiURJRKIn0qMEUWR3EpJaAj2Hh+gxywLYBgMUSsUZo+hUrFGewoVGC9iUcdCCy+YSEBBXBsm2eaDuHIBrlQiuxPJuL7xEKUQYSAJuKJDOEIKvhhKJX0KzUqUSpUroqVKiSusG0tPz2voMcsFEP4IYolZqVPgzTAhCEiomm+GJa9WyjlDL3Dm4ezx2IB2JtgLxYI8T3ayP2Y8t3AgJ4dP5gNFaayFW25RblFD3Dqh5hM7FCH06foVKxUp6ElSunRd+Mefs+g5C36W/oUQlHRWWSBafEtblr8O4UNU0RE5ioza4NUHaV18zUXWzZKDSkO0C16hVh02XA9oOniOpqgfqJ2UMxslA7l4u00btDDpqV9ejNSiJ0J0b/AK35Ts62MYwazXUfQoxR0V0d5rp5gB6KeEEI62HeEavtEUQ8SkdJQmzTVTZ1PjiWdWlgl86+6qUIlxp5gbUmkrYO3Aiommy3o9nVQGK9WNt6HU5bZ9vmoK5vkJUDNSiVKJRKJRKIn1KInQmdIH+tPtx1McVf0T6FEqUdFZrAUqGx5ICaunhXaAGtVEhBHvVStVmsIFBPkjmnkDmHAnahxA3JLCtdospcUrgglrQ6jEb0dgRgXtJL3wFQXZgPOA+7GLyECUfXolSo/SSV0MDkZPzqepjGGDro66IHTUrFSpUF7+IoJdC1yVDbigKgDVhBVxGDaQsvGHlscquo7RJbUmgNjDihB30BLR7Iy1d3AoLH2G0AaDRx/FolEoiR60lZuKOHkFJOR5reTs/c6WPQEJX06Oqs1KgZDqOzUFSqykvUII9oZa2Nkawq4RHCEhU0H0R5bBh2ZptYAKIZZkgNuyXyO4G2tnqJUqVKlSpUqVKj9FJUqVK6UzxPf1B0vQfVDAdJKxRCEGJtx3jr5ItG0pbIXg8Ev8hxEAC7gXnSUShz3gi71B7BGcJKetQdSqOXzHXAQJSmt0fgnZZX8lh/EfovU4My339v0scmTB9EyZoyEIMR9YUeG5cgxTYEqsGw0cxUaRaMpiAvtwkGm4rBWrUoq1UMV2lwqkBNu4QsBeI60OhAGpyTzcLXDbFqtaAhR2Nq9rgdQSvrv0OXW4r4pf736PQxhg+oGKPoBDCLxLhilDfHcSyCDbkbCnTCsUUx1Vpo94SgFS4tP786if3DmV7wdpT2SVgX3GBbWNLZuwxbiGWbTo8sLTtim45lQJR/BSVHqeiiUR5ldCblCGm93RY4MH0qxR0GQgQgMQeIOvyWUTvN0lNCABO9qERFGqFRYUDim49SV8RE2K8+IL9UR0AFsO5uAGrZBBNccRtpCuZSVUV92Dfj2zgjlviV11K+vRHL0PRUTorcaf8A0/p6GPQYOOswdBCVKhBBBhtTCGFdG/BFizXEqBaDlIcnyFQG0I3clZGr5uFQpCjpz4l5T3i9QCgV3ZQeBL87iAqAIqjKt+0qVHpPov03pehzqhW+hUEakCeEyxhDBg6yGQhFQIKEkkkkuoAt9gm/3zmCu71Xl4YzfmAuOixO4QVFfFNkMMGDNHPBJZwlVZLSqnxkQfT6+C5Xft++LFHm0/GCSpX8R6aiSomXNEqM8C/pOmYOMHHVWBkIECEkkihJDdepiyEQB8uFzmGWJAlRJRfEohbefDUJAGSFRXc4jHJECH4r/Zh7rc4tTAkqVKlSiVKlSpUqVKiSvpPUkqOHoYso+8XlwQydRxDJAgQgkkghYekNQ8vPgho78EZFCks6xgRMtBK7MXxqsOzKGtVCDEaeQlTgAPJucGT4xcaypUTBpKlSpX1EldLlyyomWD3r8HqjJ0mDBAhjkEUxPkcSjZHxtANF/LBoZ6KwCozhxHN1A95d4rCyoE4JQi4m0NH7gNAfdKlAS0BSWFewIK9Wc3DTi9kIqVEjDFYqV9SokqPQyssqOD5Zr/FHqMHUSsEIc+UWv0QEuvBCKh4lAcdDHToI8MqVNzykDwjNZqGimFo67M7tbj7ReBSiz5dxVncndjaabiBqV6Q+5uRvyNThBemPFiLREIiRER2MSVG0aSv4FROhjlxpK0Z7tWTBk6TBAgQM2F1RkbACVOCXeOc96iV0c4qNomS+2CxC0T/1cTZ/43PHo/oiSG8VcWstiQRWrnEGNepSCCgpPPMaypUSJgn16idDHCQQLEpIiHIpkZOmoGSEMMZ/a/BC70cueYmeYTzjsw9RlRnjPKCx+SpZCAQr3KPnf0RjlDFMsE3JrKmsGvmNWvKS9pY7kRGEykrIkqVK+mmXoEXgr7Mxwhk6DBggQhgnboawMLnMTxmsGqRI5HLGXhlwi7Q4NpUuDks96TlOcSHESJEjaUM7MK2oR4RcIp+Dsy3kZUHVUc1gn0U6HFO+f826Y6TjBghnNpq+xLf5q18vSa4yy8H7iXYPxGMMErCdCY2C4JZq3chqvJsNic+qVc0QUx4mmUKCdutPhiMcjTKiRPopipUT6DDNO+L+Q44sV0nSQxEUfIf1xuXLjOIXzVZ4ZsMG8jIzacQ9iBVxmjghhIkq8TsjDcC8F1o0QSokY/UVK6K6KiQ17/3wcODpOMHGSBiYK97ROeDoYNTniG4zhhzOWHiGFTWWJ0VcqpdxzHPTwiQN464YLs8saCNVDoFDl5iiiUmmJEjhOl+gyo9av2/r0WdJxg4yQhhn7hObkc1Eg1OYMHfByEMDLl9SpcajicHHSytwIFhNnaHmWKKLlVykSVGOaidL0sqJ1W34n4Bj+/B0GKwQhDDg2OLz6MVRImCSOeG8R7GZBs6SMei8bKuVbEMhzh6Bxa+bgLJ3H4M+w3BGK6nNZelN4qJvNt+H8UwtveDoOMHGSBDBCeLkU4DQaji5am0qowanJE7MXHNERj1GXp5GVsSlsIYGHopluHmGyOzEFbSlO3yjEiRJWHocV0PRUcMArgz7txt+PUcQ4yQhm1RcfpO055sQ7xLU8LKYQFGQdzdfGecMPGDoc9oTmmQTl0PP0BKUqCibqyMkeRjElZetw5eiowRQFrGQ5VcLY+MGTjBxkMHGmjwx6oK9R4yySoysF4ilx3P6MjUeHBDLhhDmVUncCVDvoek9QwTbKiahr2YkrCXkSspKjh6Xo2vSg93rKrAYMHSZzo/JLk9/6svtGPUOGOoDGDogq/eHJDBB0cFLTlz6HoMSPECCWaUHaDb8oMC5VZSOBMMqJKykTDgd6n3VnNy8J0HGDjJgy7k8sCj8HLqDZElSpUsjjBLPMDbIYWVxnfRfQMPeHOE/kTdIY5dZwupOBghQXL7wOChURSQYSVKlZSVElRwxwyomC73+PkM+QgycQ6CEM5s/+rh39sMupdqXjiKcKRMYIN5MFdJydBzjUJwY1Hipw6zGMCLceEq4Au5doiRJca5IInQkqV0pEjKiZcLeWL69AofhTJxDjqIY/g/2R392GM52QRIYqI4cJCGLFRLzcIdJxwYmjCXQJjeKlMR8RHBNHyZUBuOBGMr7ZhMFR6UlSpVZSVGMqOPE9X7ejv8AivBDoMmX4YT8MAwlbZMqwj7MJ3gzmJipUIYEIdBzgwR46BWD3ZyxRvCKq9RNLeYHCMslCxgr2QKELW8VEnA8mo6BTcSJEj1pE6ElYSFDfoQ3G1tSeV6PaWvzg6TJ0Vvsjbo6Ny82SzNDErGpLRNy4RlMDfQZJzmr/wBblE5QWQW1qMtquo0B4vUUhSBelgvMTtcMBOJcqGiGGApIu1XayqnTwwVEiZepIxVZYyk7Puo2/R03U+fAcGToMTG/xg4pwgiIcdwsalPRzHUu5UsUcash2zyydBHmUj2ukZyj6inMo5IV0SsjDLlvtuGiDcuHQqGwF9mI/MRJUSJKy9KSs1BXaX39C8WHev04MEOghno84uQx5lMLxjvHfSlzickFjA0X3nIyWDcOgjh4lQjNWWRSUgJtKGO9VLCM+ZMHWDpbKERslcwVyzkvwSEAjfMOLDEI8Op2CCVElRGVKlOHpSVGUW2w/wCRwdF4ph4FdB0EIZK2tFTFrCRhO+ocY2ysbS8Y4iy578OEp8RhgN9BljDJzERio2ES4cglwGN5wV/ZNJqiKFchn+dRPiWgg6lOWG19iXXUtHxglwd54IdIw3mJElYYmUlZegxKforr0W9YkI0jZCL7LydBghiYeRh7eSFyoywssQlzfLPGaRhhixw690c4y4OkdD0nMc8Jyloscs7VCL8gQU5PggUS3bc5WGonPV5ZbhrmXiQgX6ILGCgeAhBKErUbbD2ScgFxCSokrDKlOElZZU4K/wCv+q5cve+R6cnRUCEM9M3cPhheGFXwjDVQ2xslIxujxGMuRGVKgPiA9Qdffoc1bxt6BVlpOjUXPLDUv427o/MA+SaHliEu02/KxEtghZzFriXcHYxgnzK0VxhIkSVllSokrAtfBsFrLE7dbujt9h1XjxyO/TDjBK6CEMUSvXhZaPIMtjK3cuDnzQscS3RGxbisQbqD5l2Rn2MoSaoVCWS5ZDBhemowyeJyiBS7Rj2PdZWBxFsu/wCPqNqcOx4iI0C2BHs7ux5lSW00bP6gUklNmCHP70gF4iRJWEuVKcMqJEh0ZXfje9Vy5cuVKew+u2DpOiRS/Hen4lkSJGaRpKEp2rlm6lVLIhlLapgOXshg9toM0QSUqV8wDDFkI5rBjhOGXid8p+yWsK8KjeTJdJUXTbCg8rK8fuUANxaUGv5/ErAoODwRRCh++xBHFt3Ye0aF2sLE8Yr7EtG4cd+ZOS4kSJKykrDKgWW3+X+7vquXLly4LIqGawcQyExVHnVAxqOFqXcRmUWbm5SkvTl2gQupo4jSKg0SOPE2xeCXglmB3WLMPmc5cAHkbfEF9hbTkiXxD4TAAK5lnW2p8rL1Wm/MoaAtqAlVD5uwlQqRLwHGGxEeYlnMPtISEFNDyRAdZB6SXKmp27ynWrly5cuVgvEvXZ6ahAYQhHHVfYYYVYztGMalTEO0dOIsVGCB+JSckVCJqUZFcR0iOBb7xWIke2JV3+cmvvb4GJRRRaSC6atKlPIMQlUbaHvaoXrstBpKZTLeJapTghzUQXqK2vXbiOqfWkmFEmod0VZcoVayjRuvJAm6AOXmEdHszlj9IkEC2uysAdiDAID2mxsgBwQWJ5CK/uRUezEwkqIypWdxvrHk+513LlxZcuHnr1YbBOHoOIdBFD1FCuwtQWMcDcUIlyyVqWlTiW6pER1NwKRTU86hx2ljhT1P/wCrFvdogRl2Q1Tb5qUZjTSe9J1b0XYIoCRCFAAUpZaG/IMUgb/CVuyuzDvoLe5u/jKZFMuSmfeNV5AQwsqvtOF9fG5TG4e4MIwMreGRBlIxoBCMRzWCXKlnRBHnh+hXLly5cuXi6vuwBwQwQhCCRRjh/UM01Vy4wIipvlBCE7YJQTeSX4hRY9kDUONRzGiVHKVhUGo6IR/4FFvywmIoKjS2FnFzX77mFsqyhGeyuVceoZSzvl2I9VZPsljXS4BcbTifFBQwqis11i5sg2YsKbMEYkroIG+vALWXHjb/AKx9C5cuXLlznZV+/iKxY2QgOCsGCEIRCbtQUlmA3zqK8AgzTKlkKiaFBBGVBc40xwIfJGl2V71EiIoRFwG2mkh+gzg28XGgaAF151SE4iWD5IsrUUavdNcqTs1PtRIs4/3L6KXGFHHGBgjnW7iFgHEp6XIsg1GN3XmJhJUSVjlFab9/R7ly5cuXLndwafGBxg6CVBgkoFwa+/Q7QWzsgEhbcLREJHcuiXcsEWxnc95lYociSyQIWaPzKs9qIDT2uPOz4HCfuKX5uJH1GytfqMJw3BMbQv2QxdR6snLUnbLTZKSHMM5QemJlwDcu4hhjpCjtAI6lJzFw3g9o6m1EwkqJLmzu96L2ffypa/RuXLly5cuXO3Q38PMOIQ6AgwhGF5tgmOElmG6nOG2o6I90ShDySjuE2cLOFlqQN80KLAUJfJzH9LtiBDVqip9QfNoSW2f4Ili94/cnT1cMMqWYe0yy9/uMSgPiXbInPa+ZYeT8RRJO7vDr7vUK56djKUnyrlIW4sWGEDFfESQsS5tOokRlYfmlagFqxPBYzx39/pLly5cuXLlxY6W/fwx09Js7ruOAxWSEIoA+I/JDFkUUBikVntKkLiU2TeWy3DQYwEi1y94TXKQ2rWtIw3bxDn4RVbBs1Et75Cgin4AY86QN7zmFsr3NAoQ5VCb+fyMYXUomBuABCDuKRBf7NTKCTtyz8RS2ANR50jsqkNYYTswVQwJYAT3wkRiMRlPF4o5HH09y5cuXLly5cvdnT/kINZARO49AYqEIR6dk+/5LMEPiWi7wU7JZLXzN8UobI/gmguKs3LwRNUE91HbKxU5RkBYwbac1TsqXX4Fm/wDdLnKoWLogE8SA+c7wEMQkqFzm5W5TUtEwgQbZXrb4Fkb91ViAAAcBoJxBsg2MGbIaYB3LCLQjHFM3mP8A12ECKravK/TuXLly5cuXLlymrpu4b/DgwZIQYSkcqmGjLhGzg2ygRpwQVSeSNpQNkYqxofMRin4YqVKiSqx4C4S+R+IZ2/vsgD1Uq5TINOzU7r+9moatDzTBrmyCacpWwDSggvcKilYJElsKsKGnMUaZAsIYW8KEVWJglRMix3f+k7sXhar9B4D6ly5cuXLly5cuXD+M17/LIQOg5hE1Y2j4IFV3NQSiU5AjJAcWi6nCWp8O4mWsCWEVA98YrhJxEVgBWOKkt0iPkn2RiwVRzvxAP3MsS9MeO8F9AgAVBYUw5RiCFyYUYQMumsKRBFhoRHmNv26KPO0d1wfdY9tdjb7MfVuXLly5cuXLzaNwaFJT9n+4GDFQgbwONz/uUM5Fj8x7jzyINwMoi7oBtBKGFo4Q0xCw3Cs5MRdSlud2pa1xEXBrzN57sBNQxMTQJTsjEGUgDZFckPbip1HGtiErT5l9kRKGdRYvllokWwRhdd58kslCCy6ilpvwINnL4gAAKJUqHItl7vgPKxNfaL9eZ8r61y5cuXLly5cuXLghERsTkYEAJ8H/ANYrJCBCu9Iw7Sq5ThObSyo0ImBqfLCGdrDiMAIStKeHUUecfkIZxZXyx+1EoG/0xLtcS5JszXhRtV5Nw7CvemO0puAuEvyIpfE8ZlqlnkI+U262y2NjxdMYQVNi5VPCYXxcSEvwxwJAFstuvuYJrvy8y0tKg0XtP0HlZto9/wCDa+vcvFy5cuXLly5eABERsTklRZxbj4PzgwQhNeycDQVgXFraIOWBSMeyU5LhsEuy0dEEjrfEotKQA7ofJHwpQ0/Yy3faijuXhOepyn3iULZKthOUGVFcTZuCvB3PiNHc07st4YAcxXVS6wuVTAkhbXc1U4FflTyPYj9VIxYqEATX+4E5YTx4yE5gtCcyDSobNtQAUaJUqJBa/c9kHdZsIxrdDy+f4C5cuXLly5cuXLly5cuXPxD/ANSZISg74SrHKFpiQO6PqLs3qfCx9pd3iEagLNp35UBRFxR3heuGWoBRU7EKqCbrTUDT3pHwvplneT2vyIhx7bSG59+yGsifJBpSHxVMA8YkpRFbL+8RO2FTDWKWXxtfsXDKtPAhEzw0JIZZRQ3V8Wzfa+SUeLjkri9qCdt/tgn+AhVtQ7h+2cCvzBcEqWlYT3bDjbsTXZac7fwbly5cvNy5ebly5cbdwOT/AGEHEtosYQIEtwy3NSKcA/YYgmAS9IPhzyWEUj7nMH2j3TA1cbEdvSzZuAhLNkuqjTpRd5L+IMvcH5Yl8sO8WHhqNXKwAaJZKMFmCtbtXsY9HwbtNwdot87Ze1X5PmBgJUrNSpUrFPqXLi/Ee95F4HYOx/CuXLxcuXi5cuXL6TS7m2denhnFE5/3kGEv+PwYLUqEBJUcF0sEqcIC4E0TdfeHyaiCqp95SN+stl1fDE1Q+xEhK0kpfMMPTBICLNnk3NV1LCQD4lNYK4IbI1URHYRyAMC5miF7EFvuVXg+0SCVmpUroJAC1WgCUc8fN8UowkuocqvL/EuXLly5cuXLl/Qa4OoXt4ZwX/DCaQWlMHDBWVJZF3DW+GW1y+5JXfltyk19oP1AalKF3hZFUJ9y4sa1s8CS+1NgKnSBXZIo6H5ymEh2Md8tpBDa7YS1s9JcvRBioWNxAKkJBWtsslRc26lu2OE941Cu8IKehD/B0VKlSpUeuV99jtJm957fyf8AFuXi5cuXL+rs6Hc/Lg2EWTXvIwGGKowIc2COpeiKvEfhH4xgtvUa5D5GoqKf3lBX+0eI74VYmWZ19PqRU9dEbX35lNH8U2z/ACopT8hGpsvbhDUrWqSGbTNmoSOqJpl7QjH6CB/RioEC8lEAC1dAE8Fc8mnkqu36DgPg/jXLly5cuXi5f1OR8LIjdc8B/wBcPANjJLlYJEQ5JkF8Rouo6Oo/GMX8YFHicEGwfxD8Q8Eao8bGfCbdj7iG0OEmrM+ZdLT8ks/YytwFVNrGGwfCJAyBWNSm1U/45uG3D0vfn+RuXLxebxeb+lcX2v5/eaZ4zTYn+YLV9jA8iSoxOE+J6T0hvxB1xPSbF1KwHiV8SkCQOuIx2jeM7NfEB4lZSc8EJpM7SCaqJbNqRrARiuYFZS8Be1fabv8Akd+6UCKrav8AKuXLxcvF4uXi/qVNK3yexal3vfu+/wAiEE/sB6a4Yphgp4lPEqQNQE4VKwEribECAYJUolEqVKlZZW4dzUgnUqV9DrQL47I0ETzte5auFo2q91/9Yeb94v1Kb45Z1S34ZBDFeL2gQipUqEqEIEDoDK4Y7lTzwBR5Uno7W5Z4vNNEasf0b3/nLl5vNy5cuX/DrRXhv92TsKt3PvZKEBO3r7iVybWIfCQGGItYMBuVAgbldN4XLCD0gtD+BtS0JnnugKtKqj7rmNvO0G9r/wCBcuXLly5eLly/4/y/9P5ijlyqr+5Hf9V8TI2XhP7ibeuAP8zcASVDWAkHcHFZuXAbJwI/MMq/2/cwYfO4am44bDKioqsE+aCKrb/+BfoBS7hL+oeoeGXJyhz07xq7L/UsND/HCxKVVf8AyP/Z"
                  alt="Prof. Bhagwan Kadam Sir"
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: "50%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    border: "3px solid " + C.gold,
                    boxShadow: "0 0 0 6px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.4)",
                    display: "block",
                    margin: "0 auto"
                  }}
                />
              <div style={{ marginTop: 16, color: "#fff", fontWeight: 800, fontSize: 20 }}>Prof. Bhagwan Kadam Sir</div>
              <div style={{ color: C.gold, fontSize: 13, fontWeight: 600, marginTop: 4 }}>M.Sc, B.Ed</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, marginTop: 4 }}>Mathematics & Physics</div>
              <div style={{ marginTop: 16, borderTop: `1px solid rgba(201,168,76,0.2)`, paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  {[["10+","Years Exp."],["500+","Students"],["100/100","Toppers"]].map(([v,l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ color: C.gold, fontWeight: 900, fontSize: 20 }}>{v}</div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, marginTop: 2 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)" }}>
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ANNOUNCEMENTS TICKER */}
      <div style={{ background: C.gold, padding: "10px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          {ANNOUNCEMENTS.map(a => (
            <span key={a.id} style={{ color: C.maroonDark, fontWeight: 700, fontSize: 13, whiteSpace: "nowrap" }}>{a.text}</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section ref={statsRef} style={{ background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDark})`, padding: "48px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 0, borderRadius: 12, overflow: "hidden", border: `1px solid rgba(201,168,76,0.2)` }}>
          {[["500+","Students Guided"],["100+","Scored Above 90%"],["5+","Scored 100/100"],["10+","Years of Excellence"]].map(([v,l], i) => (
            <div key={l} style={{ borderRight: i < 3 ? `1px solid rgba(201,168,76,0.2)` : "none" }}>
              <StatCard value={v} label={l} start={statsInView} />
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader title="Why Choose Us?" subtitle="What makes Rajmata Jijau Academy the first choice of parents in Vasmat" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginTop: 48 }}>
            {[
              { icon: <Target size={28} />, title: "Result-Oriented Teaching", desc: "Every lesson is designed to maximize marks. Our teaching methodology is proven and refined over 10+ years." },
              { icon: <GraduationCap size={28} />, title: "Expert Faculty", desc: "Prof. Bhagwan Kadam Sir holds M.Sc, B.Ed and brings deep subject expertise in Mathematics and Physics." },
              { icon: <CheckCircle size={28} />, title: "Regular Tests & Feedback", desc: "Weekly tests, detailed report cards, and parent updates ensure no student falls behind." },
              { icon: <Users size={28} />, title: "Small Batch Attention", desc: "Limited seats per batch guarantee that every student receives personal attention from the teacher." },
              { icon: <BookOpen size={28} />, title: "Strong Fundamentals", desc: "We build concepts from the ground up, ensuring students excel not just in boards but also in CET and JEE." },
              { icon: <Heart size={28} />, title: "Parent Trust & Satisfaction", desc: "Hundreds of parents trust us year after year — a testament to our consistent results and genuine care." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 2px 16px rgba(123,27,42,0.07)", border: `1px solid ${C.border}` }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: `linear-gradient(135deg, ${C.maroon}15, ${C.gold}20)`, display: "flex", alignItems: "center", justifyContent: "center", color: C.maroon, marginBottom: 16 }}>
                  {item.icon}
                </div>
                <div style={{ fontWeight: 800, fontSize: 17, color: C.dark, marginBottom: 8 }}>{item.title}</div>
                <div style={{ fontSize: 14, color: C.gray, lineHeight: 1.6 }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES OVERVIEW */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader title="Our Courses" subtitle="Structured programs from foundation to board level and competitive exams" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginTop: 48 }}>
            {[
              { class: "5th – 7th", title: "Foundation Program", subjects: ["Mathematics","Science","English"], boards: ["Semi English","CBSE Foundation"], color: C.maroon, icon: <BookOpen size={24} />, tag: "Foundation" },
              { class: "8th – 10th", title: "Special Mathematics", subjects: ["Mathematics (Marathi)","Mathematics (Semi-English)"], boards: ["Maharashtra State Board","Board Exam Prep"], color: "#2C3E6B", icon: <Target size={24} />, tag: "Most Popular" },
              { class: "11th", title: "Mathematics + CET + JEE", subjects: ["Higher Mathematics","MHT-CET Prep","JEE Foundation"], boards: ["Maharashtra State Board","MHT-CET","JEE Foundation"], color: "#1A6B3A", icon: <Award size={24} />, tag: "Advanced" },
            ].map((course, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 6px 30px rgba(0,0,0,0.1)", border: `1px solid ${C.border}`, position: "relative" }}>
                <div style={{ background: `linear-gradient(135deg, ${course.color}, ${course.color}DD)`, padding: "28px 24px", color: "#fff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 8, padding: 10 }}>{course.icon}</div>
                    <span style={{ background: C.gold, color: C.maroon, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>{course.tag}</span>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.8, letterSpacing: 1, marginBottom: 4 }}>CLASS {course.class}</div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>{course.title}</div>
                </div>
                <div style={{ background: "#fff", padding: "20px 24px" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.gray, letterSpacing: 0.8, marginBottom: 10 }}>SUBJECTS COVERED</div>
                  {course.subjects.map(s => (
                    <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <CheckCircle size={14} color={course.color} />
                      <span style={{ fontSize: 14, color: C.dark, fontWeight: 500 }}>{s}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 16, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.gray, letterSpacing: 0.8, marginBottom: 8 }}>BOARDS</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {course.boards.map(b => (
                        <span key={b} style={{ background: `${course.color}15`, color: course.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{b}</span>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setPage("Admissions")} style={{
                    marginTop: 18, width: "100%", background: course.color, color: "#fff",
                    fontWeight: 700, fontSize: 14, padding: "11px", borderRadius: 8,
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6
                  }}>Enquire Now <ChevronRight size={16} /></button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOPPERS */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader title="Our Hall of Fame" subtitle="Students who achieved the pinnacle — 100/100 in Mathematics" gold />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 48 }}>
            {TOPPERS.slice(0, 5).map((t, i) => <TopperCard key={t.id} topper={t} rank={i + 1} compact />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button onClick={() => setPage("Results")} style={{
              background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
              color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 32px",
              borderRadius: 8, border: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
              boxShadow: `0 4px 16px rgba(123,27,42,0.3)`
            }}>View All Results <ArrowRight size={18} /></button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: `linear-gradient(135deg, ${C.maroonDark}, ${C.maroon})`, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader title="What They Say" subtitle="Words from our students and parents" light />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginTop: 48 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 28 }}>
                <Quote size={32} color={C.gold} style={{ opacity: 0.6, marginBottom: 12 }} />
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{t.text}</p>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {Array(t.stars).fill(0).map((_, j) => <Star key={j} size={14} color={C.gold} fill={C.gold} />)}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar name={t.name} size={44} />
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                    <div style={{ color: C.gold, fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, padding: "60px 24px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: C.maroon, letterSpacing: 2, marginBottom: 8 }}>LIMITED SEATS AVAILABLE</div>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: C.maroonDark, marginBottom: 12 }}>Admissions Open 2025–26</h2>
          <p style={{ fontSize: 16, color: C.maroon, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>Secure your child's future with Vasmat's most trusted coaching institute. Seats filling fast!</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setPage("Admissions")} style={{ background: C.maroon, color: "#fff", fontWeight: 800, fontSize: 16, padding: "14px 36px", borderRadius: 8, border: "none", cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>Apply Now</button>
            <a href={CALL_LINK} style={{ background: "#fff", color: C.maroon, fontWeight: 800, fontSize: 16, padding: "14px 32px", borderRadius: 8, textDecoration: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}>Request Callback</a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero title="About the Academy" subtitle="A decade of transforming students into achievers" />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`, borderRadius: 20, padding: 40, color: "#fff", textAlign: "center" }}>
              <img
                src="data:image/jpeg;base64,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4gAAoEibnbbaaeG7fhJtf957WH7R9xxxxxT44wwww84wwAAAMMHiek4YZZZk4MfnZx1MQABc0sdpBBBBBBjNAAAAAAAEc888gZlrbaaaPrPd9dlJBNqvf1VpWPBFNxxlJRD08888884gAAbGmkYZZFr/APfWZXTPO41783XabIwTzwwUcScUcMMAAAAAAGSZZ1lpv/8A3XmXlBLNucPLNvyvvPMMNPPOd3HGEAAAAAxzxMpqqmnn333kH00nVfoXqfmxM31Ys888MMMPOd28AARzzzyXVVVbN/n2EX0X2jv+Tt08WM/eXV//AP8A+9/zzww4+fPPKAAF1lln3/fYXeZTeYV+8y0rmE2FuwBzzzzzz8//AM8tPmAAAABw33obnWF3l3mEFLPei+YGch+lb/vP/PPPP/8APLzvZAAAAAqq639t5dld5BBZeUelnjbWLldQ/wA88/8Ae888N/8A/vPnMMMMpp+/lhdh9xBF1ZFFzoe9zJElOd7zzz//APz38/7y08//ADzzxSFbXlWn+EEWWEXmbWe42LSLziEcsMM88/PPP/8Af3PTf888eS9ZF59hBF5hHzfhLdsRXF+zYBBBBBBBBxhNPDz/AG9y9PPK/wB1Xl3kEWUE+/dvX7WqfCr1Yg013333200kEHHEPe/dfzyvOl3X2EEkkeftl0KM+2wg019v32000013nE00kGEPu+UACt1W30EFlkOftOluWCQBTvy7j3nHE0001HHG03n00GEucACq112EE3kMemEU9PHF+LvoCXGvvf3HHHHHHW03GV3E0GEkC/e3kEXUX+sdlOPOHX2nE80k98+9/fP/AB999d9xNdxNxthApf8A4wWSQ+RdJQ+f08YQy/2SKweZU4w7zwww089fXdXdSbwPq6wySUdw90WfWwwQ9X0bf1WzywUS6z2096wzyw8/WZWcwFd4w4Yf6SV/1/f7wRZ2y0Ve+R+19310bxwww8w4ww17fYwKfw1VRTzX0d/wzcy9STxwQcabyxzzza64289zzw0xxw04wIywyaUaUx443x0Vw0QUfyQWbWxxb0zQ+T389zy8zy0zw0QPqxdRdUVVa6wQ1+cUVRd/xTQawQQQ+9wdS+ojutis7wssQNIyaVW3awfwwQbafTQwzf50VRwQSV816y55spnolursjiQDQ/Qaa7Y/UT8wec0/xx0f08ba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uInIn+Pljrirr/332TAMEFUP9/WMefXEvFAkFmZn33k9pWIS8GP9dfRCwrZ3331YKtVF0OsvtPNHNFt9zkBoQx2AQjLZ6FekFnWlNwhiT33315SSctkOfd8cdelXVO3QM/ru8E2IKkQgo3kMv+1jwl33332eeaaANe98sNsM98sPXmxhFNRWceuNsThk0U1cY47z33331I6edktd/r9dutM8EHvdv2nc9/eX1HuURjOccfBbz333331VlllQTg/q77Mf03193clFNOW9XmPFsWMXEVTrCT3333332RheOusbSrJL9OVWdOkdtvdWMl3mVI/kj6xwJqT33333333MePsZabZJSLduWUBBKaoaQ8EdlHdT5hQ5rDIT3333333306JqaKpdVkshuN+ccPaDNuDSaKU+MvPwrrL9z3333333330X0XkG1UOutfHkvP8A328/D55BFZHHr3kCv8999999999999f/AF6163691kmj9qN88f8Ae81P+Pv0Ntfdx33333333333332IJ6pYLarYudk2VlwJymVEFfMNVbKa333333333333333337774L+L4N+H0H32F313512MN9733333333333333333333/xAAsEQACAgAGAQIGAgMBAAAAAAAAAQIRAxASICEwMQRAExQyQVFhIjMjUHFS/9oACAECAQE/AL/2Fl7b32jUW+qivZWWWXney83IvbaLRaLXRQ0++9l7Lzs52st7EJ9LQ132XnZfU3vstZ0UVsa92+C3vrJMTsrNlFFZtV2XlZZYl0SyrO1laNa/JaaErI8b2UUUNdNll5WWRXTJlkseKdM+Yj+T5mI/UnzMmfFY5swW5RQuMl0soca6LLysshH79UiclGNjk5Ss0M0NfkoSKY+D0zVDZHsY1W+87IRt9cmm6s9TJ1SIzIzk/sSl+jExZqSow5NicUuSUofhnppcsXJFUu1qxqn0xTk0kKNKuqX0sePNYnLMTmGoXBDHSMXE1J0JN+TDaRGcPuYrV8GBPTZ6aTnb75K10WYMaVvy+t8o9RGsUl/SkaWaWWyKGmpHJbIcJnpV/j9hJfffhQ1S/SK7PV4L8km/hxyadEF+jRL8DiUNcGHBujAjUK9g1e/Bhph+31UUUTgmuTFgksnFaUKMURmv/JJRf2Fhp3SHF8o9Ph+BKsrLLLLL6pr77cKOqaXV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"
                alt="Prof. Bhagwan Kadam Sir"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  border: "4px solid " + C.gold,
                  boxShadow: "0 0 0 8px rgba(201,168,76,0.2), 0 8px 32px rgba(0,0,0,0.4)",
                  display: "block",
                  margin: "0 auto"
                }}
              />
              <h2 style={{ marginTop: 20, fontSize: 26, fontWeight: 900 }}>Prof. Bhagwan Kadam Sir</h2>
              <p style={{ color: C.gold, fontWeight: 600, marginTop: 4 }}>M.Sc, B.Ed | Mathematics & Physics</p>
              <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {[["10+","Years Experience"],["500+","Students Mentored"],["100/100","Multiple Toppers"],["95%+","Pass Rate"]].map(([v,l]) => (
                  <div key={l} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 10, padding: "14px 8px" }}>
                    <div style={{ color: C.gold, fontWeight: 900, fontSize: 22 }}>{v}</div>
                    <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, marginTop: 2 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center" }}>
                <a href={CALL_LINK} style={{ flex: 1, background: C.gold, color: C.maroon, fontWeight: 700, fontSize: 13, padding: "10px", borderRadius: 8, textDecoration: "none", textAlign: "center" }}>📞 Call Sir</a>
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ flex: 1, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px", borderRadius: 8, textDecoration: "none", textAlign: "center" }}>💬 WhatsApp</a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div style={{ color: C.gold, fontWeight: 700, fontSize: 13, letterSpacing: 1.5, marginBottom: 8 }}>OUR STORY</div>
            <h2 style={{ fontSize: 32, fontWeight: 900, color: C.dark, marginBottom: 16 }}>Built on Trust, Driven by Results</h2>
            <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Rajmata Jijau Academy was founded with one clear mission: to provide world-class Mathematics coaching to students in Vasmat and surrounding areas. Prof. Bhagwan Kadam Sir, with his M.Sc and B.Ed qualifications, has spent over a decade nurturing young minds.
            </p>
            <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
              What began as a small coaching centre has grown into the most trusted name in Mathematics education in the region — with multiple students achieving perfect 100/100 scores in board examinations, and several qualifying for MHT-CET and JEE.
            </p>
            {[
              "Personal attention to every student",
              "Small batches to ensure quality learning",
              "Regular tests simulating board exam pattern",
              "Parent communication and progress tracking",
              "Dedicated doubt-solving sessions",
              "Proven track record across 10+ years",
            ].map(point => (
              <div key={point} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <CheckCircle size={18} color={C.maroon} />
                <span style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>{point}</span>
              </div>
            ))}
            <button onClick={() => setPage("Admissions")} style={{
              marginTop: 28, background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
              color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 28px",
              borderRadius: 8, border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8
            }}>Enquire for Admission <ArrowRight size={18} /></button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// ─── COURSES PAGE ─────────────────────────────────────────────────────────────
function CoursesPage({ setPage }) {
  const courses = [
    {
      class: "Class 5th to 7th", title: "Foundation Program",
      desc: "A carefully designed foundation course that builds strong conceptual understanding in Mathematics, Science, and English from the early years.",
      subjects: ["Mathematics", "Science", "English"],
      boards: ["Semi English Medium", "CBSE Foundation"],
      highlights: ["Conceptual clarity", "Regular assessments", "Strong base for higher classes", "Interactive learning"],
      color: C.maroon
    },
    {
      class: "Class 8th to 10th", title: "Special Mathematics Batches",
      desc: "Our flagship program with the strongest track record. Multiple students have achieved 100/100 in Mathematics under this program.",
      subjects: ["Mathematics (Marathi Medium)", "Mathematics (Semi English)"],
      boards: ["Maharashtra State Board", "Board Examination Preparation"],
      highlights: ["100/100 results history", "Board pattern practice", "Marathi & Semi English", "Regular mock tests"],
      color: "#2C3E6B"
    },
    {
      class: "Class 11th", title: "Mathematics + MHT-CET + JEE",
      desc: "Advanced Mathematics coaching aligned with state board curriculum and competitive exam preparation for MHT-CET and JEE Foundation.",
      subjects: ["Higher Mathematics", "MHT-CET Preparation", "JEE Foundation"],
      boards: ["Maharashtra State Board", "MHT-CET", "JEE Foundation"],
      highlights: ["Advanced problem solving", "Exam strategy", "Competitive exam readiness", "Expert mentoring"],
      color: "#1A6B3A"
    }
  ];

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero title="Our Courses" subtitle="Structured programs from foundation level to board exam and competitive exams" />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        {courses.map((course, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "2fr 3fr" : "3fr 2fr", gap: 40, marginBottom: 60, alignItems: "center", flexWrap: "wrap" }}>
            {i % 2 !== 0 && (
              <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.08)", border: `1px solid ${C.border}`, order: window.innerWidth < 768 ? -1 : 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.gray, letterSpacing: 1, marginBottom: 6 }}>SUBJECTS</div>
                {course.subjects.map(s => <div key={s} style={{ display:"flex",gap:8,alignItems:"center",marginBottom:8 }}><CheckCircle size={16} color={course.color} /><span style={{ fontWeight:500,color:C.dark,fontSize:15 }}>{s}</span></div>)}
                <div style={{ marginTop:18, fontSize:13,fontWeight:700,color:C.gray,letterSpacing:1,marginBottom:8 }}>BOARDS / EXAMS</div>
                {course.boards.map(b => <span key={b} style={{ display:"inline-block",background:`${course.color}15`,color:course.color,fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,margin:"0 4px 6px 0" }}>{b}</span>)}
              </div>
            )}
            <div>
              <div style={{ background:`${course.color}15`, display:"inline-block", color:course.color, fontWeight:700, fontSize:12, padding:"4px 12px", borderRadius:20, marginBottom:10, letterSpacing:0.5 }}>{course.class}</div>
              <h2 style={{ fontSize:30, fontWeight:900, color:C.dark, marginBottom:12 }}>{course.title}</h2>
              <p style={{ color:C.gray, fontSize:15, lineHeight:1.8, marginBottom:20 }}>{course.desc}</p>
              {course.highlights.map(h => (
                <div key={h} style={{ display:"flex",gap:8,alignItems:"center",marginBottom:8 }}>
                  <div style={{ width:20,height:20,borderRadius:"50%",background:course.color,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><CheckCircle size={12} color="#fff" /></div>
                  <span style={{ fontSize:14,color:C.dark,fontWeight:500 }}>{h}</span>
                </div>
              ))}
              <button onClick={() => setPage("Admissions")} style={{ marginTop:20, background:course.color, color:"#fff", fontWeight:700, fontSize:14, padding:"12px 24px", borderRadius:8, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:6 }}>
                Enquire for This Course <ChevronRight size={16} />
              </button>
            </div>
            {i % 2 === 0 && (
              <div style={{ background:"#fff", borderRadius:16, padding:32, boxShadow:"0 4px 24px rgba(0,0,0,0.08)", border:`1px solid ${C.border}` }}>
                <div style={{ fontSize:13,fontWeight:700,color:C.gray,letterSpacing:1,marginBottom:6 }}>SUBJECTS</div>
                {course.subjects.map(s => <div key={s} style={{ display:"flex",gap:8,alignItems:"center",marginBottom:8 }}><CheckCircle size={16} color={course.color} /><span style={{ fontWeight:500,color:C.dark,fontSize:15 }}>{s}</span></div>)}
                <div style={{ marginTop:18,fontSize:13,fontWeight:700,color:C.gray,letterSpacing:1,marginBottom:8 }}>BOARDS / EXAMS</div>
                {course.boards.map(b => <span key={b} style={{ display:"inline-block",background:`${course.color}15`,color:course.color,fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:20,margin:"0 4px 6px 0" }}>{b}</span>)}
              </div>
            )}
          </motion.div>
        ))}
      </section>
    </div>
  );
}

// ─── RESULTS PAGE ─────────────────────────────────────────────────────────────
function ResultsPage() {
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("All");
  const [filterYear, setFilterYear] = useState("All");

  const years = ["All", "2024", "2023", "2022"];
  const classes = ["All", "10th", "9th", "8th"];

  const filtered = TOPPERS.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === "All" || t.class === filterClass;
    const matchYear = filterYear === "All" || t.year === filterYear;
    return matchSearch && matchClass && matchYear;
  });

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero title="Hall of Fame" subtitle="Celebrating every student who made us proud" />

      {/* Stats */}
      <div style={{ background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDark})`, padding: "32px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 0 }}>
          {[["5+","Perfect 100/100"],["100+","Above 90%"],["500+","Total Students"],["10+","Years of Results"]].map(([v,l],i,arr) => (
            <div key={l} style={{ textAlign:"center",padding:"16px 8px",borderRight:i<arr.length-1?"1px solid rgba(201,168,76,0.2)":"none" }}>
              <div style={{ color:C.gold,fontWeight:900,fontSize:32 }}>{v}</div>
              <div style={{ color:"rgba(255,255,255,0.7)",fontSize:12,marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect 100/100 Banner */}
      <section style={{ background: C.cream, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`, color: "#fff", padding: "10px 28px", borderRadius: 40, marginBottom: 16 }}>
              <Trophy size={20} color={C.gold} />
              <span style={{ fontWeight: 800, fontSize: 16 }}>Perfect Score Achievers — 100/100</span>
            </div>
            <p style={{ color: C.gray, fontSize: 15 }}>These exceptional students achieved perfection in Mathematics</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
            {TOPPERS.filter(t => t.marks === 100).map((t, i) => <TopperCard key={t.id} topper={t} rank={i + 1} compact />)}
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section style={{ background: "#fff", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: C.dark, marginBottom: 24 }}>All Achievers</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 10, background: C.lightGray, borderRadius: 8, padding: "10px 16px" }}>
              <Search size={16} color={C.gray} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search student name…"
                style={{ background: "none", border: "none", outline: "none", fontSize: 14, color: C.dark, width: "100%" }} />
            </div>
            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} style={{ padding: "10px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, color: C.dark, background: "#fff" }}>
              {classes.map(c => <option key={c}>{c === "All" ? "All Classes" : `Class ${c}`}</option>)}
            </select>
            <select value={filterYear} onChange={e => setFilterYear(e.target.value)} style={{ padding: "10px 16px", borderRadius: 8, border: `1px solid ${C.border}`, fontSize: 14, color: C.dark, background: "#fff" }}>
              {years.map(y => <option key={y}>{y === "All" ? "All Years" : y}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
            {filtered.map((t, i) => <TopperCard key={t.id} topper={t} rank={i + 1} />)}
          </div>
          {filtered.length === 0 && <div style={{ textAlign: "center", padding: "48px", color: C.gray }}>No students found matching your search.</div>}
        </div>
      </section>

      {/* Year-wise cards */}
      <section style={{ background: C.cream, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: C.dark, marginBottom: 32 }}>Year-wise Results</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            {["2024","2023","2022"].map(year => {
              const ys = TOPPERS.filter(t => t.year === year);
              return (
                <div key={year} style={{ background:"#fff",borderRadius:14,overflow:"hidden",boxShadow:"0 2px 16px rgba(0,0,0,0.07)",border:`1px solid ${C.border}` }}>
                  <div style={{ background:`linear-gradient(135deg,${C.maroon},${C.maroonLight})`,padding:"16px 20px" }}>
                    <div style={{ color:C.gold,fontWeight:900,fontSize:20 }}>Academic Year {year}</div>
                    <div style={{ color:"rgba(255,255,255,0.8)",fontSize:13,marginTop:2 }}>{ys.length} achievers listed</div>
                  </div>
                  <div style={{ padding:"16px 20px" }}>
                    {ys.map(s => (
                      <div key={s.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}` }}>
                        <span style={{ fontWeight:600,color:C.dark,fontSize:14 }}>{s.name}</span>
                        <span style={{ background:s.marks===100?`linear-gradient(135deg,${C.maroon},${C.maroonLight})`:`${C.maroon}15`,color:s.marks===100?"#fff":C.maroon,fontWeight:800,fontSize:13,padding:"2px 10px",borderRadius:20 }}>{s.marks}/100</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── GALLERY PAGE ─────────────────────────────────────────────────────────────
function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Toppers", "Classroom", "Events", "Celebrations"];
  const filtered = activeCategory === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === activeCategory);

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero title="Gallery" subtitle="Moments of achievement, learning, and celebration" />
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        {/* Category filter */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "8px 20px", borderRadius: 30, fontWeight: 700, fontSize: 13,
              background: activeCategory === cat ? C.maroon : "#fff",
              color: activeCategory === cat ? "#fff" : C.gray,
              border: `2px solid ${activeCategory === cat ? C.maroon : C.border}`,
              cursor: "pointer", transition: "all 0.2s"
            }}>{cat}</button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div style={{ columns: "3 280px", columnGap: 16 }}>
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              style={{ marginBottom: 16, breakInside: "avoid" }}>
              <div style={{
                borderRadius: 12, overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                height: [180, 220, 160, 200, 240, 180, 200, 160, 220, 200, 180, 220][i % 12]
              }}>
                <div style={{
                  width: "100%", height: "100%",
                  background: `linear-gradient(135deg, ${item.color}CC, ${item.color}88)`,
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  padding: 20, position: "relative"
                }}>
                  <ImageIcon size={32} color="rgba(255,255,255,0.4)" />
                  <div style={{ marginTop: 12, color: "#fff", fontWeight: 700, fontSize: 13, textAlign: "center" }}>{item.label}</div>
                  <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>{item.category}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── ADMISSIONS PAGE ──────────────────────────────────────────────────────────
function AdmissionsPage() {
  const [form, setForm] = useState({ name: "", mobile: "", class: "", school: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.class || !form.school) {
      alert("Please fill all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero title="Admissions" subtitle="Join Vasmat's most trusted Mathematics coaching institute" />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", flexWrap: "wrap" }}>
          {/* Info */}
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 900, color: C.dark, marginBottom: 16 }}>How to Apply</h2>
            <p style={{ color: C.gray, fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>Fill in the enquiry form and our team will contact you within 24 hours to confirm your seat and provide batch timing details.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { step: "1", title: "Submit Enquiry Form", desc: "Fill in the student details below." },
                { step: "2", title: "Receive Callback", desc: "Prof. Kadam Sir will call you within 24 hours." },
                { step: "3", title: "Visit the Academy", desc: "Come for a trial class and finalise admission." },
                { step: "4", title: "Confirm Your Seat", desc: "Pay fees and secure your batch seat." },
              ].map(s => (
                <div key={s.step} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 14, flexShrink: 0 }}>{s.step}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.dark, fontSize: 15 }}>{s.title}</div>
                    <div style={{ color: C.gray, fontSize: 13, marginTop: 2 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32, padding: 20, background: `${C.maroon}10`, borderRadius: 12, border: `1px solid ${C.maroon}30` }}>
              <div style={{ fontWeight: 700, color: C.maroon, fontSize: 15, marginBottom: 8 }}>Quick Contact</div>
              <a href={CALL_LINK} style={{ display: "flex", alignItems: "center", gap: 8, color: C.dark, textDecoration: "none", fontWeight: 600, fontSize: 14, marginBottom: 8 }}><Phone size={16} color={C.maroon} /> 9206079696</a>
              <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: C.dark, textDecoration: "none", fontWeight: 600, fontSize: 14 }}><MessageCircle size={16} color="#25D366" /> 8208664612 (WhatsApp)</a>
            </div>
          </div>

          {/* Form */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 36, boxShadow: "0 6px 30px rgba(0,0,0,0.1)", border: `1px solid ${C.border}` }}>
            {submitted ? (
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#22C55E20", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <CheckCircle size={36} color="#22C55E" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: C.dark, marginBottom: 8 }}>Enquiry Submitted!</h3>
                <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7 }}>Thank you! Prof. Kadam Sir will contact you within 24 hours. You can also WhatsApp directly for immediate assistance.</p>
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 24px", borderRadius: 8, textDecoration: "none" }}><MessageCircle size={16} /> WhatsApp Now</a>
              </motion.div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: C.dark, marginBottom: 24 }}>Admission Enquiry Form</h3>
                {[
                  { label: "Student Name *", key: "name", placeholder: "Enter full name", type: "text" },
                  { label: "Mobile Number *", key: "mobile", placeholder: "10-digit mobile number", type: "tel" },
                  { label: "School Name *", key: "school", placeholder: "Current school name", type: "text" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, color: C.dark, outline: "none", boxSizing: "border-box", transition: "border 0.2s" }}
                      onFocus={e => e.target.style.border = `2px solid ${C.maroon}`}
                      onBlur={e => e.target.style.border = `2px solid ${C.border}`} />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Class *</label>
                  <select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, color: form.class ? C.dark : C.gray, background: "#fff", boxSizing: "border-box" }}>
                    <option value="">Select Class</option>
                    {["5th","6th","7th","8th","9th","10th","11th"].map(c => <option key={c} value={c}>Class {c}</option>)}
                  </select>
                </div>
                <button onClick={handleSubmit} disabled={loading} style={{
                  width: "100%", background: loading ? C.gray : `linear-gradient(135deg,${C.maroon},${C.maroonLight})`,
                  color: "#fff", fontWeight: 800, fontSize: 16, padding: "14px",
                  borderRadius: 8, border: "none", cursor: loading ? "not-allowed" : "pointer",
                  boxShadow: `0 4px 16px rgba(123,27,42,0.3)`, transition: "all 0.2s"
                }}>
                  {loading ? "Submitting…" : "Submit Enquiry"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function ContactPage() {
  const [form, setForm] = useState({ name: "", mobile: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero title="Contact Us" subtitle="We'd love to hear from you — reach out anytime" />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, color: C.dark, marginBottom: 24 }}>Get In Touch</h2>
            {[
              { icon: <MapPin size={20} />, title: "Address", content: "Near Shri Siddheshwar School,\nChhatrapati Colony, Vasmat, Maharashtra" },
              { icon: <Phone size={20} />, title: "Phone", content: "9206079696", href: CALL_LINK },
              { icon: <MessageCircle size={20} />, title: "WhatsApp", content: "8208664612", href: WA_LINK },
            ].map(item => (
              <div key={item.title} style={{ display: "flex", gap: 14, marginBottom: 24, padding: 20, background: "#fff", borderRadius: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: `1px solid ${C.border}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${C.maroon}15`, display: "flex", alignItems: "center", justifyContent: "center", color: C.maroon, flexShrink: 0 }}>{item.icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.dark, fontSize: 14, marginBottom: 2 }}>{item.title}</div>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("https") ? "_blank" : undefined} rel="noreferrer" style={{ color: C.maroon, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>{item.content}</a>
                  ) : (
                    <div style={{ color: C.gray, fontSize: 14, whiteSpace: "pre-line" }}>{item.content}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div style={{ borderRadius: 14, overflow: "hidden", height: 220, background: `linear-gradient(135deg,${C.maroon}20,${C.gold}20)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}` }}>
              <MapPin size={36} color={C.maroon} />
              <div style={{ fontWeight: 700, color: C.dark, marginTop: 10, fontSize: 15 }}>Rajmata Jijau Academy</div>
              <div style={{ color: C.gray, fontSize: 13, marginTop: 4, textAlign: "center", padding: "0 20px" }}>Near Shri Siddheshwar School, Chhatrapati Colony, Vasmat</div>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 16, padding: 36, boxShadow: "0 6px 30px rgba(0,0,0,0.1)", border: `1px solid ${C.border}` }}>
            {sent ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ textAlign: "center", padding: "32px 0" }}>
                <CheckCircle size={48} color="#22C55E" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontWeight: 900, color: C.dark, fontSize: 20 }}>Message Sent!</h3>
                <p style={{ color: C.gray, marginTop: 8, fontSize: 14 }}>We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: C.dark, marginBottom: 24 }}>Send a Message</h3>
                {[
                  { label: "Your Name", key: "name", placeholder: "Full name", type: "text" },
                  { label: "Mobile Number", key: "mobile", placeholder: "Phone number", type: "tel" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom: 18 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder}
                      style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, color: C.dark, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.dark, marginBottom: 6 }}>Message</label>
                  <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Your enquiry or message…" rows={4}
                    style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: `2px solid ${C.border}`, fontSize: 14, color: C.dark, outline: "none", boxSizing: "border-box", resize: "vertical" }} />
                </div>
                <button onClick={() => setSent(true)} style={{ width: "100%", background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`, color: "#fff", fontWeight: 800, fontSize: 16, padding: "14px", borderRadius: 8, border: "none", cursor: "pointer" }}>Send Message</button>
                <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px", borderRadius: 8, textDecoration: "none" }}><MessageCircle size={16} /> Or WhatsApp Us Directly</a>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [toppers, setToppers] = useState(TOPPERS);
  const [announcements, setAnnouncements] = useState(ANNOUNCEMENTS);
  const [newAnn, setNewAnn] = useState("");
  const [newTopper, setNewTopper] = useState({ name: "", class: "", marks: "", subject: "Mathematics", year: "2025" });
  const [gallery, setGallery] = useState(GALLERY_ITEMS);
  const [editingId, setEditingId] = useState(null);

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={16} /> },
    { key: "results", label: "Results", icon: <Trophy size={16} /> },
    { key: "gallery", label: "Gallery", icon: <ImageIcon size={16} /> },
    { key: "announcements", label: "Announcements", icon: <Bell size={16} /> },
  ];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "#F0F2F5" }}>
      <div style={{ background: C.maroonDark, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ color: C.gold, fontWeight: 900, fontSize: 18 }}>⚙ Admin Panel</div>
        <div style={{ background: "rgba(201,168,76,0.2)", color: C.gold, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>DEMO MODE</div>
        <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: 12 }}>Rajmata Jijau Academy</div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px", display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, alignItems: "start" }}>
        {/* Sidebar */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 12, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "11px 14px", borderRadius: 8, border: "none", cursor: "pointer", marginBottom: 4,
              background: activeTab === tab.key ? `${C.maroon}15` : "transparent",
              color: activeTab === tab.key ? C.maroon : C.gray,
              fontWeight: activeTab === tab.key ? 700 : 500, fontSize: 14,
              textAlign: "left"
            }}>{tab.icon} {tab.label}</button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "dashboard" && (
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 24 }}>
                {[
                  { label: "Total Students", value: toppers.length, icon: <Users size={20} />, color: C.maroon },
                  { label: "Perfect Scorers", value: toppers.filter(t => t.marks === 100).length, icon: <Trophy size={20} />, color: "#C9A84C" },
                  { label: "Announcements", value: announcements.length, icon: <Bell size={20} />, color: "#2C3E6B" },
                  { label: "Gallery Items", value: gallery.length, icon: <ImageIcon size={20} />, color: "#1A6B3A" },
                ].map(stat => (
                  <div key={stat.label} style={{ background: "#fff", borderRadius: 12, padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 10, background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: stat.color }}>{stat.icon}</div>
                    <div><div style={{ fontSize: 26, fontWeight: 900, color: C.dark }}>{stat.value}</div><div style={{ fontSize: 12, color: C.gray }}>{stat.label}</div></div>
                  </div>
                ))}
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}>Recent Enquiries (Mock)</h3>
                {[
                  { name: "Rahul Shinde", class: "9th", time: "2 hrs ago" },
                  { name: "Pooja Desai", class: "10th", time: "5 hrs ago" },
                  { name: "Amit Patil", class: "11th", time: "Yesterday" },
                ].map(e => (
                  <div key={e.name} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}><Avatar name={e.name} size={36} /><div><div style={{ fontWeight:600,color:C.dark,fontSize:14 }}>{e.name}</div><div style={{ color:C.gray,fontSize:12 }}>Class {e.class}</div></div></div>
                    <span style={{ color:C.gray,fontSize:12 }}>{e.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, marginBottom: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}>Add New Student</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
                  {[
                    { label: "Name", key: "name", placeholder: "Student name" },
                    { label: "Class", key: "class", placeholder: "e.g. 10th" },
                    { label: "Marks", key: "marks", placeholder: "e.g. 100" },
                    { label: "Year", key: "year", placeholder: "e.g. 2025" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize: 12, fontWeight: 700, color: C.gray, display: "block", marginBottom: 4 }}>{f.label}</label>
                      <input value={newTopper[f.key]} onChange={e => setNewTopper({ ...newTopper, [f.key]: e.target.value })} placeholder={f.placeholder}
                        style={{ width: "100%", padding: "9px 12px", borderRadius: 7, border: `1px solid ${C.border}`, fontSize: 13, boxSizing: "border-box" }} />
                    </div>
                  ))}
                </div>
                <button onClick={() => {
                  if (!newTopper.name || !newTopper.class || !newTopper.marks) return;
                  setToppers([...toppers, { ...newTopper, id: Date.now(), marks: parseInt(newTopper.marks), total: 100, avatar: null }]);
                  setNewTopper({ name: "", class: "", marks: "", subject: "Mathematics", year: "2025" });
                }} style={{ marginTop: 14, background: C.maroon, color: "#fff", fontWeight: 700, fontSize: 13, padding: "10px 20px", borderRadius: 7, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <Plus size={14} /> Add Student
                </button>
              </div>
              <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}>All Students ({toppers.length})</h3>
                {toppers.map(t => (
                  <div key={t.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}` }}>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <Avatar name={t.name} size={38} />
                      <div><div style={{ fontWeight:600,color:C.dark,fontSize:14 }}>{t.name}</div><div style={{ color:C.gray,fontSize:12 }}>Class {t.class} | {t.year}</div></div>
                    </div>
                    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                      <span style={{ background:t.marks===100?`${C.maroon}15`:"#f0f0f0",color:t.marks===100?C.maroon:C.gray,fontWeight:800,fontSize:13,padding:"3px 12px",borderRadius:20 }}>{t.marks}/100</span>
                      <button onClick={() => setToppers(toppers.filter(x => x.id !== t.id))} style={{ background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:6,padding:"6px 8px",cursor:"pointer" }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20 }}>
                <h3 style={{ fontWeight:800,color:C.dark }}>Gallery Management</h3>
                <button style={{ background:C.maroon,color:"#fff",fontWeight:700,fontSize:13,padding:"9px 16px",borderRadius:7,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
                  <Plus size={14} /> Upload Image (Mock)
                </button>
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14 }}>
                {gallery.map(item => (
                  <div key={item.id} style={{ borderRadius:10,overflow:"hidden",border:`1px solid ${C.border}`,position:"relative" }}>
                    <div style={{ height:120,background:`linear-gradient(135deg,${item.color}AA,${item.color}66)`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <ImageIcon size={24} color="rgba(255,255,255,0.6)" />
                    </div>
                    <div style={{ padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                      <div style={{ fontSize:12,fontWeight:600,color:C.dark,flex:1,marginRight:8 }}>{item.label}</div>
                      <button onClick={() => setGallery(gallery.filter(g => g.id !== item.id))} style={{ background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:5,padding:"4px 6px",cursor:"pointer",flexShrink:0 }}><Trash2 size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div>
              <div style={{ background:"#fff",borderRadius:12,padding:24,marginBottom:20,boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight:800,color:C.dark,marginBottom:14 }}>Create Announcement</h3>
                <div style={{ display:"flex",gap:10 }}>
                  <input value={newAnn} onChange={e => setNewAnn(e.target.value)} placeholder="e.g. Admissions Open for New Batch" style={{ flex:1,padding:"10px 14px",borderRadius:8,border:`1px solid ${C.border}`,fontSize:14 }} />
                  <button onClick={() => {
                    if (!newAnn.trim()) return;
                    setAnnouncements([...announcements, { id: Date.now(), text: newAnn, date: "2025" }]);
                    setNewAnn("");
                  }} style={{ background:C.maroon,color:"#fff",fontWeight:700,fontSize:13,padding:"10px 18px",borderRadius:8,border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6 }}>
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
              <div style={{ background:"#fff",borderRadius:12,padding:24,boxShadow:"0 2px 12px rgba(0,0,0,0.06)" }}>
                <h3 style={{ fontWeight:800,color:C.dark,marginBottom:16 }}>Active Announcements</h3>
                {announcements.map(a => (
                  <div key={a.id} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:C.cream,borderRadius:8,marginBottom:10,border:`1px solid ${C.border}` }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600,color:C.dark,fontSize:14 }}>{a.text}</div>
                      <div style={{ color:C.gray,fontSize:12,marginTop:2 }}>{a.date}</div>
                    </div>
                    <button onClick={() => setAnnouncements(announcements.filter(x => x.id !== a.id))} style={{ background:"#FEE2E2",color:"#DC2626",border:"none",borderRadius:6,padding:"6px 8px",cursor:"pointer",marginLeft:10 }}><Trash2 size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, gold, light }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 900, color: light ? "#fff" : C.dark, lineHeight: 1.2, marginBottom: 10 }}>
        {title}
      </h2>
      {subtitle && <p style={{ fontSize: 15, color: light ? "rgba(255,255,255,0.7)" : C.gray, lineHeight: 1.6 }}>{subtitle}</p>}
      <div style={{ width: 60, height: 3, background: `linear-gradient(90deg,${C.maroon},${C.gold})`, borderRadius: 2, margin: "16px auto 0" }} />
    </div>
  );
}

function PageHero({ title, subtitle }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${C.maroonDark} 0%, ${C.maroon} 100%)`,
      padding: "56px 24px 48px",
      textAlign: "center", position: "relative", overflow: "hidden"
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)` }} />
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", position: "relative", zIndex: 1, marginBottom: 8 }}>{title}</motion.h1>
      {subtitle && <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 15, position: "relative", zIndex: 1 }}>{subtitle}</p>}
      <div style={{ width: 50, height: 3, background: C.gold, borderRadius: 2, margin: "16px auto 0", position: "relative", zIndex: 1 }} />
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: C.dark, color: "#fff", padding: "48px 24px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, display: "flex", alignItems: "center", justifyContent: "center" }}><GraduationCap size={20} color={C.maroon} /></div>
              <div><div style={{ fontWeight: 800, color: C.gold, fontSize: 14 }}>RAJMATA JIJAU ACADEMY</div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Vasmat, Maharashtra</div></div>
            </div>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.7 }}>Vasmat's most trusted Mathematics coaching institute with a proven track record of 100/100 results and competitive exam success.</p>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: C.gold, fontSize: 13, letterSpacing: 1, marginBottom: 14 }}>QUICK LINKS</div>
            {["Home","About","Courses","Results","Gallery","Admissions","Contact"].map(link => (
              <button key={link} onClick={() => setPage(link)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: 13, padding: "5px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }}>{link}</button>
            ))}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: C.gold, fontSize: 13, letterSpacing: 1, marginBottom: 14 }}>CONTACT</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <MapPin size={14} color={C.gold} style={{ marginTop: 2, flexShrink: 0 }} />
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, lineHeight: 1.6 }}>Near Shri Siddheshwar School, Chhatrapati Colony, Vasmat, Maharashtra</span>
            </div>
            <a href={CALL_LINK} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13 }}>
              <Phone size={14} color={C.gold} /> 9206079696
            </a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ display: "flex", gap: 10, alignItems: "center", color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13 }}>
              <MessageCircle size={14} color="#25D366" /> 8208664612 (WhatsApp)
            </a>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: C.gold, fontSize: 13, letterSpacing: 1, marginBottom: 14 }}>COURSES</div>
            {["Class 5th–7th Foundation","Class 8th–10th Mathematics","Class 11th + MHT-CET","Class 11th + JEE Foundation"].map(c => (
              <div key={c} style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 7 }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>© 2025 Rajmata Jijau Academy. All rights reserved. | Prof. Bhagwan Kadam Sir</div>
          <div style={{ display: "flex", gap: 16 }}>
            <a href={CALL_LINK} style={{ color: C.gold, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}><Phone size={14} /> Call</a>
            <a href={WA_LINK} target="_blank" rel="noreferrer" style={{ color: "#25D366", fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 5 }}><MessageCircle size={14} /> WhatsApp</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp button
function FloatingWA() {
  return (
    <motion.a href={WA_LINK} target="_blank" rel="noreferrer"
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      style={{
        position: "fixed", bottom: 28, right: 24, zIndex: 999,
        width: 58, height: 58, borderRadius: "50%",
        background: "#25D366",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        textDecoration: "none"
      }}>
      <MessageCircle size={26} color="#fff" />
    </motion.a>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");

  // scroll to top on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "Home":       return <HomePage setPage={setPage} />;
      case "About":      return <AboutPage setPage={setPage} />;
      case "Courses":    return <CoursesPage setPage={setPage} />;
      case "Results":    return <ResultsPage />;
      case "Gallery":    return <GalleryPage />;
      case "Admissions": return <AdmissionsPage />;
      case "Contact":    return <ContactPage />;
      case "admin":      return <AdminPage />;
      default:           return <HomePage setPage={setPage} />;
    }
  };

  const isAdmin = page === "admin";

  return (
    <div style={{ fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif", minHeight: "100vh", background: "#fff" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; }
        @media (max-width: 900px) {
          .grid-2col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .hide-mobile { display: none !important; }
        }
        button:hover { opacity: 0.9; }
        a:hover { opacity: 0.85; }
      `}</style>

      {!isAdmin && <Navbar page={page} setPage={setPage} />}

      <AnimatePresence mode="wait">
        <motion.div key={page} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {!isAdmin && <Footer setPage={setPage} />}
      {!isAdmin && <FloatingWA />}

      {/* Hidden admin route hint */}
      {page === "Home" && (
        <button onClick={() => setPage("admin")} style={{ position: "fixed", bottom: 28, left: 24, background: "rgba(0,0,0,0.15)", border: "none", color: "rgba(0,0,0,0.3)", fontSize: 10, padding: "4px 8px", borderRadius: 4, cursor: "pointer", zIndex: 999 }}>
          admin
        </button>
      )}
    </div>
  );
}
