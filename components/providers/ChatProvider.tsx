'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { ChatSidebar, ChatMessageData, createChatMessage } from '@/components/organisms/ChatSidebar/ChatSidebar';
import { Source } from '@/components/molecules/SourcesList/SourcesList';

interface ChatContextType {
  isOpen: boolean;
  messages: ChatMessageData[];
  isTyping: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  sendMessage: (message: string) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

// Sample initial messages
const initialMessages: ChatMessageData[] = [
  createChatMessage(
    '1',
    'Hello! I\'m Sony AI Assistant. I can help you with performance reviews, team management, feedback, and more. How can I assist you today?',
    'ai',
    new Date(Date.now() - 30000)
  ),
];

// Sample sources for demonstration
const sampleSources: Source[] = [
  {
    id: '1',
    name: 'Performance Review Guidelines',
    url: '/docs/performance-reviews',
    type: 'goals',
    active: true,
  },
  {
    id: '2',
    name: 'Team Management Tips',
    url: '/docs/team-management',
    type: 'feedback',
    active: true,
  },
];

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageData[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sendMessage = useCallback((message: string) => {
    // Add user message
    const userMessage = createChatMessage(
      `user-${Date.now()}`,
      message,
      'user',
      new Date()
    );
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you're looking for help with that. Let me provide you with some guidance...",
        "Based on your question, I can help you with several approaches to handle this situation.",
        "That's a great question! Here are some best practices I'd recommend...",
        "I see what you're asking about. This is a common challenge, and here's how I suggest approaching it...",
        "Thanks for reaching out! I have some insights that might be helpful for your situation.",
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = createChatMessage(
        `ai-${Date.now()}`,
        randomResponse,
        'ai',
        new Date()
      );
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000); // Random delay between 1.5-3.5 seconds
  }, []);

  const clearChat = useCallback(() => {
    setMessages(initialMessages);
  }, []);

  const handleSourceClick = useCallback((source: Source) => {
    console.log('Source clicked:', source);
    // In a real implementation, this would navigate to the source
  }, []);

  const contextValue: ChatContextType = {
    isOpen,
    messages,
    isTyping,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearChat,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {children}
      <ChatSidebar
        title="Sony AI Assistant"
        messages={messages}
        sources={sampleSources}
        isOpen={isOpen}
        onClose={closeChat}
        onSourceClick={handleSourceClick}
        onSendMessage={sendMessage}
        enableVoiceInput={true}
        isTyping={isTyping}
      />
    </ChatContext.Provider>
  );
};
