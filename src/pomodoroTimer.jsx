import "./pomodoroTimer.css";
import { useEffect, useState } from "react";

function PomodoroTimer({ onBack }) {


    // Timer Constants


    const FOCUS_TIME = 25 * 60;
    const SHORT_BREAK = 5 * 60;
    const LONG_BREAK = 15 * 60;


    // States


    const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);

    const [isRunning, setIsRunning] = useState(false);

    const [mode, setMode] = useState("Focus");

    const [completedSessions, setCompletedSessions] = useState(0);

    const [focusMinutes, setFocusMinutes] = useState(0);


    // Timer Effect


    useEffect(() => {

        let timer;

        if (isRunning && timeLeft > 0) {

            timer = setInterval(() => {

                setTimeLeft((previous) => previous - 1);

            }, 1000);

        }

        else if (timeLeft === 0) {

            setIsRunning(false);

            if (mode === "Focus") {

                setCompletedSessions((previous) => previous + 1);

                setFocusMinutes((previous) => previous + 25);

                alert(" Focus Session Complete!");

            }

            else {

                alert(" Break Finished!");

            }

        }

        return () => clearInterval(timer);

    }, [isRunning, timeLeft, mode]);


    // Timer Controls


    const startTimer = () => {

        setIsRunning(true);

    };

    const pauseTimer = () => {

        setIsRunning(false);

    };

    const resetTimer = () => {

        setIsRunning(false);

        if (mode === "Focus") {

            setTimeLeft(FOCUS_TIME);

        }

        else if (mode === "Short Break") {

            setTimeLeft(SHORT_BREAK);

        }

        else {

            setTimeLeft(LONG_BREAK);

        }

    };


    // Change Mode


    const setFocusMode = () => {

        setMode("Focus");

        setTimeLeft(FOCUS_TIME);

        setIsRunning(false);

    };

    const setShortBreak = () => {

        setMode("Short Break");

        setTimeLeft(SHORT_BREAK);

        setIsRunning(false);

    };

    const setLongBreak = () => {

        setMode("Long Break");

        setTimeLeft(LONG_BREAK);

        setIsRunning(false);

    };


    // Format Time


    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    const formattedTime =

        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (

        <div className="pomodoro-page">

            {/* Header */}

            <div className="page-header">

                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <div className="title">

                    <h1>Pomodoro Timer</h1>

                    <p>

                        Stay productive using the Pomodoro
                        Technique. Focus deeply, take breaks,
                        and build better study habits.

                    </p>

                </div>

            </div>

            {/* Main Layout */}

            <section className="pomodoro-container">

                {/* Left Card */}

                <div className="timer-card">

                    <div className="timer-circle">

                        <h2>{mode}</h2>

                        <h1>{formattedTime}</h1>

                    </div>

                    {/* Controls */}

                    <div className="timer-buttons">

                        <button
                            className="start-btn"
                            onClick={startTimer}
                        >
                            ▶ Start
                        </button>

                        <button
                            className="pause-btn"
                            onClick={pauseTimer}
                        >
                            ⏸ Pause
                        </button>

                        <button
                            className="reset-btn"
                            onClick={resetTimer}
                        >
                            ↺ Reset
                        </button>

                    </div>

                    {/* Modes */}

                    <div className="mode-buttons">

                        <button
                            onClick={setFocusMode}
                        >
                            Focus
                        </button>

                        <button
                            onClick={setShortBreak}
                        >
                            Short Break
                        </button>

                        <button
                            onClick={setLongBreak}
                        >
                            Long Break
                        </button>

                    </div>

                </div>

                {/* /Statistics Card*/}

                <div className="result-card">

                    <h2>Today's Progress</h2>

                    <div className="result-item">

                        <span>Completed Sessions</span>

                        <strong>{completedSessions}</strong>

                    </div>

                    <div className="result-item">

                        <span>Focus Time</span>

                        <strong>{focusMinutes} min</strong>

                    </div>

                    <div className="result-item">

                        <span>Current Mode</span>

                        <strong>{mode}</strong>

                    </div>

                    {/* Progress */}

                    <div className="progress-section">

                        <h3>Today's Goal</h3>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${Math.min(
                                        (completedSessions / 8) * 100,
                                        100
                                    )}%`
                                }}
                            ></div>

                        </div>

                        <p>

                            {completedSessions} / 8 Focus Sessions

                        </p>

                    </div>

                    {/* Motivation */}

                    <div className="motivation-box">

                        {

                            completedSessions >= 8 ?

                                <p>

                                    🎉 Fantastic! You completed today's goal.

                                </p>

                                :

                                completedSessions >= 5 ?

                                    <p>

                                        Great work! Keep the momentum going.

                                    </p>

                                    :

                                    completedSessions >= 2 ?

                                        <p>

                                            Nice progress! Stay focused.

                                        </p>

                                        :

                                        <p>

                                            Start your first focus session.

                                        </p>

                        }

                    </div>

                </div>

            </section>

            {/*Productivity Tips*/}

            <section className="tips-section">

                <h2>Pomodoro Tips</h2>

                <div className="tips-grid">

                    <div className="tip-card">

                        <h3> Focus Deeply</h3>

                        <p>

                            Work on only one task during your
                            focus session.

                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Remove Distractions</h3>

                        <p>

                            Keep your phone away and close
                            unnecessary browser tabs.

                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Take Short Breaks</h3>

                        <p>

                            Walk, stretch or drink water before
                            starting the next session.

                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Stay Consistent</h3>

                        <p>

                            Small focused sessions every day
                            produce better long-term results.

                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}

export default PomodoroTimer;