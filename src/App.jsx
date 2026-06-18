import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  Star,
  Award,
  Users,
  BookOpen,
  CheckCircle,
  ChevronRight,
  MapPin,
  Mail,
  Trophy,
  Target,
  GraduationCap,
  Clock,
  Zap,
  Heart,
  Search,
  Filter,
  Plus,
  Trash2,
  Edit3,
  Bell,
  LayoutDashboard,
  Image as ImageIcon,
  ChevronDown,
  ArrowRight,
  Quote,
} from "lucide-react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────

const TOPPERS = [
  {
    id: 1,
    name: "Divyaraj Khandare",
    marks: 100,
    total: 100,
    class: "10th",
    year: "2024",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 2,
    name: "Disha Lohate",
    marks: 100,
    total: 100,
    class: "10th",
    year: "2024",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 3,
    name: "Triveni Dhadkakar",
    marks: 100,
    total: 100,
    class: "10th",
    year: "2023",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 4,
    name: "Vaishnavi Garje",
    marks: 100,
    total: 100,
    class: "10th",
    year: "2023",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 5,
    name: "Data Kote",
    marks: 100,
    total: 100,
    class: "10th",
    year: "2022",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 6,
    name: "Priya Shinde",
    marks: 98,
    total: 100,
    class: "10th",
    year: "2024",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 7,
    name: "Rohan Patil",
    marks: 97,
    total: 100,
    class: "9th",
    year: "2024",
    subject: "Mathematics",
    avatar: null,
  },
  {
    id: 8,
    name: "Sneha Deshmukh",
    marks: 96,
    total: 100,
    class: "8th",
    year: "2024",
    subject: "Mathematics",
    avatar: null,
  },
];

const TESTIMONIALS = [
  {
    name: "Ananya Kulkarni",
    role: "Class 10 Student",
    text: "Kadam Sir explains each concept so clearly that even the hardest problems feel simple. I scored 98 in Maths thanks to his guidance. His teaching style is truly unique.",
    stars: 5,
    type: "Student",
  },
  {
    name: "Mrs. Sunita Lohate",
    role: "Parent of Disha Lohate",
    text: "My daughter scored 100/100 in Mathematics. We are extremely grateful to Prof. Kadam Sir. The academy provides personal attention and regular tests that kept her on track.",
    stars: 5,
    type: "Parent",
  },
  {
    name: "Divyaraj Khandare",
    role: "100/100 Topper, Class 10",
    text: "Scoring 100 in Maths was my dream, and Kadam Sir made it possible. The doubt-solving sessions and small batch size helped me understand every topic thoroughly.",
    stars: 5,
    type: "Topper",
  },
];

const ANNOUNCEMENTS = [
  {
    id: 1,
    text: "🎉 Admissions Open for 2025–26 Academic Year!",
    date: "June 2025",
  },
  {
    id: 2,
    text: "📚 New Batch Starting 23rd July — 8th to 10th Mathematics",
    date: "July 2025",
  },
  {
    id: 3,
    text: "🏆 11th Mathematics + MHT-CET Batch from 1st August",
    date: "August 2025",
  },
];

const GALLERY_ITEMS = [
  {
    id: 1,
    category: "Toppers",
    label: "Board Exam Toppers 2024",
    color: "#7B1B2A",
  },
  {
    id: 2,
    category: "Classroom",
    label: "Mathematics Lecture Session",
    color: "#2C3E6B",
  },
  {
    id: 3,
    category: "Events",
    label: "Annual Prize Distribution",
    color: "#1A6B3A",
  },
  {
    id: 4,
    category: "Toppers",
    label: "100/100 Achievement Wall",
    color: "#7B1B2A",
  },
  {
    id: 5,
    category: "Classroom",
    label: "Small Batch Teaching",
    color: "#2C3E6B",
  },
  {
    id: 6,
    category: "Celebrations",
    label: "Students' Day Celebration",
    color: "#6B3A1A",
  },
  { id: 7, category: "Events", label: "Parents' Meet 2024", color: "#1A6B3A" },
  {
    id: 8,
    category: "Toppers",
    label: "District Topper Felicitation",
    color: "#7B1B2A",
  },
  {
    id: 9,
    category: "Classroom",
    label: "Doubt Solving Session",
    color: "#2C3E6B",
  },
  {
    id: 10,
    category: "Celebrations",
    label: "Diwali Celebration",
    color: "#6B3A1A",
  },
  {
    id: 11,
    category: "Toppers",
    label: "Science Olympiad Winners",
    color: "#7B1B2A",
  },
  {
    id: 12,
    category: "Events",
    label: "Exam Result Announcement",
    color: "#1A6B3A",
  },
];

