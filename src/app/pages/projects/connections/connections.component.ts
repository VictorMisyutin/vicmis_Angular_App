import { Component } from '@angular/core';
import { catchError, first } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.css'
})

export class ConnectionsComponent {
  
  lives: number[] = [0, 1, 2, 3];
  wordsArray: {word:string, status: number, categoryNum: number, highlight: boolean}[] = [];
  clickedWords: number = 0;
  /*
  status: 0 ==> yellow
  status: 1 ==> green
  status: 2 ==> blue
  status: 3 ==> purple
  status: 4 ==> unsolved
  status: 5 ==> clicked
  status: 6 ==> hinted
  */
  guesses: string[][] = []; // keep track of already guessed sequences
  pop_up_text: string = ""; // text that will display below grid
  guessedCategories: number = 0; // keep track of how many categories player has gotten correct
  hinted: boolean = false; // keep track of if user already has hint
  categoryNames: string[] = ["Finger Foods", "Nail Shapes", "Types of Shoes", "Found in a park"];

  displayedCategories: string[] = ["", "", "",""];

  selectedWord: string = "";


    // decrypt the encrypted string
    decrypt(encryptedString: string){
      let key: string = "";
      if(!encryptedString || encryptedString.length == 0) return key;
  
      for(let i = 0; i < encryptedString.length; i+=3){
        key += String.fromCharCode(parseInt(encryptedString.substring(i, i+3)));
      }
      return key;
    }

  constructor(private route: ActivatedRoute){
    // check if custom game
    if(window.location.href.indexOf('?') == -1){
      this.wordsArray.push({ word: "Seed", status: 4, categoryNum: 0, highlight: false});
      this.wordsArray.push({ word: "Wing", status: 4, categoryNum: 0, highlight: false});
      this.wordsArray.push({ word: "Cracker", status: 4, categoryNum: 0, highlight: false});
      this.wordsArray.push({ word: "Hotdog", status: 4, categoryNum: 0, highlight: false});
      this.wordsArray.push({ word: "Almond", status: 4, categoryNum: 1, highlight: false});
      this.wordsArray.push({ word: "Square", status: 4, categoryNum: 1, highlight: false});
      this.wordsArray.push({ word: "Edge", status: 4, categoryNum: 1, highlight: false});
      this.wordsArray.push({ word: "Stiletto", status: 4, categoryNum: 1, highlight: false});
      this.wordsArray.push({ word: "Heel", status: 4, categoryNum: 2, highlight: false});
      this.wordsArray.push({ word: "Flat", status: 4, categoryNum: 2, highlight: false});
      this.wordsArray.push({ word: "Boat", status: 4, categoryNum: 2, highlight: false});
      this.wordsArray.push({ word: "Platform", status: 4, categoryNum: 2, highlight: false});
      this.wordsArray.push({ word: "Bench", status: 4, categoryNum: 3, highlight: false});
      this.wordsArray.push({ word: "Swing", status: 4, categoryNum: 3, highlight: false});
      this.wordsArray.push({ word: "Slide", status: 4, categoryNum: 3, highlight: false});
      this.wordsArray.push({ word: "Kids", status: 4, categoryNum: 3, highlight: false});
    }
    else{
      this.route.queryParams.subscribe(params => {
        // get categories
        this.categoryNames[0] = this.decrypt(params['a']);
        this.categoryNames[1] = this.decrypt(params['b']);
        this.categoryNames[2] = this.decrypt(params['c']);
        this.categoryNames[3] = this.decrypt(params['d']);
        // get answers
        let yellowAnswers = this.decrypt(params['e']).split(',');
        let greenAnswers = this.decrypt(params['f']).split(',');
        let blueAnswers = this.decrypt(params['g']).split(',');
        let purpleAnswers = this.decrypt(params['h']).split(',');
        
        // push to wordsArray
        this.wordsArray.push({ word: yellowAnswers[0], status: 4, categoryNum: 0, highlight: false});
        this.wordsArray.push({ word: yellowAnswers[1], status: 4, categoryNum: 0, highlight: false});
        this.wordsArray.push({ word: yellowAnswers[2], status: 4, categoryNum: 0, highlight: false});
        this.wordsArray.push({ word: yellowAnswers[3], status: 4, categoryNum: 0, highlight: false});
        this.wordsArray.push({ word: greenAnswers[0], status: 4, categoryNum: 1, highlight: false});
        this.wordsArray.push({ word: greenAnswers[1], status: 4, categoryNum: 1, highlight: false});
        this.wordsArray.push({ word: greenAnswers[2], status: 4, categoryNum: 1, highlight: false});
        this.wordsArray.push({ word: greenAnswers[3], status: 4, categoryNum: 1, highlight: false});
        this.wordsArray.push({ word: blueAnswers[0], status: 4, categoryNum: 2, highlight: false});
        this.wordsArray.push({ word: blueAnswers[1], status: 4, categoryNum: 2, highlight: false});
        this.wordsArray.push({ word: blueAnswers[2], status: 4, categoryNum: 2, highlight: false});
        this.wordsArray.push({ word: blueAnswers[3], status: 4, categoryNum: 2, highlight: false});
        this.wordsArray.push({ word: purpleAnswers[0], status: 4, categoryNum: 3, highlight: false});
        this.wordsArray.push({ word: purpleAnswers[1], status: 4, categoryNum: 3, highlight: false});
        this.wordsArray.push({ word: purpleAnswers[2], status: 4, categoryNum: 3, highlight: false});
        this.wordsArray.push({ word: purpleAnswers[3], status: 4, categoryNum: 3, highlight: false});
      });
    }
    this.shuffle();

  }  
  wordClicked(word: string){
    this.pop_up_text = "";
    document.getElementById('pop-up-text')?.classList.remove('pop-up-text-active');
    document.getElementById('pop-up-text')?.classList.add('pop-up-text-hidden');
    for(let i = 0; i < this.wordsArray.length;i++){
      if(this.wordsArray[i].word === word){
        if(this.wordsArray[i].status === 4 || this.wordsArray[i].status === 6){
          if(this.clickedWords < 4){
              this.wordsArray[i].status = 5;
            this.clickedWords++;
          }
        }
        else{
          if(this.wordsArray[i].highlight)
            this.wordsArray[i].status = 6;
          else
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
      document.getElementById('pop-up-text')?.classList.remove('pop-up-text-hidden');
      document.getElementById('pop-up-text')?.classList.add('pop-up-text-active');
      return;
    }
    let currentCheckedWords: {word:string, status: number, categoryNum: number, highlight: boolean}[] = []; // create temp array for current clicked words
    
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
      document.getElementById('pop-up-text')?.classList.remove('pop-up-text-hidden');
      document.getElementById('pop-up-text')?.classList.add('pop-up-text-active');
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
        if(currentCheckedWords[i].highlight){
          this.hinted = false;
        }
        currentCheckedWords[i].status = currentCheckedWords[i].categoryNum;
        // if guessed category with the given hint then reset the hinted boolean
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
        document.getElementById('pop-up-text')?.classList.remove('pop-up-text-hidden');
        document.getElementById('pop-up-text')?.classList.add('pop-up-text-active');
      }
    }
    else{ // incorrect guess
      this.pop_up_text = "incorrect";
      document.getElementById('pop-up-text')?.classList.remove('pop-up-text-hidden');
      document.getElementById('pop-up-text')?.classList.add('pop-up-text-active');
    }
  }
  
