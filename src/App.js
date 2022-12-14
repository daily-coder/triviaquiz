import React, { useState, useEffect } from "react";
import StartPage from "./components/StartPage/StartPage";
import Quiz from "./components/Quiz";
import Switch from "./components/Switch";

function App() {
  const [showStartPage, setShowStartPage] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("theme")) || false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  function toggleDarkMode(ev) {
    // event attached to label  will also fire for input element.

    if (ev.target.type !== "checkbox") {
      setDarkMode((prevDarkMode) => !prevDarkMode);
    }
  }

  function hideStartPage() {
    setShowStartPage(false);
  }

  return (
    <div>
      <section className="flex justify-center items-center min-h-screen">
        {/* top-left and bottom-left circle blobs */}
        <div className="fixed top-0 right-0 -z-10 translate-x-1/2 -translate-y-1/2 rounded-full w-[200px] h-[200px] bg-yellow-light dark:bg-grey"></div>
        <div className="fixed bottom-0 left-0 -z-10 -translate-x-1/2 translate-y-1/2 rounded-full w-[200px] h-[200px] bg-blue-light dark:bg-grey"></div>

        <Switch darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {showStartPage ? <StartPage hideStartPage={hideStartPage} /> : <Quiz />}
      </section>
    </div>
  );
}

export default App;
