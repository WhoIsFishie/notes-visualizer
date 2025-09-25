import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(timestamp) {
  // Parse the date and time from the timestamp object
  const [day, month, year] = timestamp.date.split('/')
  const [time] = timestamp.time.split('(')

  // Create date object (assuming UTC)
  const utcDate = new Date(`${year}-${month}-${day}T${time}Z`)

  // Convert to Maldivian time (GMT+5)
  const maldivianDate = new Date(utcDate.getTime() + (5 * 60 * 60 * 1000))

  return {
    date: maldivianDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }),
    time: maldivianDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }),
    fullDate: maldivianDate,
    monthYear: maldivianDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    }),
    dayOnly: maldivianDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }
}

export async function fetchGenericJsonData(jsonUrl) {
  try {
    const response = await fetch(jsonUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json, text/plain, */*',
      },
      mode: 'cors'
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('JSON file not found')
      } else if (response.status === 403) {
        throw new Error('Access denied')
      } else {
        throw new Error(`Failed to fetch (${response.status})`)
      }
    }

    const text = await response.text()

    if (!text || text.trim().length === 0) {
      throw new Error('Empty file')
    }

    try {
      return JSON.parse(text)
    } catch (parseError) {
      throw new Error('Invalid JSON format')
    }
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('CORS')) {
      throw new Error('CORS error - the server doesn\'t allow cross-origin requests')
    }
    throw error
  }
}

export function parseNotes(jsonData) {
  if (!Array.isArray(jsonData)) {
    throw new Error('Invalid data format')
  }

  // Sort notes by timestamp (newest first)
  return jsonData.sort((a, b) => {
    const dateA = formatDateTime(a.timestamp).fullDate
    const dateB = formatDateTime(b.timestamp).fullDate
    return dateB - dateA
  })
}

export function groupNotesByMonth(notes) {
  const groups = {}

  notes.forEach(note => {
    const { monthYear } = formatDateTime(note.timestamp)
    if (!groups[monthYear]) {
      groups[monthYear] = []
    }
    groups[monthYear].push(note)
  })

  return groups
}