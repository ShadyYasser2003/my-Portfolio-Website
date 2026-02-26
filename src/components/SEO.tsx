import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  type?: string;
}

export function SEO({ 
  title = 'Shady Yasser - DevOps Engineer Portfolio',
  description = 'DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation. Expert in AWS, Azure, Kubernetes, Docker, Terraform, and more.',
  keywords = 'DevOps Engineer, Cloud Infrastructure, AWS, Azure, Kubernetes, Docker, CI/CD, Terraform, Ansible, Portfolio',
  ogImage = '',
  url = typeof window !== 'undefined' ? window.location.href : '',
  type = 'website'
}: SEOProps) {
  
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', title.split('-')[0].trim());
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    
    // Open Graph meta tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    if (ogImage) updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', title.split('-')[0].trim(), true);
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (ogImage) updateMetaTag('twitter:image', ogImage);
    
    // Additional SEO meta tags
    updateMetaTag('theme-color', '#06b6d4'); // cyan-500
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    
  }, [title, description, keywords, ogImage, url, type]);

  return null;
}
