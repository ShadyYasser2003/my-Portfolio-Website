import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface SEOEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export function SEOEditor({ data = {}, onChange }: SEOEditorProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl text-white mb-8">SEO Settings</h2>
      
      <div className="space-y-6">
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4">Meta Information</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="seo-title">Page Title (60-70 characters)</Label>
              <Input
                id="seo-title"
                value={data.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Shady Yasser - DevOps Engineer Portfolio"
                className="bg-slate-900/50 border-slate-600 text-white"
                maxLength={70}
              />
              <p className="text-xs text-slate-500 mt-1">
                Current length: {(data.title || '').length}/70
              </p>
            </div>

            <div>
              <Label htmlFor="seo-description">Meta Description (150-160 characters)</Label>
              <Textarea
                id="seo-description"
                value={data.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, and automation..."
                rows={3}
                className="bg-slate-900/50 border-slate-600 text-white"
                maxLength={160}
              />
              <p className="text-xs text-slate-500 mt-1">
                Current length: {(data.description || '').length}/160
              </p>
            </div>

            <div>
              <Label htmlFor="seo-keywords">Keywords (comma-separated)</Label>
              <Textarea
                id="seo-keywords"
                value={data.keywords || ''}
                onChange={(e) => handleChange('keywords', e.target.value)}
                placeholder="DevOps Engineer, Cloud Infrastructure, AWS, Azure, Kubernetes, Docker, CI/CD, Terraform"
                rows={3}
                className="bg-slate-900/50 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-500 mt-1">
                Add relevant keywords for search engines
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4">Social Media Preview</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="seo-ogImage">Open Graph Image URL</Label>
              <Input
                id="seo-ogImage"
                value={data.ogImage || ''}
                onChange={(e) => handleChange('ogImage', e.target.value)}
                placeholder="https://yourdomain.com/og-image.jpg"
                className="bg-slate-900/50 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-500 mt-1">
                Recommended size: 1200x630px. This image appears when sharing on social media.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-6">
          <h3 className="text-lg text-cyan-400 mb-2">SEO Tips</h3>
          <ul className="text-slate-300 text-sm space-y-2">
            <li>• Keep title under 60 characters for best display</li>
            <li>• Meta description should be 150-160 characters</li>
            <li>• Include your target keywords naturally</li>
            <li>• Use unique, compelling descriptions</li>
            <li>• Update keywords based on your skills and services</li>
            <li>• OG image improves social media sharing appearance</li>
          </ul>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-lg text-white mb-2">Current Optimizations</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Structured Data (JSON-LD)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Semantic HTML (H1, H2 tags)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Open Graph meta tags</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Twitter Card tags</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Mobile-responsive design</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Fast loading animations</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Alt text for images</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-400">✓</span>
              <span className="text-slate-300">Robots.txt friendly</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
