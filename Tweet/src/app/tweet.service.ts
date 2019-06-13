import { Injectable } from '@angular/core';
import { baseURL } from '../app/shared/config';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  };

  constructor(private http: HttpClient) { }

  loginUser(form: any): Observable<any> {
    console.log(typeof (form));
    return this.http.post<any>(baseURL + 'users/login', form, this.httpOptions);

  }

  addUser(form: any): Observable<any> {
    console.log(typeof (form));
    return this.http.post<any>(baseURL + 'users/register', form, this.httpOptions);

  }

  isLoggedIn() {
    //check token expiry date
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  postTweet(tweet: any): Observable<any> {
    console.log(typeof (tweet));
    let token = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post<any>(baseURL + 'users/tweet', tweet, httpOptions);
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(baseURL + 'users');
  }

  getMentions() {
    let token = localStorage.getItem('token');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get<any>(baseURL + 'users/getMentions', httpOptions);
  }

  getTweets(): Observable<any> {

    let token = localStorage.getItem('token');
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.get(baseURL + 'users/getTweets', httpOptions);
  }

  deleteTweet(data): Observable<any> {
    let token = localStorage.getItem('token');
    console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.delete(baseURL + 'users/deleteTweet/' + data, httpOptions);
  }

  getallTweets(): Observable<any> {
    return this.http.get<any>(baseURL + 'users/getallTweets');
  }

  isAuthenticated(): Boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }



}
