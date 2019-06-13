import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{Routes, RouterModule} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TweetComponent } from './tweet/tweet.component';
import { MentionedComponent } from './mentioned/mentioned.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  {path:'user/login', component:LoginComponent},
  {path:'user/register', component:RegisterComponent},
  {path:'user/post-a-tweet',component:TweetComponent,  canActivate:[AuthGuard]},
  {path:'user/mentioned', component:MentionedComponent,  canActivate:[AuthGuard]},
  {path:'user/tweets', component:HomeComponent,  canActivate:[AuthGuard]}
]

@NgModule({
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
