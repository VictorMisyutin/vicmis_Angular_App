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
  guesses: string[][] = []; // keep track of already guessed sequences
  pop_up_text: string = ""; // text that will display below grid
  guessedCategories: number = 0; // keep track of how many categories player has gotten correct

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
    this.shuffle();
  }  
  wordClicked(word: string){
    this.pop_up_text = "";
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

  check(){
    if(this.clickedWords !== 4){ // check if enough words are selected
      this.pop_up_text = "Please Select 4 Words";
      return;
    }
    let tempArray: {word:string, status: number, category: string}[] = []; // create temp array for current clicked words
    
    for(let i = 0; i < this.wordsArray.length; i++){ // iterate through all words and add selected ones to temp array
      if(this.wordsArray[i].status === 1){
        tempArray.push(this.wordsArray[i]);
      }
    }

    // create array of just the words
    let tempArrayStrings: string[] = [];
    for(let word of tempArray){
      tempArrayStrings.push(word.word);
    }
    
    // sort the temp array
    tempArrayStrings.sort((a, b) => {return a.localeCompare(b);});

    let guessedBefore: boolean = false;
    for(let i = 0 ; i < this.guesses.length; i++){ // make sure this sequence has not been guessed before
      guessedBefore = true;
      for(let j = 0; j < this.guesses[i].length;j++){
        if(this.guesses[i][j] !== tempArrayStrings[j])
          guessedBefore = false;
      }
      if(guessedBefore)
        break;
    }

    if(guessedBefore){
      this.pop_up_text = "Already Guessed";
      return; 
    }
    else{
      // add to guesses
      this.guesses.push(tempArrayStrings);
    }

    let correct:boolean = true;
    // check that all clicked words are in same category
    let tempCategory: string = tempArray[0].category;
    for(let i = 1; i < tempArray.length; i++){
      if(tempArray[i].category !== tempCategory){ // guess was incorrect
        this.lives.pop();
        correct = false;
      }
    }

    if(correct){
      for(let i = 0; i < tempArray.length; i++){ // update array to show that guess was correct
        tempArray[i].status = 2;
      }
      this.clickedWords = 0; // reset clicked words
      // put solved categories words at the top
      let count: number = 0;
      for(let i = 0; i < this.wordsArray.length; i++){
        for(let j = count; j < tempArray.length; j++){
          if(this.wordsArray[i] == tempArray[j]){
            
            count++;
          }
        }
      }
      this.guessedCategories++;
    }
    else{ // incorrect guess
      this.pop_up_text = "incorrect";
    }

  }
  
  shuffle(){
    for (let i = this.wordsArray.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [this.wordsArray[i], this.wordsArray[j]] = [this.wordsArray[j], this.wordsArray[i]]; 
    } 
  }
}
