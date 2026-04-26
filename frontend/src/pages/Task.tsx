import { useState } from "react";
import "../index";
import { useNavigate } from "react-router-dom";
import { createTask } from "../services/taskApi";
import { Task } from "../models/task";


const TaskPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
    remarks: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
  try {
    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    // 🔥 map status → isCompleted
    const payload = {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate || null,
      remarks: form.remarks,
      isCompleted: form.status === "Completed",
    };

    console.log("Sending payload:", payload);

    await createTask(payload);
    navigate("/tasks");
  } 
  catch (err) {
    console.error("Create failed", err);
  }
};

  return (
    <div className="task-container">
      <div className="task-box">
        <h2>Create Task</h2>

        <input
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
        />

        {/* 🔥 ROW: Due Date + Status */}
        <div className="task-row">
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={form.remarks}
          onChange={handleChange}
        />

        <button onClick={handleCreateTask}>
          Create Task
        </button>
      </div>
    </div>
  );
};

export default TaskPage;