const WHATSAPP_MSG = encodeURIComponent(
  "Hello Sir,\n\nI would like to enquire about admission at Rajmata Jijau Academy.\n\nStudent Name:\nClass:\nSchool:\n\nPlease provide details regarding fees and batch timings.",
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
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${bg}, ${C.gold})`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.3,
        fontWeight: 800,
        flexShrink: 0,
        letterSpacing: 1,
      }}
    >
      {initials}
    </div>
  );
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const links = [
    "Home",
    "About",
    "Courses",
    "Results",
    "Gallery",
    "Admissions",
    "Contact",
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bg = scrolled
    ? "rgba(123,27,42,0.97)"
    : "linear-gradient(180deg, rgba(123,27,42,0.95) 0%, rgba(123,27,42,0.7) 100%)";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: bg,
        backdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
        transition: "all 0.3s",
        borderBottom: `1px solid rgba(201,168,76,0.3)`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => {
            setPage("Home");
            setOpen(false);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <GraduationCap size={22} color={C.maroon} strokeWidth={2.5} />
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                color: C.gold,
                fontWeight: 800,
                fontSize: 15,
                lineHeight: 1.1,
                letterSpacing: 0.3,
              }}
            >
              RAJMATA JIJAU
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: 1,
              }}
            >
              ACADEMY
            </div>
          </div>
        </button>

        {/* Desktop Links */}
        <div
          style={{ display: "flex", gap: 4, alignItems: "center" }}
          className="desktop-nav"
        >
          {links.map((l) => (
            <button
              key={l}
              onClick={() => setPage(l)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: page === l ? C.gold : "rgba(255,255,255,0.85)",
                fontWeight: page === l ? 700 : 500,
                fontSize: 14,
                padding: "6px 12px",
                borderRadius: 6,
                borderBottom:
                  page === l ? `2px solid ${C.gold}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {l}
            </button>
          ))}
          <a
            href={CALL_LINK}
            style={{
              marginLeft: 8,
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              color: C.maroon,
              fontWeight: 700,
              fontSize: 13,
              padding: "8px 18px",
              borderRadius: 6,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 8px rgba(201,168,76,0.4)",
            }}
          >
            <Phone size={14} /> Call Now
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            display: "none",
          }}
          className="hamburger"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              background: C.maroonDark,
              overflow: "hidden",
              borderTop: `1px solid rgba(201,168,76,0.2)`,
            }}
          >
            {links.map((l) => (
              <button
                key={l}
                onClick={() => {
                  setPage(l);
                  setOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  background: "none",
                  border: "none",
                  color: page === l ? C.gold : "rgba(255,255,255,0.85)",
                  fontWeight: page === l ? 700 : 500,
                  fontSize: 16,
                  padding: "14px 24px",
                  textAlign: "left",
                  cursor: "pointer",
                  borderBottom: `1px solid rgba(255,255,255,0.06)`,
                }}
              >
                {l}
              </button>
            ))}
            <div
              style={{ padding: "12px 24px 16px", display: "flex", gap: 10 }}
            >
              <a
                href={CALL_LINK}
                style={{
                  flex: 1,
                  background: C.gold,
                  color: C.maroon,
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "10px",
                  borderRadius: 6,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                📞 Call Now
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  flex: 1,
                  background: "#25D366",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "10px",
                  borderRadius: 6,
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                💬 WhatsApp
              </a>
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={{ textAlign: "center", padding: "24px 16px" }}
    >
      <div
        style={{ fontSize: 44, fontWeight: 900, color: C.gold, lineHeight: 1 }}
      >
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.75)",
          marginTop: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

function TopperCard({ topper, rank, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(123,27,42,0.12)",
        border: `1px solid ${C.border}`,
        position: "relative",
      }}
    >
      {/* Gold top bar */}
      <div
        style={{
          height: 4,
          background: `linear-gradient(90deg, ${C.maroon}, ${C.gold})`,
        }}
      />
      <div
        style={{
          padding: compact ? "20px 16px" : "28px 24px",
          textAlign: "center",
        }}
      >
        {rank && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
              color: C.maroon,
              fontWeight: 800,
              fontSize: 12,
              padding: "3px 10px",
              borderRadius: 20,
            }}
          >
            #{rank}
          </div>
        )}
        <Avatar name={topper.name} size={compact ? 64 : 80} />
        <div
          style={{
            marginTop: 14,
            fontWeight: 800,
            fontSize: compact ? 15 : 17,
            color: C.dark,
          }}
        >
          {topper.name}
        </div>
        <div style={{ fontSize: 12, color: C.gray, marginTop: 3 }}>
          Class {topper.class} | {topper.year}
        </div>
        {/* 100/100 stamp */}
        <div
          style={{
            marginTop: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
            color: "#fff",
            fontWeight: 900,
            fontSize: compact ? 18 : 22,
            padding: "8px 20px",
            borderRadius: 40,
            boxShadow: `0 4px 12px rgba(123,27,42,0.3)`,
          }}
        >
          <Trophy size={compact ? 14 : 16} /> {topper.marks}/{topper.total}
        </div>
        <div
          style={{
            fontSize: 11,
            color: C.gold,
            fontWeight: 700,
            marginTop: 6,
            letterSpacing: 0.5,
          }}
        >
          MATHEMATICS
        </div>
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
      <section
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${C.maroonDark} 0%, ${C.maroon} 50%, #3D0E17 100%)`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 68,
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(201,168,76,0.06) 0%, transparent 50%)`,
          }}
        />
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            right: -100,
            top: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: `1px solid rgba(201,168,76,0.15)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -50,
            top: -50,
            width: 250,
            height: 250,
            borderRadius: "50%",
            border: `1px solid rgba(201,168,76,0.1)`,
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "60px 24px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 60,
            flexWrap: "wrap",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div style={{ flex: "1 1 480px" }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(201,168,76,0.15)",
                border: `1px solid rgba(201,168,76,0.4)`,
                borderRadius: 30,
                padding: "6px 16px",
                marginBottom: 24,
              }}
            >
              <Star size={14} color={C.gold} fill={C.gold} />
              <span
                style={{
                  color: C.gold,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                }}
              >
                VASMAT'S PREMIER COACHING INSTITUTE
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: "clamp(34px,5vw,58px)",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              Rajmata Jijau
              <br />
              <span
                style={{
                  background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Academy
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                fontSize: "clamp(16px,2vw,22px)",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Mathematics Excellence From 5th To 11th
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 36,
              }}
            >
              {[
                "100/100 Results",
                "MHT-CET",
                "JEE Foundation",
                "Marathi & Semi English",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 12,
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <button
                onClick={() => setPage("Admissions")}
                style={{
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
                  color: C.maroonDark,
                  fontWeight: 800,
                  fontSize: 16,
                  padding: "14px 32px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(201,168,76,0.4)",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                Apply Now <ArrowRight size={18} />
              </button>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "2px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "14px 28px",
                  borderRadius: 8,
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backdropFilter: "blur(10px)",
                }}
              >
                <MessageCircle size={18} /> WhatsApp Enquiry
              </a>
            </motion.div>
          </div>

          {/* Faculty card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{ flex: "0 1 320px" }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                border: `1px solid rgba(201,168,76,0.3)`,
                borderRadius: 20,
                padding: 28,
                textAlign: "center",
              }}
            >
              <Avatar name="Bhagwan Kadam" size={100} bg={C.maroonDark} />
              <div
                style={{
                  marginTop: 16,
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                Prof. Bhagwan Kadam Sir
              </div>
              <div
                style={{
                  color: C.gold,
                  fontSize: 13,
                  fontWeight: 600,
                  marginTop: 4,
                }}
              >
                M.Sc, B.Ed
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                Mathematics & Physics
              </div>
              <div
                style={{
                  marginTop: 16,
                  borderTop: `1px solid rgba(201,168,76,0.2)`,
                  paddingTop: 16,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {[
                    ["10+", "Years Exp."],
                    ["500+", "Students"],
                    ["100/100", "Toppers"],
                  ].map(([v, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div
                        style={{ color: C.gold, fontWeight: 900, fontSize: 20 }}
                      >
                        {v}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.6)",
                          fontSize: 10,
                          marginTop: 2,
                        }}
                      >
                        {l}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ANNOUNCEMENTS TICKER */}
      <div
        style={{ background: C.gold, padding: "10px 0", overflow: "hidden" }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            gap: 40,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {ANNOUNCEMENTS.map((a) => (
            <span
              key={a.id}
              style={{
                color: C.maroonDark,
                fontWeight: 700,
                fontSize: 13,
                whiteSpace: "nowrap",
              }}
            >
              {a.text}
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section
        ref={statsRef}
        style={{
          background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDark})`,
          padding: "48px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 0,
            borderRadius: 12,
            overflow: "hidden",
            border: `1px solid rgba(201,168,76,0.2)`,
          }}
        >
          {[
            ["500+", "Students Guided"],
            ["100+", "Scored Above 90%"],
            ["5+", "Scored 100/100"],
            ["10+", "Years of Excellence"],
          ].map(([v, l], i) => (
            <div
              key={l}
              style={{
                borderRight: i < 3 ? `1px solid rgba(201,168,76,0.2)` : "none",
              }}
            >
              <StatCard value={v} label={l} start={statsInView} />
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader
            title="Why Choose Us?"
            subtitle="What makes Rajmata Jijau Academy the first choice of parents in Vasmat"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {[
              {
                icon: <Target size={28} />,
                title: "Result-Oriented Teaching",
                desc: "Every lesson is designed to maximize marks. Our teaching methodology is proven and refined over 10+ years.",
              },
              {
                icon: <GraduationCap size={28} />,
                title: "Expert Faculty",
                desc: "Prof. Bhagwan Kadam Sir holds M.Sc, B.Ed and brings deep subject expertise in Mathematics and Physics.",
              },
              {
                icon: <CheckCircle size={28} />,
                title: "Regular Tests & Feedback",
                desc: "Weekly tests, detailed report cards, and parent updates ensure no student falls behind.",
              },
              {
                icon: <Users size={28} />,
                title: "Small Batch Attention",
                desc: "Limited seats per batch guarantee that every student receives personal attention from the teacher.",
              },
              {
                icon: <BookOpen size={28} />,
                title: "Strong Fundamentals",
                desc: "We build concepts from the ground up, ensuring students excel not just in boards but also in CET and JEE.",
              },
              {
                icon: <Heart size={28} />,
                title: "Parent Trust & Satisfaction",
                desc: "Hundreds of parents trust us year after year — a testament to our consistent results and genuine care.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 28,
                  boxShadow: "0 2px 16px rgba(123,27,42,0.07)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 12,
                    background: `linear-gradient(135deg, ${C.maroon}15, ${C.gold}20)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.maroon,
                    marginBottom: 16,
                  }}
                >
                  {item.icon}
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 17,
                    color: C.dark,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                <div style={{ fontSize: 14, color: C.gray, lineHeight: 1.6 }}>
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES OVERVIEW */}
      <section style={{ background: "#fff", padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader
            title="Our Courses"
            subtitle="Structured programs from foundation to board level and competitive exams"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 28,
              marginTop: 48,
            }}
          >
            {[
              {
                class: "5th – 7th",
                title: "Foundation Program",
                subjects: ["Mathematics", "Science", "English"],
                boards: ["Semi English", "CBSE Foundation"],
                color: C.maroon,
                icon: <BookOpen size={24} />,
                tag: "Foundation",
              },
              {
                class: "8th – 10th",
                title: "Special Mathematics",
                subjects: [
                  "Mathematics (Marathi)",
                  "Mathematics (Semi-English)",
                ],
                boards: ["Maharashtra State Board", "Board Exam Prep"],
                color: "#2C3E6B",
                icon: <Target size={24} />,
                tag: "Most Popular",
              },
              {
                class: "11th",
                title: "Mathematics + CET + JEE",
                subjects: [
                  "Higher Mathematics",
                  "MHT-CET Prep",
                  "JEE Foundation",
                ],
                boards: [
                  "Maharashtra State Board",
                  "MHT-CET",
                  "JEE Foundation",
                ],
                color: "#1A6B3A",
                icon: <Award size={24} />,
                tag: "Advanced",
              },
            ].map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
                  border: `1px solid ${C.border}`,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    background: `linear-gradient(135deg, ${course.color}, ${course.color}DD)`,
                    padding: "28px 24px",
                    color: "#fff",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 8,
                        padding: 10,
                      }}
                    >
                      {course.icon}
                    </div>
                    <span
                      style={{
                        background: C.gold,
                        color: C.maroon,
                        fontSize: 11,
                        fontWeight: 800,
                        padding: "3px 10px",
                        borderRadius: 20,
                      }}
                    >
                      {course.tag}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      opacity: 0.8,
                      letterSpacing: 1,
                      marginBottom: 4,
                    }}
                  >
                    CLASS {course.class}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900 }}>
                    {course.title}
                  </div>
                </div>
                <div style={{ background: "#fff", padding: "20px 24px" }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: C.gray,
                      letterSpacing: 0.8,
                      marginBottom: 10,
                    }}
                  >
                    SUBJECTS COVERED
                  </div>
                  {course.subjects.map((s) => (
                    <div
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 6,
                      }}
                    >
                      <CheckCircle size={14} color={course.color} />
                      <span
                        style={{ fontSize: 14, color: C.dark, fontWeight: 500 }}
                      >
                        {s}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: 16,
                      borderTop: `1px solid ${C.border}`,
                      paddingTop: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.gray,
                        letterSpacing: 0.8,
                        marginBottom: 8,
                      }}
                    >
                      BOARDS
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {course.boards.map((b) => (
                        <span
                          key={b}
                          style={{
                            background: `${course.color}15`,
                            color: course.color,
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setPage("Admissions")}
                    style={{
                      marginTop: 18,
                      width: "100%",
                      background: course.color,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 14,
                      padding: "11px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    Enquire Now <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TOPPERS */}
      <section style={{ background: C.cream, padding: "72px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader
            title="Our Hall of Fame"
            subtitle="Students who achieved the pinnacle — 100/100 in Mathematics"
            gold
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
              marginTop: 48,
            }}
          >
            {TOPPERS.slice(0, 5).map((t, i) => (
              <TopperCard key={t.id} topper={t} rank={i + 1} compact />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <button
              onClick={() => setPage("Results")}
              style={{
                background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "13px 32px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: `0 4px 16px rgba(123,27,42,0.3)`,
              }}
            >
              View All Results <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.maroonDark}, ${C.maroon})`,
          padding: "72px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader
            title="What They Say"
            subtitle="Words from our students and parents"
            light
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
              marginTop: 48,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16,
                  padding: 28,
                }}
              >
                <Quote
                  size={32}
                  color={C.gold}
                  style={{ opacity: 0.6, marginBottom: 12 }}
                />
                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 14,
                    lineHeight: 1.7,
                    marginBottom: 20,
                  }}
                >
                  {t.text}
                </p>
                <div style={{ display: "flex", gap: 3, marginBottom: 14 }}>
                  {Array(t.stars)
                    .fill(0)
                    .map((_, j) => (
                      <Star key={j} size={14} color={C.gold} fill={C.gold} />
                    ))}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar name={t.name} size={44} />
                  <div>
                    <div
                      style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}
                    >
                      {t.name}
                    </div>
                    <div style={{ color: C.gold, fontSize: 12 }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION CTA */}
      <section
        style={{
          background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`,
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: C.maroon,
              letterSpacing: 2,
              marginBottom: 8,
            }}
          >
            LIMITED SEATS AVAILABLE
          </div>
          <h2
            style={{
              fontSize: "clamp(28px,4vw,44px)",
              fontWeight: 900,
              color: C.maroonDark,
              marginBottom: 12,
            }}
          >
            Admissions Open 2025–26
          </h2>
          <p
            style={{
              fontSize: 16,
              color: C.maroon,
              marginBottom: 32,
              maxWidth: 500,
              margin: "0 auto 32px",
            }}
          >
            Secure your child's future with Vasmat's most trusted coaching
            institute. Seats filling fast!
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setPage("Admissions")}
              style={{
                background: C.maroon,
                color: "#fff",
                fontWeight: 800,
                fontSize: 16,
                padding: "14px 36px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              Apply Now
            </button>
            <a
              href={CALL_LINK}
              style={{
                background: "#fff",
                color: C.maroon,
                fontWeight: 800,
                fontSize: 16,
                padding: "14px 32px",
                borderRadius: 8,
                textDecoration: "none",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              }}
            >
              Request Callback
            </a>
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
      <PageHero
        title="About the Academy"
        subtitle="A decade of transforming students into achievers"
      />
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
                borderRadius: 20,
                padding: 40,
                color: "#fff",
                textAlign: "center",
              }}
            >
              <Avatar name="Bhagwan Kadam" size={120} bg={C.maroonDark} />
              <h2 style={{ marginTop: 20, fontSize: 26, fontWeight: 900 }}>
                Prof. Bhagwan Kadam Sir
              </h2>
              <p style={{ color: C.gold, fontWeight: 600, marginTop: 4 }}>
                M.Sc, B.Ed | Mathematics & Physics
              </p>
              <div
                style={{
                  marginTop: 24,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                {[
                  ["10+", "Years Experience"],
                  ["500+", "Students Mentored"],
                  ["100/100", "Multiple Toppers"],
                  ["95%+", "Pass Rate"],
                ].map(([v, l]) => (
                  <div
                    key={l}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: 10,
                      padding: "14px 8px",
                    }}
                  >
                    <div
                      style={{ color: C.gold, fontWeight: 900, fontSize: 22 }}
                    >
                      {v}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.75)",
                        fontSize: 11,
                        marginTop: 2,
                      }}
                    >
                      {l}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: 24,
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                }}
              >
                <a
                  href={CALL_LINK}
                  style={{
                    flex: 1,
                    background: C.gold,
                    color: C.maroon,
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "10px",
                    borderRadius: 8,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  📞 Call Sir
                </a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "10px",
                    borderRadius: 8,
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              style={{
                color: C.gold,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: 1.5,
                marginBottom: 8,
              }}
            >
              OUR STORY
            </div>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: C.dark,
                marginBottom: 16,
              }}
            >
              Built on Trust, Driven by Results
            </h2>
            <p
              style={{
                color: C.gray,
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              Rajmata Jijau Academy was founded with one clear mission: to
              provide world-class Mathematics coaching to students in Vasmat and
              surrounding areas. Prof. Bhagwan Kadam Sir, with his M.Sc and B.Ed
              qualifications, has spent over a decade nurturing young minds.
            </p>
            <p
              style={{
                color: C.gray,
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              What began as a small coaching centre has grown into the most
              trusted name in Mathematics education in the region — with
              multiple students achieving perfect 100/100 scores in board
              examinations, and several qualifying for MHT-CET and JEE.
            </p>
            {[
              "Personal attention to every student",
              "Small batches to ensure quality learning",
              "Regular tests simulating board exam pattern",
              "Parent communication and progress tracking",
              "Dedicated doubt-solving sessions",
              "Proven track record across 10+ years",
            ].map((point) => (
              <div
                key={point}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <CheckCircle size={18} color={C.maroon} />
                <span style={{ fontSize: 15, color: C.dark, fontWeight: 500 }}>
                  {point}
                </span>
              </div>
            ))}
            <button
              onClick={() => setPage("Admissions")}
              style={{
                marginTop: 28,
                background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonLight})`,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "13px 28px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Enquire for Admission <ArrowRight size={18} />
            </button>
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
      class: "Class 5th to 7th",
      title: "Foundation Program",
      desc: "A carefully designed foundation course that builds strong conceptual understanding in Mathematics, Science, and English from the early years.",
      subjects: ["Mathematics", "Science", "English"],
      boards: ["Semi English Medium", "CBSE Foundation"],
      highlights: [
        "Conceptual clarity",
        "Regular assessments",
        "Strong base for higher classes",
        "Interactive learning",
      ],
      color: C.maroon,
    },
    {
      class: "Class 8th to 10th",
      title: "Special Mathematics Batches",
      desc: "Our flagship program with the strongest track record. Multiple students have achieved 100/100 in Mathematics under this program.",
      subjects: ["Mathematics (Marathi Medium)", "Mathematics (Semi English)"],
      boards: ["Maharashtra State Board", "Board Examination Preparation"],
      highlights: [
        "100/100 results history",
        "Board pattern practice",
        "Marathi & Semi English",
        "Regular mock tests",
      ],
      color: "#2C3E6B",
    },
    {
      class: "Class 11th",
      title: "Mathematics + MHT-CET + JEE",
      desc: "Advanced Mathematics coaching aligned with state board curriculum and competitive exam preparation for MHT-CET and JEE Foundation.",
      subjects: ["Higher Mathematics", "MHT-CET Preparation", "JEE Foundation"],
      boards: ["Maharashtra State Board", "MHT-CET", "JEE Foundation"],
      highlights: [
        "Advanced problem solving",
        "Exam strategy",
        "Competitive exam readiness",
        "Expert mentoring",
      ],
      color: "#1A6B3A",
    },
  ];

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero
        title="Our Courses"
        subtitle="Structured programs from foundation level to board exam and competitive exams"
      />
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}
      >
        {courses.map((course, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: "grid",
              gridTemplateColumns: i % 2 === 0 ? "2fr 3fr" : "3fr 2fr",
              gap: 40,
              marginBottom: 60,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {i % 2 !== 0 && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 32,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: `1px solid ${C.border}`,
                  order: window.innerWidth < 768 ? -1 : 0,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.gray,
                    letterSpacing: 1,
                    marginBottom: 6,
                  }}
                >
                  SUBJECTS
                </div>
                {course.subjects.map((s) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <CheckCircle size={16} color={course.color} />
                    <span
                      style={{ fontWeight: 500, color: C.dark, fontSize: 15 }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.gray,
                    letterSpacing: 1,
                    marginBottom: 8,
                  }}
                >
                  BOARDS / EXAMS
                </div>
                {course.boards.map((b) => (
                  <span
                    key={b}
                    style={{
                      display: "inline-block",
                      background: `${course.color}15`,
                      color: course.color,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                      margin: "0 4px 6px 0",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}
            <div>
              <div
                style={{
                  background: `${course.color}15`,
                  display: "inline-block",
                  color: course.color,
                  fontWeight: 700,
                  fontSize: 12,
                  padding: "4px 12px",
                  borderRadius: 20,
                  marginBottom: 10,
                  letterSpacing: 0.5,
                }}
              >
                {course.class}
              </div>
              <h2
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: C.dark,
                  marginBottom: 12,
                }}
              >
                {course.title}
              </h2>
              <p
                style={{
                  color: C.gray,
                  fontSize: 15,
                  lineHeight: 1.8,
                  marginBottom: 20,
                }}
              >
                {course.desc}
              </p>
              {course.highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: course.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircle size={12} color="#fff" />
                  </div>
                  <span
                    style={{ fontSize: 14, color: C.dark, fontWeight: 500 }}
                  >
                    {h}
                  </span>
                </div>
              ))}
              <button
                onClick={() => setPage("Admissions")}
                style={{
                  marginTop: 20,
                  background: course.color,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "12px 24px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                Enquire for This Course <ChevronRight size={16} />
              </button>
            </div>
            {i % 2 === 0 && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 32,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.gray,
                    letterSpacing: 1,
                    marginBottom: 6,
                  }}
                >
                  SUBJECTS
                </div>
                {course.subjects.map((s) => (
                  <div
                    key={s}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <CheckCircle size={16} color={course.color} />
                    <span
                      style={{ fontWeight: 500, color: C.dark, fontSize: 15 }}
                    >
                      {s}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 18,
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.gray,
                    letterSpacing: 1,
                    marginBottom: 8,
                  }}
                >
                  BOARDS / EXAMS
                </div>
                {course.boards.map((b) => (
                  <span
                    key={b}
                    style={{
                      display: "inline-block",
                      background: `${course.color}15`,
                      color: course.color,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                      margin: "0 4px 6px 0",
                    }}
                  >
                    {b}
                  </span>
                ))}
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

  const filtered = TOPPERS.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchClass = filterClass === "All" || t.class === filterClass;
    const matchYear = filterYear === "All" || t.year === filterYear;
    return matchSearch && matchClass && matchYear;
  });

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero
        title="Hall of Fame"
        subtitle="Celebrating every student who made us proud"
      />

      {/* Stats */}
      <div
        style={{
          background: `linear-gradient(135deg, ${C.maroon}, ${C.maroonDark})`,
          padding: "32px 24px",
        }}
      >
        <div
          style={{
            maxWidth: 800,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 0,
          }}
        >
          {[
            ["5+", "Perfect 100/100"],
            ["100+", "Above 90%"],
            ["500+", "Total Students"],
            ["10+", "Years of Results"],
          ].map(([v, l], i, arr) => (
            <div
              key={l}
              style={{
                textAlign: "center",
                padding: "16px 8px",
                borderRight:
                  i < arr.length - 1
                    ? "1px solid rgba(201,168,76,0.2)"
                    : "none",
              }}
            >
              <div style={{ color: C.gold, fontWeight: 900, fontSize: 32 }}>
                {v}
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect 100/100 Banner */}
      <section style={{ background: C.cream, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`,
                color: "#fff",
                padding: "10px 28px",
                borderRadius: 40,
                marginBottom: 16,
              }}
            >
              <Trophy size={20} color={C.gold} />
              <span style={{ fontWeight: 800, fontSize: 16 }}>
                Perfect Score Achievers — 100/100
              </span>
            </div>
            <p style={{ color: C.gray, fontSize: 15 }}>
              These exceptional students achieved perfection in Mathematics
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
              gap: 20,
            }}
          >
            {TOPPERS.filter((t) => t.marks === 100).map((t, i) => (
              <TopperCard key={t.id} topper={t} rank={i + 1} compact />
            ))}
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section style={{ background: "#fff", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: C.dark,
              marginBottom: 24,
            }}
          >
            All Achievers
          </h2>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: 200,
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: C.lightGray,
                borderRadius: 8,
                padding: "10px 16px",
              }}
            >
              <Search size={16} color={C.gray} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search student name…"
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  fontSize: 14,
                  color: C.dark,
                  width: "100%",
                }}
              />
            </div>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                fontSize: 14,
                color: C.dark,
                background: "#fff",
              }}
            >
              {classes.map((c) => (
                <option key={c}>
                  {c === "All" ? "All Classes" : `Class ${c}`}
                </option>
              ))}
            </select>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              style={{
                padding: "10px 16px",
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                fontSize: 14,
                color: C.dark,
                background: "#fff",
              }}
            >
              {years.map((y) => (
                <option key={y}>{y === "All" ? "All Years" : y}</option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: 20,
            }}
          >
            {filtered.map((t, i) => (
              <TopperCard key={t.id} topper={t} rank={i + 1} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "48px", color: C.gray }}
            >
              No students found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* Year-wise cards */}
      <section style={{ background: C.cream, padding: "48px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: C.dark,
              marginBottom: 32,
            }}
          >
            Year-wise Results
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {["2024", "2023", "2022"].map((year) => {
              const ys = TOPPERS.filter((t) => t.year === year);
              return (
                <div
                  key={year}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div
                    style={{
                      background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`,
                      padding: "16px 20px",
                    }}
                  >
                    <div
                      style={{ color: C.gold, fontWeight: 900, fontSize: 20 }}
                    >
                      Academic Year {year}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 13,
                        marginTop: 2,
                      }}
                    >
                      {ys.length} achievers listed
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px" }}>
                    {ys.map((s) => (
                      <div
                        key={s.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 0",
                          borderBottom: `1px solid ${C.border}`,
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 600,
                            color: C.dark,
                            fontSize: 14,
                          }}
                        >
                          {s.name}
                        </span>
                        <span
                          style={{
                            background:
                              s.marks === 100
                                ? `linear-gradient(135deg,${C.maroon},${C.maroonLight})`
                                : `${C.maroon}15`,
                            color: s.marks === 100 ? "#fff" : C.maroon,
                            fontWeight: 800,
                            fontSize: 13,
                            padding: "2px 10px",
                            borderRadius: 20,
                          }}
                        >
                          {s.marks}/100
                        </span>
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
  const filtered =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === activeCategory);

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero
        title="Gallery"
        subtitle="Moments of achievement, learning, and celebration"
      />
      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}
      >
        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 40,
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 20px",
                borderRadius: 30,
                fontWeight: 700,
                fontSize: 13,
                background: activeCategory === cat ? C.maroon : "#fff",
                color: activeCategory === cat ? "#fff" : C.gray,
                border: `2px solid ${activeCategory === cat ? C.maroon : C.border}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div style={{ columns: "3 280px", columnGap: 16 }}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              style={{ marginBottom: 16, breakInside: "avoid" }}
            >
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
                  height: [
                    180, 220, 160, 200, 240, 180, 200, 160, 220, 200, 180, 220,
                  ][i % 12],
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: `linear-gradient(135deg, ${item.color}CC, ${item.color}88)`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                    position: "relative",
                  }}
                >
                  <ImageIcon size={32} color="rgba(255,255,255,0.4)" />
                  <div
                    style={{
                      marginTop: 12,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 20,
                    }}
                  >
                    {item.category}
                  </div>
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
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    class: "",
    school: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.mobile || !form.class || !form.school) {
      alert("Please fill all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div style={{ paddingTop: 68 }}>
      <PageHero
        title="Admissions"
        subtitle="Join Vasmat's most trusted Mathematics coaching institute"
      />
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
            flexWrap: "wrap",
          }}
        >
          {/* Info */}
          <div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: C.dark,
                marginBottom: 16,
              }}
            >
              How to Apply
            </h2>
            <p
              style={{
                color: C.gray,
                fontSize: 15,
                lineHeight: 1.8,
                marginBottom: 24,
              }}
            >
              Fill in the enquiry form and our team will contact you within 24
              hours to confirm your seat and provide batch timing details.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                {
                  step: "1",
                  title: "Submit Enquiry Form",
                  desc: "Fill in the student details below.",
                },
                {
                  step: "2",
                  title: "Receive Callback",
                  desc: "Prof. Kadam Sir will call you within 24 hours.",
                },
                {
                  step: "3",
                  title: "Visit the Academy",
                  desc: "Come for a trial class and finalise admission.",
                },
                {
                  step: "4",
                  title: "Confirm Your Seat",
                  desc: "Pay fees and secure your batch seat.",
                },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 900,
                      fontSize: 14,
                      flexShrink: 0,
                    }}
                  >
                    {s.step}
                  </div>
                  <div>
                    <div
                      style={{ fontWeight: 700, color: C.dark, fontSize: 15 }}
                    >
                      {s.title}
                    </div>
                    <div style={{ color: C.gray, fontSize: 13, marginTop: 2 }}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 32,
                padding: 20,
                background: `${C.maroon}10`,
                borderRadius: 12,
                border: `1px solid ${C.maroon}30`,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: C.maroon,
                  fontSize: 15,
                  marginBottom: 8,
                }}
              >
                Quick Contact
              </div>
              <a
                href={CALL_LINK}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: C.dark,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                <Phone size={16} color={C.maroon} /> 9206079696
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  color: C.dark,
                  textDecoration: "none",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                <MessageCircle size={16} color="#25D366" /> 8208664612
                (WhatsApp)
              </a>
            </div>
          </div>

          {/* Form */}
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 36,
              boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
              border: `1px solid ${C.border}`,
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: "center", padding: "24px 0" }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "#22C55E20",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <CheckCircle size={36} color="#22C55E" />
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: C.dark,
                    marginBottom: 8,
                  }}
                >
                  Enquiry Submitted!
                </h3>
                <p style={{ color: C.gray, fontSize: 14, lineHeight: 1.7 }}>
                  Thank you! Prof. Kadam Sir will contact you within 24 hours.
                  You can also WhatsApp directly for immediate assistance.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 20,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "12px 24px",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={16} /> WhatsApp Now
                </a>
              </motion.div>
            ) : (
              <>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: C.dark,
                    marginBottom: 24,
                  }}
                >
                  Admission Enquiry Form
                </h3>
                {[
                  {
                    label: "Student Name *",
                    key: "name",
                    placeholder: "Enter full name",
                    type: "text",
                  },
                  {
                    label: "Mobile Number *",
                    key: "mobile",
                    placeholder: "10-digit mobile number",
                    type: "tel",
                  },
                  {
                    label: "School Name *",
                    key: "school",
                    placeholder: "Current school name",
                    type: "text",
                  },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 18 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.dark,
                        marginBottom: 6,
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      placeholder={f.placeholder}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: 8,
                        border: `2px solid ${C.border}`,
                        fontSize: 14,
                        color: C.dark,
                        outline: "none",
                        boxSizing: "border-box",
                        transition: "border 0.2s",
                      }}
                      onFocus={(e) =>
                        (e.target.style.border = `2px solid ${C.maroon}`)
                      }
                      onBlur={(e) =>
                        (e.target.style.border = `2px solid ${C.border}`)
                      }
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.dark,
                      marginBottom: 6,
                    }}
                  >
                    Class *
                  </label>
                  <select
                    value={form.class}
                    onChange={(e) =>
                      setForm({ ...form, class: e.target.value })
                    }
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: 8,
                      border: `2px solid ${C.border}`,
                      fontSize: 14,
                      color: form.class ? C.dark : C.gray,
                      background: "#fff",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Select Class</option>
                    {["5th", "6th", "7th", "8th", "9th", "10th", "11th"].map(
                      (c) => (
                        <option key={c} value={c}>
                          Class {c}
                        </option>
                      ),
                    )}
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading
                      ? C.gray
                      : `linear-gradient(135deg,${C.maroon},${C.maroonLight})`,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 16,
                    padding: "14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: `0 4px 16px rgba(123,27,42,0.3)`,
                    transition: "all 0.2s",
                  }}
                >
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
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you — reach out anytime"
      />
      <section
        style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "start",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: C.dark,
                marginBottom: 24,
              }}
            >
              Get In Touch
            </h2>
            {[
              {
                icon: <MapPin size={20} />,
                title: "Address",
                content:
                  "Near Shri Siddheshwar School,\nChhatrapati Colony, Vasmat, Maharashtra",
              },
              {
                icon: <Phone size={20} />,
                title: "Phone",
                content: "9206079696",
                href: CALL_LINK,
              },
              {
                icon: <MessageCircle size={20} />,
                title: "WhatsApp",
                content: "8208664612",
                href: WA_LINK,
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  display: "flex",
                  gap: 14,
                  marginBottom: 24,
                  padding: 20,
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: `${C.maroon}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: C.maroon,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      color: C.dark,
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {item.title}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("https") ? "_blank" : undefined
                      }
                      rel="noreferrer"
                      style={{
                        color: C.maroon,
                        fontWeight: 600,
                        fontSize: 15,
                        textDecoration: "none",
                      }}
                    >
                      {item.content}
                    </a>
                  ) : (
                    <div
                      style={{
                        color: C.gray,
                        fontSize: 14,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {item.content}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div
              style={{
                borderRadius: 14,
                overflow: "hidden",
                height: 220,
                background: `linear-gradient(135deg,${C.maroon}20,${C.gold}20)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: `1px solid ${C.border}`,
              }}
            >
              <MapPin size={36} color={C.maroon} />
              <div
                style={{
                  fontWeight: 700,
                  color: C.dark,
                  marginTop: 10,
                  fontSize: 15,
                }}
              >
                Rajmata Jijau Academy
              </div>
              <div
                style={{
                  color: C.gray,
                  fontSize: 13,
                  marginTop: 4,
                  textAlign: "center",
                  padding: "0 20px",
                }}
              >
                Near Shri Siddheshwar School, Chhatrapati Colony, Vasmat
              </div>
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 36,
              boxShadow: "0 6px 30px rgba(0,0,0,0.1)",
              border: `1px solid ${C.border}`,
            }}
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                style={{ textAlign: "center", padding: "32px 0" }}
              >
                <CheckCircle
                  size={48}
                  color="#22C55E"
                  style={{ margin: "0 auto 16px" }}
                />
                <h3 style={{ fontWeight: 900, color: C.dark, fontSize: 20 }}>
                  Message Sent!
                </h3>
                <p style={{ color: C.gray, marginTop: 8, fontSize: 14 }}>
                  We'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: C.dark,
                    marginBottom: 24,
                  }}
                >
                  Send a Message
                </h3>
                {[
                  {
                    label: "Your Name",
                    key: "name",
                    placeholder: "Full name",
                    type: "text",
                  },
                  {
                    label: "Mobile Number",
                    key: "mobile",
                    placeholder: "Phone number",
                    type: "tel",
                  },
                ].map((f) => (
                  <div key={f.key} style={{ marginBottom: 18 }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 700,
                        color: C.dark,
                        marginBottom: 6,
                      }}
                    >
                      {f.label}
                    </label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={(e) =>
                        setForm({ ...form, [f.key]: e.target.value })
                      }
                      placeholder={f.placeholder}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: 8,
                        border: `2px solid ${C.border}`,
                        fontSize: 14,
                        color: C.dark,
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                ))}
                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.dark,
                      marginBottom: 6,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Your enquiry or message…"
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: 8,
                      border: `2px solid ${C.border}`,
                      fontSize: 14,
                      color: C.dark,
                      outline: "none",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                </div>
                <button
                  onClick={() => setSent(true)}
                  style={{
                    width: "100%",
                    background: `linear-gradient(135deg,${C.maroon},${C.maroonLight})`,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 16,
                    padding: "14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send Message
                </button>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "12px",
                    borderRadius: 8,
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={16} /> Or WhatsApp Us Directly
                </a>
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
  const [newTopper, setNewTopper] = useState({
    name: "",
    class: "",
    marks: "",
    subject: "Mathematics",
    year: "2025",
  });
  const [gallery, setGallery] = useState(GALLERY_ITEMS);
  const [editingId, setEditingId] = useState(null);

  const tabs = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={16} />,
    },
    { key: "results", label: "Results", icon: <Trophy size={16} /> },
    { key: "gallery", label: "Gallery", icon: <ImageIcon size={16} /> },
    { key: "announcements", label: "Announcements", icon: <Bell size={16} /> },
  ];

  return (
    <div style={{ paddingTop: 68, minHeight: "100vh", background: "#F0F2F5" }}>
      <div
        style={{
          background: C.maroonDark,
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ color: C.gold, fontWeight: 900, fontSize: 18 }}>
          ⚙ Admin Panel
        </div>
        <div
          style={{
            background: "rgba(201,168,76,0.2)",
            color: C.gold,
            fontSize: 11,
            fontWeight: 700,
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          DEMO MODE
        </div>
        <div
          style={{
            marginLeft: "auto",
            color: "rgba(255,255,255,0.6)",
            fontSize: 12,
          }}
        >
          Rajmata Jijau Academy
        </div>
      </div>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 12,
            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "11px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                marginBottom: 4,
                background:
                  activeTab === tab.key ? `${C.maroon}15` : "transparent",
                color: activeTab === tab.key ? C.maroon : C.gray,
                fontWeight: activeTab === tab.key ? 700 : 500,
                fontSize: 14,
                textAlign: "left",
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "dashboard" && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                {[
                  {
                    label: "Total Students",
                    value: toppers.length,
                    icon: <Users size={20} />,
                    color: C.maroon,
                  },
                  {
                    label: "Perfect Scorers",
                    value: toppers.filter((t) => t.marks === 100).length,
                    icon: <Trophy size={20} />,
                    color: "#C9A84C",
                  },
                  {
                    label: "Announcements",
                    value: announcements.length,
                    icon: <Bell size={20} />,
                    color: "#2C3E6B",
                  },
                  {
                    label: "Gallery Items",
                    value: gallery.length,
                    icon: <ImageIcon size={20} />,
                    color: "#1A6B3A",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      background: "#fff",
                      borderRadius: 12,
                      padding: "20px",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 10,
                        background: `${stat.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </div>
                    <div>
                      <div
                        style={{ fontSize: 26, fontWeight: 900, color: C.dark }}
                      >
                        {stat.value}
                      </div>
                      <div style={{ fontSize: 12, color: C.gray }}>
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}
                >
                  Recent Enquiries (Mock)
                </h3>
                {[
                  { name: "Rahul Shinde", class: "9th", time: "2 hrs ago" },
                  { name: "Pooja Desai", class: "10th", time: "5 hrs ago" },
                  { name: "Amit Patil", class: "11th", time: "Yesterday" },
                ].map((e) => (
                  <div
                    key={e.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Avatar name={e.name} size={36} />
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: C.dark,
                            fontSize: 14,
                          }}
                        >
                          {e.name}
                        </div>
                        <div style={{ color: C.gray, fontSize: 12 }}>
                          Class {e.class}
                        </div>
                      </div>
                    </div>
                    <span style={{ color: C.gray, fontSize: 12 }}>
                      {e.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 20,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}
                >
                  Add New Student
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                    gap: 12,
                  }}
                >
                  {[
                    { label: "Name", key: "name", placeholder: "Student name" },
                    { label: "Class", key: "class", placeholder: "e.g. 10th" },
                    { label: "Marks", key: "marks", placeholder: "e.g. 100" },
                    { label: "Year", key: "year", placeholder: "e.g. 2025" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: C.gray,
                          display: "block",
                          marginBottom: 4,
                        }}
                      >
                        {f.label}
                      </label>
                      <input
                        value={newTopper[f.key]}
                        onChange={(e) =>
                          setNewTopper({
                            ...newTopper,
                            [f.key]: e.target.value,
                          })
                        }
                        placeholder={f.placeholder}
                        style={{
                          width: "100%",
                          padding: "9px 12px",
                          borderRadius: 7,
                          border: `1px solid ${C.border}`,
                          fontSize: 13,
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    if (!newTopper.name || !newTopper.class || !newTopper.marks)
                      return;
                    setToppers([
                      ...toppers,
                      {
                        ...newTopper,
                        id: Date.now(),
                        marks: parseInt(newTopper.marks),
                        total: 100,
                        avatar: null,
                      },
                    ]);
                    setNewTopper({
                      name: "",
                      class: "",
                      marks: "",
                      subject: "Mathematics",
                      year: "2025",
                    });
                  }}
                  style={{
                    marginTop: 14,
                    background: C.maroon,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "10px 20px",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Plus size={14} /> Add Student
                </button>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}
                >
                  All Students ({toppers.length})
                </h3>
                {toppers.map((t) => (
                  <div
                    key={t.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: `1px solid ${C.border}`,
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <Avatar name={t.name} size={38} />
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: C.dark,
                            fontSize: 14,
                          }}
                        >
                          {t.name}
                        </div>
                        <div style={{ color: C.gray, fontSize: 12 }}>
                          Class {t.class} | {t.year}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span
                        style={{
                          background:
                            t.marks === 100 ? `${C.maroon}15` : "#f0f0f0",
                          color: t.marks === 100 ? C.maroon : C.gray,
                          fontWeight: 800,
                          fontSize: 13,
                          padding: "3px 12px",
                          borderRadius: 20,
                        }}
                      >
                        {t.marks}/100
                      </span>
                      <button
                        onClick={() =>
                          setToppers(toppers.filter((x) => x.id !== t.id))
                        }
                        style={{
                          background: "#FEE2E2",
                          color: "#DC2626",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 8px",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 24,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <h3 style={{ fontWeight: 800, color: C.dark }}>
                  Gallery Management
                </h3>
                <button
                  style={{
                    background: C.maroon,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                    padding: "9px 16px",
                    borderRadius: 7,
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Plus size={14} /> Upload Image (Mock)
                </button>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
                  gap: 14,
                }}
              >
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      borderRadius: 10,
                      overflow: "hidden",
                      border: `1px solid ${C.border}`,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        height: 120,
                        background: `linear-gradient(135deg,${item.color}AA,${item.color}66)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ImageIcon size={24} color="rgba(255,255,255,0.6)" />
                    </div>
                    <div
                      style={{
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: C.dark,
                          flex: 1,
                          marginRight: 8,
                        }}
                      >
                        {item.label}
                      </div>
                      <button
                        onClick={() =>
                          setGallery(gallery.filter((g) => g.id !== item.id))
                        }
                        style={{
                          background: "#FEE2E2",
                          color: "#DC2626",
                          border: "none",
                          borderRadius: 5,
                          padding: "4px 6px",
                          cursor: "pointer",
                          flexShrink: 0,
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 20,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{ fontWeight: 800, color: C.dark, marginBottom: 14 }}
                >
                  Create Announcement
                </h3>
                <div style={{ display: "flex", gap: 10 }}>
                  <input
                    value={newAnn}
                    onChange={(e) => setNewAnn(e.target.value)}
                    placeholder="e.g. Admissions Open for New Batch"
                    style={{
                      flex: 1,
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: `1px solid ${C.border}`,
                      fontSize: 14,
                    }}
                  />
                  <button
                    onClick={() => {
                      if (!newAnn.trim()) return;
                      setAnnouncements([
                        ...announcements,
                        { id: Date.now(), text: newAnn, date: "2025" },
                      ]);
                      setNewAnn("");
                    }}
                    style={{
                      background: C.maroon,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 13,
                      padding: "10px 18px",
                      borderRadius: 8,
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>
              <div
                style={{
                  background: "#fff",
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                <h3
                  style={{ fontWeight: 800, color: C.dark, marginBottom: 16 }}
                >
                  Active Announcements
                </h3>
                {announcements.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      background: C.cream,
                      borderRadius: 8,
                      marginBottom: 10,
                      border: `1px solid ${C.border}`,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ fontWeight: 600, color: C.dark, fontSize: 14 }}
                      >
                        {a.text}
                      </div>
                      <div
                        style={{ color: C.gray, fontSize: 12, marginTop: 2 }}
                      >
                        {a.date}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setAnnouncements(
                          announcements.filter((x) => x.id !== a.id),
                        )
                      }
                      style={{
                        background: "#FEE2E2",
                        color: "#DC2626",
                        border: "none",
                        borderRadius: 6,
                        padding: "6px 8px",
                        cursor: "pointer",
                        marginLeft: 10,
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
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
      <h2
        style={{
          fontSize: "clamp(26px,3.5vw,38px)",
          fontWeight: 900,
          color: light ? "#fff" : C.dark,
          lineHeight: 1.2,
          marginBottom: 10,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          style={{
            fontSize: 15,
            color: light ? "rgba(255,255,255,0.7)" : C.gray,
            lineHeight: 1.6,
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: 60,
          height: 3,
          background: `linear-gradient(90deg,${C.maroon},${C.gold})`,
          borderRadius: 2,
          margin: "16px auto 0",
        }}
      />
    </div>
  );
}

function PageHero({ title, subtitle }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${C.maroonDark} 0%, ${C.maroon} 100%)`,
        padding: "56px 24px 48px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 30% 50%, rgba(201,168,76,0.08) 0%, transparent 60%)`,
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: "clamp(28px,4vw,44px)",
          fontWeight: 900,
          color: "#fff",
          position: "relative",
          zIndex: 1,
          marginBottom: 8,
        }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <p
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 15,
            position: "relative",
            zIndex: 1,
          }}
        >
          {subtitle}
        </p>
      )}
      <div
        style={{
          width: 50,
          height: 3,
          background: C.gold,
          borderRadius: 2,
          margin: "16px auto 0",
          position: "relative",
          zIndex: 1,
        }}
      />
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer
      style={{ background: C.dark, color: "#fff", padding: "48px 24px 24px" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GraduationCap size={20} color={C.maroon} />
              </div>
              <div>
                <div style={{ fontWeight: 800, color: C.gold, fontSize: 14 }}>
                  RAJMATA JIJAU ACADEMY
                </div>
                <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                  Vasmat, Maharashtra
                </div>
              </div>
            </div>
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: 13,
                lineHeight: 1.7,
              }}
            >
              Vasmat's most trusted Mathematics coaching institute with a proven
              track record of 100/100 results and competitive exam success.
            </p>
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                color: C.gold,
                fontSize: 13,
                letterSpacing: 1,
                marginBottom: 14,
              }}
            >
              QUICK LINKS
            </div>
            {[
              "Home",
              "About",
              "Courses",
              "Results",
              "Gallery",
              "Admissions",
              "Contact",
            ].map((link) => (
              <button
                key={link}
                onClick={() => setPage(link)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 13,
                  padding: "5px 0",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "color 0.2s",
                }}
              >
                {link}
              </button>
            ))}
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                color: C.gold,
                fontSize: 13,
                letterSpacing: 1,
                marginBottom: 14,
              }}
            >
              CONTACT
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10,
                alignItems: "flex-start",
              }}
            >
              <MapPin
                size={14}
                color={C.gold}
                style={{ marginTop: 2, flexShrink: 0 }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.65)",
                  fontSize: 13,
                  lineHeight: 1.6,
                }}
              >
                Near Shri Siddheshwar School, Chhatrapati Colony, Vasmat,
                Maharashtra
              </span>
            </div>
            <a
              href={CALL_LINK}
              style={{
                display: "flex",
                gap: 10,
                marginBottom: 10,
                alignItems: "center",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              <Phone size={14} color={C.gold} /> 9206079696
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                fontSize: 13,
              }}
            >
              <MessageCircle size={14} color="#25D366" /> 8208664612 (WhatsApp)
            </a>
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                color: C.gold,
                fontSize: 13,
                letterSpacing: 1,
                marginBottom: 14,
              }}
            >
              COURSES
            </div>
            {[
              "Class 5th–7th Foundation",
              "Class 8th–10th Mathematics",
              "Class 11th + MHT-CET",
              "Class 11th + JEE Foundation",
            ].map((c) => (
              <div
                key={c}
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 13,
                  marginBottom: 7,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>
            © 2025 Rajmata Jijau Academy. All rights reserved. | Prof. Bhagwan
            Kadam Sir
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <a
              href={CALL_LINK}
              style={{
                color: C.gold,
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <Phone size={14} /> Call
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "#25D366",
                fontWeight: 700,
                fontSize: 13,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp button
function FloatingWA() {
  return (
    <motion.a
      href={WA_LINK}
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
      style={{
        position: "fixed",
        bottom: 28,
        right: 24,
        zIndex: 999,
        width: 58,
        height: 58,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        textDecoration: "none",
      }}
    >
      <MessageCircle size={26} color="#fff" />
    </motion.a>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState("Home");

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "Home":
        return <HomePage setPage={setPage} />;
      case "About":
        return <AboutPage setPage={setPage} />;
      case "Courses":
        return <CoursesPage setPage={setPage} />;
      case "Results":
        return <ResultsPage />;
      case "Gallery":
        return <GalleryPage />;
      case "Admissions":
        return <AdmissionsPage />;
      case "Contact":
        return <ContactPage />;
      case "admin":
        return <AdminPage />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  const isAdmin = page === "admin";

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
        minHeight: "100vh",
        background: "#fff",
      }}
    >
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
        <motion.div
          key={page}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {!isAdmin && <Footer setPage={setPage} />}
      {!isAdmin && <FloatingWA />}

      {/* Hidden admin route hint */}
      {page === "Home" && (
        <button
          onClick={() => setPage("admin")}
          style={{
            position: "fixed",
            bottom: 28,
            left: 24,
            background: "rgba(0,0,0,0.15)",
            border: "none",
            color: "rgba(0,0,0,0.3)",
            fontSize: 10,
            padding: "4px 8px",
            borderRadius: 4,
            cursor: "pointer",
            zIndex: 999,
          }}
        >
          admin
        </button>
      )}
    </div>
  );
}
