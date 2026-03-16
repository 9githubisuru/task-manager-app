import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import TaskTable from "../components/TaskTable";

function TaskPage() {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      await loadTasks();
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager Dashboard</h1>

      <TaskForm refresh={loadTasks} />

      <TaskTable tasks={tasks} refresh={loadTasks} />
    </div>
  );
}

export default TaskPage;
