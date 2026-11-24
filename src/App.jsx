import { useState, lazy, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Hero from "./pages/Hero/Hero";
import { SectionErrorBoundary } from "./components/ErrorBoundary";

// Retry helper for dynamic imports (retries once on failure, then throws)
function lazyWithRetry(factory) {
  return lazy(async () => {
    try {
      return await factory();
    } catch (initialError) {
      console.warn("Retrying dynamic component import once...", initialError);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await factory();
    }
  });
}

// Lazy-load below-the-fold components with automatic retry
const About = lazyWithRetry(() => import("./pages/About/About"));
const Project = lazyWithRetry(() => import("./pages/Project/Project"));
const Experience = lazyWithRetry(() => import("./pages/Experience/Experience"));
const Education = lazyWithRetry(() => import("./pages/Education/Education"));
const Achievements = lazyWithRetry(() => import("./pages/Achievements/Achievements"));
const Services = lazyWithRetry(() => import("./pages/Services/Services"));
const Contact = lazyWithRetry(() => import("./pages/Contact/Contact"));
const Footer = lazyWithRetry(() => import("./pages/Footer/Footer"));

function checkSessionVisited() {
  try {
    return sessionStorage.getItem("ram_portfolio_visited") === "true";
  } catch {
    return false;
  }
}

function App() {
  const [loadingComplete, setLoadingComplete] = useState(() => checkSessionVisited());

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.setAttribute("data-mounted", "true");
    }
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loadingComplete && (
          <Loading onLoadingComplete={() => setLoadingComplete(true)} />
        )}
      </AnimatePresence>

      {loadingComplete && (
        <>
          <Header />
          <main id="main-content">
            <Hero />
            <SectionErrorBoundary sectionName="About">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <About />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Project">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <Project />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Experience">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <Experience />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Education">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <Education />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Achievements">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <Achievements />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Services">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <Services />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Contact">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
                <Contact />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Footer">
              <Suspense fallback={<div className="section-fallback" style={{ minHeight: "100px" }} />}>
                <Footer />
              </Suspense>
            </SectionErrorBoundary>
          </main>
        </>
      )}
    </>
  );
}

export default App;
