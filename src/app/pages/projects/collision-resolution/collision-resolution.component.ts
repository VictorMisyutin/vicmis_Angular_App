import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collision-resolution',
  templateUrl: './collision-resolution.component.html',
  styleUrl: './collision-resolution.component.css'
})
export class CollisionResolutionComponent implements OnInit{
  // hashTable: { [key: string]: number } = {};
  hashTableKeys: number[] = [];
  hashTableValues: number[] = [];
  tableSize: number = 20;
  selectedCollisionTechnique: string = "linear";
  numCollisions: number = 0;

  ngOnInit(): void {
    const enterKeyElement = document.getElementById("tableSize") as HTMLInputElement;
    enterKeyElement.value = '20';
    this.instantiateTable();
  }

  instantiateTable(){
    this.hashTableKeys = [];
    this.hashTableValues = [];
    for(let i = 0; i < this.tableSize; i++){
      this.hashTableKeys[i] = 0;
      this.hashTableValues[i] = 0;
    }
  }
  onChangeCollisionTechnique(event: any) {
    this.selectedCollisionTechnique = event.target.value;
  }
  addKey(key: number){
    let index: number = 0;
    index = key % this.tableSize;
    if(this.hashTableKeys[index] !== 0){
      this.numCollisions++;
      if(this.selectedCollisionTechnique === "linear"){
        // linear probing
      }
      else if(this.selectedCollisionTechnique === "quadratic"){
        // quadratic probing 
        
      }
      else{
        // double hash
        
      }
    }
    this.hashTableKeys[index] = key;
  }
  
  enterKey() {
    let newKey: number = 0;
    const enterKeyElement = document.getElementById("enterKeyInput") as HTMLInputElement;
    if (enterKeyElement && enterKeyElement.value !== '') {
      newKey = parseInt(enterKeyElement.value);
      if (newKey > 0 && newKey < 100) {
        this.addKey(newKey);
      }
    }
    enterKeyElement.value = '';
  }


  
  changeTableSize(event: Event) {
    const target = event.target as HTMLInputElement;
    let num: number = 20;
    if(target.value != '') num = parseInt(target.value);   
    if(num > 100) num = 100;
    this.tableSize = num;
    this.instantiateTable();
  }
}
