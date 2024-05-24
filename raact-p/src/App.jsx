import "./index.css";
import React from "react";
import HeroSection from "./views/HeroSection.jsx";
import MySkills from "./views/MySkills.jsx";
import AboutMe from "./views/AboutMe.jsx";
import MyPortfolio from "./views/MyPortfolio.jsx";
import ContactMe from "./views/ContactMe.jsx";
import Footer from "./views/Footer.jsx";
import Main from "./views/Main.jsx";

function App() {
  return (
    <div className="App">
      <Main />
      <HeroSection />
      <MySkills />
      <AboutMe />
      <MyPortfolio />
      <ContactMe />
      <Footer />
    </div>
  );
}

export default App;
