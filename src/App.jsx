import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Loading from "./components/Loading"
import Header from "./components/Header"

import Hero from "./pages/Hero/Hero"
import About from "./pages/About/About"
import Project from "./pages/Project/Project"
import Experience from "./pages/Experience/Experience";
import Education from "./pages/Education/Education";
import Achievements from "./pages/Achievements/Achievements";
import Services from "./pages/Services/Services"
import Contact from "./pages/Contact/Contact"
import Footer from "./pages/Footer/Footer"

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false)

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

          <Hero />
          <About />
          <Project />
          <Experience />
          <Education />
          <Achievements />
          <Services />
          <Contact />
          <Footer />
        </>
      )}
    </>
  )
}

export default App