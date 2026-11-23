import { motion } from "framer-motion";
import { useEffect, useRef, useCallback, useState } from "react";
import { FaFileDownload, FaGithub } from "react-icons/fa";
import "./Hero.css";

const BRUSH_SIZE = 200;  // stroke width in px
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

    const brushCanvas = document.createElement("canvas");
    brushRef.current = brushCanvas;

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

      bctx.globalCompositeOperation = "destination-out";
      bctx.fillStyle = `rgba(0, 0, 0, ${DECAY_RATE})`;
      bctx.fillRect(0, 0, brushCanvas.width, brushCanvas.height);
      bctx.globalCompositeOperation = "source-over";

      if (img.complete && img2.complete) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const drawCover = (context, image) => {
          const canvasRatio = canvas.width / canvas.height;
          const imgRatio = image.width / image.height;
          let w, h, x, y;
          const alignTop = window.innerWidth <= 768;
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

        drawCover(ctx, img2);

        tctx.clearRect(0, 0, tempCanvas.width, tempCanvas.height);
        drawCover(tctx, img);
        tctx.globalCompositeOperation = "destination-out";
        tctx.drawImage(brushCanvas, 0, 0);
        tctx.globalCompositeOperation = "source-over";

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

  const handlePointerMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    clearTimeout(recoveryTimeoutRef.current);
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const pos = { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
    paintBrush(pos);
  }, [paintBrush]);

  const handlePointerLeave = useCallback(() => {
    lastPosRef.current = null;
    clearTimeout(recoveryTimeoutRef.current);
    recoveryTimeoutRef.current = setTimeout(() => {
      const brush = brushRef.current;
      if (brush) {
        const bctx = brush.getContext("2d");
        bctx.clearRect(0, 0, brush.width, brush.height);
      }
    }, 1000);
  }, []);

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  return (
    <div className="hero" id="hero">
      {/* Background photo */}
      <div className="hero-bg">
        <img 
          src={isMobile ? `${import.meta.env.BASE_URL}mobileimg2.jpg` : `${import.meta.env.BASE_URL}photo.jpeg`} 
          alt="Shantaram S Divgi backdrop portrait" 
          className="bg-image" 
        />
        <div className="overlay"></div>
      </div>

      {/* Floating particles */}
      <canvas ref={particleCanvasRef} className="particle-canvas" />

      {/* Hidden source imgs */}
      <img ref={imgRef} src={isMobile ? `${import.meta.env.BASE_URL}mobileimg1.jpg` : `${import.meta.env.BASE_URL}img4.png`} alt="" style={{ display: "none" }} crossOrigin="anonymous" />
      <img ref={img2Ref} src={isMobile ? `${import.meta.env.BASE_URL}mobileimg2.jpg` : `${import.meta.env.BASE_URL}img2.jpeg`} alt="" style={{ display: "none" }} crossOrigin="anonymous" />

      {/* Brush canvas */}
      <canvas ref={canvasRef} className="anime-canvas" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} onPointerUp={handlePointerLeave} onPointerCancel={handlePointerLeave} />

      {/* Content Overlay */}
      <div className="hero-content">
        {/* Action Buttons: Translucent Glass */}
        <motion.div 
          className="buttn" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.a 
            href={resumeUrl} 
            download="Shantaram_Divgi_Resume.pdf" 
            whileHover={{ scale: 1.04, y: -2 }} 
            whileTap={{ scale: 0.96 }} 
            className="btn-cv"
            aria-label="Download CV as PDF"
          >
            <FaFileDownload /> Download CV
          </motion.a>

          <motion.a 
            href="https://github.com/RamDivgi" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }} 
            whileTap={{ scale: 0.96 }} 
            className="btn-github"
            aria-label="Visit Ram Divgi on GitHub"
          >
            <FaGithub /> GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }} aria-hidden="true">
        <motion.div className="scroll-dot" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }} />
      </motion.div>
    </div>
  );
}
