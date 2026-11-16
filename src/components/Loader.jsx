import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// Orbiting paint dots: --o is each dot's starting angle on the ring
const DOTS = [
  { o: "0deg", c: "#e45d48" },
  { o: "60deg", c: "#f4b936" },
  { o: "120deg", c: "#5e9f7d" },
  { o: "180deg", c: "#8971c5" },
  { o: "240deg", c: "#e45d48" },
  { o: "300deg", c: "#f4b936" },
];

function Loader() {
  // Mouse / touch parallax: the whole 3D scene tilts toward the pointer
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 80, damping: 14 });
  const sy = useSpring(py, { stiffness: 80, damping: 14 });
  const tiltY = useTransform(sx, [-1, 1], [-18, 18]);
  const tiltX = useTransform(sy, [-1, 1], [14, -14]);

  useEffect(() => {
    const onMove = (e) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py]);

  return (
    <div className="nila-loader cartoon-loader">
      {/* Background depth blobs */}
      <div className="paint-splash splash-one">●</div>
      <div className="paint-splash splash-two">✿</div>
      <div className="paint-splash splash-three">●</div>
      <div className="paint-splash splash-four">✦</div>
      <div className="paint-splash splash-five">●</div>

      {/* 3D stage */}
      <div className="stage-3d">
        <motion.div
          className="scene-3d"
          style={{ rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 12 }}
        >
          {/* Orbit ring + paint dots */}
          <div className="orbit-ring" />
          {DOTS.map((d, i) => (
            <span
              key={i}
              className="orbit-dot"
              style={{ "--o": d.o, "--c": d.c }}
            />
          ))}

          {/* Spinning cube */}
          <div className="cube-float">
            <div className="cube">
              <div className="cube-face face-front">
                <img src="/nila-arts-logo.png" alt="Nila Arts" />
              </div>
              <div className="cube-face face-back">
                <img src="/nila-arts-logo.png" alt="" />
              </div>
              <div className="cube-face face-right" />
              <div className="cube-face face-left" />
              <div className="cube-face face-top" />
              <div className="cube-face face-bottom" />
            </div>
          </div>

          {/* Floor shadow */}
          <div className="cube-shadow" />

          {/* Brush floats in front of the cube */}
          <motion.div
            className="cartoon-brush"
            animate={{ y: [0, -22, 0], rotate: [-12, 12, -12] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="brush-tip" />
            <div className="brush-body">
              <span className="brush-eye eye-left" />
              <span className="brush-eye eye-right" />
              <span className="brush-smile">⌣</span>
            </div>
            <div className="brush-handle" />
          </motion.div>
        </motion.div>
      </div>

      {/* Brand name */}
      <motion.div
        className="cartoon-brand-text"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
      >
        <h1>
          NILA <span>ARTS</span>
        </h1>
        <p>LET'S MAKE SOMETHING BEAUTIFUL!</p>
      </motion.div>

      <div className="cartoon-drawing-line">
        <span />
      </div>

      <motion.p
        className="cartoon-loading-message"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading creativity...
      </motion.p>
    </div>
  );
}

export default Loader;