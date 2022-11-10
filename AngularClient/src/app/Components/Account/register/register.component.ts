import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterMdoel } from '../../../Models/Account/Register/register-mdoel.model';
import { CustomExceptionModel } from '../../../Models/Error/custom-exception-model.model';
import { CustomAccountService } from '../../../Services/Account/custom-account.service';
import { AccoutValidatorService } from '../../../Services/Validation/AccountValidators/accout-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private accountValidationService: AccoutValidatorService,
    private accoutnService: CustomAccountService,
    private toastr: ToastrService) { }

  public submitted = false;

  public  registerGroup: FormGroup;
  ngOnInit(): void {
    this.registerGroup = this.formBuilder.group({
      "Email": new FormControl("", [Validators.email, Validators.required]),

      "UserName": new FormControl("", [Validators.minLength(5), Validators.maxLength(25)]),

      "Password": new FormControl("", [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'), Validators.required]),

      "ConfirmPass": new FormControl("", [Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$'), Validators.required])
    },
    {
      validator: this.accountValidationService.MatchPassword('Password', 'ConfirmPass'),
    });
  }
  get registerFormControls() {
    return this.registerGroup.controls;
  }


  Submit() {
    this.submitted = true;

    var registerModel: RegisterMdoel;
    registerModel = new RegisterMdoel();
    registerModel.email = this.registerGroup.controls["Email"].value;
    registerModel.userName = this.registerGroup.controls["UserName"].value;
    registerModel.password = this.registerGroup.controls["Password"].value;
    registerModel.confirmPass = this.registerGroup.controls["ConfirmPass"].value;

    this.accoutnService.register(registerModel).subscribe(res => {
      this.toastr.success("you have registered a new account");
    },
      (err) => {
        var exc = err as HttpErrorResponse;
        var error = exc.error as CustomExceptionModel;
        console.log(exc.status);
        if (exc.status == 400) 
          this.toastr.info(error.detail,"Info");
        else
          this.toastr.error("the server cannot fulfill your request", "error");
      });
  }
}
