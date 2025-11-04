import React from 'react';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface AboutEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export function AboutEditor({ data = { paragraphs: [], highlights: [] }, onChange }: AboutEditorProps) {
  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...(data.paragraphs || [])];
    newParagraphs[index] = value;
    onChange({ ...data, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    onChange({ ...data, paragraphs: [...(data.paragraphs || []), ''] });
  };

  const removeParagraph = (index: number) => {
    const newParagraphs = (data.paragraphs || []).filter((_: any, i: number) => i !== index);
    onChange({ ...data, paragraphs: newParagraphs });
  };

  const handleHighlightChange = (index: number, field: string, value: string) => {
    const newHighlights = [...(data.highlights || [])];
    newHighlights[index] = { ...newHighlights[index], [field]: value };
    onChange({ ...data, highlights: newHighlights });
  };

  const addHighlight = () => {
    onChange({
      ...data,
      highlights: [...(data.highlights || []), { icon: 'Cloud', title: '', desc: '' }],
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = (data.highlights || []).filter((_: any, i: number) => i !== index);
    onChange({ ...data, highlights: newHighlights });
  };

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl text-white mb-8">About Section</h2>

      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>About Paragraphs</Label>
            <Button onClick={addParagraph} size="sm" className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Paragraph
            </Button>
          </div>
          
          <div className="space-y-4">
            {(data.paragraphs || []).map((paragraph: string, index: number) => (
              <div key={index} className="relative">
                <Textarea
                  value={paragraph}
                  onChange={(e) => handleParagraphChange(index, e.target.value)}
                  placeholder="Enter paragraph text..."
                  rows={4}
                  className="bg-slate-800/50 border-slate-700 text-white pr-12"
                />
                <button
                  onClick={() => removeParagraph(index)}
                  className="absolute top-2 right-2 p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <div className="flex items-center justify-between mb-4">
            <Label>Highlights</Label>
            <Button onClick={addHighlight} size="sm" className="bg-cyan-500 hover:bg-cyan-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Highlight
            </Button>
          </div>

          <div className="space-y-6">
            {(data.highlights || []).map((highlight: any, index: number) => (
              <div key={index} className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 relative">
                <button
                  onClick={() => removeHighlight(index)}
                  className="absolute top-2 right-2 p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Icon</Label>
                    <Input
                      value={highlight.icon || ''}
                      onChange={(e) => handleHighlightChange(index, 'icon', e.target.value)}
                      placeholder="Cloud"
                      className="bg-slate-900/50 border-slate-600 text-white"
                    />
                    <p className="text-xs text-slate-500 mt-1">Icon name from lucide-react</p>
                  </div>
                  
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={highlight.title || ''}
                      onChange={(e) => handleHighlightChange(index, 'title', e.target.value)}
                      placeholder="Cloud Infrastructure"
                      className="bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label>Description</Label>
                    <Input
                      value={highlight.desc || ''}
                      onChange={(e) => handleHighlightChange(index, 'desc', e.target.value)}
                      placeholder="AWS, Azure, GCP"
                      className="bg-slate-900/50 border-slate-600 text-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
