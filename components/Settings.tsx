
import React, { useState } from 'react';
import { SettingsData } from '../types';
import { ICONS } from '../constants';

const SettingsCard: React.FC<{ title: string; description: string; children: React.ReactNode }> = ({ title, description, children }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

const Settings: React.FC<{ settings: SettingsData }> = ({ settings }) => {
  const [rssFeeds, setRssFeeds] = useState(settings.rssFeeds);
  const [brandVoice, setBrandVoice] = useState(settings.brandVoice);

  const toggleFeed = (id: string) => {
    setRssFeeds(feeds => feeds.map(feed => feed.id === id ? { ...feed, enabled: !feed.enabled } : feed));
  };
  
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Settings</h1>
      <p className="mt-1 text-gray-400 mb-6">Manage automation sources, voice, and connections.</p>
      
      <div className="space-y-8 max-w-4xl mx-auto">
        <SettingsCard 
          title="Brand Voice"
          description="Define the personality for all generated content. This instruction is passed to Gemini."
        >
          <textarea
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="e.g., 'Friendly, approachable, and excited about AI...'"
          />
        </SettingsCard>

        <SettingsCard
          title="RSS Feeds for AI News"
          description="Manage the list of sources for fetching content. The automation will fetch, deduplicate, and summarize from enabled feeds."
        >
          <div className="space-y-3">
            {rssFeeds.map(feed => (
              <div key={feed.id} className="flex items-center justify-between bg-gray-700/50 p-3 rounded-md">
                <div className="flex items-center">
                  <a href={feed.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline flex items-center">
                    {feed.url}
                    {ICONS.externalLink}
                  </a>
                </div>
                <label htmlFor={`toggle-${feed.id}`} className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input type="checkbox" id={`toggle-${feed.id}`} className="sr-only" checked={feed.enabled} onChange={() => toggleFeed(feed.id)} />
                    <div className={`block w-14 h-8 rounded-full ${feed.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
                    <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${feed.enabled ? 'transform translate-x-6' : ''}`}></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
           <button className="mt-4 px-4 py-2 text-sm font-medium bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
            Add New Feed
          </button>
        </SettingsCard>
        
        <SettingsCard
            title="API Connections & Scheduling"
            description="Manage connections to third-party services. API keys should be set via environment variables for security."
        >
            <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold text-white">Google Drive & Sheets</h4>
                        <p className="text-sm text-gray-400">Status: <span className="text-green-400">Connected</span></p>
                    </div>
                    <button className="text-sm font-medium text-red-400 hover:text-red-300">Disconnect</button>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold text-white">X / Twitter API</h4>
                        <p className="text-sm text-gray-400">Status: <span className="text-green-400">Connected</span></p>
                    </div>
                     <button className="text-sm font-medium text-red-400 hover:text-red-300">Disconnect</button>
                </div>
                 <div className="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg">
                    <div>
                        <h4 className="font-semibold text-white">LinkedIn API</h4>
                        <p className="text-sm text-gray-400">Status: <span className="text-yellow-400">Re-authentication needed</span></p>
                    </div>
                     <button className="text-sm font-medium text-blue-400 hover:text-blue-300">Connect</button>
                </div>
            </div>
        </SettingsCard>

        <div className="flex justify-end pt-4">
            <button className="px-6 py-2 font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg">
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
