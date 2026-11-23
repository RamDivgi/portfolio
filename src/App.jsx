import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Loading from "./components/Loading";
import Header from "./components/Header";
import Hero from "./pages/Hero/Hero";

// Lazy-load below-the-fold components to reduce initial bundle size and speed up FCP/LCP
const About = lazy(() => import("./pages/About/About"));
const Project = lazy(() => import("./pages/Project/Project"));
const Experience = lazy(() => import("./pages/Experience/Experience"));
const Education = lazy(() => import("./pages/Education/Education"));
const Achievements = lazy(() => import("./pages/Achievements/Achievements"));
const Services = lazy(() => import("./pages/Services/Services"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Footer = lazy(() => import("./pages/Footer/Footer"));

function checkSessionVisited() {
  try {
    return sessionStorage.getItem("ram_portfolio_visited") === "true";
  } catch {
    return false;
  }
}

function App() {
  const [loadingComplete, setLoadingComplete] = useState(() => checkSessionVisited());

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
            <Suspense fallback={<div className="section-fallback" style={{ minHeight: "200px" }} />}>
              <About />
              <Project />
              <Experience />
              <Education />
              <Achievements />
              <Services />
              <Contact />
              <Footer />
            </Suspense>
          </main>
        </>
      )}
    </>
  );
}

export default App;
