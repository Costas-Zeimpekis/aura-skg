interface Variant {
  name: {
    el: string;
    en: string;
  };
  price: number;
}

interface ProductCardProps {
  name: {
    el: string;
    en: string;
  };
  price?: number;
  variants?: Variant[];
  locale: string;
}

export default function ProductCard({
  name,
  price,
  variants,
  locale,
}: ProductCardProps) {
  return (
    <div className="bg-gray-600 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      {/* Product Name */}
      <h3 className="text-textSecondary font-semibold text-lg mb-3 text-center">
        {name[locale as "el" | "en"]}
      </h3>

      {/* Price or Variants */}
      <div className="flex flex-col items-center gap-2">
        {price !== undefined ? (
          <span className="text-textSecondary font-bold text-xl">
            €{price.toFixed(2)}
          </span>
        ) : (
          variants?.map((variant, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full border-t border-gray-200 pt-2"
            >
              <span className="text-textSecondary text-sm">
                {variant.name[locale as "el" | "en"]}
              </span>
              <span className="text-textSecondary font-semibold">
                €{variant.price.toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
