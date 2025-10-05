import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Carousel = () => {
  const [activePanel, setActivePanel] = useState("left");
  const [message, setMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  const handleAddToBag = (e, productName) => {
    e.stopPropagation();
    showMessage(`Added ${productName} to bag!`);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-['Inter']">
      {/* Message Toast */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-2xl z-50 text-center text-sm"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Container */}
      <div className="min-h-screen w-full flex flex-col md:flex-row">
        {/* LEFT PANEL - SUMMER GLOW */}
        <motion.div
          className={`relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 cursor-pointer bg-[#FDF0F3] text-gray-800 transition-all duration-700 ${
            activePanel === "left" ? "md:w-3/4" : "md:w-1/4"
          } min-h-[50vh] md:h-screen`}
          onClick={() => setActivePanel("left")}
          onMouseEnter={() => isDesktop && setActivePanel("left")}
          whileHover={isDesktop ? { scale: 1.01 } : {}}
        >
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-8 md:left-8 bg-black text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider z-10">
            NEW
          </span>

          {/* Products */}
          <div className="flex flex-row md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 scale-75 sm:scale-90 md:scale-100">
            {/* Gift Box */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-28 sm:w-24 sm:h-36 md:w-32 md:h-44 lg:w-40 lg:h-56 bg-white rounded-xl shadow-2xl p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center"
            >
              <p className="text-[8px] sm:text-[10px] md:text-xs text-pink-600 font-bold mb-1 sm:mb-2">
                LIMITED EDITION
              </p>
              <div className="h-1 sm:h-1.5 md:h-2 w-full bg-pink-200 rounded-full"></div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 bg-pink-300 rounded-full my-2 sm:my-3"></div>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 text-center">Gift Set</p>
            </motion.div>

            {/* Body Wash */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-24 sm:w-14 sm:w-28 md:w-16 md:h-32 lg:w-20 lg:h-40 bg-[#D48995] rounded-t-full rounded-b-lg shadow-xl relative flex items-center justify-center"
              >
                <div className="w-1.5 h-3 sm:w-2 sm:h-3.5 md:w-2 md:h-4 bg-gray-100 absolute top-0 rounded-full"></div>
              </motion.div>
              <p className="text-[8px] sm:text-[10px] md:text-xs mt-1 sm:mt-2 font-medium text-center">Body Wash</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">€35</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAddToBag(e, "Body Wash")}
                className="text-[10px] sm:text-xs md:text-sm font-semibold text-pink-600 border-b border-pink-600 mt-0.5 sm:mt-1 pb-0.5 sm:pb-1 hover:text-pink-800 transition"
              >
                ADD TO BAG +
              </motion.button>
            </div>

            {/* Hair Mist */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-6 h-20 sm:w-7 sm:h-22 md:w-8 md:h-24 lg:w-10 lg:h-32 bg-[#E6A6B1] rounded-lg shadow-xl relative"
              >
                <div className="w-full h-2 sm:h-2.5 md:h-3 bg-white rounded-t-lg"></div>
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-500 rounded-full absolute top-0.5 sm:top-1 right-0.5 sm:right-1"></div>
              </motion.div>
              <p className="text-[8px] sm:text-[10px] md:text-xs mt-1 sm:mt-2 font-medium text-center">Hair Mist</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">€24</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAddToBag(e, "Hair Mist")}
                className="text-[10px] sm:text-xs md:text-sm font-semibold text-pink-600 border-b border-pink-600 mt-0.5 sm:mt-1 pb-0.5 sm:pb-1 hover:text-pink-800 transition"
              >
                ADD TO BAG +
              </motion.button>
            </div>
          </div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activePanel === "left" ? 1 : 0,
              y: activePanel === "left" ? 0 : 20,
            }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 sm:mt-6 md:mt-8 text-center max-w-xs sm:max-w-sm px-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#D48995]">
              Summer Glow Set
            </h2>
            <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              A limited-edition collection for radiant hair and skin, featuring
              light, floral scents perfect for the season.
            </p>
          </motion.div>
        </motion.div>

        {/* RIGHT PANEL - DESERT BLOOM */}
        <motion.div
          className={`relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 cursor-pointer bg-[#E5DBCF] text-gray-800 transition-all duration-700 ${
            activePanel === "right" ? "md:w-3/4" : "md:w-1/4"
          } min-h-[50vh] md:h-screen`}
          onClick={() => setActivePanel("right")}
          onMouseEnter={() => isDesktop && setActivePanel("right")}
          whileHover={isDesktop ? { scale: 1.01 } : {}}
        >
          <span className="absolute top-2 left-2 sm:top-4 sm:left-4 md:top-8 md:left-8 bg-black text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wider z-10">
            NEW
          </span>

          {/* Products */}
          <div className="flex flex-row md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 scale-75 sm:scale-90 md:scale-100">
            {/* Gift Box */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-20 h-28 sm:w-24 sm:h-36 md:w-32 md:h-44 lg:w-40 lg:h-56 bg-white rounded-xl shadow-2xl p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center"
            >
              <p className="text-[8px] sm:text-[10px] md:text-xs text-amber-800 font-bold mb-1 sm:mb-2">
                LIMITED EDITION
              </p>
              <div className="h-1 sm:h-1.5 md:h-2 w-full bg-amber-200 rounded-full"></div>
              <div className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 bg-amber-300 rounded-full my-2 sm:my-3"></div>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 text-center">Holiday Kit</p>
            </motion.div>

            {/* Hand Cream */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-20 sm:w-14 sm:h-24 md:w-16 md:h-28 lg:w-20 lg:h-36 bg-[#A8795A] rounded-full shadow-xl relative flex items-center justify-center p-1 sm:p-2"
              >
                <div className="w-full h-1.5 sm:h-2 bg-gray-100 absolute top-0 rounded-full"></div>
                <p className="text-[8px] sm:text-[10px] md:text-xs text-white transform -rotate-12">CREAM</p>
              </motion.div>
              <p className="text-[8px] sm:text-[10px] md:text-xs mt-1 sm:mt-2 font-medium text-center">Hand Cream</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">€29</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAddToBag(e, "Hand Cream")}
                className="text-[10px] sm:text-xs md:text-sm font-semibold text-amber-800 border-b border-amber-800 mt-0.5 sm:mt-1 pb-0.5 sm:pb-1 hover:text-amber-900 transition"
              >
                ADD TO BAG +
              </motion.button>
            </div>

            {/* Oil Roller */}
            <div className="flex flex-col items-center">
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-5 h-20 sm:w-6 sm:h-24 md:w-6 md:h-28 lg:w-8 lg:h-36 bg-white border border-gray-300 rounded-lg shadow-xl relative flex items-center justify-center"
              >
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 bg-gray-700 absolute top-0.5 sm:top-1 rounded-full"></div>
                <div className="h-6 sm:h-7 md:h-8 w-px bg-amber-500 absolute bottom-3 sm:bottom-4"></div>
              </motion.div>
              <p className="text-[8px] sm:text-[10px] md:text-xs mt-1 sm:mt-2 font-medium text-center">Oil Roller</p>
              <p className="text-sm sm:text-base md:text-lg font-bold">€18</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleAddToBag(e, "Oil Roller")}
                className="text-[10px] sm:text-xs md:text-sm font-semibold text-amber-800 border-b border-amber-800 mt-0.5 sm:mt-1 pb-0.5 sm:pb-1 hover:text-amber-900 transition"
              >
                ADD TO BAG +
              </motion.button>
            </div>
          </div>

          {/* Title & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: activePanel === "right" ? 1 : 0,
              y: activePanel === "right" ? 0 : 20,
            }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 sm:mt-6 md:mt-8 text-center max-w-xs sm:max-w-sm px-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#A8795A]">
              Desert Bloom Kit
            </h2>
            <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
              Nourishing blends with warm, earthy notes, designed to restore and
              hydrate skin in any climate.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Carousel;
