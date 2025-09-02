'use client';

import React, { useState } from 'react';
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
  ArrowUpDown,
  Bot,
  Bell
} from 'lucide-react';
import { employeesData, Employee } from '@/data/employees';
import Link from 'next/link';

// Team member card component
const TeamMemberCard = ({ employee }: { employee: Employee }) => {
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

  return (
    <Link href={`/admin/profile/${employee.id}`}>
      <Card className="h-56 p-6 hover:shadow-lg transition-shadow cursor-pointer relative overflow-hidden group">
        <div className="flex items-start gap-4 mb-4">
          <Avatar 
            src={employee.avatar}
            fallback={employee.name.split(' ').map(n => n[0]).join('')}
            size="lg"
            className="flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <Typography 
              variant="h5" 
              weight="bold" 
              className="text-feedback-600 mb-1 truncate group-hover:text-feedback-700 transition-colors"
            >
              {employee.name}
            </Typography>
            <Typography variant="body" className="text-gray-600 mb-3">
              {employee.role}
            </Typography>
            <Badge 
              variant={getStatusVariant(employee.status)}
              size="sm"
            >
              {employee.status}
            </Badge>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-6 right-6">
          <Typography variant="body" className="text-feedback-600 font-medium">
            {employee.team}
          </Typography>
        </div>
      </Card>
    </Link>
  );
};

export default function MyTeamPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'role' | 'status'>('name');

  // Filter and sort employees
  const filteredEmployees = employeesData
    .filter(employee => 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.team.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'role':
          return a.role.localeCompare(b.role);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

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
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          <Card className="p-6 sm:p-8">
            {/* Header */}
            <div className="mb-8">
              <Typography variant="h4" weight="bold" className="mb-6">
                My Team
              </Typography>
              
              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                {/* Search Input */}
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search team members..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-feedback-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                {/* View Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-feedback-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-feedback-500 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </button>
                  
                  {/* Sort Button */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'name' | 'role' | 'status')}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-feedback-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="role">Sort by Role</option>
                    <option value="status">Sort by Status</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Team Grid */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map((employee) => (
                  <TeamMemberCard key={employee.id} employee={employee} />
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <Link key={employee.id} href={`/admin/profile/${employee.id}`}>
                    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Avatar 
                          src={employee.avatar}
                          fallback={employee.name.split(' ').map(n => n[0]).join('')}
                          size="md"
                        />
                        <div className="flex-1">
                          <Typography variant="h6" weight="bold" className="text-feedback-600">
                            {employee.name}
                          </Typography>
                          <Typography variant="body" className="text-gray-600">
                            {employee.role} • {employee.team}
                          </Typography>
                        </div>
                        <Badge variant={employee.status === 'Available' ? 'success' : 'secondary'}>
                          {employee.status}
                        </Badge>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty State */}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-12">
                <Typography variant="h6" className="text-gray-500 mb-2">
                  No team members found
                </Typography>
                <Typography variant="body" className="text-gray-400">
                  Try adjusting your search criteria
                </Typography>
              </div>
            )}

            {/* Team Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <Typography variant="h5" weight="bold" className="text-feedback-600">
                    {employeesData.length}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    Total Members
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" weight="bold" className="text-success-600">
                    {employeesData.filter(emp => emp.status === 'Available').length}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    Available
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" weight="bold" className="text-warning-600">
                    {employeesData.filter(emp => emp.status === 'PR In Progress').length}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    In Progress
                  </Typography>
                </div>
                <div className="text-center">
                  <Typography variant="h5" weight="bold" className="text-feedback-600">
                    1
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    Teams
                  </Typography>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
