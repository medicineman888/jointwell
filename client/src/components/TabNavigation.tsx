import { Home, FileText, AlertTriangle, TrendingUp } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', label: 'Today', icon: Home },
  { id: 'pre-op', label: 'Optimize', icon: FileText },
  { id: 'post-op', label: 'Recover', icon: AlertTriangle },
  { id: 'milestones', label: 'Roadmap', icon: TrendingUp },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-bottom">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover-elevate'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
