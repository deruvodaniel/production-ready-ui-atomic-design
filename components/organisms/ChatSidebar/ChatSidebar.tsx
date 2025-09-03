'use client';

import React, { useState } from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { ChatMessage } from '@/components/atoms/ChatMessage/ChatMessage';
import { SourcesList, Source } from '@/components/molecules/SourcesList/SourcesList';
import { X, Mic, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChatMessageData {
  /** Unique message ID */
  id: string;
  /** Message content */
  content: string;
  /** Message type */
  type: 'ai' | 'user' | 'system';
  /** Message timestamp */
  timestamp: Date;
}

export interface ChatSidebarProps {
  /** Chat title/assistant name */
  title?: string;
  /** Array of chat messages */
  messages: ChatMessageData[];
  /** Array of information sources */
  sources?: Source[];
  /** Whether the sidebar is open/visible */
  isOpen?: boolean;
  /** Callback to close the sidebar */
  onClose?: () => void;
  /** Callback when a source is clicked */
  onSourceClick?: (source: Source) => void;
  /** Callback to send a message */
  onSendMessage?: (message: string) => void;
  /** Whether voice input is enabled */
  enableVoiceInput?: boolean;
  /** Whether the assistant is typing */
  isTyping?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  title = 'Sony AI',
  messages,
  sources = [],
  isOpen = true,
  onClose,
  onSourceClick,
  onSendMessage,
  enableVoiceInput = true,
  isTyping = false,
  className,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);

  const sidebarClasses = cn(
    'chat-sidebar',
    'fixed right-0 top-0 h-full w-full sm:w-[500px] bg-[#EFEEFF] shadow-xl',
    'flex flex-col z-50',
    'transform transition-transform duration-300 ease-in-out',
    {
      'translate-x-0': isOpen,
      'translate-x-full': !isOpen,
    },
    className
  );

  const handleSendMessage = () => {
    if (inputValue.trim() && onSendMessage) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Here you would integrate with Web Speech API or similar
  };

  return (
    <div className={sidebarClasses}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <Typography variant="h5" weight="bold" className="text-neutral-900">
          {title}
        </Typography>
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(message => (
          <ChatMessage
            key={message.id}
            content={message.content}
            type={message.type}
            timestamp={message.timestamp}
            showTimestamp={false}
          />
        ))}

        {/* Sources Section */}
        {sources.length > 0 && (
          <SourcesList
            sources={sources}
            title="Sources"
            showCount={true}
            onSourceClick={onSourceClick}
          />
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              />
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              />
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              />
            </div>
            <Typography variant="caption" color="muted">
              {title} is typing...
            </Typography>
          </div>
        )}
      </div>

      {/* Input Section */}
      {onSendMessage && (
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-4">
            {/* Voice Input */}
            {enableVoiceInput && (
              <div className="flex items-center">
                <div
                  className={cn(
                    'w-14 h-14 rounded-full border-2 border-black bg-white',
                    'flex items-center justify-center cursor-pointer',
                    'hover:bg-gray-50 transition-colors',
                    'shadow-[3px_3px_0_0_#000]',
                    {
                      'bg-red-100 border-red-500': isListening,
                    }
                  )}
                  onClick={toggleVoiceInput}
                >
                  <Mic
                    className={cn('w-6 h-6', {
                      'text-red-500': isListening,
                      'text-black': !isListening,
                    })}
                  />
                </div>
              </div>
            )}

            {/* Text Input */}
            <div className="flex-1 relative">
              <div
                className={cn(
                  'w-full h-12 rounded-full border border-black bg-white',
                  'shadow-[3px_3px_0_0_#000]',
                  'flex items-center px-6',
                  'focus-within:ring-2 focus-within:ring-blue-500'
                )}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 text-lg bg-transparent border-none outline-none text-black placeholder-gray-500"
                  aria-label="Chat message input"
                />
                {inputValue && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSendMessage}
                    className="p-2 hover:bg-gray-100 rounded-full ml-2"
                    aria-label="Send message"
                  >
                    <ArrowUp className="w-5 h-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to create chat message data
export const createChatMessage = (
  id: string,
  content: string,
  type: 'ai' | 'user' | 'system' = 'ai',
  timestamp: Date = new Date()
): ChatMessageData => ({
  id,
  content,
  type,
  timestamp,
});
