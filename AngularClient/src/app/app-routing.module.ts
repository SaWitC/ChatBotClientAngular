import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { AuthGuardService } from './Guards/Auth/AuthGard/auth-guard.service';
import { RegisterComponent } from './Components/Account/register/register.component';
import { AppComponent } from './app.component';
import { InfoComponent } from './Components/Info/info/info.component';
import { ChatDetailsFullpath, ConectToVkFullPath, CreateChat, Help, Login, MyChats, Register, UserAccount } from './Services/Routes';
import { UserAccountComponent } from './Components/Account/user-account/user-account.component';
import { CreateComponent } from './Components/Chat/create/create.component';
import { DetailsComponent } from './Components/Chat/details/details.component';
import { MyChatsComponent } from './Components/Chat/my-chats/my-chats.component';
import { VkConnectComponent } from './Components/Account/Vk/vk-connect/vk-connect.component';

const routes: Routes = [/*{ component: LoginComponent, path: "Login" },*/
  { component: MyChatsComponent, path: MyChats, canActivate: [AuthGuardService] },
  { component: InfoComponent, path: Help, canActivate: [AuthGuardService] },
  { component: CreateComponent, path: CreateChat, canActivate: [AuthGuardService] },
  { component: DetailsComponent, path: ChatDetailsFullpath, canActivate: [AuthGuardService] },
  { component: LoginComponent, path: Login, },
  { component: RegisterComponent, path: Register },
  { component: UserAccountComponent, path: UserAccount, canActivate: [AuthGuardService] },
  { component: VkConnectComponent, path: ConectToVkFullPath, canActivate: [AuthGuardService] }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
