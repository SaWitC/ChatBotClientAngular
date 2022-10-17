import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {


  public IsLastCommandSendFile: boolean = false;

  public loadCommandSendFile(container: undefined | ViewContainerRef) {
      import('../../Components/File/file/file.component').then((module) => {
        const component = module['FileComponent'];
        console.log(module);
        container?.clear();
        container?.createComponent(component);
    })
  }

  public loadCommandg2048(container: undefined | ViewContainerRef) {
    import('../../Components/TypicalCommands/Game/g2048/g2048.module').then(m => m.G2048Module);//load aditional components
    import('../../Components/TypicalCommands/Game/g2048/g2048.component').then((module) => {
      //module.G2048Module
      console.log(module);
      //console.log(module.G2048Module);


      const component = module['G2048Component'];
     // console.log(module);
      container?.clear();
      container?.createComponent(component);
    })
  }


  constructor() { }

  public deactivateAll() {
    this.IsLastCommandSendFile = false;
  }
}
