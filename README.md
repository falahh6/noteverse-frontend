# NoteVerse Frontend

NoteVerse is a modern, real-time collaborative note-sharing platform built with Next.js and novel.sh. The platform enables users to create, share, and edit notes collaboratively while engaging through social features like likes, upvotes, and comments.

## 🚀 Features

- **Real-time Collaboration**: Edit notes simultaneously with other users
- **Rich Text Editing**: Powered by TipTap editor for a seamless writing experience
- **Social Engagement**: Like, upvote, and reward valuable notes
- **Comments & Discussions**: Engage in meaningful discussions about notes
- **Personalized Recommendations**: Get note suggestions based on your interests
- **Real-time Updates**: Using Socket.IO for instant notifications and changes
- **Dark Mode Support**: Built-in theme switching capability
- **Responsive Design**: Works seamlessly across all devices

## 📋 Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0
- Node.js >= 18.x

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/noteverse-frontend.git

# Navigate to the project directory
cd noteverse-frontend

# Install dependencies using Bun
bun install
```

## 🚦 Development

```bash
# Start the development server
bun dev

# Build for production
bun run build

# Start production server
bun start
```

## 🔧 Tech Stack

### Core

- **Runtime**: [Bun](https://bun.sh/) - A fast all-in-one JavaScript runtime
- **Framework**: [Next.js 14](https://nextjs.org/) - React framework for production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types

### UI & Styling

- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Component Libraries**:
  - [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
  - [Ant Design](https://ant.design/) - A design system for enterprise-level products
- **Icons**:
  - [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
  - [Tabler Icons](https://tabler-icons.io/) - Free and open source icons
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library

### State & Form Management

- **State Management**: [Nanostores](https://github.com/nanostores/nanostores) - Tiny state manager
- **Form Management**:
  - [React Hook Form](https://react-hook-form.com/) - Performant forms with easy validation
  - [Zod](https://zod.dev/) - TypeScript-first schema validation
  - [Yup](https://github.com/jquense/yup) - Object schema validation

### Features

- **Editor**: [Novel](https://novel.sh/) - Notion-style WYSIWYG editor
- **Real-time**: [Socket.IO](https://socket.io/) - Real-time bidirectional event-based communication
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) - Authentication for Next.js
- **Storage**: [Vercel Blob](https://vercel.com/docs/storage/vercel-blob) - Edge-compatible blob storage

### Development Tools

- **Package Manager**: [Bun](https://bun.sh/) - Fast package manager
- **Linting**: [ESLint](https://eslint.org/) - Pluggable JavaScript linter
- **Code Formatting**: [Prettier](https://prettier.io/) - Opinionated code formatter

## 🔒 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_SOCKET_URL=your_socket_url
NEXT_PUBLIC_UPLOAD_URL=your_upload_url
NEXTAUTH_URL=your_auth_url
NEXTAUTH_SECRET=your_auth_secret
```

## 📝 Scripts

- `bun dev`: Starts development server
- `bun build`: Creates production build
- `bun start`: Starts production server
- `bun typecheck`: Runs TypeScript type checking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Radix UI](https://www.radix-ui.com/) - For accessible components
- [Novel](https://novel.sh/) - For the rich text editor
- [Socket.IO](https://socket.io/) - For real-time functionality

## 🐛 Known Issues

- The application requires Bun as the package manager. Using npm or yarn is not supported.
- Real-time collaboration features might experience slight delays on slower connections.

## 📮 Contact

- Project Link: [https://github.com/your-username/noteverse-frontend](https://github.com/your-username/noteverse-frontend)
- Report Bug: [Issues](https://github.com/your-username/noteverse-frontend/issues)
