import { useState } from 'react'
import { useApp } from '../contexts/useApp'
import { formatDateTime, cn } from '../lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NoteView() {
  const { selectedNote, isMobile, goBackToList, notes, loadFromFile, loadFromUrl, loading } = useApp()
  const [urlInput, setUrlInput] = useState('')
  const [urlError, setUrlError] = useState('')

  const handleUploadClick = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        loadFromFile(file)
      }
    }
    input.click()
  }

  const handleUrlSubmit = async (e) => {
    e.preventDefault()
    setUrlError('')

    const url = urlInput.trim()
    if (!url) return

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      setUrlError('Please enter a valid URL')
      return
    }

    // Check if URL looks like it could be JSON
    if (!url.includes('.json') && !url.includes('github') && !url.includes('pastebin')) {
      setUrlError('URL should point to a JSON file or supported service')
      return
    }

    try {
      await loadFromUrl(url)
      setUrlInput('')
    } catch (err) {
      setUrlError(err.message || 'Failed to load from URL')
    }
  }

  if (!selectedNote) {
    return (
      <div className="flex-1 h-full bg-background flex items-center justify-center overflow-x-hidden">
        <div className="text-center px-8 max-w-md">
          {notes.length === 0 ? (
            <>
              <h2 className="text-2xl font-medium text-foreground mb-2">Welcome</h2>
              <p className="text-muted-foreground mb-8">Import your notes to get started</p>

              <div className="space-y-4">
                <Button
                  onClick={handleUploadClick}
                  className="w-full"
                  size="lg"
                >
                  Upload JSON File
                </Button>

              <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-background px-3 text-muted-foreground">or</span>
                  </div>
                </div>

                <form onSubmit={handleUrlSubmit} className="space-y-3">
                  <div>
                    <Input
                      type="url"
                      placeholder="Enter JSON URL..."
                      value={urlInput}
                      onChange={(e) => {
                        setUrlInput(e.target.value)
                        setUrlError('')
                      }}
                      className={cn(
                        "h-11",
                        urlError && "border-destructive"
                      )}
                      disabled={loading}
                    />
                    {urlError && (
                      <p className="text-destructive text-sm mt-2">{urlError}</p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    disabled={!urlInput.trim() || loading}
                    className="w-full"
                    size="lg"
                  >
                    {loading ? 'Loading...' : 'Load from URL'}
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-medium text-foreground mb-2">Select a Note</h2>
              <p className="text-muted-foreground mb-6">Choose a note from the list to view its content</p>
              {/* Mobile helper to open the sidebar when hidden */}
              <Button
                variant="default"
                className="md:hidden"
                onClick={goBackToList}
              >
                Open Notes List
              </Button>
            </>
          )}
        </div>
      </div>
    )
  }

  const { date, time } = formatDateTime(selectedNote.timestamp)
  return (
  <div className="flex-1 h-full bg-background flex flex-col overflow-x-hidden">
      {/* Header */}
    <div className="px-6 py-5 border-b border-border min-w-0 sticky top-0 bg-background/80 backdrop-blur z-10">
        {isMobile && (
          <Button
            variant="ghost"
            onClick={goBackToList}
          className="mb-6 text-primary font-medium p-0 h-auto"
          >
            Back
          </Button>
        )}

        {/* DateTime at the top */}
        <div className="text-sm text-muted-foreground mb-3">
          {date} • {time}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-medium text-foreground leading-tight break-words break-all">
          {selectedNote.title}
        </h1>
      </div>

      {/* Content (for future use when body is available) */}
      <div className="flex-1 px-6 py-6 overflow-y-auto min-w-0">
        {/* Body content would go here if available */}
      </div>
    </div>
  )
}