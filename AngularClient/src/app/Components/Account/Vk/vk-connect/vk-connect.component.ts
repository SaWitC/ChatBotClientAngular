import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../core/services/swagger-gen';
import { VkLogin } from '../../../../Models/Account/Login/vk-login.model';
import { CustomAccountService } from '../../../../Services/Account/custom-account.service';
import { CustomVkService } from '../../../../Services/AditionalServices/Vk/custom-vk.service';

@Component({
  selector: 'app-vk-connect',
  templateUrl: './vk-connect.component.html',
  styleUrls: ['./vk-connect.component.css']
})
export class VkConnectComponent implements OnInit {

  constructor(public suctomAccountService: CustomAccountService,
    public vkService: CustomVkService,
    private toastr: ToastrService  ) { }

  ngOnInit(): void {

  }

  public email: string;
  public password: string;
  public isBlocked: boolean;

  Connect(form: NgForm) {
    //console.log(this.email);
    //console.log(this.password);

    this.vkService.tryConectToVk(this.email, this.password).subscribe(
      res => {
        this.toastr.success("request are sended", "succes");
      },
      err => {
        this.toastr.error("srever cannot fulfill your request", "error");
      });
  }

}
