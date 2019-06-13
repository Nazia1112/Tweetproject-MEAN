import { Component, OnInit } from '@angular/core';
import { TweetService } from '../tweet.service';

@Component({
  selector: 'app-mentioned',
  templateUrl: './mentioned.component.html',
  styleUrls: ['./mentioned.component.css']
})
export class MentionedComponent implements OnInit {
  
  mentioned : any;

  constructor(private service: TweetService) { }

  ngOnInit() {
    this.fetchMentionedTweets();
  }

  fetchMentionedTweets(){
    this.service.getMentions()
    .subscribe(res => {
      if(res.success){
        console.log(" mentioned tweet ");
        this.mentioned= res.data.tweets;  
        console.log(this.mentioned);        
      }
      console.log(res);     
    } )
}

}
