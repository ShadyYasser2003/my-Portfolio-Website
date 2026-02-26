import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Initialize storage bucket
const BUCKET_NAME = 'make-ce591799-portfolio';

async function initializeBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      if (error) {
        console.log('Error creating bucket:', error);
      } else {
        console.log('Portfolio bucket created successfully');
      }
    }
  } catch (error) {
    console.log('Error initializing bucket:', error);
  }
}

// Initialize bucket on server start
initializeBucket();

// Default portfolio data
const getDefaultData = () => ({
  profile: {
    name: 'Shady Yasser',
    title: 'DevOps Engineer',
    tagline: 'Specializing in cloud infrastructure, CI/CD pipelines, and automation. I build scalable systems that empower development teams to ship faster and more reliably.',
    bio: "I'm a passionate DevOps Engineer with a strong focus on building and maintaining scalable cloud infrastructure.",
    email: 'shady.yasser@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Available for Remote Work',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com',
    photoUrl: '',
    resumeUrl: '',
  },
  about: {
    paragraphs: [
      "I'm a passionate DevOps Engineer with a strong focus on building and maintaining scalable cloud infrastructure. My journey in tech has been driven by a love for automation and solving complex infrastructure challenges.",
      "With extensive experience in cloud platforms, containerization, and CI/CD pipelines, I help teams streamline their development workflows and achieve continuous deployment with confidence.",
      "I believe in Infrastructure as Code, security best practices, and building systems that are not just functional, but elegant and maintainable."
    ],
    highlights: [
      { icon: 'Cloud', title: 'Cloud Infrastructure', desc: 'AWS, Azure, GCP expertise' },
      { icon: 'Server', title: 'Container Orchestration', desc: 'Docker & Kubernetes' },
      { icon: 'Code2', title: 'Infrastructure as Code', desc: 'Terraform, Ansible, CloudFormation' },
      { icon: 'Zap', title: 'CI/CD Automation', desc: 'Jenkins, GitLab CI, GitHub Actions' },
    ],
  },
  skills: [
    {
      title: 'Cloud Platforms',
      skills: [
        { name: 'AWS', level: 95 },
        { name: 'Azure', level: 85 },
        { name: 'Google Cloud', level: 80 },
        { name: 'DigitalOcean', level: 90 },
      ],
    },
    {
      title: 'Container & Orchestration',
      skills: [
        { name: 'Docker', level: 95 },
        { name: 'Kubernetes', level: 90 },
        { name: 'Helm', level: 85 },
        { name: 'Docker Compose', level: 95 },
      ],
    },
    {
      title: 'CI/CD Tools',
      skills: [
        { name: 'Jenkins', level: 90 },
        { name: 'GitLab CI', level: 95 },
        { name: 'GitHub Actions', level: 90 },
        { name: 'ArgoCD', level: 85 },
      ],
    },
    {
      title: 'Infrastructure as Code',
      skills: [
        { name: 'Terraform', level: 95 },
        { name: 'Ansible', level: 90 },
        { name: 'CloudFormation', level: 85 },
        { name: 'Pulumi', level: 75 },
      ],
    },
    {
      title: 'Monitoring & Logging',
      skills: [
        { name: 'Prometheus', level: 90 },
        { name: 'Grafana', level: 90 },
        { name: 'ELK Stack', level: 85 },
        { name: 'Datadog', level: 80 },
      ],
    },
    {
      title: 'Programming & Scripting',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Bash', level: 95 },
        { name: 'Go', level: 75 },
        { name: 'PowerShell', level: 80 },
      ],
    },
  ],
  projects: [
    {
      title: 'Kubernetes Multi-Cloud Cluster',
      description: 'Built and managed a production-grade Kubernetes cluster across AWS and GCP, implementing auto-scaling, monitoring, and disaster recovery.',
      tech: ['Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Helm'],
      icon: 'Server',
      gradient: 'from-cyan-400 to-blue-500',
      githubUrl: '',
      liveUrl: '',
    },
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Designed and implemented end-to-end CI/CD pipelines reducing deployment time by 70% and enabling daily releases with zero downtime.',
      tech: ['Jenkins', 'GitLab CI', 'Docker', 'ArgoCD', 'SonarQube'],
      icon: 'Cloud',
      gradient: 'from-blue-400 to-purple-500',
      githubUrl: '',
      liveUrl: '',
    },
    {
      title: 'Infrastructure as Code Framework',
      description: 'Created reusable Terraform modules for AWS infrastructure, enabling teams to provision environments in minutes with consistent security policies.',
      tech: ['Terraform', 'AWS', 'Python', 'Ansible', 'Vault'],
      icon: 'Database',
      gradient: 'from-purple-400 to-pink-500',
      githubUrl: '',
      liveUrl: '',
    },
    {
      title: 'Observability Stack Implementation',
      description: 'Deployed comprehensive monitoring solution with Prometheus, Grafana, and ELK stack, providing real-time insights across 50+ microservices.',
      tech: ['Prometheus', 'Grafana', 'Elasticsearch', 'Kibana', 'Fluentd'],
      icon: 'Server',
      gradient: 'from-pink-400 to-red-500',
      githubUrl: '',
      liveUrl: '',
    },
    {
      title: 'Security Hardening Automation',
      description: 'Automated security compliance checks and vulnerability scanning in CI/CD pipeline, improving security posture by 85%.',
      tech: ['Trivy', 'OWASP', 'Vault', 'AWS Security Hub', 'Python'],
      icon: 'Cloud',
      gradient: 'from-green-400 to-cyan-500',
      githubUrl: '',
      liveUrl: '',
    },
    {
      title: 'Cloud Cost Optimization',
      description: 'Implemented automated cost optimization strategies across multi-cloud infrastructure, reducing monthly cloud spend by 45%.',
      tech: ['AWS Cost Explorer', 'Terraform', 'Python', 'Lambda', 'CloudWatch'],
      icon: 'Database',
      gradient: 'from-yellow-400 to-orange-500',
      githubUrl: '',
      liveUrl: '',
    },
  ],
  experiences: [
    {
      title: 'Senior DevOps Engineer',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      period: '2022 - Present',
      achievements: [
        'Led migration of monolithic applications to microservices architecture on Kubernetes',
        'Reduced deployment time by 70% through CI/CD pipeline optimization',
        'Implemented comprehensive monitoring and alerting system across all environments',
        'Mentored junior engineers on DevOps best practices and cloud technologies',
      ],
    },
    {
      title: 'DevOps Engineer',
      company: 'Cloud Innovations Ltd.',
      location: 'Hybrid',
      period: '2020 - 2022',
      achievements: [
        'Designed and deployed AWS infrastructure using Terraform and CloudFormation',
        'Automated infrastructure provisioning reducing setup time from days to hours',
        'Implemented security best practices including secrets management with Vault',
        'Managed multi-environment Kubernetes clusters serving 2M+ daily users',
      ],
    },
    {
      title: 'Junior DevOps Engineer',
      company: 'StartUp Tech',
      location: 'On-site',
      period: '2019 - 2020',
      achievements: [
        'Built and maintained CI/CD pipelines using Jenkins and GitLab CI',
        'Automated deployment processes for multiple microservices',
        'Collaborated with development teams to optimize application performance',
        'Implemented logging and monitoring solutions using ELK stack',
      ],
    },
  ],
  certifications: [
    'AWS Certified Solutions Architect - Professional',
    'Certified Kubernetes Administrator (CKA)',
    'HashiCorp Certified: Terraform Associate',
    'Google Cloud Professional Cloud Architect',
  ],
  contact: {
    introTitle: 'Get In Touch',
    introText: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!",
    formTitle: 'Send a Message',
  },
  seo: {
    title: 'Shady Yasser - DevOps Engineer Portfolio',
    description: 'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation. Expert in AWS, Azure, Kubernetes, Docker, Terraform, and more.',
    keywords: 'DevOps Engineer, Cloud Infrastructure, AWS, Azure, Kubernetes, Docker, CI/CD, Terraform, Ansible, Jenkins, GitLab CI, GitHub Actions, Infrastructure as Code, Portfolio, Shady Yasser',
    ogImage: '',
  },
});

