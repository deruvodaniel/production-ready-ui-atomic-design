import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { SourcesList, createSource, performanceReviewSources } from './SourcesList';

const meta: Meta<typeof SourcesList> = {
  title: 'Molecules/SourcesList',
  component: SourcesList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A component for displaying a list of information sources with optional click interactions. Used in chat interfaces to show data sources.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title for the sources section',
    },
    showCount: {
      control: 'boolean',
      description: 'Whether to show the count of sources in the title',
    },
    onSourceClick: {
      action: 'sourceClicked',
      description: 'Callback when a source is clicked',
    },
  },
  args: {
    onSourceClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PerformanceReview: Story = {
  args: {
    sources: performanceReviewSources,
    title: 'Sources',
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Performance review sources as shown in the Figma design. Includes Goals, Team Feedback, and Manager Notes.',
      },
    },
  },
};

export const WithoutCount: Story = {
  args: {
    sources: performanceReviewSources,
    title: 'Information Sources',
    showCount: false,
  },
};

export const CustomSources: Story = {
  args: {
    sources: [
      createSource('documents', 'Project Documents', 'default', true),
      createSource('meetings', 'Meeting Notes', 'notes', true),
      createSource('code-reviews', 'Code Reviews', 'feedback', true),
      createSource('metrics', 'Performance Metrics', 'goals', true),
    ],
    title: 'Data Sources',
    showCount: true,
  },
};

export const MixedStates: Story = {
  args: {
    sources: [
      createSource('active-1', 'Active Source 1', 'goals', true),
      createSource('active-2', 'Active Source 2', 'feedback', true),
      createSource('inactive-1', 'Inactive Source', 'notes', false),
      createSource('active-3', 'Active Source 3', 'default', true),
    ],
    title: 'Mixed Sources',
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sources with mixed active/inactive states. Inactive sources are dimmed and not clickable.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    sources: [],
    title: 'Sources',
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no sources are available.',
      },
    },
  },
};

export const SingleSource: Story = {
  args: {
    sources: [createSource('single', 'Single Source', 'goals', true)],
    title: 'Source',
    showCount: true,
  },
};

export const LongSourceNames: Story = {
  args: {
    sources: [
      createSource('long-1', 'Very Long Source Name That Might Wrap', 'goals', true),
      createSource('long-2', 'Another Extremely Long Source Name', 'feedback', true),
      createSource('short', 'Short', 'notes', true),
    ],
    title: 'Sources',
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sources with varying name lengths to test text wrapping.',
      },
    },
  },
};

export const AllTypes: Story = {
  args: {
    sources: [
      createSource('goals-source', 'Goals Data', 'goals', true),
      createSource('feedback-source', 'Feedback Collection', 'feedback', true),
      createSource('notes-source', 'Meeting Notes', 'notes', true),
      createSource('default-source', 'General Information', 'default', true),
    ],
    title: 'All Source Types',
    showCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All available source types with their respective styling.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const handleSourceClick = (source: any) => {
      alert(`Clicked source: ${source.name} (${source.type})`);
    };

    return (
      <div className="space-y-6">
        <SourcesList
          sources={performanceReviewSources}
          title="Performance Review Sources"
          showCount={true}
          onSourceClick={handleSourceClick}
        />

        <div className="p-4 bg-gray-100 rounded-lg">
          <p className="text-sm text-gray-600">
            Click on any source above to see the interaction. Active sources will trigger the
            callback.
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing click behavior. Click on sources to see alerts.',
      },
    },
  },
};

export const InChatContext: Story = {
  render: () => (
    <div className="max-w-md bg-gray-50 p-6 rounded-lg">
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          Hey Alex! I've filled in Rachel's achievements for you. Rachel's information is based on
          her feedback, 1:1 notes, goals progress. You can find the sources below.
        </p>
      </div>

      <SourcesList
        sources={performanceReviewSources}
        title="Sources"
        showCount={true}
        onSourceClick={fn()}
      />

      <div className="mt-4">
        <p className="text-sm text-gray-700">
          Would you like to review her performance summary, or should I make some tweaks?
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'SourcesList component in the context of a chat message, matching the Figma design.',
      },
    },
  },
};
