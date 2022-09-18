import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiModule } from '../../../core/services/swagger-gen';
import { AccountService } from '../../../core/services/swagger-gen/api/account.service'
import { LoginCommand } from '../../../core/services/swagger-gen/model/loginCommand'
import { LoginModel } from '../../../Models/Account/Login/login-model.model';
import { Reminds } from '../../../Models/CommandResponseModels/Reminds/reminds.model';
import { CustomAccountService } from '../../../Services/Account/custom-account.service';
import { RemindCustomService } from '../../../Services/Commands/Remind/remind.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(public apiModeule: ApiModule, public accountService: CustomAccountService, public remindCustomService: RemindCustomService) { }

  public Submited: boolean = false;
  ngOnInit(): void {
    this.accountService.configuration.basePath ="localhost:7126/"
  }
  

  public login(form: NgForm) {
    this.Submited = true;
    var model: LoginModel;
    model = new LoginModel();
    model.password = form.value.password;
    model.userName = form.value.userName;
    
    this.accountService.login(model).subscribe(
      res => {
        console.log(1);
        console.log(res);
        localStorage.setItem("jwt", res as string)
      },
      err => {
        console.log(2);
      }
    );

    this.remindCustomService.getActualAndExpiredReminds().subscribe(res => {
      console.log("1");
      console.log(res as Reminds[])
      this.remindCustomService.activeReminders = res as Reminds[];

      console.log("reminds done get")
      this.onChanged.emit(true);
      // this.remindCustomService.SetAnyReminds();
    },
      err => {
        console.log(err);
      });
  }
}
