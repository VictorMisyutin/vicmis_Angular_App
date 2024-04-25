import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getWorkout(age: string, weight: string, duration: string, equipment: string): Observable<any> {
    return this.http.get(`https://vicmis.com/api/workout/${age}/${weight}/${duration}/${equipment}`);
  }

}
