import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, AlertCircle, CheckCircle2, FileText, Cloud } from "lucide-react";

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

export function KnowledgeUploader() {
  const { toast } = useToast();
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      filesToAdd.forEach(file => simulateUpload(file.id));
    }

    if (errors.length > 0) {
      toast({
        title: "Upload issues",
        description: errors.slice(0, 3).join(', ') + (errors.length > 3 ? '...' : ''),
        variant: "destructive",
      });
    }
  }, [files, toast]);

  const simulateUpload = useCallback((fileId: string) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading' as const } : f
    ));

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { 
            ...f, 
            status: 'done' as const, 
            progress: 100 
          } : f
        ));
        return;
      }

      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress: Math.min(progress, 100) } : f
      ));
    }, 200);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

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
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-card-foreground mb-2">Upload knowledge files</h2>
          <p className="text-sm text-muted-foreground">
            This will be used by our AI to draft responses to journalist requests for articles
          </p>
        </div>

        {/* Upload Zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Click to browse files or drag and drop files here"
          className={`
            relative min-h-[220px] md:min-h-[260px] border-2 border-dashed rounded-xl
            flex flex-col items-center justify-center p-8 cursor-pointer
            transition-all duration-200 ease-in-out
            ${isDragOver 
              ? 'border-warning bg-warning/5 shadow-sm' 
              : 'border-muted hover:border-warning/50 hover:bg-warning/5'
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
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Supported: PDF, DOCX, TXT, MD, HTML, CSV, XLSX, PPTX, PNG, JPG · Max 25MB per file
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
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
  );
}