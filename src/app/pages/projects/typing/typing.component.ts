// src/app/typing/typing.component.ts
import { Component, OnInit } from '@angular/core';
import { generate } from "random-words";
import { QuoteService } from '../../../services/quote.service';

@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.css']
})
export class TypingComponent implements OnInit {
  textString: string = "";
  textArray: { character: string, status: number }[] = [];
  numCharacters: number = 0;
  position: number = 0;
  numWords: number = 30;
  startTime: number = Date.now();
  timer: number = 0;
  timerRef: any;
  timed: boolean = true;
  timeLength: number = 30;
  tempTime: number = 0;
  WPM: number = 0.0;
  accuracy: number = 0.0;
  currentText: { character: string, status: number }[] = [];
  isCapsLockOn: boolean = false;
  activeGameType:string = "";
  //   ||
  //   ||
  //   \/
  // game options:
  // timed
  // words
  // quotes

  option1: string = "";
  option2: string = "";
  option3: string = "";
  option4: string = "";

  constructor(private quoteService: QuoteService){}

  ngOnInit(): void {
    this.activeGameType = "words"
    this.option1 = "10";
    this.option2 = "25";
    this.option3 = "50";
    this.option4 = "100";
    this.setWords(25);
    
    document.getElementById('words-game-type')?.classList.add('active-select');
    document.getElementById('option2')?.classList.add('active-select');
  }

  option1_clicked(){
    document.getElementById('option1')?.classList.add('active-select');
    document.getElementById('option2')?.classList.remove('active-select');
    document.getElementById('option3')?.classList.remove('active-select');
    document.getElementById('option4')?.classList.remove('active-select');

    if(this.activeGameType === 'timed'){
      this.setTime(15);
    }
    else if(this.activeGameType === 'words'){
      this.setTime(10);
    }
    else if(this.activeGameType === 'quotes'){
      this.setQuote(1);
    }
  }

  option2_clicked(){
    document.getElementById('option1')?.classList.remove('active-select');
    document.getElementById('option2')?.classList.add('active-select');
    document.getElementById('option3')?.classList.remove('active-select');
    document.getElementById('option4')?.classList.remove('active-select');
    
    if(this.activeGameType === 'timed'){
      this.setTime(30);
    }
    else if(this.activeGameType === 'words'){
      this.setTime(25);
    }
    else if(this.activeGameType === 'quotes'){
      this.setQuote(2);
    }
  }

  option3_clicked(){
    document.getElementById('option1')?.classList.remove('active-select');
    document.getElementById('option2')?.classList.remove('active-select');
    document.getElementById('option3')?.classList.add('active-select');
    document.getElementById('option4')?.classList.remove('active-select');
    
    if(this.activeGameType === 'timed'){
      this.setTime(60);
    }
    else if(this.activeGameType === 'words'){
      this.setTime(50);
    }
    else if(this.activeGameType === 'quotes'){
      this.setQuote(3);
    }
  }

  option4_clicked(){
    document.getElementById('option1')?.classList.remove('active-select');
    document.getElementById('option2')?.classList.remove('active-select');
    document.getElementById('option3')?.classList.remove('active-select');
    document.getElementById('option4')?.classList.add('active-select');
    
    if(this.activeGameType === 'timed'){
      this.setTime(120);
    }
    else if(this.activeGameType === 'words'){
      this.setTime(100);
    }
    else if(this.activeGameType === 'quotes'){
      this.setQuote(4);
    }
  }

  setActiveGameType(type: string){  
    if(type === 'timed'){
      document.getElementById('words-game-type')?.classList.remove('active-select');
      document.getElementById('quotes-game-type')?.classList.remove('active-select');
      document.getElementById('words-game-type')?.classList.add('game-type');
      document.getElementById('quotes-game-type')?.classList.add('game-type');

      document.getElementById('timed-game-type')?.classList.remove('game-type');
      document.getElementById('timed-game-type')?.classList.add('active-select'); 

      this.activeGameType = "timed"
      this.option1 = "15";
      this.option2 = "30";
      this.option3 = "60";
      this.option4 = "120";
      this.setTime(30);
    }
    else if(type === 'words'){
      document.getElementById('timed-game-type')?.classList.remove('active-select');
      document.getElementById('quotes-game-type')?.classList.remove('active-select');
      document.getElementById('timed-game-type')?.classList.add('game-type');
      document.getElementById('quotes-game-type')?.classList.add('game-type');

      document.getElementById('words-game-type')?.classList.remove('game-type');
      document.getElementById('words-game-type')?.classList.add('active-select'); 

      this.activeGameType = "words"
      this.option1 = "10";
      this.option2 = "25";
      this.option3 = "50";
      this.option4 = "100";
      this.setWords(25);

    }
    else if(type === 'quotes'){
      document.getElementById('timed-game-type')?.classList.remove('active-select');
      document.getElementById('words-game-type')?.classList.remove('active-select');
      document.getElementById('timed-game-type')?.classList.add('game-type');
      document.getElementById('words-game-type')?.classList.add('game-type');

      document.getElementById('quotes-game-type')?.classList.remove('game-type');
      document.getElementById('quotes-game-type')?.classList.add('active-select'); 

      this.activeGameType = "quotes"
      this.option1 = "small";
      this.option2 = "medium";
      this.option3 = "large";
      this.option4 = "X large";
      this.setQuote(2);
    }
  }

  setQuote(length: number) {
    clearInterval(this.timerRef);
    this.timer = 0;
    this.timed = false;
    this.quoteService.getRandomQuote(length).subscribe((data) => {
      this.textString = data[0].content;
      this.textArray = this.textString.split('').map((char: string) => ({ character: char, status: 0 }));
      this.numCharacters = this.textArray.length;
      this.position = 0;
      document.getElementById('main-text')?.focus();
      this.onFocus();
    });
  }

