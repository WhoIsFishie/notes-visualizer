import { useMemo } from 'react'
import { Search, Sun, Moon } from 'lucide-react'
import { useApp } from '../contexts/useApp'
import { formatDateTime, groupNotesByMonth, cn } from '../lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function NotesList() {
  const { notes, selectedNote, searchTerm, setSearchTerm, selectNote, toggleTheme } = useApp()

  const filteredNotes = useMemo(() => {
    if (!searchTerm) return notes

    const term = searchTerm.toLowerCase()
    return notes.filter(note =>
      note.title.toLowerCase().includes(term)
    )
  }, [notes, searchTerm])

  const groupedNotes = useMemo(() => {
    return groupNotesByMonth(filteredNotes)
  }, [filteredNotes])

  return (
    <div className="w-full md:w-80 h-full bg-background/60 backdrop-blur border-r border-border flex flex-col overflow-x-hidden">
      {/* Header */}
      <div className="px-4 py-5 border-b border-border sticky top-0 bg-background/80 backdrop-blur z-10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-foreground">Notes</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-8 w-8"
          >
            <Sun className="h-4 w-4 text-foreground hidden dark:block" />
            <Moon className="h-4 w-4 block dark:hidden" />
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {Object.entries(groupedNotes).length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {searchTerm ? 'No notes found' : 'No notes yet'}
          </div>
        ) : (
          Object.entries(groupedNotes).map(([monthYear, monthNotes]) => (
            <div key={monthYear} className="space-y-2">
              {/* Month Header */}
              <h2 className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1">
                {monthYear}
              </h2>

              {/* Notes Cards */}
                  <div className="space-y-1">
                {monthNotes.map((note) => {
                  const isSelected = selectedNote?.id === note.id
                  const { dayOnly, time } = formatDateTime(note.timestamp)

                  return (
                    <Card
                      key={note.id}
                      className={cn(
                        "p-3.5 cursor-pointer transition-colors hover:bg-accent/50 border-0 bg-card",
                        isSelected && "bg-accent"
                      )}
                      onClick={() => selectNote(note)}
                    >
                          <div className="flex justify-between items-start gap-3 min-w-0">
                            <h3 className="text-sm font-medium text-card-foreground truncate flex-1 break-words">
                          {note.title}
                        </h3>
                        <div className="text-right text-[10px] text-muted-foreground flex-shrink-0 leading-tight whitespace-nowrap">
                          <div>{dayOnly}</div>
                          <div>{time}</div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}