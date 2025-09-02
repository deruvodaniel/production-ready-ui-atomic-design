'use client';

import React from 'react';
import { Typography } from '@/components/atoms/Typography/Typography';
import { cn } from '@/lib/utils';

export interface ChatMessageProps {
  /** Message content */
  content: string;
  /** Message type */
  type?: 'ai' | 'user' | 'system';
  /** Timestamp of the message */
  timestamp?: Date;
  /** Whether to show timestamp */
  showTimestamp?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  type = 'ai',
  timestamp,
  showTimestamp = false,
  className,
}) => {
  const messageClasses = cn(
    'chat-message',
    'p-4 rounded-lg',
    {
      'bg-blue-50 border-l-4 border-blue-500': type === 'ai',
      'bg-gray-50 ml-8': type === 'user',
      'bg-yellow-50 text-center text-sm': type === 'system',
    },
    className
  );

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={messageClasses}>
      <Typography variant="body" className="whitespace-pre-wrap leading-relaxed">
        {content}
      </Typography>

      {showTimestamp && timestamp && (
        <Typography variant="caption" color="muted" className="mt-2 block text-right">
          {formatTimestamp(timestamp)}
        </Typography>
      )}
    </div>
  );
};
