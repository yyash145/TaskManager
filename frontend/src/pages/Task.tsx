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
    isCompleted: ""
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleCreateTask = async () => {
    try {
      // clear previous error
      setError(null);

      // validation
      if (!form.title.trim()) {
        setError("Title is required");
        return;
      }

      const payload = {
        title: form.title,
        description: form.description,
        dueDate: form.dueDate || null,
        status: form.status,
        remarks: form.remarks,
        isCompleted: form.status === "Completed"
      };

      await createTask(payload);

      // reset form on success
      setForm({
        title: "",
        description: "",
        dueDate: "",
        status: "Pending",
        remarks: "",
        isCompleted: ""
      });

      // navigate to list page
      navigate("/tasks");
    } catch (err: any) {
      console.error("Create failed:", err);

      // extract backend message safely
      const message =
        err?.response?.data?.message ||
        "Something went wrong";

      setError(message);
    }
  };

  return (
    
    <div>
      {error && (
        //<div className="error-overlay">
          <div className="error-box">
            {error}
          </div>
        //</div>
      )}
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
    </div>
  );
};

export default TaskPage;