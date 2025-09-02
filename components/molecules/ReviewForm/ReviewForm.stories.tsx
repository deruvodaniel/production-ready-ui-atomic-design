import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { ReviewForm, createReviewSection, performanceReviewSections } from './ReviewForm';

const meta: Meta<typeof ReviewForm> = {
  title: 'Molecules/ReviewForm',
  component: ReviewForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A form component for performance reviews with expandable sections and action buttons for AI assistance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    readOnly: {
      control: 'boolean',
      description: 'Whether the form is read-only',
    },
    onSectionChange: {
      action: 'sectionChanged',
      description: 'Callback when section content changes',
    },
    onAction: {
      action: 'actionTriggered',
      description: 'Callback for action buttons (Try Again, Elaborate, Shorten)',
    },
  },
  args: {
    onSectionChange: fn(),
    onAction: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PerformanceReview: Story = {
  args: {
    sections: performanceReviewSections,
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Performance review form as shown in the Figma design with What, How, and Impact sections.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    sections: [
      createReviewSection('what', 'What', '', 'Describe what was accomplished...'),
      createReviewSection('how', 'How', '', 'Describe how it was accomplished...'),
      createReviewSection('impact', 'Impact', '', 'Describe the impact and results...'),
    ],
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty form ready for user input.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    sections: performanceReviewSections,
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only version of the form without action buttons.',
      },
    },
  },
};

export const CustomSections: Story = {
  args: {
    sections: [
      createReviewSection(
        'goals',
        'Goals Achievement',
        'Successfully completed all quarterly goals including project delivery and team mentoring.',
        'Describe goal achievement...'
      ),
      createReviewSection(
        'challenges',
        'Challenges Faced',
        'Overcame technical challenges related to API integration and team coordination.',
        'Describe challenges and how they were handled...'
      ),
      createReviewSection(
        'growth',
        'Professional Growth',
        'Developed leadership skills and expanded technical knowledge in cloud technologies.',
        'Describe professional development...'
      ),
    ],
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom review sections for different evaluation criteria.',
      },
    },
  },
};

export const SingleSection: Story = {
  args: {
    sections: [
      createReviewSection(
        'feedback',
        'Overall Feedback',
        'This employee has shown exceptional performance throughout the review period.',
        'Provide your overall feedback...'
      ),
    ],
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Single section form for simple feedback.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [sections, setSections] = useState(performanceReviewSections);

    const handleSectionChange = (sectionId: string, content: string) => {
      setSections(prev =>
        prev.map(section => (section.id === sectionId ? { ...section, content } : section))
      );
    };

    const handleAction = (sectionId: string, action: 'tryAgain' | 'elaborate' | 'shorten') => {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      let newContent = section.content;

      switch (action) {
        case 'tryAgain':
          newContent = `[Regenerated] ${section.content}`;
          break;
        case 'elaborate':
          newContent = `${section.content} Additionally, this demonstrates excellent attention to detail and commitment to quality outcomes.`;
          break;
        case 'shorten':
          newContent = section.content.split('.')[0] + '.';
          break;
      }

      handleSectionChange(sectionId, newContent);
    };

    return (
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Interactive Review Form</h3>
          <p className="text-sm text-gray-600">
            Try editing the content or using the action buttons (Try Again, Elaborate, Shorten) to
            see the AI assistance features.
          </p>
        </div>

        <ReviewForm
          sections={sections}
          onSectionChange={handleSectionChange}
          onAction={handleAction}
          readOnly={false}
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-2">Current Content:</h4>
          <pre className="text-xs text-gray-600 overflow-auto">
            {JSON.stringify(sections, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive form with real-time content updates and AI assistance simulation.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    sections: [
      createReviewSection(
        'detailed',
        'Detailed Analysis',
        `This is a very long section with multiple paragraphs to test how the form handles extensive content.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
        'Enter detailed content...'
      ),
    ],
    readOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with long content to test text area expansion and scrolling behavior.',
      },
    },
  },
};

export const WithoutActions: Story = {
  args: {
    sections: performanceReviewSections,
    readOnly: false,
    onAction: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Form without action buttons, showing only editable text areas.',
      },
    },
  },
};
