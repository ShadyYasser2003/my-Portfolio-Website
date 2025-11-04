import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, Calendar, RefreshCw } from 'lucide-react';
import { getContactMessages } from '../../utils/api';
import { Button } from '../ui/button';

export function MessagesViewer() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = async () => {
    setLoading(true);
    try {
      const data = await getContactMessages();
      setMessages(data.reverse()); // Show newest first
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl text-white">Contact Messages</h2>
          <p className="text-slate-400 mt-1">Messages submitted through your contact form</p>
        </div>
        <Button
          onClick={loadMessages}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">
          <div className="animate-spin w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <Mail className="w-16 h-16 mx-auto mb-4 text-slate-700" />
          <p>No messages yet.</p>
          <p className="text-sm mt-2">Messages will appear here when visitors use your contact form.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 hover:border-cyan-400/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg text-white">{message.name}</h3>
                  <a
                    href={`mailto:${message.email}`}
                    className="text-cyan-400 hover:underline text-sm"
                  >
                    {message.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {formatDate(message.timestamp)}
                </div>
              </div>
              <p className="text-slate-300 whitespace-pre-wrap">{message.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
