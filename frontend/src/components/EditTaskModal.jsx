import { useState } from "react";
import { updateTask } from "../services/TaskService";

export default function EditTaskModal({ task, close, refresh }) {
  const [form, setForm] = useState(task);

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    await updateTask(task.id, form);
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl mb-3">Edit Task</h2>

        <input
          name="title"
          className="border p-2 w-full mb-2"
          value={form.title}
          onChange={change}
        />

        <textarea
          name="description"
          className="border p-2 w-full mb-2"
          value={form.description}
          onChange={change}
        />

        <select
          name="priority"
          className="border p-2 w-full mb-2"
          onChange={change}
        >
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <div className="flex justify-end gap-2">
          <button onClick={close} className="border px-3 py-1">
            Cancel
          </button>

          <button onClick={save} className="bg-blue-500 text-white px-3 py-1">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
