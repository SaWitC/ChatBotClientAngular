import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { ApiModule, ChatService, Configuration } from './core/services/swagger-gen';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './Guards/Auth/AuthGard/auth-guard.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import { RegisterComponent } from './Components/Account/register/register.component';
import { RemindCustomService } from './Services/Commands/Remind/remind.service';
import { CustomChatService } from './Services/Chat/Chat/custom-chat.service';
import { botServerDomain, FileServerDomain } from '../../env';
import { CustomMessagesService } from './Services/Chat/Message/custom-messages.service';
import { InfoComponent } from './Components/Info/info/info.component';
import { UserAccountComponent } from './Components/Account/user-account/user-account.component';
import { VkConnectComponent } from './Components/Account/Vk/vk-connect/vk-connect.component';
import { CreateComponent } from './Components/Chat/create/create.component';
import { MyChatsComponent } from './Components/Chat/my-chats/my-chats.component';
import { DetailsComponent } from './Components/Chat/details/details.component';
import { NotifySignalRService } from './Services/SignalR/Notify/notify-signal-r.service';
import { MyFilesComponent } from './Components/File/my-files/my-files.component';
import { FileFormComponent } from './Components/File/file-form/file-form.component';
import { FileComponent } from './Components/File/file/file.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DetailsComponent,
    MyChatsComponent,
    CreateComponent,
    RegisterComponent,
    InfoComponent,
    UserAccountComponent,
    VkConnectComponent,
    MyFilesComponent,
    FileFormComponent,
    FileComponent
  ],
  imports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    
    MatInputModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApiModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [botServerDomain, FileServerDomain],
        disallowedRoutes:[],
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [CustomChatService, AuthGuardService, RemindCustomService, CustomChatService, CustomMessagesService, NotifySignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
