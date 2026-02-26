import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Plus, Trash2, X } from 'lucide-react';

interface ProjectsEditorProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function ProjectsEditor({ data = [], onChange }: ProjectsEditorProps) {
  const addProject = () => {
    onChange([
      ...data,
      {
        title: '',
        description: '',
        tech: [],
        icon: 'Server',
        gradient: 'from-cyan-400 to-blue-500',
        githubUrl: '',
        liveUrl: '',
      },
    ]);
  };

  const removeProject = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index: number, field: string, value: any) => {
    const newData = [...data];
    newData[index] = { ...newData[index], [field]: value };
    onChange(newData);
  };

  const addTech = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return;
    const newData = [...data];
    newData[projectIndex].tech = [...(newData[projectIndex].tech || []), tech];
    onChange(newData);
  };

  const removeTech = (projectIndex: number, techIndex: number) => {
    const newData = [...data];
    newData[projectIndex].tech = newData[projectIndex].tech.filter((_: any, i: number) => i !== techIndex);
    onChange(newData);
  };

  const gradientOptions = [
    'from-cyan-400 to-blue-500',
    'from-blue-400 to-purple-500',
    'from-purple-400 to-pink-500',
    'from-pink-400 to-red-500',
    'from-green-400 to-cyan-500',
    'from-yellow-400 to-orange-500',
  ];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl text-white">Projects</h2>
        <Button onClick={addProject} className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="space-y-6">
        {data.map((project, index) => (
          <div key={index} className="bg-slate-800/30 border border-slate-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl text-white">Project #{index + 1}</h3>
              <button
                onClick={() => removeProject(index)}
                className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Project Title</Label>
                <Input
                  value={project.title || ''}
                  onChange={(e) => updateProject(index, 'title', e.target.value)}
                  placeholder="Kubernetes Multi-Cloud Cluster"
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={project.description || ''}
                  onChange={(e) => updateProject(index, 'description', e.target.value)}
                  placeholder="Describe your project..."
                  rows={3}
                  className="bg-slate-900/50 border-slate-600 text-white"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Icon (Lucide React)</Label>
                  <Input
                    value={project.icon || ''}
                    onChange={(e) => updateProject(index, 'icon', e.target.value)}
                    placeholder="Server"
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label>Gradient</Label>
                  <select
                    value={project.gradient || gradientOptions[0]}
                    onChange={(e) => updateProject(index, 'gradient', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 text-white rounded-md"
                  >
                    {gradientOptions.map((gradient) => (
                      <option key={gradient} value={gradient}>
                        {gradient}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label>GitHub URL (optional)</Label>
                  <Input
                    value={project.githubUrl || ''}
                    onChange={(e) => updateProject(index, 'githubUrl', e.target.value)}
                    placeholder="https://github.com/..."
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label>Live URL (optional)</Label>
                  <Input
                    value={project.liveUrl || ''}
                    onChange={(e) => updateProject(index, 'liveUrl', e.target.value)}
                    placeholder="https://..."
                    className="bg-slate-900/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label>Technologies</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add technology (press Enter)"
                    className="bg-slate-900/50 border-slate-600 text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTech(index, e.currentTarget.value);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {(project.tech || []).map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-sm rounded-full flex items-center gap-2"
                    >
                      {tech}
                      <button
                        onClick={() => removeTech(index, techIndex)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
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
