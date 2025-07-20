import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface ChatbotResponse {
  response: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private baseUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  sendQuery(query: string): Observable<ChatbotResponse> {
    const url = `${this.baseUrl}/chatbot/chat/`;
    return this.http.post<ChatbotResponse>(url, { query })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while communicating with the chatbot.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = error.error?.message || `Server error: ${error.status}`;
    }
    return throwError(() => ({ error: { message: errorMessage } }));
  }
} 