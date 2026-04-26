import { useEffect, useState } from "react";
import { Task } from "../models/task";
import { getAllTasks, deleteTask, updateTask, searchTasks } from "../services/taskApi";
import "../index";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState<any>({});

    const [search, setSearch] = useState({
        title: "",
        description: "",
        status: "",
        dueDate: "",
        remarks: "",
    });

    useEffect(() => {
        const fetchTasks = async () => {
        try {
            const data = await getAllTasks();
            setTasks(data);
        } catch (err) {
            console.error("Error fetching tasks", err);
        }
        };

        fetchTasks();
    }, []);

    const handleEdit = (task: Task) => {
        setEditingId(task.id);

        setEditForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
        status: task.status,
        remarks: task.remarks || "",
        });
    };

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (id: string) => {
        try {
        const payload = {
            title: editForm.title,
            description: editForm.description,
            dueDate: editForm.dueDate || null,
            remarks: editForm.remarks,
            isCompleted: editForm.status === "Completed",
        };

        await updateTask(id, payload);

        // update UI
        setTasks((prev) =>
            prev.map((t) =>
            t.id === id ? { ...t, ...editForm } : t
            )
        );

        setEditingId(null);
        } catch (err) {
        console.error("Update failed", err);
        }
    };

    const handleDelete = async (id: string) => {
        try {
        await deleteTask(id);
        setTasks((prev) => prev.filter((t) => t.id !== id));
        } catch (err) {
        console.error("Delete failed", err);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setSearch({ ...search, [e.target.name]: e.target.value });
    };

    const handleSearch = async () => {
        try {
            const filtered = await searchTasks(search);
            setTasks(filtered);
        } catch (err) {
            console.error("Search failed", err);
        }
    };

    const handleReset = async () => {
        const data = await getAllTasks();
        setTasks(data);

        setSearch({
            title: "",
            description: "",
            status: "",
            dueDate: "",
            remarks: "",
        });
    };

    const truncate = (text: string, max: number = 12) => {
        if (!text) return "—";
        return text.length > max ? text.substring(0, max) + "..." : text;
    };

  return (
    <div className="task-container">
      <div className="task-box task-box-wide">
        <h2>All Tasks</h2>
          <div className="table-wrapper">
            <table className="task-table">
              <thead>
                <tr>
                    <th>
                    Title
                    <input
                        name="title"
                        value={search.title}
                        onChange={handleSearchChange}
                        placeholder="Title"
                    />
                    </th>

                    <th>
                    Description
                    <input
                        name="description"
                        value={search.description}
                        onChange={handleSearchChange}
                        placeholder="Description"
                    />
                    </th>

                    <th>
                    Status
                        <select
                            name="status"
                            value={search.status}
                            onChange={handleSearchChange}
                        >
                            <option value="">All</option>
                            <option value="Pending">Pending</option>
                            <option value="InProgress">InProgress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </th>

                    <th>
                    Due Date
                    <input
                        type="date"
                        name="dueDate"
                        value={search.dueDate}
                        onChange={handleSearchChange}
                    />
                    </th>

                    <th>
                    Remarks
                    <input
                        name="remarks"
                        value={search.remarks}
                        onChange={handleSearchChange}
                        placeholder="Remark"
                    />
                    </th>

                    <th>
                    Actions
                        <button onClick={handleSearch}>Search</button>
                        <button onClick={handleReset}>Reset</button>
                    </th>
                </tr>
              </thead>

              <tbody>
                {tasks.length === 0 ? (
                    <p className="empty-state">No tasks found</p>
                ) : (
                    tasks.map((task) => (
                    <tr key={task.id}>
                        {/* TITLE */}
                        <td>
                        {editingId === task.id ? (
                            <input
                            name="title"
                            value={editForm.title}
                            onChange={handleEditChange}
                            />
                        ) : (
                            <span title={task.title}>
                                {truncate(task.title, 12)}
                            </span>
                        )}
                        </td>

                        {/* DESCRIPTION */}
                        <td>
                        {editingId === task.id ? (
                            <input
                            name="description"
                            value={editForm.description}
                            onChange={handleEditChange}
                            />
                        ) : (
                            <span title={task.description}>
                                {truncate(task.description || "-", 12)}
                            </span>
                        )}
                        </td>

                        {/* STATUS */}
                        <td>
                        {editingId === task.id ? (
                            <select
                            name="status"
                            value={editForm.status}
                            onChange={handleEditChange}
                            >
                            <option value="Pending">Pending</option>
                            <option value="InProgress">In Progress</option>
                            <option value="Completed">Completed</option>
                            </select>
                        ) : (
                            <span
                            className={`status-badge status-${task.status}`}
                            >
                            {task.status}
                            </span>
                        )}
                        </td>

                        {/* DUE DATE */}
                        <td>
                        {editingId === task.id ? (
                            <input
                            type="date"
                            name="dueDate"
                            value={editForm.dueDate}
                            onChange={handleEditChange}
                            />
                        ) : task.dueDate ? (
                            new Date(task.dueDate).toLocaleDateString()
                        ) : (
                            "—"
                        )}
                        </td>

                        {/* REMARKS */}
                        <td>
                        {editingId === task.id ? (
                            <input
                            name="remarks"
                            value={editForm.remarks}
                            onChange={handleEditChange}
                            />
                        ) : (
                            <span title={task.remarks}>
                                {truncate(task.remarks || "-", 12)}
                            </span>
                        )}
                        </td>

                        {/* ACTIONS */}
                        <td className="actions-cell">
                        {editingId === task.id ? (
                            <>
                            <button onClick={() => handleUpdate(task.id)}>Save</button>
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                            <button onClick={() => handleEdit(task)}>Edit</button>
                            <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </>
                        )}
                        </td>
                    </tr>
                    )))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default TaskList;