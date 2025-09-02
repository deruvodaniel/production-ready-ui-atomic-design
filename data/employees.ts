// Mock data for employees with images and detailed information
export interface Employee {
  id: string;
  name: string;
  role: string;
  team: string;
  status: 'PR In Progress' | 'Available' | 'On Leave' | 'Busy';
  avatar: string;
  email: string;
  phone?: string;
  location: string;
  joinDate: string;
  skills: string[];
  projects: string[];
  bio: string;
  manager?: string;
  reports?: string[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  achievements: string[];
  goals: {
    current: string[];
    completed: string[];
  };
  feedbackHistory: {
    given: number;
    received: number;
    pending: number;
  };
}

export const employeesData: Employee[] = [
  {
    id: 'rachel-green',
    name: 'Rachel Green',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    email: 'rachel.green@company.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    joinDate: '2022-03-15',
    skills: ['React', 'TypeScript', 'CSS', 'Jest', 'Figma'],
    projects: ['Design System', 'Mobile App', 'Dashboard Redesign'],
    bio: 'Passionate frontend developer with 4+ years experience building modern web applications. Love creating intuitive user interfaces and contributing to design systems.',
    manager: 'alex-ruiz',
    achievements: [
      'Led the component library migration to TypeScript',
      'Improved app performance by 40%',
      'Mentored 2 junior developers'
    ],
    goals: {
      current: ['Complete React 18 migration', 'Learn Next.js 13'],
      completed: ['Master TypeScript', 'Implement testing best practices']
    },
    feedbackHistory: {
      given: 15,
      received: 8,
      pending: 2
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/rachelgreen',
      github: 'https://github.com/rachelgreen'
    }
  },
  {
    id: 'julia-harvey',
    name: 'Julia Harvey',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face',
    email: 'julia.harvey@company.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    joinDate: '2021-11-20',
    skills: ['Vue.js', 'JavaScript', 'SCSS', 'Webpack', 'Adobe XD'],
    projects: ['E-commerce Platform', 'Admin Dashboard', 'Marketing Site'],
    bio: 'Creative frontend developer specializing in Vue.js and modern CSS. Passionate about accessibility and user experience design.',
    manager: 'alex-ruiz',
    achievements: [
      'Built the new e-commerce checkout flow',
      'Reduced bundle size by 30%',
      'Implemented accessibility standards (WCAG 2.1)'
    ],
    goals: {
      current: ['Learn React ecosystem', 'Contribute to open source'],
      completed: ['Master Vue 3 Composition API', 'Obtain accessibility certification']
    },
    feedbackHistory: {
      given: 12,
      received: 6,
      pending: 1
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/juliaharvey',
      github: 'https://github.com/juliaharvey'
    }
  },
  {
    id: 'jonah-smith',
    name: 'Jonah Smith',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    email: 'jonah.smith@company.com',
    location: 'Austin, TX',
    joinDate: '2023-01-10',
    skills: ['React', 'Node.js', 'GraphQL', 'Docker', 'AWS'],
    projects: ['API Integration', 'Real-time Chat', 'Performance Optimization'],
    bio: 'Full-stack developer with frontend focus. Enjoys building scalable applications and exploring new technologies.',
    manager: 'alex-ruiz',
    achievements: [
      'Implemented real-time features using WebSockets',
      'Optimized API calls reducing load time by 50%',
      'Created comprehensive testing suite'
    ],
    goals: {
      current: ['Master GraphQL federation', 'Learn Kubernetes'],
      completed: ['Build first full-stack application', 'Learn Docker containerization']
    },
    feedbackHistory: {
      given: 8,
      received: 10,
      pending: 3
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jonahsmith',
      github: 'https://github.com/jonahsmith',
      twitter: 'https://twitter.com/jonahsmith'
    }
  },
  {
    id: 'jim-andrada',
    name: 'Jim Andrada',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    email: 'jim.andrada@company.com',
    location: 'Seattle, WA',
    joinDate: '2020-08-05',
    skills: ['Angular', 'TypeScript', 'RxJS', 'Jest', 'Cypress'],
    projects: ['Legacy Migration', 'Component Library', 'Testing Framework'],
    bio: 'Senior developer specializing in Angular and enterprise applications. Strong advocate for testing and code quality.',
    manager: 'alex-ruiz',
    achievements: [
      'Led Angular migration from AngularJS',
      'Established testing standards and practices',
      'Reduced bug reports by 60%'
    ],
    goals: {
      current: ['Explore micro-frontends', 'Learn React'],
      completed: ['Master RxJS patterns', 'Implement comprehensive testing']
    },
    feedbackHistory: {
      given: 20,
      received: 5,
      pending: 1
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jimandrada',
      github: 'https://github.com/jimandrada'
    }
  },
  {
    id: 'alex-ruiz',
    name: 'Alex Ruiz',
    role: 'Engineering Manager',
    team: 'God of War',
    status: 'Available',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    email: 'alex.ruiz@company.com',
    phone: '+1 (555) 345-6789',
    location: 'Los Angeles, CA',
    joinDate: '2019-05-12',
    skills: ['Team Leadership', 'React', 'Node.js', 'Architecture', 'Agile'],
    projects: ['Team Management', 'Technical Strategy', 'Process Improvement'],
    bio: 'Engineering manager with 8+ years of development experience. Passionate about building high-performing teams and delivering quality software.',
    reports: ['rachel-green', 'julia-harvey', 'jonah-smith', 'jim-andrada', 'tom-hardy'],
    achievements: [
      'Built and led a team of 12 developers',
      'Improved team productivity by 45%',
      'Implemented agile best practices'
    ],
    goals: {
      current: ['Scale team to 15 members', 'Implement DevOps practices'],
      completed: ['Establish team processes', 'Achieve 95% employee satisfaction']
    },
    feedbackHistory: {
      given: 35,
      received: 12,
      pending: 0
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/alexruiz',
      github: 'https://github.com/alexruiz'
    }
  },
  {
    id: 'tom-hardy',
    name: 'Tom Hardy',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&fit=crop&crop=face',
    email: 'tom.hardy@company.com',
    location: 'Chicago, IL',
    joinDate: '2022-09-01',
    skills: ['React', 'Redux', 'CSS-in-JS', 'Storybook', 'Webpack'],
    projects: ['State Management', 'Component Documentation', 'Build Optimization'],
    bio: 'Frontend developer focused on state management and developer experience. Enjoys creating tools that help other developers.',
    manager: 'alex-ruiz',
    achievements: [
      'Implemented Redux toolkit migration',
      'Created comprehensive Storybook documentation',
      'Reduced build time by 35%'
    ],
    goals: {
      current: ['Learn server-side rendering', 'Explore Web Components'],
      completed: ['Master Redux patterns', 'Build development tools']
    },
    feedbackHistory: {
      given: 10,
      received: 7,
      pending: 2
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/tomhardy',
      github: 'https://github.com/tomhardy'
    }
  },
  {
    id: 'amanda-wilson',
    name: 'Amanda Wilson',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    email: 'amanda.wilson@company.com',
    location: 'Denver, CO',
    joinDate: '2021-03-22',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'User Research'],
    projects: ['Design System', 'User Interface', 'Responsive Design'],
    bio: 'Frontend developer with a strong design background. Bridges the gap between design and development.',
    manager: 'alex-ruiz',
    achievements: [
      'Collaborated with design team on component library',
      'Improved mobile experience across all products',
      'Conducted user research sessions'
    ],
    goals: {
      current: ['Learn animation libraries', 'Master design tokens'],
      completed: ['Implement responsive design system', 'Learn user research methods']
    },
    feedbackHistory: {
      given: 14,
      received: 9,
      pending: 1
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/amandawilson',
      github: 'https://github.com/amandawilson'
    }
  },
  {
    id: 'jessica-wright',
    name: 'Jessica Wright',
    role: 'Front End Developer',
    team: 'God of War',
    status: 'PR In Progress',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    email: 'jessica.wright@company.com',
    location: 'Miami, FL',
    joinDate: '2023-06-15',
    skills: ['Vue.js', 'JavaScript', 'CSS Grid', 'Animation', 'Figma'],
    projects: ['Interactive Features', 'Animation Library', 'Mobile First Design'],
    bio: 'Creative developer specializing in animations and interactive web experiences. Passionate about creating delightful user interactions.',
    manager: 'alex-ruiz',
    achievements: [
      'Created award-winning animation library',
      'Improved user engagement by 25%',
      'Mentored design interns'
    ],
    goals: {
      current: ['Learn WebGL', 'Explore Three.js'],
      completed: ['Master CSS animations', 'Build interactive prototypes']
    },
    feedbackHistory: {
      given: 6,
      received: 11,
      pending: 4
    },
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jessicawright',
      github: 'https://github.com/jessicawright'
    }
  }
];

