import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { G2048Component } from './g2048.component';
import { BlockComponent } from './block/block.component';



@NgModule({
  declarations: [G2048Component,
    BlockComponent],
  imports: [
    CommonModule
  ]
})
export class G2048Module { }
