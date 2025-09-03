'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/templates/AdminLayout/AdminLayout';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Github,
  Linkedin,
  Twitter,
  Target,
  TrendingUp,
  Users,
  MessageSquare,
  Star,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  BarChart3,
} from 'lucide-react';
import { getEmployeeById, type Employee } from '@/data/employees';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import Link from 'next/link';

// Generate performance data for each employee
const generatePerformanceData = (employeeId: string) => {
  const baseScore = 70 + (Math.abs(employeeId.length * 3) % 25); // Generate consistent but different scores
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return months.map((month, index) => ({
    month,
    score: Math.min(100, baseScore + Math.sin(index * 0.5 + employeeId.length) * 10 + index * 2),
    goals: Math.floor(3 + Math.cos(index * 0.3 + employeeId.length) * 2),
    feedback: Math.floor(2 + Math.sin(index * 0.7 + employeeId.length) * 3),
  }));
};

// Generate skills data
const generateSkillsData = (skills: string[]) => {
  return skills.map((skill, index) => ({
    skill,
    level: 60 + ((index * 7) % 40), // Generate different levels for each skill
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
  }));
};

// Generate project contributions
const generateProjectData = (projects: string[], employeeId: string) => {
  return projects.map((project, index) => ({
    name: project,
    contribution: 20 + ((employeeId.length * index * 3) % 60),
    status: ['completed', 'in-progress', 'planning'][index % 3],
    commits: Math.floor(50 + ((employeeId.length * index * 5) % 200)),
  }));
};

// Performance Chart Component
const PerformanceChart = ({ data }: { data: any[] }) => (
  <div className="h-64 w-full">
    <ChartContainer
      config={{
        score: { label: 'Performance Score', color: '#3b82f6' },
        goals: { label: 'Goals Completed', color: '#10b981' },
        feedback: { label: 'Feedback Given', color: '#f59e0b' },
      }}
      className="w-full h-full"
    >
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
          <YAxis hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.1}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  </div>
);

