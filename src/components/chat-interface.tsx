"use client";

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SendHorizontal, Bot, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { cn } from '../lib/utils';
import { generateResponse } from '../ai/flows/generate-response';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call the OpenAI API to generate a response
      const result = await generateResponse({ message: trimmedInput });

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: result.response,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      // Add an error message
      setMessages((prev) => [...prev, {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Sorry, I couldn't process that request. Please try again."
      }]);
    } finally {
      setIsLoading(false);
      // Refocus input after sending/receiving
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline on Enter
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-2xl h-[70vh] flex flex-col shadow-xl rounded-lg overflow-hidden">
      <CardHeader className="border-b bg-card">
        <CardTitle className="text-lg font-semibold text-center">NextChat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex items-start gap-3',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-lg p-3 text-sm shadow-sm transition-all duration-300 ease-in-out animate-in fade-in',
                     message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  )}
                >
                  {/* Basic markdown link support - find URLs and make them clickable */}
                   {message.content.split(/(\bhttps?:\/\/\S+\b)/g).map((part, index) =>
                    /^\s*https?:\/\//.test(part) ? (
                      <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500 hover:text-blue-700 break-words"
                      >
                        {part}
                      </a>
                    ) : (
                      <span key={index} className="break-words whitespace-pre-wrap">{part}</span>
                    )
                  )}
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback><User size={18} /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 justify-start">
                 <Avatar className="h-8 w-8 border">
                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                  </Avatar>
                 <div className="bg-muted rounded-lg p-3 shadow-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                 </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t bg-card">
        <div className="flex w-full items-center space-x-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            className="flex-1 rounded-lg focus-visible:ring-primary" // Teal ring on focus
          />
          <Button
            type="button"
            size="icon"
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors duration-200" // Teal button
          >
            <SendHorizontal className="h-5 w-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
