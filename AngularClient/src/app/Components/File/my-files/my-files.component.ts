import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { concatWith } from 'rxjs';
import { FileModel } from '../../../Models/File/file';
import { CustomFileService } from '../../../Services/FileServer/FileService/custom-file.service';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  constructor(public fileService: CustomFileService, public http: HttpClient) { }

  //public files: FileModel[];

  //public file: FileModel;

  ngOnInit(): void {
    this.fileService.loadAll();
  }
  //private loadAll() {
  //  this.fileService.getAllFiles().subscribe(res => {
  //    this.files = res as FileModel[];
  //    console.log(res);
  //    console.log(res as FileModel[])
  //  });
  //}

  public load(fileName: string, ContentType: string) {

    this.http.get(`https://localhost:7214/api/File/Blob/${fileName}`, { responseType: 'blob' }).subscribe(
      (res: Blob) => {
        console.log(res)
        var blob = new Blob([res], { type: ContentType });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      }
      //res => console.log(res)
    )
    //this.fileService.getFile("2.2.jpg").subscribe(res => {

    //  this.file = res as File;
    //  console.log(res);
    //});
  }

  public Remove(fileName: string) {
    this.http.delete(`https://localhost:7214/api/File/Blob?blobName=${fileName}`).subscribe(() => {
      //setTimeout(,);
      console.log("complete");
      this.fileService.loadAll();
    });
    

  }
}
