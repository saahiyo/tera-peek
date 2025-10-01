# TeraPeek

A modern web application for inspecting, previewing, and downloading Terabox/Terashare videos. Extract metadata, view thumbnails, and get direct download links with a clean, responsive interface.

![TeraPeek](https://img.shields.io/badge/Next.js-15-black) ![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-orange)

<img width="1200" height="675" alt="tera-peek og-img" src="https://github.com/user-attachments/assets/d12cac3a-d8b3-4751-b583-957f650f91ba" />

## ✨ Features

- **🔍 Smart ID Extraction**: Automatically extracts video IDs from Terabox/Terashare links
- **📊 Metadata Display**: Shows file name, size, thumbnail, and complete JSON response
- **🎬 Video Preview**: Built-in video player with thumbnail support
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **🌙 Dark Mode**: Automatic dark/light theme support
- **⚡ Fast & Lightweight**: Built with Next.js 15 and React 19
- **🎨 Modern UI**: Smooth animations with Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/tera-peek.git
cd tera-peek
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📖 Usage

1. **Enter Video ID or Link**: Paste a full Terabox/Terashare share link or just the video ID
2. **Click Inspect**: The app will automatically extract the ID and fetch metadata
3. **View Results**: See thumbnail, metadata, and preview the video
4. **Download**: Use the download button to save the video directly

### Supported URL Formats

- `https://terabox.com/s/VIDEO_ID`
- `https://terasharelink.com/s/VIDEO_ID`
- `https://teraboxcdn.com/s/VIDEO_ID`
- `https://1024tera.com/s/VIDEO_ID`
- And other Terabox/Terashare domains

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - The React Framework for Production
- **Language**: [TypeScript](https://www.typescriptlang.org/) - JavaScript with syntax for types
- **UI Library**: [React 19](https://reactjs.org/) - A JavaScript library for building user interfaces
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Font**: [Geist](https://vercel.com/font) - Vercel's font family

## 📁 Project Structure

```
tera-peek/
├── src/
│   └── app/
│       ├── globals.css          # Global styles
│       ├── layout.js            # Root layout component
│       └── page.jsx             # Main application component
├── public/                      # Static assets
├── next.config.mjs             # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🔧 Configuration

### Environment Variables

This project uses a public worker API. For production use, consider setting up your own proxy:

```bash
# Create a .env.local file
NEXT_PUBLIC_API_URL=https://your-api-worker.workers.dev
```

### Customization

- **API Endpoint**: Modify the `apiUrl` in [`src/app/page.jsx:48`](src/app/page.jsx:48) to use your own proxy
- **Styling**: Customize colors and themes in [`src/app/globals.css`](src/app/globals.css)
- **Branding**: Update the app name and logo in [`src/app/page.jsx`](src/app/page.jsx)

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Other Deployment Options

- **Netlify**: Works with Next.js static export
- **Railway**: Deploy with one click
- **DigitalOcean**: Use App Platform
- **AWS**: Use Amplify or S3 + CloudFront

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

- This tool uses a public worker API for demonstration purposes
- Avoid pasting sensitive or private Terabox links
- For production use, set up your own proxy with proper authentication and rate limiting
- The availability and reliability of the public API may vary

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for hosting and font support
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for beautiful icons

---

Made with ❤️ using Next.js and React
