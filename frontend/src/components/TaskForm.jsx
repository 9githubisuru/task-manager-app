import { useState } from "react";
import { createTask } from "../services/taskService";

function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "LOW",
    dueDate: "",
    assigneeEmail: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask(task);
    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded p-6 mb-6"
    >
      <h2 className="text-xl font-bold mb-4">Create Task</h2>

      <div className="grid grid-cols-2 gap-4">
        <input
          name="title"
          placeholder="Task title"
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="priority"
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>

        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="date"
          name="dueDate"
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="assigneeEmail"
          placeholder="Assignee email"
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
        />
      </div>

      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
