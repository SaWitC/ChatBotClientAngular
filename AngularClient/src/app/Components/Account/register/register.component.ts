import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/swagger-gen';
import { RegisterMdoel } from '../../../Models/Account/Register/register-mdoel.model';
import { CustomAccountService } from '../../../Services/Account/custom-account.service';
import { AccoutValidatorService } from '../../../Services/Validation/AccountValidators/accout-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private accountValidationService: AccoutValidatorService, private accoutnService: CustomAccountService) { }

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

    console.log("1")

    this.accoutnService.register(registerModel).subscribe(res => {
      console.log("ok")
    },
      err => console.log(err));
  }
}
