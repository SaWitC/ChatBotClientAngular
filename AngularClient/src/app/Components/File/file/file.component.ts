import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
//import('../../Chat/details/details.component')

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css','../../Chat/details/details.component.css']
})
export class FileComponent implements OnInit {

  @ViewChild('uploadFilecontainer', { read: ViewContainerRef })
  uploadFileContainer!: ViewContainerRef;

  @ViewChild('myFilescontainer', { read: ViewContainerRef })
  myFilesContainer!: ViewContainerRef;

  public myFileisShowed: boolean = false;



  constructor() { }

  ngOnInit(): void {
    import('../file-form/file-form.component').then((module) => {
      const component = module['FileFormComponent'];
      this.uploadFileContainer?.createComponent(component);
    });
  }

  loadMyFiles() {
    import('../my-files/my-files.component').then((module) => {
      const component = module['FileFormComponent'];
      this.myFilesContainer?.createComponent(component);
      this.myFileisShowed = true;
    });
  }

}
