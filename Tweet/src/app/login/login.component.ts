import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from '../tweet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  Logindata = this.fb.group({
    "username": ['', [Validators.required]],
    "password": ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private router: Router,
    private service: TweetService,
  private toastr: ToastrService) { }


  ngOnInit() {
  }

  login() {

    this.service.loginUser(this.Logindata.value).subscribe((res) => {
      console.log(res);

      if (res.status == 200) {
        window.localStorage.setItem('token', res.token);
        this.toastr.success('Successfully LoggedIn');

        this.router.navigateByUrl('/user/tweets');

      }
      else{
        this.toastr.error(res.msg.str1)
      }

      

    })
  }

}
