import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {


  public IsLastCommandSendFile: boolean = false;

  public loadCommandSendFile(container: undefined | ViewContainerRef) {
      import('../../Components/File/file/file.component').then((module) => {
        const component = module['FileComponent'];
        container?.clear();
        container?.createComponent(component);
    })
  }


  constructor() { }

  public deactivateAll() {
    this.IsLastCommandSendFile = false;
  }
}
