import React from 'react';
import { Card } from '@/components/molecules/Card/Card';
import { Avatar } from '@/components/atoms/Avatar/Avatar';
import { Typography } from '@/components/atoms/Typography/Typography';
import { Button } from '@/components/atoms/Button/Button';
import { Badge } from '@/components/atoms/Badge/Badge';
import { PageLayout } from '@/components/templates/PageLayout/PageLayout';
import { 
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Bot,
  Bell,
  ExternalLink,
  Target,
  CheckCircle,
  Users,
  MessageSquare,
  Award
} from 'lucide-react';
import { getEmployeeById, employeesData } from '@/data/employees';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const employeeId = params.id as string;
  
  const employee = getEmployeeById(employeeId);

  if (!employee) {
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
            { label: 'My Team', href: '/admin/team' },
            { label: 'Game Changers', href: '/admin/game-changers' },
          ],
          showThemeToggle: false,
          showSettingsButton: false,
        }}
      >
        <div className="bg-feedback-background min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="p-8 text-center">
              <Typography variant="h4" className="mb-4">Employee Not Found</Typography>
              <Typography variant="body" color="muted" className="mb-6">
                The employee profile you're looking for doesn't exist.
              </Typography>
              <Button onClick={() => router.push('/admin/team')}>
                Back to Team
              </Button>
            </Card>
          </div>
        </div>
      </PageLayout>
    );
  }

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

  const manager = employee.manager ? getEmployeeById(employee.manager) : null;
  const directReports = employee.reports 
    ? employee.reports.map(id => getEmployeeById(id)).filter(Boolean)
    : [];

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
          { label: 'My Team', href: '/admin/team' },
          { label: 'Game Changers', href: '#' },
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push('/admin/team')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Team
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Overview */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="p-6 text-center">
                <Avatar 
                  src={employee.avatar}
                  fallback={employee.name.split(' ').map(n => n[0]).join('')}
                  size="2xl"
                  className="mx-auto mb-4"
                />
                <Typography variant="h4" weight="bold" className="mb-2">
                  {employee.name}
                </Typography>
                <Typography variant="body" color="muted" className="mb-3">
                  {employee.role}
                </Typography>
                <Badge variant={getStatusVariant(employee.status)} size="md" className="mb-4">
                  {employee.status}
                </Badge>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <Typography variant="body" className="text-sm">
                      {employee.email}
                    </Typography>
                  </div>
                  {employee.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <Typography variant="body" className="text-sm">
                        {employee.phone}
                      </Typography>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <Typography variant="body" className="text-sm">
                      {employee.location}
                    </Typography>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <Typography variant="body" className="text-sm">
                      Joined {new Date(employee.joinDate).toLocaleDateString()}
                    </Typography>
                  </div>
                </div>

                {/* Social Links */}
                {employee.socialLinks && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <Typography variant="body" weight="semibold" className="mb-3">
                      Connect
                    </Typography>
                    <div className="flex justify-center gap-3">
                      {employee.socialLinks.linkedin && (
                        <a 
                          href={employee.socialLinks.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {employee.socialLinks.github && (
                        <a 
                          href={employee.socialLinks.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {employee.socialLinks.twitter && (
                        <a 
                          href={employee.socialLinks.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-500"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </Card>

              {/* Feedback Stats */}
              <Card className="p-6">
                <Typography variant="h6" weight="bold" className="mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Feedback Activity
                </Typography>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Typography variant="h5" weight="bold" className="text-green-600">
                      {employee.feedbackHistory.given}
                    </Typography>
                    <Typography variant="caption" color="muted">Given</Typography>
                  </div>
                  <div>
                    <Typography variant="h5" weight="bold" className="text-blue-600">
                      {employee.feedbackHistory.received}
                    </Typography>
                    <Typography variant="caption" color="muted">Received</Typography>
                  </div>
                  <div>
                    <Typography variant="h5" weight="bold" className="text-orange-600">
                      {employee.feedbackHistory.pending}
                    </Typography>
                    <Typography variant="caption" color="muted">Pending</Typography>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-4">
                  About
                </Typography>
                <Typography variant="body" className="text-gray-700 leading-relaxed">
                  {employee.bio}
                </Typography>
              </Card>

              {/* Skills & Expertise */}
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-4">
                  Skills & Expertise
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {employee.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Current Projects */}
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-4">
                  Current Projects
                </Typography>
                <div className="space-y-2">
                  {employee.projects.map((project, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-feedback-500 rounded-full"></div>
                      <Typography variant="body">{project}</Typography>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Current Goals */}
                <Card className="p-6">
                  <Typography variant="h6" weight="bold" className="mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Current Goals
                  </Typography>
                  <div className="space-y-3">
                    {employee.goals.current.map((goal, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <Typography variant="body" className="text-sm">{goal}</Typography>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Completed Goals */}
                <Card className="p-6">
                  <Typography variant="h6" weight="bold" className="mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Completed Goals
                  </Typography>
                  <div className="space-y-3">
                    {employee.goals.completed.map((goal, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <Typography variant="body" className="text-sm text-gray-600">{goal}</Typography>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Achievements */}
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Achievements
                </Typography>
                <div className="space-y-3">
                  {employee.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Award className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <Typography variant="body" className="text-sm">{achievement}</Typography>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Team Relationships */}
              <Card className="p-6">
                <Typography variant="h5" weight="bold" className="mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Relationships
                </Typography>
                <div className="space-y-4">
                  {/* Manager */}
                  {manager && (
                    <div>
                      <Typography variant="body" weight="semibold" className="mb-2">
                        Reports to:
                      </Typography>
                      <Link href={`/admin/profile/${manager.id}`}>
                        <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                          <Avatar 
                            src={manager.avatar}
                            fallback={manager.name.split(' ').map(n => n[0]).join('')}
                            size="sm"
                          />
                          <div>
                            <Typography variant="body" weight="semibold">{manager.name}</Typography>
                            <Typography variant="caption" color="muted">{manager.role}</Typography>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* Direct Reports */}
                  {directReports.length > 0 && (
                    <div>
                      <Typography variant="body" weight="semibold" className="mb-2">
                        Direct Reports ({directReports.length}):
                      </Typography>
                      <div className="space-y-2">
                        {directReports.map((report) => (
                          <Link key={report!.id} href={`/admin/profile/${report!.id}`}>
                            <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-gray-50 transition-colors cursor-pointer">
                              <Avatar 
                                src={report!.avatar}
                                fallback={report!.name.split(' ').map(n => n[0]).join('')}
                                size="sm"
                              />
                              <div>
                                <Typography variant="body" weight="semibold">{report!.name}</Typography>
                                <Typography variant="caption" color="muted">{report!.role}</Typography>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
