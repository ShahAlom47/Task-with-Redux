import { useState } from "react";
import {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../Redux/Slice/productApi";
import TaskModal from "./TaskModal";

const Tasks = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  console.log(tasks);

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleAddTask = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;

    await deleteTask(id);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Tasks!</p>;

  return (
    <div className="p-6 max-w-[1200px] mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4 border-b-4">
        Task Manager
      </h2>

      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6 border-t-4 pt-4">
        {tasks?.data?.map((task) => (
          <li
            key={task._id}
            className="flex flex-col justify-between bg-gray-100 p-4 rounded shadow"
          >
            <div>
              <h1 className="text-xl font-semibold mb-2">{task.title}</h1>
              <p className="text-gray-700">{task.description}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                onClick={() => handleUpdate(task)}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                onClick={() => handleDelete(task._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {modalOpen && (
        <TaskModal
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          task={selectedTask}
          addTask={addTask}
          updateTask={updateTask}
        />
      )}
    </div>
  );
};

export default Tasks;
