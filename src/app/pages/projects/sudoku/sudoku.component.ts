import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
  encapsulation: ViewEncapsulation.None // Disable encapsulation
})
export class SudokuComponent implements OnInit {
  sudokuData: number[][] = [];
  starterCellCount: number = 0;
  cellsFilled: number = 0;
  constructor() { }
  
  ngOnInit(): void {
    this.resetSudokuGrid()
  }
  
  resetSudokuGrid(): void {
    this.sudokuData = [];
    this.cellsFilled = 0;
    for (let i = 0; i < 9; i++) {
      this.sudokuData[i] = [];
      for (let j = 0; j < 9; j++) {
        this.sudokuData[i][j] = 0; // Initialize grid with zeros
      }
    }
  }

  generateStarterSudokuGrid(): void {
    this.resetSudokuGrid();
    this.starterCellCount = Math.floor(Math.random() * 12) + 5; // Adjust the range as needed
    // easy is roughly 38
    // hard is roughly  25
    // expert is roughly 22

    while (this.cellsFilled < this.starterCellCount) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const num = Math.floor(Math.random() * 9) + 1;

      if (this.sudokuData[row][col] === 0 && this.isValidPlacement(this.sudokuData, row, col, num)) {
        this.sudokuData[row][col] = num;
        this.cellsFilled++;
      }
    }
  }

solveSudokuGridMyAlgo(): boolean {
  const emptyCell = this.findEmptyCell();
  if (!emptyCell) {
      return true; // Sudoku grid solved
  }

  const row = emptyCell[0];
  const col = emptyCell[1];

  for (let num = 1; num <= 9; num++) {
      if (this.isValidPlacement(this.sudokuData, row, col, num)) {
          this.sudokuData[row][col] = num;
          this.cellsFilled++;
          
          if (this.solveSudokuGridMyAlgo()) {
              return true; // Sudoku grid solved
          }

          // If the current placement doesn't lead to a solution, backtrack
          this.sudokuData[row][col] = 0;
          this.cellsFilled--;
      }
  }

  return false; // No solution found
}

findEmptyCell(): [number, number] | null {
  for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
          if (this.sudokuData[row][col] === 0 ) {
            console.log('found')
              return [row, col]; // Found an empty cell
          }
      }
  }
  return null; // No empty cells found
}
  isValidPlacement(grid: number[][], row: number, col: number, num: number): boolean {
    return (
      !this.usedInRow(grid, row, num) &&
      !this.usedInCol(grid, col, num) &&
      !this.usedInBox(grid, row - (row % 3), col - (col % 3), num)
    );
  }

  usedInRow(grid: number[][], row: number, num: number): boolean {
    return grid[row].includes(num);
  }

  usedInCol(grid: number[][], col: number, num: number): boolean {
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === num) {
        return true;
      }
    }
    return false;
  }

  usedInBox(grid: number[][], startRow: number, startCol: number, num: number): boolean {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (grid[row + startRow][col + startCol] === num) {
          return true;
        }
      }
    }
    return false;
  }

}