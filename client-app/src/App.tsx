import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfessionDetail from './pages/ProfessionDetail';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-md bg-white/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                <span className="font-bold text-xl tracking-tight text-slate-800">CareerPath</span>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profession/:id" element={<ProfessionDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
