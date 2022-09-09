import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiModule } from '../../../core/services/swagger-gen';
import { AccountService } from '../../../core/services/swagger-gen/api/account.service'
import { LoginCommand } from '../../../core/services/swagger-gen/model/loginCommand'
import { CustomAccountService } from '../../../Services/Account/custom-account.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public apiModeule: ApiModule, public AccountService: AccountService) { }

  public Submited: boolean = false;
  ngOnInit(): void {
    this.AccountService.configuration.basePath ="localhost:7126/"
  }

  public login(form: NgForm) {
    this.Submited = true;
    var model: loginModel;
    model = new loginModel();
    model.password = form.value.password;
    model.userName = form.value.userName;
    
    //model.password=
    this.AccountService.login(model).subscribe(
      res => {
        console.log(1);
        console.log(res);
        localStorage.setItem("jwt", res as string)
      },
      err => {
        console.log(2);
      }
    );
  }

  

}

export class loginModel implements LoginCommand {
  public userName: string = "";
  public password: string = "";

}
