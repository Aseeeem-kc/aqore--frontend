import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface CandidateRanking {
  id: number;
  candidate_name: string;
  candidate_email: string;
  candidate_resume: string;
  report: string;
  total_score: number;
}

export interface RankingResponse {
  results: CandidateRanking[];
}

@Injectable({
  providedIn: 'root'
})
export class HRRankingService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getRankings(): Observable<RankingResponse> {
    const url = `${this.baseUrl}/hr/ranking/`;
    console.log('Fetching rankings from:', url);
    console.log('Request timestamp:', new Date().toISOString());
    
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    return this.http.get<RankingResponse>(url, { headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred while fetching rankings.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid request. Please check your parameters.';
          break;
        case 401:
          errorMessage = 'Unauthorized. Please check your credentials.';
          break;
        case 403:
          errorMessage = 'Access forbidden. You may not have permission to view rankings.';
          break;
        case 404:
          errorMessage = 'Ranking endpoint not found. Please contact support.';
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

    console.error('HR Ranking Error:', error);
    return throwError(() => ({ error: { message: errorMessage } }));
  }
} 