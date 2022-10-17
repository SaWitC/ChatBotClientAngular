import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-g2048',
  templateUrl: './g2048.component.html',
  styleUrls: ['./g2048.component.css']
})
export class G2048Component implements OnInit {

  constructor() { }

  public Values: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  //public ValuesCopy: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];


  length: number = 4;

  ngOnInit(): void {

    this.generate();
    this.generate();
  }

  checkWin() {
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this.length; j++) {
        if (this.Values[i][j] == 2048) {
          console.log(this.Values[i][j]);
          alert("you win");
          this.restart();
          return true;
        }
      }
    }
    return false;
  }

  restart() {
    this.Values = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.generate();
    this.generate();
  }

  generate() {
    if (this.checkWin())
      return;

    var coords: coord[] = [];
     
    //get all empty boxes
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this.length; j++) {

       if (this.Values[i][j] == 0) {
         var x = new coord();
         x.x = i;
         x.y = j;
         coords.push(x);
       } 
     }
    }

    //set value
    var rand = Math.floor(Math.random() * coords.length);
    var randomElement = coords[rand];
    if (!randomElement) {
      alert("you lose")
      this.restart();

    }
    this.Values[randomElement.x][randomElement.y] = 2;
  }

  dorigth() {
    let modified: boolean = false;
    let col = -1;
    var arrCopy = this.Values.slice();

    for (var i = 0; i < this.length; i++) {
      for (var y = this.length-1; y >= 0; y--) {

        if (arrCopy[y][i] == 0)
          continue;
        if (col == -1) {
          col = y; // remember current col
          continue;
        }
        if (arrCopy[col][i] != arrCopy[y][i]) {
          col = y; // update
          continue;
        }

        if (arrCopy[col][i] == arrCopy[y][i] && col != y) {
          var sum = arrCopy[col][i] + arrCopy[y][i];;
          arrCopy[col][i] += arrCopy[y][i];
          if (arrCopy[y][i] == 0 && arrCopy[col][i] == 0) {
            arrCopy[y][i] = sum;
          }
          col = -1; // reset
          modified = true;
        }
      }
    }

    
    if (modified) {
      this.Values = arrCopy;
      console.log("modified");
    }
    setTimeout(() => {
      var res = this.moveRight();
      if (res)
        this.generate();
    }, 100)

    //this.moveRight();
    //this.generate();
  }

  doBott() {

    let modified: boolean = false;
    let col = -1;
    var arrCopy = this.Values.slice();

    for (var i = 0; i < this.length; i++) {
      for (var y = this.length - 1; y >= 0; y--) {

        if (arrCopy[i][y] == 0)
          continue;
        if (col == -1) {
          col = y; // remember current col
          continue;
        }
        if (arrCopy[i][col] != arrCopy[i][y]) {
          col = y; // update
          continue;
        }

        if (arrCopy[i][col] == arrCopy[i][y] && col != y) {
          var sum = arrCopy[i][col] + arrCopy[i][y];
          arrCopy[i][col] += arrCopy[i][y]; // merge same numbers
          arrCopy[i][y] = 0;
          if (arrCopy[i][y] == 0 && arrCopy[i][col] == 0) {
            arrCopy[i][y] = sum;
          }
          col = -1; // reset
          modified = true;
        }
      }
    }
    if (modified) {
      this.Values = arrCopy;
      console.log("modified");
    }

    setTimeout(() => {
      var res = this.moveBott();
      if (res)
        this.generate();
    }, 100)
    //this.doBott();
    //this.generate();
  }


  doTop() {

    let modified: boolean = false;
    let col = -1;
    var arrCopy = this.Values.slice();

    for (var i = 0; i < this.length; i++) {
      for (var y = 0; y <this.length; y++) {

        if (arrCopy[i][y] == 0)
          continue;
        if (col == -1) {
          col = y; // remember current col
          continue;
        }
        if (arrCopy[i][col] != arrCopy[i][y]) {
          col = y; // update
          continue;
        }

        if (arrCopy[i][col] == arrCopy[i][y] && col != y) {

         
          var sum = arrCopy[i][col] + arrCopy[i][y];
          arrCopy[i][col] += arrCopy[i][y]; // merge same numbers
          arrCopy[i][y] = 0;
          if (arrCopy[i][col]==0 && arrCopy[i][y]==0) {
            arrCopy[i][y] = sum;
          }
          col = -1; // reset
          modified = true;
        }
      }
    }


    if (modified) {
      this.Values = arrCopy;
      console.log("modified");
    }



    setTimeout(() => {
      var res = this.moveTop();
      if (res)
        this.generate();
    }, 100)

    //this.moveTop();
    //this.generate();
  }

  doleft() {


    var arrCopy = this.Values.slice();
    let modified: boolean = false;
    let col = -1;

    for (var i = 0; i < this.length; i++) {
      for (var y = 0; y < this.length; y++) {
        if (arrCopy[y][i] == 0)
          continue;
        if (col == -1) {
          col = y; // remember current col
          continue;
        }
        if (arrCopy[col][i] != arrCopy[y][i]) {
          col = y; // update
          continue;
        }
        if (arrCopy[col][i] == arrCopy[y][i] &&col!=y) {
          console.log(col);
          console.log(y);
          var sum = arrCopy[col][i] + arrCopy[y][i];
          arrCopy[col][i] += arrCopy[y][i]; // merge same numbers
          arrCopy[y][i] = 0;
          if (arrCopy[col][i]==0 && arrCopy[y][i]==0) {
            arrCopy[y][i] = sum;
          }

          col = -1; // reset
          modified = true;
        }
      }
    }


    if (modified) {
      this.Values = arrCopy;
      console.log("modified");
    }
    setTimeout(() => {
      var res = this.moveLeft();
      if (res)
        this.generate();
    }, 100)
  }


  moveLeft(): boolean {
    var arr: number[];
    var finalyArr: number[][];
    finalyArr = this.Values.slice();

    for (var i = 0; i < this.length; i++) {
      var arr: number[] = [];
      arr.length = this.length;
      for (var j = 0; j < this.length; j++) {
        arr[j] = this.Values[j][i];

      }
      var arr = arr.filter(Number)
      arr.length = this.length;

      for (var k = 0; k < this.length; k++) {
        if (arr[k] == undefined)
          arr[k] = 0;
      }
      for (var k = 0; k < this.length; k++) {
        finalyArr[k][i] = arr[k]
      }
    }
    this.Values = finalyArr

    if (finalyArr != this.Values)
      return true
    return false;
  }

  moveRight(): boolean{
       //move rigth
    var arr: number[];
    var finalyArr: number[][];
    finalyArr = this.Values.slice();

    for (var i = 0; i < this.length; i++) {
      var arr: number[] = [];

      arr.length = this.length;
      for (var j = 0; j < this.length; j++) {
        arr[j] = this.Values[j][i];
        //console.log(this.Values[j][i]);
      }
      var arr = arr.filter(Number)
      arr = arr.reverse();
      arr.length = this.length;
      for (var k = 0; k < this.length; k++) {
        if (arr[k] == undefined)
          arr[k] = 0;
      }
      arr.reverse();
      for (var k = 0; k < this.length; k++) {
        finalyArr[k][i] = arr[k]
      }
    }
    if (finalyArr != this.Values)
      return true
    return false;
  }

  moveTop(): boolean{
    //move top
    var finalyArr = this.Values.slice();

    for (var j = 0; j < this.length; j++) {
      var res = finalyArr[j].filter(Number)
      for (var i = 0; i < this.length; i++) {
        if (res[i] == undefined)
          res[i] = 0;
      }
      res.length = this.length;
      this.Values[j] = res;
    }
    if (finalyArr != this.Values)
      return true
    return false;
  }

  moveBott(): boolean {
       //move bott

    var finalyArr = this.Values.slice();

    for (var j = 0; j < this.length; j++) {
      var res = finalyArr[j].filter(Number)
      res = res.reverse();
      for (var i = 0; i < this.length; i++) {
        if (res[i] == undefined)
          res[i] = 0;
      }
      res.length = this.length;
      this.Values[j] = res.reverse();
    }
    if (finalyArr != this.Values)
      return true
    return false;

  }



}

class coord {
  public x: number;
  public y: number;
}


