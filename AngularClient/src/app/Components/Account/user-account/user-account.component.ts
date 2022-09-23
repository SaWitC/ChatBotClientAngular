import { Component, OnInit } from '@angular/core';
import { UpdateData } from '../../../Models/Account/User/Update/update-data.model';
import { UserModel } from '../../../Models/Account/User/User/user-model.=model';
import { CustomAccountService } from '../../../Services/Account/custom-account.service';
import * as RoutesPath from '../../../Services/Routes';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

  public routesPath = RoutesPath;

  constructor(public customAccountService: CustomAccountService) {
    this.customAccountService.getPersonalData().subscribe(res => {
      //console.log(res)
       console.log(res as UserModel)

      this.customAccountService.CurentUser = res as UserModel;
    },
     err => {
       console.log(err);
      }
    );
    
  }

  ngOnInit(): void {
  }

  SaveSendStatus() {
    
    if (this.customAccountService.CurentUser.sendToVk != undefined) {
      console.log(this.customAccountService.CurentUser.sendToVk)


      var userData: UpdateData = new UpdateData()
      userData.sendToVk = this.customAccountService.CurentUser.sendToVk;
      this.customAccountService.updatePersonalData(userData).subscribe(
        res => {
          console.log("1");
          this.customAccountService.CurentUser = res as UserModel;
        },
        err => {
          console.log(err);
        }
      );
    }
  }

}
