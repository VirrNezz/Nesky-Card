export type ProfileId = 'nezz' | 'sun3ss';

export interface TechBadge {
  name: string;
  category: string;
  icon?: string;
  color: string;
}

export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string; // Lucide icon name
  gitDiffType?: 'add' | 'modify' | 'delete'; // for git diff style left border
  badge?: string;
  accentColor?: string;
}

export interface ProfileData {
  id: ProfileId;
  name: string;
  handle: string;
  title: string;
  role: string;
  location: string;
  statusText: string;
  statusType: 'online' | 'busy' | 'stealth' | 'coding';
  bio: string;
  avatarUrl: string;
  bgStyle: string;
  themeColor: {
    primary: string;
    secondary: string;
    accent: string;
    border: string;
    glow: string;
    bg: string;
    cardBg: string;
    textPrimary: string;
    textSecondary: string;
    badgeBg: string;
    badgeText: string;
  };
  stats: {
    label: string;
    value: string;
  }[];
  techStack: TechBadge[];
  links: LinkItem[];
  quotes: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type TransitionEffect = 'none' | 'glitch' | 'sniper';
