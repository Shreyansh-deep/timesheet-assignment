import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-blue-100 shadow">
      <h1 className="text-xl font-bold text-blue-700">Timesheet App</h1>
      {role && (
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
