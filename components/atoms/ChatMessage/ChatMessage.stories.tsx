import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
  title: 'Atoms/ChatMessage',
  component: ChatMessage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A chat message component for displaying AI, user, or system messages with optional timestamps.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      description: 'Content of the message',
    },
    type: {
      control: 'select',
      options: ['ai', 'user', 'system'],
      description: 'Type of message sender',
    },
    showTimestamp: {
      control: 'boolean',
      description: 'Whether to show message timestamp',
    },
    timestamp: {
      control: 'date',
      description: 'Message timestamp',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AIMessage: Story = {
  args: {
    content: "Hey Alex! I've filled in Rachel's achievements for you. Rachel's information is based on her feedback, 1:1 notes, goals progress. You can find the sources below.",
    type: 'ai',
    showTimestamp: false,
  },
};

export const UserMessage: Story = {
  args: {
    content: "Can you help me review Rachel's performance for this quarter?",
    type: 'user',
    showTimestamp: false,
  },
};

export const SystemMessage: Story = {
  args: {
    content: "Performance review session started",
    type: 'system',
    showTimestamp: false,
  },
};

export const WithTimestamp: Story = {
  args: {
    content: "Hey Alex! I've filled in Rachel's achievements for you. Rachel's information is based on her feedback, 1:1 notes, goals progress. You can find the sources below.",
    type: 'ai',
    showTimestamp: true,
    timestamp: new Date(),
  },
};

export const LongMessage: Story = {
  args: {
    content: `What: Rachel successfully delivered on her AAA goals, including leading the front-end side of the API migration 1, contributing to the shared UI library rollout 2, and onboarding two junior developers. She consistently met project deadlines and closed over 150 tickets across new features and bug fixes during the year 3.

How: She demonstrated strong collaboration by pairing with backend engineers during critical deadlines, mentoring juniors on React best practices.

Impact: Her contributions unblocked the API migration project in Q2, reducing release bottlenecks and improving cross-team delivery speed by 15%. The shared UI library she supported accelerated design consistency and improved team efficiency.`,
    type: 'ai',
    showTimestamp: true,
    timestamp: new Date(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Long message with multiple paragraphs and formatting.',
      },
    },
  },
};

export const ConversationExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ChatMessage
        content="Hi! Can you help me with Rachel's performance review?"
        type="user"
        showTimestamp={true}
        timestamp={new Date(Date.now() - 300000)} // 5 minutes ago
      />
      <ChatMessage
        content="Of course! I'd be happy to help you with Rachel's performance review. Let me gather her recent achievements and feedback."
        type="ai"
        showTimestamp={true}
        timestamp={new Date(Date.now() - 240000)} // 4 minutes ago
      />
      <ChatMessage
        content="Hey Alex! I've filled in Rachel's achievements for you. Rachel's information is based on her feedback, 1:1 notes, goals progress."
        type="ai"
        showTimestamp={true}
        timestamp={new Date(Date.now() - 60000)} // 1 minute ago
      />
      <ChatMessage
        content="Performance review data loaded from 3 sources"
        type="system"
        showTimestamp={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example conversation showing multiple message types in sequence.',
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <ChatMessage
        content="This is an AI message with helpful information and suggestions."
        type="ai"
      />
      <ChatMessage
        content="This is a user message asking a question."
        type="user"
      />
      <ChatMessage
        content="This is a system notification."
        type="system"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All message types displayed together for comparison.',
      },
    },
  },
};
