import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { ApiModule, ChatService, Configuration } from './core/services/swagger-gen';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './Components/Chat/details/details.component';
import { AuthGuardService } from './Guards/Auth/AuthGard/auth-guard.service';
import { MyChatsComponent } from './Components/Chat/my-chats/my-chats.component';
import { CreateComponent } from './Components/Chat/create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { RegisterComponent } from './Components/Account/register/register.component';
import { RemindCustomService } from './Services/Commands/Remind/remind.service';
import { CustomChatService } from './Services/Chat/Chat/custom-chat.service';
import { botServerDomain } from '../../env';
import { CustomMessagesService } from './Services/Chat/Message/custom-messages.service';

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
    RegisterComponent
  ],
  imports: [

    //MatButtonModule,
    //MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ApiModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [botServerDomain],
        disallowedRoutes:[],
      }
    }),
    BrowserAnimationsModule,
  ],
  providers: [CustomChatService, AuthGuardService, RemindCustomService, CustomChatService, CustomMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
