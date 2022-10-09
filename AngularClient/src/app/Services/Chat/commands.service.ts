import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {


  public IsLastCommandSendFile: boolean = false;


  constructor() { }

  public deactivateAll() {
    this.IsLastCommandSendFile = false;
  }
}
