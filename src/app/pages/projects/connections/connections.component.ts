import { Component } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.css'
})
export class ConnectionsComponent {
  lives: number[] = [0, 1, 2, 3];
  wordsArray: {word:string, status: number, categoryNum: number}[] = [];
  clickedWords: number = 0;
  /*
  status: 0 ==> yellow
  status: 1 ==> green
  status: 2 ==> blue
  status: 3 ==> purple
  status: 4 ==> unsolved
  status: 5 ==> clicked
  */
  guesses: string[][] = []; // keep track of already guessed sequences
  pop_up_text: string = ""; // text that will display below grid
  guessedCategories: number = 0; // keep track of how many categories player has gotten correct
  categoryNames: string[] = ["Words that could be a letter", "Types of Pasta", "the f sound without 'f' ", "Radio + ____"];

  displayedCategories: string[] = ["", "", "",""];

  constructor(){
    this.wordsArray.push({ word: "tea", status: 4, categoryNum: 0});
    this.wordsArray.push({ word: "queue", status: 4, categoryNum: 0});
    this.wordsArray.push({ word: "sea", status: 4, categoryNum: 0});
    this.wordsArray.push({ word: "bee", status: 4, categoryNum: 0});
    this.wordsArray.push({ word: "angel", status: 4, categoryNum: 1});
    this.wordsArray.push({ word: "bow tie", status: 4, categoryNum: 1});
    this.wordsArray.push({ word: "lasagne", status: 4, categoryNum: 1});
    this.wordsArray.push({ word: "elbow", status: 4, categoryNum: 1});
    this.wordsArray.push({ word: "gopher", status: 4, categoryNum: 2});
    this.wordsArray.push({ word: "enough", status: 4, categoryNum: 2});
    this.wordsArray.push({ word: "physics", status: 4, categoryNum: 2});
    this.wordsArray.push({ word: "phone", status: 4, categoryNum: 2});
    this.wordsArray.push({ word: "show", status: 4, categoryNum: 3});
    this.wordsArray.push({ word: "head", status: 4, categoryNum: 3});
    this.wordsArray.push({ word: "shack", status: 4, categoryNum: 3});
    this.wordsArray.push({ word: "waves", status: 4, categoryNum: 3});
    this.shuffle();
  }  
  wordClicked(word: string){
    this.pop_up_text = "";
    for(let i = 0; i < this.wordsArray.length;i++){
      if(this.wordsArray[i].word === word){
        if(this.wordsArray[i].status === 4){
          if(this.clickedWords < 4){
            this.wordsArray[i].status = 5;
            this.clickedWords++;
          }
        }
        else{
          this.wordsArray[i].status = 4;
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
    let currentCheckedWords: {word:string, status: number, categoryNum: number}[] = []; // create temp array for current clicked words
    
    for(let i = 0; i < this.wordsArray.length; i++){ // iterate through all words and add selected ones to temp array
      if(this.wordsArray[i].status === 5){
        currentCheckedWords.push(this.wordsArray[i]);
      }
    }

    // create array of just the words
    let currentCheckedWordsStrings: string[] = [];
    for(let word of currentCheckedWords){
      currentCheckedWordsStrings.push(word.word);
    }
    
    // sort the temp array
    currentCheckedWordsStrings.sort((a, b) => {return a.localeCompare(b);});

    let guessedBefore: boolean = false;
    for(let i = 0 ; i < this.guesses.length; i++){ // make sure this sequence has not been guessed before
      guessedBefore = true;
      for(let j = 0; j < this.guesses[i].length;j++){
        if(this.guesses[i][j] !== currentCheckedWordsStrings[j])
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
      this.guesses.push(currentCheckedWordsStrings);
    }

    let correct:boolean = true;
    // check that all clicked words are in same category
    let tempCategory: number = currentCheckedWords[0].categoryNum;
    for(let i = 1; i < currentCheckedWords.length; i++){
      if(currentCheckedWords[i].categoryNum !== tempCategory){ // guess was incorrect
        this.lives.pop();
        correct = false;
        break;
      }
    }

    if(correct){
      for(let i = 0; i < currentCheckedWords.length; i++){ // update array to show that guess was correct
        currentCheckedWords[i].status = currentCheckedWords[i].categoryNum;
      }
      this.clickedWords = 0; // reset clicked words
      // put solved categories words at the top
      let count: number = 0;
      for(let i = this.guessedCategories; i < this.wordsArray.length; i++){
        for(let j = count; j < currentCheckedWords.length; j++){
          if(this.wordsArray[i] == currentCheckedWords[j]){
            let temp = this.wordsArray[i];
            this.wordsArray.splice(i,1); // delete from old spot
            this.wordsArray.splice((4*this.guessedCategories) + count, 0, temp); // place in front of already guessed categories
            count++;
          }
        }
      }
      this.guessedCategories++;
      this.displayedCategories[currentCheckedWords[0].status] = this.categoryNames[currentCheckedWords[0].status];
      if(this.guessedCategories == 4){
        this.pop_up_text = "Nice Job!!!";
      }
    }
    else{ // incorrect guess
      this.pop_up_text = "incorrect";
    }
  }
  
  shuffle(){
    for (let i = this.wordsArray.length - 1; i >= (4*this.guessedCategories); i--) { 
      const j = Math.floor(Math.random() * (i - (4*this.guessedCategories) + 1) + (4*this.guessedCategories)); // Ensure j is at least 4
      [this.wordsArray[i], this.wordsArray[j]] = [this.wordsArray[j], this.wordsArray[i]]; 
    } 
  }
}
