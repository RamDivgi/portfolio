import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loading.css";

export default function Loading({ onLoadingComplete }) {
  const [screen, setScreen] = useState("ram"); // "ram", "welcome", or "done"

  useEffect(() => {
    // Show RAM for 2 seconds
    const ramTimer = setTimeout(() => {
      setScreen("welcome");
    }, 2500);

    // Show welcome for 2.5 seconds then complete
    const welcomeTimer = setTimeout(() => {
      onLoadingComplete();
    }, 5000);

    return () => {
      clearTimeout(ramTimer);
      clearTimeout(welcomeTimer);
    };
  }, [onLoadingComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const screenVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.8 },
    },
  };

  const welcomeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="loading-container"
      variants={screenVariants}
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {screen === "ram" && (
          <motion.div
            key="ram"
            className="loading-content"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="ram-text">
              {["R", "A", "M"].map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="ram-letter"
                >
                  {char}
                </motion.span>
              ))}
            </div>
            {/* Animated dots under RAM */}
            <div className="animation-dots">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="dot"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1.2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {screen === "welcome" && (
          <motion.div
            key="welcome"
            className="loading-content"
            variants={welcomeVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="welcome-text">Welcome to my portfolio</div>
            {/* Animated line under welcome */}
            <motion.div
              className="animated-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
