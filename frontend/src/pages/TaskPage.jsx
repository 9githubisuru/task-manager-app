import { useEffect, useState } from "react";
import { getTasks } from "../services/TaskService";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import FilterBar from "../components/FilterBar";

export default function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [sort, setSort] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch {
      alert("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  let filtered =
    filter === "ALL" ? tasks : tasks.filter((t) => t.status === filter);

  if (sort === "priority") {
    const order = { LOW: 1, MEDIUM: 2, HIGH: 3 };
    filtered = filtered.sort((a, b) => order[b.priority] - order[a.priority]);
  }

  if (sort === "dueDate") {
    filtered = filtered.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>

      <TaskForm refresh={fetchTasks} />

      <FilterBar setFilter={setFilter} setSort={setSort} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <TaskList tasks={filtered} refresh={fetchTasks} />
      )}
    </div>
  );
}
