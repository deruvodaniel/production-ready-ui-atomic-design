'use client';

import React, { useState, useEffect, useMemo } from 'react';
import './team.css';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { 
  Search,
  List, 
  Grid3X3,
  Filter,
  Users,
  TrendingUp,
  Clock,
  Bot,
  Bell,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import { employeesData, Employee } from '@/data/employees';
import Link from 'next/link';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Simulated API functions
const simulateAPICall = <T,>(data: T, delay: number = 1000): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

// Enhanced team data with analytics
const createTeamData = () => {
  const teamMembers = employeesData.map(emp => ({
    ...emp,
    lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    performanceScore: Math.floor(Math.random() * 40) + 60, // 60-100 range
    currentProject: ['Design System', 'Mobile App', 'Dashboard', 'E-commerce'][Math.floor(Math.random() * 4)]
  }));

  const statusCounts = teamMembers.reduce((acc, emp) => {
    acc[emp.status] = (acc[emp.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const teamAnalytics = {
    totalMembers: teamMembers.length,
    availableMembers: statusCounts['Available'] || 0,
    activePRs: statusCounts['PR In Progress'] || 0,
    onLeave: statusCounts['On Leave'] || 0,
    avgPerformance: Math.round(teamMembers.reduce((sum, emp) => sum + emp.performanceScore, 0) / teamMembers.length),
    recentJoiners: teamMembers.filter(emp => 
      new Date(emp.joinDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    ).length,
    statusDistribution: [
      { name: 'Available', value: statusCounts['Available'] || 0, color: '#10b981' },
      { name: 'PR In Progress', value: statusCounts['PR In Progress'] || 0, color: '#f59e0b' },
      { name: 'On Leave', value: statusCounts['On Leave'] || 0, color: '#ef4444' },
      { name: 'Busy', value: statusCounts['Busy'] || 0, color: '#8b5cf6' }
    ],
    performanceDistribution: [
      { range: '90-100', count: teamMembers.filter(emp => emp.performanceScore >= 90).length },
      { range: '80-89', count: teamMembers.filter(emp => emp.performanceScore >= 80 && emp.performanceScore < 90).length },
      { range: '70-79', count: teamMembers.filter(emp => emp.performanceScore >= 70 && emp.performanceScore < 80).length },
      { range: '60-69', count: teamMembers.filter(emp => emp.performanceScore >= 60 && emp.performanceScore < 70).length }
    ]
  };

  return {
    members: teamMembers,
    analytics: teamAnalytics
  };
};

// Enhanced team member card component with accessibility improvements
const TeamMemberCard = ({ employee, index }: { employee: Employee & { performanceScore: number; currentProject: string; lastActivity: Date }, index: number }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'On Leave':
        return 'warning';
      case 'Busy':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const isRecentlyActive = new Date() - employee.lastActivity < 24 * 60 * 60 * 1000;

  return (
    <Link href={`/admin/profile/${employee.id}`} className="block">
      <Card 
        className="h-64 p-6 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
        style={{
          animationDelay: `${index * 100}ms`,
          animation: 'fadeInUp 0.6s ease-out forwards'
        }}
        role="article"
        aria-label={`Team member ${employee.name}, ${employee.role}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar 
              src={employee.avatar}
              fallback={employee.name.split(' ').map(n => n[0]).join('')}
              size="lg"
              className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
            />
            {isRecentlyActive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full animate-pulse" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <Typography 
              variant="h5" 
              weight="bold" 
              className="text-feedback-600 mb-1 truncate group-hover:text-feedback-700 transition-colors"
            >
              {employee.name}
            </Typography>
            <Typography variant="body" className="text-gray-600 mb-2 truncate">
              {employee.role}
            </Typography>
            <Badge 
              variant={getStatusVariant(employee.status)}
              size="sm"
              className="inline-flex"
            >
              {employee.status}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500">
              Performance Score
            </Typography>
            <Typography variant="caption" className="font-semibold">
              {employee.performanceScore}%
            </Typography>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                employee.performanceScore >= 90 ? 'bg-green-500' :
                employee.performanceScore >= 80 ? 'bg-blue-500' :
                employee.performanceScore >= 70 ? 'bg-yellow-500' : 'bg-orange-500'
              }`}
              style={{ 
                width: `${employee.performanceScore}%`,
                animationDelay: `${index * 100 + 500}ms`
              }}
            />
          </div>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center justify-between">
            <Typography variant="caption" className="text-feedback-600 font-medium truncate">
              {employee.currentProject}
            </Typography>
            <Typography variant="caption" className="text-gray-500 ml-2">
              {employee.team}
            </Typography>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Card>
    </Link>
  );
};

// Analytics Charts
const StatusChart = ({ data }: { data: any[] }) => (
  <div className="h-48 w-full" role="img" aria-label="Team status distribution chart">
    <ChartContainer config={{}} className="w-full h-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{data.payload.name}</p>
                    <p className="text-sm text-gray-600">{data.value} members</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  </div>
);

const PerformanceChart = ({ data }: { data: any[] }) => (
  <div className="h-48 w-full" role="img" aria-label="Performance distribution chart">
    <ChartContainer config={{}} className="w-full h-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="range" fontSize={12} />
          <YAxis hide />
          <ChartTooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{label}%</p>
                    <p className="text-sm text-gray-600">{payload[0].value} members</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </div>
);

export default function MyTeamPage() {
  const [teamData, setTeamData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'status' | 'performance'>('name');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Load team data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await simulateAPICall(createTeamData(), 1000);
        setTeamData(data);
      } catch (err) {
        setError('Failed to load team data');
        console.error('Data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter and sort team members
  const filteredAndSortedMembers = useMemo(() => {
    if (!teamData) return [];

    let filtered = teamData.members.filter((employee: any) => {
      const matchesSearch = 
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.currentProject.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'performance':
          return b.performanceScore - a.performanceScore;
        default:
          return 0;
      }
    });
  }, [teamData, searchTerm, sortBy, filterStatus]);

  if (loading) {
    return (
      <PageLayout
        header={{
          logo: (
            <div className="w-15 h-15 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-lg transform rotate-45 relative">
              <div className="absolute inset-2 bg-white rounded opacity-20" />
            </div>
          ),
          title: '',
          navigation: [
            { label: 'Home', href: '/admin/feedback' },
            { label: 'My Team', href: '/admin/team', active: true },
            { label: 'Game Changers', href: '/admin/game-changers' },
          ],
        }}
      >
        <div className="bg-feedback-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600 mx-auto"></div>
            <Typography variant="body" className="mt-4 text-gray-600">
              Loading team data...
            </Typography>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout
        header={{
          logo: (
            <div className="w-15 h-15 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-lg transform rotate-45 relative">
              <div className="absolute inset-2 bg-white rounded opacity-20" />
            </div>
          ),
          title: '',
          navigation: [
            { label: 'Home', href: '/admin/feedback' },
            { label: 'My Team', href: '/admin/team', active: true },
            { label: 'Game Changers', href: '/admin/game-changers' },
          ],
        }}
      >
        <div className="bg-feedback-background min-h-screen flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <Typography variant="h5" className="text-red-600 mb-2">
              Error loading team
            </Typography>
            <Typography variant="body" className="text-gray-600">
              {error}
            </Typography>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      header={{
        logo: (
          <div className="w-15 h-15 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-lg transform rotate-45 relative">
            <div className="absolute inset-2 bg-white rounded opacity-20" />
          </div>
        ),
        title: '',
        navigation: [
          { label: 'Home', href: '/admin/feedback' },
          { label: 'My Team', href: '/admin/team', active: true },
          { label: 'Game Changers', href: '/admin/game-changers' },
        ],
        rightContent: (
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
            <div className="hidden sm:flex items-center gap-3 bg-neutral-200 rounded-full px-3 lg:px-4 py-2">
              <div className="w-8 lg:w-10 h-8 lg:h-10 bg-neutral-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 lg:w-6 h-4 lg:h-6 text-white" />
              </div>
              <span className="hidden lg:block text-neutral-600 font-semibold text-sm lg:text-base">Sony Assistant</span>
            </div>
            <div className="w-8 lg:w-10 h-8 lg:h-10 bg-neutral-100 rounded-full flex items-center justify-center">
              <Bell className="w-4 lg:w-5 h-4 lg:h-5 text-neutral-800" />
            </div>
            <Avatar 
              src="/api/placeholder/48/48" 
              fallback="AR" 
              size="md"
              className="lg:w-12 lg:h-12"
            />
          </div>
        ),
        showThemeToggle: false,
        showSettingsButton: false,
      }}
    >
      <div className="bg-feedback-background min-h-screen">
        {/* Page Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <Typography variant="h3" weight="bold" className="text-gray-900 mb-2">
                  My Team
                </Typography>
                <Typography variant="body" className="text-gray-600">
                  Manage and track your team's performance and progress
                </Typography>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="w-5 h-5" />
                  <Typography variant="body" weight="semibold">
                    {teamData.analytics.avgPerformance}% avg performance
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Analytics Dashboard */}
        <section className="bg-white border-b border-gray-200" aria-label="Team analytics">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <Typography variant="h4" weight="bold" className="text-gray-900">
                  {teamData.analytics.totalMembers}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Total Members
                </Typography>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <Typography variant="h4" weight="bold" className="text-green-600">
                  {teamData.analytics.availableMembers}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Available
                </Typography>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-3">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <Typography variant="h4" weight="bold" className="text-orange-600">
                  {teamData.analytics.activePRs}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  Active Reviews
                </Typography>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <Typography variant="h4" weight="bold" className="text-purple-600">
                  {teamData.analytics.recentJoiners}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  New Joiners (90d)
                </Typography>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <Typography variant="h6" weight="bold" className="mb-4">
                  Team Status Distribution
                </Typography>
                <StatusChart data={teamData.analytics.statusDistribution} />
              </Card>
              <Card className="p-6">
                <Typography variant="h6" weight="bold" className="mb-4">
                  Performance Distribution
                </Typography>
                <PerformanceChart data={teamData.analytics.performanceDistribution} />
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Card className="p-6 sm:p-8">
            {/* Search and Controls */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-4">
                {/* Search Input */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search team members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-feedback-500 focus:border-transparent outline-none transition-all duration-200"
                      aria-label="Search team members"
                    />
                  </div>
                </div>

                {/* View and Filter Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                      showFilters 
                        ? 'bg-feedback-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label="Toggle filters"
                    aria-expanded={showFilters}
                  >
                    <Filter className="w-5 h-5" />
                  </button>

                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded transition-colors duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-white text-feedback-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      aria-label="List view"
                      aria-pressed={viewMode === 'list'}
                    >
                      <List className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded transition-colors duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-white text-feedback-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      aria-label="Grid view"
                      aria-pressed={viewMode === 'grid'}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border animate-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div>
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          id="status-filter"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-feedback-500 focus:border-transparent outline-none bg-white"
                        >
                          <option value="all">All Statuses</option>
                          <option value="Available">Available</option>
                          <option value="PR In Progress">PR In Progress</option>
                          <option value="On Leave">On Leave</option>
                          <option value="Busy">Busy</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="sort-filter" className="block text-sm font-medium text-gray-700 mb-1">
                          Sort By
                        </label>
                        <select
                          id="sort-filter"
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value as any)}
                          className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-feedback-500 focus:border-transparent outline-none bg-white"
                        >
                          <option value="name">Name</option>
                          <option value="role">Role</option>
                          <option value="status">Status</option>
                          <option value="performance">Performance</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      aria-label="Close filters"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Results Summary */}
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>
                  Showing {filteredAndSortedMembers.length} of {teamData.members.length} members
                </span>
                {(searchTerm || filterStatus !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setFilterStatus('all');
                    }}
                    className="text-feedback-600 hover:text-feedback-700 transition-colors duration-200"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Team Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedMembers.map((employee, index) => (
                  <TeamMemberCard key={employee.id} employee={employee} index={index} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredAndSortedMembers.map((employee, index) => (
                  <Link key={employee.id} href={`/admin/profile/${employee.id}`}>
                    <Card 
                      className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: 'fadeInLeft 0.5s ease-out forwards'
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar 
                          src={employee.avatar}
                          fallback={employee.name.split(' ').map(n => n[0]).join('')}
                          size="md"
                          className="transition-transform duration-200 group-hover:scale-105"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <Typography variant="h6" weight="bold" className="text-feedback-600 truncate">
                              {employee.name}
                            </Typography>
                            <Badge variant={employee.status === 'Available' ? 'success' : 'secondary'} size="sm">
                              {employee.status}
                            </Badge>
                          </div>
                          <Typography variant="body" className="text-gray-600 truncate">
                            {employee.role} • {employee.currentProject}
                          </Typography>
                        </div>
                        <div className="text-right">
                          <Typography variant="body" weight="semibold" className="text-gray-900">
                            {employee.performanceScore}%
                          </Typography>
                          <Typography variant="caption" className="text-gray-500">
                            Performance
                          </Typography>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredAndSortedMembers.length === 0 && (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <Typography variant="h6" className="text-gray-500 mb-2">
                  No team members found
                </Typography>
                <Typography variant="body" className="text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </Typography>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterStatus('all');
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </Card>
        </main>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </PageLayout>
  );
}
