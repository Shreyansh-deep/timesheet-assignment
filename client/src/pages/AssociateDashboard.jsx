import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";

const AssociateDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [hoursMap, setHoursMap] = useState({});

  const fetchTasks = () => {
    API.get("/associate/my-tasks").then((res) => setTasks(res.data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const submit = (taskId) => {
    const actualHours = hoursMap[taskId];
    if (!actualHours) return alert("Please enter hours");

    API.post("/associate/submit-timesheet", {
      taskId,
      actualHours,
      status: "submitted",
    })
      .then(() => {
        alert("Timesheet submitted!");
        fetchTasks(); // Refresh status after submission
      })
      .catch((err) => {
        const msg = err.response?.data?.msg || "Something went wrong";
        alert(`Submission failed: ${msg}`);
      });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          My Assigned Tasks
        </h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white rounded-md overflow-hidden">
              <thead className="bg-gray-100 text-left text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-2">Task</th>
                  <th className="px-4 py-2">Est. Hours</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const isSubmitted = task.status === "submitted";
                  return (
                    <tr key={task._id} className="border-t text-sm">
                      <td className="px-4 py-2">{task.description}</td>
                      <td className="px-4 py-2">{task.estimatedHours}</td>
                      <td className="px-4 py-2">
                        {new Date(task.taskDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isSubmitted
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {isSubmitted ? "Submitted" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {!isSubmitted ? (
                          <div className="flex flex-col sm:flex-row items-center gap-2">
                            <input
                              type="number"
                              placeholder="Hours"
                              className="border px-2 py-1 rounded w-24"
                              onChange={(e) =>
                                setHoursMap((prev) => ({
                                  ...prev,
                                  [task._id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              className="bg-blue-600 text-white text-sm px-3 py-1 rounded hover:bg-blue-700"
                              onClick={() => submit(task._id)}
                            >
                              Submit
                            </button>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">
                            "✔️" 
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssociateDashboard;
