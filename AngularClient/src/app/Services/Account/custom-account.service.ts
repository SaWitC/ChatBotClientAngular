import { Injectable } from '@angular/core';
import { LoginCommand } from '../../core/services/swagger-gen/model/loginCommand';
import { AccountService } from '../../core/services/swagger-gen';

@Injectable({
  providedIn: 'root'
})
export class CustomAccountService extends AccountService {

  //constructor(public AccountService: AccountService) {
  //  this.AccountService.configuration.basePath = "localhost:7126/";
  //  this.AccountService.configuration.
  //}
  //constructor() { }
  

    //this.AccountService.configuration.basePath = "localhost:7126";
 // this.configuration.basePath
    //return this.login(command);

}
