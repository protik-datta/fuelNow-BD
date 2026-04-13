import { AnimatePresence, motion } from "framer-motion";
import { Fuel, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Container from "./Container";
import { useState } from "react";

const links = [
  { id: "home", label: "Home", path: "/" },
  { id: "book", label: "Book Fuel", path: "/book" },
  { id: "emergency", label: "Emergency", path: "/emergency" },
  { id: "track", label: "Track Order", path: "/track" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      {/* ── NAV BAR ── */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-50 h-15 border-b border-emerald-100 bg-white/95 backdrop-blur-md"
      >
        <Container className="flex h-full items-center justify-between">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 outline-none"
          >
            <span className="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-[10px] bg-linear-to-br from-emerald-600 to-emerald-400">
              <Fuel size={18} color="#fff" />
            </span>
            <span className="font-syne text-[17px] font-extrabold tracking-tight text-gray-900">
              FuelNow BD
            </span>
          </motion.button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const isActive = pathname === l.path;
              return (
                <motion.button
                  key={l.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(l.path)}
                  className={`rounded-lg px-4 py-1.75 font-hind text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-linear-to-br from-emerald-600 to-emerald-400 text-white"
                      : "text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  {l.label}
                </motion.button>
              );
            })}
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center justify-center rounded-lg p-1.5 text-gray-600 hover:bg-gray-100 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </Container>
      </motion.nav>

      {/* ── MOBILE OVERLAY ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-100 bg-black/35 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {open && (
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed right-0 top-0 z-101 flex h-full w-[min(72vw,280px)] flex-col border-l border-gray-100 bg-white px-4 pb-6 pt-5 md:hidden"
          >
            {/* Drawer header */}
            <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4">

              <button
                onClick={close}
                className="flex h-8.5 w-8.5 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={15} />
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex flex-1 flex-col gap-1">
              {links.map((l) => {
                const isActive = pathname === l.path;
                return (
                  <button
                    key={l.id}
                    onClick={() => {
                      navigate(l.path);
                      close();
                    }}
                    className={`flex items-center gap-2.5 rounded-[10px] px-3.5 py-2.75 text-left font-hind text-sm font-medium transition-colors duration-150 ${
                      isActive
                        ? "bg-emerald-50 font-semibold text-emerald-800"
                        : "text-gray-600 hover:bg-gray-50 hover:text-emerald-700"
                    }`}
                  >
                    {isActive && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    )}
                    {l.label}
                  </button>
                );
              })}
            </nav>

            {/* Drawer CTA */}
            <button
              onClick={() => {
                navigate("/book");
                close();
              }}
              className="mt-4 w-full rounded-[10px] bg-linear-to-br from-emerald-600 to-emerald-500 py-2.75 font-hind text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get Started
            </button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
