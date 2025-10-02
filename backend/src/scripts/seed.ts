import mongoose from 'mongoose';
import { Job } from '../models/Job';
import { connectToDatabase } from '../config/db';

const dummyJobs = [
  {
    _title: 'Senior Frontend Developer',
    slug: 'senior-frontend-developer',
    description: 'We are looking for an experienced frontend developer to join our team. You will be responsible for building modern, responsive web applications using React, TypeScript, and Tailwind CSS.',
    requirements: [
      '5+ years of experience with React and TypeScript',
      'Strong knowledge of modern CSS frameworks (Tailwind, styled-components)',
      'Experience with state management (Redux, Zustand)',
      'Familiarity with testing frameworks (Jest, React Testing Library)',
      'Experience with build tools (Vite, Webpack)'
    ],
    location: 'San Francisco, CA',
    type: 'full-time',
    department: 'Engineering',
    experienceLevel: 'senior',
    active: true
  },
  {
    _title: 'UX/UI Designer',
    slug: 'ux-ui-designer',
    description: 'Join our design team to create beautiful, user-centered digital experiences. You will work closely with product managers and developers to design intuitive interfaces.',
    requirements: [
      '3+ years of UX/UI design experience',
      'Proficiency in Figma, Sketch, or Adobe Creative Suite',
      'Strong portfolio showcasing user-centered design',
      'Experience with design systems and component libraries',
      'Knowledge of accessibility standards (WCAG)'
    ],
    location: 'New York, NY',
    type: 'full-time',
    department: 'Design',
    experienceLevel: 'mid',
    active: true
  },
  {
    _title: 'Backend Developer (Node.js)',
    slug: 'backend-developer-nodejs',
    description: 'We need a skilled backend developer to build scalable APIs and microservices. You will work with modern technologies like Node.js, Express, and MongoDB.',
    requirements: [
      '4+ years of Node.js and Express experience',
      'Strong knowledge of MongoDB and database design',
      'Experience with RESTful API development',
      'Familiarity with authentication and security best practices',
      'Experience with cloud platforms (AWS, Azure, GCP)'
    ],
    location: 'Remote',
    type: 'remote',
    department: 'Engineering',
    experienceLevel: 'mid',
    active: true
  },
  {
    _title: 'Product Manager',
    slug: 'product-manager',
    description: 'Lead product strategy and execution for our consulting platform. You will work with stakeholders to define product roadmap and drive feature development.',
    requirements: [
      '5+ years of product management experience',
      'Strong analytical and problem-solving skills',
      'Experience with agile development methodologies',
      'Excellent communication and leadership abilities',
      'Technical background preferred'
    ],
    location: 'Austin, TX',
    type: 'full-time',
    department: 'Product',
    experienceLevel: 'senior',
    active: true
  },
  {
    _title: 'DevOps Engineer',
    slug: 'devops-engineer',
    description: 'Join our infrastructure team to build and maintain our cloud infrastructure. You will implement CI/CD pipelines and ensure system reliability.',
    requirements: [
      '3+ years of DevOps or infrastructure experience',
      'Experience with AWS, Azure, or GCP',
      'Knowledge of containerization (Docker, Kubernetes)',
      'Experience with CI/CD tools (GitHub Actions, Jenkins)',
      'Scripting skills (Bash, Python, or PowerShell)'
    ],
    location: 'Seattle, WA',
    type: 'full-time',
    department: 'Engineering',
    experienceLevel: 'mid',
    active: true
  },
  {
    _title: 'Marketing Specialist',
    slug: 'marketing-specialist',
    description: 'Help us grow our brand and reach new clients through strategic marketing initiatives. You will develop and execute marketing campaigns across multiple channels.',
    requirements: [
      '2+ years of marketing experience',
      'Experience with digital marketing tools and platforms',
      'Strong writing and communication skills',
      'Analytical mindset with data-driven approach',
      'Experience with social media and content marketing'
    ],
    location: 'Chicago, IL',
    type: 'full-time',
    department: 'Marketing',
    experienceLevel: 'junior',
    active: true
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();
    
    console.log('Clearing existing jobs...');
    await Job.deleteMany({});
    
    console.log('Seeding database with dummy jobs...');
    const createdJobs = await Job.insertMany(dummyJobs);
    
    console.log(`Successfully created ${createdJobs.length} jobs:`);
    createdJobs.forEach(job => {
      console.log(`- ${job._title} (${job.location})`);
    });
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
