import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 private apiUrl = 'https://localhost:7244'
  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/client/GetAllClients`);
  }
}
