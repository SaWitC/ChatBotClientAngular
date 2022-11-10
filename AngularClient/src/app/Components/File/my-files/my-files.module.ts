import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyFilesComponent } from './my-files.component';
import { FileComponent } from '../file/file.component';
import { FileFormComponent } from '../file-form/file-form.component';



@NgModule({
  declarations: [MyFilesComponent, FileComponent, FileFormComponent],
  imports: [
    CommonModule
  ]
})
export class MyFilesModule { }
