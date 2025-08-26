import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface PersonaData {
  linkedin: string;
  companyName: string;
  jobTitle: string;
  companyWebsite: string;
  biography: string;
}

const initialData: PersonaData = {
  linkedin: "",
  companyName: "",
  jobTitle: "",
  companyWebsite: "",
  biography: ""
};

export function PersonaConfiguration() {
  const { toast } = useToast();
  const [data, setData] = useState<PersonaData>(initialData);
  const [originalData, setOriginalData] = useState<PersonaData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<Partial<PersonaData>>({});

  // Simulate API load on mount
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        // Simulate API call - in real app this would be: GET /api/user-info
        const savedData = localStorage.getItem('personaData');
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setData(parsed);
          setOriginalData(parsed);
        }
      } catch (error) {
        console.error('Failed to load user info:', error);
      }
    };

    loadUserInfo();
  }, []);

  // Check for changes
  useEffect(() => {
    const changed = JSON.stringify(data) !== JSON.stringify(originalData);
    setHasChanges(changed);
  }, [data, originalData]);

  const validateField = (key: keyof PersonaData, value: string): string | null => {
    switch (key) {
      case 'linkedin':
        if (value && !value.match(/^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-_]+\/?$/)) {
          return 'Please enter a valid LinkedIn URL';
        }
        break;
      case 'companyWebsite':
        if (value && !value.match(/^https?:\/\/.+\..+/)) {
          return 'Please enter a valid website URL';
        }
        break;
      case 'companyName':
      case 'jobTitle':
        if (value && value.length > 128) {
          return 'Maximum 128 characters allowed';
        }
        break;
      case 'biography':
        const wordCount = value.trim().split(/\s+/).filter(word => word.length > 0).length;
        if (value && (wordCount < 1 || wordCount > 1000)) {
          return 'Biography must be between 1 and 1000 words';
        }
        break;
    }
    return null;
  };

  const handleInputChange = (key: keyof PersonaData, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setErrors({});

    // Validate all fields
    const newErrors: Partial<PersonaData> = {};
    Object.entries(data).forEach(([key, value]) => {
      const error = validateField(key as keyof PersonaData, value);
      if (error) {
        newErrors[key as keyof PersonaData] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call - in real app this would be: PUT /api/user-info
      localStorage.setItem('personaData', JSON.stringify(data));
      setOriginalData(data);
      
      toast({
        title: "Settings saved",
        description: "Your outreach settings have been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRevert = () => {
    setData(originalData);
    setErrors({});
  };

  const getBiographyWordCount = () => {
    return data.biography.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
      <div className="h-1 bg-warning"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-card-foreground">Configure your outreach settings</h2>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={handleRevert}
              disabled={!hasChanges}
            >
              Revert
            </Button>
            <Button 
              onClick={handleSave}
              disabled={!hasChanges || isLoading}
              className="bg-warning hover:bg-warning/90 text-warning-foreground"
            >
              {isLoading ? "Saving..." : "Save all changes"}
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          {/* LinkedIn */}
          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-card-foreground font-medium">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              value={data.linkedin}
              onChange={(e) => handleInputChange('linkedin', e.target.value)}
              className={errors.linkedin ? "border-destructive" : "border-card-border"}
            />
            {errors.linkedin ? (
              <p className="text-sm text-destructive">{errors.linkedin}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Will be applied immediately after we review.</p>
            )}
          </div>

          {/* Company Name */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-card-foreground font-medium">Company Name</Label>
            <Input
              id="companyName"
              placeholder="Enter your company name"
              value={data.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              className={errors.companyName ? "border-destructive" : "border-card-border"}
            />
            {errors.companyName ? (
              <p className="text-sm text-destructive">{errors.companyName}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Will be applied immediately after we review.</p>
            )}
          </div>

          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-card-foreground font-medium">Job Title</Label>
            <Input
              id="jobTitle"
              placeholder="Enter your job title (e.g., CEO, Marketing Director)"
              value={data.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className={errors.jobTitle ? "border-destructive" : "border-card-border"}
            />
            {errors.jobTitle ? (
              <p className="text-sm text-destructive">{errors.jobTitle}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Will be applied immediately after we review.</p>
            )}
          </div>

          {/* Company Website */}
          <div className="space-y-2">
            <Label htmlFor="companyWebsite" className="text-card-foreground font-medium">Company Website</Label>
            <Input
              id="companyWebsite"
              type="url"
              placeholder="https://yourcompany.com"
              value={data.companyWebsite}
              onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
              className={errors.companyWebsite ? "border-destructive" : "border-card-border"}
            />
            {errors.companyWebsite ? (
              <p className="text-sm text-destructive">{errors.companyWebsite}</p>
            ) : (
              <p className="text-xs text-muted-foreground">Will be applied immediately after we review.</p>
            )}
          </div>

          {/* Professional Biography */}
          <div className="space-y-2">
            <Label htmlFor="biography" className="text-card-foreground font-medium">Professional Biography</Label>
            <Textarea
              id="biography"
              placeholder="Write a professional biography that journalists can use to credit you in their articles..."
              value={data.biography}
              onChange={(e) => handleInputChange('biography', e.target.value)}
              className={`min-h-32 ${errors.biography ? "border-destructive" : "border-card-border"}`}
            />
            {errors.biography ? (
              <p className="text-sm text-destructive">{errors.biography}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                {getBiographyWordCount()}/1000 words
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}