// Helper functions
export const getEmployeeById = (id: string): Employee | undefined => {
  return employeesData.find(emp => emp.id === id);
};

export const getEmployeesByTeam = (team: string): Employee[] => {
  return employeesData.filter(emp => emp.team === team);
};

export const getEmployeesByManager = (managerId: string): Employee[] => {
  return employeesData.filter(emp => emp.manager === managerId);
};

export const getManagers = (): Employee[] => {
  return employeesData.filter(emp => emp.reports && emp.reports.length > 0);
};

// Teams data
export const teamsData = [
  {
    id: 'god-of-war',
    name: 'God of War',
    description: 'Frontend development team focused on user-facing applications',
    memberCount: 8,
    manager: 'alex-ruiz',
    projects: ['Design System', 'Mobile App', 'Dashboard', 'E-commerce Platform']
  }
];

// Activity feed data
export const activitiesData = [
  {
    id: 1,
    employeeId: 'rachel-green',
    type: 'self-assessment',
    message: 'completed her self Assessment today',
    timestamp: new Date('2024-01-15T10:30:00'),
    status: 'completed'
  },
  {
    id: 2,
    employeeId: 'julia-harvey',
    type: 'check-in',
    message: "It's been 3 months since your last check in with Julia",
    timestamp: new Date('2024-01-14T15:45:00'),
    status: 'reminder'
  },
  {
    id: 3,
    employeeId: 'jonah-smith',
    type: 'self-assessment',
    message: 'completed his self Assessment today',
    timestamp: new Date('2024-01-13T09:15:00'),
    status: 'completed'
  }
];
