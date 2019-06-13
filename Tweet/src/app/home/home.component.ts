import { Component, OnInit } from '@angular/core';
import{TweetService} from '../tweet.service';
import { Tweet } from '../shared/Tweet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  response: Tweet;
  constructor(private service : TweetService, private router : Router) { }

  ngOnInit() {
    this.service.getTweets().subscribe((data) => {
      if (data.status == 200) {
        this.response = data.data;
        console.log(data.data);

      }
      else if (data.status == 403) {
        console.log('Error in getting posts')

      }
    })
  }

  deletePost(data) {
    this.service.deleteTweet(data).subscribe((res) => {
      if (res.status == 200) {
        console.log("Successful");
        this.response = res.data;
      }
      else if (res.status == 403) {
        console.log("ERRORR");
        this.router.navigate(['user/tweets']);
      }
    })
  }

}
