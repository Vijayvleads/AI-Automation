
import React, { useState } from 'react';
import { DailyRunData, PostIdea } from '../types';
import { ICONS } from '../constants';

const PostIdeaCard: React.FC<{ idea: PostIdea }> = ({ idea }) => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'x' | 'instagram'>('linkedin');
  const [image, setImage] = useState<string | null>(idea.imageUrl || null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add a small toast/notification if desired
  };

  const TabButton: React.FC<{ platform: 'linkedin' | 'x' | 'instagram'; label: string }> = ({ platform, label }) => (
    <button
      onClick={() => setActiveTab(platform)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
        activeTab === platform ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">#{idea.rank}: {idea.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{idea.summary}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Side: Image */}
          <div className="md:col-span-1">
             <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                {image ? (
                    <img src={image} alt="Generated post visualization" className="w-full h-full object-cover" />
                ) : (
                    <div className="text-center text-gray-400 p-4">
                        <p className="font-semibold mb-2">Image Prompts</p>
                        <ul className="text-xs list-disc list-inside">
                            {idea.imagePrompts.map((prompt, i) => <li key={i}>{prompt}</li>)}
                        </ul>
                    </div>
                )}
            </div>
            <button className="w-full mt-2 bg-indigo-600 text-white py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-colors">
                Generate Image
            </button>
          </div>

          {/* Right Side: Content */}
          <div className="md:col-span-2">
            <div className="flex space-x-2 mb-4">
              <TabButton platform="linkedin" label="LinkedIn" />
              <TabButton platform="x" label="X" />
              <TabButton platform="instagram" label="Instagram" />
            </div>

            <div className="bg-gray-900/50 p-4 rounded-lg h-48 overflow-y-auto text-sm leading-relaxed relative">
              <p>
                {activeTab === 'linkedin' && idea.copies.linkedIn}
                {activeTab === 'x' && idea.copies.x}
                {activeTab === 'instagram' && idea.copies.instagram}
              </p>
              <button onClick={() => copyToClipboard(idea.copies[activeTab === 'linkedin' ? 'linkedIn' : activeTab === 'x' ? 'x' : 'instagram'])} className="absolute top-2 right-2 p-1.5 bg-gray-600/50 rounded-md hover:bg-gray-500/50">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                  </svg>
              </button>
            </div>
            
            <div className="mt-4">
              <p className="text-xs text-gray-400 font-semibold mb-2">Hashtags:</p>
              <div className="flex flex-wrap gap-2">
                {idea.hashtags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-700 text-blue-300 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
         <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400 font-semibold mb-2">Sources:</p>
            <div className="flex flex-col space-y-1">
                {idea.sources.map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline truncate flex items-center">
                        {src} {ICONS.externalLink}
                    </a>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC<{ dailyRunData: DailyRunData }> = ({ dailyRunData }) => {
  const { topUpdates, postIdeas } = dailyRunData;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Daily AI Content Plan</h1>
        <p className="mt-1 text-gray-400">Today's top AI news, summarized and ready for social media.</p>
      </div>

      {/* Top AI Updates */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Top AI Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topUpdates.map(article => (
            <div key={article.id} className="bg-gray-800 p-5 rounded-lg">
              <h3 className="font-bold text-gray-200">{article.title}</h3>
              <p className="text-sm text-gray-400 mt-2 mb-3">{article.summary}</p>
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center">
                Read from {article.source} {ICONS.externalLink}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Generated Post Ideas */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Generated Post Ideas</h2>
        <div className="space-y-6">
          {postIdeas.sort((a,b) => a.rank - b.rank).map(idea => (
            <PostIdeaCard key={idea.rank} idea={idea} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
