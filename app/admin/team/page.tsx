'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import './team.css';
import { Button } from '@/components/atoms/Button/Button';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Card } from '@/components/molecules/Card/Card';
import {
  Search,
  List,
  Grid3X3,
  Filter,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  X,
  Plus,
} from 'lucide-react';
import { employeesData, Employee } from '@/data/employees';
import { getTeamData, simulateAPICall } from '@/data/config';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  AdminLayout,
  AdminLoadingState,
  AdminErrorState,
} from '@/components/templates/AdminLayout/AdminLayout';
import {
  AdminMetricCard,
  AdminTeamMemberCard,
  AdminPageHeader,
  AdminSection,
} from '@/components/organisms/AdminComponents/AdminComponents';

// Enhanced team data with analytics
const createTeamData = () => {
  const teamMembers = employeesData.map(emp => ({
    ...emp,
    lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
    performanceScore: Math.floor(Math.random() * 40) + 60, // 60-100 range
    currentProject: ['Design System', 'Mobile App', 'Dashboard', 'E-commerce'][
      Math.floor(Math.random() * 4)
    ],
  }));

  const statusCounts = teamMembers.reduce(
    (acc, emp) => {
      acc[emp.status] = (acc[emp.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const teamAnalytics = {
    totalMembers: teamMembers.length,
    availableMembers: statusCounts['Available'] || 0,
    activePRs: statusCounts['PR In Progress'] || 0,
    onLeave: statusCounts['On Leave'] || 0,
    avgPerformance: Math.round(
      teamMembers.reduce((sum, emp) => sum + emp.performanceScore, 0) / teamMembers.length
    ),
    recentJoiners: teamMembers.filter(
      emp => new Date(emp.joinDate) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    ).length,
    statusDistribution: [
      { name: 'Available', value: statusCounts['Available'] || 0, color: '#10b981' },
      { name: 'PR In Progress', value: statusCounts['PR In Progress'] || 0, color: '#f59e0b' },
      { name: 'On Leave', value: statusCounts['On Leave'] || 0, color: '#ef4444' },
      { name: 'Busy', value: statusCounts['Busy'] || 0, color: '#8b5cf6' },
    ],
    performanceDistribution: [
      { range: '90-100', count: teamMembers.filter(emp => emp.performanceScore >= 90).length },
      {
        range: '80-89',
        count: teamMembers.filter(emp => emp.performanceScore >= 80 && emp.performanceScore < 90)
          .length,
      },
      {
        range: '70-79',
        count: teamMembers.filter(emp => emp.performanceScore >= 70 && emp.performanceScore < 80)
          .length,
      },
      {
        range: '60-69',
        count: teamMembers.filter(emp => emp.performanceScore >= 60 && emp.performanceScore < 70)
          .length,
      },
    ],
  };

  return {
    members: teamMembers,
    analytics: teamAnalytics,
  };
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
  const router = useRouter();
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

    let filtered = teamData.members.filter((employee: Employee) => {
      const matchesSearch =
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.currentProject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' || employee.status === filterStatus;

      return matchesSearch && matchesStatus;
    });

    return filtered.sort((a: Employee, b: Employee) => {
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
    return <AdminLoadingState message="Loading team data..." />;
  }

  if (error) {
    return (
      <AdminErrorState
        error={error}
        onRetry={() => {
          setError(null);
          setLoading(true);
          // Reload logic here
        }}
      />
    );
  }

  const metrics = [
    {
      title: 'Total Members',
      value: teamData.analytics.totalMembers,
      change: { value: 12, direction: 'up' as const, period: 'this quarter' },
      icon: 'Users',
      color: 'blue' as const,
      description: 'Active team members',
    },
    {
      title: 'Available',
      value: teamData.analytics.availableMembers,
      change: { value: 8, direction: 'up' as const, period: 'this week' },
      icon: 'CheckCircle',
      color: 'green' as const,
      description: 'Ready for new work',
    },
    {
      title: 'Active Reviews',
      value: teamData.analytics.activePRs,
      change: { value: 5, direction: 'down' as const, period: 'this week' },
      icon: 'Clock',
      color: 'orange' as const,
      description: 'Performance reviews in progress',
    },
    {
      title: 'Avg Performance',
      value: `${teamData.analytics.avgPerformance}%`,
      change: { value: 7, direction: 'up' as const, period: 'this quarter' },
      icon: 'TrendingUp',
      color: 'purple' as const,
      description: 'Team average score',
    },
  ];

  return (
    <AdminLayout currentPage="team">
      <div className="bg-gray-50 min-h-screen">
        {/* Page Header */}
        <AdminPageHeader
          title="My Team"
          subtitle="Manage and track your team's performance and progress"
          actions={
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 mr-2" />
                Add Member
              </Button>
              <Button variant="primary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Review
              </Button>
            </div>
          }
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Analytics Dashboard */}
          <AdminSection title="Team Analytics" subtitle="Key metrics and insights about your team">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {metrics.map((metric, index) => (
                <AdminMetricCard key={index} {...metric} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
          </AdminSection>

          {/* Team Members */}
          <AdminSection
            title="Team Members"
            subtitle={`${filteredAndSortedMembers.length} of ${teamData.members.length} members`}
          >
            <Card className="p-6">
              {/* Search and Controls */}
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between mb-4">
                  {/* Search Input */}
                  <div className="flex-1 max-w-md">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search team members..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        aria-label="Search team members"
                      />
                    </div>
                  </div>

                  {/* View and Filter Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className={`p-2 rounded-lg transition-colors duration-200 ${
                        showFilters ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
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
                            ? 'bg-white text-blue-600 shadow-sm'
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
                            ? 'bg-white text-blue-600 shadow-sm'
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
                          <label
                            htmlFor="status-filter"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Status
                          </label>
                          <select
                            id="status-filter"
                            value={filterStatus}
                            onChange={e => setFilterStatus(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                          >
                            <option value="all">All Statuses</option>
                            <option value="Available">Available</option>
                            <option value="PR In Progress">PR In Progress</option>
                            <option value="On Leave">On Leave</option>
                            <option value="Busy">Busy</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="sort-filter"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Sort By
                          </label>
                          <select
                            id="sort-filter"
                            value={sortBy}
                            onChange={e => setSortBy(e.target.value as any)}
                            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
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
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <span>
                    Showing {filteredAndSortedMembers.length} of {teamData.members.length} members
                  </span>
                  {(searchTerm || filterStatus !== 'all') && (
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterStatus('all');
                      }}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </div>

              {/* Team Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAndSortedMembers.map((employee: Employee, index: number) => (
                    <AdminTeamMemberCard
                      key={employee.id}
                      employee={employee}
                      showPerformance={true}
                      showProject={true}
                      className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                      onClick={() => router.push(`/admin/profile/${employee.id}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredAndSortedMembers.map((employee: Employee, index: number) => (
                    <AdminTeamMemberCard
                      key={employee.id}
                      employee={employee}
                      showPerformance={true}
                      className="animate-in fade-in-0 slide-in-from-left-4 duration-300"
                      onClick={() => router.push(`/admin/profile/${employee.id}`)}
                    />
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
          </AdminSection>
        </main>
      </div>
    </AdminLayout>
  );
}
