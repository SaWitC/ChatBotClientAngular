import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';
import { CustomFileService } from '../../../Services/FileServer/FileService/custom-file.service';
import { FileServerDomain } from '../../../../../env';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  constructor(public fileService: CustomFileService, private http: HttpClient) { }



  ngOnInit(): void {
  }


  public submit() {
    this.fileService.uploadFile();
  }


  @Input() requiredFileType: string;

  fileName = '';
  uploadProgress: number;
  uploadSub: Subscription;
  public message: string;

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file, file.name);

      const upload$ = this.http.post("https://localhost:7214/api/File/Blob", formData, {
        reportProgress: true,
        observe: 'events'
      })
        .pipe(
          finalize(() => {
            console.log("complete");
            //this.loadAll();
            this.fileService.loadAll();

            this.reset()
          })
        );

      this.uploadSub = upload$.subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          if (event.total != undefined)
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }
  }


  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
  }


}
