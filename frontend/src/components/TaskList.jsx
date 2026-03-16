import TaskItem from "./TaskItem";

export default function TaskList({ tasks, refresh }) {
  if (tasks.length === 0) return <p>No tasks found</p>;

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} refresh={refresh} />
      ))}
    </div>
  );
}
