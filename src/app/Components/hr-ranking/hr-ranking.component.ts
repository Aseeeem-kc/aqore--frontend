import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HRRankingService } from '../../Services';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

@Component({
  selector: 'app-hr-ranking',
  templateUrl: './hr-ranking.component.html',
  styleUrls: ['./hr-ranking.component.scss']
})
export class HRRankingComponent implements OnInit, OnDestroy {
  candidates: CandidateRanking[] = [];
  loading = true;
  error = '';
  selectedCandidate: CandidateRanking | null = null;
  showReport = false;
  private loadingSubscription: any;

  // Computed properties for statistics
  get totalCandidates(): number {
    return this.candidates.length;
  }

  get excellentCandidates(): number {
    return this.candidates.filter(c => c.total_score >= 80).length;
  }

  get goodCandidates(): number {
    return this.candidates.filter(c => c.total_score >= 70 && c.total_score < 80).length;
  }

  get needsImprovementCandidates(): number {
    return this.candidates.filter(c => c.total_score < 70).length;
  }

  constructor(
    private router: Router,
    private hrRankingService: HRRankingService
  ) { }

  ngOnInit(): void {
    this.loadRankings();
  }

  loadRankings(): void {
    // Cancel any existing request
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }

    console.log('Loading rankings...');
    this.loading = true;
    this.error = '';

    // Add a small delay to prevent rapid requests
    this.loadingSubscription = timer(100).pipe(
      switchMap(() => this.hrRankingService.getRankings())
    ).subscribe({
      next: (response: RankingResponse) => {
        console.log('Rankings loaded successfully:', response);
        this.candidates = response.results.sort((a, b) => b.total_score - a.total_score);
        this.loading = false;
      },
      error: (error: any) => {
        console.error('Error loading rankings:', error);
        this.error = error.error?.message || 'Failed to load rankings';
        this.loading = false;
      }
    });
  }

  viewCandidateReport(candidate: CandidateRanking): void {
    this.selectedCandidate = candidate;
    this.showReport = true;
  }

  closeReport(): void {
    this.showReport = false;
    this.selectedCandidate = null;
  }

  getScoreColor(score: number): string {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  }

  getScoreLabel(score: number): string {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  }

  getRankIcon(rank: number): string {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `${rank}`;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  refreshRankings(): void {
    this.loadRankings();
  }

  exportRankings(): void {
    const dataStr = JSON.stringify(this.candidates, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hr-rankings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  ngOnDestroy(): void {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
} 