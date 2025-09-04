import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionModal } from "./SubscriptionModal";
import { Upload, X, AlertCircle, CheckCircle2, FileText, Cloud } from "lucide-react";
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

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'idle' | 'uploading' | 'done' | 'error';
  progress: number;
  error?: string;
}

const ALLOWED_TYPES = [
  '.pdf', '.doc', '.docx', '.txt', '.md', '.html', '.csv', '.xlsx', '.pptx', '.png', '.jpg', '.jpeg'
];

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'text/markdown',
  'text/html',
  'text/csv',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'image/png',
  'image/jpeg',
  'image/jpg'
];

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const MAX_FILES = 20;
const MAX_TOTAL_SIZE = 200 * 1024 * 1024; // 200MB

const initialData: PersonaData = {
  linkedin: "",
  companyName: "",
  jobTitle: "",
  companyWebsite: "",
  biography: ""
};

interface PersonaConfigurationProps {
  onSaveChanges?: () => void;
}

export function PersonaConfiguration({ onSaveChanges }: PersonaConfigurationProps) {
  const { toast } = useToast();
  const [data, setData] = useState<PersonaData>(initialData);
  const [originalData, setOriginalData] = useState<PersonaData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<Partial<PersonaData>>({});
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  
  // Upload state
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load user info and existing files from Supabase on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Load user info
        const { data: userInfo, error: userInfoError } = await (supabase as any)
          .from('user_info')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (userInfoError && userInfoError.code !== 'PGRST116') {
          console.error('Failed to load user info:', userInfoError);
        } else if (userInfo) {
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

        // Load existing knowledge files
        const { data: knowledgeFiles, error: filesError } = await supabase.rpc('get_user_knowledge_files');
        
        if (filesError) {
          console.error('Failed to load knowledge files:', filesError);
        } else if (knowledgeFiles && knowledgeFiles.length > 0) {
          const existingFiles: UploadFile[] = knowledgeFiles.map((kf: any) => ({
            id: kf.id,
            file: new File([], kf.original_name), // Placeholder file object
            name: kf.original_name,
            size: kf.size_bytes,
            type: kf.mime_type,
            status: kf.status === 'uploaded' ? 'done' as const : 'error' as const,
            progress: 100
          }));
          setFiles(existingFiles);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    loadUserData();
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
      
      // Enable tile2 incrementing if callback provided
      if (onSaveChanges) {
        onSaveChanges();
      }
      
      // Check payment status after successful save
      await checkPaymentStatusAndShowModal();
      
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

  const checkPaymentStatusAndShowModal = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get payment status from user_info table
      const { data: userInfo } = await supabase
        .from('user_info')
        .select('payment_status')
        .eq('user_id', user.id)
        .maybeSingle();

      // If payment status is not active, show subscription modal
      if (!userInfo || userInfo.payment_status !== 'active') {
        setShowSubscriptionModal(true);
      }
    } catch (error) {
      console.error('Failed to check payment status:', error);
    }
  };

  // Upload utility functions
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File is too large (max 25MB)`;
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(fileExtension) && !ALLOWED_MIME_TYPES.includes(file.type)) {
      return 'File type not allowed';
    }

    return null;
  };

  const uploadFileToSupabase = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' as const } : f
    ));

    try {
      // Step 1: Get upload URL from Supabase
      const { data: uploadData, error: urlError } = await supabase.rpc('create_upload_url', {
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type
      });

      if (urlError) {
        throw new Error(urlError.message);
      }

      const { file_id, signed_url } = uploadData as { file_id: string; signed_url: string };

      // Step 2: Upload file to Supabase Storage using signed URL
      const uploadResponse = await fetch(signed_url, {
        method: 'PUT',
        body: file.file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      // Step 3: Mark upload as complete
      const { error: completeError } = await supabase.rpc('complete_upload', {
        file_id: file_id
      });

      if (completeError) {
        throw new Error(completeError.message);
      }

      // Update file status to done
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { 
          ...f, 
          status: 'done' as const, 
          progress: 100 
        } : f
      ));

      // Show success message
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been uploaded and will be used for AI responses.`,
      });

    } catch (error) {
      console.error('Upload error:', error);
      
      // Update file status to error
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { 
          ...f, 
          status: 'error' as const, 
          error: error instanceof Error ? error.message : 'Upload failed'
        } : f
      ));

      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: "destructive",
      });
    }
  }, [files, toast]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const filesToAdd: UploadFile[] = [];
    const errors: string[] = [];

    Array.from(newFiles).forEach((file) => {
      // Check if we're at max files
      if (files.length + filesToAdd.length >= MAX_FILES) {
        errors.push(`Maximum ${MAX_FILES} files allowed`);
        return;
      }

      // Check if file already exists
      if (files.some(f => f.name === file.name && f.size === file.size)) {
        errors.push(`File "${file.name}" already exists`);
        return;
      }

      // Validate file
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
        return;
      }

      // Check total size
      const totalSize = files.reduce((sum, f) => sum + f.size, 0) + 
                       filesToAdd.reduce((sum, f) => sum + f.size, 0) + file.size;
      if (totalSize > MAX_TOTAL_SIZE) {
        errors.push('Total file size exceeds 200MB limit');
        return;
      }

      filesToAdd.push({
        id: Math.random().toString(36).substr(2, 9),
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'idle',
        progress: 0
      });
    });

    if (filesToAdd.length > 0) {
      setFiles(prev => [...prev, ...filesToAdd]);
      // Auto-start upload
      filesToAdd.forEach(file => uploadFileToSupabase(file.id));
    }

    if (errors.length > 0) {
      toast({
        title: "Upload issues",
        description: errors.slice(0, 3).join(', ') + (errors.length > 3 ? '...' : ''),
        variant: "destructive",
      });
    }
  }, [files, toast, uploadFileToSupabase]);

  const removeFile = useCallback(async (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // If file is uploading or uploaded, try to cancel/delete from backend
    if (file.status === 'uploading' || file.status === 'done') {
      try {
        await supabase.rpc('cancel_upload', { file_id: fileId });
      } catch (error) {
        console.error('Error removing file from backend:', error);
      }
    }

    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, [files]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      addFiles(droppedFiles);
    }
  }, [addFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      addFiles(selectedFiles);
    }
    // Reset input value to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [addFiles]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);


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

          {/* Upload knowledge files */}
          <div className="space-y-2">
            <Label htmlFor="knowledge-files" className="text-card-foreground font-medium">Upload knowledge files</Label>
            <p className="text-xs text-muted-foreground mb-3">
              This will be used by our AI to draft responses to journalist requests for articles
            </p>
            
            {/* Upload Zone */}
            <div
              role="button"
              tabIndex={0}
              aria-label="Click to browse files or drag and drop files here"
              className={`
                relative min-h-[180px] md:min-h-[220px] border-2 border-dashed rounded-xl
                flex flex-col items-center justify-center p-6 cursor-pointer
                transition-all duration-200 ease-in-out
                ${isDragOver 
                  ? 'border-warning bg-warning/5 shadow-sm' 
                  : 'border-card-border hover:border-warning/50 hover:bg-warning/5'
                }
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning focus-visible:ring-offset-2
              `}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={ALLOWED_TYPES.join(',')}
                onChange={handleFileSelect}
                className="sr-only"
                aria-hidden="true"
              />
              
              <Cloud className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-base font-medium text-card-foreground mb-2">
                Drag & drop your files here or click to browse
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              Supported: PDF, DOCX, TXT, MD, HTML, CSV, XLSX, PPTX, PNG, JPG · Max 25MB per file
            </p>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {files.length} of {MAX_FILES} files
                  </span>
                  <span className="text-muted-foreground">
                    {formatFileSize(totalSize)} / {formatFileSize(MAX_TOTAL_SIZE)}
                  </span>
                </div>
                
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {files.map((file) => (
                    <div key={file.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                      <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-card-foreground truncate">
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2">
                            {file.status === 'uploading' && (
                              <span className="text-xs text-muted-foreground">Uploading...</span>
                            )}
                            {file.status === 'done' && (
                              <CheckCircle2 className="w-4 h-4 text-success" />
                            )}
                            {file.status === 'error' && (
                              <AlertCircle className="w-4 h-4 text-destructive" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(file.id);
                              }}
                              className="p-1 hover:bg-muted rounded-md transition-colors"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {formatFileSize(file.size)}
                          </span>
                          {file.status === 'uploading' && (
                            <span className="text-xs text-muted-foreground">
                              {Math.round(file.progress)}%
                            </span>
                          )}
                        </div>
                        
                        {file.status === 'uploading' && (
                          <Progress value={file.progress} className="h-1 mt-2" />
                        )}
                        
                        {file.status === 'error' && file.error && (
                          <p className="text-xs text-destructive mt-1">{file.error}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SubscriptionModal 
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
      />
    </div>
  );
}