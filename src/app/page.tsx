import { ChatInterface } from '../components/chat-interface';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 bg-secondary/50">
      <ChatInterface />
    </main>
  );
}
