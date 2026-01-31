"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";

type LocalizedString = { el: string; en: string };
type Item = { name: LocalizedString; price: number; description?: string };
type AddOnCategory = {
	name: LocalizedString;
	items: Item[];
	priceLabel?: LocalizedString;
};
type Section = {
	name: LocalizedString;
	description?: LocalizedString;
	basePrice?: number;
	items?: Item[];
	addOnCategories?: AddOnCategory[];
};
type Category = {
	id: string;
	name: LocalizedString;
	sections?: Section[];
	items?: Item[];
};

const categories = productsData.categories as Category[];

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
				{categories.map((category) => (
					<section key={category.id} id={category.id} className="mb-12">
						{/* Category Title */}
						<div className="mb-6">
							<h2 className="text-3xl font-bold text-secondary text-center border-b-2 border-secondary pb-3">
								{category.name[locale]}
							</h2>
						</div>

						{/* Sections and Products */}
						{category.sections?.map((section) => (
							<div key={section.name.en} className="mb-8">
								<h3 className="font-semibold text-secondary mb-4">
									{section.name[locale]}
								</h3>
								{section.description && (
									<p className="text-secondary mb-2">
										{section.description[locale]}
									</p>
								)}
								{section.basePrice && (
									<p className="text-lg font-medium text-primary mb-4">
										{locale === "el" ? "Βάση" : "Base"}:{" "}
										{section.basePrice.toFixed(2)}€
									</p>
								)}

								{/* Regular items */}
								{section.items && (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										{section.items.map((item) => (
											<ProductCard
												key={item.name.en}
												name={item.name}
												price={item.price}
												description={item.description}
												locale={locale}
											/>
										))}
									</div>
								)}

								{/* Add-on categories (for products like Waffle) */}
								{section.addOnCategories && (
									<div className="space-y-4 mt-4">
										{section.addOnCategories.map((addOnCategory) => (
											<div
												key={addOnCategory.name.en}
												className="bg-gray-600 p-4 rounded-lg shadow-md"
											>
												<h4 className="text-lg font-semibold text-textSecondary mb-3">
													{addOnCategory.name[locale]}
													{addOnCategory.priceLabel && (
														<span className="ml-2 text-base font-normal text-textSecondary/80">
															({addOnCategory.items[0]?.price.toFixed(2)}€{" "}
															{addOnCategory.priceLabel[locale]})
														</span>
													)}
												</h4>
												<div className="flex flex-wrap gap-2">
													{addOnCategory.items.map((item) => (
														<span
															key={item.name.en}
															className="inline-flex items-center bg-gray-500 px-3 py-1.5 rounded-full text-lg"
														>
															<span className="text-textSecondary">
																{item.name[locale]}
															</span>
															<span className="ml-2 text-textSecondary font-bold">
																{item.price.toFixed(2)}€
															</span>
														</span>
													))}
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						))}

						{/* Items without sections (like Sweet Stories) */}
						{category.items && (
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{category.items.map((item) => (
									<ProductCard
										key={item.name.en}
										name={item.name}
										price={item.price}
										description={item.description}
										locale={locale}
									/>
								))}
							</div>
						)}
					</section>
				))}
			</main>

			<Footer />
		</div>
	);
}
