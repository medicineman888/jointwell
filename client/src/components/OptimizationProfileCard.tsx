import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { OptimizationProfile } from "@/types/clinical";
import { SlidersHorizontal } from "lucide-react";

interface OptimizationProfileCardProps {
  profile: OptimizationProfile;
  completionPercentage: number;
  onProfileChange: (updates: Partial<OptimizationProfile>) => void;
}

export default function OptimizationProfileCard({
  profile,
  completionPercentage,
  onProfileChange,
}: OptimizationProfileCardProps) {
  return (
    <Card className="p-6 border-primary/20 bg-primary/5">
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-medium text-foreground">Personalized Risk Profile</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              We use this to prioritize interventions with the biggest potential impact for you.
            </p>
          </div>
          <Badge variant="secondary">{completionPercentage}% configured</Badge>
        </div>

        <Progress value={completionPercentage} className="h-2" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Smoking status</label>
            <Select
              value={profile.smokingStatus}
              onValueChange={(value) =>
                onProfileChange({
                  smokingStatus: value as OptimizationProfile["smokingStatus"],
                })
              }
            >
              <SelectTrigger data-testid="select-smoking-status">
                <SelectValue placeholder="Select smoking status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Prefer not to say yet</SelectItem>
                <SelectItem value="never">Never smoked</SelectItem>
                <SelectItem value="former">Former smoker</SelectItem>
                <SelectItem value="current">Current smoker / vaper</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Diabetes status</label>
            <Select
              value={profile.diabetesStatus}
              onValueChange={(value) =>
                onProfileChange({
                  diabetesStatus: value as OptimizationProfile["diabetesStatus"],
                })
              }
            >
              <SelectTrigger data-testid="select-diabetes-status">
                <SelectValue placeholder="Select diabetes status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Not set</SelectItem>
                <SelectItem value="no">No diabetes</SelectItem>
                <SelectItem value="yes">Diabetes diagnosed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">BMI group</label>
            <Select
              value={profile.bmiCategory}
              onValueChange={(value) =>
                onProfileChange({
                  bmiCategory: value as OptimizationProfile["bmiCategory"],
                })
              }
            >
              <SelectTrigger data-testid="select-bmi-category">
                <SelectValue placeholder="Select BMI group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Not set</SelectItem>
                <SelectItem value="under-30">Under 30</SelectItem>
                <SelectItem value="30-39.9">30 to 39.9</SelectItem>
                <SelectItem value="40-plus">40 or higher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Current activity level</label>
            <Select
              value={profile.activityLevel}
              onValueChange={(value) =>
                onProfileChange({
                  activityLevel: value as OptimizationProfile["activityLevel"],
                })
              }
            >
              <SelectTrigger data-testid="select-activity-level">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Not set</SelectItem>
                <SelectItem value="low">Low activity</SelectItem>
                <SelectItem value="moderate">Moderate activity</SelectItem>
                <SelectItem value="high">High activity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </Card>
  );
}
