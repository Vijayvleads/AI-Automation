
import React from 'react';
import { LogEntry } from '../types';

const getLogLevelClass = (level: 'INFO' | 'WARN' | 'ERROR') => {
  switch (level) {
    case 'INFO':
      return 'text-blue-400';
    case 'WARN':
      return 'text-yellow-400';
    case 'ERROR':
      return 'text-red-400';
  }
};

const getLogLevelBgClass = (level: 'INFO' | 'WARN' | 'ERROR') => {
  switch (level) {
    case 'INFO':
      return 'bg-blue-900/50';
    case 'WARN':
      return 'bg-yellow-900/50';
    case 'ERROR':
      return 'bg-red-900/50';
  }
};

const Logs: React.FC<{ logs: LogEntry[] }> = ({ logs }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Automation Logs</h1>
      <p className="mt-1 text-gray-400 mb-6">Detailed logs for the last automation run.</p>
      
      <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm">
        <div className="h-[70vh] overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className={`flex items-start p-2 rounded ${getLogLevelBgClass(log.level)} mb-1`}>
              <span className="text-gray-500 mr-4">{new Date(log.timestamp).toLocaleTimeString()}</span>
              <span className={`font-bold w-20 ${getLogLevelClass(log.level)}`}>{log.level}</span>
              <span className="font-semibold text-gray-300 w-40 mr-4">[{log.step}]</span>
              <span className="text-gray-400 flex-1 whitespace-pre-wrap">{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Logs;
