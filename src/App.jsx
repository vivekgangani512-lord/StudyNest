import "./App.css";
import logo from "./assets/StudyNestLogo.png";
import { useEffect, useState } from "react";
import CgpaCalculator from "./cgpaCalculator.jsx";
import AttendanceTracker from "./attendanceTracker.jsx";
import StudyPlanner from "./studyPlanner.jsx";
import PomodoroTimer from "./pomodoroTimer.jsx";
function App() {

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [page, setPage] = useState("home");


  if (page === "CgpaCalculator") {
    return <CgpaCalculator onBack={() => setPage("home")} />;
  }
  if (page === "AttendanceTracker") {
    return (
      <AttendanceTracker
        onBack={() => setPage("home")}
      />
    );
  }

  if (page === "StudyPlanner") {
    return (
      <StudyPlanner
        onBack={() => setPage("home")}
      />
    );
  }
  if (page === "PomodoroTimer") {
    return (
      <PomodoroTimer
        onBack={() => setPage("home")}
      />
    );
  }
  return (
    <div className="app">

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="logo-section">
          <a href="#home" className="logo-link">
            <img src={logo} alt="StudyNest Logo" className="logo" />
            <span className="logo-text">StudyNest</span>
          </a>
        </div>

        <div className="badge">
          🎓 Trusted by Students
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#feedback">Feedback</a></li>
        </ul>
      </nav >

      {/* HERO */}
      <section id="home" className="hero" data-aos="fade-up">
        <h1>
          Study Smarter. <br />
          Achieve More.
        </h1>

        <p>
          Your all-in-one student productivity toolkit to calculate CGPA,
          track attendance, plan study sessions and stay focused.
        </p>

        <div className="tool-buttons">
          <button onClick={() => setPage("CgpaCalculator")}>
            CGPA Calculator
          </button>
          <button onClick={() => setPage("AttendanceTracker")}>
            Attendance Tracker
          </button>
          <button
            onClick={() => setPage("StudyPlanner")}
          >
            Study Planner
          </button>
          <button onClick={() => setPage("PomodoroTimer")}>
            Pomodoro Timer
          </button>
        </div>
      </section >

      {/* ABOUT */}
      <section id="about" className="about" data-aos="fade-up">
        <h2>Why StudyNest?</h2>
        <p>
          Students often use multiple websites for attendance calculations,
          study planning, productivity tracking and CGPA management.
          StudyNest brings everything together in one modern platform.
        </p>
      </section >

      {/* FEATURES */}
      <section id="features" className="features" data-aos="fade-up">
        <h2>How StudyNest Helps You</h2>

        <div className="feature-grid">
          <div className="card">
            <h3>CGPA Calculator</h3>
            <p>Calculate semester and overall CGPA instantly.</p>
          </div>

          <div className="card">
            <h3>Attendance Tracker</h3>
            <p>Know how many lectures you can miss safely.</p>
          </div>

          <div className="card">
            <h3>Study Planner</h3>
            <p>Organize subjects, assignments and exams.</p>
          </div>

          <div className="card">
            <h3>Pomodoro Timer</h3>
            <p>Stay focused using proven productivity techniques.</p>
          </div>
        </div>
      </section >

      {/* FEEDBACK */}
      <section id="feedback" className="feedback" data-aos="fade-up">
        <h2>Share Your Feedback</h2>

        <p>
          Your feedback helps us improve StudyNest. Report bugs, suggest new features, or share your experience using the platform. Every suggestion helps us build a better tool for students.
        </p>
        <form
          action="https://formspree.io/f/xbdvobop"
          method="POST"
          className="feedback-form"
        >

          <select name="type">

            <option>Bug Report</option>

            <option>Feature Request</option>

            <option>Suggestion</option>

            <option>General Feedback</option>

          </select>
          <input
            type="hidden"
            name="_subject"
            value="New StudyNest Feedback"
          />

          <input
            type="hidden"
            name="_captcha"
            value="false"
          />


          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="_replyto"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            placeholder="Your Feedback"
            required
          ></textarea>
          <button type="submit">
            Send Feedback
          </button>
        </form>
      </section >

      {/* FOOTER */}
      <footer className="footer" data-aos="fade-up">
        <h3>StudyNest</h3>
        <p>Helping students stay productive and achieve academic success.</p>
        <button
          className="digital-btn"
          onClick={() =>
            window.open(
              "https://digitalheroesco.com",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          Built for Digital Heroes
        </button>
      </footer>

    </div >
  );
}

export default App;