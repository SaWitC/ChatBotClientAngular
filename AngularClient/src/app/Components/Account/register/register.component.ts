import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccoutValidatorService } from '../../../Services/Validation/AccountValidators/accout-validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private accountValidationService: AccoutValidatorService) { }

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
  }
}
