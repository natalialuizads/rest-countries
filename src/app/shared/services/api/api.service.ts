import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<any[]> {
    return this.http.get<any[]>(`${environment}/all`);
  }

  getCountryByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment}/name/${name}`);
  }
}
