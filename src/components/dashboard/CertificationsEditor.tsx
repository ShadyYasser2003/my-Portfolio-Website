import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsEditorProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function CertificationsEditor({ data = [], onChange }: CertificationsEditorProps) {
  const addCertification = () => {
    onChange([...data, '']);
  };

  const removeCertification = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateCertification = (index: number, value: string) => {
    const newData = [...data];
    newData[index] = value;
    onChange(newData);
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl text-white">Certifications</h2>
        <Button onClick={addCertification} className="bg-cyan-500 hover:bg-cyan-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((cert, index) => (
          <div key={index} className="flex gap-4 items-start">
            <div className="flex-1">
              <Input
                value={cert}
                onChange={(e) => updateCertification(index, e.target.value)}
                placeholder="AWS Certified Solutions Architect - Professional"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
            <button
              onClick={() => removeCertification(index)}
              className="p-2 text-red-400 hover:bg-red-400/10 rounded transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            <p>No certifications added yet.</p>
            <p className="text-sm mt-2">Click "Add Certification" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