// Skills Chart Component
const SkillsChart = ({ data }: { data: any[] }) => (
  <div className="space-y-4">
    {data.map((item, index) => (
      <div key={index} className="space-y-2">
        <div className="flex justify-between items-center">
          <Typography variant="body" className="text-sm font-medium">
            {item.skill}
          </Typography>
          <Typography variant="caption" className="text-xs text-gray-500">
            {item.level}%
          </Typography>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${item.level}%`,
              backgroundColor: item.color,
            }}
          />
        </div>
      </div>
    ))}
  </div>
);

// Project Contributions Chart
const ProjectChart = ({ data }: { data: any[] }) => (
  <div className="h-48 w-full">
    <ChartContainer config={{}} className="w-full h-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <XAxis dataKey="name" fontSize={10} />
          <YAxis hide />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border rounded-lg shadow-lg">
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-gray-600">Contribution: {payload[0].value}%</p>
                    <p className="text-sm text-gray-600">Commits: {data.commits}</p>
                    <p className="text-sm text-gray-600">Status: {data.status}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="contribution" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  </div>
);

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const employeeId = params.id as string;
    const empData = getEmployeeById(employeeId);

    // Simulate API call
    setTimeout(() => {
      setEmployee(empData || null);
      setLoading(false);
    }, 800);
  }, [params.id]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <Typography variant="body" className="text-gray-600">
              Loading profile...
            </Typography>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!employee) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <Typography variant="h5" className="text-gray-900 mb-2">
              Employee not found
            </Typography>
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const performanceData = generatePerformanceData(employee.id);
  const skillsData = generateSkillsData(employee.skills);
  const projectData = generateProjectData(employee.projects, employee.id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Available':
        return 'success';
      case 'PR In Progress':
        return 'warning';
      case 'On Leave':
        return 'error';
      case 'Busy':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Team
              </Button>
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex items-start gap-6">
                <Avatar
                  src={employee.avatar}
                  fallback={employee.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                  size="2xl"
                  className="flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Typography variant="h2" weight="bold" className="text-gray-900">
                      {employee.name}
                    </Typography>
                    <Badge variant={getStatusVariant(employee.status)}>{employee.status}</Badge>
                  </div>
                  <Typography variant="h6" className="text-gray-600 mb-2">
                    {employee.role}
                  </Typography>
                  <Typography variant="body" className="text-gray-500 mb-4 max-w-2xl">
                    {employee.bio}
                  </Typography>

                  {/* Contact Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {employee.email}
                    </div>
                    {employee.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {employee.phone}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {employee.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Joined {new Date(employee.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 lg:ml-auto">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule 1:1
                </Button>
                <Button variant="primary" size="sm">
                  <Star className="w-4 h-4 mr-2" />
                  Start Review
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Charts and Performance */}
            <div className="lg:col-span-2 space-y-8">
              {/* Performance Chart */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <Typography variant="h5" weight="bold">
                    Performance Trend
                  </Typography>
                  <Badge variant="success">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% this quarter
                  </Badge>
                </div>
                <PerformanceChart data={performanceData} />
              </Card>

              {/* Project Contributions */}
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-6">
                  Project Contributions
                </Typography>
                <ProjectChart data={projectData} />
              </Card>

              {/* Goals and Achievements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-5 h-5 text-blue-500" />
                    <Typography variant="h6" weight="bold">
                      Current Goals
                    </Typography>
                  </div>
                  <div className="space-y-3">
                    {employee.goals.current.map((goal, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                        <Typography variant="body" className="text-sm">
                          {goal}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-green-500" />
                    <Typography variant="h6" weight="bold">
                      Achievements
                    </Typography>
                  </div>
                  <div className="space-y-3">
                    {employee.achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <Typography variant="body" className="text-sm">
                          {achievement}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Info and Skills */}
            <div className="space-y-6">
              {/* Skills */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-5 h-5 text-purple-500" />
                  <Typography variant="h6" weight="bold">
                    Skills & Expertise
                  </Typography>
                </div>
                <SkillsChart data={skillsData} />
              </Card>

              {/* Team Info */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-blue-500" />
                  <Typography variant="h6" weight="bold">
                    Team Information
                  </Typography>
                </div>
                <div className="space-y-3">
                  <div>
                    <Typography variant="caption" className="text-gray-500 uppercase tracking-wide">
                      Team
                    </Typography>
                    <Typography variant="body" weight="semibold">
                      {employee.team}
                    </Typography>
                  </div>
                  {employee.manager && (
                    <div>
                      <Typography
                        variant="caption"
                        className="text-gray-500 uppercase tracking-wide"
                      >
                        Reports to
                      </Typography>
                      <Link href={`/admin/profile/${employee.manager}`}>
                        <Typography
                          variant="body"
                          weight="semibold"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          Manager
                        </Typography>
                      </Link>
                    </div>
                  )}
                  {employee.reports && employee.reports.length > 0 && (
                    <div>
                      <Typography
                        variant="caption"
                        className="text-gray-500 uppercase tracking-wide"
                      >
                        Direct Reports
                      </Typography>
                      <Typography variant="body" weight="semibold">
                        {employee.reports.length} team members
                      </Typography>
                    </div>
                  )}
                </div>
              </Card>

              {/* Feedback Stats */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-5 h-5 text-orange-500" />
                  <Typography variant="h6" weight="bold">
                    Feedback Activity
                  </Typography>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Typography variant="body" className="text-sm">
                      Feedback Given
                    </Typography>
                    <Badge variant="primary">{employee.feedbackHistory.given}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body" className="text-sm">
                      Feedback Received
                    </Typography>
                    <Badge variant="secondary">{employee.feedbackHistory.received}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <Typography variant="body" className="text-sm">
                      Pending Reviews
                    </Typography>
                    <Badge variant="warning">{employee.feedbackHistory.pending}</Badge>
                  </div>
                </div>
              </Card>

              {/* Social Links */}
              {employee.socialLinks && (
                <Card className="p-6">
                  <Typography variant="h6" weight="bold" className="mb-4">
                    Connect
                  </Typography>
                  <div className="flex gap-3">
                    {employee.socialLinks.linkedin && (
                      <a
                        href={employee.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Linkedin className="w-5 h-5 text-blue-600" />
                      </a>
                    )}
                    {employee.socialLinks.github && (
                      <a
                        href={employee.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Github className="w-5 h-5 text-gray-700" />
                      </a>
                    )}
                    {employee.socialLinks.twitter && (
                      <a
                        href={employee.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-sky-100 rounded-lg hover:bg-sky-200 transition-colors"
                      >
                        <Twitter className="w-5 h-5 text-sky-600" />
                      </a>
                    )}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </AdminLayout>
  );
}
