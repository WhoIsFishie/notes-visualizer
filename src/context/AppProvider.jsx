import { useState, useEffect } from 'react'
import { fetchGenericJsonData, parseNotes } from '../lib/utils'
import { AppContext } from './appContext'

export function AppProvider({ children }) {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setShowSidebar(!mobile)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('notes-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      setTheme(systemTheme)
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const jsonUrl = searchParams.get('url') || searchParams.get('json')
    if (jsonUrl) loadFromUrl(jsonUrl)
  }, [])

  const loadFromUrl = async (url) => {
    setLoading(true)
    setError(null)

    try {
      const data = await fetchGenericJsonData(url)
      const parsedNotes = parseNotes(data)
      setNotes(parsedNotes)
      if (window.innerWidth < 768) {
        setShowSidebar(true)
        setSelectedNote(null)
      }
      console.log(`Loaded ${parsedNotes.length} notes from URL`)
    } catch (err) {
      setError(err.message)
      console.error('Error loading notes:', err)
    } finally {
      setLoading(false)
    }
  }

  const loadFromFile = (file) => {
    setLoading(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result)
        const parsedNotes = parseNotes(jsonData)
        setNotes(parsedNotes)
        if (window.innerWidth < 768) {
          setShowSidebar(true)
          setSelectedNote(null)
        }
        console.log(`Loaded ${parsedNotes.length} notes from file`)
      } catch (err) {
        setError('Invalid JSON file')
        console.error('Error parsing file:', err)
      } finally {
        setLoading(false)
      }
    }

    reader.onerror = () => {
      setError('Error reading file')
      setLoading(false)
    }

    reader.readAsText(file)
  }

  const selectNote = (note) => {
    setSelectedNote(note)
    if (isMobile) {
      setShowSidebar(false)
    }
  }

  const goBackToList = () => {
    setSelectedNote(null)
    setShowSidebar(true)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('notes-theme', newTheme)
  }

  const value = {
    notes,
    selectedNote,
    searchTerm,
    loading,
    error,
    isMobile,
    showSidebar,
    theme,
    setSearchTerm,
    loadFromUrl,
    loadFromFile,
    selectNote,
    goBackToList,
    toggleTheme,
    setError,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}


