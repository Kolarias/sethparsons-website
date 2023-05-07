import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Resume from "./Pages/Resume";
import Hobbies from "./Pages/Hobbies";
import Contact from "./Pages/Contact";

// based on my team's work on FuturFindr 
// https://gitlab.com/ritzyo/cs373-idb-17/-/blob/master/frontend/src/RouteSwitch.jsx

const RouteSwitch = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/hobbies" element={<Hobbies/>} />
          <Route path="/resume" element={<Resume/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default RouteSwitch;