import { Injectable, Optional } from '@angular/core';
import { LoginCommand } from '../../core/services/swagger-gen/model/loginCommand';
import { AccountService, Configuration } from '../../core/services/swagger-gen';
import { HttpClient } from '@angular/common/http';
import { protocol_botServerDomain } from '../../../../env';
import { UserModel } from '../../Models/Account/User/User/user-model.=model';

@Injectable({
  providedIn: 'root'
})
export class CustomAccountService extends AccountService {

  public CurentUser: UserModel = new UserModel();

  public override configuration = new Configuration();

  constructor(override httpClient: HttpClient, @Optional() configuration: Configuration) {
    super(httpClient, protocol_botServerDomain, configuration);
  }

}
