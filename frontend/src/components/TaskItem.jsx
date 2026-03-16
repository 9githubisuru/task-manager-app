import { deleteTask, updateTask } from "../services/TaskService";
import { useState } from "react";
import EditTaskModal from "./EditTaskModal";

export default function TaskItem({ task, refresh }) {
  const [editing, setEditing] = useState(false);

  const remove = async () => {
    if (confirm("Delete task?")) {
      await deleteTask(task.id);
      refresh();
    }
  };

  const markDone = async () => {
    await updateTask(task.id, {
      ...task,
      status: "DONE",
    });
    refresh();
  };

  const statusColor = {
    TODO: "bg-gray-400",
    IN_PROGRESS: "bg-yellow-500",
    DONE: "bg-green-500",
  };

  return (
    <div className="bg-white p-4 shadow rounded flex justify-between">
      <div>
        <h3 className="font-bold flex gap-2">
          {task.title}

          <span
            className={`text-white px-2 text-xs rounded ${statusColor[task.status]}`}
          >
            {task.status}
          </span>
        </h3>

        <p>{task.description}</p>

        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setEditing(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Edit
        </button>

        <button
          onClick={markDone}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Complete
        </button>

        <button
          onClick={remove}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>

      {editing && (
        <EditTaskModal
          task={task}
          refresh={refresh}
          close={() => setEditing(false)}
        />
      )}
    </div>
  );
}
