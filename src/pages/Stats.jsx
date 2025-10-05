import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const Stats = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredCard, setHoveredCard] = useState(null);

  const metricsData = [
    {
      id: 'carbon',
      title: 'Managed portfolio carbon footprint',
      unit: 'tCO₂e',
      currentValue: 45048,
      change: { value: 16, direction: 'up' },
      changeLabel: 'from 2019',
      linkText: 'See full breakdown of carbon footprint',
      linkIcon: 'arrow',
      timeline: [
        { year: '2022', value: 45048, width: 69 },
        { year: '2021', value: 14111, width: 22 },
        { year: '2020', value: 32813, width: 50 },
        { year: '2019', value: 38673, width: 59 }
      ]
    },
    {
      id: 'intensity',
      title: 'Managed portfolio energy intensity',
      unit: 'kWh/m²',
      currentValue: 123,
      change: { value: 22, direction: 'down' },
      changeLabel: 'from 2019',
      linkText: 'Download the data',
      linkIcon: 'download',
      timeline: [
        { year: '2022', value: 123, width: 78 },
        { year: '2021', value: 128, width: 82 },
        { year: '2020', value: 135, width: 86 },
        { year: '2019', value: 157, width: 100 }
      ]
    },
    {
      id: 'consumption',
      title: 'Managed portfolio energy consumption',
      unit: 'kWh',
      currentValue: 47790662,
      change: { value: 27, direction: 'down' },
      changeLabel: 'from 2019',
      linkText: 'Download the data',
      linkIcon: 'download',
      timeline: [
        { year: '2022', value: 47790662, width: 73 },
        { year: '2021', value: 49324077, width: 76 },
        { year: '2020', value: 48784205, width: 75 },
        { year: '2019', value: 65198706, width: 100 }
      ]
    }
  ];

  const formatNumber = (num) => num.toLocaleString();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#e8e4df] py-16 px-6 md:px-12"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        className="max-w-[1400px] mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {metricsData.map((metric, cardIndex) => (
            <motion.div
              key={metric.id}
              variants={cardVariants}
              className="metric-card"
              onMouseEnter={() => setHoveredCard(metric.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Header */}
              <motion.div 
                className="flex justify-between items-start mb-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: cardIndex * 0.15 + 0.3, duration: 0.5 }}
              >
                <h2 className="text-lg text-[#4a4a4a] font-normal leading-relaxed max-w-[200px]">
                  {metric.title}
                </h2>
                <span className="text-base text-[#6a6a6a] font-normal">
                  {metric.unit}
                </span>
              </motion.div>

              {/* Value */}
              <div className="mb-4">
                <motion.span
                  className="text-6xl font-light text-[#2a2a2a] tracking-tight inline-block"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: cardIndex * 0.15 + 0.4,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {formatNumber(metric.currentValue)}
                </motion.span>
                
                <motion.span 
                  className="inline-flex flex-col items-start ml-4 text-xl text-[#8a7a6a]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ delay: cardIndex * 0.15 + 0.5, duration: 0.5 }}
                >
                  <span className="text-[11px] text-[#8a7a6a] block mb-1">
                    {metric.changeLabel}
                  </span>
                  <span className="flex items-center">
                    <span className={`mr-1 text-lg ${metric.change.direction === 'up' ? 'text-[#a0908a]' : 'text-[#6a9a8a]'}`}>
                      {metric.change.direction === 'up' ? '↑' : '↓'}
                    </span>
                    {metric.change.value}%
                  </span>
                </motion.span>
              </div>

              {/* Timeline */}
              <div className="mt-10 space-y-6">
                {metric.timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ 
                      delay: cardIndex * 0.15 + 0.6 + i * 0.1,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                    className="flex items-center group cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    <span className="w-16 text-[15px] text-[#6a6a6a]">
                      {item.year}
                    </span>
                    
                    <div className="flex-1 h-5 bg-[#d4cdc4] rounded-full overflow-hidden mr-5">
                      <motion.div
                        className="h-full bg-[#9a7a6a] rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${item.width}%` } : { width: 0 }}
                        transition={{ 
                          delay: cardIndex * 0.15 + 0.7 + i * 0.12,
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        whileHover={{ 
                          backgroundColor: '#7a5a4a',
                          transition: { duration: 0.2 }
                        }}
                      />
                    </div>
                    
                    <motion.span 
                      className="min-w-[100px] text-right text-[15px] text-[#4a4a4a]"
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ 
                        delay: cardIndex * 0.15 + 0.8 + i * 0.1,
                        duration: 0.4
                      }}
                    >
                      {formatNumber(item.value)}
                    </motion.span>
                  </motion.div>
                ))}
              </div>

              {/* Footer Link */}
              <motion.a
                href="#"
                className="inline-flex items-center mt-8 text-[#6a6a6a] text-sm no-underline group"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ 
                  delay: cardIndex * 0.15 + 1.2,
                  duration: 0.5
                }}
                whileHover={{ color: '#4a4a4a' }}
                onClick={(e) => e.preventDefault()}
              >
                {metric.linkText}
                
                <motion.span
                  className="w-8 h-8 border-[1.5px] border-[#9a8a7a] rounded-full flex items-center justify-center ml-3"
                  whileHover={{ 
                    borderColor: '#6a6a6a',
                    backgroundColor: 'rgba(106, 106, 106, 0.05)',
                    scale: 1.1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {metric.linkIcon === 'arrow' ? (
                    <svg className="w-3.5 h-3.5 stroke-[#9a8a7a]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 stroke-[#9a8a7a]" viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <path d="M12 5v14M5 12l7 7 7-7"/>
                    </svg>
                  )}
                </motion.span>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Stats;