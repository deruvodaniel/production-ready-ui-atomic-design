'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/templates/AdminLayout/AdminLayout';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { useChatContext } from '@/components/providers/ChatProvider';
import { 
  TrendingUp,
  Award,
  Target,
  Star,
  Users,
  Calendar,
  MessageSquare,
  Bot,
  Zap,
  Trophy,
  ThumbsUp,
  ArrowRight,
  Eye,
  BarChart3
} from 'lucide-react';
import { employeesData, getEmployeeById } from '@/data/employees';
import Link from 'next/link';

// Game changers are top performers
const gameChangers = [
  {
    id: 'rachel-green',
    rank: 1,
    category: 'Innovation Leader',
    achievement: 'Led React 18 migration reducing technical debt by 40%',
    impact: 'High',
    quarter: 'Q4 2024',
    points: 950,
    badge: 'innovation',
    description: 'Rachel has consistently delivered innovative solutions that improved team productivity and code quality.',
    metrics: {
      performance: 94,
      leadership: 88,
      innovation: 96,
      collaboration: 91
    }
  },
  {
    id: 'alex-ruiz',
    rank: 2,
    category: 'Team Builder',
    achievement: 'Built high-performing team of 8 developers',
    impact: 'High',
    quarter: 'Q4 2024',
    points: 920,
    badge: 'leadership',
    description: 'Alex has transformed the team culture and established processes that improved overall performance by 45%.',
    metrics: {
      performance: 92,
      leadership: 98,
      innovation: 85,
      collaboration: 95
    }
  },
  {
    id: 'julia-harvey',
    rank: 3,
    category: 'Excellence Driver',
    achievement: 'Implemented accessibility standards achieving WCAG 2.1 compliance',
    impact: 'Medium',
    quarter: 'Q4 2024',
    points: 880,
    badge: 'excellence',
    description: 'Julia has shown exceptional attention to detail and commitment to quality standards.',
    metrics: {
      performance: 89,
      leadership: 82,
      innovation: 87,
      collaboration: 93
    }
  },
  {
    id: 'jim-andrada',
    rank: 4,
    category: 'Mentor Master',
    achievement: 'Mentored 3 junior developers and reduced bug reports by 60%',
    impact: 'Medium',
    quarter: 'Q4 2024',
    points: 850,
    badge: 'mentorship',
    description: 'Jim has been instrumental in knowledge sharing and developing junior talent.',
    metrics: {
      performance: 88,
      leadership: 90,
      innovation: 78,
      collaboration: 96
    }
  },
  {
    id: 'amanda-wilson',
    rank: 5,
    category: 'Design Champion',
    achievement: 'Bridged design-dev gap improving user experience across all products',
    impact: 'Medium',
    quarter: 'Q4 2024',
    points: 820,
    badge: 'design',
    description: 'Amanda has brought valuable design perspective to development processes.',
    metrics: {
      performance: 86,
      leadership: 84,
      innovation: 91,
      collaboration: 88
    }
  }
];

const getBadgeConfig = (badge: string) => {
  const configs = {
    innovation: { color: 'text-purple-600 bg-purple-100', icon: Zap },
    leadership: { color: 'text-blue-600 bg-blue-100', icon: Users },
    excellence: { color: 'text-green-600 bg-green-100', icon: Trophy },
    mentorship: { color: 'text-orange-600 bg-orange-100', icon: ThumbsUp },
    design: { color: 'text-pink-600 bg-pink-100', icon: Star }
  };
  return configs[badge as keyof typeof configs] || configs.innovation;
};

const getImpactVariant = (impact: string) => {
  switch (impact) {
    case 'High': return 'success';
    case 'Medium': return 'warning';
    case 'Low': return 'secondary';
    default: return 'secondary';
  }
};

