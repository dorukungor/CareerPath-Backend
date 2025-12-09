import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ProfessionDetail from './pages/ProfessionDetail';
import StepDetailPage from './pages/StepDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard'; // Added
import ProtectedRoute from './components/ProtectedRoute'; // Added
import { AuthProvider, useAuth } from './context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md bg-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <span className="font-bold text-xl tracking-tight text-slate-800">CareerPath</span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                  Kariyerlerim
                </Link>
                <span className="text-sm font-medium text-gray-700">Hoşgeldin, {user?.fullName}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
                  Giriş Yap
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm hover:shadow-md transition-all">
                  Kayıt Ol
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profession/:id" element={<ProfessionDetail />} />
            <Route path="/profession/:professionId/step/:stepId" element={<StepDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
