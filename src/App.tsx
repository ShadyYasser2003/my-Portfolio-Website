import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { AdminLogin } from './components/AdminLogin';
import { SEO } from './components/SEO';
import { StructuredData } from './components/StructuredData';
import { getPortfolioData } from './utils/api';

export default function App() {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadPortfolioData();
    checkAuth();
    
    // Handle browser back/forward
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const loadPortfolioData = async () => {
    try {
      const data = await getPortfolioData();
      setPortfolioData(data);
    } catch (error) {
      console.error('Error loading portfolio data:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAuth = () => {
    const authToken = sessionStorage.getItem('admin_auth');
    const authTime = sessionStorage.getItem('admin_auth_time');
    
    if (authToken && authTime) {
      const elapsed = Date.now() - parseInt(authTime);
      // Session expires after 2 hours
      if (elapsed < 2 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('admin_auth');
        sessionStorage.removeItem('admin_auth_time');
      }
    }
  };

  const handleLogin = (password: string) => {
    // Store password hash in database during first setup, then validate
    // For now, using a simple password (you should change this)
    const ADMIN_PASSWORD = 'admin123'; // Change this to your secure password
    
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_auth', 'true');
      sessionStorage.setItem('admin_auth_time', Date.now().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_auth_time');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
  };

  const handleDataUpdate = (newData: any) => {
    setPortfolioData(newData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-cyan-400 text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  // Admin dashboard route
  if (currentRoute === '/admin' || currentRoute === '/admin/') {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={handleLogin} />;
    }
    
    return (
      <Dashboard 
        data={portfolioData} 
        onUpdate={handleDataUpdate}
        onClose={() => navigate('/')}
        onLogout={handleLogout}
      />
    );
  }

  // Main portfolio
  const seoData = portfolioData?.seo || {};
  const profile = portfolioData?.profile || {};
  
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen text-white">
      <SEO 
        title={seoData.title || `${profile.name || 'Shady Yasser'} - ${profile.title || 'DevOps Engineer'} Portfolio`}
        description={seoData.description || profile.tagline}
        keywords={seoData.keywords}
        ogImage={seoData.ogImage || profile.photoUrl}
      />
      <StructuredData data={portfolioData} />
      <Navigation data={portfolioData} />
      <Hero data={portfolioData} />
      <About data={portfolioData} />
      <Skills data={portfolioData} />
      <Projects data={portfolioData} />
      <Experience data={portfolioData} />
      <Contact data={portfolioData} />
    </div>
  );
}