// Performance radar component
const PerformanceRadar = ({ metrics }: { metrics: any }) => {
  const areas = [
    { label: 'Performance', value: metrics.performance, color: '#3b82f6' },
    { label: 'Leadership', value: metrics.leadership, color: '#10b981' },
    { label: 'Innovation', value: metrics.innovation, color: '#8b5cf6' },
    { label: 'Collaboration', value: metrics.collaboration, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-3">
      {areas.map((area, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between items-center">
            <Typography variant="caption" className="text-xs font-medium">
              {area.label}
            </Typography>
            <Typography variant="caption" className="text-xs text-gray-500">
              {area.value}%
            </Typography>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ 
                width: `${area.value}%`,
                backgroundColor: area.color 
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const GameChangerCard = ({ gameChanger, employee }: { gameChanger: any; employee: any }) => {
  const router = useRouter();
  const { openChat } = useChatContext();
  const badgeConfig = getBadgeConfig(gameChanger.badge);
  const BadgeIcon = badgeConfig.icon;

  const handleChatClick = () => {
    openChat();
    // You could also send a specific message about this game changer
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-200 group relative">
      {/* Rank Badge */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
        <Typography variant="body" weight="bold" className="text-white text-sm">
          #{gameChanger.rank}
        </Typography>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <Avatar 
          src={employee?.avatar}
          fallback={employee?.name.split(' ').map((n: string) => n[0]).join('') || 'GC'}
          size="lg"
          className="flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Typography variant="h6" weight="bold" className="truncate">
              {employee?.name || 'Unknown'}
            </Typography>
            <div className={`p-1 rounded-lg ${badgeConfig.color}`}>
              <BadgeIcon className="w-4 h-4" />
            </div>
          </div>
          <Typography variant="body" className="text-gray-600 mb-1">
            {employee?.role || 'Team Member'}
          </Typography>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              {gameChanger.category}
            </Badge>
            <Badge variant={getImpactVariant(gameChanger.impact)} size="sm">
              <TrendingUp className="w-3 h-3 mr-1" />
              {gameChanger.impact} Impact
            </Badge>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Typography variant="body" weight="semibold" className="mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-500" />
            Key Achievement
          </Typography>
          <Typography variant="body" className="text-gray-700 text-sm">
            {gameChanger.achievement}
          </Typography>
        </div>

        <div>
          <Typography variant="body" weight="semibold" className="mb-2">
            Description
          </Typography>
          <Typography variant="body" className="text-gray-600 text-sm">
            {gameChanger.description}
          </Typography>
        </div>

        <div className="space-y-3">
          <Typography variant="body" weight="semibold" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            Performance Metrics
          </Typography>
          <PerformanceRadar metrics={gameChanger.metrics} />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Trophy className="w-4 h-4" />
            {gameChanger.points} points
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => router.push(`/admin/profile/${gameChanger.id}`)}
            >
              <Eye className="w-4 h-4 mr-1" />
              View Profile
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={handleChatClick}
            >
              <Bot className="w-4 h-4 mr-1" />
              Ask AI
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function GameChangersPage() {
  const [loading, setLoading] = useState(true);
  const [selectedQuarter, setSelectedQuarter] = useState('Q4 2024');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <AdminLayout currentPage="game-changers">
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Typography variant="body" className="text-gray-600">
              Loading game changers...
            </Typography>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout currentPage="game-changers">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <Typography variant="h2" weight="bold" className="text-gray-900 mb-2">
                  Game Changers 🏆
                </Typography>
                <Typography variant="body" className="text-gray-600 max-w-2xl">
                  Recognizing our top performers who are making exceptional contributions to our team and products.
                  Click "Ask AI" to get insights about each game changer's performance and achievements.
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Q4 2024">Q4 2024</option>
                  <option value="Q3 2024">Q3 2024</option>
                  <option value="Q2 2024">Q2 2024</option>
                  <option value="Q1 2024">Q1 2024</option>
                </select>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  View History
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-lg">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <Typography variant="h4" weight="bold" className="mb-1">
                {gameChangers.length}
              </Typography>
              <Typography variant="caption" className="text-gray-600">
                Game Changers
              </Typography>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <Typography variant="h4" weight="bold" className="mb-1">
                89%
              </Typography>
              <Typography variant="caption" className="text-gray-600">
                Avg Performance
              </Typography>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-lg">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <Typography variant="h4" weight="bold" className="mb-1">
                4,440
              </Typography>
              <Typography variant="caption" className="text-gray-600">
                Total Points
              </Typography>
            </Card>

            <Card className="p-6 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <Typography variant="h4" weight="bold" className="mb-1">
                12
              </Typography>
              <Typography variant="caption" className="text-gray-600">
                Major Achievements
              </Typography>
            </Card>
          </div>

          {/* Game Changers Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Typography variant="h4" weight="bold">
                Top Performers - {selectedQuarter}
              </Typography>
              <Typography variant="caption" className="text-gray-500">
                Ranked by overall impact and performance
              </Typography>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {gameChangers.map((gameChanger, index) => {
                const employee = getEmployeeById(gameChanger.id);
                return (
                  <div 
                    key={gameChanger.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <GameChangerCard 
                      gameChanger={gameChanger} 
                      employee={employee} 
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action */}
          <Card className="p-8 mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Bot className="w-8 h-8 text-blue-600" />
              </div>
              <Typography variant="h5" weight="bold" className="mb-3">
                Want to Learn More?
              </Typography>
              <Typography variant="body" className="text-gray-600 mb-6">
                Use our AI assistant to get detailed insights about each game changer's performance,
                achievements, and contribution to the team's success.
              </Typography>
              <Button variant="primary" size="lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start Conversation with AI
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </AdminLayout>
  );
}
