import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface ExperienceEditorProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function ExperienceEditor({ data = [], onChange }: ExperienceEditorProps) {
  const addExperience = () => {
    onChange([
      ...data,
      {
        title: '',
        company: '',
        location: '',
        period: '',
        achievements: [],
      },
    ]);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const addAchievement = (expIndex: number) => {
    const newData = [...data];
    newData[expIndex].achievements = [...(newData[expIndex].achievements || []), ''];
    onChange(newData);
  };

  const removeAchievement = (expIndex: number, achIndex: number) => {
    const newData = [...data];
    newData[expIndex].achievements = newData[expIndex].achievements.filter(
      (_: any, i: number) => i !== achIndex
    );
    onChange(newData);
  };

  const updateAchievement = (expIndex: number, achIndex: number, value: string) => {
    const newData = [...data];
    newData[expIndex].achievements[achIndex] = value;
    onChange(newData);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl text-white">Work Experience</h2>
        <Button onClick={addExperience} className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((exp, index) => (
          <div key={index} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl text-white">Experience #{index + 1}</h3>
              <button
                onClick={() => removeExperience(index)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={exp.title || ''}
                    onChange={(e) => updateExperience(index, 'title', e.target.value)}
                    placeholder="Senior DevOps Engineer"
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company || ''}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    placeholder="Tech Solutions Inc."
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location || ''}
                    onChange={(e) => updateExperience(index, 'location', e.target.value)}
                    placeholder="Remote"
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label>Period</Label>
                  <Input
                    value={exp.period || ''}
                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                    placeholder="2022 - Present"
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Achievements & Responsibilities</Label>
                  <Button
                    onClick={() => addAchievement(index)}
                    size="sm"
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>

                <div className="space-y-2">
                  {(exp.achievements || []).map((achievement: string, achIndex: number) => (
                    <div key={achIndex} className="flex gap-2">
                      <Textarea
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                        placeholder="Describe an achievement or responsibility..."
                        rows={2}
                        className="flex-1 bg-slate-900/50 border-slate-600 text-white"
                      />
                      <button
                        onClick={() => removeAchievement(index, achIndex)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
