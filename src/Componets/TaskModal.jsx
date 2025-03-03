import { useState, useEffect } from "react";

const TaskModal = ({ closeModal, task, addTask, updateTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task?.title);
      setDescription(task?.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      if (task) {
        response = await updateTask({
          id: task._id,
          title,
          description,
          status: "pending",
        });
      } else {
        response = await addTask({ title, description, status: "pending" });
      }

      // Check response for success or failure
      if (response?.data?.success) {
        alert(response.data.message); // Show success message
      } else {
        alert("Something went wrong. Please try again."); // Show generic error if no specific message
      }

      closeModal(); // Close modal after submit
    } catch (error) {
      alert(`Error: ${error.message}`); // Catch any error and show it
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-10/12">
        <h2 className="text-xl font-bold mb-4">
          {task ? "Update Task" : "Add Task"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            {task ? "Update" : "Add"}
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
