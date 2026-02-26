import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { uploadFile } from '../../utils/api';

interface ProfileEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export function ProfileEditor({ data = {}, onChange }: ProfileEditorProps) {
  const [uploading, setUploading] = useState<'photo' | 'resume' | null>(null);

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'photo' | 'resume') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file types
    if (type === 'photo' && !file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    if (type === 'resume' && file.type !== 'application/pdf') {
      alert('Please upload a PDF file');
      return;
    }

    setUploading(type);
    try {
      const url = await uploadFile(file, type);
      const fieldName = type === 'photo' ? 'photoUrl' : 'resumeUrl';
      handleChange(fieldName, url);
      alert(`${type === 'photo' ? 'Photo' : 'Resume'} uploaded successfully!`);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      alert(`Failed to upload ${type}. Please try again.`);
    } finally {
      setUploading(null);
    }
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl text-white mb-8">Profile Information</h2>
      
      <div className="space-y-6">
        {/* Photo Upload */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4">Profile Photo</h3>
          <div className="flex items-center gap-6">
            {data.photoUrl && (
              <img
                src={data.photoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400"
              />
            )}
            <div className="flex-1">
              <Label htmlFor="photo-upload">Upload New Photo</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, 'photo')}
                  disabled={uploading === 'photo'}
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
                {uploading === 'photo' && (
                  <Button disabled className="bg-cyan-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </Button>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-1">Recommended: Square image, at least 400x400px</p>
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl text-white mb-4">Resume (PDF)</h3>
          <div>
            <Label htmlFor="resume-upload">Upload Resume</Label>
            <div className="flex gap-2 mt-2">
              <Input
                id="resume-upload"
                type="file"
                accept=".pdf"
                onChange={(e) => handleFileUpload(e, 'resume')}
                disabled={uploading === 'resume'}
                className="bg-slate-900/50 border-slate-600 text-white"
              />
              {uploading === 'resume' && (
                <Button disabled className="bg-cyan-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </Button>
              )}
            </div>
            {data.resumeUrl && (
              <p className="text-sm text-green-400 mt-2">
                ✓ Resume uploaded - <a href={data.resumeUrl} target="_blank" rel="noopener noreferrer" className="underline">View</a>
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={data.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Your Name"
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
          
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={data.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="DevOps Engineer"
              className="bg-slate-800/50 border-slate-700 text-white"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Textarea
            id="tagline"
            value={data.tagline || ''}
            onChange={(e) => handleChange('tagline', e.target.value)}
            placeholder="A brief description of what you do"
            rows={3}
            className="bg-slate-800/50 border-slate-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={data.bio || ''}
            onChange={(e) => handleChange('bio', e.target.value)}
            placeholder="Your professional bio"
            rows={4}
            className="bg-slate-800/50 border-slate-700 text-white"
          />
        </div>

        <div className="border-t border-slate-800 pt-6 mt-6">
          <h3 className="text-xl text-white mb-4">Contact Information</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={data.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={data.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="City, Country"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 mt-6">
          <h3 className="text-xl text-white mb-4">Social Links</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                value={data.github || ''}
                onChange={(e) => handleChange('github', e.target.value)}
                placeholder="https://github.com/username"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={data.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="https://linkedin.com/in/username"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            
            <div>
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={data.twitter || ''}
                onChange={(e) => handleChange('twitter', e.target.value)}
                placeholder="https://twitter.com/username"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
