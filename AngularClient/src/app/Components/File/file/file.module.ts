import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileComponent } from './file.component';
import { MyFilesComponent } from '../my-files/my-files.component';



@NgModule({
  declarations: [FileComponent],
  exports:[MyFilesComponent],
  imports: [
    CommonModule,
  ]
})



export class FileModule { }
