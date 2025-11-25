import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TabNavigation from "@/components/TabNavigation";
import DisclaimerBanner from "@/components/DisclaimerBanner";
import Home from "@/pages/Home";
import PreOp from "@/pages/PreOp";
import PostOp from "@/pages/PostOp";
import Milestones from "@/pages/Milestones";

function App() {
  const [activeTab, setActiveTab] = useState("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "pre-op":
        return <PreOp />;
      case "post-op":
        return <PostOp />;
      case "milestones":
        return <Milestones />;
      default:
        return <Home />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background flex flex-col pb-16">
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">
              {renderContent()}
            </div>
          </main>
          
          <DisclaimerBanner />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
