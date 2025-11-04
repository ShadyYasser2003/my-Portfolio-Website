import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ce591799`;

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'API request failed');
  }
  
  return data.data;
}

export async function getPortfolioData() {
  return fetchAPI('/portfolio');
}

export async function updatePortfolioData(data: any) {
  return fetchAPI('/portfolio', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function uploadFile(file: File, type: 'photo' | 'resume') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  const response = await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
    },
    body: formData,
  });

  const data = await response.json();
  
  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Upload failed');
  }
  
  return data.url;
}

export async function sendContactMessage(name: string, email: string, message: string) {
  return fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify({ name, email, message }),
  });
}

export async function getContactMessages() {
  return fetchAPI('/contact/messages');
}

export async function getSection(section: string) {
  return fetchAPI(`/portfolio/${section}`);
}

export async function updateSection(section: string, data: any) {
  return fetchAPI(`/portfolio/${section}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
