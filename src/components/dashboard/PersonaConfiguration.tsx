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

interface UserInfoRow {
  id: string;
  user_id: string;
  linkedin_url: string | null;
  company_name: string | null;
  job_title: string | null;
  company_website: string | null;
  professional_bio: string | null;
  is_under_review: boolean;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
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

  // Load user info from Supabase on mount
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: userInfo, error } = await (supabase as any)
          .from('user_info')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Failed to load user info:', error);
          return;
        }

        if (userInfo) {
          const userInfoTyped = userInfo as UserInfoRow;
          const loadedData: PersonaData = {
            linkedin: userInfoTyped.linkedin_url || "",
            companyName: userInfoTyped.company_name || "",
            jobTitle: userInfoTyped.job_title || "",
            companyWebsite: userInfoTyped.company_website || "",
            biography: userInfoTyped.professional_bio || ""
          };
          setData(loadedData);
          setOriginalData(loadedData);
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
        if (value && value.length > 2000) {
          return 'Maximum 2000 characters allowed';
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
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const payload = {
        user_id: user.id,
        linkedin_url: data.linkedin || null,
        company_name: data.companyName || null,
        job_title: data.jobTitle || null,
        company_website: data.companyWebsite || null,
        professional_bio: data.biography || null,
      };

      const { error } = await (supabase as any)
        .from('user_info')
        .upsert(payload, { onConflict: 'user_id' });

      if (error) {
        throw error;
      }

      setOriginalData(data);
      
      toast({
        title: "Saved.",
        description: "Your outreach settings have been updated successfully.",
      });
    } catch (error) {
      console.error('Save error:', error);
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
                {data.biography.length}/2000 characters
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}