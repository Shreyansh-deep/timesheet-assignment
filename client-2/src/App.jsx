import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ManagerDashboard from './pages/ManagerDashboard';
import AssociateDashboard from './pages/AssociateDashboard';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/associate" element={<AssociateDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
