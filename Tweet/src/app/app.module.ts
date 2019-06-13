import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { TweetComponent } from './tweet/tweet.component';
import { MentionModule } from 'angular-mentions';
import { MentionedComponent } from './mentioned/mentioned.component';
import { HomeComponent } from './home/home.component';
import { TweetService } from './tweet.service';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    TweetComponent,
    MentionedComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MentionModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  providers: [TweetService,
  AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
