"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between md:px-20 h-16">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-white">
            AI <span className="text-green-500">Workout</span> Generator
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#how-it-works"
              className="text-gray-300 hover:text-white transition-colors"
            >
              How It Works
            </Link>

            <Link
              href="#Example"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Example
            </Link>
            <Link
              href="#Example"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="#workout-form"
              className="bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600 transition-colors"
            >
              Generate Free
            </Link>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link
                href="#how-it-works"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                How It Works
              </Link>

              <Link
                href="#Example"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Example
              </Link>

              <Link
                href="#Blog"
                className="block text-gray-300 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="#Form"
                className="block bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors text-center"
              >
                Generate Free
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
