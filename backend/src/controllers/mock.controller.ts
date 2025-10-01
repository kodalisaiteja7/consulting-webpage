import { Request, Response } from 'express';

const mockJobs = [
  {
    _id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced frontend developer to join our team. You will be responsible for building modern, responsive web applications using React, TypeScript, and Tailwind CSS.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong knowledge of modern CSS frameworks (Tailwind, styled-components)',
      'Experience with state management (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Experience with build tools (Vite, Webpack)'
    ],
    responsibilities: [
      'Develop and maintain responsive web applications',
      'Collaborate with design team to implement UI/UX',
      'Write clean, maintainable, and well-tested code',
      'Participate in code reviews and technical discussions',
      'Optimize applications for maximum speed and scalability'
    ],
    location: 'San Francisco, CA',
    type: 'Full-time',
    department: 'Engineering',
    experience: 'Senior',
    salary: '$120,000 - $160,000',
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work hours and remote work options',
      'Professional development budget',
      'Stock options'
    ],
    applicationDeadline: '2025-02-15T00:00:00.000Z',
    isActive: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z'
  },
  {
    _id: '2',
    title: 'UX/UI Designer',
    description: 'Join our design team to create beautiful, user-centered digital experiences. You will work closely with product managers and developers to design intuitive interfaces.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio showcasing user-centered design',
      'Experience with design systems and component libraries',
      'Knowledge of accessibility standards (WCAG)'
    ],
    responsibilities: [
      'Create wireframes, prototypes, and high-fidelity designs',
      'Conduct user research and usability testing',
      'Collaborate with cross-functional teams',
      'Maintain and evolve design systems',
      'Present design concepts to stakeholders'
    ],
    location: 'New York, NY',
    type: 'Full-time',
    department: 'Design',
    experience: 'Mid-level',
    salary: '$80,000 - $110,000',
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work hours',
      'Design tools and software licenses',
      'Conference and training budget'
    ],
    applicationDeadline: '2025-02-20T00:00:00.000Z',
    isActive: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z'
  },
  {
    _id: '3',
    title: 'Backend Developer (Node.js)',
    description: 'We need a skilled backend developer to build scalable APIs and microservices. You will work with modern technologies like Node.js, Express, and MongoDB.',
    requirements: [
      '4+ years of Node.js and Express experience',
      'Strong knowledge of MongoDB and database design',
      'Experience with RESTful API development',
      'Familiarity with authentication and security best practices',
      'Experience with cloud platforms (AWS, Azure, GCP)'
    ],
    responsibilities: [
      'Design and develop RESTful APIs',
      'Implement authentication and authorization systems',
      'Optimize database queries and performance',
      'Write comprehensive tests for backend services',
      'Deploy and maintain applications in cloud environments'
    ],
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    experience: 'Mid-level',
    salary: '$100,000 - $140,000',
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Fully remote work',
      'Flexible schedule',
      'Professional development opportunities'
    ],
    applicationDeadline: '2025-02-25T00:00:00.000Z',
    isActive: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z'
  },
  {
    _id: '4',
    title: 'Product Manager',
    description: 'Lead product strategy and execution for our consulting platform. You will work with stakeholders to define product roadmap and drive feature development.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership abilities',
      'Technical background preferred'
    ],
    responsibilities: [
      'Define product strategy and roadmap',
      'Gather and prioritize product requirements',
      'Work closely with engineering and design teams',
      'Analyze user feedback and market trends',
      'Coordinate product launches and releases'
    ],
    location: 'Austin, TX',
    type: 'Full-time',
    department: 'Product',
    experience: 'Senior',
    salary: '$130,000 - $170,000',
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Stock options',
      'Flexible work arrangements',
      'Leadership development programs'
    ],
    applicationDeadline: '2025-03-01T00:00:00.000Z',
    isActive: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z'
  },
  {
    _id: '5',
    title: 'DevOps Engineer',
    description: 'Join our infrastructure team to build and maintain our cloud infrastructure. You will implement CI/CD pipelines and ensure system reliability.',
    requirements: [
      '3+ years of DevOps or infrastructure experience',
      'Experience with AWS, Azure, or GCP',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Experience with CI/CD tools (GitHub Actions, Jenkins)',
      'Scripting skills (Bash, Python, or PowerShell)'
    ],
    responsibilities: [
      'Design and implement cloud infrastructure',
      'Automate deployment and scaling processes',
      'Monitor system performance and reliability',
      'Implement security best practices',
      'Collaborate with development teams'
    ],
    location: 'Seattle, WA',
    type: 'Full-time',
    department: 'Engineering',
    experience: 'Mid-level',
    salary: '$110,000 - $150,000',
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work hours',
      'Cloud certification support',
      'Home office setup allowance'
    ],
    applicationDeadline: '2025-02-28T00:00:00.000Z',
    isActive: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z'
  },
  {
    _id: '6',
    title: 'Marketing Specialist',
    description: 'Help us grow our brand and reach new clients through strategic marketing initiatives. You will develop and execute marketing campaigns across multiple channels.',
    requirements: [
      '2+ years of marketing experience',
      'Experience with digital marketing tools and platforms',
      'Strong writing and communication skills',
      'Analytical mindset with data-driven approach',
      'Experience with social media and content marketing'
    ],
    responsibilities: [
      'Develop and execute marketing campaigns',
      'Create engaging content for various channels',
      'Manage social media presence',
      'Analyze campaign performance and optimize results',
      'Collaborate with sales and product teams'
    ],
    location: 'Chicago, IL',
    type: 'Full-time',
    department: 'Marketing',
    experience: 'Junior',
    salary: '$50,000 - $70,000',
    benefits: [
      'Health, dental, and vision insurance',
      '401(k) with company matching',
      'Flexible work arrangements',
      'Marketing tools and software access',
      'Professional development opportunities'
    ],
    applicationDeadline: '2025-03-05T00:00:00.000Z',
    isActive: true,
    createdAt: '2025-01-15T00:00:00.000Z',
    updatedAt: '2025-01-15T00:00:00.000Z'
  }
];

export const getMockJobs = async (req: Request, res: Response) => {
  try {
    const { search, type, location, department, experience } = req.query;
    
    let filteredJobs = [...mockJobs];
    
    // Apply filters
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm) ||
        job.requirements.some(req => req.toLowerCase().includes(searchTerm))
      );
    }
    
    if (type) {
      filteredJobs = filteredJobs.filter(job => job.type === type);
    }
    
    if (location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }
    
    if (department) {
      filteredJobs = filteredJobs.filter(job => job.department === department);
    }
    
    if (experience) {
      filteredJobs = filteredJobs.filter(job => job.experience === experience);
    }
    
    res.json({
      success: true,
      count: filteredJobs.length,
      data: filteredJobs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getMockJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const job = mockJobs.find(job => job._id === id);
    
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    res.json({
      success: true,
      data: job
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const submitMockApplication = async (req: Request, res: Response) => {
  try {
    const { jobId, name, email, phone, coverLetter } = req.body;
    
    // Validate required fields
    if (!jobId || !name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: jobId, name, email'
      });
    }
    
    // Check if job exists
    const job = mockJobs.find(job => job._id === jobId);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    // Simulate successful application
    const application = {
      _id: Date.now().toString(),
      jobId,
      name,
      email,
      phone: phone || '',
      coverLetter: coverLetter || '',
      status: 'submitted',
      submittedAt: new Date().toISOString()
    };
    
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
