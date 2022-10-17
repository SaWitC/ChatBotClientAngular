import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountRoutingModule } from './user-account-routing.module';
import { UserAccountComponent } from './user-account.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [UserAccountComponent],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    FormsModule
  ]
})
export class UserAccountModule { }
