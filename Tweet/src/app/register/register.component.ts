import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../shared/User';
import { TweetService } from '../tweet.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  response: User;
  constructor(private service: TweetService, private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  registerForm = this.fb.group({
    username: '',
    password: '',
  })

  ngOnInit() {
  }

  registerData() {
    this.service.addUser(this.registerForm.value).subscribe(res => {
      this.response = res;
      console.log(res)
      if (res.success === true) {
        this.toastr.success('Successfully Registered');
        
        this.registerForm.reset({
          username: '',
          password: '',
        });

        this.router.navigate(['/user/login']);

      }

      else {
        
        this.toastr.error('Not');
      }



    })


  }

  login() {
    this.router.navigate(['/user/login'])
  }

}
