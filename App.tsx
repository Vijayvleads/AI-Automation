
import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Planner from './components/Planner';
import Logs from './components/Logs';
import Settings from './components/Settings';
import { DailyRunData, AutomationData } from './types';
import { generateDailyRunData } from './services/geminiService';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [data, setData] = useState<AutomationData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateDailyRunData();
      setData(result);
    } catch (err) {
      console.error("Failed to generate daily run data:", err);
      setError("Failed to fetch automation data. Please ensure your API key is configured correctly.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderView = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-lg text-gray-400">Initializing Automation Dashboard...</p>
          <p className="text-sm text-gray-500">Generating today's AI content plan with Gemini.</p>
        </div>
      );
    }

    if (error) {
       return (
        <div className="flex flex-col items-center justify-center h-full bg-gray-800 p-8 rounded-lg">
           <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
           </div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">An Error Occurred</h2>
          <p className="text-gray-300 text-center">{error}</p>
          <button onClick={fetchData} className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Retry
          </button>
        </div>
      );
    }
    
    if (!data) return null;

    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard dailyRunData={data.dailyRun} />;
      case AppView.PLANNER:
        return <Planner scheduledPosts={data.planner} />;
      case AppView.LOGS:
        return <Logs logs={data.logs} />;
      case AppView.SETTINGS:
        return <Settings settings={data.settings} />;
      default:
        return <Dashboard dailyRunData={data.dailyRun} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        {renderView()}
      </main>
    </div>
  );
};

export default App;
