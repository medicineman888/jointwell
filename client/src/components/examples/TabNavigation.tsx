import { useState } from 'react';
import TabNavigation from '../TabNavigation';

export default function TabNavigationExample() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="h-screen relative">
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Active tab: {activeTab}</p>
      </div>
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