  setWords(words: number) {
    clearInterval(this.timerRef);
    this.timer = 0;
    this.timed = false;
    this.numWords = words;
    this.generateText(this.numWords);
  }

  setTime(time: number) {
    clearInterval(this.timerRef);
    this.timer = 0;
    this.timed = true;
    this.timeLength = time;
    this.generateText(2 * this.timeLength);
  }

  generateText(length: number) {
    this.textString = "";
    this.textArray = [];
    this.textString = generate({ exactly: length, maxLength: 7 }).toString().toLowerCase().replaceAll(',', ' ');
    let tempArr: string[] = this.textString.split('');
    for (let i = 0; i < tempArr.length; i++) {
      this.textArray[i] = { character: tempArr[i], status: 0 };
    }
    this.numCharacters = this.textArray.length;
    this.position = 0;
    document.getElementById('main-text')?.focus();
    this.onFocus();
  }

  onKeyUp(event: KeyboardEvent) {
    this.isCapsLockOn = event.getModifierState && event.getModifierState('CapsLock');
    const key = event.keyCode || event.charCode;
    if(key < 32&& key != 8) return;
    if (key === 27) {
      const mainText = document.getElementById('main-text');
      if (mainText) {
        mainText.blur();
      }
    }
    if((key < 32 || key > 125) && key != 8) return;
  }

  onKeyDown(event: KeyboardEvent) {
    this.isCapsLockOn = event.getModifierState && event.getModifierState('CapsLock');
    const key = event.keyCode || event.charCode;
    if(key < 32 && key != 8) return;
    let correct: boolean = true;
    if (key === 8 || key === 46) { //backspace or delete or ctrl
      // go back to last character with status that is not 0
      if (this.textArray[this.position - 1].status != 0) {
        this.textArray[this.position - 1].status = 0;
        if (this.position > 0) this.position--;
      }
      else {
        for (let i = this.position; i >= 0; i--) {
          if (this.textArray[i].status !== 0) {
            this.position = i + 1;
            break;
          }
        }
      }
    }
    else { // normal key press
      if (this.position === 0) {
        this.startTime = Date.now();
        this.timerRef = setInterval(() => {
          this.timer = (Date.now() - this.startTime) / 1000;
        });
      }
      if (this.textArray[this.position].character === event.key) {
        this.textArray[this.position].status = 1;
        correct = true;
      }
      else { // incorrect key
        correct = false;
        this.textArray[this.position].status = 2;
        if (key === 32 && this.textArray[this.position - 1].character !== ' ') { // skip to next space
          for (let i = this.position; i < this.textArray.length; i++) {
            if (this.textArray[i].character == ' ') {
              this.position = i;
              this.textArray[this.position].status = 1;
              break;
            }
          }
        }
      }
      this.position++;
      if (this.textArray[this.position - 1].character === ' ' && !correct) {
        this.position--;
      }
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
    if (((this.activeGameType === 'words' || this.activeGameType ==='quote' ) && this.position == this.numCharacters) || (this.activeGameType === 'timed' && this.timer > this.timeLength))
      this.testComplete();

    return false;
  }

  testComplete() {
    clearInterval(this.timerRef);
    let typedCorrectly: number = 0;
    let typedIncorrectly: number = 0;
    for (let letter of this.textArray) {
      if (letter.status === 1) typedCorrectly++;
      else if (letter.status === 2) typedIncorrectly++;
    }
    this.WPM = (typedCorrectly / 5) / (this.timer / 60);
    this.accuracy = (typedCorrectly) / (typedIncorrectly + typedCorrectly);

    document.getElementById('main-text')?.classList.remove('main-text');
    document.getElementById('timer')?.classList.remove('timer');
    document.getElementById('timer')?.classList.add('timer-hide');
    document.getElementById('main-text')?.classList.add('main-text-hide');
    document.getElementById('analysis')?.classList.remove('analysis-hide');
    document.getElementById('analysis')?.classList.add('analysis');
  }

  textClicked() {
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

  restart() {
    document.getElementById('timer')?.classList.remove('timer-hide');
    document.getElementById('main-text')?.classList.remove('main-text-hide');
    document.getElementById('main-text')?.classList.add('main-text');
    document.getElementById('timer')?.classList.add('timer');
    document.getElementById('analysis')?.classList.remove('analysis');
    document.getElementById('analysis')?.classList.add('analysis-hide');
    document.getElementById('main-text')?.focus();
    if (this.timed)
      this.generateText(2 * this.timeLength);
    else
      this.generateText(this.numWords);
    this.timer = 0;
    clearInterval(this.timerRef);
  }

  onFocus() {
    document.getElementById('main-text')?.classList.remove('main-text-blur');
    document.getElementById('main-text')?.classList.add('main-text-active');
    this.currentText = this.textArray;
    if (!this.timed && this.position !== 0) {
      this.startTime = Date.now();
      this.timerRef = setInterval(() => {
        this.timer = ((Date.now() - this.startTime) / 1000) + this.tempTime;
      });
    }
  }

  onBlur() {
    clearInterval(this.timerRef);
    this.tempTime = this.timer;
    document.getElementById('main-text')?.classList.remove('main-text-active');
    document.getElementById('main-text')?.classList.add('main-text-blur');
    let text = "click here to continue...";
    this.currentText = []
    for (let i = 0; i < text.length; i++) {
      this.currentText[i] = { character: text[i], status: 3 };
    }
  }
}
