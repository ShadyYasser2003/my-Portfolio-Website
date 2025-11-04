import { useEffect } from 'react';

interface StructuredDataProps {
  data: any;
}

export function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    const profile = data?.profile || {};
    const projects = data?.projects || [];
    const experiences = data?.experiences || [];
    
    // Person Schema
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profile.name || "Shady Yasser",
      "jobTitle": profile.title || "DevOps Engineer",
      "description": profile.bio || profile.tagline,
      "email": profile.email,
      "telephone": profile.phone,
      "url": window.location.origin,
      "image": profile.photoUrl || "",
      "sameAs": [
        profile.github,
        profile.linkedin,
        profile.twitter
      ].filter(Boolean),
      "address": {
        "@type": "PostalAddress",
        "addressLocality": profile.location
      },
      "knowsAbout": [
        "DevOps",
        "Cloud Infrastructure",
        "CI/CD",
        "Kubernetes",
        "Docker",
        "Terraform",
        "AWS",
        "Azure"
      ]
    };

    // Portfolio/ProfilePage Schema
    const profilePageSchema = {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateCreated": "2025-01-01T00:00:00+00:00",
      "dateModified": new Date().toISOString(),
      "mainEntity": {
        "@type": "Person",
        "name": profile.name || "Shady Yasser",
        "jobTitle": profile.title || "DevOps Engineer",
        "description": profile.bio || profile.tagline
      }
    };

    // Website Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": `${profile.name || 'Shady Yasser'} - Portfolio`,
      "description": profile.tagline,
      "url": window.location.origin,
      "author": {
        "@type": "Person",
        "name": profile.name || "Shady Yasser"
      }
    };

    // ItemList Schema for Projects
    const projectsSchema = projects.length > 0 ? {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Portfolio Projects",
      "description": "DevOps and Cloud Infrastructure Projects",
      "itemListElement": projects.slice(0, 6).map((project: any, index: number) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.description,
          "keywords": project.tech?.join(', ')
        }
      }))
    } : null;

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": window.location.origin
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Portfolio",
          "item": window.location.href
        }
      ]
    };

    // Combine all schemas
    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        personSchema,
        profilePageSchema,
        websiteSchema,
        breadcrumbSchema,
        ...(projectsSchema ? [projectsSchema] : [])
      ]
    };

    // Remove existing script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

  }, [data]);

  return null;
}
