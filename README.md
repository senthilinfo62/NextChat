# NextChat

A modern chat application built with Next.js that simulates AI-powered conversations.

![NextChat Screenshot](https://via.placeholder.com/800x450.png?text=NextChat+Screenshot)

## Features

- 🎨 Clean, modern UI with Tailwind CSS
- 💬 Real-time chat interface
- 🤖 Smart mock AI responses based on message keywords
- 📱 Fully responsive design
- 🌙 Light/dark mode support (via system preferences)
- ⚡ Fast and lightweight

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/senthilinfo62/NextChat.git
cd NextChat
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- Type a message in the input field and press Enter or click the send button
- The AI will respond based on keywords in your message
- Try messages containing keywords like "hello", "help", "weather", "thanks", or "bye" for specialized responses

## Project Structure

```
NextChat/
├── docs/               # Documentation files
├── public/             # Static assets
├── src/                # Source code
│   ├── ai/             # AI service implementation
│   │   └── flows/      # AI response generation logic
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   │   └── ui/         # UI components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utility functions
├── .env                # Environment variables
├── .gitignore          # Git ignore file
├── package.json        # Project dependencies
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## Future Enhancements

- Integration with real AI services (OpenAI, Google Gemini, etc.)
- User authentication
- Persistent chat history
- File sharing capabilities
- Voice input/output
- Custom themes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/) - UI component inspiration