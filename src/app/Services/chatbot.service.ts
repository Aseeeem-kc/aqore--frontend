import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  // Use a relative URL so Angular proxy handles CORS
  private apiUrl = 'http://localhost:8000/chatbot/';


  constructor(private http: HttpClient) {}

  sendMessage(query: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.apiUrl}chat/`, { query })
      .pipe(
        retry(1),
        catchError(err => throwError(() => err))
      );
  }

  checkHealth(): Observable<{ status: string, message: string }> {
    return this.http.get<{ status: string, message: string }>(`${this.apiUrl}health/`)
      .pipe(
        retry(1),
        catchError(err => throwError(() => err))
      );
  }
} 