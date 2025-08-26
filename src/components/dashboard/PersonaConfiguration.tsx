import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

export const PersonaConfiguration = () => {
  const [data, setData] = useState<PersonaData>(initialData);
  const [originalData, setOriginalData] = useState<PersonaData>(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Partial<PersonaData>>({});
  const { toast } = useToast();

  // Check if data has changed
  const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);

  // Count words in biography
  const wordCount = data.biography.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    try {
      setIsLoading(true);
      
      // For now, we'll simulate loading user data
      // In a real app, this would call GET /api/user-info
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        // Simulate some default data
        const userData = {
          linkedin: "",
          companyName: "",
          jobTitle: "",
          companyWebsite: "",
          biography: ""
        };
        setData(userData);
        setOriginalData(userData);
      }
    } catch (error) {
      console.error("Failed to load user info:", error);
      toast({
        title: "Error",
        description: "Failed to load your information",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const validateData = (): boolean => {
    const newErrors: Partial<PersonaData> = {};

    // LinkedIn URL validation
    if (data.linkedin && !data.linkedin.match(/^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/)) {
      newErrors.linkedin = "Please enter a valid LinkedIn profile URL";
    }

    // Company website URL validation
    if (data.companyWebsite && !data.companyWebsite.match(/^https?:\/\/.+\..+/)) {
      newErrors.companyWebsite = "Please enter a valid website URL";
    }

    // Length validations
    if (data.companyName.length > 128) {
      newErrors.companyName = "Company name must be 128 characters or less";
    }

    if (data.jobTitle.length > 128) {
      newErrors.jobTitle = "Job title must be 128 characters or less";
    }

    // Biography word count validation
    if (data.biography.trim() && (wordCount < 1 || wordCount > 1000)) {
      newErrors.biography = "Biography must be between 1 and 1000 words";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateData()) {
      return;
    }

    try {
      setIsSaving(true);
      
      // For now, we'll simulate saving to API
      // In a real app, this would call PUT /api/user-info
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOriginalData(data);
      toast({
        title: "Success",
        description: "Your information has been saved successfully",
      });
    } catch (error) {
      console.error("Failed to save user info:", error);
      toast({
        title: "Error",
        description: "Failed to save your information",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleRevert = () => {
    setData(originalData);
    setErrors({});
  };

  const handleInputChange = (field: keyof PersonaData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="bg-white border border-slate-200 shadow-sm rounded-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Configure your outreach settings
          </CardTitle>
          
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={handleRevert}
              disabled={!hasChanges || isSaving}
              className="border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              Revert
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className="bg-slate-900 hover:bg-slate-800 text-white"
            >
              {isSaving ? "Saving..." : "Save all changes"}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="text-sm font-medium text-slate-700">
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            value={data.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className={`border-slate-200 ${errors.linkedin ? 'border-red-300' : ''}`}
          />
          {errors.linkedin && (
            <p className="text-xs text-red-600">{errors.linkedin}</p>
          )}
          <p className="text-xs text-slate-500">
            Will be applied immediately after we review.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName" className="text-sm font-medium text-slate-700">
            Company Name
          </Label>
          <Input
            id="companyName"
            value={data.companyName}
            onChange={(e) => handleInputChange("companyName", e.target.value)}
            placeholder="Enter your company name"
            className={`border-slate-200 ${errors.companyName ? 'border-red-300' : ''}`}
          />
          {errors.companyName && (
            <p className="text-xs text-red-600">{errors.companyName}</p>
          )}
          <p className="text-xs text-slate-500">
            Will be applied immediately after we review.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle" className="text-sm font-medium text-slate-700">
            Job Title
          </Label>
          <Input
            id="jobTitle"
            value={data.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            placeholder="Enter your job title (e.g., CEO, Marketing Director)"
            className={`border-slate-200 ${errors.jobTitle ? 'border-red-300' : ''}`}
          />
          {errors.jobTitle && (
            <p className="text-xs text-red-600">{errors.jobTitle}</p>
          )}
          <p className="text-xs text-slate-500">
            Will be applied immediately after we review.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyWebsite" className="text-sm font-medium text-slate-700">
            Company Website
          </Label>
          <Input
            id="companyWebsite"
            value={data.companyWebsite}
            onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
            placeholder="https://yourcompany.com"
            className={`border-slate-200 ${errors.companyWebsite ? 'border-red-300' : ''}`}
          />
          {errors.companyWebsite && (
            <p className="text-xs text-red-600">{errors.companyWebsite}</p>
          )}
          <p className="text-xs text-slate-500">
            Will be applied immediately after we review.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="biography" className="text-sm font-medium text-slate-700">
            Professional Biography
          </Label>
          <Textarea
            id="biography"
            value={data.biography}
            onChange={(e) => handleInputChange("biography", e.target.value)}
            placeholder="Write your professional biography that journalists will use..."
            className={`border-slate-200 min-h-[120px] ${errors.biography ? 'border-red-300' : ''}`}
          />
          {errors.biography && (
            <p className="text-xs text-red-600">{errors.biography}</p>
          )}
          <p className="text-xs text-slate-500">
            {wordCount}/1000 words
          </p>
        </div>
      </CardContent>
    </Card>
  );
};