import { HttpErrorResponse } from '@angular/common/http';
import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiModule } from '../../../core/services/swagger-gen';
import { AccountService } from '../../../core/services/swagger-gen/api/account.service'
import { LoginCommand } from '../../../core/services/swagger-gen/model/loginCommand'
import { LoginModel } from '../../../Models/Account/Login/login-model.model';
import { Reminds } from '../../../Models/CommandResponseModels/Reminds/reminds.model';
import { CustomExceptionModel } from '../../../Models/Error/custom-exception-model.model';
import { CustomAccountService } from '../../../Services/Account/custom-account.service';
import { RemindCustomService } from '../../../Services/Commands/Remind/remind.service';
import { MyChats } from '../../../Services/Routes';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onRouted = new EventEmitter<boolean>();
  @Output() onChanged = new EventEmitter<boolean>();

  constructor(public apiModeule: ApiModule,
    public accountService: CustomAccountService,
    public remindCustomService: RemindCustomService,
    private toastr: ToastrService  ) { }

  public Submited: boolean = false;
  ngOnInit(): void {
    this.accountService.configuration.basePath ="localhost:7126/"
  }

  public errorMessage: string = "";
  public isRequestCompletedIncorrect: boolean = false;
  
  public login(form: NgForm) {
    this.Submited = true;
    var model: LoginModel;
    model = new LoginModel();
    model.password = form.value.password;
    model.userName = form.value.userName;
    
    this.accountService.login(model).subscribe(
      res => {
        localStorage.setItem("jwt", res as string)
        this.toastr.info("you signedin","info");
      },
      (err) => {
        var exc = err as HttpErrorResponse;
        var error = exc.error as CustomExceptionModel;
        console.log(exc.status);
        if (exc.status == 400)
          this.toastr.info(error.detail, "Info");
        else
          this.toastr.error("the server cannot fulfill your request", "error");
      }
    );
  }
}
