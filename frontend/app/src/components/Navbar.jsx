import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../services/api';

export default function Navbar() {
  const user = getUser();
  const navigate = useNavigate();
  const isAdmin = user && (user.role === 'ADMIN' || user.role === 'MODERATOR');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm">DS</span>
          DataShield
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link to="/search" className="text-slate-300 hover:text-white transition hidden md:block">Buscar</Link>
          <Link to="/stats" className="text-slate-300 hover:text-white transition hidden md:block">Estadísticas</Link>

          {user ? (
            <>
              <Link to="/dashboard" className="text-slate-300 hover:text-white transition hidden md:block">Panel</Link>
              <Link to="/reports/new" className="text-slate-300 hover:text-white transition hidden md:block">Reportar</Link>
              {isAdmin && (
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 transition hidden md:block">Admin</Link>
              )}
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-slate-400">{user.name}</span>
                <button onClick={handleLogout} className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500 hover:text-white transition">
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white transition">Ingresar</Link>
              <Link to="/register" className="rounded-lg bg-brand-600 px-4 py-1.5 text-white hover:bg-brand-500 transition text-sm font-medium">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-slate-950 z-50">
          <div className="flex justify-around py-2 text-xs">
            <Link to="/search" className="flex flex-col items-center gap-0.5 text-slate-400"><span className="text-lg">🔍</span>Buscar</Link>
            <Link to="/dashboard" className="flex flex-col items-center gap-0.5 text-slate-400"><span className="text-lg">📊</span>Panel</Link>
            <Link to="/reports/new" className="flex flex-col items-center gap-0.5 text-slate-400"><span className="text-lg">➕</span>Reportar</Link>
            {isAdmin && <Link to="/admin" className="flex flex-col items-center gap-0.5 text-amber-400"><span className="text-lg">⚙️</span>Admin</Link>}
          </div>
        </div>
      )}
    </nav>
  );
}