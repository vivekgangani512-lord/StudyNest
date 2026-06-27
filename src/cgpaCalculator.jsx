import "./cgpaCalculator.css";
import { useState } from "react";

function CgpaCalculator({ onBack }) {

    // Grade Mapping
    const gradePoints = {
        O: 10,
        "A+": 9,
        A: 8,
        "B+": 7,
        B: 6,
        C: 5,
        F: 0
    };

    // Initial Subject
    const createSubject = () => ({
        id: Date.now() + Math.random(),
        name: "",
        credit: "",
        grade: ""
    });

    // States
    const [subjects, setSubjects] = useState([
        createSubject(),
        createSubject()
    ]);

    const [cgpa, setCgpa] = useState(0);


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
        setSubjects([...subjects, createSubject()]);
    };


    // Delete Subject

    const deleteSubject = (id) => {
        if (subjects.length === 1) {
            alert("At least one subject is required.");
            return;
        }
        const updated = subjects.filter(subject => subject.id !== id);
        setSubjects(updated);
    };


    // Total Credits

    const totalCredits = subjects.reduce((total, subject) => {
        return total + Number(subject.credit || 0);
    }, 0);


    // Calculate CGPA

    const calculateCgpa = () => {
        let qualityPoints = 0;
        let credits = 0;

        for (let subject of subjects) {
            if (
                subject.name.trim() === "" ||
                subject.credit === "" ||
                subject.grade === ""
            ) {
                alert("Please complete all subject details.");
                return;
            }

            const credit = Number(subject.credit);
            const point = gradePoints[subject.grade];

            qualityPoints += credit * point;
            credits += credit;
        }

        if (credits === 0) {
            setCgpa(0);
            return;
        }

        const result = qualityPoints / credits;
        setCgpa(result.toFixed(2));
    };


    // Reset Calculator

    const resetCalculator = () => {
        setSubjects([
            createSubject(),
            createSubject()
        ]);
        setCgpa(0);
    };

    return (
        <div className="cgpa-page">

            {/* Header */}
            <div className="page-header">
                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <div className="title">
                    <h1>CGPA Calculator</h1>
                    <p>
                        Calculate your semester and overall CGPA accurately
                        using subject credits and grades.
                    </p>
                </div>
            </div>

            {/* Calculator */}
            <section className="calculator-container">

                {/* Left Card */}
                <div className="calculator-card">
                    <div className="table-header">
                        <h4>Subject</h4>
                        <h4>Credits</h4>
                        <h4>Grade</h4>
                        <h4></h4>
                    </div>

                    {subjects.map((subject) => (
                        <div className="subject-row" key={subject.id}>
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

                            {/* Credits */}
                            <input
                                type="number"
                                min="1"
                                max="10"
                                placeholder="Credits"
                                value={subject.credit}
                                onChange={(e) =>
                                    updateSubject(
                                        subject.id,
                                        "credit",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Grade */}
                            <select
                                value={subject.grade}
                                onChange={(e) =>
                                    updateSubject(subject.id, "grade", e.target.value)
                                }
                            >
                                <option value="O">O (10)</option>
                                <option value="A+">A+ (9)</option>
                                <option value="A">A (8)</option>
                                <option value="B+">B+ (7)</option>
                                <option value="B">B (6)</option>
                                <option value="C">C (5)</option>
                                <option value="F">F (0)</option>
                            </select>

                            {/* Delete Button */}
                            <button
                                className="delete-btn"
                                onClick={() => deleteSubject(subject.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                    <button className="add-btn" onClick={addSubject}>
                        + Add Subject
                    </button>
                </div>

                {/* Result Card */}
                <div className="result-card">
                    <h2>Semester Result</h2>

                    <div className="result-item">
                        <span>Total Subjects</span>
                        <strong>{subjects.length}</strong>
                    </div>

                    <div className="result-item">
                        <span>Total Credits</span>
                        <strong>{totalCredits}</strong>
                    </div>

                    <div className="cgpa-box">
                        <h3>Your CGPA</h3>
                        <h1>{cgpa}</h1>
                    </div>

                    <button className="calculate-btn" onClick={calculateCgpa}>
                        Calculate CGPA
                    </button>

                    <button className="reset-btn" onClick={resetCalculator}>
                        Reset
                    </button>
                </div>

            </section>

            {/* Grade Scale */}
            <section className="grade-section">
                <h2>Grade Scale</h2>
                <div className="grade-grid">
                    <div><strong>Grade</strong></div>
                    <div><strong>Points</strong></div>

                    <div>O</div>
                    <div>10</div>

                    <div>A+</div>
                    <div>9</div>

                    <div>A</div>
                    <div>8</div>

                    <div>B+</div>
                    <div>7</div>

                    <div>B</div>
                    <div>6</div>

                    <div>C</div>
                    <div>5</div>

                    <div>F</div>
                    <div>0</div>
                </div>
            </section>

        </div>
    );
}

export default CgpaCalculator;