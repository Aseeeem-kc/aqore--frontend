import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CVUploadService, CVUploadResponse } from '../../Services';

@Component({
  selector: 'app-cv-upload',
  templateUrl: './cv-upload.component.html',
  styleUrls: ['./cv-upload.component.scss']
})
export class CVUploadComponent implements OnInit {
  uploadForm: FormGroup;
  isUploading = false;
  uploadResult: CVUploadResponse | null = null;
  errorMessage = '';
  selectedFile: File | null = null;
  uploadProgress = 0;
  allowedFileTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'bmp', 'tiff', 'avif', 'webp'];
  maxFileSize = 10 * 1024 * 1024; // 10MB

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cvUploadService: CVUploadService
  ) {
    this.uploadForm = this.fb.group({
      candidate_name: ['', [Validators.required, Validators.minLength(2)]],
      candidate_email: ['', [Validators.required, Validators.email]],
      position_applied: ['', [Validators.required, Validators.minLength(2)]],
      cv_file: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Load saved form data from localStorage if available
    const savedData = localStorage.getItem('cvUploadFormData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      this.uploadForm.patchValue({
        candidate_name: parsedData.candidate_name || '',
        candidate_email: parsedData.candidate_email || '',
        position_applied: parsedData.position_applied || ''
      });
    }

    // Pre-fill position if selected from timeline
    const selectedPosition = localStorage.getItem('selectedPosition');
    if (selectedPosition) {
      this.uploadForm.patchValue({
        position_applied: selectedPosition
      });
      // Clear the selected position after using it
      localStorage.removeItem('selectedPosition');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (this.validateFile(file)) {
        this.selectedFile = file;
        this.uploadForm.patchValue({ cv_file: file });
        this.errorMessage = '';
      } else {
        this.selectedFile = null;
        this.uploadForm.patchValue({ cv_file: null });
        event.target.value = '';
      }
    }
  }

  validateFile(file: File): boolean {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !this.allowedFileTypes.includes(fileExtension)) {
      this.errorMessage = `Invalid file type. Allowed types: ${this.allowedFileTypes.join(', ').toUpperCase()}`;
      return false;
    }

    if (file.size > this.maxFileSize) {
      this.errorMessage = 'File size exceeds 10MB limit.';
      return false;
    }

    return true;
  }

  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      this.isUploading = true;
      this.uploadProgress = 0;
      this.errorMessage = '';
      this.uploadResult = null;

      // Save form data to localStorage
      const formData = this.uploadForm.value;
      localStorage.setItem('cvUploadFormData', JSON.stringify({
        candidate_name: formData.candidate_name,
        candidate_email: formData.candidate_email,
        position_applied: formData.position_applied
      }));

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        if (this.uploadProgress < 90) {
          this.uploadProgress += 10;
        }
      }, 200);

             this.cvUploadService.uploadCV(this.uploadForm.value, this.selectedFile).subscribe({
         next: (response: CVUploadResponse) => {
           clearInterval(progressInterval);
           this.uploadProgress = 100;
           this.uploadResult = response;
           this.isUploading = false;
           
           // Clear saved form data after successful upload
           localStorage.removeItem('cvUploadFormData');
         },
         error: (error: any) => {
           clearInterval(progressInterval);
           this.isUploading = false;
           this.errorMessage = error.error?.message || 'Upload failed. Please try again.';
         }
       });
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.uploadForm.controls).forEach(key => {
      const control = this.uploadForm.get(key);
      control?.markAsTouched();
    });
  }

  retryUpload(): void {
    this.errorMessage = '';
    this.uploadResult = null;
  }

  downloadResults(): void {
    if (this.uploadResult) {
      const dataStr = JSON.stringify(this.uploadResult, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cv-analysis-${this.uploadResult.candidate_name}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  getFileSizeString(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
} 