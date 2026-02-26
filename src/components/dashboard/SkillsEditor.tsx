import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { Slider } from '../ui/slider';

interface SkillsEditorProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function SkillsEditor({ data = [], onChange }: SkillsEditorProps) {
  const addCategory = () => {
    onChange([...data, { title: '', skills: [] }]);
  };

  const removeCategory = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCategory = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const addSkill = (categoryIndex: number) => {
    const newData = [...data];
    newData[categoryIndex].skills = [...newData[categoryIndex].skills, { name: '', level: 50 }];
    onChange(newData);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const newData = [...data];
    newData[categoryIndex].skills = newData[categoryIndex].skills.filter((_: any, i: number) => i !== skillIndex);
    onChange(newData);
  };

  const updateSkill = (categoryIndex: number, skillIndex: number, field: string, value: any) => {
    const newData = [...data];
    newData[categoryIndex].skills[skillIndex] = {
      ...newData[categoryIndex].skills[skillIndex],
      [field]: value,
    };
    onChange(newData);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl text-white">Skills & Technologies</h2>
        <Button onClick={addCategory} className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <Input
                value={category.title || ''}
                onChange={(e) => updateCategory(categoryIndex, 'title', e.target.value)}
                placeholder="Category Title (e.g., Cloud Platforms)"
                className="flex-1 bg-slate-900/50 border-slate-600 text-white text-lg"
              />
              <Button
                onClick={() => addSkill(categoryIndex)}
                size="sm"
                variant="outline"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
              <button
                onClick={() => removeCategory(categoryIndex)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {(category.skills || []).map((skill: any, skillIndex: number) => (
                <div key={skillIndex} className="bg-slate-900/50 border border-slate-600 rounded-lg p-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4">
                      <Label className="text-xs text-slate-400 mb-1">Skill Name</Label>
                      <Input
                        value={skill.name || ''}
                        onChange={(e) => updateSkill(categoryIndex, skillIndex, 'name', e.target.value)}
                        placeholder="e.g., Docker"
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    
                    <div className="col-span-7">
                      <Label className="text-xs text-slate-400 mb-1">
                        Proficiency: {skill.level || 50}%
                      </Label>
                      <Slider
                        value={[skill.level || 50]}
                        onValueChange={(value) => updateSkill(categoryIndex, skillIndex, 'level', value[0])}
                        min={0}
                        max={100}
                        step={5}
                        className="mt-2"
                      />
                    </div>
                    
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => removeSkill(categoryIndex, skillIndex)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
