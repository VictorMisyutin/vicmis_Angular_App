import { Component, OnInit } from '@angular/core';
import { generate, count } from "random-words";
import { Time } from '@angular/common';
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
  ngOnInit(): void {
    this.generateText(this.numWords);
  }
  
  generateText(length: number){
    this.timer = 0;
    this.textString = generate(length).toString().toLowerCase().replaceAll(',', ' ');
    let tempArr: string[] = this.textString.split('');
    for(let i = 0; i < tempArr.length; i++){
      this.textArray[i] = {character: tempArr[i], status: 0};
    }
    this.numCharacters = this.textArray.length; 
    this.position=0;
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
    console.log(key);
    if(key === 27 || key === 9) { // escape || tab
      return false;
    }
    else if(key == 17){ // ctrl
      return false;
    }
    else if (key === 8 || key === 46) { //backspace or delete
      this.textArray[this.position-1].status = 0;
      if(this.position > 0) this.position--;
    }
    else{
      // if(this.position === 0) this.startTime = Date.now();
      if(this.position ===0){
        this.timerRef = setInterval(() => {
          this.timer = (Date.now() - this.startTime)/1000;
        });
      }
      if(this.textArray[this.position].character === event.key)
        this.textArray[this.position].status = 1;
      else
        this.textArray[this.position].status = 2;
    
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
    if(this.position == this.numCharacters){ 
      clearInterval(this.timerRef);
    }
    return false;
    
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
}
