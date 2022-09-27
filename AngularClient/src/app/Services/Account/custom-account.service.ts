import { Injectable, Optional } from '@angular/core';
import { LoginCommand } from '../../core/services/swagger-gen/model/loginCommand';
import { AccountService, Configuration } from '../../core/services/swagger-gen';
import { HttpClient } from '@angular/common/http';
import { protocol_botServerDomain } from '../../../../env';
import { UserModel } from '../../Models/Account/User/User/user-model.=model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CustomAccountService extends AccountService {

  public CurentUser: UserModel = new UserModel();

  public override configuration = new Configuration();

  constructor(private jwt: JwtHelperService,
    override httpClient: HttpClient,
    @Optional() configuration: Configuration) {
    super(httpClient, protocol_botServerDomain, configuration);
  }


  public isAutenticated() {
    var token = this.getToken();
    let isExpired;
    if (token)
      isExpired = this.jwt.isTokenExpired(token)

    if (!isExpired)
      return true;
    return false;
  }


  private getToken() {
    return localStorage.getItem("jwt")
  }

}
