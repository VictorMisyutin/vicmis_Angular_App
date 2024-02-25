import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

// enum difficulty {easy, medium, hard, extreme}

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})


export class SudokuComponent implements OnInit {
  
  displayedSudokuData: { value: number, correctSpot: boolean, initialVal: boolean, checked: boolean }[][] = [];
  sudokuData: { value: number, correctSpot: boolean, initialVal:boolean }[][] = [];
  userGeneratedBoard: boolean = false;
  cellsFilled: number = 0;
  difficulty: number = 1;
  
  constructor() { }
  
  ngOnInit(): void {
    // let a = difficulty.easy;
    this.changeDifficulty(1);
    this.userGeneratedBoard = true;
    // this.generateSudokuGrid();
    this.resetSudokuGrid();
  }

  changeDifficulty(diff: number){
    this.difficulty = diff;

    document.getElementById('easy-button')?.classList.remove('active-difficulty');
    document.getElementById('medium-button')?.classList.remove('active-difficulty');
    document.getElementById('hard-button')?.classList.remove('active-difficulty');
    document.getElementById('extreme-button')?.classList.remove('active-difficulty');

    switch(this.difficulty){
      case 0: { document.getElementById('easy-button')?.classList.add('active-difficulty'); break;}
      case 1: { document.getElementById('medium-button')?.classList.add('active-difficulty'); break;}
      case 2: { document.getElementById('hard-button')?.classList.add('active-difficulty'); break;}
      case 3: { document.getElementById('extreme-button')?.classList.add('active-difficulty'); break;}
    }
    this.generateSudokuGrid();
  }
  
  resetSudokuGrid(): void {
    this.userGeneratedBoard = true;
    this.displayedSudokuData = []
    this.sudokuData = [];
    this.cellsFilled = 0;
    for (let i = 0; i < 9; i++) {
      this.sudokuData[i] = [];
      this.displayedSudokuData[i] = [];
      for (let j = 0; j < 9; j++) {
        this.sudokuData[i][j] = { value: 0, correctSpot: false, initialVal: false }; // Initialize grid with zeros
        this.displayedSudokuData[i][j] = { value: 0, correctSpot: false, initialVal: false, checked: false }; // Initialize grid with zeros
      }
    }
  }
  
  shuffle(arr: number[]): number[]{
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr;
  };
  
  handleInput(event: Event, row: number, col: number) {
    const target = event.target as HTMLInputElement;
    let num = 0;
    if(target.value != '') num = parseInt(target.value);   
    this.updateMatrix(row, col, num);
  }
  
  updateMatrix(row: number, col: number, value: number) {
    this.displayedSudokuData[row][col].value = value;
    this.displayedSudokuData[row][col].checked = false;
    if(this.userGeneratedBoard){
      this.displayedSudokuData[row][col].initialVal = true;
    }
  }