// Upload file endpoint
app.post('/make-server-ce591799/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'photo' or 'resume'
    
    if (!file) {
      return c.json({ success: false, error: 'No file provided' }, 400);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `${type}-${timestamp}.${extension}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, file, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.log('Upload error:', error);
      return c.json({ success: false, error: error.message }, 500);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return c.json({ success: true, url: publicUrl });
  } catch (error) {
    console.log('Error uploading file:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Save contact message
app.post('/make-server-ce591799/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, message } = body;
    
    if (!name || !email || !message) {
      return c.json({ success: false, error: 'Missing required fields' }, 400);
    }

    // Get existing messages
    const messages = await kv.get('contact_messages') || [];
    
    // Add new message
    const newMessage = {
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    };
    
    messages.push(newMessage);
    await kv.set('contact_messages', messages);

    return c.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.log('Error saving contact message:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get contact messages
app.get('/make-server-ce591799/contact/messages', async (c) => {
  try {
    const messages = await kv.get('contact_messages') || [];
    return c.json({ success: true, data: messages });
  } catch (error) {
    console.log('Error fetching contact messages:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get all portfolio data
app.get('/make-server-ce591799/portfolio', async (c) => {
  try {
    const data = await kv.get('portfolio_data');
    
    if (!data) {
      // Auto-initialize with default data
      const defaultData = getDefaultData();
      await kv.set('portfolio_data', defaultData);
      return c.json({ success: true, data: defaultData });
    }
    
    return c.json({ success: true, data });
  } catch (error) {
    console.log('Error fetching portfolio data:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update portfolio data
app.post('/make-server-ce591799/portfolio', async (c) => {
  try {
    const body = await c.req.json();
    await kv.set('portfolio_data', body);
    return c.json({ success: true, data: body });
  } catch (error) {
    console.log('Error updating portfolio data:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Get specific section
app.get('/make-server-ce591799/portfolio/:section', async (c) => {
  try {
    const section = c.req.param('section');
    const data = await kv.get('portfolio_data');
    
    if (!data || !data[section]) {
      return c.json({ success: false, error: 'Section not found' }, 404);
    }
    
    return c.json({ success: true, data: data[section] });
  } catch (error) {
    console.log(`Error fetching portfolio section:`, error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// Update specific section
app.post('/make-server-ce591799/portfolio/:section', async (c) => {
  try {
    const section = c.req.param('section');
    const body = await c.req.json();
    const data = await kv.get('portfolio_data') || {};
    
    data[section] = body;
    await kv.set('portfolio_data', data);
    
    return c.json({ success: true, data: data[section] });
  } catch (error) {
    console.log(`Error updating portfolio section:`, error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

Deno.serve(app.fetch);
