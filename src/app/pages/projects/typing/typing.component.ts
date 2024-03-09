import { Component, OnInit } from '@angular/core';
import { generate } from "random-words";

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.css'
})
export class TypingComponent implements OnInit{
  textString: string = "";
  textArray: {character: string, status: number}[] = [];
  numCharacters: number = 0;
  position: number = 0;
  numWords: number = 30;
  startTime: number = Date.now();
  timer: number = 0;
  timerRef: any;
  timed: boolean = true;
  timeLength: number = 30;
  WPM: number = 0.0;
  accuracy: number = 0.0;

  ngOnInit(): void {
    this.setWords(25);
  }
  
  setWords(words: number){
    clearInterval(this.timerRef);
    this.timed = false;
    this.numWords = words;
    document.getElementById('10-words')?.classList.remove('active-select');
    document.getElementById('25-words')?.classList.remove('active-select');
    document.getElementById('50-words')?.classList.remove('active-select');
    document.getElementById('100-words')?.classList.remove('active-select');

    document.getElementById('15-seconds')?.classList.remove('active-select');
    document.getElementById('30-seconds')?.classList.remove('active-select');
    document.getElementById('60-seconds')?.classList.remove('active-select');
    document.getElementById('120-seconds')?.classList.remove('active-select');

    switch(words){
      case 10: { document.getElementById('10-words')?.classList.add('active-select'); break;}
      case 25: { document.getElementById('25-words')?.classList.add('active-select'); break;}
      case 50: { document.getElementById('50-words')?.classList.add('active-select'); break;}
      case 100: { document.getElementById('100-words')?.classList.add('active-select'); break;}
    }

    this.generateText(this.numWords);
  }

  setTime(time: number){
    clearInterval(this.timerRef);
    this.timed = true;
    this.timeLength = time;
    document.getElementById('10-words')?.classList.remove('active-select');
    document.getElementById('25-words')?.classList.remove('active-select');
    document.getElementById('50-words')?.classList.remove('active-select');
    document.getElementById('100-words')?.classList.remove('active-select');

    document.getElementById('15-seconds')?.classList.remove('active-select');
    document.getElementById('30-seconds')?.classList.remove('active-select');
    document.getElementById('60-seconds')?.classList.remove('active-select');
    document.getElementById('120-seconds')?.classList.remove('active-select');
    switch(time){
      case 15: { document.getElementById('15-seconds')?.classList.add('active-select'); break;}
      case 30: { document.getElementById('30-seconds')?.classList.add('active-select'); break;}
      case 60: { document.getElementById('60-seconds')?.classList.add('active-select'); break;}
      case 120: { document.getElementById('120-seconds')?.classList.add('active-select'); break;}
    }

    this.generateText(2*this.timeLength);
  }

  generateText(length: number){
    this.timer = 0;
    this.textString = "";
    this.textArray = [];
    this.textString = generate(length).toString().toLowerCase().replaceAll(',', ' ');
    let tempArr: string[] = this.textString.split('');
    for(let i = 0; i < tempArr.length; i++){
      this.textArray[i] = {character: tempArr[i], status: 0};
    }
    this.numCharacters = this.textArray.length; 
    this.position=0;
    document.getElementById('main-text')?.focus();
  }
  onKeyUp(event:KeyboardEvent){
    const key = event.keyCode || event.charCode; 
    if(key === 27) {
      const mainText = document.getElementById('main-text');
      if (mainText) {
        mainText.blur();
      }
    }
    else if (key === 9){
      this.generateText(this.numWords);
    }
  }
  onKeyDown(event:KeyboardEvent){
    const key = event.keyCode || event.charCode;
    if(key === 27 || key === 9) { // escape || tab
      return false;
    }
    else if(key == 17){ // ctrl
      return false;
    }
    else if (key === 8 || key === 46) { //backspace or delete
      // go back to last character with status that is not 0
      if(this.textArray[this.position-1].status != 0){
        this.textArray[this.position-1].status = 0;
        if(this.position > 0) this.position--;
      }
      else{
        for(let i = this.position; i >= 0; i--){
          if(this.textArray[i].status !== 0){
            this.position = i+1;
            break;
          }
        }
      }

    }
    else{ // normal key press
      if(this.position === 0) this.startTime = Date.now();
      if(this.position ===0){
        this.timerRef = setInterval(() => {
          this.timer = (Date.now() - this.startTime)/1000;
        });
      }
      if(this.textArray[this.position].character === event.key)
        this.textArray[this.position].status = 1;
      else{ // incorrect key
        if(this.textArray[this.position-1].character === ' ' && key !== 32){
          this.position--;
        }
        this.textArray[this.position].status = 2;
        if(key === 32){ // skip to next space
          for(let i = this.position; i < this.textArray.length; i++){
            if(this.textArray[i].character == ' '){
              this.position = i;
              this.textArray[this.position].status = 1;
              break;
            }
          }
        }
      }
    
      this.position++;
    }

    const element = document.getElementById('main-text');
    if (element instanceof HTMLDivElement) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(element.childNodes[this.position], 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
    if((!this.timed && this.position == this.numCharacters) || (this.timed && this.timer > this.timeLength))
      this.testComplete();

    return false;
  }

  testComplete(){
    clearInterval(this.timerRef);
    let typedCorrectly: number = 0;
    let typedIncorrectly: number = 0;
    for(let letter of this.textArray){
      if(letter.status === 1) typedCorrectly++;
      else if(letter.status === 2) typedIncorrectly++;
    }
    this.WPM = (typedCorrectly/5) / (this.timer/60);
    this.accuracy = (typedCorrectly)/(typedIncorrectly + typedCorrectly)

    document.getElementById('main-text')?.classList.remove('main-text');
    document.getElementById('timer')?.classList.remove('timer');
    document.getElementById('timer')?.classList.add('timer-hide');
    document.getElementById('main-text')?.classList.add('main-text-hide');
    document.getElementById('analysis')?.classList.remove('analysis-hide');
    document.getElementById('analysis')?.classList.add('analysis');

  }
  textClicked(){
    const element = document.getElementById('main-text');
    if (element instanceof HTMLDivElement) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.setStart(element.childNodes[this.position], 0);
      range.collapse(true);
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  }
  restart(){

    document.getElementById('timer')?.classList.remove('timer-hide');
    document.getElementById('main-text')?.classList.remove('main-text-hide');
    document.getElementById('main-text')?.classList.add('main-text');
    document.getElementById('timer')?.classList.add('timer');
    document.getElementById('analysis')?.classList.remove('analysis');
    document.getElementById('analysis')?.classList.add('analysis-hide');
    document.getElementById('main-text')?.focus();
    if(this.timed)
      this.generateText(2*this.timeLength);
    else
      this.generateText(this.numWords);
}
}
