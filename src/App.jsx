import Header from './components/Header'
import BottomNav from './components/BottomNav'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <AppRoutes />
      </main>
      <BottomNav />
    </div>
  )
}

export default App