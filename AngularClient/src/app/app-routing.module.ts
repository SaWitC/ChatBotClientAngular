import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { CreateComponent } from './Components/Chat/create/create.component';
import { DetailsComponent } from './Components/Chat/details/details.component';
import { MyChatsComponent } from './Components/Chat/my-chats/my-chats.component';
import { ChathubComponent } from './Components/SignalR/chathub/chathub.component';
import { AuthGuardService } from './Guards/Auth/AuthGard/auth-guard.service';
import { RegisterComponent } from './Components/Account/register/register.component';

const routes: Routes = [{ component: LoginComponent, path: "Login" },
{ component: ChathubComponent, path: "Chat", canActivate: [AuthGuardService] },
  { component: MyChatsComponent, path: "MyChats", canActivate: [AuthGuardService] },
  { component: CreateComponent, path: "CreateChat", canActivate: [AuthGuardService] },
  { component: DetailsComponent, path: "MyChats/ChatDetails/:id", canActivate: [AuthGuardService] },
  { component: RegisterComponent, path:"Register" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
