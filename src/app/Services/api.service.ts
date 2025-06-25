import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private apiUrl = 'https://hackathonapi.aqore.com'
  constructor(private http: HttpClient) { }

  getAllClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/GetAllClients`);
  }
    getAllJobs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Job/GetAllJobs`);
  }
}
