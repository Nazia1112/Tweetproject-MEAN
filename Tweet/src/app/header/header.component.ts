import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TweetService } from '../tweet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private service: TweetService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }
  onLogout() {
    window.localStorage.clear();
    this.toastr.success('Successfully Logged Out')
    this.router.navigate(['user/login']);

  }

}
