"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import productsData from "@/data/products.json";

interface HeaderProps {
  locale: string;
  onLanguageChange: (locale: string) => void;
}

export default function Header({ locale, onLanguageChange }: HeaderProps) {
  const navRef = useRef<HTMLUListElement>(null);
  const [activeCategory, setActiveCategory] = useState("");
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const headerOffset = 180; // Height of sticky header + nav
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveCategory(categoryId);
    }
  };

  const handleScroll = (direction: "left" | "right") => {
    if (navRef.current) {
      const scrollAmount = 200;
      navRef.current.scrollLeft +=
        direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const checkArrows = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener("scroll", checkArrows);
      checkArrows();
      return () => navElement.removeEventListener("scroll", checkArrows);
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Top Header */}
      <div
        className="py-6 px-4 shadow-lg"
        style={{
          backgroundImage: "url(header-bg.jpg)",
          backgroundSize: "108%",
          backgroundPosition: "0% 67%",
          height: 235,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 relative border-4 border-white rounded-lg overflow-hidden shadow-md">
              <Image
                src="/logo.jpg"
                alt="Aura Cafe Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => onLanguageChange("el")}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                locale === "el"
                  ? "bg-secondary text-white"
                  : "bg-white text-secondary hover:bg-gray-100"
              }`}
            >
              ΕΛ
            </button>
            <button
              onClick={() => onLanguageChange("en")}
              className={`px-4 py-2 rounded font-semibold transition-all ${
                locale === "en"
                  ? "bg-secondary text-white"
                  : "bg-white text-secondary hover:bg-gray-100"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-primary shadow-md relative">
        <div className="max-w-6xl mx-auto relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-primary to-transparent flex items-center justify-start pl-2 z-10"
            >
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Navigation Tabs */}
          <ul
            ref={navRef}
            className="flex gap-4 px-6 py-3 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {productsData.categories.map((category) => (
              <li key={category.id} className="flex-shrink-0">
                <button
                  onClick={() => scrollToCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2 font-semibold transition-all border-b-2 ${
                    activeCategory === category.id
                      ? "border-secondary text-secondary"
                      : "border-transparent text-secondary hover:border-secondary"
                  }`}
                >
                  {category.name[locale as "el" | "en"]}
                </button>
              </li>
            ))}
          </ul>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-primary to-transparent flex items-center justify-end pr-2 z-10"
            >
              <svg
                className="w-6 h-6 text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
