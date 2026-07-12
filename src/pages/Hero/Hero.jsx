import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import "./Hero.css";

const BRUSH_SIZE = 200;  // stroke width in px
const IMG_SCALE = 1; // img4 size relative to hero (full photo fit)
const DECAY_RATE = 0.05; // alpha reduction per frame (lower = longer trail)

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export default function Hero() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const canvasRef = useRef(null);   // visible canvas
  const brushRef = useRef(null);   // offscreen mask (accumulates strokes)
  const imgRef = useRef(null);
  const img2Ref = useRef(null);
  const lastPosRef = useRef(null);   // last brush point for smooth stroke
  const particleCanvasRef = useRef(null);
  const particlesRef = useRef([]);
  const particleRafRef = useRef(null);
  const recoveryTimeoutRef = useRef(null);

  /* ── Continuous Animation: Render loop for both brush decay and particles ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const pc = particleCanvasRef.current;
    const img = imgRef.current;
    const img2 = img2Ref.current;
    if (!canvas || !pc || !img || !img2) return;

    // Create offscreen brush canvas
    const brushCanvas = document.createElement("canvas");
    brushRef.current = brushCanvas;

    // Create a temporary canvas for img4 composition
    const tempCanvas = document.createElement("canvas");
    const tctx = tempCanvas.getContext("2d");

    const ctx = canvas.getContext("2d");
    const pctx = pc.getContext("2d");
    const bctx = brushCanvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      pc.width = pc.offsetWidth;
      pc.height = pc.offsetHeight;
      brushCanvas.width = canvas.width;
      brushCanvas.height = canvas.height;
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
    };

    if (img.complete && img2.complete) resize();
    else {
      img.addEventListener("load", resize, { once: true });
      img2.addEventListener("load", resize, { once: true });
    }
    window.addEventListener("resize", resize);

    // Initialize Particles
    const COUNT = 55;
    particlesRef.current = Array.from({ length: COUNT }, () => ({
      x: randomBetween(0, window.innerWidth),
      y: randomBetween(0, window.innerHeight),
      r: randomBetween(0.6, 2.2),
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.4, -0.1),
      a: randomBetween(0.2, 0.7),
    }));

    const loop = () => {
      // 1. Update & Draw Particles
      pctx.clearRect(0, 0, pc.width, pc.height);
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -4) { p.y = pc.height + 4; p.x = randomBetween(0, pc.width); }
        if (p.x < -4) p.x = pc.width + 4;
        if (p.x > pc.width + 4) p.x = -4;
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        pctx.fillStyle = `rgba(200,200,220,${p.a})`;
        pctx.fill();
      });

      // 2. Brush Decay
      bctx.globalCompositeOperation = "destination-out";
      bctx.fillStyle = `rgba(0, 0, 0, ${DECAY_RATE})`;
      bctx.fillRect(0, 0, brushCanvas.width, brushCanvas.height);
      bctx.globalCompositeOperation = "source-over";

      // 3. Render Main Canvas
      if (img.complete && img2.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Helper for object-fit: cover
        const drawCover = (context, image) => {
          const canvasRatio = canvas.width / canvas.height;
          const imgRatio = image.width / image.height;
          let w, h, x, y;
          const alignTop = window.innerWidth <= 768; // Align to top on mobile
          if (canvasRatio > imgRatio) {
            w = canvas.width;
            h = canvas.width / imgRatio;
            x = 0;
            y = alignTop ? 0 : (canvas.height - h) / 2;
          } else {
            h = canvas.height;
            w = canvas.height * imgRatio;
            x = (canvas.width - w) / 2;
            y = 0;
          }
          context.drawImage(image, x, y, w, h);
        };

        // A. Draw img2 (the layer underneath)
        drawCover(ctx, img2);

        // B. Compose img4 on temp canvas and apply mask
        tctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        drawCover(tctx, img);
        tctx.globalCompositeOperation = "destination-out";
        tctx.drawImage(brushCanvas, 0, 0);
        tctx.globalCompositeOperation = "source-over";

        // C. Draw the interactive img4 layer onto main canvas
        ctx.drawImage(tempCanvas, 0, 0);
      }

      particleRafRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(particleRafRef.current);
      clearTimeout(recoveryTimeoutRef.current);
    };
  }, []);

  /* ── Paint a connected brush stroke from last pos → current pos ── */
  const paintBrush = useCallback((pos) => {
    const brush = brushRef.current;
    if (!brush) return;
    const bctx = brush.getContext("2d");
    const from = lastPosRef.current || pos;

    bctx.strokeStyle = "rgba(0,0,0,1)";
    bctx.lineWidth = BRUSH_SIZE;
    bctx.lineCap = "round";
    bctx.lineJoin = "round";
    bctx.beginPath();
    bctx.moveTo(from.x, from.y);
    bctx.lineTo(pos.x, pos.y);
    bctx.stroke();

    lastPosRef.current = pos;
  }, []);

  /* ── Pointer move: paint stroke (Mouse + Touch + Pen) ── */
  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    clearTimeout(recoveryTimeoutRef.current);
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // For pointer events, clientX/clientY works directly for both touch and mouse!
    const pos = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };

    paintBrush(pos);
  }, [paintBrush]);

  /* ── Pointer leave/end: break stroke continuity ── */
  const handlePointerLeave = useCallback(() => {
    lastPosRef.current = null;
    clearTimeout(recoveryTimeoutRef.current);
    recoveryTimeoutRef.current = setTimeout(() => {
      const brush = brushRef.current;
      if (brush) {
        const bctx = brush.getContext("2d");
        bctx.clearRect(0, 0, brush.width, brush.height);
      }
    }, 1000); // Clear brush completely after 1 second of inactivity
  }, []);

  /* ── Letter animation ── */
  const sentence = "Hi! I'm RAM";
  const letterVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.5, ease: "easeOut" } }),
  };

  return (
    <div className="hero" id="hero">

      {/* Background photo */}
      <div className="hero-bg">
        <img src={isMobile ? "mobileimg2.jpg" : "photo.jpeg"} alt="Background" className="bg-image" />
        <div className="overlay"></div>
      </div>

      {/* Floating particles */}
      <canvas ref={particleCanvasRef} className="particle-canvas" />

      {/* Hidden source imgs */}
      <img ref={imgRef} src={isMobile ? "mobileimg1.jpg" : "img4.png"} alt="" style={{ display: "none" }} crossOrigin="anonymous" />
      <img ref={img2Ref} src={isMobile ? "mobileimg2.jpg" : "img2.jpeg"} alt="" style={{ display: "none" }} crossOrigin="anonymous" />

      {/* Brush canvas */}
      <canvas ref={canvasRef} className="anime-canvas" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} onPointerUp={handlePointerLeave} onPointerCancel={handlePointerLeave} />

      {/* Animated greeting */}
      <div className="hero-greeting">
        {sentence.split("").map((char, i) => (
          <motion.span key={i} custom={i} variants={letterVariants} initial="hidden" animate="visible" className="hero-letter">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>

      {/* Buttons */}
      <motion.div className="buttn" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}>
        <motion.a href="resume.pdf" download="resume.pdf" whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }} className="btn-cv">Download CV</motion.a>
        <motion.a href="#contact" whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }} className="btn-about">Let's Connect</motion.a>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
        <motion.div className="scroll-dot" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} />
      </motion.div>

    </div>
  );
}