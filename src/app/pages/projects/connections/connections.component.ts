import { Component } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.css'
})
export class ConnectionsComponent {
  lives: number[] = [0, 1, 2, 3];
  wordsArray: {word:string, status: number, category: string}[] = [];
  clickedWords: number = 0;
  /*
  status: 0 ==> unsolved
  status: 1 ==> clicked
  status: 2 ==> solved
  */
  guesses: string[4][] = []; // keep track of already guessed sequences

  constructor(){
    this.wordsArray.push({ word: "one", status: 0, category: "first"});
    this.wordsArray.push({ word: "two", status: 0, category: "first"});
    this.wordsArray.push({ word: "three", status: 0, category: "first"});
    this.wordsArray.push({ word: "four", status: 0, category: "first"});
    this.wordsArray.push({ word: "five", status: 0, category: "second"});
    this.wordsArray.push({ word: "six", status: 0, category: "second"});
    this.wordsArray.push({ word: "seven", status: 0, category: "second"});
    this.wordsArray.push({ word: "eight", status: 0, category: "second"});
    this.wordsArray.push({ word: "nine", status: 0, category: "third"});
    this.wordsArray.push({ word: "ten", status: 0, category: "third"});
    this.wordsArray.push({ word: "eleven", status: 0, category: "third"});
    this.wordsArray.push({ word: "twelve", status: 0, category: "third"});
    this.wordsArray.push({ word: "thirteen", status: 0, category: "fourth"});
    this.wordsArray.push({ word: "fourteen", status: 0, category: "fourth"});
    this.wordsArray.push({ word: "fiveteen", status: 0, category: "fourth"});
    this.wordsArray.push({ word: "sixteen", status: 0, category: "fourth"});
  }  
  wordClicked(word: string){
    for(let i = 0; i < this.wordsArray.length;i++){
      if(this.wordsArray[i].word === word){
        if(this.wordsArray[i].status === 0){
          if(this.clickedWords < 4){
            this.wordsArray[i].status = 1;
            this.clickedWords++;
          }
        }
        else{
          this.wordsArray[i].status = 0;
          this.clickedWords--;
        }
        return;
      }
    }
  }

  submitClicked(){
    if(this.clickedWords !== 4){ // check if enough words are selected
      return; // pop up for not enough selected words
    }
    let tempArray: {word:string, status: number, category: string}[] = []; // create temp array or current clicked words
    
    for(let i = 0; i < this.wordsArray.length; i++){ // iterate through all words and add selected ones to temp array
      if(this.wordsArray[i].status === 1){
        tempArray.push(this.wordsArray[i]);
      }
    }

    // for(let i = 0 ; i < this.guesses.length; i++){ // make sure this sequence has not been guessed before
        
    // }

    // check that all clicked words are in same category
    let tempCategory: string = tempArray[0].category;
    for(let i = 1; i < tempArray.length; i++){
      if(tempArray[i].category !== tempCategory){
        this.lives.pop();
        return;
      }
    }

    for(let i = 0; i < tempArray.length; i++){
      tempArray[i].status = 2;
    }
    this.clickedWords = 0;

  }

}
