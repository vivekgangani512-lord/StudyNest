import "./studyPlanner.css";
import { useState } from "react";

function StudyPlanner({ onBack }) {


    // Create Task


    const createTask = () => ({
        id: Date.now() + Math.random(),
        subject: "",
        topic: "",
        date: "",
        duration: "",
        priority: "Medium",
        completed: false
    });


    // States


    const [tasks, setTasks] = useState([
        createTask()
    ]);


    // Update Task


    const updateTask = (id, field, value) => {

        const updatedTasks = tasks.map((task) => {

            if (task.id === id) {

                return {
                    ...task,
                    [field]: value
                };

            }

            return task;

        });

        setTasks(updatedTasks);

    };


    // Add Task


    const addTask = () => {

        setTasks([
            ...tasks,
            createTask()
        ]);

    };


    // Delete Task


    const deleteTask = (id) => {

        if (tasks.length === 1) {

            alert("At least one task is required.");

            return;

        }

        setTasks(
            tasks.filter(task => task.id !== id)
        );

    };


    // Toggle Complete


    const toggleComplete = (id) => {

        const updated = tasks.map((task) => {

            if (task.id === id) {

                return {
                    ...task,
                    completed: !task.completed
                };

            }

            return task;

        });

        setTasks(updated);

    };


    // Reset Planner


    const resetPlanner = () => {

        setTasks([
            createTask()
        ]);

    };

    // Summary


    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const pendingTasks =
        totalTasks - completedTasks;

    const progress =
        totalTasks === 0
            ? 0
            : Math.round(
                (completedTasks / totalTasks) * 100
            );

    return (

        <div className="planner-page">

            {/* Header */}

            <div className="page-header">

                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← Back
                </button>

                <div className="title">

                    <h1>Study Planner</h1>

                    <p>

                        Organize your study sessions,
                        track completed topics and
                        stay productive every day.

                    </p>

                </div>

            </div>

            {/* Layout */}

            <section className="planner-container">

                {/* Left Card */}

                <div className="planner-card">

                    <div className="table-header">

                        <h4>Subject</h4>

                        <h4>Topic</h4>

                        <h4>Date</h4>

                        <h4>Priority</h4>

                        <h4></h4>

                    </div>

                    {tasks.map((task) => (

                        <div
                            className="task-row"
                            key={task.id}
                        >

                            {/* Subject */}

                            <input
                                type="text"
                                placeholder="Subject"
                                value={task.subject}
                                onChange={(e) =>
                                    updateTask(
                                        task.id,
                                        "subject",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Topic */}

                            <input
                                type="text"
                                placeholder="Topic"
                                value={task.topic}
                                onChange={(e) =>
                                    updateTask(
                                        task.id,
                                        "topic",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Date */}

                            <input
                                type="date"
                                value={task.date}
                                onChange={(e) =>
                                    updateTask(
                                        task.id,
                                        "date",
                                        e.target.value
                                    )
                                }
                            />

                            {/* Priority */}

                            <select
                                value={task.priority}
                                onChange={(e) =>
                                    updateTask(
                                        task.id,
                                        "priority",
                                        e.target.value
                                    )
                                }
                            >

                                <option value="High">
                                    High
                                </option>

                                <option value="Medium">
                                    Medium
                                </option>

                                <option value="Low">
                                    Low
                                </option>

                            </select>

                            {/* Delete */}

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteTask(task.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    ))}

                    <button
                        className="add-btn"
                        onClick={addTask}
                    >
                        + Add Task
                    </button>

                    {/* Task List */}

                    <div className="task-list">

                        <h3>Today's Tasks</h3>

                        {tasks.map((task) => (

                            <div
                                className={`task-card ${task.completed ? "completed" : ""}`}
                                key={task.id + "-card"}
                            >
                                <div className="task-info">

                                    <h4>

                                        {task.subject || "Subject"}

                                    </h4>

                                    <p>

                                        {task.topic || "Topic"}

                                    </p>

                                    <small>

                                        {task.date || "Select Date"}

                                    </small>

                                </div>

                                <div className="task-actions">

                                    <button
                                        className="complete-btn"
                                        onClick={() =>
                                            toggleComplete(task.id)
                                        }
                                    >
                                        {
                                            task.completed
                                                ? "Completed"
                                                : "Mark Done"
                                        }
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/*Summary Card*/}

                <div className="result-card">

                    <h2>Study Summary</h2>

                    <div className="result-item">

                        <span>Total Tasks</span>

                        <strong>{totalTasks}</strong>

                    </div>

                    <div className="result-item">

                        <span>Completed</span>

                        <strong>{completedTasks}</strong>

                    </div>

                    <div className="result-item">

                        <span>Pending</span>

                        <strong>{pendingTasks}</strong>

                    </div>

                    {/* Progress */}

                    <div className="progress-section">

                        <h3>Progress</h3>

                        <div className="progress-bar">

                            <div
                                className="progress-fill"
                                style={{
                                    width: `${progress}%`
                                }}
                            ></div>

                        </div>

                        <h2>{progress}%</h2>

                    </div>

                    {/* Motivation */}

                    <div className="motivation-box">

                        {

                            progress === 100 ?

                                <p>🎉 Amazing! All tasks completed.</p>

                                :

                                progress >= 75 ?

                                    <p> Almost there! Keep going.</p>

                                    :

                                    progress >= 50 ?

                                        <p> You're making good progress.</p>

                                        :

                                        progress > 0 ?

                                            <p>📚 Stay focused and keep studying.</p>

                                            :

                                            <p> Add your first study task.</p>

                        }

                    </div>

                    <button
                        className="reset-btn"
                        onClick={resetPlanner}
                    >
                        Reset Planner
                    </button>

                </div>

            </section>

            {/*Study Tips*/}

            <section className="tips-section">

                <h2>Study Tips</h2>

                <div className="tips-grid">

                    <div className="tip-card">

                        <h3> Study Daily</h3>

                        <p>

                            Even 1-2 hours of focused study every day
                            is more effective than studying everything
                            at the last moment.

                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Focus on One Topic</h3>

                        <p>

                            Complete one topic completely before
                            switching to another subject.

                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Take Breaks</h3>

                        <p>

                            Follow the Pomodoro technique:
                            Study for 25 minutes and take a
                            5-minute break.

                        </p>

                    </div>

                    <div className="tip-card">

                        <h3> Revise Regularly</h3>

                        <p>

                            Spend at least 20 minutes revising
                            what you've already learned.

                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}

export default StudyPlanner;