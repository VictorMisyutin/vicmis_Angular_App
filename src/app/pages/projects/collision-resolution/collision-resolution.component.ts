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
  tableSize: number = 11;
  insertedItems: number = 0;
  selectedCollisionTechnique: string = "linear";
  numCollisions: number = 0;

  ngOnInit(): void {
    const enterKeyElement = document.getElementById("tableSize") as HTMLInputElement;
    enterKeyElement.value = '11';
    this.instantiateTable();
  }

  instantiateTable(){
    this.hashTableKeys = [];
    this.hashTableValues = [];
    this.insertedItems = 0;
    for(let i = 0; i < this.tableSize; i++){
      this.hashTableKeys[i] = 0;
      this.hashTableValues[i] = 0;
    }
  }
  onChangeCollisionTechnique(event: any) {
    this.selectedCollisionTechnique = event.target.value;
    this.instantiateTable();
  }

  isPrime(num: number): boolean {
    if (num <= 1) {
      return false;
    }
    if (num <= 3) {
      return true;
    }
    if (num % 2 === 0 || num % 3 === 0) {
      return false;
    }
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
      i += 6;
    }
    return true;
  }

  nearestPrimeLessThan(value: number): number {
    let prime = value - 1;
    while (prime > 1) {
      if (this.isPrime(prime)) {
        return prime;
      }
      prime--;
    }
    return -1;
  }


  hash2(key: number){
    let doubleFactor: number = (this.nearestPrimeLessThan(this.tableSize));
    return (doubleFactor - (key%doubleFactor));
  }

  addKey(key: number){
    if(this.insertedItems >= this.tableSize) return;
    let index: number = 0;
    index = key % this.tableSize;
    if(this.hashTableKeys[index] !== 0){
      if(this.selectedCollisionTechnique === "linear"){
        // linear probing
        while(this.hashTableKeys[index] !== 0){
          this.numCollisions++;
          index = (index + 1) % this.tableSize;
        }
        this.hashTableKeys[index] = key;
      }
      else if(this.selectedCollisionTechnique === "quadratic"){
        // quadratic probing 
        let startingIndex = index;
        let count: number = 1;
        while(this.hashTableKeys[index] !== 0){
          this.numCollisions++;
          index = (startingIndex + count*count) % this.tableSize;
          count++;
        }
        this.hashTableKeys[index] = key;
      }
      else{
        // double hash
        let startingIndex = index;
        let count: number = 1;
        while(this.hashTableKeys[index] !== 0){
          this.numCollisions++;
          index = (startingIndex + count * this.hash2(key)) % this.tableSize;
          count++;
        }
        this.hashTableKeys[index] = key;
      }
    }
    this.hashTableKeys[index] = key;
    this.insertedItems++;
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
    let num: number = 11;
    if(target.value != '') num = parseInt(target.value);   
    if(num > 100) num = 100;
    else if(num < 5) num = 5;

    this.tableSize = num;
    this.instantiateTable();
  }
}
