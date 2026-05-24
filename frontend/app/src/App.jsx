import { Routes, Route, Navigate } from 'react-router-dom';
import { getUser } from './services/api';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Dashboard from './pages/Dashboard';
import CreateReport from './pages/CreateReport';
import ReportDetail from './pages/ReportDetail';
import Admin from './pages/Admin';
import Stats from './pages/Stats';

function ProtectedRoute({ children, roles }) {
  const user = getUser();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<Search />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/reports/new" element={<ProtectedRoute><CreateReport /></ProtectedRoute>} />
          <Route path="/reports/:id" element={<ProtectedRoute><ReportDetail /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute roles={['ADMIN', 'MODERATOR']}><Admin /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}