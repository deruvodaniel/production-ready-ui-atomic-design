import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ChatSidebar, createChatMessage } from './ChatSidebar';
import { performanceReviewSources } from '@/components/molecules/SourcesList/SourcesList';

const meta: Meta<typeof ChatSidebar> = {
  title: 'Organisms/ChatSidebar',
  component: ChatSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A sidebar chat interface with AI assistant, voice input, and information sources. Perfect for performance reviews and guided workflows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Chat title/assistant name',
    },
    isOpen: {
      control: 'boolean',
      description: 'Whether the sidebar is open/visible',
    },
    enableVoiceInput: {
      control: 'boolean',
      description: 'Whether voice input is enabled',
    },
    isTyping: {
      control: 'boolean',
      description: 'Whether the assistant is typing',
    },
    onClose: {
      action: 'closed',
      description: 'Callback to close the sidebar',
    },
    onSourceClick: {
      action: 'sourceClicked',
      description: 'Callback when a source is clicked',
    },
    onSendMessage: {
      action: 'messageSent',
      description: 'Callback to send a message',
    },
  },
  args: {
    onClose: fn(),
    onSourceClick: fn(),
    onSendMessage: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const performanceReviewMessages = [
  createChatMessage(
    '1',
    "Hey Alex! I've filled in Rachel's achievements for you. Rachel's information is based on her feedback, 1:1 notes, goals progress. You can find the sources below.",
    'ai',
    new Date(Date.now() - 300000)
  ),
  createChatMessage(
    '2',
    "What: Rachel successfully delivered on her AAA goals, including leading the front-end side of the API migration 1, contributing to the shared UI library rollout 2, and onboarding two junior developers. She consistently met project deadlines and closed over 150 tickets across new features and bug fixes during the year 3.",
    'ai',
    new Date(Date.now() - 240000)
  ),
  createChatMessage(
    '3',
    "How: She demonstrated strong collaboration by pairing with backend engineers during critical deadlines, mentoring juniors on React best practices",
    'ai',
    new Date(Date.now() - 180000)
  ),
  createChatMessage(
    '4',
    "Impact: Her contributions unblocked the API migration project in Q2, reducing release bottlenecks and improving cross-team delivery speed by 15%. The shared UI library she supported accelerated design consistency and improved team efficiency.",
    'ai',
    new Date(Date.now() - 120000)
  ),
  createChatMessage(
    '5',
    "Would you like to review her performance summary, or should I make some tweaks?",
    'ai',
    new Date(Date.now() - 60000)
  ),
];

export const PerformanceReview: Story = {
  args: {
    title: 'Sony AI',
    messages: performanceReviewMessages,
    sources: performanceReviewSources,
    isOpen: true,
    enableVoiceInput: true,
    isTyping: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Performance review chat interface as shown in the Figma design. Includes AI messages with sources.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    title: 'Sony AI',
    messages: performanceReviewMessages,
    sources: performanceReviewSources,
    isOpen: false,
    enableVoiceInput: true,
    isTyping: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chat sidebar in closed state. Slides out of view.',
      },
    },
  },
};

export const Typing: Story = {
  args: {
    title: 'Sony AI',
    messages: performanceReviewMessages.slice(0, 3),
    sources: performanceReviewSources,
    isOpen: true,
    enableVoiceInput: true,
    isTyping: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chat sidebar showing typing indicator when AI is responding.',
      },
    },
  },
};

export const WithConversation: Story = {
  args: {
    title: 'Sony AI',
    messages: [
      createChatMessage('1', 'Hi! Can you help me with Rachel\'s performance review?', 'user'),
      createChatMessage('2', 'Of course! I\'d be happy to help you with Rachel\'s performance review. Let me gather her recent achievements and feedback.', 'ai'),
      createChatMessage('3', 'Performance review data loaded from 3 sources', 'system'),
      ...performanceReviewMessages,
    ],
    sources: performanceReviewSources,
    isOpen: true,
    enableVoiceInput: true,
    isTyping: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Full conversation flow including user messages and system notifications.',
      },
    },
  },
};

export const NoVoiceInput: Story = {
  args: {
    title: 'Sony AI',
    messages: performanceReviewMessages,
    sources: performanceReviewSources,
    isOpen: true,
    enableVoiceInput: false,
    isTyping: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chat sidebar without voice input functionality.',
      },
    },
  },
};

export const NoSources: Story = {
  args: {
    title: 'Sony AI',
    messages: [
      createChatMessage('1', 'Hello! How can I help you today?', 'ai'),
      createChatMessage('2', 'I\'m ready to assist with your performance review process.', 'ai'),
    ],
    sources: [],
    isOpen: true,
    enableVoiceInput: true,
    isTyping: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Chat sidebar without information sources.',
      },
    },
  },
};

export const ReadOnlyMode: Story = {
  args: {
    title: 'Sony AI',
    messages: performanceReviewMessages,
    sources: performanceReviewSources,
    isOpen: true,
    enableVoiceInput: false,
    isTyping: false,
    onSendMessage: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only chat sidebar without input capabilities.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState(performanceReviewMessages);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = (message: string) => {
      // Add user message
      const userMessage = createChatMessage(
        Date.now().toString(),
        message,
        'user'
      );
      setMessages(prev => [...prev, userMessage]);

      // Simulate AI typing
      setIsTyping(true);
      setTimeout(() => {
        const aiMessage = createChatMessage(
          (Date.now() + 1).toString(),
          `Thanks for your message: "${message}". I'm here to help with the performance review process.`,
          'ai'
        );
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 2000);
    };

    const handleSourceClick = (source: any) => {
      alert(`Clicked source: ${source.name}`);
    };

    return (
      <div className="relative h-screen bg-gray-100">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">Interactive Chat Sidebar</h2>
          <p className="text-gray-600 mb-4">
            Try sending a message or clicking on sources. The sidebar can be opened/closed.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? 'Close' : 'Open'} Chat
          </button>
        </div>

        <ChatSidebar
          title="Sony AI"
          messages={messages}
          sources={performanceReviewSources}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSourceClick={handleSourceClick}
          onSendMessage={handleSendMessage}
          enableVoiceInput={true}
          isTyping={isTyping}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive chat sidebar with message sending and state management.',
      },
    },
  },
};

export const MobileResponsive: Story = {
  args: {
    title: 'Sony AI',
    messages: performanceReviewMessages,
    sources: performanceReviewSources,
    isOpen: true,
    enableVoiceInput: true,
    isTyping: false,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Chat sidebar optimized for mobile devices. Takes full width on smaller screens.',
      },
    },
  },
};
