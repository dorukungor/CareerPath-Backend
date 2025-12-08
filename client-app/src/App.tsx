function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">🚀 Career Path</h1>
        <p className="text-gray-600 text-lg">Backend API Status: <span className="font-mono text-sm bg-gray-200 px-2 py-1 rounded">Checking...</span></p>
        <div className="mt-8">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            Explore Paths
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
