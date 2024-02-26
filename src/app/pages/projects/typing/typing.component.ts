import { Component, OnInit } from '@angular/core';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { generate, count } from "random-words";
@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.css'
})
export class TypingComponent implements OnInit{
  textString: string = "";
  textArray: {character: string, status: number}[] = [];
  position: number = 0;

  ngOnInit(): void {
    this.generateText(30);
  }
  
  generateText(length: number){
    this.textString = generate(length).toString().toLowerCase().replaceAll(',', ' ');
    let tempArr: string[] = this.textString.split('');
    for(let i = 0; i < tempArr.length; i++){
      this.textArray[i] = {character: tempArr[i], status: 0};
    }
  }

  handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    // let num = 0;
    // if(target.value != '') num = parseInt(target.value);   
    // this.updateMatrix(row, col, num);
  }
  

}
