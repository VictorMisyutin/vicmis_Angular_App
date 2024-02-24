import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

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

  constructor() { }
  
  ngOnInit(): void {
    this.userGeneratedBoard = true;
    // this.generateStarterSudokuGrid();
    this.resetSudokuGrid();
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
    this.updateMatrix(row, col, parseInt(target.value));
  }
  
  updateMatrix(row: number, col: number, value: number) {
    this.displayedSudokuData[row][col].value = value;
    this.displayedSudokuData[row][col].checked = false;
    if(this.userGeneratedBoard){
      this.displayedSudokuData[row][col].initialVal = true;
    }
  }

  generateStarterSudokuGrid(): void{
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
    let starterCellCount = Math.floor(Math.random() * 8) + 26; 

    for(let i = 0; i < 9; i++){
      for(let j = 0; j < 9;j++){
        this.displayedSudokuData[i][j] = {value: this.sudokuData[i][j].value, 
          correctSpot: this.sudokuData[i][j].correctSpot, initialVal: this.sudokuData[i][j].initialVal, checked: true} 
      }
    }
    
    while (this.cellsFilled > starterCellCount) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      this.displayedSudokuData[row][col] = {value:0, correctSpot:false, initialVal: false, checked:false} ;  
      this.cellsFilled--;
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
          this.cellsFilled++;
          
          if (this.solveSudokuGridMyAlgo()) {
              return true; // Sudoku grid solved
          }

          // If the current placement doesn't lead to a solution, backtrack
          this.sudokuData[row][col] = {value: 0, correctSpot: false, initialVal: false};
          this.cellsFilled--;
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
          this.cellsFilled++;
          
          if (this.solveSudokuGridMyAlgo()) {
              return true; // Sudoku grid solved
          }

          // If the current placement doesn't lead to a solution, backtrack
          this.displayedSudokuData[row][col] = {value: 0, correctSpot: false, initialVal: false, checked: false};
          this.cellsFilled--;
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
    if(!this.isValidPlacement){
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