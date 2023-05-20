import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./Pages/About";
import Projects from "./Pages/Projects";
import ProjectInstance from "./Pages/ProjectInstance";
import Hobbies from "./Pages/Hobbies";
import HobbyInstance from "./Pages/HobbyInstance";
import Resume from "./Pages/Resume";
import Contact from "./Pages/Contact";

const RouteSwitch = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/projects/:id" element={<ProjectInstance/>} />
          <Route path="/hobbies" element={<Hobbies/>} />
          <Route path="/hobbies/:id" element={<HobbyInstance/>} />
          <Route path="/resume" element={<Resume/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </BrowserRouter>
    );
  };
  
  export default RouteSwitch;