// Home.jsx
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

// Pink/Red Gradient Sphere
const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.15;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.25;
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.4}>
      <MeshDistortMaterial
        color="#ff6b9d"
        attach="material"
        distort={0.5}
        speed={1.5}
        roughness={0}
        metalness={0.8}
      />
    </Sphere>
  );
};

// Animated Transparent Cards - Hide on small devices
const BackgroundCards = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-8 top-[18%] w-64 h-48 rounded-xl border border-white/15 bg-white/5 p-4 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="space-y-2"
        >
          <div className="h-2 bg-white/30 rounded w-2/3"></div>
          <div className="h-2 bg-white/20 rounded w-1/2"></div>
          <div className="mt-4 h-20 bg-white/15 rounded"></div>
          <div className="flex gap-2">
            <div className="h-2 bg-white/20 rounded flex-1"></div>
            <div className="h-2 bg-white/20 rounded flex-1"></div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute left-10 bottom-[18%] w-80 h-56 rounded-xl border border-white/15 bg-white/5 p-4 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          className="space-y-2"
        >
          <div className="h-2 bg-white/30 rounded w-3/4"></div>
          <div className="h-2 bg-white/20 rounded w-1/2"></div>
          <div className="mt-4 h-32 bg-white/15 rounded"></div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute right-10 top-[20%] w-56 h-44 rounded-xl border border-white/15 bg-white/5 p-4 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          className="space-y-2"
        >
          <div className="h-2 bg-white/30 rounded w-2/3"></div>
          <div className="h-2 bg-white/20 rounded w-1/3"></div>
          <div className="mt-4 h-16 bg-white/15 rounded"></div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute right-12 bottom-[20%] w-60 h-48 rounded-xl border border-white/15 bg-white/5 p-4 pointer-events-none hidden lg:block"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.9 }}
          className="space-y-2"
        >
          <div className="h-2 bg-white/30 rounded w-1/2"></div>
          <div className="h-2 bg-white/20 rounded w-2/3"></div>
          <div className="mt-4 h-20 bg-white/15 rounded"></div>
        </motion.div>
      </motion.div>
    </>
  );
};

