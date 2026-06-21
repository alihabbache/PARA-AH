# PARA App 📋

A modern, open-source productivity application implementing the **PARA Method** for organizing your digital life. Built specifically for Product Managers and anyone who wants to stay organized.

![PARA App](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18.2-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178c6.svg)

## 🎯 What is PARA?

PARA is a productivity system created by Tiago Forte that organizes information into four categories:

- **Projects** - Short-term efforts with specific goals and deadlines
- **Areas** - Long-term responsibilities you want to maintain
- **Resources** - Topics or interests that may be useful in the future
- **Archives** - Inactive items from the other three categories

## ✨ Features

### Current Features (MVP)
- ✅ **Four PARA Categories** - Organize items into Projects, Areas, Resources, and Archives
- ✅ **Modern UI** - Clean, intuitive interface built with React and Tailwind CSS
- ✅ **Multiple View Modes** - Grid, List, and Kanban views
- ✅ **Search & Filter** - Quickly find what you need
- ✅ **Local Storage** - Your data persists automatically in your browser
- ✅ **Export/Import** - Backup and restore your data as JSON
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile
- ✅ **Dark Mode Support** - Easy on the eyes

### Coming Soon
- 🔄 Quick Capture modal for rapid item creation
- 🔄 Project progress tracking with milestones
- 🔄 Tags and advanced filtering
- 🔄 Drag-and-drop organization
- 🔄 Cloud sync (optional)
- 🔄 Collaboration features
- 🔄 Integration with popular tools (Jira, Notion, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- A modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/para-app.git
   cd para-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy to any static hosting service.

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: LocalStorage with Zustand persist middleware

## 📁 Project Structure

```
para-app/
├── src/
│   ├── components/       # React components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── MainContent.tsx
│   ├── store/           # Zustand store
│   │   └── useParaStore.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Helper functions
│   │   └── helpers.ts
│   ├── hooks/           # Custom React hooks
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎨 Usage

### Adding Items

1. Click the "Quick Add" button in the sidebar
2. Fill in the item details
3. Choose the appropriate PARA category
4. Add tags for better organization

### Organizing Items

- **Switch Categories**: Click on Projects, Areas, Resources, or Archives in the sidebar
- **Change Views**: Use the view mode buttons (Grid/List/Kanban) in the top right
- **Search**: Use the search bar in the header to find items quickly
- **Filter**: Apply filters by tags, priority, or status

### Exporting & Importing

- **Export**: Click the download icon in the header to save your data as JSON
- **Import**: Click the upload icon and select a previously exported JSON file

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, readable TypeScript code
- Follow the existing code style
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tiago Forte](https://fortelabs.com/) for creating the PARA Method
- The React and TypeScript communities
- All contributors who help improve this project

## 📧 Contact

- **Project Maintainer**: Your Name
- **Email**: your.email@example.com
- **GitHub**: [@yourusername](https://github.com/yourusername)

## 🗺️ Roadmap

### Version 1.1 (Next Release)
- [ ] Quick Capture modal
- [ ] Enhanced project cards with progress bars
- [ ] Milestone tracking
- [ ] Advanced filtering options

### Version 1.2
- [ ] Drag-and-drop functionality
- [ ] Keyboard shortcuts
- [ ] Custom themes
- [ ] PWA support for offline use

### Version 2.0
- [ ] Cloud sync (optional)
- [ ] Team collaboration
- [ ] API integrations
- [ ] Mobile apps (iOS/Android)

## 💡 Tips for Product Managers

This app is designed with Product Managers in mind:

- **Projects**: Track your active product initiatives with deadlines
- **Areas**: Maintain ongoing responsibilities (stakeholder management, metrics, etc.)
- **Resources**: Store useful articles, templates, and research
- **Archives**: Keep completed projects for reference

---

**Made with ❤️ for the productivity community**

⭐ Star this repo if you find it useful!
