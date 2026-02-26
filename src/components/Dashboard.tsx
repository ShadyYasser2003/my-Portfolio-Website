import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, User, Briefcase, Code, FolderGit2, Award, Mail, CheckCircle, MessageSquare, LogOut, Search } from 'lucide-react';
import { updatePortfolioData } from '../utils/api';
import { ProfileEditor } from './dashboard/ProfileEditor';
import { AboutEditor } from './dashboard/AboutEditor';
import { SkillsEditor } from './dashboard/SkillsEditor';
import { ProjectsEditor } from './dashboard/ProjectsEditor';
import { ExperienceEditor } from './dashboard/ExperienceEditor';
import { CertificationsEditor } from './dashboard/CertificationsEditor';
import { ContactEditor } from './dashboard/ContactEditor';
import { MessagesViewer } from './dashboard/MessagesViewer';
import { SEOEditor } from './dashboard/SEOEditor';

interface DashboardProps {
  data: any;
  onUpdate: (data: any) => void;
  onClose: () => void;
  onLogout?: () => void;
}

export function Dashboard({ data, onUpdate, onClose, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [editData, setEditData] = useState(data);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'about', label: 'About', icon: Mail },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'contact', label: 'Contact Page', icon: Mail },
    { id: 'seo', label: 'SEO Settings', icon: Search },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const updatedData = await updatePortfolioData(editData);
      onUpdate(updatedData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving portfolio data:', error);
      alert('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateSection = (section: string, sectionData: any) => {
    setEditData({ ...editData, [section]: sectionData });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-sm overflow-hidden"
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl text-white">Portfolio Dashboard</h1>
              <p className="text-slate-400 text-sm mt-1">Manage your portfolio content</p>
            </div>
            <div className="flex items-center gap-3">
              {saved && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Saved!</span>
                </motion.div>
              )}
              {activeTab !== 'messages' && activeTab !== 'seo' && activeTab !== 'contact' && (
                <span className="text-xs text-slate-400">Remember to update SEO settings</span>
              )}
              {activeTab !== 'messages' && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </motion.button>
              )}
              {onLogout && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onLogout}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                title="Back to Portfolio"
              >
                <X className="w-6 h-6 text-slate-400" />
              </motion.button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar */}
          <div className="w-64 bg-slate-900/50 border-r border-slate-800 p-4 overflow-y-auto">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'profile' && (
                <ProfileEditor data={editData.profile} onChange={(data) => updateSection('profile', data)} />
              )}
              {activeTab === 'about' && (
                <AboutEditor data={editData.about} onChange={(data) => updateSection('about', data)} />
              )}
              {activeTab === 'skills' && (
                <SkillsEditor data={editData.skills} onChange={(data) => updateSection('skills', data)} />
              )}
              {activeTab === 'projects' && (
                <ProjectsEditor data={editData.projects} onChange={(data) => updateSection('projects', data)} />
              )}
              {activeTab === 'experience' && (
                <ExperienceEditor data={editData.experiences} onChange={(data) => updateSection('experiences', data)} />
              )}
              {activeTab === 'certifications' && (
                <CertificationsEditor data={editData.certifications} onChange={(data) => updateSection('certifications', data)} />
              )}
              {activeTab === 'contact' && (
                <ContactEditor data={editData.contact} onChange={(data) => updateSection('contact', data)} />
              )}
              {activeTab === 'seo' && (
                <SEOEditor data={editData.seo} onChange={(data) => updateSection('seo', data)} />
              )}
              {activeTab === 'messages' && (
                <MessagesViewer />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
