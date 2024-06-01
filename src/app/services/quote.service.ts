import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  // private apiUrl = 'https://api.quotable.io/random'; // URL to get a random quote
  // 'https://api.quotable.io/random/quotes/random?minLength=100&maxLength=140'
  constructor(private http: HttpClient) { }

  getRandomQuote(length: number): Observable<any> {
    let apiUrl = '';
    if(length === 1){
      apiUrl = 'https://api.quotable.io/quotes/random?minLength=40&maxLength=80'; // too little
    }
    else if(length === 2){
      apiUrl = 'https://api.quotable.io/quotes/random?minLength=80&maxLength=140';
    }
    else if(length === 3){
      apiUrl = 'https://api.quotable.io/quotes/random?minLength=140&maxLength=180';
    }
    else if(length === 4){
      apiUrl = 'https://api.quotable.io/quotes/random?minLength=180';
    }
    
    return this.http.get<any>(apiUrl);
  }
}
