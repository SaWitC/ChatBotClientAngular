import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { empty } from 'rxjs';

@Component({
  selector: 'app-g2048',
  templateUrl: './g2048.component.html',
  styleUrls: ['./g2048.component.css']
})
export class G2048Component implements OnInit {

  constructor(private toastr: ToastrService) { }

  public Values: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

  length: number = 4;

  ngOnInit(): void {

    this.generate();
    this.generate();
  }

  private checkWin() {
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this.length; j++) {
        if (this.Values[i][j] == 2048) {
          console.log(this.Values[i][j]);
          this.toastr.info("you win","info");
          this.restart();
          return true;
        }
      }
    }
    return false;
  }

  private restart() {
    this.Values = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.generate();
    this.generate();
  }

  private generate() {
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
      this.toastr.warning("you lose","lose");
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
        console.log(res);
        this.generate();
    }, 100)
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
      if (!res)
        this.generate();
    }, 100)
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
      console.log("res "+res);
      if (!res)
        this.generate();
    }, 100)
  }


  private moveLeft(): boolean {
    var arr: number[];
    var finalyArr = structuredClone(this.Values)

    for (var i = 0; i < this.length; i++) {
      var arr: number[] = [];
      arr.length = this.length;
      for (var j = 0; j < this.length; j++) {
        arr[j] = finalyArr[j][i];
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
    var isEqual = this.isArrayEqueals(finalyArr, this.Values);
    if (!isEqual) {
      this.Values = finalyArr;
    }
    return isEqual;
  }

  private moveRight(): boolean{
       //move rigth
    var arr: number[];
    var finalyArr = structuredClone(this.Values)

    for (var i = 0; i < this.length; i++) {
      var arr: number[] = [];

      arr.length = this.length;
      for (var j = 0; j < this.length; j++) {
        arr[j] = this.Values[j][i];
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
    var isEqual = this.isArrayEqueals(finalyArr, this.Values);
    if (!isEqual) {
      this.Values = finalyArr;
    }
    return isEqual;

  }

  private moveTop(): boolean{
    //move top
    var finalyArr = this.Values.slice();

    for (var j = 0; j < this.length; j++) {
      var res = finalyArr[j].filter(Number)
      for (var i = 0; i < this.length; i++) {
        if (res[i] == undefined)
          res[i] = 0;
      }
      res.length = this.length;
      finalyArr[j] = res;
    }
    var isEqual = this.isArrayEqueals(finalyArr, this.Values);
    if (!isEqual) {
      this.Values = finalyArr;
    }
    return isEqual;

  }

  private moveBott(): boolean {
    var finalyArr = this.Values.slice();

    for (var j = 0; j < this.length; j++) {
      var res = finalyArr[j].filter(Number)
      res = res.reverse();
      for (var i = 0; i < this.length; i++) {
        if (res[i] == undefined)
          res[i] = 0;
      }
      res.length = this.length;
      finalyArr[j] = res.reverse();
    }

    var isEqual = this.isArrayEqueals(finalyArr, this.Values);
    if (!isEqual) {
      this.Values = finalyArr;
    }
    return isEqual;
  }


  private isArrayEqueals(arr1: number[][], arr2: number[][]) {
    for (var i = 0; i < this.length; i++) {
      for (var j = 0; j < this.length; j++) {
        if (arr1[i][j] != arr2[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
}

class coord {
  public x: number;
  public y: number;
}


