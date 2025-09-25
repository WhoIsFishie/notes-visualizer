# Notes Visualizer

A modern, responsive web application for visualizing and browsing JSON-formatted notes. Built with React, Vite, and Tailwind CSS.

## Features

- 📱 **Mobile-first responsive design** - Clean, modern interface optimized for all screen sizes
- 🌙 **Dark mode support** - Auto-detects system preference with manual toggle
- 📤 **File upload** - Load notes data from JSON files
- 🔗 **URL loading** - Load JSON data from any accessible URL
- 📝 **Note browsing** - Browse notes with timestamps and titles
- ⏰ **Maldivian time** - All timestamps converted to GMT+5
- 🚀 **Fast loading** - Built with Vite for optimal performance

## Usage

### Loading Notes Data

1. **File Upload**: Click the "Upload JSON File" button and select a JSON file containing your notes data
2. **URL Loading**: Enter a JSON URL in the input field and click "Load from URL"

### Expected JSON Format

The application expects an array of note objects with the following structure:

```json
[
  {
    "id": 1,
    "title": "My First Note",
    "timestamp": {
      "date": "01/10/2024",
      "time": "10:46:46(UTC+0)"
    }
  },
  {
    "id": 2,
    "title": "Another Note",
    "timestamp": {
      "date": "02/10/2024", 
      "time": "15:30:00(UTC+0)"
    }
  }
]
```

**Required Fields:**
- `id`: Unique identifier for the note
- `title`: The note title/subject
- `timestamp`: Object containing date and time information
  - `date`: Date in DD/MM/YYYY format
  - `time`: Time in HH:MM:SS(UTC+0) format

## Development

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

### Setup

```bash
# Clone the repository
git clone [repository-url]
cd notes-visualizer

# Install dependencies
npm install
# or
pnpm install

# Start development server
npm run dev
# or
pnpm run dev

# Build for production
npm run build
# or
pnpm run build

# Preview production build
npm run preview
# or
pnpm run preview
```

### GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages:

```bash
# Deploy to GitHub Pages
npm run deploy
# or
pnpm run deploy
```

The deployment process:
1. Builds the project
2. Creates a 404.html file for client-side routing
3. Deploys to the `gh-pages` branch
4. Site becomes available at `https://yourusername.github.io/notes-visualizer/`

## Tech Stack

- **React 19** - UI framework with latest features
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Modern utility-first styling
- **Lucide React** - Beautiful icons
- **Radix UI** - Accessible UI components
- **GitHub Pages** - Static hosting

## Project Structure

```
src/
├── components/
│   ├── NotesList.jsx      # Sidebar with notes list
│   ├── NoteView.jsx       # Main content area
│   └── ui/                # Reusable UI components
├── contexts/
│   ├── AppProvider.jsx    # Application state management
│   └── useApp.js          # App context hook
├── lib/
│   └── utils.js           # Utility functions
├── App.jsx                # Main application component
└── main.jsx               # Application entry point
```

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.
