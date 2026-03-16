export default function FilterBar({ setFilter, setSort }) {
  return (
    <div className="flex gap-4 mb-4">
      <select
        className="border p-2"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <select className="border p-2" onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="priority">Priority</option>
        <option value="dueDate">Due Date</option>
      </select>
    </div>
  );
}
