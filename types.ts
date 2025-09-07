
export interface Article {
  id: string;
  title: string;
  link: string;
  source: string;
  summary: string;
}

export interface PostCopy {
  linkedIn: string;
  x: string;
  instagram: string;
}

export interface PostIdea {
  rank: number;
  title: string;
  summary: string;
  sources: string[];
  copies: PostCopy;
  hashtags: string[];
  imagePrompts: string[];
  imageUrl?: string;
}

export interface ScheduledPost {
  id: string;
  platform: 'LinkedIn' | 'X' | 'Instagram';
  content: string;
  imageUrl?: string;
  postTime: string;
  status: 'Scheduled' | 'Posted' | 'Failed';
  postUrl?: string;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  step: string;
  message: string;
}

export interface DailyRunData {
  topUpdates: Article[];
  postIdeas: PostIdea[];
}

export interface SettingsData {
    rssFeeds: { id: string; url: string; enabled: boolean }[];
    brandVoice: string;
}

export interface AutomationData {
    dailyRun: DailyRunData;
    planner: ScheduledPost[];
    logs: LogEntry[];
    settings: SettingsData;
}

export enum AppView {
  DASHBOARD = 'dashboard',
  PLANNER = 'planner',
  LOGS = 'logs',
  SETTINGS = 'settings',
}