  generateSudokuGrid(): void{
    this.resetSudokuGrid();
    this.userGeneratedBoard = false;
    // randomize start
    let startingArray: number[] = [1,2,3,4,5,6,7,8,9];
    this.shuffle(startingArray);
    for (let i = 0; i < 9; i++){
      this.sudokuData[0][i] = {value: startingArray[i], correctSpot:true, initialVal: true}
    }
    // solve the grid
    this.solveSudokuGridMyAlgo();
    // remove some random cells
    let deviation = -7 * (this.difficulty-5) + 10;
    console.log(deviation);
    let starterCellCount = Math.floor(Math.random() * 10) + deviation; 

    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9;j++){
        this.displayedSudokuData[i][j] = {value: this.sudokuData[i][j].value, 
          correctSpot: this.sudokuData[i][j].correctSpot, initialVal: this.sudokuData[i][j].initialVal, checked: true} 
      }
    }
    
    this.cellsFilled = 81
    while (this.cellsFilled > starterCellCount) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if(this.displayedSudokuData[row][col].value !== 0){
        this.displayedSudokuData[row][col] = {value:0, correctSpot:false, initialVal: false, checked:false} ;  
        this.cellsFilled--; 
      }
    }
  }
  
  solveSudokuGridMyAlgo(): boolean {
    if(!this.userGeneratedBoard){
      const emptyCell = this.findEmptyCell();
      if (!emptyCell) {
          return true; // Sudoku grid solved
      }
  
      const row = emptyCell[0];
      const col = emptyCell[1];
  
      for (let num = 1; num <= 9; num++) {
        if (this.isValidPlacement(row, col, num)) {
          this.sudokuData[row][col] = {value: num, correctSpot: true, initialVal: true};
          
          if (this.solveSudokuGridMyAlgo()) {
              return true; // Sudoku grid solved
          }

          // If the current placement doesn't lead to a solution, backtrack
          this.sudokuData[row][col] = {value: 0, correctSpot: false, initialVal: false};
        }
      }
    }
    else{
      const emptyCell = this.findEmptyCell();
      if (!emptyCell) {
          return true; // Sudoku grid solved
      }
  
      const row = emptyCell[0];
      const col = emptyCell[1];
  
      for (let num = 1; num <= 9; num++) {
        if (this.isValidPlacement(row, col, num)) {
          this.displayedSudokuData[row][col] = {value: num, correctSpot: true, initialVal: false, checked: true};
          
          if (this.solveSudokuGridMyAlgo()) {
              return true; // Sudoku grid solved
          }

          // If the current placement doesn't lead to a solution, backtrack
          this.displayedSudokuData[row][col] = {value: 0, correctSpot: false, initialVal: false, checked: false};
        }
      }
    }
    return false; // No solution found
  }

  displaySolvedBoard(){
    if(!this.userGeneratedBoard){
      for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
          this.displayedSudokuData[i][j] = {value: this.sudokuData[i][j].value, correctSpot: true, initialVal: this.displayedSudokuData[i][j].initialVal, checked: true}
        }
      }
    }
    else{
      this.solveSudokuGridMyAlgo();
    }
  }

  findEmptyCell(): [number, number] | null {
    if(!this.userGeneratedBoard){
      for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
              if (this.sudokuData[row][col].value === 0 ) {
                  return [row, col]; // Found an empty cell
              }
          }
      }
    }
    else{
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (this.displayedSudokuData[row][col].value === 0 ) {
                return [row, col]; // Found an empty cell
            }
        }
      }
    }
    return null; // No empty cells found
  }

  isValidPlacement(row: number, col: number, num: number): boolean {
    return (
      !this.usedInRow(row, num) &&
      !this.usedInCol(col, num) &&
      !this.usedInBox(row - (row % 3), col - (col % 3), num)
    );
  }

  usedInRow(row: number, num: number): boolean {
    if(!this.userGeneratedBoard){
      for (let i = 0; i < 9; i++) {
        if (this.sudokuData[row][i].value === num) {
          return true;
        }
      }
    }
    else{
      for (let i = 0; i < 9; i++) {
        if (this.displayedSudokuData[row][i].value === num) {
          return true;
        }
      }
    }
    return false;
  }

  usedInCol(col: number, num: number): boolean {
    if(!this.userGeneratedBoard){
      for (let i = 0; i < 9; i++) {
        if (this.sudokuData[i][col].value === num) {
          return true;
        }
      }
    }
    else{
      for (let i = 0; i < 9; i++) {
        if (this.displayedSudokuData[i][col].value === num) {
          return true;
        }
      }
    }
    return false;
  }

  usedInBox(startRow: number, startCol: number, num: number): boolean {
    if(!this.userGeneratedBoard){
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.sudokuData[row + startRow][col + startCol].value === num) {
            return true;
          }
        } 
      }
    }
    else{
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (this.displayedSudokuData[row + startRow][col + startCol].value === num) {
            return true;
          }
        } 
      }
    }
    return false;
  }

  checkGrid(){
    if(!this.userGeneratedBoard){
      for(let i = 0; i < 9;i++){
        for(let j = 0; j < 9;j++)
        {
          if(this.displayedSudokuData[i][j].value === this.sudokuData[i][j].value){
            this.displayedSudokuData[i][j].correctSpot = true;
          }
          this.displayedSudokuData[i][j].checked = true;
        }
      }
    }
  }

}