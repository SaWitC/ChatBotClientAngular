import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(public customAccountService: CustomAccountService,
    private toastr: ToastrService  ) {
    this.customAccountService.getPersonalData().subscribe(res => {
      this.customAccountService.CurentUser = res as UserModel;
    },
      err => {
        this.toastr.error("can not load the personal data","error");
      }
    );
  }

  ngOnInit(): void {
  }

  SaveSendStatus() {
    
    if (this.customAccountService.CurentUser.sendToVk != undefined) {
      var userData: UpdateData = new UpdateData()
      userData.sendToVk = this.customAccountService.CurentUser.sendToVk;
      this.customAccountService.updatePersonalData(userData).subscribe(
        res => {
          this.toastr.success("changes are saved", "succes");
          this.customAccountService.CurentUser = res as UserModel;
        },
        err => {
          
          this.toastr.error("cannot caveChanges try later", "error");
        }
      );
    }
  }

}
