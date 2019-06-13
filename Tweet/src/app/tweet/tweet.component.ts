import { Component, OnInit } from '@angular/core';
import { Tweet } from '../shared/Tweet';
import { FormBuilder, Validators } from '@angular/forms';
import { TweetService } from '../tweet.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  response: Tweet;
  users: string[] = [];
  constructor(private fb: FormBuilder, 
     private service: TweetService, 
     private router: Router,
    private toastr : ToastrService )
     {
    service.getUsers().subscribe(users => {
      this.users = [];
      for (let i = 0; i < users.length; i++) {
        this.users.push(users[i].username);
      }
    });
   }

  tweetForm = this.fb.group({
    tweet: ''
  })

  ngOnInit() {
    this.service.getallTweets().subscribe(res => {
      console.log(res)
      this.response = res;
    })
  }

  tweet() {
    console.log('post', this.tweetForm.value);
    this.service.postTweet(this.tweetForm.value).subscribe(res => {
      this.response = res;
      console.log(res);
      this.service.getallTweets().subscribe(res => this.response = res);
    
      if (res.status == 200) {
        // alert("Succefully Register");
        this.toastr.success('Shared Tweet Successfully');
       
        //this.router.navigateByUrl('addlawn');
      }
    });
    this.tweetForm.reset({
      tweet: ''
    });

    // this.router.navigate(['user/tweets']);

  }
  inputChange(input) {
    console.log(input);
  }


}
