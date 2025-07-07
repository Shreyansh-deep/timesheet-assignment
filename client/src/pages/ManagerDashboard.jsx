import { useEffect, useState } from "react";
import API from "../utils/api";
import Navbar from "../components/Navbar";

const ManagerDashboard = () => {
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [hours, setHours] = useState("");
  const [date, setDate] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    API.get("/auth/users").then((res) => {
      const associates = res.data.filter((user) => user.role === "associate");
      setUsers(associates);
    });
  }, []);

  useEffect(() => {
    API.get("/manager/timesheets").then((res) => setTimesheets(res.data));
  }, []);

  const assignTask = () => {
    if (!selectedUserId || !desc || !hours || !date) {
      return alert("Please fill all fields");
    }

    API.post("/manager/assign-task", {
      description: desc,
      estimatedHours: Number(hours),
      taskDate: new Date(date),
      assignedTo: selectedUserId,
    })
      .then(() => {
        alert("Task assigned successfully");
        setDesc("");
        setHours("");
        setDate("");
        setSelectedUserId("");
      })
      .catch(() => {
        alert("Failed to assign task");
      });
  };

  return (
    <div className="p-6">
      <Navbar />
      <div>
        <h2 className="text-xl font-bold mb-4">Assign Task</h2>
        <select
          className="border p-2 mb-3 w-full"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option value="">-- Select an associate --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
        <input
          className="border p-2 m-2"
          placeholder="Task Desc"
          onChange={(e) => setDesc(e.target.value)}
        />
        <input
          className="border p-2 m-2"
          placeholder="Est. Hours"
          type="number"
          onChange={(e) => setHours(e.target.value)}
        />
        <input
          className="border p-2 m-2"
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="bg-green-500 text-white p-2" onClick={assignTask}>
          Assign
        </button>
      </div>
      <h2 className="text-lg font-bold mt-8 mb-4">Submitted Timesheets</h2>
      <h2 className="text-xl font-semibold mt-8 mb-4">Submitted Timesheets</h2>

      <table className="min-w-full border border-gray-200 bg-white rounded-md overflow-hidden">
        <thead className="bg-gray-100 text-left text-sm text-gray-600">
          <tr>
            <th className="px-4 py-2">Task</th>
            <th className="px-4 py-2">Associate</th>
            <th className="px-4 py-2">Est. Hours</th>
            <th className="px-4 py-2">Actual Hours</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {timesheets.map((ts) => (
            <tr key={ts._id} className="border-t text-sm">
              <td className="px-4 py-2">{ts.taskId?.description}</td>
              <td className="px-4 py-2">
                {ts.userId?.name} ({ts.userId?.email})
              </td>
              <td className="px-4 py-2">{ts.taskId?.estimatedHours}</td>
              <td className="px-4 py-2">{ts.actualHours}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    ts.status === "submitted"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {ts.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagerDashboard;
