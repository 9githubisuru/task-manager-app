import { useState } from "react";
import { createTask } from "../services/TaskService";

export default function TaskForm({ refresh }) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    assigneeEmail: "",
    dueDate: "",
  });

  const change = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!task.title) {
      alert("Title required");
      return;
    }

    await createTask(task);
    refresh();
  };

  return (
    <form className="bg-white p-4 shadow rounded mb-6" onSubmit={submit}>
      <input
        name="title"
        placeholder="Title"
        className="border p-2 w-full mb-2"
        onChange={change}
      />

      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 w-full mb-2"
        onChange={change}
      />

      <input
        name="assigneeEmail"
        placeholder="Assignee Email"
        className="border p-2 w-full mb-2"
        onChange={change}
      />

      <input
        type="date"
        name="dueDate"
        className="border p-2 w-full mb-2"
        onChange={change}
      />

      <select name="priority" className="border p-2 mb-2" onChange={change}>
        <option>LOW</option>
        <option>MEDIUM</option>
        <option>HIGH</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Task
      </button>
    </form>
  );
}
