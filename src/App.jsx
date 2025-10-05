// App.jsx - SIMPLIFIED AND FIXED
import React, { Suspense, useState, useEffect } from "react";
import Home from "./pages/Home";
import Stats from "./pages/Stats";
import Graph from "./pages/Graph";
import BrandCard from "./pages/BrandCard";
import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { UI } from "./components/UI";
import Carousel from "./pages/Carousel";
import Loaders from "./pages/Loaders";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cameraPos, setCameraPos] = useState([
    -0.5,
    1,
    window.innerWidth > 800 ? 4 : 9,
  ]);

  useEffect(() => {
    const handleResize = () => {
      setCameraPos([-0.5, 1, window.innerWidth > 800 ? 4 : 9]);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Loaders - Will fade out when complete */}
      {isLoading && <Loaders onComplete={() => setIsLoading(false)} />}

      {/* Main Content - Always rendered */}
      <div className="relative w-full">
        <Home />
        <Stats />
        <Graph />
        <BrandCard />
        <Carousel />

        <Loader />


        <section className="relative w-full h-[600px] md:h-[700px] bg-black/90">
          <Canvas
            shadows
            camera={{ position: cameraPos, fov: 45 }}
            className="absolute inset-0"
          >
            <Suspense fallback={null}>
              <Experience />
            </Suspense>
          </Canvas>

          <div className="absolute inset-0 flex justify-center items-end pb-6 pointer-events-none">
            <UI className="pointer-events-auto" />
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
