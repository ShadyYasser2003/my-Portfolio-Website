import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

interface ContactEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export function ContactEditor({ data = {}, onChange }: ContactEditorProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl text-white mb-8">Contact Page Settings</h2>

      <div className="space-y-6">
        <div>
          <Label htmlFor="introTitle">Section Title</Label>
          <Input
            id="introTitle"
            value={data.introTitle || ''}
            onChange={(e) => handleChange('introTitle', e.target.value)}
            placeholder="Get In Touch"
            className="bg-slate-800/50 border-slate-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="introText">Introduction Text</Label>
          <Textarea
            id="introText"
            value={data.introText || ''}
            onChange={(e) => handleChange('introText', e.target.value)}
            placeholder="Your introduction text..."
            rows={4}
            className="bg-slate-800/50 border-slate-700 text-white"
          />
        </div>

        <div>
          <Label htmlFor="formTitle">Contact Form Title</Label>
          <Input
            id="formTitle"
            value={data.formTitle || ''}
            onChange={(e) => handleChange('formTitle', e.target.value)}
            placeholder="Send a Message"
            className="bg-slate-800/50 border-slate-700 text-white"
          />
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 mt-6">
          <h3 className="text-lg text-white mb-2">Note</h3>
          <p className="text-slate-400 text-sm">
            Contact information (email, phone, location) is managed in the Profile section.
            Messages submitted through the contact form can be viewed in the Messages tab.
          </p>
        </div>
      </div>
    </div>
  );
}