  deselectAll(){
    for(let i = 0; i < this.wordsArray.length;i++){
      if(this.wordsArray[i].status === 5){
        this.wordsArray[i].status = 4;
        this.clickedWords--;
      }
    }
  }

  shuffle(){
    for (let i = this.wordsArray.length - 1; i >= (4*this.guessedCategories); i--) { 
      const j = Math.floor(Math.random() * (i - (4*this.guessedCategories) + 1) + (4*this.guessedCategories)); // Ensure j is at least 4
      [this.wordsArray[i], this.wordsArray[j]] = [this.wordsArray[j], this.wordsArray[i]]; 
    } 
  }

  hint(){
    if(!this.hinted){
      // select random word
      let index = Math.floor(Math.random() * (this.wordsArray.length - (this.guessedCategories*4)) + (this.guessedCategories*4));
      console.log("first index: " + index);
      this.wordsArray[index].highlight = true;
      this.wordsArray[index].status = 6;
      let firstWord = this.wordsArray[index].word;
      let firstWordCategory = this.wordsArray[index].categoryNum;
      let secondWord = "";
      let foundAnotherWord = false;
      // select random words until you find a different word in the same category.
      while(!foundAnotherWord){
        let index = Math.floor(Math.random() * (this.wordsArray.length - (this.guessedCategories*4)) + (this.guessedCategories*4));
        console.log(index);
        if(this.wordsArray[index].categoryNum == firstWordCategory && this.wordsArray[index].word != firstWord){
          this.wordsArray[index].highlight = true;
          this.wordsArray[index].status = 6;
          foundAnotherWord = true;
        }
      }
      this.hinted = true;
    }
    else{
      this.pop_up_text = "Solve the current hint before getting another.";
      document.getElementById('pop-up-text')?.classList.remove('pop-up-text-hidden');
      document.getElementById('pop-up-text')?.classList.add('pop-up-text-active');
    }
    
  }

  createConnections(){
    const currentUrl = window.location.href.split('?')[0]; // Get current URL without query params
    const encodedWord = encodeURIComponent("buns");
    const sharedUrl = `${currentUrl}?word=${encodedWord}`;
  }

}
