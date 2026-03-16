import { deleteTask, completeTask } from "../services/taskService";

function TaskTable({ tasks, refresh }) {
  const handleDelete = async (id) => {
    await deleteTask(id);
    refresh();
  };

  const handleComplete = async (id) => {
    await completeTask(id);
    refresh();
  };

  const priorityColor = (priority) => {
    if (priority === "HIGH") return "text-red-500";
    if (priority === "MEDIUM") return "text-yellow-500";
    return "text-green-500";
  };

  const statusBadge = (status) => {
    if (status === "DONE") return "bg-green-200 text-green-800";
    if (status === "IN_PROGRESS") return "bg-yellow-200 text-yellow-800";
    return "bg-gray-200 text-gray-800";
  };

  return (
    <div className="bg-white shadow-md rounded p-4">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Title</th>
            <th className="p-2">Priority</th>
            <th className="p-2">Status</th>
            <th className="p-2">Due Date</th>
            <th className="p-2">Assignee</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-2">{task.title}</td>

              <td
                className={`p-2 font-semibold ${priorityColor(task.priority)}`}
              >
                {task.priority}
              </td>

              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm ${statusBadge(task.status)}`}
                >
                  {task.status}
                </span>
              </td>

              <td className="p-2">{task.dueDate}</td>

              <td className="p-2">{task.assigneeEmail}</td>

              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleComplete(task.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Complete
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;
