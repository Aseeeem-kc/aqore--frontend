import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss'],
  host: {
    class: 'overflow-auto'
  }
})
export class DatasetComponent implements OnInit {
  loading = true;
  dataSource: any[] = [];
  clientColumns: any[] = [];

  jobdataSource: any[] = [];
  jobColumns: any[] = [];
  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getAllClients().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.clientColumns = Object.keys(this.dataSource[0]);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        this.loading = false;
      }
    });

        this.apiService.getAllJobs().subscribe({
      next: (data) => {
        this.jobdataSource = data;
        this.jobColumns = Object.keys(this.jobdataSource[0]);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        this.loading = false;
      }
    });
  }
}
