// BrandCard.jsx
import React, { useState } from "react";
import { Settings2 } from "lucide-react";

const BrandCard = () => {
  const [selected, setSelected] = useState("The Agency");

  const brands = [
    { name: "ECorp", colors: ["#00BFA6", "#FFFFFF"] },
    { name: "ICorp", colors: ["#FFB800", "#FFFFFF"] },
    { name: "The Agency", colors: ["#FF3B30", "#FFFFFF"] },
    { name: "TechFlow", colors: ["#3B82F6", "#FFFFFF"] },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
      {/* Single Card Container */}
      <div
        className="p-0.5 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #ff00cc, #a855f7, #6366f1, #00d4ff)",
          boxShadow: "0 0 80px rgba(168, 85, 247, 0.8), 0 0 120px rgba(168, 85, 247, 0.5)",
        }}
      >
        <div className="bg-black rounded-3xl p-6 w-full max-w-[320px]">
          <h2 className="text-2xl font-semibold text-white mb-6">Brand Kits</h2>

          {/* Map all 4 brands inside ONE card */}
          <div className="space-y-3">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="bg-black rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-900 border border-zinc-800 transition"
                onClick={() => setSelected(brand.name)}
              >
                <div className="flex items-center gap-3">
                  {/* Checkbox */}
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                      selected === brand.name ? "bg-purple-600" : "border-2 border-zinc-700"
                    }`}
                  >
                    {selected === brand.name && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10L8 14L16 6"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Color Circles */}
                  <div className="flex">
                    {brand.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-black -ml-2 first:ml-0"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {/* Brand Name */}
                  <span className="text-base font-medium text-white">{brand.name}</span>
                </div>

                {/* Settings Icon */}
                <Settings2
                  size={20}
                  className="text-white opacity-80 hover:opacity-100 transition"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
