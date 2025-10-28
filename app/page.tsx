"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";

export default function Home() {
  const [locale, setLocale] = useState<"el" | "en">("el");

  return (
    <div className="min-h-screen bg-background">
      <Header
        locale={locale}
        onLanguageChange={(lang) => setLocale(lang as "el" | "en")}
      />

      <main className="max-w-6xl mx-auto px-4 py-8 pt-48">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
            {locale === "el"
              ? "Καλώς ήρθατε στο Aura Cafe"
              : "Welcome to Aura Cafe"}
          </h1>
          <p className="text-textSecondary text-lg">
            {locale === "el"
              ? "Απολαύστε τα ποτά και τα φαγητά μας δίπλα στη θάλασσα"
              : "Enjoy our drinks and food by the beach"}
          </p>
        </div>

        {/* Categories and Products */}
        {productsData.categories.map((category) => (
          <section key={category.id} id={category.id} className="mb-12">
            {/* Category Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-secondary text-center border-b-2 border-secondary pb-3">
                {category.name[locale]}
              </h2>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, index) => (
                <ProductCard
                  key={index}
                  name={item.name}
                  price={item.price}
                  variants={item.variants}
                  locale={locale}
                />
              ))}
            </div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}
