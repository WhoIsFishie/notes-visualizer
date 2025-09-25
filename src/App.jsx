import { AppProvider } from './contexts/AppProvider'
import { useApp } from './contexts/useApp'
import { NotesList } from './components/NotesList'
import { NoteView } from './components/NoteView'
import { cn } from './lib/utils'

function AppContent() {
  const { isMobile, showSidebar, loading, error, setError, theme } = useApp()

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-destructive mb-4">{error}</div>
          <button
            onClick={() => setError(null)}
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg"
          >
            Dismiss
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex font-ios overflow-x-hidden">
      {/* Sidebar */}
      <div className={cn(
        "transition-all duration-300",
        showSidebar ? "w-full md:w-80" : "w-0",
        !showSidebar && "overflow-hidden"
      )}>
        <NotesList />
      </div>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300 min-w-0",
        isMobile && showSidebar && "hidden"
      )}>
        <NoteView />
      </div>
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}

export default App
