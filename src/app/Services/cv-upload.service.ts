import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface CVUploadResponse {
  message: string;
  file_name: string;
  file_path: string;
  file_size: string;
  candidate_name: string;
  candidate_email: string;
  position_applied: string;
  extracted_text_length: number;
  candidate_feedback: string;
  hr_analysis: string;
  processing_status: string;
}

@Injectable({
  providedIn: 'root'
})
export class CVUploadService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  uploadCV(formData: any, file: File): Observable<CVUploadResponse> {
    const uploadFormData = new FormData();
    
    // Append form fields
    uploadFormData.append('candidate_name', formData.candidate_name);
    uploadFormData.append('candidate_email', formData.candidate_email);
    uploadFormData.append('position_applied', formData.position_applied);
    uploadFormData.append('cv_file', file);

    return this.http.post<CVUploadResponse>(`${this.baseUrl}/candidate/uploadcv/`, uploadFormData)
      .pipe(
        retry(1), // Retry once on failure
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred during upload.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Invalid request. Please check your input.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Access forbidden. You may not have permission to upload files.';
          break;
        case 404:
          errorMessage = 'Upload endpoint not found. Please contact support.';
          break;
        case 413:
          errorMessage = 'File too large. Please upload a smaller file.';
          break;
        case 415:
          errorMessage = 'Unsupported file type. Please upload a supported format.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        case 502:
          errorMessage = 'Bad gateway. The server is temporarily unavailable.';
          break;
        case 503:
          errorMessage = 'Service unavailable. Please try again later.';
          break;
        case 504:
          errorMessage = 'Gateway timeout. The request took too long to process.';
          break;
        default:
          errorMessage = error.error?.message || `Server error: ${error.status}`;
      }
    }

    console.error('CV Upload Error:', error);
    return throwError(() => ({ error: { message: errorMessage } }));
  }

  // Method to validate file before upload
  validateFile(file: File): { isValid: boolean; error?: string } {
    const allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'jpg', 'jpeg', 'png', 'bmp', 'tiff', 'avif', 'webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !allowedTypes.includes(fileExtension)) {
      return {
        isValid: false,
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ').toUpperCase()}`
      };
    }

    if (file.size > maxSize) {
      return {
        isValid: false,
        error: 'File size exceeds 10MB limit.'
      };
    }

    return { isValid: true };
  }

  // Method to get file size in human readable format
  getFileSizeString(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Method to check if the service is available
  checkServiceHealth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health/`).pipe(
      catchError(this.handleError)
    );
  }
} 