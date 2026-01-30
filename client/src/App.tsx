import { useState, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TabNavigation from "@/components/TabNavigation";
import DisclaimerBanner from "@/components/DisclaimerBanner";

const Home = lazy(() => import("@/pages/Home"));
const PreOp = lazy(() => import("@/pages/PreOp"));
const PostOp = lazy(() => import("@/pages/PostOp"));
const Milestones = lazy(() => import("@/pages/Milestones"));

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
          <h2 className="text-xl font-medium text-foreground mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">An unexpected error occurred. Please try refreshing the page.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium"
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

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
        <ErrorBoundary>
          <div className="min-h-screen bg-background flex flex-col pb-16">
            <main className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 py-6">
                <Suspense fallback={<PageLoader />}>
                  <div key={activeTab} className="animate-fade-in">
                    {renderContent()}
                  </div>
                </Suspense>
              </div>
            </main>

            <DisclaimerBanner />
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </ErrorBoundary>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
