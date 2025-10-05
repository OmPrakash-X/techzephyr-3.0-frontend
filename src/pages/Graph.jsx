import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const Graph = () => {
  const chartRef = useRef(null);
  const isInView = useInView(chartRef, { once: true, margin: "-100px" });

  const [currentFilters, setCurrentFilters] = useState({
    type: "all",
    status: "complete",
  });

  const data = [
    { value: 548, type: "refurbishment", status: "complete" },
    { value: 278, type: "refurbishment", status: "complete" },
    { value: 875, type: "new-build", status: "complete" },
    { value: 617, type: "new-build", status: "complete" },
    { value: 506, type: "new-build", status: "complete" },
    { value: 36, type: "refurbishment", status: "complete" },
    { value: 185, type: "refurbishment", status: "complete" },
    { value: 191, type: "refurbishment", status: "complete" },
    { value: 122, type: "refurbishment", status: "complete" },
    { value: 558, type: "refurbishment", status: "complete" },
    { value: 881, type: "new-build", status: "complete" },
    { value: 539, type: "refurbishment", status: "complete" },
    { value: 269, type: "refurbishment", status: "complete" },
    { value: 29, type: "refurbishment", status: "complete" },
    { value: 82, type: "refurbishment", status: "complete" },
    { value: 44, type: "refurbishment", status: "complete" },
    { value: 109, type: "refurbishment", status: "complete" },
    { value: 106, type: "refurbishment", status: "complete" },
    { value: 607, type: "new-build", status: "complete" },
    { value: 528, type: "new-build", status: "complete" },
  ];

  const filteredData = data.filter((item) => {
    const typeMatch =
      currentFilters.type === "all" || item.type === currentFilters.type;
    const statusMatch = item.status === currentFilters.status;
    return typeMatch && statusMatch;
  });

  const handleFilterClick = (filter, value) => {
    setCurrentFilters((prev) => ({
      ...prev,
      [filter]: value,
    }));
  };

  const downloadData = () => {
    let csv = "Value,Type,Status\n";
    data.forEach((item) => {
      csv += `${item.value},${item.type},${item.status}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "embodied-carbon-emissions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const yAxisLabels = [1200, 1000, 800, 600, 400, 200, 0];
  const gridLines = [0, 16.67, 33.33, 50, 66.67, 83.33, 100];

  return (
    <div className="min-h-screen bg-[#e8e4e0] p-6 md:p-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 mb-10">
          {/* Filters Section */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Type Filter */}
            <div className="mb-6">
              <label className="block text-sm mb-3 text-[#5a4a42]">Type</label>
              <div className="flex gap-3 flex-wrap">
                {["refurbishment", "new-build", "all"].map((type, i) => (
                  <motion.button
                    key={type}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterClick("type", type)}
                    className={`px-6 py-2.5 rounded-full border-2 text-sm transition-all duration-300 ${
                      currentFilters.type === type
                        ? "bg-[#6b5550] text-[#e8e4e0] border-[#6b5550]"
                        : "bg-transparent text-[#6b5550] border-[#6b5550]"
                    }`}
                  >
                    {type.charAt(0).toUpperCase() +
                      type.slice(1).replace("-", " ")}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="mb-6">
              <label className="block text-sm mb-3 text-[#5a4a42]">
                Status
              </label>
              <div className="flex gap-3 flex-wrap">
                {["complete", "estimate"].map((status, i) => (
                  <motion.button
                    key={status}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFilterClick("status", status)}
                    className={`px-6 py-2.5 rounded-full border-2 text-sm transition-all duration-300 ${
                      currentFilters.status === status
                        ? "bg-[#6b5550] text-[#e8e4e0] border-[#6b5550]"
                        : "bg-transparent text-[#6b5550] border-[#6b5550]"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Key Section */}
            <motion.div
              className="p-5 bg-white/30 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="font-semibold mb-4 text-[#5a4a42]">Key</div>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-[#5a4a42]">
                  <div className="w-10 h-0.5 border-t-2 border-dashed border-[#8a7670] mr-3"></div>
                  <span>500 kgCO₂e/m² - Embodied Carbon Target 2030</span>
                </div>
                <div className="flex items-center text-xs text-[#5a4a42]">
                  <div className="w-10 h-0.5 bg-[#6b5550] mr-3"></div>
                  <span>600 kgCO₂e/m² - Embodied Carbon Target 2025</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Title Section */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-light text-[#6b5550] leading-tight tracking-wide"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              EMBODIED
              <br />
              CARBON
              <br />
              EMISSIONS
            </motion.h1>
            <motion.div
              className="mt-5 text-sm text-[#8a7670]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <p>Intensity measured by kgCO₂e/m²</p>
              <motion.button
                onClick={downloadData}
                className="mt-3 px-5 py-2 border-2 border-[#6b5550] text-[#6b5550] rounded-full text-xs inline-flex items-center gap-2 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#6b5550",
                  color: "#e8e4e0",
                }}
                whileTap={{ scale: 0.95 }}
              >
                Download the data ↓
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Chart Container */}
        <motion.div
          ref={chartRef}
          className="bg-white p-6 md:p-10 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          <div className="relative h-[500px]">
            {/* Y-Axis Label */}
            <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs text-[#8a7670] whitespace-nowrap origin-center">
              Embodied carbon intensity (kgCO₂e/m²)
            </div>

            {/* Y-Axis */}
            <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-[#8a7670]">
              {yAxisLabels.map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                  }
                  transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
                >
                  {label}
                </motion.span>
              ))}
            </div>

            {/* Grid Lines */}
            {gridLines.map((bottom, i) => (
              <motion.div
                key={i}
                className="absolute left-12 right-0 h-px bg-[#e0e0e0]"
                style={{ bottom: `${bottom}%`, transformOrigin: "left" }}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.9 + i * 0.05, duration: 0.5 }}
              />
            ))}

            {/* Target Lines */}
            <motion.div
              className="absolute left-12 right-0 h-0.5 border-t-2 border-dashed border-[#8a7670] z-10"
              style={{ bottom: "41.67%", transformOrigin: "left" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{ delay: 1.2, duration: 0.8 }}
           
            />
            <motion.div
              className="absolute left-12 right-0 h-0.5 bg-[#6b5550] z-10"
              style={{ bottom: "50%",transformOrigin: "left" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
              }
              transition={{ delay: 1.3, duration: 0.8 }}
            />

            {/* Bars */}
            <div className="absolute left-12 right-0 bottom-0 top-0 flex items-end gap-1 md:gap-2">
              {filteredData.map((item, index) => {
                const height = (item.value / 1200) * 100;
                const barColor =
                  item.type === "new-build"
                    ? "#7a5e54"
                    : item.type === "refurbishment"
                    ? "#c4a69a"
                    : "#b89b8f";

                return (
                  <motion.div
                    key={index}
                    className="flex-1 relative group cursor-pointer min-w-[8px]"
                    initial={{ height: 0, opacity: 0 }}
                    animate={
                      isInView
                        ? { height: `${height}%`, opacity: 1 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{
                      delay: 1.4 + index * 0.03,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{ opacity: 0.7, scale: 1.02 }}
                    style={{
                      backgroundColor: barColor,
                      borderRadius: "4px 4px 0 0",
                    }}
                  >
                    <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-[#5a4a42] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {item.value}
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Graph;
