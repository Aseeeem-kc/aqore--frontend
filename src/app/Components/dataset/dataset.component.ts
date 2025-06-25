import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {
  loading = true;
  dataSource: any[] = [];
  clientColumns: any[] = [];
  constructor(private apiService: ApiService) {

  }
  ngOnInit(): void {
    this.apiService.getClients().subscribe({
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
  }
}