const Home = () => {
  const [hoveredWord, setHoveredWord] = useState(null);

  useEffect(() => {
    gsap.fromTo(
      ".word",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
    );
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative h-screen w-screen bg-[#1a5766] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Background Transparent Cards */}
      <div className="absolute inset-0 z-5">
        <BackgroundCards />
      </div>

      {/* Top Rating Bar - Responsive */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-60 pt-4 md:pt-6 px-2 md:px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 md:gap-8 text-white text-xs sm:text-sm">
          {[
            { platform: "Capterra", rating: "4.8" },
            { platform: "G2", rating: "4.8" },
            { platform: "Xero", reviews: "350+" },
            { platform: "QuickBooks", reviews: "550+" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
              className="flex items-center gap-1 md:gap-2"
            >
              <span>⭐</span>
              <span className="hidden sm:inline">
                {item.rating && `${item.rating} rating on`}
                {item.reviews && `${item.reviews} reviews on`}
              </span>
              <span className="font-semibold">{item.platform}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Center Text - Responsive */}
      <div className="relative z-30 h-full flex items-center justify-center px-4 md:px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight mb-6 md:mb-8">
            <div className="mb-2 md:mb-3">
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0,
                  ease: "easeOut",
                }}
                className="word inline-block pr-2 sm:pr-3"
              >
                Create
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className="word inline-block cursor-pointer transition-colors duration-300 hover:text-cyan-300"
                onMouseEnter={() => setHoveredWord("reports")}
                onMouseLeave={() => setHoveredWord(null)}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                reports,{" "}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: "easeOut",
                }}
                className="word inline-block cursor-pointer transition-colors duration-300 hover:text-blue-300"
                onMouseEnter={() => setHoveredWord("forecasts")}
                onMouseLeave={() => setHoveredWord(null)}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                forecasts,
              </motion.span>
            </div>

            <div>
              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="word inline-block cursor-pointer pr-2 sm:pr-3 hover:text-purple-300 transition-colors duration-300"
                onMouseEnter={() => setHoveredWord("dashboards")}
                onMouseLeave={() => setHoveredWord(null)}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                dashboards{" "}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.4,
                  ease: "easeOut",
                }}
                className="word inline-block"
              >
                &
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: "easeOut",
                }}
                className="word inline-block cursor-pointer pl-1 sm:pl-2 hover:text-pink-300 transition-colors duration-300"
                onMouseEnter={() => setHoveredWord("consolidations")}
                onMouseLeave={() => setHoveredWord(null)}
                whileHover={{
                  y: -4,
                  scale: 1.03,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                consolidations
              </motion.span>
            </div>
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center justify-center gap-2 md:gap-3 mb-8 md:mb-12"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-3xl md:text-4xl"
            >
              ✨
            </motion.span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
              Now with AI-insights
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-xl md:rounded-2xl font-semibold text-sm sm:text-base md:text-lg bg-[#b8e6dc] hover:bg-[#a0d9cc] text-[#1a4d5c] mb-4 md:mb-6 transition shadow-lg"
          >
            Start 14-day free trial →
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="text-white/70 hover:text-white flex items-center gap-2 mx-auto text-xs sm:text-sm transition"
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
            </svg>
            See what we do
          </motion.button>
        </div>
      </div>

      {/* Animated Cards on Hover - Only on Large Devices */}
      <div className="absolute inset-0 z-50 pointer-events-none hidden lg:block">
        <div className="relative w-full max-w-[1600px] h-full mx-auto">
          {/* REPORTS */}
          <AnimatePresence>
            {hoveredWord === "reports" && (
              <>
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-8 top-[12%] pointer-events-auto"
                >
                  <div className="w-96 rounded-2xl overflow-hidden shadow-2xl bg-white">
                    <div className="h-56 bg-gradient-to-br from-teal-400 to-cyan-600 relative">
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/30 to-transparent">
                        <p className="text-white/80 text-xs mb-1">
                          Edge Design Studio
                        </p>
                        <h3 className="text-white font-bold text-xl">
                          Business overview report
                        </h3>
                        <p className="text-white/70 text-xs mt-1">
                          August 2024
                        </p>
                      </div>
                    </div>
                    <div className="bg-white p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              O
                            </span>
                          </div>
                          <span className="text-gray-700 font-semibold">
                            ORG LOGO
                          </span>
                        </div>
                        <svg className="w-14 h-10" viewBox="0 0 50 30">
                          <path
                            d="M0 15 L15 0 L25 15 L40 5 L50 15"
                            fill="none"
                            stroke="#4ade80"
                            strokeWidth="3"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-12 bottom-[12%] pointer-events-auto"
                >
                  <div className="w-80 rounded-2xl shadow-2xl bg-white p-6">
                    <h4 className="text-gray-700 font-semibold mb-4">
                      Income Vs. Expenses
                    </h4>
                    <div className="h-40 flex items-end justify-between gap-3">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "70%" }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex-1 bg-teal-500 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "25%" }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex-1 bg-gray-300 rounded-t"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className="flex-1 bg-yellow-400 rounded-t"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-12 top-[10%] pointer-events-auto"
                >
                  <div className="w-64 rounded-2xl shadow-2xl bg-white p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        M
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Mark Bosman
                        </p>
                        <p className="text-xs text-gray-500">
                          a few seconds ago
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 mb-2">
                      @Megan let's talk about strategy.
                    </p>
                    <button className="w-full px-3 py-2 bg-gray-200 rounded-lg text-xs font-semibold">
                      Reply
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-16 top-[42%] pointer-events-auto"
                >
                  <div className="w-72 rounded-2xl shadow-2xl bg-white p-5">
                    <h3 className="font-bold text-gray-800 mb-3 text-sm">
                      📤 Send to
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: "📄", name: "PDF" },
                        { icon: "💬", name: "WhatsApp" },
                        { icon: "📝", name: "Word" },
                        { icon: "👥", name: "Teams" },
                      ].map((item, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.05 }}
                          className="border-2 border-gray-200 p-2 rounded-lg hover:bg-gray-50"
                        >
                          <span className="text-xl">{item.icon}</span>
                          <p className="text-xs font-semibold text-gray-700 mt-1">
                            {item.name}
                          </p>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* FORECASTS */}
          <AnimatePresence>
            {hoveredWord === "forecasts" && (
              <>
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-8 top-[18%] pointer-events-auto"
                >
                  <div className="w-[550px] rounded-2xl shadow-2xl bg-white p-6">
                    <h3 className="text-gray-800 font-bold text-lg mb-4">
                      Invoices
                    </h3>
                    <div className="overflow-hidden rounded-lg border border-gray-200">
                      <table className="w-full text-xs">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="text-left p-3 text-gray-600 font-semibold">
                              Customer
                            </th>
                            <th className="text-left p-3 text-gray-600 font-semibold">
                              Amount
                            </th>
                            <th className="text-left p-3 text-gray-600 font-semibold">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              name: "Cinderella",
                              amount: "$3,000",
                              status: "Final",
                            },
                            {
                              name: "Judy Hopps",
                              amount: "$3,294",
                              status: "Draft",
                            },
                          ].map((row, i) => (
                            <motion.tr
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className={`border-t ${
                                i % 2 === 1 ? "bg-gray-50" : ""
                              }`}
                            >
                              <td className="p-3 text-gray-800">{row.name}</td>
                              <td className="p-3 text-gray-800">
                                {row.amount}
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs">
                                  {row.status}
                                </span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-10 bottom-[20%] pointer-events-auto"
                >
                  <div className="w-72 rounded-2xl shadow-xl bg-teal-50 p-5 border-2 border-teal-300">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-teal-500 rounded-xl flex items-center justify-center text-3xl">
                        💰
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">Cash runway</p>
                        <p className="text-3xl font-bold text-gray-800">
                          6 months
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-10 top-[15%] pointer-events-auto"
                >
                  <div className="w-52 rounded-2xl shadow-xl bg-white p-4 border-2 border-teal-200">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center text-xl">
                        📅
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Today</p>
                        <p className="text-xl font-bold text-gray-800">
                          $3,296
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={3}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-12 top-[40%] pointer-events-auto"
                >
                  <div className="w-56 rounded-2xl shadow-xl bg-white p-4 border-2 border-yellow-200">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-xl">
                        📆
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Next 8-30 days</p>
                        <p className="text-xl font-bold text-gray-800">
                          $100,548
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* DASHBOARDS */}
          <AnimatePresence>
            {hoveredWord === "dashboards" && (
              <motion.div
                custom={0}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-8 bottom-[15%] pointer-events-auto"
              >
                <div className="w-[450px] rounded-2xl shadow-2xl bg-white p-6">
                  <div className="relative h-72 border border-gray-200 rounded-lg p-4">
                    <div className="absolute left-2 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500">
                      <span>$200K</span>
                      <span>$0</span>
                      <span>-$200K</span>
                    </div>
                    <div className="ml-10 h-full flex items-end justify-between gap-1">
                      {[35, 40, 45, 50, 38, 55, 42, 60, 48, 52, 58, 65].map(
                        (height, i) => (
                          <div
                            key={i}
                            className="flex-1 flex flex-col items-center justify-end h-full"
                          >
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{
                                delay: 0.3 + i * 0.05,
                                duration: 0.5,
                              }}
                              className="w-full bg-green-500 rounded-t"
                            />
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: "15%" }}
                              transition={{
                                delay: 0.4 + i * 0.05,
                                duration: 0.5,
                              }}
                              className="w-full bg-red-500 rounded-b mt-0.5"
                            />
                          </div>
                        )
                      )}
                    </div>
                    <div className="absolute left-10 right-0 top-1/2 border-t border-gray-300"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONSOLIDATIONS */}
          <AnimatePresence>
            {hoveredWord === "consolidations" && (
              <>
                <motion.div
                  custom={0}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-8 top-[20%] pointer-events-auto"
                >
                  <div className="w-[480px] rounded-2xl shadow-2xl bg-white p-6">
                    <div className="flex justify-center mb-4">
                      <div className="bg-white border-2 border-gray-300 rounded-xl px-5 py-2 shadow-sm flex items-center gap-2">
                        <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          GF
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                          Global Finance
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center gap-16 mb-4">
                      <div className="bg-white border-2 border-gray-300 rounded-xl px-4 py-2 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                          US Branch
                        </p>
                      </div>
                      <div className="bg-white border-2 border-gray-300 rounded-xl px-4 py-2 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                          AUS Branch
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 justify-center">
                      <div className="bg-white border-2 border-gray-300 rounded-xl px-4 py-2 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                          Texas
                        </p>
                      </div>
                      <div className="bg-white border-2 border-gray-300 rounded-xl px-4 py-2 shadow-sm">
                        <p className="text-sm font-semibold text-gray-800">
                          California
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={1}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-10 top-[18%] pointer-events-auto"
                >
                  <div className="w-80 rounded-2xl shadow-xl bg-gradient-to-br from-teal-50 to-cyan-50 p-4 border-2 border-teal-200">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="bg-white p-2 rounded-lg shadow">
                        <span className="text-green-600 font-bold text-sm">
                          QB
                        </span>
                      </div>
                      <span className="text-lg text-gray-400">+</span>
                      <div className="bg-white p-2 rounded-lg shadow">
                        <span className="text-cyan-500 font-bold text-sm">
                          Xero
                        </span>
                      </div>
                      <span className="text-lg text-gray-400">+</span>
                      <div className="bg-white p-2 rounded-lg shadow">
                        <span className="text-green-400 font-bold text-sm">
                          Sage
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  custom={2}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute right-12 bottom-[15%] pointer-events-auto"
                >
                  <div className="w-72 rounded-2xl shadow-xl bg-white p-5 border-2 border-green-200">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl font-bold">✓</span>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-800">90%</p>
                        <p className="text-xs text-gray-600">
                          Financial Health Score
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Pink Sphere - Hide on small devices */}
      <div className="absolute bottom-20 right-20 w-32 h-32 z-35 pointer-events-none hidden lg:block">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <pointLight
            position={[-10, -10, -5]}
            intensity={0.8}
            color="#ff1744"
          />
          <AnimatedSphere />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Chat Button - Responsive */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 bg-white p-3 sm:p-4 rounded-xl md:rounded-2xl shadow-2xl z-60"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Home;
