import "./attendanceTracker.css";
import { useState } from "react";

function AttendanceTracker({ onBack }) {

    // Minimum Attendance Required

    const REQUIRED_ATTENDANCE = 75;


    // Create Subject


    const createSubject = () => ({
        id: Date.now() + Math.random(),
        name: "",
        totalClasses: "",
        attendedClasses: ""
    });


    // States


    const [subjects, setSubjects] = useState([
        createSubject(),
        createSubject()
    ]);

    const [attendance, setAttendance] = useState(0);
    const [totalClasses, setTotalClasses] = useState(0);
    const [totalAttended, setTotalAttended] = useState(0);
    const [canMiss, setCanMiss] = useState(0);
    const [needAttend, setNeedAttend] = useState(0);
    const [status, setStatus] = useState("Not Calculated");


    // Update Subject


    const updateSubject = (id, field, value) => {

        const updatedSubjects = subjects.map((subject) => {

            if (subject.id === id) {

                return {
                    ...subject,
                    [field]: value
                };

            }

            return subject;

        });

        setSubjects(updatedSubjects);

    };


    // Add Subject


    const addSubject = () => {

        setSubjects([
            ...subjects,
            createSubject()
        ]);

    };


    // Delete Subject


    const deleteSubject = (id) => {

        if (subjects.length === 1) {

            alert("At least one subject is required.");

            return;

        }

        const updatedSubjects = subjects.filter(
            subject => subject.id !== id
        );

        setSubjects(updatedSubjects);

    };


    // Calculate Attendance


    const calculateAttendance = () => {

        let total = 0;
        let attended = 0;

        for (let subject of subjects) {

            if (
                subject.name.trim() === "" ||
                subject.totalClasses === "" ||
                subject.attendedClasses === ""
            ) {

                alert("Please complete all subject details.");

                return;

            }

            if (
                Number(subject.attendedClasses) >
                Number(subject.totalClasses)
            ) {

                alert("Attended classes cannot be greater than total classes.");

                return;

            }

            total += Number(subject.totalClasses);

            attended += Number(subject.attendedClasses);

        }

        const percentage = (attended / total) * 100;

        setAttendance(percentage.toFixed(2));

        setTotalClasses(total);

        setTotalAttended(attended);


        // Status


        if (percentage >= 90) {

            setStatus("🌟 Excellent");

        }
        else if (percentage >= 75) {

            setStatus(" Safe");

        }
        else if (percentage >= 65) {

            setStatus(" Warning");

        }
        else {

            setStatus(" Low Attendance");

        }


        // Can Miss Classes


        if (percentage >= REQUIRED_ATTENDANCE) {

            let miss = Math.floor(
                (attended / 0.75) - total
            );

            if (miss < 0) miss = 0;

            setCanMiss(miss);

            setNeedAttend(0);

        }


        // Need To Attend


        else {

            let need = 0;

            let currentTotal = total;

            let currentAttended = attended;

            while (
                (currentAttended / currentTotal) * 100 <
                REQUIRED_ATTENDANCE
            ) {

                currentTotal++;

                currentAttended++;

                need++;

            }

            setNeedAttend(need);

            setCanMiss(0);

        };

    };


    // Reset


    const resetTracker = () => {

        setSubjects([
            createSubject(),
            createSubject()
        ]);

        setAttendance(0);

        setTotalClasses(0);

        setTotalAttended(0);

        setCanMiss(0);

        setNeedAttend(0);

        setStatus("Not Calculated");

    };

    return (

        <div className="attendance-page">

            {/* Header */}

            <div className="page-header">

                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <div className="title">

                    <h1>Attendance Tracker</h1>

                    <p>
                        Track your attendance, know how many classes
                        you can miss, and stay above the required
                        attendance percentage.
                    </p>

                </div>

            </div>

            {/* Main Layout */}

            <section className="attendance-container">

                {/* Left Card */}

                <div className="attendance-card">

                    <div className="table-header">

                        <h4>Subject</h4>

                        <h4>Total</h4>

                        <h4>Attended</h4>

                        <h4></h4>

                    </div>

                    {subjects.map((subject) => (

                        <div
                            className="subject-row"
                            key={subject.id}
                        >

                            {/* Subject */}

                            <input
                                type="text"
                                placeholder="Subject Name"
                                value={subject.name}
                                onChange={(e) =>
                                    updateSubject(
                                        subject.id,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Total Classes */}

                            <input
                                type="number"
                                min="1"
                                placeholder="Total"
                                value={subject.totalClasses}
                                onChange={(e) =>
                                    updateSubject(
                                        subject.id,
                                        "totalClasses",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Attended Classes */}

                            <input
                                type="number"
                                min="0"
                                placeholder="Attended"
                                value={subject.attendedClasses}
                                onChange={(e) =>
                                    updateSubject(
                                        subject.id,
                                        "attendedClasses",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Delete */}

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteSubject(subject.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                    <button
                        className="add-btn"
                        onClick={addSubject}
                    >
                        + Add Subject
                    </button>

                </div>

                {/* Result Card */}

                <div className="result-card">

                    <h2>Attendance Result</h2>

                    <div className="result-item">

                        <span>Total Subjects</span>

                        <strong>{subjects.length}</strong>

                    </div>

                    <div className="result-item">

                        <span>Total Classes</span>

                        <strong>{totalClasses}</strong>

                    </div>

                    <div className="result-item">

                        <span>Classes Attended</span>

                        <strong>{totalAttended}</strong>

                    </div>

                    <div className="attendance-box">

                        <h3>Overall Attendance</h3>

                        <h1>{attendance}%</h1>

                    </div>

                    <div className="status-box">

                        <h3>Status</h3>

                        <p>{status}</p>

                    </div>

                    <div className="result-item">

                        <span>Can Miss</span>

                        <strong>{canMiss} Classes</strong>

                    </div>

                    <div className="result-item">

                        <span>Need To Attend</span>

                        <strong>{needAttend} Classes</strong>

                    </div>

                    <button
                        className="calculate-btn"
                        onClick={calculateAttendance}
                    >
                        Calculate Attendance
                    </button>

                    <button
                        className="reset-btn"
                        onClick={resetTracker}
                    >
                        Reset
                    </button>

                </div>

            </section>

            {/* Tips Section */}

            <section className="tips-section">

                <h2>Attendance Guidelines</h2>

                <div className="tips-grid">

                    <div className="tip-card">

                        <h3> Excellent</h3>

                        <p>
                            Attendance above <strong>90%</strong>.
                            Keep maintaining your consistency.
                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Safe</h3>

                        <p>
                            Attendance above <strong>75%</strong>.
                            You are eligible and can miss a few classes.
                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Warning!!</h3>

                        <p>
                            Attendance between
                            <strong> 65% - 74%</strong>.
                            Attend upcoming lectures regularly.
                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Low Attendance</h3>

                        <p>
                            Attendance below
                            <strong> 65%</strong>.
                            Attend classes continuously to recover.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}

export default AttendanceTracker;