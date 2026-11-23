import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Loading.css";

export default function Loading({ onLoadingComplete }) {
  const [screen, setScreen] = useState("ram"); // "ram", "welcome"

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem("ram_portfolio_visited", "true");
    } catch {
      // Ignore sessionStorage exceptions
    }
    onLoadingComplete();
  }, [onLoadingComplete]);

  useEffect(() => {
    // Show RAM briefly (600ms), then welcome (650ms) for a responsive intro
    const ramTimer = setTimeout(() => {
      setScreen("welcome");
    }, 600);

    const welcomeTimer = setTimeout(() => {
      handleComplete();
    }, 1300);

    return () => {
      clearTimeout(ramTimer);
      clearTimeout(welcomeTimer);
    };
  }, [handleComplete]);

  const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.35,
        ease: "easeOut",
      },
    }),
  };

  const screenVariants = {
    exit: {
      opacity: 0,
      transition: { duration: 0.35 },
    },
  };

  const welcomeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="loading-container"
      variants={screenVariants}
      exit="exit"
      onClick={handleComplete}
      title="Click to skip preloader"
      style={{ cursor: "pointer" }}
    >
      <AnimatePresence mode="wait">
        {screen === "ram" && (
          <motion.div
            key="ram"
            className="loading-content"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
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
            <div className="animation-dots">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="dot"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 0.75,
                    delay: i * 0.12,
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
            transition={{ duration: 0.25 }}
          >
            <div className="welcome-text">Welcome to my portfolio</div>
            <motion.div
              className="animated-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
