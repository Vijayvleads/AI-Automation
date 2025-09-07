
import React from 'react';
import { ICONS } from '../constants';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

const NavItem: React.FC<{
  view: AppView;
  label: string;
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}> = ({ view, label, currentView, setCurrentView }) => {
  const isActive = currentView === view;
  const activeClasses = 'bg-gray-700 text-white';
  const inactiveClasses = 'text-gray-400 hover:bg-gray-700 hover:text-white';

  return (
    <li className="mb-2">
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setCurrentView(view);
        }}
        className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
      >
        {ICONS[view]}
        <span className="ml-4 font-medium">{label}</span>
      </a>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 bg-gray-800/50 flex-shrink-0 p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center p-3 mb-6">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
            {ICONS.logo}
          </div>
          <span className="ml-3 text-xl font-bold text-white">AI Automator</span>
        </div>
        <nav>
          <ul>
            <NavItem view={AppView.DASHBOARD} label="Dashboard" currentView={currentView} setCurrentView={setCurrentView} />
            <NavItem view={AppView.PLANNER} label="Planner" currentView={currentView} setCurrentView={setCurrentView} />
            <NavItem view={AppView.LOGS} label="Logs" currentView={currentView} setCurrentView={setCurrentView} />
            <NavItem view={AppView.SETTINGS} label="Settings" currentView={currentView} setCurrentView={setCurrentView} />
          </ul>
        </nav>
      </div>
      <div className="text-center text-xs text-gray-500">
        <p>&copy; 2024 Self-Hosted Automation</p>
        <p>Powered by Gemini</p>
      </div>
    </aside>
  );
};

export default Sidebar;
