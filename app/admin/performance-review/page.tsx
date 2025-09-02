'use client';

import React, { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import {
  StepperSidebar,
  createUserInfo,
} from '@/components/organisms/StepperSidebar/StepperSidebar';
import { ChatSidebar, createChatMessage } from '@/components/organisms/ChatSidebar/ChatSidebar';
import {
  ReviewForm,
  performanceReviewSections,
} from '@/components/molecules/ReviewForm/ReviewForm';
import { performanceReviewSteps } from '@/components/molecules/Stepper/Stepper';
import { performanceReviewSources } from '@/components/molecules/SourcesList/SourcesList';
import { getEmployeeById } from '@/data/employees';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Bot, Bell } from 'lucide-react';
import { Avatar } from '@/components/atoms/Avatar/Avatar';

export default function PerformanceReviewPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [sections, setSections] = useState(performanceReviewSections);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [isAIAssisting, setIsAIAssisting] = useState(false);

  // Use Rachel Green as default employee for demo
  const employee = getEmployeeById('rachel-green');

  if (!employee) {
    return <div>Employee not found</div>;
  }

  const userInfo = createUserInfo(employee.name, employee.role, employee.avatar);

  const chatMessages = [
    createChatMessage(
      '1',
      "Hey Alex! I've filled in Rachel's achievements for you. Rachel's information is based on her feedback, 1:1 notes, goals progress. You can find the sources below.",
      'ai',
      new Date(Date.now() - 300000)
    ),
    createChatMessage(
      '2',
      'What: Rachel successfully delivered on her AAA goals, including leading the front-end side of the API migration 1, contributing to the shared UI library rollout 2, and onboarding two junior developers. She consistently met project deadlines and closed over 150 tickets across new features and bug fixes during the year 3.',
      'ai',
      new Date(Date.now() - 240000)
    ),
    createChatMessage(
      '3',
      'How: She demonstrated strong collaboration by pairing with backend engineers during critical deadlines, mentoring juniors on React best practices',
      'ai',
      new Date(Date.now() - 180000)
    ),
    createChatMessage(
      '4',
      'Impact: Her contributions unblocked the API migration project in Q2, reducing release bottlenecks and improving cross-team delivery speed by 15%. The shared UI library she supported accelerated design consistency and improved team efficiency.',
      'ai',
      new Date(Date.now() - 120000)
    ),
    createChatMessage(
      '5',
      'Would you like to review her performance summary, or should I make some tweaks?',
      'ai',
      new Date(Date.now() - 60000)
    ),
  ];

  const handleStepClick = (stepIndex: number, stepId: string) => {
    setCurrentStep(stepIndex);
  };

  const handleSectionChange = (sectionId: string, content: string) => {
    setSections(prev =>
      prev.map(section => (section.id === sectionId ? { ...section, content } : section))
    );
  };

  const handleAction = (sectionId: string, action: 'tryAgain' | 'elaborate' | 'shorten') => {
    setIsAIAssisting(true);
    // Simulate AI processing
    setTimeout(() => {
      const section = sections.find(s => s.id === sectionId);
      if (!section) return;

      let newContent = section.content;

      switch (action) {
        case 'tryAgain':
          newContent = `[AI Regenerated] ${section.content}`;
          break;
        case 'elaborate':
          newContent = `${section.content} Additionally, this demonstrates excellent attention to detail and commitment to quality outcomes that exceeds expectations.`;
          break;
        case 'shorten':
          newContent = section.content.split('.').slice(0, 2).join('.') + '.';
          break;
      }

      handleSectionChange(sectionId, newContent);
      setIsAIAssisting(false);
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < performanceReviewSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Submit the review
      alert('Performance review submitted successfully!');
      router.push('/admin/team');
    }
  };

  const handleSaveDraft = () => {
    alert('Draft saved successfully!');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-21">
            {/* Logo and Navigation */}
            <div className="flex items-center gap-8">
              <div className="w-15 h-15 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-lg transform rotate-45 relative">
                <div className="absolute inset-2 bg-white rounded opacity-20" />
              </div>

              <nav className="hidden md:flex items-center gap-4">
                <div className="flex items-center gap-1 px-4 py-3 bg-neutral-200 rounded-2xl">
                  <Typography variant="body" weight="bold" className="text-neutral-800">
                    Home
                  </Typography>
                </div>
                <div className="flex items-center gap-1 px-4 py-3 hover:bg-neutral-100 rounded-2xl transition-colors">
                  <Typography variant="body" weight="semibold" className="text-neutral-600">
                    My Team
                  </Typography>
                </div>
                <div className="flex items-center gap-1 px-4 py-3 hover:bg-neutral-100 rounded-2xl transition-colors">
                  <Typography variant="body" weight="semibold" className="text-neutral-600">
                    Game Changers
                  </Typography>
                </div>
              </nav>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-3 bg-neutral-200 rounded-full px-4 py-2">
                <div className="w-10 h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <span className="hidden lg:block text-neutral-600 font-semibold">
                  Sony Assistant
                </span>
              </div>
              <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                <Bell className="w-5 h-5 text-neutral-800" />
              </div>
              <Avatar src="/api/placeholder/48/48" fallback="AR" size="md" />
            </div>
          </div>
        </div>
      </header>

      {/* Back Navigation */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/team')}
          className="flex items-center gap-2 text-neutral-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <Typography variant="body" weight="semibold" className="uppercase tracking-wide text-sm">
            Back
          </Typography>
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Sidebar - Stepper */}
        <div className="hidden lg:block">
          <StepperSidebar
            user={userInfo}
            steps={performanceReviewSteps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            allowNavigation={true}
          />
        </div>

        {/* Main Content Area */}
        <div
          className={`flex-1 px-4 sm:px-6 lg:px-8 py-8 transition-all duration-300 ${
            isChatOpen ? 'lg:mr-[500px]' : 'max-w-4xl'
          }`}
        >
          {/* Header */}
          <div className="mb-8">
            <Typography variant="h2" weight="bold" className="mb-2">
              Ambitions and Accomplishments
            </Typography>
            <Typography variant="body" color="muted" className="mb-6">
              Capture what was achieved, how it was done, and the impact delivered.
            </Typography>

            {/* Pre-filled Note */}
            <div className="flex items-center gap-4 p-6 bg-neutral-200 rounded-xl mb-8">
              <Sparkles className="w-6 h-6 text-neutral-600 flex-shrink-0" />
              <Typography variant="body" className="text-neutral-900">
                This draft is pre-filled using goals, feedback, and notes. You can edit freely.
              </Typography>
            </div>
          </div>

          {/* Review Form */}
          <ReviewForm
            sections={sections}
            onSectionChange={handleSectionChange}
            onAction={handleAction}
            readOnly={isAIAssisting}
          />
        </div>

        {/* Right Sidebar - Chat */}
        <ChatSidebar
          title="Sony AI"
          messages={chatMessages}
          sources={performanceReviewSources}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          enableVoiceInput={true}
          isTyping={isAIAssisting}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-200 bg-white px-4 sm:px-6 lg:px-8 py-6">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            isChatOpen ? 'lg:mr-[500px]' : 'max-w-4xl'
          }`}
        >
          <Button
            variant="ghost"
            onClick={handleSaveDraft}
            className="text-neutral-900 font-semibold"
          >
            Save Draft and Close
          </Button>

          <Button
            onClick={handleNext}
            className="bg-neutral-900 text-white font-semibold px-6 py-3 rounded-lg border-2 border-neutral-900 shadow-[2px_2px_0_0_#030217] hover:shadow-[1px_1px_0_0_#030217] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            Next
            <ArrowLeft className="w-5 h-5 ml-2 rotate-180" />
          </Button>
        </div>
      </div>

      {/* Mobile Chat Toggle */}
      {!isChatOpen && (
        <Button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-4 right-4 lg:hidden z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg"
        >
          <Bot className="w-6 h-6" />
        </Button>
      )}
    </div>
  );
}
