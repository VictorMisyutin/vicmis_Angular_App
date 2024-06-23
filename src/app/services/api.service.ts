import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  constructor(private http: HttpClient) { }

  getWorkout(age: string, weight: string, goal: string, duration: string, equipment: string, frequency: string): Observable<any> {
    let result = this.http.get(`https://vicmis.com/api/workout/${age}/${weight}/${goal}/${duration}/${equipment}/${frequency}`);
    return result;
  }

  createCheckoutSession(products: any[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('https://vicmis.com/api/create-checkout-session', { products }, { headers });
  }

  updateEmailAndTextList(firstName: string, lastName: string, email: string, emailDecision: boolean, number: string, textDecision: boolean){
    return this.http.get(`https://vicmis.com/api/email-text-list/${firstName}/${lastName}/${email}/${emailDecision}/${number}/${textDecision}`);
  }

  getBabyNames(args: string): Observable<any>{
    let result = this.http.get(`https://vicmis.com/api/baby-names?${args}`);
    return result;
  }

}
